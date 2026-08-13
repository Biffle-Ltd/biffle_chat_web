import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  enqueueCreatorVerificationAnalyticsEvent,
  resolvePostVerifyAnalyticsEvent,
} from "../services/biffleUserCenterEvents";
import {
  createVerificationClient,
  GenderIneligibleError,
  type VerifyResult,
} from "../services/creatorVerificationApi";
import {
  getVerifyFailureUi,
  type VerifyRetryPolicy,
} from "../services/creatorVerificationVerifyErrors";
import type { CreatorVerificationAnalyticsContext } from "../utils/creatorVerificationUrlContext";
import { enqueueFemaleVerificationCapiBridge } from "../services/metaConversionBridge";
import { postToRN, RN_EVENTS } from "../utils/rnBridge";

export type CreatorVerificationStage =
  | "loading"
  | "liveness"
  | "verifying"
  | "success"
  | "error"
  | "ineligible"
  | "already_verified"
  | "duplicate_face"
  | "session_already_used";

export function useCreatorVerification({
  token,
  analyticsContext,
}: {
  token: string;
  analyticsContext: CreatorVerificationAnalyticsContext;
}) {
  const [stage, setStage] = useState<CreatorVerificationStage>("loading");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorRetry, setErrorRetry] = useState<VerifyRetryPolicy | null>(null);

  const verificationCompleteSentForSessionRef = useRef<string | null>(null);

  const client = useMemo(() => createVerificationClient(token), [token]);

  const emitPostVerifyAnalyticsOnce = useCallback(
    (sid: string, eventName: string, extraParams: Record<string, unknown>) => {
      if (verificationCompleteSentForSessionRef.current === sid) return false;
      verificationCompleteSentForSessionRef.current = sid;
      enqueueCreatorVerificationAnalyticsEvent(analyticsContext, {
        eventName,
        sessionId: sid,
        extraParams,
      });
      return true;
    },
    [analyticsContext]
  );

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setStage("loading");
      setSessionId(null);
      setResult(null);
      setError(null);
      setErrorTitle(null);
      setErrorRetry(null);
      verificationCompleteSentForSessionRef.current = null;

      if (!token.trim()) {
        setStage("error");
        setError("Missing token");
        return;
      }

      try {
        const session = await client.createSession();
        if (cancelled) return;

        if ("alreadyVerified" in session && session.alreadyVerified) {
          setStage("already_verified");
          postToRN(RN_EVENTS.ALREADY_VERIFIED);
          return;
        }

        setSessionId("sessionId" in session ? session.sessionId : null);
        setStage("liveness");
      } catch (e) {
        if (cancelled) return;

        if (e instanceof GenderIneligibleError) {
          setStage("ineligible");
          postToRN(RN_EVENTS.INELIGIBLE);
          return;
        }

        setStage("error");
        setErrorTitle("Verification failed");
        setError(e instanceof Error ? e.message : "Something went wrong");
        setErrorRetry("new_session");
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [token, client]);

  const handleAnalysisComplete = useCallback(async () => {
    setStage("verifying");

    if (!sessionId) {
      setStage("error");
      setErrorTitle("Verification failed");
      setError("No active session");
      setErrorRetry("new_session");
      postToRN(RN_EVENTS.VERIFICATION_FAILED, {
        error: { message: "No active session" },
      });
      return;
    }

    const sid = sessionId;

    try {
      const verifyResult = await client.verifySession(sid);
      const { eventName, extraParams } =
        resolvePostVerifyAnalyticsEvent(verifyResult);
      const didEmitPostVerify = emitPostVerifyAnalyticsOnce(
        sid,
        eventName,
        extraParams
      );
      if (didEmitPostVerify && eventName === "female_verification_complete") {
        enqueueFemaleVerificationCapiBridge({
          analyticsContext,
          verifyResult,
          sessionId: sid,
        });
      }
      setResult(verifyResult);
      setStage("success");
      postToRN(RN_EVENTS.VERIFICATION_COMPLETE, verifyResult);
    } catch (err) {
      const ui = getVerifyFailureUi(err);
      const extraParams = {
        failure_reason: ui.errorCode ?? "verify_api_error",
        error_code: ui.errorCode,
      };
      if (ui.retry === "retry_verify") {
        enqueueCreatorVerificationAnalyticsEvent(analyticsContext, {
          eventName: "verification_failed",
          sessionId: sid,
          extraParams,
        });
      } else {
        emitPostVerifyAnalyticsOnce(sid, "verification_failed", extraParams);
      }
      setErrorTitle(ui.title);
      setError(ui.message);
      setErrorRetry(ui.retry);
      setStage(ui.stage);
      postToRN(RN_EVENTS.VERIFICATION_FAILED, {
        error: { message: ui.message, error_code: ui.errorCode },
      });
    }
  }, [analyticsContext, client, sessionId, emitPostVerifyAnalyticsOnce]);

  const handleLivenessError = useCallback((err: unknown) => {
    setStage("error");
    setErrorTitle("Liveness check failed");
    setError(
      (err as { error?: { message?: string } })?.error?.message ??
        "Liveness check failed"
    );
    setErrorRetry("new_session");
    postToRN(RN_EVENTS.VERIFICATION_FAILED, { error: err } as object);
  }, []);

  return {
    stage,
    sessionId,
    result,
    error,
    errorTitle,
    errorRetry,
    handleAnalysisComplete,
    handleLivenessError,
    client,
  };
}
