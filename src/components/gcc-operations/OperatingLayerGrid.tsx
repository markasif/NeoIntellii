"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GCC_OPERATIONS_CHILD_PAGES, type GccOpsPageKey } from "@/data/gccOperationsContent";

/**
 * Universal operating-model mosaic.
 *
 * Owns the 7-card operating-model mosaic design used on the GCC Operations
 * overview. Callers supply the cards; when none are supplied it defaults to the
 * GCC Operations child pages, preserving the original output exactly.
 */
export interface OperatingLayerItem {
  key?: string;
  cardTitle: string;
  summary: string;
  shortName: string;
  path: string;
  image?: string;
  /** Optional pill row (e.g. lifecycle sub-items). */
  items?: readonly string[];
  /** Optional action label. Defaults to `Explore ${shortName}`. */
  actionLabel?: string;
}

const CARD_IMAGES: Partial<Record<GccOpsPageKey, string>> = {
  people:      "/images/gcc-operations/gcc-ops-people.jpg",
  workforce:   "/images/gcc-operations/gcc-ops-workforce.jpg",
  workplace:   "/images/gcc-operations/gcc-ops-workplace.jpg",
  performance: "/images/gcc-operations/gcc-ops-performance.jpg",
  governance:  "/images/gcc-operations/gcc-ops-governance.jpg",
  bot:         "/images/gcc-operations/gcc-bot-journey.jpg",
  scale:       "/images/gcc-operations/gcc-setup-vs-ops.jpg",
};

const DEFAULT_ITEMS: OperatingLayerItem[] = GCC_OPERATIONS_CHILD_PAGES.map((page) => ({
  key: page.key,
  cardTitle: page.cardTitle,
  summary: page.summary,
  shortName: page.shortName,
  path: page.path,
}));

/**
 * Two-section card layout:
 *  ┌─────────────────────────────┐
 *  │  [IMAGE AREA] - dark bg     │  ← flex-1, image fills this
 *  │   01  Card Title            │
 *  ├─────────────────────────────┤
 *  │  [WHITE PANEL]              │  ← shrink-0, always below image
 *  │  Description text           │
 *  │  [Explore →]                │
 *  └─────────────────────────────┘
 * Image and text NEVER overlap.
 */
