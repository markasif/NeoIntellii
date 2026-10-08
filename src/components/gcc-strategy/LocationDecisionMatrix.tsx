"use client";

import { useRef } from "react";
import ResponsiveMatrix from "./ResponsiveMatrix";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cityAssessments, type Level } from "@/data/gccStrategyContent";
import { GCC_CITY_UNITS_NOTE, GCC_MARKET_SOURCE } from "@/data/gccMarketStats";

/**
 * City comparison. One sourced column (FY26 GCC operating units, from the
 * India GCC Landscape Report 2026); every other column is
 * NeoIntelli's qualitative assessment from public ecosystem information and its
 * own hiring activity, not a numeric index. The structure is designed so
 * role-level data from the NeoIntelli AI Talent engine can be published against
 * the same columns later without changing the page.
 */
const columns = [
  "GCC operating units · FY26",
  "Talent depth",
  "AI/Data depth",
  "Leadership depth",
  "Cost pressure",
  "Hiring competition",
  "Real-estate economics",
  "Industry strengths",
  "Ecosystem maturity",
  "Scale potential",
  "Best-fit mandate",
];

const levelClass: Record<Level, string> = {
  "Very High": "bg-[#0a93bd]/15 text-[#0a6f8e]",
  High: "bg-[#0a93bd]/[0.08] text-[#0a6f8e]",
  Medium: "bg-black/[0.05] text-body",
  Emerging: "bg-amber-50 text-amber-800",
};

const Pill = ({ level }: { level: Level }) => (
  <span className={`inline-block rounded-full px-2 py-0.5 text-2xs whitespace-nowrap ${levelClass[level]}`}>{level}</span>
);

const colWidths = [
  "w-[140px] min-w-[140px]", // City
  "w-[130px] min-w-[130px] text-center", // GCC units
  "w-[115px] min-w-[115px] text-center", // Talent depth
  "w-[115px] min-w-[115px] text-center", // AI/Data depth
  "w-[125px] min-w-[125px] text-center", // Leadership depth
  "w-[115px] min-w-[115px] text-center", // Cost pressure
  "w-[130px] min-w-[130px] text-center", // Hiring competition
  "w-[320px] min-w-[320px]", // Real-estate economics (Wider space)
  "w-[360px] min-w-[360px]", // Industry strengths (Wider space)
  "w-[135px] min-w-[135px] text-center", // Ecosystem maturity
  "w-[120px] min-w-[120px] text-center", // Scale potential
  "w-[360px] min-w-[360px]", // Best-fit mandate (Wider space)
];

export default function LocationDecisionMatrix({ className = "" }: { className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Moves the table one viewport step. CSS `scroll-smooth` animates it where supported. */
  const scrollByAmount = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(max, el.scrollLeft + direction * 420));
    el.scrollLeft = target;
  };

  const rows = cityAssessments.map((c) => ({
    label: c.city,
    cells: [
      c.unitsFy26 ?? "—",
      <Pill key="t" level={c.talentDepth} />,
      <Pill key="a" level={c.aiDataDepth} />,
      <Pill key="l" level={c.leadershipDepth} />,
      <Pill key="c" level={c.costPressure} />,
      <Pill key="h" level={c.hiringCompetition} />,
      c.realEstate,
      c.industryStrengths,
      <Pill key="e" level={c.ecosystemMaturity} />,
      <Pill key="s" level={c.scalePotential} />,
      c.bestFitMandate,
    ],
  }));

  return (
    <div className={className}>
      <div className="hidden md:flex items-center justify-end gap-3 mb-3.5">
        {/* Pan / swipe hint with arrow controls */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/85 border border-[#D2DCF0]/80 shadow-2xs backdrop-blur-xs p-1 pl-3.5">
          <span className="text-xs font-medium text-[#505D74] whitespace-nowrap">
            Pan or swipe, or use the arrows
          </span>
          <button
            type="button"
            aria-label="Scroll city comparison left"
            onClick={() => scrollByAmount(-1)}
            className="w-8 h-8 rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll city comparison right"
            onClick={() => scrollByAmount(1)}
            className="w-8 h-8 rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ResponsiveMatrix
        caption="Comparison of Indian GCC locations across FY26 GCC operating units, talent depth, AI and data depth, leadership depth, cost pressure, hiring competition, real-estate economics, industry strengths, ecosystem maturity, scale potential and best-fit mandate"
        rowHeader="City"
        columns={columns}
        rows={rows}
        minTableWidth="min-w-[2100px]"
        colWidths={colWidths}
        stickyRowHeader={true}
        scrollRef={scrollRef}
      />

      {/* Methodology Notes (below the table, sentence-aligned) */}
      <div className="mt-8 max-w-5xl mx-auto text-left space-y-3 text-xs sm:text-[13px] text-[#505D74] leading-relaxed">
        <p>
          <span className="font-semibold text-[#0D306C]">Methodology:</span> Levels (Very High, High, Medium, Emerging) are NeoIntelli&apos;s qualitative
          assessment, combining public ecosystem information about each city with NeoIntelli&apos;s own AI and data hiring activity. They are
          relative to other Indian hubs, not absolute, and they are not a numeric index. &ldquo;Cost pressure&rdquo; combines compensation and
          real-estate levels; &ldquo;hiring competition&rdquo; reflects the density of employers competing for the same roles.
        </p>
        <p>
          <span className="font-semibold text-[#0D306C]">GCC operating units:</span> Source: {GCC_MARKET_SOURCE} (FY26). {GCC_CITY_UNITS_NOTE} The
          national totals are 2,117 GCCs across 3,728 units, because a typical GCC now runs from more than one site. A dash means
          the report does not publish a comparable figure for that grouping.
        </p>
        <p>
          <span className="font-semibold text-[#0D306C]">Coverage note:</span> Market analysis covers every location listed. NeoIntelli&apos;s own operating
          presence is anchored in Bengaluru, with delivery in the other Tier-1 hubs through its talent engine and partner network;
          operating support in a specific city is confirmed during scoping.
        </p>
      </div>
    </div>
  );
}
