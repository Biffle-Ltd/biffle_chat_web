import "@aws-amplify/ui-react/styles.css";
import "@aws-amplify/ui-react-liveness/styles.css";
import "../styles/creator-verification-liveness.css";

import { createTheme, ThemeProvider } from "@aws-amplify/ui-react";
import { FaceLivenessDetectorCore } from "@aws-amplify/ui-react-liveness";
import { useCallback } from "react";
import CreatorVerificationScreenLayout from "../components/creator-verification/CreatorVerificationScreenLayout";
import { fetchRekognitionStreamCredentials } from "../services/creatorVerificationApi";

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

export type CreatorVerificationLivenessViewProps = {
  token: string;
  sessionId: string;
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
  onAnalysisComplete,
  onError,
}: CreatorVerificationLivenessViewProps) {
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
          <FaceLivenessDetectorCore
            displayText={livenessDisplayText}
            sessionId={sessionId}
            region={awsRegion}
            config={{ credentialProvider }}
            onAnalysisComplete={async () => {
              await onAnalysisComplete();
            }}
            onError={(livenessError) => {
              onError({
                error: {
                  message:
                    livenessError.error?.message ?? "Liveness check failed",
                },
              });
            }}
            disableStartScreen={false}
          />
        </div>
      </CreatorVerificationScreenLayout>
    </ThemeProvider>
  );
}
