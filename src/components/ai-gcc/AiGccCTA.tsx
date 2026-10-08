"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { AI_GCC_PAGE_BY_KEY, type AiGccPageKey } from "@/data/aiGcc";
import { aiGccBookingUrl } from "@/lib/aiGccCta";
import AmbientGlow from "@/components/ui/AmbientGlow";

interface AiGccCTAProps {
  pageKey: AiGccPageKey;
  title: string;
  description: string;
  secondary?: { label: string; href: string };
}

/**
 * The contextual CTA section for every AI GCC page:
 * Matches GccOperationsCTA with:
 * - Rounded 3xl dark navy card (from-[#0C3262]/85 via-[#08234B]/90 to-[#051836])
 * - Subtle technical blueprint grid
 * - Atmospheric cyan radial glows
 * - Primary booking CTA and secondary route link
 */
export default function AiGccCTA({ pageKey, title, description, secondary }: AiGccCTAProps) {
  const page = AI_GCC_PAGE_BY_KEY[pageKey] ?? AI_GCC_PAGE_BY_KEY.overview;
  const href = aiGccBookingUrl({
    sourcePage: page.path,
    serviceInterest: page.serviceInterest,
    ctaName: page.ctaLabel,
    placement: "footer_cta",
  });

  return (
    <section aria-labelledby="ai-gcc-cta-heading" className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-transparent overflow-hidden select-none">
      <AmbientGlow position="center" color="bg-[#169DC8]/20" />

      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-b from-[#0C3262]/85 via-[#08234B]/90 to-[#051836] border border-[#20528E]/70 px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 text-center text-white shadow-2xl">
        {/* Subtle blueprint grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Soft atmospheric radial highlights */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#169DC8]/25 blur-[100px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 right-10 w-80 h-80 rounded-full bg-[#0066CC]/20 blur-[90px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-3 sm:mb-4 font-mono">
            {page.serviceInterest}
          </span>

          <h2 id="ai-gcc-cta-heading" className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-[1.18] mb-4 text-balance font-sans">
            {title}
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10 text-balance font-sans">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={href}
              className="btn-cyan shrink-0"
            >
              <span>{page.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </a>

            {secondary && (
              secondary.href.startsWith("http") ? (
                <a
                  href={secondary.href}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold tracking-tight px-5 sm:px-7 py-3.5 sm:py-4 transition-all duration-200 shrink-0"
                >
                  <span>{secondary.label}</span>
                </a>
              ) : (
                <Link
                  to={secondary.href}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold tracking-tight px-5 sm:px-7 py-3.5 sm:py-4 transition-all duration-200 shrink-0"
                >
                  <span>{secondary.label}</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
