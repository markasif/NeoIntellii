import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { trackEvent } from "@/lib/analytics";
import { GCC_TOOLKIT } from "@/data/homepage";

/**
 * Section 12. The three planning tools already exist and are strong organic
 * and conversion assets, so they get a section of their own rather than a line
 * in a footer list. These links point at the live tools; nothing about the
 * tools themselves is changed here.
 */
export default function GccToolkit() {
  return (
    <section
      aria-labelledby="gcc-toolkit-heading"
      className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ background: "radial-gradient(circle at center, #11abdb 0%, #0a93bd 55%, #07799c 100%)" }}
    >
      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="max-w-2xl mb-12 md:mb-16">
          <p className="text-2xs tracking-[0.16em] uppercase text-cyan-100 mb-5">
            GCC Decision Toolkit
          </p>
          <h2
            id="gcc-toolkit-heading"
            className="text-display-sm md:text-display font-display text-white tracking-tight mb-4"
          >
            Plan your GCC before you commit.
          </h2>
          <p className="text-white/85 text-sm md:text-base leading-relaxed">
            Three tools that answer the questions a business case has to survive: what it
            costs, when it pays back, and whether you are ready to build.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.08}>
          {GCC_TOOLKIT.map((tool) => (
            <motion.div key={tool.name} variants={staggerItem} className="h-full">
              <Link
                to={tool.href}
                onClick={() => trackEvent("cta_click", { location: tool.event })}
                className="group flex flex-col h-full bg-white rounded-2xl p-7 md:p-8 transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a93bd]"
              >
                <p className="text-2xs tracking-[0.16em] uppercase text-[#0e92b8] mb-4">
                  {tool.name}
                </p>
                <h3 className="text-heading font-display text-xl md:text-2xl leading-snug tracking-tight mb-3">
                  {tool.question}
                </h3>
                <p className="text-body text-sm leading-relaxed mb-8">{tool.copy}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-heading text-sm">
                  <span className="border-b border-heading/60 pb-0.5">{tool.ctaLabel}</span>
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
