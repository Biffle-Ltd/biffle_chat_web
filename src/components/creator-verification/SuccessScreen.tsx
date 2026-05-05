import { motion } from "motion/react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { VerifyResult } from "../../services/creatorVerificationApi";
import { postToRN, RN_EVENTS } from "../../utils/rnBridge";
import CreatorVerificationScreenLayout, {
  CREATOR_VERIFICATION_CONTENT_CLASS,
} from "./CreatorVerificationScreenLayout";

const LIVENESS_SCORE_MIN = 90;

type SuccessScreenProps = {
  result: VerifyResult;
};

/** Match API / Rekognition labels like "Male", "Man" without matching "female". */
function isDetectedMale(gender: string | null | undefined): boolean {
  if (gender == null || typeof gender !== "string") return false;
  const g = gender.trim().toLowerCase();
  if (!g) return false;
  if (g === "female" || g === "woman") return false;
  return g === "male" || g === "man";
}

function isDetectedFemale(gender: string | null | undefined): boolean {
  if (gender == null || typeof gender !== "string") return false;
  const g = gender.trim().toLowerCase();
  if (!g) return false;
  return g === "female" || g === "woman";
}

type OutcomeTone = "success" | "caution";

function getOutcome(result: VerifyResult): {
  tone: OutcomeTone;
  title: string;
  message: string;
} {
  const scoreNum = Number(result.score);
  const scoreOk =
    Number.isFinite(scoreNum) && scoreNum >= LIVENESS_SCORE_MIN;

  if (!scoreOk) {
    return {
      tone: "caution",
      title: "Liveness score below 90",
      message:
        "Your liveness score is below what we need for creator verification. Please try again later in better lighting, with your face clearly visible and centered.",
    };
  }

  if (isDetectedMale(result.gender)) {
    return {
      tone: "caution",
      title: "Not eligible to become a creator",
      message:
        "Creator verification on Biffle is available for female creators only. You cannot become a creator through this flow.",
    };
  }

  if (isDetectedFemale(result.gender) && scoreOk) {
    return {
      tone: "success",
      title: "Verification complete",
      message:
        "You have been verified as a creator on Biffle - Kindly restart the app to continue.",
    };
  }

  return {
    tone: "caution",
    title: "Verification complete",
    message:
      "We couldn't confirm creator eligibility from this check. Try again or contact support if you need help.",
  };
}

export default function SuccessScreen({ result }: SuccessScreenProps) {
  const { tone, title, message } = getOutcome(result);

  const handleDone = () => {
    postToRN(RN_EVENTS.VERIFICATION_COMPLETE, result);
  };

  return (
    <CreatorVerificationScreenLayout>
      <div
        className={`${CREATOR_VERIFICATION_CONTENT_CLASS} flex flex-col items-center text-center gap-6 sm:gap-8`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="flex items-center justify-center"
        >
          {tone === "success" ? (
            <CheckCircle2
              className="size-20 text-green-500 sm:size-24"
              strokeWidth={1.75}
              aria-hidden
            />
          ) : (
            <AlertCircle
              className="size-20 text-amber-500 sm:size-24"
              strokeWidth={1.75}
              aria-hidden
            />
          )}
        </motion.div>

        <div className="w-full space-y-2">
          <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
            {title}
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-gray-700 sm:text-base">
            {message}
          </p>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-left text-sm text-gray-700 shadow-sm space-y-2 sm:px-5 sm:py-4">
            <p>
              <span className="font-semibold text-gray-900">Liveness Score:</span>{" "}
              {Number(result.score).toFixed(2)}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Gender detected:</span>{" "}
              {result.gender != null && String(result.gender).trim() !== ""
                ? result.gender
                : "—"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDone}
          className="w-full max-w-xs min-h-[44px] touch-manipulation rounded-xl bg-[#E91E8C] px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-[#E91E8C]/25 transition-colors hover:bg-[#d41a7d] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2"
        >
          Done
        </button>
      </div>
    </CreatorVerificationScreenLayout>
  );
}
