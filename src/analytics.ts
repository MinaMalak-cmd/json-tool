import { ANALYTICS } from "./config";

/**
 * Privacy-friendly, cookie-less analytics.
 *
 * No personal data is collected and there is NO authentication in this app.
 * Instead we send anonymous page-view pings to a hosted analytics provider
 * (Plausible or GoatCounter); the stats dashboard lives on that provider and
 * is protected by *their* login — so only you can see it.
 *
 * Nothing loads unless the corresponding env var is set at build time, so the
 * default open-source build ships zero tracking.
 */
export function initAnalytics(): void {
  if (typeof document === "undefined") return;

  const { plausibleDomain, goatCounterUrl } = ANALYTICS;

  if (plausibleDomain) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = plausibleDomain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
    return;
  }

  if (goatCounterUrl) {
    const script = document.createElement("script");
    script.async = true;
    script.dataset.goatcounter = goatCounterUrl;
    script.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(script);
  }
}
