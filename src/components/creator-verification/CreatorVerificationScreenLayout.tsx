import type { ReactNode } from "react";

const shell =
  "flex w-full flex-col bg-gray-50 " +
  "min-h-[100dvh] min-h-screen " +
  "px-4 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] " +
  "sm:px-6 sm:pt-[max(1.5rem,env(safe-area-inset-top,0px))] sm:pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]";

type CreatorVerificationScreenLayoutProps = {
  children: ReactNode;
  /**
   * `centered` — static result / loading screens (default).
   * `fill` — liveness: full viewport column so the detector can size correctly.
   */
  variant?: "centered" | "fill";
};

export default function CreatorVerificationScreenLayout({
  children,
  variant = "centered",
}: CreatorVerificationScreenLayoutProps) {
  if (variant === "fill") {
    return (
      <div className={shell}>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    );
  }

  return (
    <div className={`${shell} items-center justify-center`}>{children}</div>
  );
}

/** Inner width constraint: full width on phones, capped on larger viewports. */
export const CREATOR_VERIFICATION_CONTENT_CLASS =
  "w-full max-w-sm sm:max-w-md mx-auto";
