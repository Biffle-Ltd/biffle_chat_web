/**
 * Posts messages to the host React Native WebView.
 * Token is read from URL params elsewhere — not from RN messages.
 */
export function postToRN(type: string, payload?: object) {
  const message = JSON.stringify({ type, payload: payload ?? {} });
  if ((window as any).ReactNativeWebView) {
    (window as any).ReactNativeWebView.postMessage(message);
  } else {
    // fallback for browser testing
    console.log("[RN Bridge]", type, payload);
  }
}

export const RN_EVENTS = {
  VERIFICATION_COMPLETE: "VERIFICATION_COMPLETE",
  VERIFICATION_FAILED: "VERIFICATION_FAILED",
  ALREADY_VERIFIED: "ALREADY_VERIFIED",
  INELIGIBLE: "INELIGIBLE",
  CLOSE: "CLOSE",
} as const;
