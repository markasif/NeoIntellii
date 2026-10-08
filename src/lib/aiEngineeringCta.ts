import { CAL_BOOKING_URL } from "@/lib/constants";
import type { BookCallPlacement } from "@/lib/dataLayer";

/**
 * Lead context for AI Engineering CTAs.
 *
 * Every primary CTA in the section lands on /book-a-call and carries the
 * page it came from, the service the visitor was reading about and the CTA
 * label. The three keys (source_page, service_interest, cta_name) match the
 * convention the AI GCC section uses, so a single reader on the booking page
 * serves both sections. The secondary CTA lands on /contact, where the same
 * three values are written into hidden fields of the existing Netlify form.
 *
 * No new form system or analytics platform is introduced.
 */
export interface AiEngineeringCtaParams {
  sourcePage: string;
  serviceInterest: string;
  ctaName: string;
  placement?: BookCallPlacement;
}

export const AI_ENGINEERING_LEAD_PARAM_KEYS = ["source_page", "service_interest", "cta_name"] as const;
export type AiEngineeringLeadParamKey = (typeof AI_ENGINEERING_LEAD_PARAM_KEYS)[number];

/** Contact-form topic pre-selected for AI Engineering enquiries. Must match the option list in Contact.tsx. */
export const AI_ENGINEERING_CONTACT_TOPIC = "Enterprise AI engineering";

const leadParams = ({ sourcePage, serviceInterest, ctaName }: AiEngineeringCtaParams) => {
  const params = new URLSearchParams();
  params.set("source_page", sourcePage);
  params.set("service_interest", serviceInterest);
  params.set("cta_name", ctaName);
  return params;
};

/** Booking link that opens the AI conversation type with lead context attached. */
export const aiEngineeringBookingUrl = (input: AiEngineeringCtaParams) => {
  const params = leadParams(input);
  params.set("placement", input.placement ?? "hero");
  params.set("type", "ai");
  return `${CAL_BOOKING_URL}?${params.toString()}`;
};

/** Contact-form link with the topic pre-selected and lead context attached. */
export const aiEngineeringContactUrl = (input: AiEngineeringCtaParams) => {
  const params = leadParams(input);
  params.set("topic", AI_ENGINEERING_CONTACT_TOPIC);
  return `/contact?${params.toString()}`;
};

/** Reads lead parameters off a query string, dropping blanks and over-long values. */
export const readAiEngineeringLeadParams = (search: string): Partial<Record<AiEngineeringLeadParamKey, string>> => {
  const params = new URLSearchParams(search);
  const result: Partial<Record<AiEngineeringLeadParamKey, string>> = {};
  for (const key of AI_ENGINEERING_LEAD_PARAM_KEYS) {
    const value = params.get(key)?.trim();
    if (value && value.length <= 120) result[key] = value;
  }
  return result;
};
