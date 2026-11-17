import type { Analytics } from "firebase/analytics";
import type { CreatorVerificationAnalyticsContext } from "../utils/creatorVerificationUrlContext";
import type { VerifyResult } from "./creatorVerificationApi";

const FIREBASE_APP_NAME = "biffle-analytics";

type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  measurementId: string;
};

function readFirebaseWebConfig(): FirebaseWebConfig | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim() ?? "";
  const appId = import.meta.env.VITE_FIREBASE_APP_ID?.trim() ?? "";
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim() ?? "";
  const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim() ?? "";
  if (!apiKey || !appId || !projectId || !measurementId) return null;

  const authDomain =
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim() ||
    `${projectId}.firebaseapp.com`;

  return { apiKey, authDomain, projectId, appId, measurementId };
}

/** Drop query and hash so the verification token is not sent to Google. */
function urlWithoutSearch(href: string): string | undefined {
  try {
    const url = new URL(href);
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}

function pageLocation(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return urlWithoutSearch(window.location.href);
}

function pageReferrer(): string | undefined {
  if (typeof document === "undefined" || !document.referrer) return undefined;
  return urlWithoutSearch(document.referrer);
}

function analyticsConfig(): Record<string, unknown> {
  const config: Record<string, unknown> = {
    send_page_view: false,
  };
  const location = pageLocation();
  if (location) config.page_location = location;
  const referrer = pageReferrer();
  if (referrer) config.page_referrer = referrer;
  if (import.meta.env.DEV) config.debug_mode = true;
  return config;
}

function femaleVerificationEventParams(
  verifyResult: VerifyResult,
  sessionId: string
): Record<string, string | number> {
  // `session_id` is GA4's own numeric session field. A string here is dropped
  // or can invalidate the hit, so the Rekognition id uses a different name.
  const params: Record<string, string | number> = {
    verification_session_id: sessionId,
    platform: "website",
  };
  const location = pageLocation();
  if (location) params.page_location = location;
  if (Number.isFinite(verifyResult.score)) {
    params.score = verifyResult.score;
  }
  const gender = verifyResult.gender?.trim();
  if (gender) params.gender = gender;
  return params;
}

function isAlreadyInitialized(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "analytics/already-initialized"
  );
}

let analyticsReady: Promise<Analytics | null> | null = null;

function loadAnalytics(): Promise<Analytics | null> {
  if (analyticsReady) return analyticsReady;

  const config = readFirebaseWebConfig();
  if (!config) {
    analyticsReady = Promise.resolve(null);
    return analyticsReady;
  }

  analyticsReady = (async () => {
    const { getApps, initializeApp } = await import("firebase/app");
    const { getAnalytics, initializeAnalytics, isSupported } = await import(
      "firebase/analytics"
    );
    if (!(await isSupported())) {
      console.warn(
        "[firebase analytics] skipped: cookies or IndexedDB are unavailable"
      );
      return null;
    }
    const app =
      getApps().find((existing) => existing.name === FIREBASE_APP_NAME) ??
      initializeApp(config, FIREBASE_APP_NAME);
    try {
      return initializeAnalytics(app, { config: analyticsConfig() });
    } catch (err) {
      if (isAlreadyInitialized(err)) return getAnalytics(app);
      throw err;
    }
  })().catch((err: unknown) => {
    console.error("[firebase analytics] init failed", err);
    return null;
  });
  return analyticsReady;
}

/** Fire-and-forget. No-ops when the Firebase web config or measurement ID is absent. */
export function enqueueFemaleVerificationGoogleAnalytics(params: {
  analyticsContext: CreatorVerificationAnalyticsContext;
  verifyResult: VerifyResult;
  sessionId: string;
}): void {
  const { analyticsContext, verifyResult, sessionId } = params;
  void loadAnalytics()
    .then(async (analytics) => {
      if (!analytics) return;
      const { logEvent, setUserId } = await import("firebase/analytics");
      const userId = analyticsContext.resolvedUserId?.trim();
      if (userId) setUserId(analytics, userId);
      logEvent(
        analytics,
        "female_verification_complete",
        femaleVerificationEventParams(verifyResult, sessionId)
      );
    })
    .catch((err: unknown) => {
      console.error(
        "[firebase analytics] female_verification_complete",
        err
      );
    });
}
