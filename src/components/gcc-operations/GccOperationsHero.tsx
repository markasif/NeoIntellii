"use client";

import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Layers,
  GitFork,
  Building2,
  Compass,
  Cpu,
} from "lucide-react";
import TypewriterContextButton from "@/components/ui/TypewriterContextButton";
import { buildBreadcrumbItems, SITE_URL } from "@/lib/seo";
import type { GccOpsPage } from "@/data/gccOperationsContent";
import { gccOpsBookingHref, trackGccOpsCta } from "./GccOperationsCTA";

interface GccOperationsHeroProps {
  page: GccOpsPage;
  eyebrow: string;
  description: string;
  secondaryCta?: { label: string; href: string };
  contextualLink?: { label: string; href: string };
  trustStrip?: string[];
}

/**
 * Modern Executive Hero Section matching the redesigned high-rise skyline
 * and holographic GCC Operations display, with buttons identical to the
 * home page hero and an anchored bottom dock with logos and icons.
 */
export default function GccOperationsHero({
  page,
  eyebrow,
  description,
  secondaryCta,
  contextualLink,
  trustStrip,
}: GccOperationsHeroProps) {
  const isOverview = page.key === "overview";
  const crumbs = buildBreadcrumbItems(page.path).map((item) => ({
    name: item.name,
    href: item.item.replace(SITE_URL, "") || "/",
  }));
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2";

  return (
    <section
      id="gcc-operations-hero"
      style={{ minHeight: "100vh", height: "100vh", maxHeight: "100vh" }}
      className="relative w-full h-screen min-h-screen max-h-screen lg:h-[100dvh] lg:min-h-[100dvh] lg:max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#F0F5FA] select-none"
      aria-label="GCC Operations India Hero"
    >
      {/* ── FULL-BLEED EXECUTIVE SKYLINE & HOLOGRAPHIC HUD BACKGROUND ───────── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/gcc-operations/hero-bg.jpg"
          alt="GCC Operations India Executive View"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
        />
        {/* Soft responsive overlay for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:hidden pointer-events-none" />
      </div>

      {/* ── HERO CONTENT (CENTERED BETWEEN NAVBAR AND BOTTOM DOCK) ─────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-22 lg:pt-24 pb-3 sm:pb-4 flex-1 min-h-0 flex flex-col justify-center">
        
        {/* Optional Breadcrumbs for subpages */}
        {!isOverview && (
          <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 shrink-0">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#505D74]">
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                    )}
                    {last ? (
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
        )}

        {/* Left Editorial Content Area : Starts directly with Heading */}
        <div className="text-left shrink-0 w-full max-w-5xl">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Main Headline (Moved up to where the eyebrow used to start) */}
            {isOverview ? (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left font-sans">
                <span className="block">Run and scale</span>
                <span className="block">
                  <span className="text-[#00A3E0]">your GCC</span> in India.
                </span>
              </h1>
            ) : (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0D1B2A] tracking-[-0.035em] leading-[1.15] mb-2.5 sm:mb-3 text-left font-sans">
                {page.h1}
              </h1>
            )}

            {/* Description */}
            <p className="text-xs sm:text-[13px] md:text-[13.5px] lg:text-[14px] text-[#1D3557] leading-[1.48] sm:leading-[1.55] mb-3.5 sm:mb-4 max-w-lg sm:max-w-xl text-left font-normal">
              {description}
            </p>
          </div>

          {/* Action CTAs: Locked on ONE LINE across mobile, tablet & desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2.5 sm:gap-3 lg:gap-3.5 w-full mb-1">
            <div className="flex flex-nowrap items-center gap-2 sm:gap-3 max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 shrink-0">
              {/* Primary Button: Discuss My GCC Operations */}
              <a
                href={gccOpsBookingHref("hero")}
                onClick={() => trackGccOpsCta(page, page.ctaLabel, "hero")}
                title={page.ctaLabel}
                className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold tracking-tight px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0 whitespace-nowrap"
              >
                <span>{page.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
              </a>

              {/* Secondary Button: See the Operating Model */}
              {secondaryCta && (
                secondaryCta.href.startsWith("#") ? (
                  <a
                    href={secondaryCta.href}
                    title={secondaryCta.label}
                    className="btn-white cursor-pointer shrink-0 whitespace-nowrap text-xs sm:text-[13px] !py-2 sm:!py-2.5 !px-3.5 sm:!px-5"
                  >
                    <span>{secondaryCta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </a>
                ) : (
                  <Link
                    to={secondaryCta.href}
                    title={secondaryCta.label}
                    className="btn-white cursor-pointer shrink-0 whitespace-nowrap text-xs sm:text-[13px] !py-2 sm:!py-2.5 !px-3.5 sm:!px-5"
                  >
                    <span>{secondaryCta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </Link>
                )
              )}
            </div>

            {/* Context Button right to See the Operating Model */}
            {contextualLink && (
              <div className="shrink-0 mt-0.5 sm:mt-0">
                <TypewriterContextButton
                  href={contextualLink.href}
                  label={contextualLink.label}
                />
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── BOTTOM LIFECYCLE DOCK: TRANSPARENT BG, NO TOP/ABOVE BORDER, BALANCED LOGOS & TEXT ── */}
      {trustStrip && trustStrip.length > 0 && (
        <div className="relative z-20 w-full bg-transparent border-none pb-4 sm:pb-5 lg:pb-6 shrink-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-[#0D306C]/15">
              {trustStrip.map((item, idx) => (
                <div
                  key={item}
                  className="group flex flex-col items-center justify-start text-center px-2 sm:px-3 py-2 sm:py-1.5 transition-all duration-200"
                >
                  {/* Circular White Icon Badge : sized comfortably for clear visibility */}
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-xs mb-2 group-hover:scale-105 group-hover:shadow-sm transition-all duration-200">
                    {idx === 0 && <Compass className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0D306C]" />}
                    {idx === 1 && <Layers className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0D306C]" />}
                    {idx === 2 && <GitFork className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0D306C]" />}
                    {idx === 3 && <Cpu className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0D306C]" />}
                    {idx === 4 && <Building2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0D306C]" />}
                    {idx === 5 && (
                      <Image
                        src="/logo/neohirex_logo.png"
                        alt="NeoHireX"
                        width={28}
                        height={28}
                        className="h-4 sm:h-4.5 w-auto object-contain"
                      />
                    )}
                  </div>

                  {/* Text Label: Navy Blue, balanced & readable font size */}
                  <span className="text-[12px] sm:text-[12.5px] lg:text-[13px] font-bold text-[#0D306C] text-center leading-snug tracking-tight text-balance max-w-[150px] group-hover:text-[#00A3E0] transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
