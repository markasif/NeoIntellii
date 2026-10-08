import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CostCalculator from "@/components/gcc-calculator/CostCalculator";
import { PricingFootnote } from "@/components/shared/PricingDisclaimer";
import { MinimalFooter, MinimalHeader } from "@/components/shared/MinimalChrome";
import { track } from "@/lib/dataLayer";
import { trackEvent } from "@/lib/analytics";
import { CAL_COM_BOOKING_URL } from "@/lib/calEmbed";

/** The squad landing page, for visitors who already know the team they want. */
const SQUAD_LP_PATH = "/lp/india-engineering-squad";

/**
 * /lp/gcc-cost-calculator - the paid variant of the cost calculator.
 *
 * Same calculator, stripped surroundings: an unlinked logo, two CTA blocks -
 * the squad landing page for a visitor who already knows the team they want,
 * and the booking for one who wants the number checked - a legal-links footer,
 * and nothing else. It is noindex with a canonical to the organic page (see
 * PAID_ROUTE_SEO in src/lib/seo.ts), so it never competes with
 * /gcc-cost-calculator in search.
 *
 * The closing CTA goes straight to cal.com rather than opening the on-site
 * booking modal, so `cta_book_call_click` still fires here but the
 * `meeting_booked` confirmation happens off our domain.
 *
 * The hero is plain markup rather than the animated site hero: it is the LCP
 * element on a mobile ad click, and it renders with the first byte.
 */
export default function GccCostCalculatorLp() {
  const handleSquadClick = () => {
    trackEvent("cta_click", { location: "lp_calculator_squad" });
  };

  const handleBookCallClick = () => {
    track("cta_book_call_click", { placement: "footer_cta" });
    trackEvent("cta_click", { location: "book_call_footer_cta" });
  };

  return (
    <div className="min-h-screen bg-white">
      <MinimalHeader linkLogo={false} />

      <section className="bg-[#0a2540] px-6 sm:px-8 lg:px-12 py-14 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-white text-4xl leading-[1.08] md:text-7xl tracking-[-0.02em] mb-5">
            Estimate Your India GCC Cost in 2 Minutes
          </h1>
          <p className="text-slate-200/90 text-base md:text-lg leading-relaxed">
            Fully loaded monthly and annual cost of a Global Capability Center team in India, by role, seniority and
            city. No fluff, no &quot;contact us for pricing&quot;. Enter your team, get a real estimate.
          </p>
        </div>
      </section>

      <CostCalculator pageVariant="lp" />

      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20 bg-white space-y-6">
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#0a2540]/10 bg-[#f4f7fa] px-6 sm:px-10 py-10 md:py-12 text-center">
          <h2 className="font-display text-[#0a2540] text-2xl md:text-3xl mb-3">
            Start building your team now
          </h2>
          <p className="text-body-muted text-sm leading-relaxed max-w-xl mx-auto mb-7">
            Already know the shape you need? Skip ahead and put the squad together - roles, seniority and a start date,
            with engineers seated in weeks rather than quarters.
          </p>
          <Link
            to={SQUAD_LP_PATH}
            onClick={handleSquadClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm text-white bg-[#0a93bd]"
          >
            Build your India engineering squad <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl bg-[#36326a] px-6 sm:px-10 py-10 md:py-12 text-center">
          <h2 className="font-display text-white text-2xl md:text-3xl mb-3">
            Want the number pressure-tested?
          </h2>
          <p className="text-white/75 text-sm leading-relaxed max-w-xl mx-auto mb-7">
            Bring your estimate to a 30-minute call with a GCC strategy lead. We will walk through the team shape, the
            city, and what it takes to have people seated.
          </p>
          <a
            href={CAL_COM_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBookCallClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm bg-white text-[#36326a]"
          >
            Book a 30-minute call <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <PricingFootnote tone="dark" />

      <MinimalFooter />
    </div>
  );
}
