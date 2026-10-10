"use client";

import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AmbientGlow from "@/components/ui/AmbientGlow";

export interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  intro?: ReactNode; // Backward-compatible alias for lead
  children?: ReactNode;
  tone?: "white" | "muted" | "dark";
  theme?: "light" | "navy";
  width?: "narrow" | "regular" | "default" | "wide" | "full"; // "default" aliases to "regular"
  align?: "left" | "center";
  level?: 2 | 3;
  className?: string;
  headerClassName?: string;
  leadClassName?: string;
  glow?: "left" | "right" | "center" | "none";
  paddingVariant?: "default" | "ops";
  waveFill?: string;
}

const WIDTHS = {
  narrow: "max-w-4xl",
  regular: "max-w-5xl",
  default: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-[1440px] 2xl:max-w-[1536px]",
} as const;

/**
 * Canonical Section primitive for NeoIntelli service and pillar pages:
 * - Unifies ai-gcc Section, gcc-operations OpsSection, and ai-engineering Section.
 * - Standard light sections sit on canvas background #E7EDF9 with text-[#2B3D66].
 * - Navy sections feature rich multi-stop gradient (from-[#081B3E] via-[#0A224E] to-[#061530])
 *   with organic SVG wave dividers at top and bottom.
 * - Ambient background glow for navy sections and configurable glow for light sections.
 * - Backwards-compatible aliases: `intro` -> `lead`, `default` -> `regular` width.
 */
export default function Section({
  id,
  eyebrow,
  title,
  lead,
  intro,
  children,
  tone = "white",
  theme,
  width = "regular",
  align = "center",
  level = 2,
  className = "",
  headerClassName = "",
  leadClassName = "",
  glow = "none",
  paddingVariant = "default",
  waveFill,
}: SectionProps) {
  // Support both theme="navy" and legacy tone="dark"
  const isNavy = theme === "navy" || tone === "dark";
  const headingId = id ? `${id}-heading` : undefined;
  const description = intro ?? lead;
  const fillColor = waveFill || "#E7EDF9";

  const isOps = paddingVariant === "ops";

  // Section padding presets preserving pixel-exact invariants
  const paddingClasses = isOps
    ? isNavy
      ? "pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-24 sm:pb-28 md:pb-32 lg:pb-36 xl:pb-40"
      : "py-8 sm:py-10 md:py-12 lg:py-14"
    : isNavy
      ? "pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-24 sm:pb-28 md:pb-32 lg:pb-36"
      : "py-10 sm:py-12 md:py-14 lg:py-16";

  const effectiveHeaderClass = isOps
    ? headerClassName || (align === "center" ? "mx-auto mb-6 sm:mb-8 lg:mb-10" : "mb-6 sm:mb-8 lg:mb-10")
    : headerClassName;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`relative scroll-mt-28 overflow-x-clip select-none px-4 sm:px-6 lg:px-8 ${
        isNavy
          ? `bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#061530] text-white ${paddingClasses}`
          : `bg-transparent text-[#2B3D66] ${paddingClasses}`
      } ${className}`}
    >
      {/* ── TOP ORGANIC WAVE SECTION DIVIDER (Light -> Navy) ─────────── */}
      {isNavy && (
        <div className="absolute -top-[2px] sm:-top-[3px] inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
          <svg
            viewBox="0 0 1440 140"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 lg:h-16 xl:h-18 block pointer-events-none"
          >
            <path
              d="M0,-4 L1440,-4 L1440,30 C1300,32 1160,65 1000,82 C840,99 720,74 540,84 C360,94 200,136 0,136 Z"
              fill="#D2DCF0"
              opacity="0.6"
            />
            <path
              d="M0,-4 L1440,-4 L1440,22 C1300,24 1160,58 1000,74 C840,90 720,66 540,76 C360,86 200,126 0,126 Z"
              fill={fillColor}
            />
          </svg>
        </div>
      )}

      {/* ── AMBIENT BACKGROUND GLOW (Navy Theme) ─────────────────────── */}
      {isNavy && (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[600px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0D306C]/50 rounded-full blur-3xl pointer-events-none z-0" />
        </>
      )}

      {glow !== "none" && !isNavy && (
        <AmbientGlow position={glow} color="bg-[#169DC8]/15" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: isOps ? "-50px" : "-40px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 ${WIDTHS[width]} mx-auto`}
      >
        {(eyebrow || title) && (
          <SectionHeader
            eyebrow={eyebrow ?? ""}
            title={title}
            description={description}
            align={align}
            variant={isNavy ? "white" : "cyan"}
            className={effectiveHeaderClass}
            descriptionClassName={leadClassName}
          />
        )}

        {children}
      </motion.div>

      {/* ── BOTTOM ORGANIC WAVE SECTION DIVIDER (Navy -> Light) ──────── */}
      {isNavy && (
        <div className="absolute -bottom-[2px] sm:-bottom-[3px] inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 lg:h-20 block pointer-events-none"
          >
            {/* Subtle cyan accent wave undertone */}
            <path
              d="M0,124 L1440,124 L1440,42 C1260,78 1060,18 800,56 C540,94 300,36 0,72 Z"
              fill="#169DC8"
              opacity="0.25"
            />
            {/* Soft pearl-blue wave layer */}
            <path
              d="M0,124 L1440,124 L1440,30 C1280,62 1080,22 830,50 C570,80 320,28 0,62 Z"
              fill="#D2DCF0"
              opacity="0.75"
            />
            {/* Main solid wave seamlessly matching section below */}
            <path
              d="M0,124 L1440,124 L1440,18 C1220,52 1020,12 760,42 C500,72 270,24 0,52 Z"
              fill={fillColor}
            />
          </svg>
        </div>
      )}
    </section>
  );
}
