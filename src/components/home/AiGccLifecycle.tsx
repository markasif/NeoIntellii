import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { AI_GCC_LIFECYCLE } from "@/data/homepage";

/**
 * Section 3. The lifecycle is the homepage's main visual identity: it is what
 * turns six service pages into one offering. It is drawn with list markup, a
 * CSS rail and small SVG arrows rather than an image, so every stage name is
 * real text and each stage links to the service that owns it.
 */
export default function AiGccLifecycle() {
  return (
    <section
      aria-labelledby="lifecycle-heading"
      className="relative surface-paper overflow-hidden py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-ink bg-grid-fade opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="max-w-3xl mb-14 md:mb-16">
          <p className="eyebrow mb-5">One partner · Complete GCC lifecycle</p>
          <h2
            id="lifecycle-heading"
            className="text-display-sm md:text-display font-display ink tracking-tight mb-5"
          >
            Build the AI GCC end to end.
          </h2>
          <p className="ink-muted text-sm md:text-base leading-relaxed">
            An AI GCC requires more than hiring engineers. The mandate, talent,
            engineering capability, delivery model, operating systems and governance need
            to work together. NeoIntelli connects those layers from the first business
            case through ongoing operations and scale.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          stagger={0.07}
        >
          {AI_GCC_LIFECYCLE.map((stage, i) => {
            const inner = (
              <>
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="font-mono text-2xs text-[#0a93bd]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#0a93bd]/35 to-transparent" />
                </div>
                <h3 className="ink font-display text-lg leading-snug tracking-tight mb-2">
                  {stage.label}
                </h3>
                <p className="ink-muted text-xs leading-relaxed">{stage.summary}</p>
              </>
            );

            return (
              <motion.div key={stage.key} variants={staggerItem} className="relative h-full">
                {stage.href ? (
                  <Link
                    to={stage.href}
                    className="specimen-card flex flex-col h-full p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(10,147,189,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd] focus-visible:ring-offset-2"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="specimen-card flex flex-col h-full p-6">{inner}</div>
                )}

                {/* Decorative flow marker. The reading order already carries the
                    sequence, and it is dropped at the end of each four-column
                    row so no arrow points into the gutter. */}
                {i < AI_GCC_LIFECYCLE.length - 1 && (i + 1) % 4 !== 0 && (
                  <span
                    aria-hidden
                    className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 items-center justify-center w-8 h-8"
                  >
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" role="presentation">
                      <path
                        d="M0 5H14M14 5L10 1M14 5L10 9"
                        stroke="rgba(10,147,189,0.55)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
