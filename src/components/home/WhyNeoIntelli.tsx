import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { WHY_CAPABILITIES, WHY_DIFFERENTIATORS } from "@/data/homepage";

/**
 * Section 11. Not a "why choose us" list of adjectives: the same six pillars
 * restated as one operating partner, then the differentiators that are
 * actually specific to NeoIntelli. No superlatives and no counters live here.
 */
export default function WhyNeoIntelli() {
  return (
    <section
      aria-labelledby="why-neointelli-heading"
      className="bg-white py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="max-w-2xl mb-14 md:mb-16">
          <p className="eyebrow mb-5">Why NeoIntelli</p>
          <h2
            id="why-neointelli-heading"
            className="text-display-sm md:text-display font-display text-heading tracking-tight"
          >
            One operating partner across the AI GCC lifecycle.
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0e1320]/[0.08] rounded-2xl overflow-hidden mb-14 md:mb-16"
          stagger={0.06}
        >
          {WHY_CAPABILITIES.map((capability, i) => (
            <motion.div key={capability.name} variants={staggerItem}>
              <Link
                to={capability.href}
                className="group flex flex-col h-full bg-white p-7 md:p-8 transition-colors duration-300 hover:bg-[#f8fbfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0a93bd]"
              >
                <span className="font-mono text-2xs text-[#0a93bd] mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="inline-flex items-center gap-1.5 text-heading font-display text-xl leading-snug tracking-tight mb-2">
                  {capability.name}
                  <ArrowUpRight className="w-4 h-4 text-[#0a93bd] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="text-body text-sm leading-relaxed">{capability.summary}</p>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <ScrollReveal>
          <div className="rounded-2xl border border-[#0e1320]/[0.07] bg-[#f8fbfd] p-7 md:p-9">
            <h3 className="text-heading font-display text-xl leading-snug tracking-tight mb-6">
              What connecting those layers actually changes
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {WHY_DIFFERENTIATORS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-sm leading-snug">
                  <span aria-hidden className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-[#0a93bd]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
