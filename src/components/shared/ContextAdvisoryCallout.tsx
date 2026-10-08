"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export interface ContextAdvisoryCalloutProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

/**
 * Editorial contextual callout section matching Case Studies and GCC FAQ.
 * Features centered editorial layout, Manrope bold headline, lead text,
 * and standard .btn-gradient action button.
 */
export default function ContextAdvisoryCallout({
  title = "Want to see how this applies to your context?",
  description = "We'll walk through relevant patterns, trade-offs, and decisions from comparable engagements — and design an approach that fits your operating model.",
  buttonText = "Speak to a GCC Advisor",
  buttonHref = "/contact",
  className = "",
}: ContextAdvisoryCalloutProps) {
  return (
    <section className={`relative py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-center select-none ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D306C] tracking-[-0.03em] leading-[1.18] mb-4 sm:mb-5 font-manrope">
          {title}
        </h2>
        <p className="text-[#505D74] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-normal">
          {description}
        </p>
        <Link
          to={buttonHref}
          className="btn-gradient px-8 py-3.5 sm:py-4 text-sm font-bold font-manrope shadow-md hover:shadow-lg inline-flex items-center gap-2.5"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
