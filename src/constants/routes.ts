import type { BookCallPlacement } from "@/lib/dataLayer";

export const CAL_BOOKING_URL = "/book-a-call";

export const bookACallUrl = (placement?: BookCallPlacement) =>
  placement ? `${CAL_BOOKING_URL}?placement=${placement}` : CAL_BOOKING_URL;

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  BOOK_A_CALL: "/book-a-call",
  BLOG: "/blog",
  CASE_STUDIES: "/case-studies",
  INDUSTRIES: "/industries",
  BLUEPRINT: "/blueprint",
  GCC_COST_CALCULATOR: "/gcc-cost-calculator",
  SERVICES_GCC: "/services/gcc",
  SERVICES_AI_GCC: "/services/ai-gcc",
  SERVICES_AI_TALENT: "/services/ai-talent",
  SERVICES_AI_ENGINEERING: "/services/ai-engineering",
  SERVICES_AI_DELIVERY_TEAMS: "/services/ai-delivery-teams",
  SERVICES_GCC_OPERATIONS: "/services/gcc-operations",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
  COOKIE_POLICY: "/cookie-policy",
} as const;
