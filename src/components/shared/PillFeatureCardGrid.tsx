"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export interface PillFeatureCardItem {
  title: string;
  verb?: string;
  eyebrow?: string;
  items?: string[];
  tags?: string[];
  body?: string;
  desc?: string;
  href?: string;
  ctaText?: string;
}

export interface PillFeatureCardGridProps {
  items: PillFeatureCardItem[];
  columns?: 2 | 3 | 4;
  className?: string;
  cardClassName?: string;
  theme?: "light" | "navy";
}

/**
 * Bespoke Silky Wave Artwork matching the reference design:
 * Flowing azure & deep sapphire wave swells with luminous cyan crest lines
 * and an illuminated glowing golden/amber filament threading through the wave.
 */
function CardWaveArtwork({ index }: { index: number }) {
  const waveId = `pill-wave-${index}`;

  if (index === 0) {
    // 1. PREDICT: Applied AI & Machine Learning - Exact faithful match to reference image
    return (
      <svg
        viewBox="0 0 400 180"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          {/* Ambient Blue Radial Glow in lower right */}
          <radialGradient id={`${waveId}-ambient`} cx="85%" cy="85%" r="75%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#0284C7" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#0EA5E9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Deep Sapphire Oceanic Gradient */}
          <linearGradient id={`${waveId}-deep-ocean`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.30" />
            <stop offset="40%" stopColor="#0077B6" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#034078" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#052458" stopOpacity="0.99" />
          </linearGradient>

          {/* Mid Azure Ribbon Gradient */}
          <linearGradient id={`${waveId}-mid-azure`} x1="0%" y1="0%" x2="100%" y2="85%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#0A3678" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#072352" stopOpacity="0.95" />
          </linearGradient>

          {/* Glowing Golden Filament Gradient */}
          <linearGradient id={`${waveId}-gold`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#FDE047" stopOpacity="1" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.80" />
          </linearGradient>

          {/* Soft Amber Glow Filter */}
          <filter id={`${waveId}-gold-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#F59E0B" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* Ambient Corner Mist */}
        <rect x="0" y="0" width="400" height="180" fill={`url(#${waveId}-ambient)`} />

        {/* Back Silky Azure Swell */}
        <path
          d="M 0 160 C 110 154, 200 132, 290 140 C 340 144, 375 128, 400 106 L 400 180 L 0 180 Z"
          fill={`url(#${waveId}-mid-azure)`}
        />

        {/* Main Deep Oceanic Wave Body */}
        <path
          d="M 0 171 C 105 166, 185 146, 265 152 C 325 156, 365 138, 400 122 L 400 180 L 0 180 Z"
          fill={`url(#${waveId}-deep-ocean)`}
        />

        {/* Bottom-right Front Depth Anchor */}
        <path
          d="M 50 180 C 160 174, 245 158, 315 164 C 358 168, 385 156, 400 144 L 400 180 Z"
          fill="#05204C"
          opacity="0.85"
        />

        {/* Signature Glowing Golden Filament */}
        <path
          d="M 125 160 C 205 153, 285 136, 355 144 C 378 146, 392 140, 400 132"
          fill="none"
          stroke={`url(#${waveId}-gold)`}
          strokeWidth="1.9"
          strokeLinecap="round"
          filter={`url(#${waveId}-gold-glow)`}
        />

        {/* Luminous White & Cyan Silk Crest Lines */}
        <path
          d="M 0 160 C 110 154, 200 132, 290 140 C 340 144, 375 128, 400 106"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          opacity="0.95"
        />
        <path
          d="M 0 171 C 105 166, 185 146, 265 152 C 325 156, 365 138, 400 122"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.4"
          opacity="0.85"
        />
        <path
          d="M 90 178 C 185 172, 260 156, 335 160 C 372 162, 388 153, 400 146"
          fill="none"
          stroke="#BAE6FD"
          strokeWidth="1.1"
          opacity="0.70"
        />
      </svg>
    );
  }

  if (index === 1) {
    // 2. GENERATE: Generative AI - Radiant celestial azure & electric cyan ribbons with champagne-gold shimmer
    return (
      <svg
        viewBox="0 0 400 180"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${waveId}-ambient`} cx="85%" cy="85%" r="75%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.48" />
            <stop offset="40%" stopColor="#00A3E0" stopOpacity="0.22" />
            <stop offset="75%" stopColor="#6366F1" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${waveId}-gen-deep`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.32" />
            <stop offset="40%" stopColor="#0284C7" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#1E3A8A" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#0B1E48" stopOpacity="0.99" />
          </linearGradient>

          <linearGradient id={`${waveId}-gen-azure`} x1="0%" y1="0%" x2="100%" y2="85%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.30" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.68" />
            <stop offset="85%" stopColor="#1D4ED8" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#0F2B66" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id={`${waveId}-champagne-gold`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.90" />
            <stop offset="70%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.80" />
          </linearGradient>

          <filter id={`${waveId}-gold-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#F59E0B" floodOpacity="0.65" />
          </filter>
        </defs>

        <rect x="0" y="0" width="400" height="180" fill={`url(#${waveId}-ambient)`} />

        {/* Back Generative Azure Swell */}
        <path
          d="M 0 156 C 115 148, 195 128, 280 136 C 335 140, 372 122, 400 102 L 400 180 L 0 180 Z"
          fill={`url(#${waveId}-gen-azure)`}
        />

        {/* Main Deep Swell */}
        <path
          d="M 0 168 C 100 162, 180 142, 255 148 C 320 152, 362 134, 400 118 L 400 180 L 0 180 Z"
          fill={`url(#${waveId}-gen-deep)`}
        />

        {/* Foreground Depth Anchor */}
        <path
          d="M 45 180 C 155 172, 240 154, 310 160 C 355 164, 382 152, 400 140 L 400 180 Z"
          fill="#0A1D44"
          opacity="0.85"
        />

        {/* Champagne-Gold Shimmer Filament */}
        <path
          d="M 110 156 C 195 148, 275 132, 345 140 C 372 143, 388 136, 400 128"
          fill="none"
          stroke={`url(#${waveId}-champagne-gold)`}
          strokeWidth="1.9"
          strokeLinecap="round"
          filter={`url(#${waveId}-gold-glow)`}
        />

        {/* Luminous Crest Hairlines */}
        <path
          d="M 0 156 C 115 148, 195 128, 280 136 C 335 140, 372 122, 400 102"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          opacity="0.95"
        />
        <path
          d="M 0 168 C 100 162, 180 142, 255 148 C 320 152, 362 134, 400 118"
          fill="none"
          stroke="#67E8F9"
          strokeWidth="1.4"
          opacity="0.85"
        />
        <path
          d="M 85 176 C 180 168, 255 152, 330 156 C 368 158, 385 149, 400 142"
          fill="none"
          stroke="#BAE6FD"
          strokeWidth="1.1"
          opacity="0.70"
        />
      </svg>
    );
  }

  // 3. PLAN: Agentic AI - Multi-tier orchestrating ribbons with amber-gold decision trajectories
  return (
    <svg
      viewBox="0 0 400 180"
      fill="none"
      preserveAspectRatio="none"
      className="w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${waveId}-ambient`} cx="85%" cy="85%" r="75%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#0284C7" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#0369A1" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${waveId}-agent-deep`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.30" />
          <stop offset="40%" stopColor="#0369A1" stopOpacity="0.75" />
          <stop offset="75%" stopColor="#0F2D6B" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#041738" stopOpacity="0.99" />
        </linearGradient>

        <linearGradient id={`${waveId}-agent-azure`} x1="0%" y1="0%" x2="100%" y2="85%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="45%" stopColor="#00A3E0" stopOpacity="0.65" />
          <stop offset="85%" stopColor="#0A3678" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#061D44" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id={`${waveId}-gold`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
          <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#FDE047" stopOpacity="1" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.80" />
        </linearGradient>

        <filter id={`${waveId}-gold-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#F59E0B" floodOpacity="0.65" />
        </filter>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill={`url(#${waveId}-ambient)`} />

      {/* Back Orchestration Swell */}
      <path
        d="M 0 164 C 110 156, 205 136, 295 144 C 345 148, 376 132, 400 112 L 400 180 L 0 180 Z"
        fill={`url(#${waveId}-agent-azure)`}
      />

      {/* Main Agentic Wave Body */}
      <path
        d="M 0 174 C 105 168, 190 148, 270 156 C 330 160, 368 142, 400 128 L 400 180 L 0 180 Z"
        fill={`url(#${waveId}-agent-deep)`}
      />

      {/* Anchor Corner */}
      <path
        d="M 55 180 C 165 174, 250 160, 320 168 C 362 172, 386 160, 400 148 L 400 180 Z"
        fill="#041635"
        opacity="0.85"
      />

      {/* Trajectory Golden Filament */}
      <path
        d="M 130 164 C 210 156, 290 140, 360 148 C 380 150, 394 144, 400 136"
        fill="none"
        stroke={`url(#${waveId}-gold)`}
        strokeWidth="1.9"
        strokeLinecap="round"
        filter={`url(#${waveId}-gold-glow)`}
      />

      {/* Crest Lines */}
      <path
        d="M 0 164 C 110 156, 205 136, 295 144 C 345 148, 376 132, 400 112"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        opacity="0.95"
      />
      <path
        d="M 0 174 C 105 168, 190 148, 270 156 C 330 160, 368 142, 400 128"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <path
        d="M 95 180 C 190 174, 265 158, 340 164 C 375 166, 390 156, 400 150"
        fill="none"
        stroke="#BAE6FD"
        strokeWidth="1.1"
        opacity="0.70"
      />
    </svg>
  );
}

/**
 * CTA button for the card: single-line and uniform width, fade-truncated by
 * default and sliding to reveal the full label on hover (same pattern used on
 * the Industries and AI Talent cards).
 */
function RevealCtaButton({ label, isNavy }: { label: string; isNavy: boolean }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const [shift, setShift] = useState(0);

  const measure = useCallback(() => {
    if (wrapRef.current && labelRef.current) {
      const extra = labelRef.current.scrollWidth - wrapRef.current.clientWidth;
      setShift(extra > 2 ? extra : 0);
    }
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(measure);
    const timer = window.setTimeout(measure, 250);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const truncated = shift > 0;

  return (
    <span
      onMouseEnter={() => {
        measure();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={`mt-auto w-full inline-flex items-center justify-between gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold font-manrope tracking-tight transition-all duration-200 ${
        isNavy
          ? "bg-[#38BDF8] text-[#04122C] group-hover:bg-white"
          : "bg-[#0D244D] text-white group-hover:bg-[#008EC4]"
      }`}
    >
      <span
        ref={wrapRef}
        className={`relative block min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left ${
          truncated && !hovered
            ? "[mask-image:linear-gradient(to_right,black_calc(100%-16px),transparent_100%)]"
            : ""
        }`}
      >
        <span
          ref={labelRef}
          className="inline-block will-change-transform"
          style={{
            transform: hovered && truncated ? `translateX(-${shift + 6}px)` : "translateX(0px)",
            transition:
              hovered && truncated
                ? `transform ${Math.max(0.5, shift * 0.012)}s cubic-bezier(0.2, 0.8, 0.4, 1)`
                : "transform 0.3s ease-out",
          }}
        >
          {label}
        </span>
      </span>
      <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
    </span>
  );
}

/**
 * Standardized Pill Feature Card Grid:
 * Reusable card grid component with high-fidelity visual styling,
 * spaced typography, pill badge capsules, and bottom wave ribbons matching reference.
 */
export default function PillFeatureCardGrid({
  items,
  columns = 3,
  className = "",
  cardClassName = "",
  theme = "light",
}: PillFeatureCardGridProps) {
  const isNavy = theme === "navy";
  const colClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-3";

  return (
    <ul className={`grid ${colClass} gap-6 sm:gap-7 lg:gap-8 list-none pl-0 items-stretch ${className}`}>
      {items.map((item, idx) => {
        const tag = item.verb || item.eyebrow;
        const pills = item.items || item.tags || [];
        const content = item.body || item.desc;
        const cta = item.ctaText || (item.title ? `Explore ${item.title}` : "Learn more");

        const CardContent = (
          <div className="relative z-10 flex flex-col h-full">
            {/* Eyebrow / Tag */}
            {tag && (
              <span
                className={`block text-xs font-mono font-bold uppercase tracking-[0.28em] mb-3 select-none ${
                  isNavy ? "text-[#38BDF8]" : "text-[#008EC4]"
                }`}
              >
                {tag}
              </span>
            )}

            {/* Title */}
            <h3
              className={`text-[22px] sm:text-[25px] lg:text-[27px] font-extrabold tracking-tight leading-[1.25] mb-4 font-sans transition-colors ${
                isNavy
                  ? "text-white group-hover:text-[#38BDF8]"
                  : "text-[#0D244D] group-hover:text-[#008EC4]"
              }`}
            >
              {item.title}
            </h3>

            {/* Pill chips */}
            {pills.length > 0 && (
              <ul className="flex flex-wrap gap-2.5 mb-6 list-none pl-0">
                {pills.map((pill) => (
                  <li
                    key={pill}
                    className={`inline-flex items-center px-4 py-1.5 rounded-full border text-[13px] font-semibold select-none transition-all duration-200 ${
                      isNavy
                        ? "border-[#00A3E0]/70 bg-[#00A3E0]/15 text-[#C5D7F0] group-hover:border-[#38BDF8]/90 group-hover:bg-[#00A3E0]/25 group-hover:text-white"
                        : "border-[#0090D0] bg-white/80 text-[#0D244D] shadow-[0_1px_3px_rgba(0,144,208,0.08)] group-hover:border-[#008EC4] group-hover:bg-white"
                    }`}
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            )}

            {/* Descriptive Body */}
            {content && (
              <p
                className={`text-[13.5px] sm:text-[14.5px] leading-[1.65] font-normal mb-8 max-w-[95%] ${
                  isNavy ? "text-slate-300/90" : "text-[#4F627D]"
                }`}
              >
                {content}
              </p>
            )}

            {/* CTA Action Button */}
            {item.href && <RevealCtaButton label={cta} isNavy={isNavy} />}
          </div>
        );

        const cardStyle = isNavy
          ? "rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#0C3262]/85 via-[#08234B]/90 to-[#051836] border border-[#20528E]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_24px_rgba(4,18,43,0.32)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
          : "rounded-[28px] sm:rounded-[32px] border border-[#CFE4F6] bg-gradient-to-b from-[#F8FBFE] via-white to-[#F2F8FE] shadow-[0_4px_24px_rgba(13,48,108,0.06)] hover:border-[#99CCF0] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008EC4]";

        return (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            {item.href ? (
              <Link
                to={item.href}
                className={`flex flex-col h-full p-7 sm:p-9 pb-8 sm:pb-9 transition-all duration-300 group relative overflow-hidden ${cardStyle} ${cardClassName}`}
              >
                {CardContent}

                {/* Bottom Silky Wave Artwork */}
                <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 pointer-events-none select-none overflow-hidden rounded-b-[28px] sm:rounded-b-[32px] z-0">
                  <CardWaveArtwork index={idx} />
                </div>
              </Link>
            ) : (
              <div
                className={`flex flex-col h-full p-7 sm:p-9 pb-8 sm:pb-9 transition-all duration-300 group relative overflow-hidden ${cardStyle} ${cardClassName}`}
              >
                {CardContent}

                {/* Bottom Silky Wave Artwork */}
                <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 pointer-events-none select-none overflow-hidden rounded-b-[28px] sm:rounded-b-[32px] z-0">
                  <CardWaveArtwork index={idx} />
                </div>
              </div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