function MosaicCard({
  item,
  index,
  isInView,
  direction = "center",
  delay = 0,
  style,
  className = "",
}: {
  item: OperatingLayerItem;
  index: number;
  isInView: boolean;
  direction?: "left" | "center" | "right";
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const num = String(index + 1).padStart(2, "0");
  const src =
    item.image ?? CARD_IMAGES[item.key as GccOpsPageKey] ?? "/images/gcc-operations/gcc-ops-card.jpg";
  const shouldReduceMotion = useReducedMotion();

  const getInitialProps = () => {
    if (shouldReduceMotion) return { opacity: 1, x: 0, y: 0, scale: 1 };
    switch (direction) {
      case "left":
        return { opacity: 0, x: -80, y: 0, scale: 1 };
      case "right":
        return { opacity: 0, x: 80, y: 0, scale: 1 };
      case "center":
      default:
        return { opacity: 0, x: 0, y: 35, scale: 0.94 };
    }
  };

  const getAnimateProps = () => {
    if (shouldReduceMotion || isInView) {
      return { opacity: 1, x: 0, y: 0, scale: 1 };
    }
    return getInitialProps();
  };

  return (
    <motion.div
      style={style}
      initial={getInitialProps()}
      animate={getAnimateProps()}
      transition={{
        duration: 0.85,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group overflow-hidden flex flex-col rounded-2xl border border-[#0D244D]/10 bg-white shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* ── IMAGE SECTION (top, flexible height) ── */}
      <div className="relative flex-1 overflow-hidden min-h-[120px]">
        <Image
          src={src}
          alt={item.cardTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="border-0 object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* ── WHITE TEXT PANEL (bottom, fixed : never overlaps image) ── */}
      <div className="flex-shrink-0 bg-white px-4 py-3.5 sm:px-5 sm:py-4 space-y-2.5 border-t border-[#0D244D]/10">
        {/* Number + Heading */}
        <div className="flex items-baseline gap-2">
          <span className="shrink-0 text-xs sm:text-sm font-mono font-black text-[#008EC4] tracking-wider leading-snug">
            {num}
          </span>
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0D244D] tracking-tight leading-snug group-hover:text-[#008EC4] transition-colors">
            {item.cardTitle}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[11.5px] sm:text-[12px] text-[#505D74] leading-relaxed line-clamp-2">
          {item.summary}
        </p>

        {/* Pill Feature Design Row */}
        {item.items && item.items.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {item.items.slice(0, 3).map((entry) => (
              <span
                key={entry}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F0F8FD] to-[#E8F4FC] text-[10.5px] sm:text-[11px] font-semibold text-[#0B4D78] border border-[#BCE1F5] shadow-2xs hover:border-[#008EC4] hover:bg-[#E0F2FE] transition-all whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#008EC4] shrink-0" />
                <span>{entry}</span>
              </span>
            ))}
            {item.items.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[10px] font-semibold text-[#64748B] border border-[#E2E8F0] whitespace-nowrap">
                +{item.items.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Link */}
        <div className="pt-2 mt-auto">
          <Link
            to={item.path}
            className="btn-cyan whitespace-nowrap"
          >
            <span>{item.actionLabel ?? `Explore ${item.shortName}`}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/**
 *  ┌──────────┬──────────┬──────────┐
 *  │          │    02    │          │
 *  │    01    ├──────────┤    04    │
 *  │  (tall)  │    03    │  (tall)  │
 *  ├──────────┼──────────┼──────────┤
 *  │    05    │    06    │    07    │
 *  └──────────┴──────────┴──────────┘
 */
const GAP    = 16;    // px (gap-4)
const HALF_H = 350;   // px : cards 02, 03 (half-height cards)
const BOT_H  = 335;   // px : cards 05, 06, 07

export default function OperatingLayerGrid({
  items,
}: {
  items?: OperatingLayerItem[];
} = {}) {
  const topGridRef = useRef<HTMLDivElement>(null);
  const bottomGridRef = useRef<HTMLDivElement>(null);
  const mobileStackRef = useRef<HTMLDivElement>(null);

  const isTopInView = useInView(topGridRef, { once: true, amount: 0.15 });
  const isBottomInView = useInView(bottomGridRef, { once: true, amount: 0.15 });
  const isMobileInView = useInView(mobileStackRef, { once: true, amount: 0.15 });

  const p = items ?? DEFAULT_ITEMS;

  return (
    <div className="flex flex-col gap-4 overflow-hidden py-2">

      {/* -- Top mosaic : desktop 3-col with exact pixel row heights -- */}
      <div
        ref={topGridRef}
        className="hidden sm:grid gap-4"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: `${HALF_H}px ${HALF_H}px`,
        }}
      >
        {p[0] && (
          <MosaicCard
            item={p[0]}
            index={0}
            isInView={isTopInView}
            direction="left"
            delay={0.05}
            style={{ gridColumn: "1", gridRow: "1 / span 2" }}
            className="h-full"
          />
        )}
        {p[1] && (
          <MosaicCard
            item={p[1]}
            index={1}
            isInView={isTopInView}
            direction="center"
            delay={0.15}
            style={{ gridColumn: "2", gridRow: "1" }}
            className="h-full"
          />
        )}
        {p[3] && (
          <MosaicCard
            item={p[3]}
            index={3}
            isInView={isTopInView}
            direction="right"
            delay={0.05}
            style={{ gridColumn: "3", gridRow: "1 / span 2" }}
            className="h-full"
          />
        )}
        {p[2] && (
          <MosaicCard
            item={p[2]}
            index={2}
            isInView={isTopInView}
            direction="center"
            delay={0.25}
            style={{ gridColumn: "2", gridRow: "2" }}
            className="h-full"
          />
        )}
      </div>

      {/* Mobile: cards 01-04 stacked */}
      <div ref={mobileStackRef} className="flex flex-col gap-4 sm:hidden">
        {[p[0], p[1], p[2], p[3]].filter(Boolean).map((item, i) => {
          const dir = i % 3 === 0 ? "left" : i % 3 === 1 ? "center" : "right";
          return (
            <MosaicCard
              key={item.key ?? item.cardTitle}
              item={item}
              index={i}
              isInView={isMobileInView}
              direction={dir}
              delay={i * 0.1}
              className="min-h-[280px]"
            />
          );
        })}
      </div>

      {/* ── Bottom row: 05 (left), 06 (center), 07 (right) ── */}
      <div ref={bottomGridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[p[4], p[5], p[6]].filter(Boolean).map((item, i) => {
          const index = i + 4;
          const dir = i === 0 ? "left" : i === 1 ? "center" : "right";
          return (
            <MosaicCard
              key={item.key ?? item.cardTitle}
              item={item}
              index={index}
              isInView={isBottomInView}
              direction={dir}
              delay={0.05 + i * 0.1}
              style={{ height: BOT_H }}
              className="min-h-[280px]"
            />
          );
        })}
      </div>

    </div>
  );
}
