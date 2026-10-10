import { bookACallUrl } from "@/lib/constants";
import type { BookCallPlacement } from "@/lib/dataLayer";
import { trackEvent } from "@/lib/analytics";
import type { GccOpsPage } from "@/data/gccOperationsContent";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

/**
 * Every booking CTA in the section lands on /book-a-call (the site's existing
 * lead platform) tagged with its placement.
 */
export const trackGccOpsCta = (page: GccOpsPage, ctaName: string, placement: BookCallPlacement) => {
  trackEvent("cta_click", {
    source_page: page.path,
    service_interest: page.serviceInterest,
    cta_name: ctaName,
    placement,
  });
};

export const gccOpsBookingHref = (placement: BookCallPlacement) => bookACallUrl(placement);

interface GccOperationsCTAProps {
  page: GccOpsPage;
  title: string;
  description: string;
  secondary?: { label: string; href: string };
}

/**
 * Closing call to action for GCC Operations pages.
 * Rebuilt on canonical ExecutiveCTA with 100% design fidelity & analytics tracking.
 */
export default function GccOperationsCTA({ page, title, description, secondary }: GccOperationsCTAProps) {
  return (
    <ExecutiveCTA
      id="gcc-ops-cta"
      eyebrow={page.serviceInterest}
      title={title}
      description={description}
      primaryCta={{
        label: page.ctaLabel,
        href: gccOpsBookingHref("footer_cta"),
        onClick: () => trackGccOpsCta(page, page.ctaLabel, "footer_cta"),
        className: "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#0A224E] hover:bg-[#F19326] hover:text-white px-7 py-3.5 text-sm sm:text-[15px] font-bold tracking-tight shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]",
      }}
      secondaryCta={secondary ? {
        label: secondary.label,
        href: secondary.href,
      } : undefined}
    />
  );
}
