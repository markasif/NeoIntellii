"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import AmbientGlow from "@/components/ui/AmbientGlow";

interface AiDeliveryTeamsCTAProps {
  serviceInterest?: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  bottomText?: React.ReactNode;
}

export default function AiDeliveryTeamsCTA({
  serviceInterest = "AI Delivery Teams",
  title,
  description,
  primaryCta,
  secondaryCta,
  bottomText,
}: AiDeliveryTeamsCTAProps) {
  return (
    <section aria-labelledby="ai-delivery-cta-heading" className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-transparent overflow-hidden select-none">
      <AmbientGlow position="center" color="bg-[#169DC8]/20" />

      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-b from-[#0C3262]/85 via-[#08234B]/90 to-[#051836] border border-[#20528E]/70 px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 text-center text-white">
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
            {serviceInterest}
          </span>

          <h2 id="ai-delivery-cta-heading" className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-[1.18] mb-4 text-balance font-manrope">
            {title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#D2DCF0] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to={primaryCta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#00A3E0] hover:bg-[#008EC4] text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(0,163,224,0.4)] hover:shadow-[0_6px_24px_rgba(0,163,224,0.55)] hover:-translate-y-0.5 cursor-pointer font-manrope"
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {secondaryCta && (
              <Link
                to={secondaryCta.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm transition-all duration-200 cursor-pointer backdrop-blur-xs font-manrope"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>

          {bottomText && (
            <div className="mt-8 text-sm text-[#D2DCF0]/80">
              {bottomText}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
