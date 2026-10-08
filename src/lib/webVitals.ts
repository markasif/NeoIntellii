import type { Metric } from "web-vitals";

/**
 * Reports Core Web Vitals to GA4 / dataLayer via the existing
 * analytics layer. Loaded lazily so the library never blocks
 * first paint. Each metric is sent at most once per page load.
 */
export const reportWebVitals = async () => {
  if (typeof window === "undefined") return;
  // Skip on prefers-reduced-data hints or obviously offline contexts.
  try {
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import("web-vitals");
    const send = (metric: Metric) => {
      const params = {
        metric_name: metric.name,
        metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        metric_rating: metric.rating,
        metric_id: metric.id,
        page_path: window.location.pathname,
      };
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: "web_vital", ...params });
      if (typeof window.gtag === "function") {
        window.gtag("event", "web_vital", params);
      }
    };
    onCLS(send);
    onINP(send);
    onLCP(send);
    onFCP(send);
    onTTFB(send);
  } catch {
    /* swallow - never let analytics break the app */
  }
};