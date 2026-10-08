import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { trackEvent } from "@/lib/analytics";
import { GCC_STARTING_POINTS } from "@/data/homepage";

/**
 * Section 10. Three routes in, no more: start smaller, build new, or transform
 * what already exists. Every visitor should recognise themselves in exactly one.
 */
export default function GccStartingPoint() {
  return (
    <section
      aria-labelledby="starting-point-heading"
      className="surface-paper-2 py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">Choose your GCC starting point</p>
          <h2
            id="starting-point-heading"
            className="text-display-sm md:text-display font-display ink tracking-tight"
          >
            Where are you in the GCC journey?
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.08}>
          {GCC_STARTING_POINTS.map((point) => (
            <motion.div key={point.key} variants={staggerItem} className="h-full">
              <div className="specimen-card flex flex-col h-full p-7 md:p-8">
                <p className="text-2xs tracking-[0.16em] uppercase text-[#077fa4] mb-4">
                  {point.label}
                </p>
                <h3 className="ink font-display text-xl md:text-2xl leading-tight tracking-tight mb-3">
                  {point.name}
                </h3>
                <p className="ink-muted text-sm leading-relaxed mb-5">{point.copy}</p>

                <ul className="space-y-1.5 mb-8">
                  {point.audience.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 ink-muted text-xs leading-snug">
                      <span aria-hidden className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-[#0a93bd]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to={point.href}
                  onClick={() => trackEvent("cta_click", { location: point.event })}
                  className="mt-auto inline-flex items-center gap-2 text-heading text-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd] focus-visible:ring-offset-2"
                >
                  <span className="border-b border-heading/60 pb-0.5">{point.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
