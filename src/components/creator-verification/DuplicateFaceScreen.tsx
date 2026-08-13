import { UserX } from "lucide-react";
import { postToRN, RN_EVENTS } from "../../utils/rnBridge";
import CreatorVerificationScreenLayout, {
  CREATOR_VERIFICATION_CONTENT_CLASS,
} from "./CreatorVerificationScreenLayout";

/**
 * Hard block after verify 409 + verification_duplicate_face.
 * No liveness retry — a new session still 409s and costs AWS.
 */
export default function DuplicateFaceScreen() {
  const handleClose = () => {
    postToRN(RN_EVENTS.CLOSE);
  };

  const handleHome = () => {
    postToRN(RN_EVENTS.CLOSE);
    window.location.assign("/");
  };

  return (
    <CreatorVerificationScreenLayout>
      <div
        className={`${CREATOR_VERIFICATION_CONTENT_CLASS} flex flex-col items-center gap-6 text-center sm:gap-8`}
      >
        <UserX
          className="size-[4.5rem] shrink-0 text-red-500 sm:size-20"
          strokeWidth={1.75}
          aria-hidden
        />

        <div className="w-full space-y-3">
          <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
            Face already registered
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-gray-600 sm:text-base">
            This face is already registered to another account. If you think this
            is a mistake, contact support.
          </p>
        </div>

        <div className="flex w-full max-w-xs flex-col gap-3">
          <a
            href="/support"
            className="flex w-full min-h-[44px] touch-manipulation items-center justify-center rounded-xl border-2 border-[#E91E8C] bg-white px-6 py-3.5 text-base font-semibold text-[#E91E8C] transition-colors hover:bg-pink-50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2"
          >
            Contact support
          </a>
          <button
            type="button"
            onClick={handleClose}
            className="w-full min-h-[44px] touch-manipulation rounded-xl bg-[#E91E8C] px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-[#E91E8C]/25 transition-colors hover:bg-[#d41a7d] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleHome}
            className="w-full min-h-[44px] touch-manipulation rounded-xl px-6 py-2 text-sm font-medium text-gray-600 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          >
            Back to home
          </button>
        </div>
      </div>
    </CreatorVerificationScreenLayout>
  );
}
