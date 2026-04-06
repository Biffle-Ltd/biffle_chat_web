import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createVerificationClient,
  GenderIneligibleError,
  type VerifyResult,
} from "../services/creatorVerificationApi";
import { postToRN, RN_EVENTS } from "../utils/rnBridge";

export type CreatorVerificationStage =
  | "loading"
  | "liveness"
  | "verifying"
  | "success"
  | "error"
  | "ineligible"
  | "already_verified";

export function useCreatorVerification({ token }: { token: string }) {
  const [stage, setStage] = useState<CreatorVerificationStage>("loading");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const client = useMemo(() => createVerificationClient(token), [token]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setStage("loading");
      setSessionId(null);
      setResult(null);
      setError(null);

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

    try {
      const verifyResult = await client.verifySession(sessionId);
      setResult(verifyResult);
      setStage("success");
      postToRN(RN_EVENTS.VERIFICATION_COMPLETE, verifyResult);
    } catch (error) {
      setStage("error");
      setError(error instanceof Error ? error.message : String(error));
      postToRN(RN_EVENTS.VERIFICATION_FAILED, { error } as object);
    }
  }, [client, sessionId]);

  const handleLivenessError = useCallback((error: unknown) => {
    setStage("error");
    setError(
      (error as { error?: { message?: string } })?.error?.message ??
        "Liveness check failed"
    );
    postToRN(RN_EVENTS.VERIFICATION_FAILED, { error } as object);
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
