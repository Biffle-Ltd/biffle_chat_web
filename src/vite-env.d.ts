/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  /** Overrides `verifApiUri` for creator verification APIs only. */
  readonly VITE_VERIF_API_BASE_URL?: string;
  /** Origin for analytics events ingest (no trailing slash), default https://events.biffle.ai */
  readonly VITE_BIFFLE_EVENTS_API_BASE_URL?: string;
  readonly VITE_PUBLIC_AWS_REGION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
