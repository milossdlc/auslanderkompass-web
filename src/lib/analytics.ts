export type AnalyticsEvent = { name: string; path: string; lang?: string; view?: string };

export function track(event: AnalyticsEvent) {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  if (!endpoint) return;
  try {
    const body = JSON.stringify({ ...event, ts: new Date().toISOString() });
    if (navigator.sendBeacon) navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    else void fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch { /* analytics must never affect the app */ }
}
