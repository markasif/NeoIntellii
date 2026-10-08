"use client";

import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Layers,
  GitFork,
  Sparkles,
  Building2,
  Compass,
  Cpu,
  Rocket,
  Users,
} from "lucide-react";
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

interface TypewriterLaunchButtonProps {
  href: string;
  fullLabel: string;
}

function TypewriterLaunchButton({ href, fullLabel }: TypewriterLaunchButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // Destination URL: ensure direct path to gcc setup-launch
  const targetHref = href === "/services/gcc-setup-launch" ? "/services/gcc/setup-launch" : href;
  
  // Dynamic button name reflecting the specific page's contextual link
  const targetText = React.useMemo(() => {
    if (!fullLabel) return "Explore GCC Setup & Launch";
    return fullLabel.replace(/→$/, "").trim();
  }, [fullLabel]);

  // Contextual icon based on destination
  const IconComponent = React.useMemo(() => {
    const lower = (targetHref + " " + targetText).toLowerCase();
    if (lower.includes("talent") || lower.includes("recruit") || lower.includes("hired")) return Users;
    if (lower.includes("engineering") || lower.includes("platform") || lower.includes("automate")) return Cpu;
    if (lower.includes("responsible") || lower.includes("governance") || lower.includes("model")) return ShieldCheck;
    if (lower.includes("ai gcc") || lower.includes("capability")) return Sparkles;
    return Compass;
  }, [targetHref, targetText]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // 250ms grace period prevents rapid jitter/flicker
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 250);
  };

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let charIndex = 0;

    if (isHovered) {
      setDisplayedText("");
      intervalId = setInterval(() => {
        if (charIndex <= targetText.length) {
          setDisplayedText(targetText.slice(0, charIndex));
          charIndex++;
        } else if (intervalId) {
          clearInterval(intervalId);
        }
      }, 14);
    } else {
      setDisplayedText("");
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [isHovered, targetText]);

  const isInternal = targetHref.startsWith("/");
  const sharedClassName =
    "inline-flex items-center rounded-full bg-white/95 hover:bg-white border border-slate-300/90 hover:border-slate-400/90 shadow-xs hover:shadow-md backdrop-blur-sm p-1 sm:p-1.5 text-[#0D306C] transition-all duration-300 ease-out group shrink-0 cursor-pointer overflow-hidden";

  const buttonContent = (
    <>
      {/* Icon: Round white container with brand color */}
      <div className="flex items-center justify-center w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white shrink-0 text-[#0D306C] group-hover:text-[#169DC8] transition-colors">
        <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:rotate-12" />
      </div>

      {/* Button Name Revealed on Hover inside the round white container */}
      <div
        className={`flex items-center gap-1.5 whitespace-nowrap overflow-hidden transition-all duration-300 ease-out ${
          isHovered
            ? "max-w-[440px] opacity-100 pr-3 sm:pr-3.5 pl-1"
            : "max-w-0 opacity-0 pointer-events-none pr-0 pl-0"
        }`}
      >
        <span className="text-xs sm:text-[13px] font-semibold text-[#0D306C] tracking-tight">
          {displayedText}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ml-0.5" />
      </div>
    </>
  );

  if (isInternal) {
    return (
      <Link
        to={targetHref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={targetText}
        aria-label={targetText}
        className={sharedClassName}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <a
      href={targetHref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={targetText}
      aria-label={targetText}
      className={sharedClassName}
    >
      {buttonContent}
    </a>
  );
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

          {/* Action CTAs: Locked on the SAME LINE across tablet & desktop */}
          <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-start gap-2.5 sm:gap-3 lg:gap-3.5 w-full mb-1">
            
            {/* Primary Button: Discuss My GCC Operations */}
            <a
              href={gccOpsBookingHref("hero")}
              onClick={() => trackGccOpsCta(page, page.ctaLabel, "hero")}
              title={page.ctaLabel}
              className="inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-lg bg-[#0A1222] px-4 sm:px-5.5 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-medium text-white shadow-md hover:bg-[#15243E] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group shrink-0"
            >
              <span>{page.ctaLabel}</span>
              <ArrowRight className="h-4 w-4 text-cyan-400 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            {/* Secondary Button: See the Operating Model */}
            {secondaryCta && (
              secondaryCta.href.startsWith("#") ? (
                <a
                  href={secondaryCta.href}
                  title={secondaryCta.label}
                  className="inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-lg border border-slate-300/90 bg-white/95 backdrop-blur-sm px-4 sm:px-5.5 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-medium text-slate-800 shadow-xs hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group shrink-0"
                >
                  <span>{secondaryCta.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <Link
                  to={secondaryCta.href}
                  title={secondaryCta.label}
                  className="inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-lg border border-slate-300/90 bg-white/95 backdrop-blur-sm px-4 sm:px-5.5 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-medium text-slate-800 shadow-xs hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group shrink-0"
                >
                  <span>{secondaryCta.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              )
            )}

            {/* Icon Button right to See the Operating Model: Reveals Button Name on the Same Line on Hover */}
            {contextualLink && (
              <TypewriterLaunchButton
                href={contextualLink.href}
                fullLabel={contextualLink.label}
              />
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
