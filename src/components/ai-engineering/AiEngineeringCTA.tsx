"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { AI_ENGINEERING_PAGE_BY_KEY, type AiEngineeringPageKey } from "@/data/aiEngineering";
import { aiEngineeringBookingUrl, aiEngineeringContactUrl } from "@/lib/aiEngineeringCta";
import AmbientGlow from "@/components/ui/AmbientGlow";

interface AiEngineeringCTAProps {
  pageKey: AiEngineeringPageKey;
  title: string;
  description: string;
}

/**
 * The contextual CTA section for every Enterprise AI Engineering page:
 * Matches AiGccCTA & GccOperationsCTA with:
 * - Rounded 3xl dark navy card (from-[#0C3262]/85 via-[#08234B]/90 to-[#051836])
 * - Subtle technical blueprint grid
 * - Atmospheric cyan radial glows
 * - Primary booking CTA and secondary contact link with full lead tracking
 */
export default function AiEngineeringCTA({ pageKey, title, description }: AiEngineeringCTAProps) {
  const page = AI_ENGINEERING_PAGE_BY_KEY[pageKey] ?? AI_ENGINEERING_PAGE_BY_KEY.overview;
  const lead = { sourcePage: page.path, serviceInterest: page.serviceInterest };
  const secondaryLabel = "Send us the use case in writing";

  const bookingHref = aiEngineeringBookingUrl({
    ...lead,
    ctaName: page.ctaLabel,
    placement: "footer_cta",
  });
  const contactHref = aiEngineeringContactUrl({
    ...lead,
    ctaName: secondaryLabel,
  });

  return (
    <section
      aria-labelledby="ai-engineering-cta-heading"
      className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-transparent overflow-hidden select-none"
    >
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
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#169DC8]/25 blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 right-10 w-80 h-80 rounded-full bg-[#0066CC]/20 blur-[90px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-3 sm:mb-4 font-mono">
            {page.serviceInterest}
          </span>

          <h2
            id="ai-engineering-cta-heading"
            className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-[1.18] mb-4 text-balance font-sans"
          >
            {title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <Link
              to={bookingHref}
              className="inline-flex items-center justify-center rounded-full bg-[#00A3E0] hover:bg-[#008EC4] text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 transition-all duration-200 shadow-md shadow-[#00A3E0]/25 hover:shadow-lg hover:shadow-[#00A3E0]/35 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 mr-2 text-white/90 transition-transform duration-200 group-hover:rotate-12" />
              <span>{page.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              to={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 border border-white/20 transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              <span>{secondaryLabel}</span>
            </Link>
          </div>

          <p className="mt-8 text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            A 30-minute working session with a senior AI engineer. Bring the workflow, the data it depends on and the constraint that has stopped it so far.
          </p>
        </div>
      </div>
    </section>
  );
}
