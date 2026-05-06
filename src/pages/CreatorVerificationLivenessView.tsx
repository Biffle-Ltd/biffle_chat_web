import "@aws-amplify/ui-react/styles.css";
import "@aws-amplify/ui-react-liveness/styles.css";
import "../styles/creator-verification-liveness.css";

import { createTheme, ThemeProvider } from "@aws-amplify/ui-react";
import { FaceLivenessDetectorCore } from "@aws-amplify/ui-react-liveness";
import { useCallback, useEffect, useRef, useState } from "react";
import CreatorVerificationScreenLayout from "../components/creator-verification/CreatorVerificationScreenLayout";
import { enqueueCreatorVerificationAnalyticsEvent } from "../services/biffleUserCenterEvents";
import { fetchRekognitionStreamCredentials } from "../services/creatorVerificationApi";
import type { CreatorVerificationAnalyticsContext } from "../utils/creatorVerificationUrlContext";

// Built-in palette name only (not raw hex). Neutral keeps UI calm; pink primary
// made the whole flow feel flashy next to Rekognition’s required color challenge.
const professionalLivenessTheme = createTheme({
  name: "biffle-liveness",
  primaryColor: "neutral",
});

const livenessDisplayText = {
  hintHoldFaceForFreshnessText:
    "Hold still. The screen will show brief lighting — this is normal and helps verify it’s really you.",
  startScreenBeginCheckText: "Start verification",
  hintConnectingText: "Connecting securely…",
  hintVerifyingText: "Verifying…",
  hintCheckCompleteText: "Complete",
} as const;

const awsRegion =
  (import.meta.env.VITE_PUBLIC_AWS_REGION as string | undefined) ||
  (typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_AWS_REGION
    : undefined) ||
  "us-east-1";

type CameraGateState = "probing" | "ready" | "blocked";

function CameraProbeSkeleton() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
      <div
        className="size-10 animate-pulse rounded-full bg-gray-300"
        aria-hidden
      />
      <p className="text-sm text-gray-600">Checking camera access…</p>
    </div>
  );
}

function CameraAccessBlockedPanel({
  onCheckAgain,
}: {
  onCheckAgain: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-6 px-2 py-6 text-center">
      <div className="space-y-3">
        <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
          Camera access is blocked
        </h1>
        <p className="text-pretty text-sm leading-relaxed text-gray-700 sm:text-base">
          To continue, this page needs your camera. Follow the instructions below to allow camera access in your browser settings.
        </p>
        <div className="space-y-2 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-left text-sm text-gray-700 shadow-sm sm:px-5 sm:py-4">
          <p>
            <span className="font-semibold text-gray-900">Chrome / Edge / Android:</span>{" "}
            tap the lock or site icon beside the URL → Permissions / Site settings →
            Camera → Allow.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onCheckAgain}
          className="w-full max-w-xs min-h-[44px] touch-manipulation rounded-xl bg-[#E91E8C] px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-[#E91E8C]/25 transition-colors hover:bg-[#d41a7d] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[12rem]"
        >
          Check again
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className="w-full max-w-xs min-h-[44px] touch-manipulation rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[12rem]"
        >
          Reload page
        </button>
      </div>
    </div>
  );
}

export type CreatorVerificationLivenessViewProps = {
  token: string;
  sessionId: string;
  analyticsContext: CreatorVerificationAnalyticsContext;
  onAnalysisComplete: () => void | Promise<void>;
  onError: (error: unknown) => void;
};

/**
 * Loaded only when the user reaches the liveness stage (separate chunk — avoids
 * loading TensorFlow / wasm with the initial verification page).
 */
