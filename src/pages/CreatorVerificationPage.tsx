import { lazy, Suspense, useEffect } from "react";
import AlreadyVerifiedScreen from "../components/creator-verification/AlreadyVerifiedScreen";
import ErrorScreen from "../components/creator-verification/ErrorScreen";
import IneligibleScreen from "../components/creator-verification/IneligibleScreen";
import InvalidTokenScreen from "../components/creator-verification/InvalidTokenScreen";
import LoadingScreen from "../components/creator-verification/LoadingScreen";
import SuccessScreen from "../components/creator-verification/SuccessScreen";
import VerifyingScreen from "../components/creator-verification/VerifyingScreen";
import { useCreatorVerification } from "../hooks/useCreatorVerification";

const CreatorVerificationLivenessView = lazy(
  () => import("./CreatorVerificationLivenessView")
);

function useVerificationBodyStyles() {
  useEffect(() => {
    const previous = {
      margin: document.body.style.margin,
      padding: document.body.style.padding,
      overflowX: document.body.style.overflowX,
      overflowY: document.body.style.overflowY,
    };
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    return () => {
      document.body.style.margin = previous.margin;
      document.body.style.padding = previous.padding;
      document.body.style.overflowX = previous.overflowX;
      document.body.style.overflowY = previous.overflowY;
    };
  }, []);
}

type CreatorVerificationViewProps = {
  token: string;
};

function CreatorVerificationView({ token }: CreatorVerificationViewProps) {
  const {
    stage,
    sessionId,
    result,
    error,
    handleAnalysisComplete,
    handleLivenessError,
  } = useCreatorVerification({ token });

  switch (stage) {
    case "loading":
      return <LoadingScreen />;
    case "liveness":
      return sessionId ? (
        <Suspense fallback={<LoadingScreen />}>
          <CreatorVerificationLivenessView
            token={token}
            sessionId={sessionId}
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleLivenessError}
          />
        </Suspense>
      ) : (
        <LoadingScreen />
      );
    case "verifying":
      return <VerifyingScreen />;
    case "success":
      return result ? (
        <SuccessScreen result={result} />
      ) : (
        <LoadingScreen />
      );
    case "error":
      return (
        <ErrorScreen
          message={error ?? "Something went wrong"}
          onRetry={() => window.location.reload()}
        />
      );
    case "ineligible":
      return <IneligibleScreen />;
    case "already_verified":
      return <AlreadyVerifiedScreen />;
    default:
      return <LoadingScreen />;
  }
}

export default function CreatorVerificationPage() {
  useVerificationBodyStyles();

  const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    return <InvalidTokenScreen />;
  }

  return <CreatorVerificationView token={token} />;
}
