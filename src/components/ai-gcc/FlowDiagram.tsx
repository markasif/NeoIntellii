"use client";

import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export interface FlowStep {
  label: string;
  detail?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  ariaLabel: string;
  accent?: string;
  orientation?: "responsive" | "vertical";
}

/**
 * Modern process flow diagram for AI GCC pages:
 * Matches the executive lifecycle timeline aesthetic from Home and GCC Operations
 */
export default function FlowDiagram({
  steps,
  ariaLabel,
  accent = "#169DC8",
  orientation = "responsive",
}: FlowDiagramProps) {
  const isVertical = orientation === "vertical";

  return (
    <ol
      aria-label={ariaLabel}
      className={
        isVertical
          ? "flex flex-col gap-3 list-none p-0 m-0"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 list-none p-0 m-0"
      }
    >
      {steps.map((step, index) => {
        const num = String(index + 1).padStart(2, "0");

        return (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col h-full"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 p-5 sm:p-6 shadow-[0_4px_16px_rgba(13,48,108,0.04)] hover:shadow-[0_8px_24px_rgba(13,48,108,0.08)] hover:border-[#169DC8]/50 transition-all duration-300 flex-1 flex flex-col justify-between text-left group">
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 inset-x-0 h-1 transition-all duration-300"
                style={{ backgroundColor: accent }}
              />

              <div>
                {/* Step Number + Directional Arrow */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#008EC4]">
                    STEP {num}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#169DC8] hidden sm:block opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>

                {/* Label */}
                <h3 className="text-sm sm:text-base font-bold text-[#0D306C] tracking-tight mb-2 leading-snug group-hover:text-[#008EC4] transition-colors">
                  {step.label}
                </h3>

                {/* Detail */}
                {step.detail && (
                  <p className="text-xs sm:text-[12.5px] text-[#505D74] leading-relaxed font-normal">
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
