import { CAL_BOOKING_URL } from "@/lib/constants";
import type { BookCallPlacement } from "@/lib/dataLayer";

/**
 * Lead attribution for AI GCC CTAs.
 *
 * Every AI GCC call-to-action lands on /book-a-call and carries three
 * parameters the booking page echoes into `cta_book_call_click` and
 * `meeting_booked`: the page the click came from, the service the visitor
 * was reading about and the CTA label they clicked. No new analytics
 * platform is involved; these ride the existing dataLayer/gtag events.
 */
export interface AiGccCtaParams {
  sourcePage: string;
  serviceInterest: string;
  ctaName: string;
  placement?: BookCallPlacement;
  /** cal.com event type key from CAL_EVENT_TYPES. AI GCC pages book the AI call; AI Talent pages book the staffing call. */
  eventType?: "ai" | "staffing" | "gcc" | "neohirex";
}

export const AI_GCC_LEAD_PARAM_KEYS = ["source_page", "service_interest", "cta_name"] as const;
export type AiGccLeadParamKey = (typeof AI_GCC_LEAD_PARAM_KEYS)[number];

export const aiGccBookingUrl = ({ sourcePage, serviceInterest, ctaName, placement = "hero", eventType = "ai" }: AiGccCtaParams) => {
  const params = new URLSearchParams();
  params.set("placement", placement);
  params.set("type", eventType);
  params.set("source_page", sourcePage);
  params.set("service_interest", serviceInterest);
  params.set("cta_name", ctaName);
  return `${CAL_BOOKING_URL}?${params.toString()}`;
};

/** Reads the AI GCC lead parameters back off a query string, dropping blanks and over-long values. */
export const readAiGccLeadParams = (search: string): Partial<Record<AiGccLeadParamKey, string>> => {
  const params = new URLSearchParams(search);
  const result: Partial<Record<AiGccLeadParamKey, string>> = {};
  for (const key of AI_GCC_LEAD_PARAM_KEYS) {
    const value = params.get(key)?.trim();
    if (value && value.length <= 120) result[key] = value;
  }
  return result;
};
