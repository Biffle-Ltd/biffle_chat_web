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

/** Must match eligibility UI in SuccessScreen (“score below 90” copy). */
const POST_VERIFY_ANALYTICS_SCORE_MIN = 90;

/** Verify API returns `"Male"` or `"Female"` (comparison is case-insensitive, trimmed). */
function isDetectedMale(gender: string | null | undefined): boolean {
  return typeof gender === "string" && gender.trim().toLowerCase() === "male";
}

function isDetectedFemale(gender: string | null | undefined): boolean {
  return typeof gender === "string" && gender.trim().toLowerCase() === "female";
}

/** Common verify API fields embedded in analytics `event_params` (beyond `session_id`). */
export function verifyResultSummaryParams(
  result: VerifyResult
): Record<string, unknown> {
  return {
    passed: result.passed,
    score: result.score,
    gender: result.gender,
    genderConfidence: result.genderConfidence,
    message: result.message,
  };
}

/**
 * Maps a successful `/verify/` response JSON to which post-verify analytics event to send.
 * - Score strictly below POST_VERIFY_ANALYTICS_SCORE_MIN → `verification_failed` (failure_reason low_liveness_score).
 * - Score at/above threshold + female→ `female_verification_complete`, male→ `male_verification_complete`.
 * - Score OK but gender not exactly `Male` / `Female` (after trim, case-insensitive)→ `verification_failed` (failure_reason gender_uncertain_or_other).
 */
export function resolvePostVerifyAnalyticsEvent(result: VerifyResult): {
  eventName:
    | "female_verification_complete"
    | "male_verification_complete"
    | "verification_failed";
  extraParams: Record<string, unknown>;
} {
  const base = verifyResultSummaryParams(result);

  const scoreNum = Number(result.score);
  if (
    !Number.isFinite(scoreNum) ||
    scoreNum < POST_VERIFY_ANALYTICS_SCORE_MIN
  ) {
    return {
      eventName: "verification_failed",
      extraParams: {
        ...base,
        failure_reason: "low_liveness_score",
      },
    };
  }

  if (isDetectedFemale(result.gender)) {
    return {
      eventName: "female_verification_complete",
      extraParams: base,
    };
  }

  if (isDetectedMale(result.gender)) {
    return {
      eventName: "male_verification_complete",
      extraParams: base,
    };
  }

  return {
    eventName: "verification_failed",
    extraParams: {
      ...base,
      failure_reason: "gender_uncertain_or_other",
    },
  };
}
