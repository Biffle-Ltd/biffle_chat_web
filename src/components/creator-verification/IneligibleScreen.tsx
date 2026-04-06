import { Info } from "lucide-react";
import { postToRN, RN_EVENTS } from "../../utils/rnBridge";
import CreatorVerificationScreenLayout, {
  CREATOR_VERIFICATION_CONTENT_CLASS,
} from "./CreatorVerificationScreenLayout";

export default function IneligibleScreen() {
  const handleClose = () => {
    postToRN(RN_EVENTS.CLOSE);
  };

  return (
    <CreatorVerificationScreenLayout>
      <div
        className={`${CREATOR_VERIFICATION_CONTENT_CLASS} flex flex-col items-center gap-6 text-center sm:gap-8`}
      >
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gray-200 sm:size-16">
          <Info
            className="size-8 text-gray-600 sm:size-9"
            strokeWidth={2}
            aria-hidden
          />
        </div>

        <div className="w-full space-y-3">
          <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
            Not Available
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-gray-600 sm:text-base">
            Creator verification is currently available for female creators only.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-full max-w-xs min-h-[44px] touch-manipulation rounded-xl bg-[#E91E8C] px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-[#E91E8C]/25 transition-colors hover:bg-[#d41a7d] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2"
        >
          Close
        </button>
      </div>
    </CreatorVerificationScreenLayout>
  );
}
