"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface FiveCardItem {
  /** Step number, e.g. "01", 1 */
  n?: string | number;
  /** Main uppercase card header, e.g. "DECISION 1: MANDATE" */
  title: string;
  /** Optional secondary question or bold subhead, e.g. "What will India own?" */
  subtitle?: string;
  /** Main descriptive narrative */
  body: string;
  /** Optional CTA button link and label */
  cta?: {
    label: string;
    href: string;
  };
  /** Optional color tone override: "blue" | "amber" | "navy" */
  tone?: "blue" | "amber" | "navy";
  /** Optional keyword/tag line rendered as a pill in the card footer */
  keywords?: string;
}

export interface FiveCardHeroGridProps {
  items: FiveCardItem[];
  className?: string;
  /** Compact card sizing for content-short grids (smaller padding, numbers and hero height). */
  compact?: boolean;
}

/**
 * Smart Marquee Button that keeps uniform pill aesthetics and smoothly
 * shifts overflowing text on hover so long button labels are fully legible.
 */
function CardPillButton({
  to,
  label,
  tone,
}: {
  to: string;
  label: string;
  tone: "blue" | "amber" | "navy";
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const measure = useCallback(() => {
    if (containerRef.current && textRef.current) {
      const extra = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setShift(extra > 3 ? extra : 0);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isHovered) measure();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [measure, isHovered]);

  const buttonStyles =
    tone === "navy"
      ? "bg-[#0070BA] hover:bg-[#008EC4] text-white border border-[#38BDF8]/40 shadow-md hover:shadow-lg"
      : tone === "amber"
      ? "border-[#D97706] bg-[#FFFBEB]/80 hover:bg-[#D97706] text-[#92400E] hover:text-white shadow-2xs hover:shadow-xs"
      : "border-[#00A3E0] bg-white hover:bg-[#008EC4] text-[#0D306C] hover:text-white shadow-2xs hover:shadow-xs";

  const arrowStyles =
    tone === "navy"
      ? "text-white"
      : tone === "amber"
      ? "text-[#D97706] group-hover/btn:text-white"
      : "text-[#008EC4] group-hover/btn:text-white";

  return (
    <Link
      to={to}
      title={label}
      onMouseEnter={() => {
        measure();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group/btn inline-flex items-center justify-between gap-2.5 max-w-full sm:max-w-[260px] h-9 px-4 rounded-full border text-xs sm:text-[13px] font-bold font-manrope transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] ${buttonStyles}`}
    >
      <span
        ref={containerRef}
        className={`relative block min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left ${
          shift > 0 && !isHovered
            ? "[mask-image:linear-gradient(to_right,black_calc(100%-14px),transparent_100%)]"
            : ""
        }`}
      >
        <span
          ref={textRef}
          className="inline-block will-change-transform"
          style={{
            transform: isHovered && shift > 0 ? `translateX(-${shift + 6}px)` : "translateX(0px)",
            transition:
              isHovered && shift > 0
                ? `transform ${Math.max(0.65, shift * 0.02)}s cubic-bezier(0.2, 0.8, 0.4, 1)`
                : "transform 0.3s ease-out",
          }}
        >
          {label}
        </span>
      </span>
      <ArrowRight
        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1 ${arrowStyles}`}
      />
    </Link>
  );
}

/**
 * Single card renderer supporting:
 * - "blue": clean white card with cyan outline number
 * - "amber": warm cream card with gold outline number
 * - "navy": deep navy hero card with abstract glowing wave banner
 */
function FiveCard({
  item,
  index,
  tone,
  isHero = false,
  compact = false,
}: {
  item: FiveCardItem;
  index: number;
  tone: "blue" | "amber" | "navy";
  isHero?: boolean;
  compact?: boolean;
}) {
  const numStr = item.n != null ? String(item.n).padStart(2, "0") : String(index + 1).padStart(2, "0");

  const strokeColor =
    tone === "navy" ? "#38BDF8" : tone === "amber" ? "#D97706" : "#008EC4";

  if (isHero) {
    return (
      <div className={`h-full ${compact ? "min-h-[200px] p-5 sm:p-6" : "min-h-[460px] p-6 sm:p-8"} flex flex-col rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D] relative overflow-hidden shadow-xl shadow-[#081B3E]/20 text-white group justify-end`}>
        {/* Abstract golden-blue flowing wave ribbons at top */}
        <div className={`absolute top-0 left-0 right-0 ${compact ? "h-24" : "h-32"} overflow-hidden pointer-events-none opacity-85`}>
          <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none" fill="none">
            <path
              d="M -20,28 C 80,8 160,82 260,38 C 320,12 360,36 420,10"
              stroke="url(#heroGoldGradient)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M -20,44 C 90,18 180,96 280,48 C 340,22 380,46 420,18"
              stroke="url(#heroBlueGradient)"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M -20,60 C 100,28 200,108 300,58 C 350,32 390,56 420,28"
              stroke="url(#heroCyanGradient)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.65"
            />
            <defs>
              <linearGradient id="heroGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.2" />
                <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FDE68A" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="heroBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="heroCyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284C7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Ambient top-right cyan glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#00A3E0]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Content Body */}
        <div className={`relative z-10 ${compact ? "pt-2" : "pt-4 sm:pt-6"}`}>
          {/* Outlined Number with Underline */}
          <div className={`${compact ? "mb-3" : "mb-5"} select-none`}>
            <span
            className={`${compact ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl"} font-mono font-extrabold tracking-tight leading-none block select-none`}
            style={{
              WebkitTextStroke: `2.5px ${strokeColor}`,
              color: "transparent",
            }}
            aria-hidden="true"
          >
            {numStr}
          </span>
            <div className="w-9 h-[2.5px] bg-[#38BDF8] rounded-full mt-2" />
          </div>

          <h3 className={`text-white ${compact ? "text-sm sm:text-base" : "text-base sm:text-lg"} font-extrabold uppercase tracking-wider font-manrope mb-2`}>
            {item.title}
          </h3>

          {item.subtitle && (
            <h4 className={`text-white ${compact ? "text-xs sm:text-[13px]" : "text-sm sm:text-base"} font-bold font-manrope mb-2.5 leading-snug`}>
              {item.subtitle}
            </h4>
          )}

          <p className={`text-slate-300 ${compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"} leading-relaxed font-normal`}>
            {item.body}
          </p>
        </div>

        {/* Bottom CTA / Keywords */}
        {(item.cta || item.keywords) && (
          <div className={`relative z-10 ${compact ? "mt-5 pt-3" : "mt-8 pt-4"}`}>
            {item.cta && <CardPillButton to={item.cta.href} label={item.cta.label} tone="navy" />}
            {item.keywords && (
              <span className="mt-3 inline-block text-[11px] sm:text-xs font-mono font-semibold text-[#67D5F7] bg-white/[0.08] border border-[#38BDF8]/30 px-3 py-1.5 rounded-lg">
                Keywords: {item.keywords}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Side Cards (Blue or Amber)
  const isAmber = tone === "amber";

  const cardStyles = isAmber
    ? "bg-[#FFFDF7] border-[#FDE68A] hover:border-[#D97706]/70 shadow-[0_4px_20px_rgba(217,119,6,0.04)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.08)]"
    : "bg-white/95 border-[#D2DCF0] hover:border-[#008EC4]/70 shadow-[0_4px_20px_rgba(13,48,108,0.04)] hover:shadow-[0_8px_30px_rgba(13,48,108,0.08)]";

  const underlineStyles = isAmber ? "bg-[#D97706]" : "bg-[#008EC4]";

  return (
    <div
      className={`flex-1 flex flex-col justify-between rounded-2xl sm:rounded-3xl border ${compact ? "p-4 sm:p-5" : "p-6 sm:p-7"} transition-all duration-300 relative group ${cardStyles}`}
    >
      <div>
        {/* Outlined Number with Underline */}
        <div className={`${compact ? "mb-2.5" : "mb-4"} select-none`}>
          <span
            className={`${compact ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl"} font-mono font-extrabold tracking-tight leading-none block select-none`}
            style={{
              WebkitTextStroke: `2px ${strokeColor}`,
              color: "transparent",
            }}
            aria-hidden="true"
          >
            {numStr}
          </span>
          <div className={`${compact ? "w-7" : "w-9"} h-[2.5px] rounded-full mt-2 ${underlineStyles}`} />
        </div>

        <h3 className={`text-[#0D306C] ${compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"} font-extrabold uppercase tracking-wider font-manrope mb-1.5 group-hover:text-[#008EC4] transition-colors`}>
          {item.title}
        </h3>

        {item.subtitle && (
          <h4 className={`text-[#0D306C] ${compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-[14px]"} font-bold font-manrope mb-2 leading-snug`}>
            {item.subtitle}
          </h4>
        )}

        <p className={`text-[#505D74] ${compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-[13px]"} leading-relaxed font-normal`}>
          {item.body}
        </p>
      </div>

      {/* Bottom CTA / Keywords */}
      {(item.cta || item.keywords) && (
        <div className={`${compact ? "mt-3 pt-1" : "mt-6 pt-2"}`}>
          {item.cta && <CardPillButton to={item.cta.href} label={item.cta.label} tone={tone} />}
          {item.keywords && (
            <span className="inline-block text-[11px] sm:text-xs font-mono font-semibold text-[#008EC4] bg-[#00A3E0]/10 px-3 py-1.5 rounded-lg">
              Keywords: {item.keywords}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * FiveCardHeroGrid
 *
 * Reusable 5-card signature layout:
 * - Left column: Card 01 (Blue) and Card 02 (Amber)
 * - Center column: Card 03 (Tall Dark Navy Hero Card with abstract golden-blue wave)
 * - Right column: Card 04 (Blue) and Card 05 (Amber)
 * - Smoothly adapts to 1 column on mobile and 3 columns on large screens
 */
export default function FiveCardHeroGrid({
  items,
  className = "",
  compact = false,
}: FiveCardHeroGridProps) {
  if (!items || items.length === 0) return null;

  // Left column: first two cards · Center column: everything between · Right column: last two cards.
  // 5 cards  → left [0,1] · center [2] (navy hero) · right [3,4]  (unchanged)
  // 7 cards  → left [0,1] · center [2,3,4] (navy hero in the middle) · right [5,6]
  const leftCards = items.slice(0, 2);
  const centerCards = items.slice(2, Math.max(2, items.length - 2));
  const rightCards = items.slice(Math.max(2, items.length - 2));

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* 3-Column Layout: Left, Center (tall navy hero), Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        {/* Left column */}
        {leftCards.length > 0 && (
          <div className="flex flex-col gap-6 h-full justify-between">
            {leftCards.map((card, i) => (
              <FiveCard
                key={`l${i}`}
                item={card}
                index={i}
                tone={card.tone || (i % 2 === 0 ? "blue" : "amber")}
                compact={compact}
              />
            ))}
          </div>
        )}

        {/* Center column (one navy hero, or three cards with the hero in the middle) */}
        {centerCards.length > 0 && (
          <div className="flex flex-col gap-6 h-full justify-between">
            {centerCards.map((card, ci) => {
              const globalIndex = 2 + ci;
              const heroIndex =
                centerCards.length === 1 ? 0 : Math.floor(centerCards.length / 2);
              const isHero = ci === heroIndex;
              const tone = isHero
                ? card.tone || "navy"
                : card.tone || (ci % 2 === 0 ? "blue" : "amber");
              return (
                <FiveCard
                  key={`c${ci}`}
                  item={card}
                  index={globalIndex}
                  tone={tone}
                  isHero={isHero}
                  compact={compact}
                />
              );
            })}
          </div>
        )}

        {/* Right column */}
        {rightCards.length > 0 && (
          <div className="flex flex-col gap-6 h-full justify-between">
            {rightCards.map((card, i) => {
              const globalIndex = items.length - rightCards.length + i;
              return (
                <FiveCard
                  key={`r${i}`}
                  item={card}
                  index={globalIndex}
                  tone={card.tone || (i % 2 === 0 ? "blue" : "amber")}
                  compact={compact}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
