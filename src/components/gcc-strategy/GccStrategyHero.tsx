"use client";

import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { GccLeadContext } from "@/lib/gccStrategyRoutes";
import TypewriterContextButton from "@/components/ui/TypewriterContextButton";

export interface HeroCta {
  label: string;
  href: string;
}

export interface Crumb {
  name: string;
  href?: string;
}

export interface GccStrategyHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  contextualLink?: HeroCta;
  leadContext?: GccLeadContext;
}

export default function GccStrategyHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  contextualLink,
  leadContext,
}: GccStrategyHeroProps) {
  const track = (ctaName: string) => () => {
    if (leadContext) {
      trackEvent("cta_click", { location: "gcc_strategy_hero", ...leadContext, cta_name: ctaName });
    }
  };

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2";

  return (
    <section
      id="gcc-strategy-hero"
      className="relative w-full hero-viewport-fit flex flex-col justify-center overflow-hidden bg-[#F0F5FA] select-none"
      aria-label="GCC Strategy & Setup Executive Hero"
    >
      {/* ── FULL-BLEED EXECUTIVE ENVIRONMENT BACKGROUND ───────── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/gcc-operations/hero-bg.jpg"
          alt="GCC Strategy & Setup Executive Command Center"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
        />
        {/* Soft responsive overlay for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:hidden pointer-events-none" />
      </div>

      {/* ── TOP SPACER FOR FIXED/STICKY NAVBAR ──────────────────────────────── */}
      <div className="h-12 sm:h-14 lg:h-16 shrink-0" />

      {/* ── HERO CONTENT ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 shrink-0">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#505D74]">
            {breadcrumbs.map((crumb, index) => {
              const last = index === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.name}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                  )}
                  {last || !crumb.href ? (
                    <span aria-current="page" className="font-semibold text-[#0D306C]">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      to={crumb.href}
                      className={`hover:text-[#00A3E0] transition-colors ${focusRing}`}
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Editorial Content Area */}
        <div className="text-left shrink-0 w-full max-w-5xl">
          <div className="max-w-xl lg:max-w-2xl">

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left font-sans">
              {title}
            </h1>

            <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left font-sans">
              {description}
            </p>

            {/* CTAs Row matching AI GCC / GCC Operations hero - Locked on ONE LINE on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 text-left w-full">
              {/* Primary & Secondary Buttons: strictly ONE LINE on mobile */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 py-0.5">
                {primaryCta.href.startsWith("http") ? (
                  <a
                    href={primaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={track(primaryCta.label)}
                    className="btn-navy shrink-0"
                  >
                    <span>{primaryCta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </a>
                ) : (
                  <Link
                    to={primaryCta.href}
                    onClick={track(primaryCta.label)}
                    className="btn-navy shrink-0"
                  >
                    <span>{primaryCta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </Link>
                )}

                {secondaryCta && (
                  secondaryCta.href.startsWith("http") ? (
                    <a
                      href={secondaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={track(secondaryCta.label)}
                      className="btn-white cursor-pointer shrink-0 whitespace-nowrap text-xs sm:text-[13px] !py-2 sm:!py-2.5 !px-3.5 sm:!px-5"
                    >
                      <span>{secondaryCta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                    </a>
                  ) : (
                    <Link
                      to={secondaryCta.href}
                      onClick={track(secondaryCta.label)}
                      className="btn-white cursor-pointer shrink-0 whitespace-nowrap text-xs sm:text-[13px] !py-2 sm:!py-2.5 !px-3.5 sm:!px-5"
                    >
                      <span>{secondaryCta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                    </Link>
                  )
                )}
              </div>

              {contextualLink && (
                <div className="shrink-0 mt-0.5 sm:mt-0">
                  <TypewriterContextButton
                    href={contextualLink.href}
                    label={contextualLink.label}
                    onClick={track(contextualLink.label)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
