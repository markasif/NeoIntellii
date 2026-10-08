import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { trackEvent } from "@/lib/analytics";
import { PROMOTED_OFFERS } from "@/data/homepage";

/**
 * Section 2. Three promoted entry points, in a fixed order, pointing at the
 * live organic destinations that campaigns already run against. The order and
 * the destinations are set in src/data/homepage.ts, not here.
 */
export default function PromotedOffers() {
  return (
    <section
      aria-labelledby="promoted-offers-heading"
      className="bg-[#f5f5f7] py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="max-w-2xl mb-12 md:mb-14">
          <h2
            id="promoted-offers-heading"
            className="text-display-sm md:text-display font-display text-heading tracking-tight mb-4"
          >
            Start where your need is today.
          </h2>
          <p className="text-body text-sm md:text-base leading-relaxed">
            Build the first team, solve an immediate talent gap or model the full GCC
            before committing.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.08}>
          {PROMOTED_OFFERS.map((offer) => (
            <motion.div key={offer.key} variants={staggerItem} className="h-full">
              <Link
                to={offer.href}
                onClick={() => trackEvent("cta_click", { location: offer.event })}
                className="group flex flex-col h-full rounded-2xl bg-white p-7 md:p-8 shadow-[0_8px_30px_-12px_rgba(14,19,32,0.08)] transition-all duration-300 hover:shadow-[0_24px_60px_-20px_rgba(14,19,32,0.18)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd] focus-visible:ring-offset-2"
              >
                <p className="text-2xs tracking-[0.16em] uppercase text-[#077fa4] mb-4">
                  {offer.label}
                </p>
                <h3 className="text-heading font-display text-xl md:text-[1.6rem] leading-tight tracking-tight mb-3">
                  {offer.headline}
                </h3>
                <p className="text-body text-sm leading-relaxed mb-7">{offer.copy}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-heading text-sm">
                  <span className="border-b border-heading/60 pb-0.5">{offer.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