export default function CreatorVerificationLivenessView({
  token,
  sessionId,
  analyticsContext,
  onAnalysisComplete,
  onError,
}: CreatorVerificationLivenessViewProps) {
  const cameraGrantedForSessionRef = useRef<string | null>(null);
  const cameraDeniedForSessionRef = useRef<string | null>(null);
  const selfieEmittedForSessionRef = useRef<string | null>(null);

  const [cameraGate, setCameraGate] = useState<CameraGateState>("probing");
  const [permissionProbeNonce, setPermissionProbeNonce] = useState(0);

  const handleRetryCameraAccess = useCallback(() => {
    setCameraGate("probing");
    setPermissionProbeNonce((n) => n + 1);
  }, []);

  /** At most one signal per outcome per session (`denied` does not block a later `granted`). */
  const tryEmitCameraGranted = useCallback(
    (source: "permissions_api" | "get_user_media_fallback") => {
      if (cameraGrantedForSessionRef.current === sessionId) return;
      cameraGrantedForSessionRef.current = sessionId;
      enqueueCreatorVerificationAnalyticsEvent(analyticsContext, {
        eventName: "camera_permission_granted",
        sessionId,
        extraParams: { source },
      });
    },
    [sessionId, analyticsContext]
  );

  const tryEmitCameraDenied = useCallback(
    (
      source:
        | "permissions_api"
        | "get_user_media_fallback"
        | "liveness_component"
    ) => {
      if (cameraGrantedForSessionRef.current === sessionId) return;
      if (cameraDeniedForSessionRef.current === sessionId) return;
      cameraDeniedForSessionRef.current = sessionId;
      enqueueCreatorVerificationAnalyticsEvent(analyticsContext, {
        eventName: "camera_permission_denied",
        sessionId,
        extraParams: { source },
      });
    },
    [sessionId, analyticsContext]
  );

  // Amplify exposes no permission callback — use Permissions API, with getUserMedia fallback
  // (may prompt twice on some browsers; needed when permissions query is unsupported).
  // Browsers ignore repeat permission prompts until the user changes settings — blocked UI guides that.
  useEffect(() => {
    let cancelled = false;
    let permissionStatus: PermissionStatus | null = null;
    let onPermissionChange: (() => void) | null = null;

    setCameraGate("probing");

    const removePermissionListener = () => {
      if (permissionStatus && onPermissionChange) {
        permissionStatus.removeEventListener("change", onPermissionChange);
      }
      onPermissionChange = null;
    };

    async function tryGetUserMediaPermissionOutcome(): Promise<
      "granted" | "denied" | "unknown"
    > {
      if (!navigator.mediaDevices?.getUserMedia) return "unknown";
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach((track) => track.stop());
        return "granted";
      } catch (e: unknown) {
        const name =
          e !== null &&
          typeof e === "object" &&
          "name" in e &&
          typeof (e as { name?: string }).name === "string"
            ? (e as { name: string }).name
            : "";
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          return "denied";
        }
        return "unknown";
      }
    }

    async function run() {
      try {
        if (!navigator.permissions?.query) {
          const outcome = await tryGetUserMediaPermissionOutcome();
          if (cancelled) return;
          if (outcome === "granted") {
            tryEmitCameraGranted("get_user_media_fallback");
            setCameraGate("ready");
          } else if (outcome === "denied") {
            tryEmitCameraDenied("get_user_media_fallback");
            setCameraGate("blocked");
          } else {
            setCameraGate("ready");
          }
          return;
        }
        permissionStatus = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });
        if (cancelled) return;
        if (permissionStatus.state === "granted") {
          tryEmitCameraGranted("permissions_api");
          setCameraGate("ready");
          return;
        }
        if (permissionStatus.state === "denied") {
          tryEmitCameraDenied("permissions_api");
          setCameraGate("blocked");
          return;
        }
        setCameraGate("ready");
        onPermissionChange = () => {
          if (!permissionStatus || cancelled) return;
          if (permissionStatus.state === "granted") {
            removePermissionListener();
            tryEmitCameraGranted("permissions_api");
            setCameraGate("ready");
          } else if (permissionStatus.state === "denied") {
            removePermissionListener();
            tryEmitCameraDenied("permissions_api");
            setCameraGate("blocked");
          }
        };
        permissionStatus.addEventListener("change", onPermissionChange);
      } catch {
        if (cancelled) return;
        const outcome = await tryGetUserMediaPermissionOutcome();
        if (cancelled) return;
        if (outcome === "granted") {
          tryEmitCameraGranted("get_user_media_fallback");
          setCameraGate("ready");
        } else if (outcome === "denied") {
          tryEmitCameraDenied("get_user_media_fallback");
          setCameraGate("blocked");
        } else {
          setCameraGate("ready");
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
      removePermissionListener();
    };
  }, [
    sessionId,
    tryEmitCameraGranted,
    tryEmitCameraDenied,
    permissionProbeNonce,
  ]);

  const isCameraAccessLivenessError = (livenessError: unknown): boolean =>
    typeof livenessError === "object" &&
    livenessError !== null &&
    "state" in livenessError &&
    (livenessError as { state: string }).state === "CAMERA_ACCESS_ERROR";

  // Biffle JWT is not Cognito — FaceLivenessDetector's default fetchAuthSession() has no creds.
  // Core + credentialProvider: backend returns STS keys for Rekognition streaming.
  const credentialProvider = useCallback(async () => {
    const c = await fetchRekognitionStreamCredentials(token, sessionId);
    return {
      accessKeyId: c.accessKeyId,
      secretAccessKey: c.secretAccessKey,
      sessionToken: c.sessionToken,
      ...(c.expiration ? { expiration: c.expiration } : {}),
    };
  }, [token, sessionId]);

  return (
    <ThemeProvider theme={professionalLivenessTheme}>
      <CreatorVerificationScreenLayout variant="fill">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col min-h-[65dvh] sm:max-w-xl lg:max-w-2xl">
          {cameraGate === "probing" ? (
            <CameraProbeSkeleton />
          ) : cameraGate === "blocked" ? (
            <CameraAccessBlockedPanel onCheckAgain={handleRetryCameraAccess} />
          ) : (
            <FaceLivenessDetectorCore
              displayText={livenessDisplayText}
              sessionId={sessionId}
              region={awsRegion}
              config={{ credentialProvider }}
              onAnalysisComplete={async () => {
                if (selfieEmittedForSessionRef.current !== sessionId) {
                  selfieEmittedForSessionRef.current = sessionId;
                  enqueueCreatorVerificationAnalyticsEvent(analyticsContext, {
                    eventName: "selfie_clicked",
                    sessionId,
                    extraParams: { liveness_complete: true },
                  });
                }
                await onAnalysisComplete();
              }}
              onError={(
                livenessError: { state?: string; error?: { message?: string } }
              ) => {
                if (isCameraAccessLivenessError(livenessError)) {
                  tryEmitCameraDenied("liveness_component");
                  setCameraGate("blocked");
                  return;
                }
                onError({
                  error: {
                    message:
                      livenessError.error?.message ?? "Liveness check failed",
                  },
                });
              }}
              disableStartScreen={false}
            />
          )}
        </div>
      </CreatorVerificationScreenLayout>
    </ThemeProvider>
  );
}
