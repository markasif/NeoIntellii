/**
 * Shared constants for the AI Delivery Teams category.
 *
 * Two things live here rather than in each page:
 *
 * 1. The category routes, so the parent, the four engagement-model pages and
 *    the sub-navigation cannot drift apart.
 * 2. AI_ENGINEERING_LINKS - where a team configuration hands off to the
 *    technical capability page that owns that subject. AI Delivery Teams
 *    describes how execution capacity is provided; the technical "how it is
 *    built" content is owned elsewhere, and these links are the seam between
 *    the two. Keeping the map in one place means the seam is re-pointed once
 *    when the AI Engineering pillar lands, not in five page files.
 */

export const AI_DELIVERY_TEAMS = {
 parent: "/services/ai-delivery-teams",
 dedicated: "/services/ai-delivery-teams/dedicated-ai-engineering-team",
 pod: "/services/ai-delivery-teams/ai-delivery-pod",
 fde: "/services/ai-delivery-teams/forward-deployed-ai-engineers",
 transfer: "/services/ai-delivery-teams/ai-team-transfer",
} as const;

/** Technical capability pages a delivery-team configuration maps onto. */
export const AI_ENGINEERING_LINKS = {
 hub: "/services/ai-gcc",
 genai: "/services/ai-gcc/generative-ai",
 data: "/services/ai-gcc/data-engineering",
 mlops: "/services/ai-gcc/mlops",
 evaluation: "/services/ai-gcc/responsible-ai",
 product: "/services/ai-engineering/ai-product-engineering",
 advisory: "/services/ai-gcc/ai-advisory-strategy",
} as const;

/** Where a buyer goes when the answer is not a delivery team. */
export const ECOSYSTEM_LINKS = {
 talent: "/services/ai-talent",
 recruitmentHub: "/services/ai-talent/recruitment-hub",
 microGcc: "/services/micro-gcc",
 aiGcc: "/services/ai-gcc",
 contact: "/contact",
} as const;

/**
 * Lead metadata carried on category CTAs. /contact reads these query keys and
 * submits them with the enquiry so a lead arrives with the page, the service
 * and the button that produced it.
 */
export type CtaMeta = { service: string; cta: string; source: string };

export const ctaHref = ({ service, cta, source }: CtaMeta) =>
 `/contact?service=${encodeURIComponent(service)}&cta=${encodeURIComponent(cta)}&source=${encodeURIComponent(source)}`;

export const SERVICE_INTEREST = {
 parent: "AI Delivery Teams",
 dedicated: "Dedicated AI Engineering Team",
 pod: "AI Delivery Pod",
 fde: "Forward-Deployed AI Engineering",
 transfer: "AI Team Transfer",
} as const;
