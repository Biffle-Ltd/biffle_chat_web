import type { CreatorVerificationAnalyticsContext } from "./creatorVerificationUrlContext";
import type { VerifyResult } from "../services/creatorVerificationApi";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function readDeviceId(deviceInfo: Record<string, unknown>): string | undefined {
  const raw = deviceInfo.device_id;
  if (raw == null) return undefined;
  const s = String(raw).trim();
  return s === "" ? undefined : s;
}

/** Best-effort numeric user id from analytics URL context. */
function readUserIdAsNumber(userIdStr: string | null): number | undefined {
  if (userIdStr == null || userIdStr.trim() === "") return undefined;
  const n = Number(userIdStr.trim());
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Meta Pixel custom event fired only after a successful `/verify/` response that
 * qualifies as female completion (aligned with analytics `female_verification_complete`).
 * Payload mirrors the requested shape: verify `data`-like fields plus platform metadata.
 */
export function trackFemaleVerificationCompleteMeta(params: {
  analyticsContext: CreatorVerificationAnalyticsContext;
  verifyResult: VerifyResult;
}): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  const { analyticsContext, verifyResult } = params;

  const user_id = readUserIdAsNumber(analyticsContext.resolvedUserId);
  const device_id = readDeviceId(analyticsContext.deviceInfo);

  const customData: Record<string, unknown> = {
    timestamp: Math.floor(Date.now() / 1000),
    passed: verifyResult.passed,
    score: verifyResult.score,
    gender: verifyResult.gender,
    genderConfidence: verifyResult.genderConfidence,
    message: verifyResult.message,
    platform: "web",
  };

  if (user_id !== undefined) {
    customData.user_id = user_id;
  }
  if (device_id !== undefined) {
    customData.device_id = device_id;
  }

  window.fbq("trackCustom", "female_verification_complete", customData);

  console.log(
    "[Meta Pixel] trackCustom female_verification_complete",
    customData,
  );
}
