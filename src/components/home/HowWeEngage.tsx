import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { ENGAGEMENT_PHASES } from "@/data/homepage";

/**
 * Section 13. Design → Build → Operate → Scale or Transfer.
 *
 * The previous version of this section promised a design phase completed
 * "within 9 days". That was a universal claim the business has not defined as a
 * product, so it has been removed rather than restated. If a 9-Day GCC
 * Readiness Sprint is formally approved later it belongs here as its own named
 * offer, clearly separated from a full strategy and business-case engagement.
 */
export default function HowWeEngage() {
  return (
    <section
      aria-labelledby="how-we-engage-heading"
      className="bg-[#f7f4ee] py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">How we engage</p>
          <h2
            id="how-we-engage-heading"
            className="text-display-sm md:text-display font-display text-heading tracking-tight mb-4"
          >
            Design, build, operate, then scale or transfer.
          </h2>
          <p className="text-body text-sm md:text-base leading-relaxed">
            A defined engagement model, so you always know which phase you are in, what it
            has to produce, and what comes next.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          stagger={0.1}
        >
          {ENGAGEMENT_PHASES.map((phase) => (
            <motion.div key={phase.step} variants={staggerItem} className="h-full">
              <div className="flex flex-col h-full bg-white rounded-2xl p-7 md:p-8 shadow-[0_8px_30px_-12px_rgba(14,19,32,0.08)]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0a93bd] text-white text-xs font-mono">
                    {phase.step}
                  </span>
                  <span aria-hidden className="flex-1 h-px bg-gradient-to-r from-[#0a93bd]/40 to-transparent" />
                </div>
                <h3 className="text-heading font-display text-xl md:text-2xl leading-tight tracking-tight mb-4">
                  {phase.title}
                </h3>
                <ul className="space-y-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-body text-sm leading-snug">
                      <span aria-hidden className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-[#0a93bd]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
