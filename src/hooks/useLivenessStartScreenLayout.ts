import { useEffect } from "react";

const START_BUTTON_SELECTOR = ".liveness-detector .amplify-button--primary";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollStartButtonIntoView(root: HTMLElement): boolean {
  const button = root.querySelector(START_BUTTON_SELECTOR) as HTMLElement | null;
  if (!button) return false;

  const scroller = root.closest(
    ".creator-verification-liveness-scroll"
  ) as HTMLElement | null;
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  if (scroller) {
    scroller.scrollTo({ top: scroller.scrollHeight, behavior });
  }
  button.scrollIntoView({ block: "end", behavior });
  return true;
}

/** Auto-scroll once to Start verification when the start-screen CTA mounts. */
export function useLivenessStartScreenLayout(
  rootRef: { readonly current: HTMLElement | null },
  enabled: boolean
): void {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let scrolled = false;
    let observer: MutationObserver | null = null;
    let retryTimer = 0;
    let lateRetry = 0;
    let raf = 0;

    const tryScroll = () => {
      if (cancelled || scrolled) return;
      const root = rootRef.current;
      if (!root) return;
      if (!scrollStartButtonIntoView(root)) return;
      scrolled = true;
      observer?.disconnect();
      observer = null;
    };

    const watchUntilButtonExists = (root: HTMLElement) => {
      tryScroll();
      if (scrolled || cancelled) return;

      observer = new MutationObserver(tryScroll);
      observer.observe(root, { subtree: true, childList: true });
      retryTimer = window.setTimeout(tryScroll, 350);
      lateRetry = window.setTimeout(tryScroll, 1200);
    };

    const start = () => {
      if (cancelled) return;
      const root = rootRef.current;
      if (!root) {
        raf = window.requestAnimationFrame(start);
        return;
      }
      watchUntilButtonExists(root);
    };

    start();

    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      window.clearTimeout(lateRetry);
      window.cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [enabled, rootRef]);
}
