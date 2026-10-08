"use client";

import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  AI_ENGINEERING_HUB_PATH,
  AI_ENGINEERING_PAGE_BY_KEY,
  type AiEngineeringPageKey,
} from "@/data/aiEngineering";
import TypewriterContextButton from "@/components/ui/TypewriterContextButton";

export interface HeroCta {
  label: string;
  href: string;
}

export interface AiEngineeringHeroProps {
  pageKey: AiEngineeringPageKey;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  tertiaryLink?: HeroCta;
}

/**
 * Standardized Executive Hero for Enterprise AI Engineering pages:
 * - Matches the visual design system of AiGccHero and GccOperationsHero
 * - Full-bleed executive background with priority and subtle responsive overlay
 * - Breadcrumb trail: Home > AI Engineering (> Service Page) matching SEO invariants
 * - Crisp Manrope typography and high-contrast action buttons
 */
export default function AiEngineeringHero({
  pageKey,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  tertiaryLink,
}: AiEngineeringHeroProps) {
  const isOverview = pageKey === "overview";
  const page = AI_ENGINEERING_PAGE_BY_KEY[pageKey];

  // Invariant breadcrumb trail: Home > AI Engineering (> Page)
  const crumbs = isOverview
    ? [{ name: "Home", href: "/" }, { name: "AI Engineering" }]
    : [
        { name: "Home", href: "/" },
        { name: "AI Engineering", href: AI_ENGINEERING_HUB_PATH },
        { name: page?.name ?? "Service" },
      ];

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2";

  return (
    <section
      id="ai-engineering-hero"
      className="relative w-full hero-viewport-fit flex flex-col justify-center overflow-hidden bg-[#F0F5FA] select-none"
      aria-label="Enterprise AI Engineering Executive Hero"
    >
      {/* ── FULL-BLEED EXECUTIVE AI ENVIRONMENT BACKGROUND ───────── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/gcc-operations/hero-bg.jpg"
          alt="Enterprise AI Engineering in Production"
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
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={crumb.name} className="flex items-center gap-1.5">
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

            {/* CTAs Row matching GCC Operations hero */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-left">
              {primaryCta.href.startsWith("http") ? (
                <a
                  href={primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold tracking-tight px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
                >
                  <span>{primaryCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                </a>
              ) : (
                <Link
                  to={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold tracking-tight px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
                >
                  <span>{primaryCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                </Link>
              )}

              {secondaryCta && (
                secondaryCta.href.startsWith("http") || secondaryCta.href.startsWith("#") ? (
                  <a
                    href={secondaryCta.href}
                    className="btn-white cursor-pointer shrink-0"
                  >
                    <span>{secondaryCta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </a>
                ) : (
                  <Link
                    to={secondaryCta.href}
                    className="btn-white cursor-pointer shrink-0"
                  >
                    <span>{secondaryCta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </Link>
                )
              )}

              {tertiaryLink && (
                <TypewriterContextButton href={tertiaryLink.href} label={tertiaryLink.label} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
