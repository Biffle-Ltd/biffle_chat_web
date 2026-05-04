import { Loader2 } from "lucide-react";
import CreatorVerificationScreenLayout, {
  CREATOR_VERIFICATION_CONTENT_CLASS,
} from "./CreatorVerificationScreenLayout";

export default function VerifyingScreen() {
  return (
    <CreatorVerificationScreenLayout>
      <div
        className={`${CREATOR_VERIFICATION_CONTENT_CLASS} flex flex-col items-center gap-6 sm:gap-8`}
      >
        <Loader2
          className="size-12 animate-spin text-[#E91E8C] sm:size-14"
          strokeWidth={2}
          aria-hidden
        />
        <p className="max-w-[18ch] text-center text-base font-medium leading-snug text-gray-700 sm:max-w-none">
          Analyzing results...
        </p>
      </div>
    </CreatorVerificationScreenLayout>
  );
}
