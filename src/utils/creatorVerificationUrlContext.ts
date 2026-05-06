
export type CreatorVerificationAnalyticsContext = {
  token: string;
  /** From `user_id` query param, else null. */
  resolvedUserId: string | null;
  userProperties: Record<string, unknown>;
  deviceInfo: Record<string, unknown>;
  appInfo: Record<string, unknown>;
};

function parseJsonObjectParam(params: URLSearchParams, key: string): Record<string, unknown> {
  const raw = params.get(key);
  if (raw == null || raw.trim() === "") return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return {};
  } catch {
    return {};
  }
}

/** Prefer explicit param, then JWT `uid`, then `sub`. */
export function resolveCreatorVerificationUserId(
  userIdFromParam: string | null
): string | null {
  if (typeof userIdFromParam === "string" && userIdFromParam.trim() !== "") {
    return userIdFromParam.trim();
  }
  return null;
}

/** Reads analytics-related search params alongside `token` (provided separately after validation). */
export function buildCreatorVerificationAnalyticsContext(
  token: string,
  search: string
): CreatorVerificationAnalyticsContext {
  const params = new URLSearchParams(search);
  const userIdParam = params.get("user_id");
  return {
    token,
    resolvedUserId: resolveCreatorVerificationUserId(userIdParam),
    userProperties: parseJsonObjectParam(params, "user_properties"),
    deviceInfo: parseJsonObjectParam(params, "device_info"),
    appInfo: parseJsonObjectParam(params, "app_info"),
  };
}
