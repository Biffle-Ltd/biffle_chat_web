import { XCircle } from "lucide-react";
import { postToRN, RN_EVENTS } from "../../utils/rnBridge";
import CreatorVerificationScreenLayout, {
  CREATOR_VERIFICATION_CONTENT_CLASS,
} from "./CreatorVerificationScreenLayout";

type ErrorScreenProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  const handleClose = () => {
    postToRN(RN_EVENTS.CLOSE);
  };

  return (
    <CreatorVerificationScreenLayout>
      <div
        className={`${CREATOR_VERIFICATION_CONTENT_CLASS} flex flex-col items-center gap-6 text-center sm:gap-8`}
      >
        <XCircle
          className="size-[4.5rem] shrink-0 text-red-500 sm:size-20"
          strokeWidth={1.75}
          aria-hidden
        />

        <p className="w-full text-pretty text-sm leading-relaxed text-gray-700 sm:text-base">
          {message}
        </p>

        <div className="flex w-full max-w-xs flex-col gap-3">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="w-full min-h-[44px] touch-manipulation rounded-xl border-2 border-[#E91E8C] bg-white px-6 py-3.5 text-base font-semibold text-[#E91E8C] transition-colors hover:bg-pink-50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2"
            >
              Try Again
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleClose}
            className="w-full min-h-[44px] touch-manipulation rounded-xl bg-[#E91E8C] px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-[#E91E8C]/25 transition-colors hover:bg-[#d41a7d] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </CreatorVerificationScreenLayout>
  );
}
