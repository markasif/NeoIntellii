"use client";

import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AmbientGlow from "@/components/ui/AmbientGlow";

export interface ExecutiveCtaButton {
  label: string;
  href: string;
  icon?: ReactNode;
  isExternal?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface ExecutiveCTAProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: ExecutiveCtaButton;
  secondaryCta?: ExecutiveCtaButton;
  footnote?: ReactNode;
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

  const baseClasses = isPrimary
    ? "btn-cyan shrink-0 font-manrope group"
    : "inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold tracking-tight px-5 sm:px-7 py-3.5 sm:py-4 transition-all duration-200 shrink-0 font-manrope group";

  const appliedClasses = btn.className
    ? `${baseClasses} ${btn.className}`
    : baseClasses;

  const content = (
    <>
      {btn.icon && <span>{btn.icon}</span>}
      <span>{btn.label}</span>
      {isPrimary && !btn.icon && (
        <ArrowRight className="w-4 h-4 ml-0.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
      )}
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
 * Matches the flagship AiGccCTA / Connected Ecosystem closing banner:
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
  children,
  className = "",
  cardClassName = "",
  id,
  ambientGlowColor = "bg-[#169DC8]/20",
}: ExecutiveCTAProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-transparent overflow-hidden select-none ${className}`}
    >
      <AmbientGlow position="center" color={ambientGlowColor} />

      <div
        className={`relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-b from-[#0C3262]/85 via-[#08234B]/90 to-[#051836] border border-[#20528E]/70 px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 text-center text-white shadow-2xl ${cardClassName}`}
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
            className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-[1.18] mb-4 text-balance font-manrope font-sans"
          >
            {title}
          </h2>

          {description && (
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10 text-balance font-sans">
              {description}
            </p>
          )}

          {/* Action Buttons or Custom Children */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {primaryCta && renderButton(primaryCta, true)}
              {secondaryCta && renderButton(secondaryCta, false)}
            </div>
          )}

          {children && (
            <div className={(primaryCta || secondaryCta) ? "mt-6" : ""}>
              {children}
            </div>
          )}

          {footnote && (
            <div className="text-slate-400 text-xs sm:text-sm mt-6 font-sans max-w-xl mx-auto leading-relaxed">
              {footnote}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
