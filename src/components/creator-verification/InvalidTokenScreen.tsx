import { AlertTriangle } from "lucide-react";
import CreatorVerificationScreenLayout, {
  CREATOR_VERIFICATION_CONTENT_CLASS,
} from "./CreatorVerificationScreenLayout";

export default function InvalidTokenScreen() {
  return (
    <CreatorVerificationScreenLayout>
      <div
        className={`${CREATOR_VERIFICATION_CONTENT_CLASS} flex flex-col items-center gap-6 text-center sm:gap-8`}
      >
        <AlertTriangle
          className="size-[4.5rem] shrink-0 text-red-500 sm:size-20"
          strokeWidth={1.75}
          aria-hidden
        />

        <div className="w-full space-y-2">
          <h1 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
            Invalid verification link
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-gray-600 sm:text-base">
            Open this page from the app using a valid link, or request a new
            verification link from support.
          </p>
        </div>
      </div>
    </CreatorVerificationScreenLayout>
  );
}
