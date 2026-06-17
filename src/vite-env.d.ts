/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_BMC_URL?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_GOATCOUNTER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
