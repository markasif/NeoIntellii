import React from "react";
import type { ReferenceSource } from "@/data/aiEngineeringSources";

/**
 * Standardized Research & Citation Callout:
 * Matches the visual design system of AiGcc SourceNote:
 * - Rounded-2xl / sm:rounded-3xl card on #E7EDF9 canvas
 * - Cyan accent pill bar (#169DC8)
 * - Deep navy quotation typography
 * - Verified publisher citation with external link
 */
export default function SourceNote({
  source,
  compact = false,
  variant = "card",
  theme = "light",
  className = "",
}: {
  source: ReferenceSource;
  compact?: boolean;
  variant?: "card" | "navy-rect" | "transparent";
  theme?: "light" | "navy";
  className?: string;
}) {
  if (variant === "transparent") {
    return (
      <figure className={`bg-transparent border-0 shadow-none p-0 text-left ${className}`}>
        <div className="w-8 h-1 bg-[#169DC8] rounded-full mb-4" />
        <blockquote className="text-[#0D244D] font-display text-base sm:text-lg md:text-xl font-bold leading-snug mb-3 font-sans">
          &ldquo;{source.statement}&rdquo;
        </blockquote>
        <figcaption className="text-xs text-[#505D74] leading-relaxed pt-3 border-t border-[#0D244D]/10">
          <span className="font-semibold text-[#0D244D]">Source: </span>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#008EC4] hover:text-[#0D306C] underline underline-offset-2 transition-colors font-semibold"
          >
            {source.publisher}, {source.title}
          </a>{" "}
          ({source.year}). <span className="text-[#505D74]/90">{source.context}</span>
        </figcaption>
      </figure>
    );
  }
  if (variant === "navy-rect" || theme === "navy") {
    return (
      <figure
        className={`rounded-none bg-[#081B3E] p-6 sm:p-7 md:p-8 shadow-lg text-left ${className}`}
      >
        <blockquote className="text-white font-display text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-4">
          &ldquo;{source.statement}&rdquo;
        </blockquote>
        <figcaption className="text-xs text-[#93A5C8] leading-relaxed pt-3 border-t border-white/15">
          <span className="font-semibold text-white">Source: </span>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#169DC8] hover:text-[#38BDF8] underline underline-offset-2 transition-colors font-medium"
          >
            {source.publisher}, {source.title}
          </a>{" "}
          ({source.year}). <span className="text-white/70">{source.context}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={`rounded-2xl sm:rounded-3xl border border-[#D2DCF0] bg-white/95 backdrop-blur-sm shadow-xs hover:shadow-md transition-all duration-300 ${
        compact ? "p-5 sm:p-6" : "p-6 md:p-8"
      } ${className}`}
    >
      <div className="w-8 h-1 bg-[#169DC8] rounded-full mb-4" />
      <blockquote className="text-[#0D244D] font-display text-base sm:text-lg md:text-xl font-bold leading-snug mb-3">
        &ldquo;{source.statement}&rdquo;
      </blockquote>
      <figcaption className="text-xs text-[#505D74] leading-relaxed pt-3 border-t border-[#E2EDF5]">
        <span className="font-semibold text-[#0D244D]">Source: </span>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#169DC8] hover:text-[#0D306C] underline underline-offset-2 transition-colors font-medium"
        >
          {source.publisher}, {source.title}
        </a>{" "}
        ({source.year}). <span className="text-[#7A889B]">{source.context}</span>
      </figcaption>
    </figure>
  );
}
