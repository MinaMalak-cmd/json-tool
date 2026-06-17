/**
 * Central, edit-in-one-place configuration for owner-specific links and
 * integrations. Values can be overridden at build time via Vite env vars
 * (prefixed `VITE_`) without touching source.
 */

const env = import.meta.env;

export const SITE = {
  /** Public URL the app is deployed at (used for canonical/SEO). */
  url: env.VITE_SITE_URL ?? "https://MinaMalak-cmd.github.io/json-tool/",
  name: "JSON Studio",
};

export const OWNER = {
  name: "Mina Malak",
  email: "mina.malak.tomas@gmail.com",
  linkedIn: "https://www.linkedin.com/in/mina-malak-tomas/",
  github: env.VITE_GITHUB_URL ?? "https://github.com/MinaMalak-cmd/json-tool",
};

/**
 * Buy Me a Coffee page URL. Create a free page at https://buymeacoffee.com,
 * then set VITE_BMC_URL (or replace the fallback) with your page link.
 * Leave empty to hide the button.
 */
export const BUY_ME_A_COFFEE_URL =
  env.VITE_BMC_URL ?? "https://www.buymeacoffee.com/";

/**
 * Privacy-friendly analytics. Set ONE of these at build time to enable
 * page-view tracking without cookies or auth code in the app:
 *  - VITE_PLAUSIBLE_DOMAIN: your domain registered in Plausible.
 *  - VITE_GOATCOUNTER_URL:  your GoatCounter endpoint, e.g.
 *      https://YOURCODE.goatcounter.com/count
 * The stats dashboard is hosted (and access-controlled) by the provider.
 */
export const ANALYTICS = {
  plausibleDomain: env.VITE_PLAUSIBLE_DOMAIN as string | undefined,
  goatCounterUrl: env.VITE_GOATCOUNTER_URL as string | undefined,
};
