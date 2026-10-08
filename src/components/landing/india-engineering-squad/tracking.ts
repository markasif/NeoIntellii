import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Identifiers and event helpers for /lp/india-engineering-squad.
 *
 * They live in their own module so the page, the header and the form can all
 * tag events without importing each other. Everything routes through the
 * existing analytics layer in src/lib/analytics.ts - no second analytics
 * library is introduced for this page.
 */

/**
 * Netlify form name, declared in public/__forms.html. It doubles as the source
 * tag carried on every submission, so a lead is attributable to this page.
 */
export const FORM_NAME = "lp-squad";

/**
 * Distinct page identifier on every conversion event fired from this page, so
 * its ad groups can be measured separately from the other landing pages.
 */
export const PAGE_ID = "lp-india-engineering-squad";

/** A CTA press that keeps the visitor on the page. */
export const trackCta = (id: string) => trackEvent("cta_click", { location: id, page: PAGE_ID });

/**
 * A cal.com link. Every booking link is both a calendar open and a conversion,
 * so the two events are always fired together rather than at each call site.
 */
export const trackCalendarOpen = (id: string) => {
  trackEvent("cta_click", { location: id, page: PAGE_ID });
  trackEvent("booked_consultation", { source: id, page: PAGE_ID });
};

/** An outbound click to a leader's LinkedIn profile. */
export const trackLeaderLinkedIn = (leader: string, placement: string) =>
  trackEvent("outbound_click", {
    location: "leadership_linkedin_click",
    leader,
    placement,
    page: PAGE_ID,
  });

/** An accordion or FAQ item being opened. Closing is not tracked. */
export const trackFaqOpen = (question: string, group: string) =>
  trackEvent("faq_open", { question, group, page: PAGE_ID });

/** First interaction with the lead form, fired once per page view. */
export const trackFormStart = () => trackEvent("lead_form_start", { form: FORM_NAME, page: PAGE_ID });

/**
 * Fires `section_view` once, the first time the element is at least a quarter
 * on screen. Sections that never come into view never report.
 */
export function useSectionView(id: string) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        trackEvent("section_view", { section: id, page: PAGE_ID });
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id]);

  return ref;
}

const SCROLL_MILESTONES = [25, 50, 75, 90] as const;

/** Reports 25/50/75/90% scroll depth, each milestone at most once. */
export function useScrollDepth() {
  useEffect(() => {
    const reached = new Set<number>();

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;

      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent("scroll_depth", { percent: milestone, page: PAGE_ID });
        }
      }
      if (reached.size === SCROLL_MILESTONES.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
