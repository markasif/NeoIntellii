"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface EngineeringMetric {
  name: string;
  desc: string;
}

/**
 * Standardized Metrics Grid:
 * Matches the visual design system of DeliverablesList & PerformanceFramework:
 * - Rounded-2xl card on signature #E7EDF9 canvas
 * - Deep navy typography (#0D306C) and slate description copy
 * - Subtle bottom row dividers or card grid with cyan verification accents
 */
export default function EngineeringMetricGrid({
  items,
  note,
}: {
  items: EngineeringMetric[];
  note?: string;
}) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 list-none pl-0">
        {items.map((metric, idx) => (
          <li
            key={metric.name}
            className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-[#D2DCF0]/80 bg-white/95 backdrop-blur-sm shadow-xs hover:border-[#169DC8]/50 hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#169DC8] shrink-0" />
                <span className="text-2xs font-mono font-bold uppercase tracking-[0.2em] text-[#008EC4]">
                  METRIC {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0D306C] tracking-tight leading-snug mb-2 font-sans">
                {metric.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed font-normal">
                {metric.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
        {note ??
          "These are the metrics we instrument and report. Targets are agreed per system against a measured baseline; we do not publish universal improvement percentages."}
      </p>
    </div>
  );
}
