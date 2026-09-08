export type AnalyticsEvent = {
  name: string;
  path: string;
  lang?: string;
  view?: string;
  source?: string;
  guide?: string;
  step?: number;
};

/**
 * Privacy-safe product analytics. Never pass profile answers, dates, city,
 * income, permit data, free text, or other personal information here.
 */
export function track(event: AnalyticsEvent) {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  if (!endpoint) return;
  try {
    const body = JSON.stringify({ ...event, ts: new Date().toISOString() });
    if (navigator.sendBeacon) navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    else void fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch { /* analytics must never affect the app */ }
}

export function trackGuideCta(guide: string, lang: string, source = "guide") {
  track({ name: "guide_to_compass", path: window.location.pathname, lang, source, guide });
  try { sessionStorage.setItem("rk_acquisition_source", source); sessionStorage.setItem("rk_acquisition_guide", guide); } catch { /* optional */ }
}

export function acquisitionContext(): { source?: string; guide?: string } {
  try {
    return {
      source: sessionStorage.getItem("rk_acquisition_source") || undefined,
      guide: sessionStorage.getItem("rk_acquisition_guide") || undefined,
    };
  } catch { return {}; }
}
