"use client";

import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AmbientGlow from "@/components/ui/AmbientGlow";

export interface ExecutiveCtaButton {
  label: string;
  mobileLabel?: string;
  href: string;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
  isExternal?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
}

export interface ExecutiveCTAProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: ExecutiveCtaButton;
  secondaryCta?: ExecutiveCtaButton;
  footnote?: ReactNode;
  bottomText?: ReactNode;
  children?: ReactNode;
  className?: string;
  cardClassName?: string;
  id?: string;
  ambientGlowColor?: string;
}

function renderButton(btn: ExecutiveCtaButton, isPrimary: boolean) {
  const isExternal =
    btn.isExternal ||
    btn.href.startsWith("http") ||
    btn.href.startsWith("mailto:");

  const defaultClasses = isPrimary
    ? "w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4.5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#00A3E0] hover:bg-[#008EC4] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(0,163,224,0.4)] hover:shadow-[0_6px_24px_rgba(0,163,224,0.55)] hover:-translate-y-0.5 cursor-pointer font-manrope group whitespace-nowrap text-center"
    : "w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4.5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer backdrop-blur-xs font-manrope group whitespace-nowrap text-center";

  const appliedClasses = btn.className
    ? `${btn.className} font-manrope group whitespace-nowrap`
    : defaultClasses;

  const content = (
    <>
      {btn.icon && <span className="shrink-0">{btn.icon}</span>}
      {btn.mobileLabel ? (
        <>
          <span className="hidden sm:inline whitespace-nowrap">{btn.label}</span>
          <span className="sm:hidden whitespace-nowrap">{btn.mobileLabel}</span>
        </>
      ) : (
        <span className="whitespace-nowrap">{btn.label}</span>
      )}
      {btn.trailingIcon ? (
        <span className="shrink-0">{btn.trailingIcon}</span>
      ) : isPrimary ? (
        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (isExternal) {
    const isMailto = btn.href.startsWith("mailto:");
    return (
      <a
        key={btn.label}
        href={btn.href}
        target={isMailto ? undefined : "_blank"}
        rel={isMailto ? undefined : "noopener noreferrer"}
        onClick={btn.onClick}
        className={appliedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      key={btn.label}
      to={btn.href}
      onClick={btn.onClick}
      className={appliedClasses}
    >
      {content}
    </Link>
  );
}

/**
 * Canonical Dark Executive CTA Component.
 *
 * Matches the flagship NeoIntelli closing banner:
 * - Rounded 3xl dark navy card (from-[#0C3262]/85 via-[#08234B]/90 to-[#051836])
 * - Subtle technical blueprint grid
 * - Atmospheric cyan and blue radial glows
 * - Distinctive monospaced eyebrow tag
 * - Balanced responsive typography and pill-shaped action buttons
 */
export default function ExecutiveCTA({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  footnote,
  bottomText,
  children,
  className = "",
  cardClassName = "",
  id,
  ambientGlowColor = "bg-[#169DC8]/20",
}: ExecutiveCTAProps) {
  const headingId = id ? `${id}-heading` : undefined;
  const footerNote = footnote ?? bottomText;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14 lg:py-16 bg-transparent overflow-hidden select-none ${className}`}
    >
      <AmbientGlow position="center" color={ambientGlowColor} />

      <div
        className={`relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#061530] border border-[#16427D]/60 px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 text-center text-white ${cardClassName}`}
      >
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
          {eyebrow && (
            <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-3 sm:mb-4 font-mono">
              {eyebrow}
            </span>
          )}

          <h2
            id={headingId}
            className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-[1.18] mb-4 text-balance font-manrope"
          >
            {title}
          </h2>

          {description && (
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#D2DCF0] font-normal leading-relaxed mb-8 sm:mb-10 text-balance font-manrope">
              {description}
            </p>
          )}

          {/* Action Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {primaryCta && renderButton(primaryCta, true)}
              {secondaryCta && renderButton(secondaryCta, false)}
            </div>
          )}

          {children && (
            <div className={(primaryCta || secondaryCta) ? "mt-6" : ""}>
              {children}
            </div>
          )}

          {footerNote && (
            <div className="mt-8 text-sm text-[#D2DCF0]/80 max-w-xl mx-auto leading-relaxed">
              {footerNote}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
