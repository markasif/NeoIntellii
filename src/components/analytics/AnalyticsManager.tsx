import { useEffect } from "react";
import { captureAttributionFromUrl } from "@/lib/attribution";
import { trackPageView } from "@/lib/analytics";
import { reportWebVitals } from "@/lib/webVitals";

/**
 * Mounted once at the app root. Captures marketing attribution on
 * first paint and fires a page_view on every route change so SPA
 * navigations are tracked in GA4 / GTM correctly.
 */
export default function AnalyticsManager({ pathname, search = "" }: { pathname: string; search?: string }) {

  useEffect(() => {
    captureAttributionFromUrl();
    // Defer Web Vitals reporting until the browser is idle so it
    // never competes with hydration or LCP work.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(() => void reportWebVitals());
    } else {
      window.setTimeout(() => void reportWebVitals(), 1500);
    }
  }, []);

  useEffect(() => {
    // Defer to next tick so the route-level <title> update lands first.
    const id = window.setTimeout(() => {
      trackPageView(pathname + (search || ""), document.title);
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname, search]);

  return null;
}