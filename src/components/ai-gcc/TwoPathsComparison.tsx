"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { AI_GCC_PAGE_BY_KEY } from "@/data/aiGcc";

export interface TwoPathsComparisonProps {
  className?: string;
}

/** Amber accent underline under the first three letters of a heading. */
const accentUnderline =
  "underline decoration-[#F19326] decoration-[3px] underline-offset-[6px]";

/**
 * TwoPathsComparison — split container for the two advisory paths.
 * - Left side: Deep Navy Blue (#0D244D) for New GCC, cyan accent + rounded cyan button.
 * - Right side: white surface with amber accent for Existing GCC, transparent glyph
 *   icon and a rounded amber button.
 * Both headings carry the shared amber underline on their first three letters.
 */
export default function TwoPathsComparison({
  className = "",
}: TwoPathsComparisonProps) {
  return (
    <div
      className={`rounded-2xl border border-[#DCE8F4] overflow-hidden bg-white shadow-sm grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto select-none ${className}`}
    >
      {/* Left Side: Deep Navy Blue - New GCC */}
      <div className="bg-[#0D244D] text-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1B3663]">
        <div>
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#123164] border border-[#1E4D94] flex items-center justify-center text-[#38BDF8] shrink-0">
              <Sparkles className="w-5 h-5 stroke-[2]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              <span className={accentUnderline}>New</span> GCC
            </h3>
          </div>

          {/* Body Content */}
          <div className="text-white/90 text-sm sm:text-base leading-relaxed space-y-3.5 font-normal">
            <p>
              The mandate, business case, ownership model, city, first squad and
              compute posture are designed together, so setup starts with decisions
              already made. Advisory hands directly into{" "}
              <Link
                to={AI_GCC_PAGE_BY_KEY.setup.path}
                className="text-[#38BDF8] hover:text-white font-semibold underline underline-offset-4 decoration-[#38BDF8]/40 transition-colors"
              >
                {AI_GCC_PAGE_BY_KEY.setup.name}
              </Link>
              .
            </p>
            <p>
              For a first squad of 8 to 50 people the same work is scoped down to an
              AI Micro GCC plan rather than an enterprise program.
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-8 pt-4 border-t border-white/10">
          <Link
            to={AI_GCC_PAGE_BY_KEY.setup.path}
            className="btn-white group"
          >
            <span>Explore Setup &amp; Launch</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 text-[#0D306C]" />
          </Link>
        </div>
      </div>

      {/* Right Side: White surface with amber accent - Existing GCC */}
      <div className="bg-white text-[#0D244D] p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3.5 mb-6">
            {/* Transparent glyph icon (no chip/border) */}
            <div className="w-10 h-10 flex items-center justify-center text-[#F19326] shrink-0">
              <TrendingUp className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0D244D] tracking-tight">
              <span className={accentUnderline}>Exi</span>sting GCC
            </h3>
          </div>

          {/* Body Content */}
          <div className="text-[#505D74] text-sm sm:text-base leading-relaxed space-y-3.5 font-normal">
            <p>
              An AI value diagnostic inventories current pilots and measures what each
              one changed. Process redesign, workforce transformation, platform
              consolidation and governance then turn adoption into measurable value.
            </p>
            <p>
              Transformation is delivered without disrupting active operations or
              delivery commitments.
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-8 pt-4 border-t border-[#E8EEF6]">
          <Link
            to={`${AI_GCC_PAGE_BY_KEY.overview.path}#transform-existing-gcc`}
            className="btn-gradient group"
          >
            <span>Explore existing GCC transformation path</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
