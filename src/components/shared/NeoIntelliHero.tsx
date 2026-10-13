"use client";

import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import TypewriterContextButton from "@/components/ui/TypewriterContextButton";
import HeroTrustMarquee from "@/components/shared/HeroTrustMarquee";

export interface HeroCtaItem {
  label: string;
  href: string;
  onClick?: () => void;
  isExternal?: boolean;
}

export interface NeoIntelliHeroProps {
  id?: string;
  ariaLabel?: string;
  breadcrumbs?: { name: string; href?: string }[];
  title?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  titleSuffixBlock?: boolean;
  titleRaw?: React.ReactNode;
  description: string;
  mobileImage: string;
  desktopImage: string;
  imageAlt: string;
  primaryCta: HeroCtaItem;
  secondaryCta?: HeroCtaItem;
  tertiaryCta?: { label: string; href: string; onClick?: () => void };
  trustStrip?: string[];
  bottomContent?: React.ReactNode;
}

/**
 * Reusable Decorative Underline + 3-Ray Motif
 * Reproduces the white curved brush underline beneath highlighted text
 * and the three cyan/white radiant energy marks to the right of the heading.
 */
export function HeroHeadingDecoration() {
  return (
    <>
      {/* Hand-drawn curved white brush underline */}
      <svg
        className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-2.5 sm:h-3 overflow-visible pointer-events-none"
        viewBox="0 0 160 12"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 2 4.5 C 45 9.5 115 9.5 158 4.5"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Three decorative radiant rays to the right */}
      <span
        className="inline-block relative align-middle ml-1.5 sm:ml-2.5 -mt-3 sm:-mt-4 select-none shrink-0"
        aria-hidden="true"
      >
        <svg
          className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 overflow-visible"
          viewBox="0 0 32 32"
          fill="none"
        >
          <defs>
            <linearGradient id="rayGradientTop" x1="0%" y1="50%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C2FF" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <linearGradient id="rayGradientMid" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <linearGradient id="rayGradientBot" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A3E0" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          {/* Top ray: angled upward wedge */}
          <polygon
            points="5,13 25,3 28,7 7,16"
            fill="url(#rayGradientTop)"
            opacity="0.95"
          />
          {/* Middle ray: horizontal wedge */}
          <polygon
            points="5,15 28,14 28,18.5 5,17.5"
            fill="url(#rayGradientMid)"
            opacity="0.95"
          />
          {/* Bottom ray: angled downward wedge */}
          <polygon
            points="7,16.5 28,25 25,29 5,19.5"
            fill="url(#rayGradientBot)"
            opacity="0.95"
          />
        </svg>
      </span>
    </>
  );
}

/**
 * Universal NeoIntelli Hero System
 * - Mobile: Centered text, single white pill CTA, portrait artwork in lower half
 * - Desktop: Left-aligned content block, 3-button CTA row, widescreen right-side artwork
 */
