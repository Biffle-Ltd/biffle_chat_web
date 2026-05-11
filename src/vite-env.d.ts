/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  /** Origin for analytics events ingest (no trailing slash), default https://events.biffle.ai */
  readonly VITE_BIFFLE_EVENTS_API_BASE_URL?: string;
  readonly VITE_PUBLIC_AWS_REGION?: string;
  /**
   * Django (or other) bridge URL — POST JSON body; optional `access_token` query param
   * from `VITE_META_CONVERSION_BRIDGE_ACCESS_TOKEN`.
   */
  readonly VITE_META_CONVERSION_BRIDGE_URL?: string;
  /**
   * If set, appended as query **`?access_token=...`** (same shape as Graph `requests params=`).
   * Must NOT be Meta’s secret Graph token in public builds — bundle exposes all `VITE_*` values.
   */
  readonly VITE_META_CONVERSION_BRIDGE_ACCESS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
