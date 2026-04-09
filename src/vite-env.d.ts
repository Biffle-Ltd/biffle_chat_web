/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  /** Overrides `verifApiUri` for creator verification APIs only. */
  readonly VITE_VERIF_API_BASE_URL?: string;
  readonly VITE_PUBLIC_AWS_REGION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
