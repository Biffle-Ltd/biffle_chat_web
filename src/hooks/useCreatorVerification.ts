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
import type { CreatorVerificationAnalyticsContext } from "../utils/creatorVerificationUrlContext";
import { trackFemaleVerificationCompleteMeta } from "../utils/metaPixel";
import { postToRN, RN_EVENTS } from "../utils/rnBridge";

export type CreatorVerificationStage =
  | "loading"
  | "liveness"
  | "verifying"
  | "success"
  | "error"
  | "ineligible"
  | "already_verified";

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
        setError(e instanceof Error ? e.message : "Something went wrong");
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
      setError("No active session");
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
      if (didEmitPostVerify && eventName === "male_verification_complete") {
        trackFemaleVerificationCompleteMeta({
          analyticsContext,
          verifyResult,
        });
      }
      setResult(verifyResult);
      setStage("success");
      postToRN(RN_EVENTS.VERIFICATION_COMPLETE, verifyResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const name = err instanceof Error ? err.name : "Error";
      emitPostVerifyAnalyticsOnce(sid, "verification_failed", {
        failure_reason: "verify_api_error",
        error_message: message,
        error_name: name,
      });
      setStage("error");
      setError(message);
      postToRN(RN_EVENTS.VERIFICATION_FAILED, { error: err } as object);
    }
  }, [analyticsContext, client, sessionId, emitPostVerifyAnalyticsOnce]);

  const handleLivenessError = useCallback((err: unknown) => {
    setStage("error");
    setError(
      (err as { error?: { message?: string } })?.error?.message ??
        "Liveness check failed"
    );
    postToRN(RN_EVENTS.VERIFICATION_FAILED, { error: err } as object);
  }, []);

  return {
    stage,
    sessionId,
    result,
    error,
    handleAnalysisComplete,
    handleLivenessError,
    client,
  };
}
