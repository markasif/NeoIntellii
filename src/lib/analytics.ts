import { getAttribution } from "./attribution";
import { supabase } from "@/integrations/supabase/client";

/**
 * Unified analytics layer. Pushes events to GA4 (via window.gtag),
 * mirrors them into window.dataLayer for any future GTM container,
 * and forwards server-side conversions to the track-conversion
 * edge function for downstream Google Ads / GA4 Measurement Protocol.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type ConversionEvent =
  | "page_view"
  | "contact_form_submit"
  | "blueprint_request"
  | "roi_estimator_complete"
  | "readiness_assessment_complete"
  | "cost_calculator_complete"
  | "cost_calculator_prefilled"
  | "booked_consultation"
  | "qualified_lead"
  | "outbound_click"
  | "cta_click"
  // Engagement events. Measured client-side only, never forwarded server-side.
  | "section_view"
  | "scroll_depth"
  | "faq_open"
  | "lead_form_start"
  // GCC Decision Lab (/lp/gcc-playbook). Coarse attributes only - never a
  // salary, a profile field, an email, a company name or a privacy answer.
  | "workspace_opened"
  | "first_estimate_viewed"
  | "team_template_applied"
  | "assumption_changed"
  | "scenario_compared"
  | "readiness_completed"
  | "export_succeeded"
  | "review_started"
  | "review_submitted"
  | "review_failed";

const SERVER_FORWARDED_EVENTS = new Set<ConversionEvent>([
  "contact_form_submit",
  "blueprint_request",
  "roi_estimator_complete",
  "readiness_assessment_complete",
  "cost_calculator_complete",
  "booked_consultation",
  "qualified_lead",
  "review_submitted",
]);

const pushDataLayer = (event: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
};

const sendGtag = (event: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
};

const forwardToServer = (event: ConversionEvent, params: Record<string, unknown>) => {
  if (!supabase) return;
  // Fire-and-forget; never block the UI on analytics.
  void supabase.functions
    .invoke("track-conversion", {
      body: {
        event,
        params,
        attribution: getAttribution(),
        page: typeof window !== "undefined" ? window.location.pathname : undefined,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
        ts: Date.now(),
      },
    })
    .catch(() => {
      /* swallow - never let analytics break the app */
    });
};

export const trackEvent = (
  event: ConversionEvent,
  params: Record<string, unknown> = {},
) => {
  const enriched = { ...params, ...getAttribution() };
  pushDataLayer(event, enriched);
  sendGtag(event, enriched);
  if (SERVER_FORWARDED_EVENTS.has(event)) {
    forwardToServer(event, params);
  }
};

export const trackPageView = (path: string, title?: string) => {
  pushDataLayer("page_view", { page_path: path, page_title: title });
  sendGtag("page_view", {
    page_path: path,
    page_title: title,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
  });
};