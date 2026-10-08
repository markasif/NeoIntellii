"use client";

import React from "react";
import { PRODUCTION_READINESS_DIMENSIONS, PRODUCTION_READINESS_STAGES } from "@/data/aiEngineering";

/**
 * Standardized Production AI Readiness Framework:
 * Styled to match the Decision Framework from AI Delivery Teams:
 * - Left side: Transparent / light canvas with border-b header
 * - Right side: Navy rectangular box (rounded-none, #081B3E) with cyan uppercase header & divide-y stage items
 * - Identical typography (font-mono uppercase eyebrows, font-manrope headings, slate/white-70 descriptions)
 */
export default function ReadinessFramework() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch">
      {/* Left Column (Transparent / Light Canvas) */}
      <div className="flex flex-col h-full text-[#081B3E]">
        <div className="bg-transparent px-5 py-3.5 border-b border-black/10 shrink-0">
          <p className="text-2xs uppercase tracking-[0.18em] text-[#081B3E] font-bold font-mono">
            FRAMEWORK DIMENSIONS
          </p>
        </div>
        <div className="px-5 pt-4 pb-5 flex-1 flex flex-col justify-start">
          <h3 className="text-base sm:text-lg font-bold font-manrope text-[#081B3E] tracking-tight mb-1">
            Eleven dimensions we assess
          </h3>
          <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed mb-6 font-normal">
            Each dimension is reviewed against the specific workflow, not scored against a generic benchmark.
          </p>

          <ul className="flex flex-wrap gap-2 sm:gap-2.5 list-none p-0 m-0">
            {PRODUCTION_READINESS_DIMENSIONS.map((dimension) => (
              <li
                key={dimension}
                className="inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#00A3E0] bg-white/70 backdrop-blur-xs text-[#0D244D] text-xs sm:text-[13px] font-semibold hover:border-[#0D306C] hover:bg-white transition-all duration-200 shadow-xs select-none"
              >
                {dimension}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column (Navy Blue Rectangle Shape) */}
      <div className="flex flex-col h-full bg-[#081B3E] text-white shadow-lg shadow-[#081B3E]/10 rounded-none">
        <div className="bg-transparent px-5 py-3.5 border-b border-white/10 shrink-0">
          <p className="text-2xs uppercase tracking-[0.18em] text-[#38BDF8] font-bold font-mono">
            PROGRESSION PATHWAY
          </p>
        </div>
        <div className="px-5 pt-4 pb-2">
          <h3 className="text-base sm:text-lg font-bold font-manrope text-white tracking-tight mb-1">
            Five stages a system moves through
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
            A system advances when the evidence supports it, not when the calendar does.
          </p>
        </div>

        <ol className="flex-1 flex flex-col divide-y divide-white/10 list-none p-0 m-0 border-t border-white/10">
          {PRODUCTION_READINESS_STAGES.map((stage, index) => (
            <li
              key={stage}
              className="flex flex-1 items-center justify-between gap-3 px-5 py-3.5 bg-transparent hover:bg-white/[0.04] transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-full bg-[#169DC8] text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0 shadow-xs"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white font-bold font-manrope text-sm sm:text-[15px]">
                  {stage}
                </span>
              </div>
              <span className="text-2xs uppercase tracking-wider font-mono text-[#38BDF8]/70">
                Stage 0{index + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