export default function NeoIntelliHero({
  id = "hero",
  ariaLabel = "Hero Section",
  breadcrumbs,
  title,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  titleSuffixBlock,
  titleRaw,
  description,
  mobileImage,
  desktopImage,
  imageAlt,
  primaryCta,
  secondaryCta,
  tertiaryCta,
  trustStrip,
  bottomContent,
}: NeoIntelliHeroProps) {
  const isExternalUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://") || url.startsWith("#");

  const parsedTitle = React.useMemo(() => {
    if (titleRaw) return titleRaw;
    if (titlePrefix || titleHighlight || titleSuffix) {
      return (
        <>
          {titlePrefix && <span className="block">{titlePrefix}</span>}
          <span className="block">
            {titleHighlight && (
              <span className="text-[#00C2FF] font-extrabold relative inline-block">
                {titleHighlight}
                <HeroHeadingDecoration />
              </span>
            )}
            {titleSuffix && (
              <span className={titleSuffixBlock ? "block" : "inline"}>
                {" "}{titleSuffix}
              </span>
            )}
          </span>
        </>
      );
    }
    return title || null;
  }, [titleRaw, title, titlePrefix, titleHighlight, titleSuffix, titleSuffixBlock]);

  const renderCtaLink = (
    cta: HeroCtaItem,
    className: string,
    extraProps?: Record<string, any>
  ) => {
    if (cta.isExternal || isExternalUrl(cta.href)) {
      return (
        <a
          href={cta.href}
          target={cta.href.startsWith("#") ? undefined : "_blank"}
          rel={cta.href.startsWith("#") ? undefined : "noopener noreferrer"}
          onClick={cta.onClick}
          className={className}
          {...extraProps}
        >
          <span>{cta.label}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
        </a>
      );
    }
    return (
      <Link
        to={cta.href}
        onClick={cta.onClick}
        className={className}
        {...extraProps}
      >
        <span>{cta.label}</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
      </Link>
    );
  };

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className="relative w-full max-w-full min-h-[100svh] lg:min-h-[640px] xl:min-h-[720px] flex flex-col justify-between overflow-hidden bg-[#071F4F] select-none"
    >
      {/* ── BACKGROUND ARTWORK ── */}
      {/* Mobile Background Artwork (< 1024px) */}
      <div className="lg:hidden absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <Image
          src={mobileImage}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1023px) 100vw"
          className="object-cover object-bottom"
        />
        {/* Soft top gradient to ensure crystal-clear text contrast on mobile */}
        <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-[#061B44]/90 via-[#071F4F]/60 to-transparent pointer-events-none" />
      </div>

      {/* Desktop Background Artwork (>= 1024px) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <Image
          src={desktopImage}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 100vw"
          className="object-cover object-center"
        />
        {/* Subtle left-side wash to keep typography high-contrast across all widescreen monitors */}
        <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#06183C]/70 via-[#071F4F]/40 to-transparent pointer-events-none" />
      </div>

      {/* ── TOP SPACER FOR FIXED/STICKY NAVBAR ── */}
      <div className="h-16 sm:h-20 lg:h-24 shrink-0" />

      {/* ── HERO CONTENT AREA ── */}
      {/* On mobile: aligned to top (below navbar), nicely positioned above the artwork.
          On desktop: vertically centered in the left column. */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-start lg:justify-center pt-[15vh] sm:pt-[13vh] lg:pt-0 lg:py-8">
        
        {/* Optional Breadcrumbs for inner pages */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-2 sm:mb-3 shrink-0">
            <ol className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs text-white/70">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.name} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRight className="w-3 h-3 text-white/50" aria-hidden="true" />
                    )}
                    {isLast || !crumb.href ? (
                      <span className="font-semibold text-white" aria-current="page">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link to={crumb.href} className="hover:text-[#38BDF8] transition-colors">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {/* Editorial Content Block */}
        <div className="text-center lg:text-left shrink-0 w-full max-w-5xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
          <div
              className="max-w-xl lg:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left px-5 py-6 lg:px-0 lg:py-0"
            >
            
            {/* Headline */}
            <h1 className="text-[30px] xs:text-[34px] sm:text-4xl md:text-[44px] lg:text-[48px] xl:text-[54px] font-extrabold font-manrope text-white tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 xs:mb-3 sm:mb-4 text-center lg:text-left">
              {parsedTitle}
            </h1>

            {/* Description */}
            <p className="text-[12.5px] xs:text-[13.5px] sm:text-[14.5px] lg:text-[15px] xl:text-base text-[#D4E3F7] leading-[1.48] sm:leading-[1.6] mb-3.5 xs:mb-4 sm:mb-5 lg:mb-6 max-w-sm xs:max-w-md sm:max-w-xl text-center lg:text-left font-normal mx-auto lg:mx-0">
              {description}
            </p>

            {/* ── ACTION CTAS ── */}
            {/*
              MOBILE VIEW (< 1024px):
              Renders ONLY ONE white pill button (primary CTA) centered on mobile.
              DESKTOP VIEW (>= 1024px):
              Renders the complete 3-CTA row left-aligned:
              1. btn-navy primary button
              2. btn-white secondary button
              3. TypewriterContextButton
            */}

            {/* 1. Mobile-Only CTA: Single white pill button */}
            <div className="flex lg:hidden justify-center w-full mb-3">
              {renderCtaLink(
                primaryCta,
                "btn-white cursor-pointer shrink-0 whitespace-nowrap text-[13px] xs:text-[14px] font-bold !py-3 !px-6 shadow-md rounded-full",
                { "data-mobile-cta": "true" }
              )}
            </div>

            {/* 2. Desktop-Only CTA Group: Row of 3 buttons */}
            <div className="hidden lg:flex flex-row items-center justify-start gap-3 w-full">
              {/* Button 1: Highlighted Primary White Button */}
              {renderCtaLink(
                primaryCta,
                "btn-white cursor-pointer shrink-0 whitespace-nowrap text-[13px] font-bold !py-2.5 !px-5 shadow-sm hover:shadow-md",
                { "data-desktop-primary": "true" }
              )}

              {/* Button 2: Navy Secondary Button */}
              {secondaryCta &&
                renderCtaLink(
                  secondaryCta,
                  "btn-navy shrink-0 text-[13px] px-5 py-2.5 whitespace-nowrap border border-white/25 shadow-sm hover:shadow-md",
                  { "data-secondary-cta": "true" }
                )}

              {/* Button 3: Hover-reveal Typewriter Context Button */}
              {tertiaryCta && (
                <div data-tertiary-cta className="shrink-0">
                  <TypewriterContextButton
                    href={tertiaryCta.href}
                    label={tertiaryCta.label}
                    onClick={tertiaryCta.onClick}
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM AREA: OPTIONAL DOCK / TRUST STRIP / MARQUEE ── */}
      {bottomContent ? (
        bottomContent
      ) : trustStrip && trustStrip.length > 0 ? (
        <div className="w-full shrink-0 z-20">
          <HeroTrustMarquee items={trustStrip} />
        </div>
      ) : null}
    </section>
  );
}
