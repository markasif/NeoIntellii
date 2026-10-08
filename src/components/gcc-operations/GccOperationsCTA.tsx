import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { bookACallUrl } from "@/lib/constants";
import type { BookCallPlacement } from "@/lib/dataLayer";
import { trackEvent } from "@/lib/analytics";
import type { GccOpsPage } from "@/data/gccOperationsContent";
import AmbientGlow from "@/components/ui/AmbientGlow";

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

export default function GccOperationsCTA({ page, title, description, secondary }: GccOperationsCTAProps) {
  return (
    <section aria-labelledby="gcc-ops-cta-heading" className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-transparent overflow-hidden">
      <AmbientGlow position="center" color="bg-[#169DC8]/20" />

      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-b from-[#0C3262]/85 via-[#08234B]/90 to-[#051836] border border-[#20528E]/70 px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 text-center text-white">
        {/* Subtle technical blueprint grid pattern matching homepage Build Your India AI Capability section */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Soft atmospheric radial highlights */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#169DC8]/25 blur-[100px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 right-10 w-80 h-80 rounded-full bg-[#0066CC]/20 blur-[90px]" aria-hidden="true" />

        {/* Inner specular highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-3 sm:mb-4">
            {page.serviceInterest}
          </span>

          <h2 id="gcc-ops-cta-heading" className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-[1.18] mb-4 text-balance">
            {title}
          </h2>

          <p className="text-[#C5D7F0] text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
            {description}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3.5 sm:gap-4">
            <a
              href={gccOpsBookingHref("footer_cta")}
              onClick={() => trackGccOpsCta(page, page.ctaLabel, "footer_cta")}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#0A224E] hover:bg-[#F19326] hover:text-white px-7 py-3.5 text-sm sm:text-[15px] font-bold tracking-tight shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
            >
              <span>{page.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 text-[#00A3E0] group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>

            {secondary && (
              <Link
                to={secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 text-sm sm:text-[15px] font-bold tracking-tight backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              >
                <span>{secondary.label}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
