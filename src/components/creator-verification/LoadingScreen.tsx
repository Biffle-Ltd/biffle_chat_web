import CreatorVerificationScreenLayout, {
  CREATOR_VERIFICATION_CONTENT_CLASS,
} from "./CreatorVerificationScreenLayout";

export default function LoadingScreen() {
  return (
    <CreatorVerificationScreenLayout>
      <div
        className={`${CREATOR_VERIFICATION_CONTENT_CLASS} flex flex-col items-center gap-6 sm:gap-8`}
      >
        <div
          className="size-14 animate-pulse rounded-full bg-[#E91E8C] shadow-lg shadow-[#E91E8C]/30 sm:size-16"
          aria-hidden
        />
        <p className="max-w-[20ch] text-center text-base font-medium leading-snug text-gray-700 sm:max-w-none">
          Setting up your verification...
        </p>
      </div>
    </CreatorVerificationScreenLayout>
  );
}
