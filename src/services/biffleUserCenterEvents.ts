import type { CreatorVerificationAnalyticsContext } from "../utils/creatorVerificationUrlContext";
import type { VerifyResult } from "./creatorVerificationApi";

const STORE_PATH = "/api/v1/user_center/events/store/";

function getEventsApiOrigin(): string {
  const raw = import.meta.env.VITE_BIFFLE_EVENTS_API_BASE_URL;
  if (typeof raw === "string" && raw.trim() !== "") {
    return raw.trim().replace(/\/$/, "");
  }
  return "https://events.biffle.ai";
}

export type BiffleUserCenterStoreEventBody = {
  event_name: string;
  event_timestamp: number;
  event_params: Record<string, unknown>;
  user_properties: Record<string, unknown>;
  device_info: Record<string, unknown>;
  app_info: Record<string, unknown>;
  user_id?: string;
};

export function buildCreatorVerificationStoreEventBody(
  context: CreatorVerificationAnalyticsContext,
  opts: {
    eventName: string;
    sessionId: string;
    /** Merged into event_params; `session_id` is always set last and cannot be overridden. */
    extraParams?: Record<string, unknown>;
  }
): BiffleUserCenterStoreEventBody {
  const base: BiffleUserCenterStoreEventBody = {
    event_name: opts.eventName,
    event_timestamp: Date.now(),
    event_params: {
      ...(opts.extraParams ?? {}),
      session_id: opts.sessionId,
    },
    user_properties: context.userProperties,
    device_info: context.deviceInfo,
    app_info: context.appInfo,
  };
  if (context.resolvedUserId != null) {
    base.user_id = context.resolvedUserId;
  }
  return base;
}

async function postStoreEvent(
  bearerToken: string,
  body: BiffleUserCenterStoreEventBody
): Promise<void> {
  const url = `${getEventsApiOrigin()}${STORE_PATH}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Events store HTTP ${res.status}${text ? `: ${text.slice(0, 200)}` : ""}`);
  }
}

/** Fire-and-forget; never rejects to callers (logs errors only). */
export function enqueueCreatorVerificationAnalyticsEvent(
  context: CreatorVerificationAnalyticsContext,
  opts: {
    eventName: string;
    sessionId: string;
    extraParams?: Record<string, unknown>;
  }
): void {
  try {
    const body = buildCreatorVerificationStoreEventBody(context, opts);
    void postStoreEvent(context.token, body).catch((err: unknown) => {
      console.error("[creator-verification analytics]", opts.eventName, err);
    });
  } catch (err: unknown) {
    console.error("[creator-verification analytics]", opts.eventName, err);
  }
}

/** Success payload shape for verification_complete analytics. */
export function verifyResultToAnalyticsParams(result: VerifyResult): Record<string, unknown> {
  return {
    success: true,
    passed: result.passed,
    score: result.score,
    gender: result.gender,
    genderConfidence: result.genderConfidence,
    message: result.message,
  };
}
