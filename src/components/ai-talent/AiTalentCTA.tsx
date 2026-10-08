"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { AI_TALENT_PAGE_BY_KEY, type AiTalentPageKey } from "@/data/aiTalent";
import { talentBookingUrl } from "./AiTalentPageLayout";
import AmbientGlow from "@/components/ui/AmbientGlow";

interface AiTalentCTAProps {
  pageKey: AiTalentPageKey;
  title: string;
  description: string;
  secondary?: { label: string; href: string };
}

export default function AiTalentCTA({ pageKey, title, description, secondary }: AiTalentCTAProps) {
  const page = AI_TALENT_PAGE_BY_KEY[pageKey] ?? AI_TALENT_PAGE_BY_KEY.overview;
  const href = talentBookingUrl(pageKey, undefined, "footer_cta");

  return (
    <section aria-labelledby="ai-talent-cta-heading" className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-transparent overflow-hidden select-none">
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

          <h2 id="ai-talent-cta-heading" className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-[1.18] mb-4 text-balance font-sans">
            {title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 text-balance font-sans">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to={href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00A3E0] hover:bg-[#008EC4] text-white text-xs sm:text-sm font-bold tracking-tight px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{page.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            {secondary && (
              secondary.href.startsWith("http") ? (
                <a
                  href={secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-xs sm:text-sm font-bold tracking-tight px-5 sm:px-6 py-3.5 sm:py-4 transition-all duration-200 cursor-pointer shrink-0 backdrop-blur-sm"
                >
                  <span>{secondary.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
                </a>
              ) : (
                <Link
                  to={secondary.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-xs sm:text-sm font-bold tracking-tight px-5 sm:px-6 py-3.5 sm:py-4 transition-all duration-200 cursor-pointer shrink-0 backdrop-blur-sm"
                >
                  <span>{secondary.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
