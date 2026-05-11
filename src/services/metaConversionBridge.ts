import type { CreatorVerificationAnalyticsContext } from "../utils/creatorVerificationUrlContext";
import type { VerifyResult } from "./creatorVerificationApi";

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

function getBridgeBaseUrl(): string | null {
  const raw = import.meta.env.VITE_META_CONVERSION_BRIDGE_URL;
  if (typeof raw !== "string" || raw.trim() === "") return null;
  try {
    const u = new URL(raw.trim());
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return u.href;
  } catch {
    return null;
  }
}

/**
 * Appends `access_token` as a query parameter — same shape as Django's
 * `requests.post(url, params={"access_token": access_token})`.
 *
 * Do **not** put Meta's real Graph token in `VITE_*`; use a bridge-only
 * credential here. The server holds the actual `META_ACCESS_TOKEN`.
 */
function buildBridgeUrlWithAccessToken(baseUrl: string): string {
  const u = new URL(baseUrl);
  const bridgeToken =
    import.meta.env.VITE_META_CONVERSION_BRIDGE_ACCESS_TOKEN?.trim();
  if (bridgeToken) {
    u.searchParams.set("access_token", bridgeToken);
  }
  return u.href;
}

export function enqueueFemaleVerificationCapiBridge(params: {
  analyticsContext: CreatorVerificationAnalyticsContext;
  verifyResult: VerifyResult;
  sessionId: string;
}): void {
  const baseUrl = getBridgeBaseUrl();
  if (baseUrl == null) return;

  const { analyticsContext, verifyResult, sessionId } = params;
  const user_id = readUserIdAsNumber(analyticsContext.resolvedUserId);
  const device_id = readDeviceId(analyticsContext.deviceInfo);

  // user_data — identifiers only; backend hashes external_id before Graph call.
  const user_data: Record<string, unknown> = {};
  if (user_id !== undefined) user_data.external_id = user_id;

  // custom_data — all non-standard / app-specific fields.
  const custom_data: Record<string, unknown> = {
    content_name: "Creator Verification",
    content_category: "verification",
    session_id: sessionId,
    passed: verifyResult.passed,
    score: verifyResult.score,
    gender: verifyResult.gender,
    gender_confidence: verifyResult.genderConfidence,
    message: verifyResult.message,
    platform: "website",
  };
  if (device_id !== undefined) custom_data.device_id = device_id;

  const body = {
    data: [
      {
        event_name: "female_verification_complete",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data,
        custom_data,
      },
    ],
  };

  const requestUrl = buildBridgeUrlWithAccessToken(baseUrl);

  void fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "omit",
  }).catch(() => {});
}
