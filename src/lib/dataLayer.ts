/**
 * Campaign measurement layer for the Google Ads build.
 *
 * This is deliberately separate from `@/lib/analytics`:
 *
 *   - `trackEvent` (analytics.ts) is the site's own product analytics. It
 *     enriches every push with stored attribution and forwards some events to
 *     the Supabase edge function.
 *   - `track` (here) speaks the exact contract the Ads implementer's GTM
 *     container is built against: fixed event names, fixed snake_case
 *     parameter names, no extra keys.
 *
 * The two coexist on purpose - renaming or re-shaping the product events to
 * fit the ad container would break existing GA4 reports, and enriching the ad
 * events would put values into the container that its tags do not expect.
 *
 * Nothing here may carry a raw estimate, a raw salary or free text. Money is
 * reported as a bucket, everything else as an enumerated value. The one piece
 * of personal data that travels is the email address on the two lead events,
 * for Google Ads enhanced conversions (see D4 of the campaign brief).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Which of the two calculator pages an event came from. */
export type PageVariant = "public" | "lp";

/** Where a booking CTA sits. Matches the `placement` values in the brief. */
export type BookCallPlacement = "hero" | "sticky" | "results" | "footer_cta" | "sitelink";

export type MonthlyBucket = "lt25k" | "25k_50k" | "50k_100k" | "100k_200k" | "gt200k";

/** Enhanced-conversions payload. Email only - never name, never phone. */
export interface UserData {
  email: string;
}

export interface TrackParams {
  [key: string]: unknown;
  user_data?: UserData;
}

/**
 * The site currently runs gtag directly rather than a GTM container (see
 * pages/_app.tsx). Pushing to `dataLayer` is what the brief specifies and is
 * what a container will read once installed; mirroring the same event into
 * gtag means GA4 records it in the meantime, with identical names, so nothing
 * has to be renamed when GTM lands.
 */
const mirrorToGtag = (event: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const { user_data: userData, ...rest } = params as TrackParams;
  if (userData?.email) {
    // gtag's own enhanced-conversions shape: user data is set on the client,
    // not passed as an event parameter. GTM hashes it; so does gtag.
    window.gtag("set", "user_data", { email: userData.email });
  }
  window.gtag("event", event, rest);
};

export const track = (event: string, params: TrackParams = {}) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  mirrorToGtag(event, params);
};

/**
 * Buckets a monthly estimate. The calculator produces a low-high range, so the
 * midpoint is what gets bucketed - the low alone would systematically report a
 * cheaper band than the visitor is looking at.
 */
export const monthlyBucket = (monthly: number): MonthlyBucket => {
  if (monthly < 25_000) return "lt25k";
  if (monthly < 50_000) return "25k_50k";
  if (monthly < 100_000) return "50k_100k";
  if (monthly < 200_000) return "100k_200k";
  return "gt200k";
};

export const bucketForRange = (low: number, high: number): MonthlyBucket =>
  monthlyBucket(Math.round((low + high) / 2));

/** Normalises an address for enhanced conversions: lowercased and trimmed, never hashed here. */
export const userDataForEmail = (email: string): UserData => ({ email: email.trim().toLowerCase() });
