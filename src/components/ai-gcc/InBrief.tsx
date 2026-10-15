"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import TypewriterParagraph from "@/components/gcc-operations/TypewriterParagraph";

interface InBriefProps {
  children: ReactNode;
  className?: string;
  variant?: "editorial" | "card";
  heading?: string;
}

/**
 * Standardized "IN BRIEF" summary block for AI GCC and AI Delivery Team child pages:
 * - variant="card": Rounded card with cyan "IN BRIEF" label and light gray canvas (as used in Delivery Teams)
 * - variant="editorial": Centered heading with amber underline and amber drop-cap (as used in GCC child pages)
 */
export default function InBrief({ children, className = "", variant = "editorial", heading = "In Brief" }: InBriefProps) {
  const content = typeof children === "string" ? children.trim() : children;

  if (variant === "card") {
    return (
      <section
        aria-labelledby="in-brief-heading"
        className={`relative scroll-mt-28 py-10 md:py-16 px-6 sm:px-8 lg:px-12 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-black/[0.08] bg-[#f5f5f7] p-7 md:p-8 shadow-xs">
            <p
              id="in-brief-heading"
              className="text-xs tracking-[0.16em] uppercase text-[#008EC4] font-bold font-mono mb-3"
            >
              IN BRIEF
            </p>
            <div className="text-body text-base text-[#505D74] leading-relaxed">
              {children}
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="in-brief-heading"
      className={`relative scroll-mt-28 overflow-hidden select-none bg-transparent py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto"
      >
        {/* 1. CENTERED HEADING & 2. AMBER UNDERLINE */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2
            id="in-brief-heading"
            className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D306C] tracking-[-0.03em] leading-[1.14] font-manrope text-center"
          >
            {heading}
          </h2>
          <div
            className="w-12 sm:w-16 h-[3px] bg-[#F19326] rounded-full mx-auto mt-1"
            aria-hidden="true"
          />
        </div>

        {/* 3. TRANSPARENT EDITORIAL PARAGRAPH WITH 4. LARGE AMBER DROP-CAP (#F19326) */}
        <div className="max-w-6xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
          {typeof content === "string" ? (
            <TypewriterParagraph text={content} className="drop-cap-amber-f19326" />
          ) : (
            <div className="drop-cap-amber-f19326">
              {content}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
