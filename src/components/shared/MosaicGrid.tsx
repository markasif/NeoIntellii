"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface MosaicGridItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkHref: string;
  linkLabel: string;
  number: string;
}

interface MosaicGridProps {
  items: MosaicGridItem[];
  className?: string;
}

const GAP = 16;
const HALF_H = 320;
const TALL_H = HALF_H * 2 + GAP;
const BOT_H = 310;

function MosaicCard({
  item,
  index,
  isInView,
  direction = "center",
  delay = 0,
  style,
  className = "",
  showNumber = false,
  showLink = false,
}: {
  item: MosaicGridItem;
  index: number;
  isInView: boolean;
  direction?: "left" | "center" | "right";
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  showNumber?: boolean;
  showLink?: boolean;
}) {
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
      className={`group overflow-hidden flex flex-col border border-[#0D244D]/10 bg-white shadow-xs hover:shadow-md ${className}`}
    >
      {/* ── IMAGE SECTION (top, flexible height) ── */}
      <div className="relative flex-1 overflow-hidden min-h-[120px]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="border-0 object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* ── WHITE TEXT PANEL (bottom, fixed : never overlaps image) ── */}
      <div className="flex-shrink-0 bg-white px-4 py-3.5 sm:px-5 sm:py-4 space-y-2 border-t border-[#0D244D]/10">
        {/* Number + Heading */}
        <div className="flex items-baseline gap-2">
          {showNumber && (
            <span className="shrink-0 text-xs sm:text-sm font-mono font-black text-[#008EC4] tracking-wider leading-snug">
              {item.number}
            </span>
          )}
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0D244D] tracking-tight leading-snug">
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[11.5px] sm:text-[12px] text-[#505D74] leading-relaxed font-normal">
          {item.description}
        </p>

        {/* Action Link */}
        {showLink && (
          <div className="pt-0.5">
            <Link
              to={item.linkHref}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#008EC4] hover:bg-[#0D244D] text-white text-[10px] sm:text-[10.5px] font-bold tracking-wide shadow-2xs transition-colors"
            >
              <span>{item.linkLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MosaicGrid({ items, className = "" }: MosaicGridProps) {
  const topGridRef = useRef<HTMLDivElement>(null);
  const bottomGridRef = useRef<HTMLDivElement>(null);

  const isTopInView = useInView(topGridRef, { once: true, amount: 0.15 });
  const isBottomInView = useInView(bottomGridRef, { once: true, amount: 0.15 });

  // Expect exactly 7 items for the mosaic layout
  const [item01, item02, item03, item04, item05, item06, item07] = items;

  return (
    <div className={`flex flex-col gap-4 overflow-hidden py-2 ${className}`}>

      {/* -- Top mosaic : desktop 3-col with exact pixel row heights -- */}
      <div
        ref={topGridRef}
        className="hidden sm:grid gap-4"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: `${HALF_H}px ${HALF_H}px`,
        }}
      >
        {/* 01 : left, row-span 2 -> comes from LEFT */}
        {item01 && (
          <MosaicCard
            item={item01}
            index={0}
            isInView={isTopInView}
            direction="left"
            delay={0.05}
            style={{ gridColumn: "1", gridRow: "1 / span 2" }}
            className="h-full"
            showNumber={false}
            showLink={false}
          />
        )}
        {/* 02 : middle, row 1 -> comes from CENTER */}
        {item02 && (
          <MosaicCard
            item={item02}
            index={1}
            isInView={isTopInView}
            direction="center"
            delay={0.15}
            style={{ gridColumn: "2", gridRow: "1" }}
            className="h-full"
            showNumber={false}
            showLink={false}
          />
        )}
        {/* 04 : right, row-span 2 -> comes from RIGHT (index 3) */}
        {item04 && (
          <MosaicCard
            item={item04}
            index={3}
            isInView={isTopInView}
            direction="right"
            delay={0.05}
            style={{ gridColumn: "3", gridRow: "1 / span 2" }}
            className="h-full"
            showNumber={false}
            showLink={false}
          />
        )}
        {/* 03 : middle, row 2 -> comes from CENTER (index 2) */}
        {item03 && (
          <MosaicCard
            item={item03}
            index={2}
            isInView={isTopInView}
            direction="center"
            delay={0.25}
            style={{ gridColumn: "2", gridRow: "2" }}
            className="h-full"
            showNumber={false}
            showLink={false}
          />
        )}
      </div>

      {/* Mobile: cards 01-04 stacked */}
      <div className="flex flex-col gap-4 sm:hidden">
        {[item01, item02, item03, item04].filter(Boolean).map((item, i) => {
          const dir = i % 3 === 0 ? "left" : i % 3 === 1 ? "center" : "right";
          return (
            <MosaicCard
              key={item.title}
              item={item}
              index={i}
              isInView={isTopInView}
              direction={dir}
              delay={i * 0.1}
              className="min-h-[280px]"
              showNumber={false}
              showLink={false}
            />
          );
        })}
      </div>

      {/* ── Bottom row: 05 (left), 06 (center), 07 (right) ── */}
      <div ref={bottomGridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {item05 && (
          <MosaicCard
            item={item05}
            index={4}
            isInView={isBottomInView}
            direction="left"
            delay={0.05}
            style={{ height: BOT_H }}
            className="min-h-[280px]"
            showNumber={false}
            showLink={false}
          />
        )}
        {item06 && (
          <MosaicCard
            item={item06}
            index={5}
            isInView={isBottomInView}
            direction="center"
            delay={0.15}
            style={{ height: BOT_H }}
            className="min-h-[280px]"
            showNumber={false}
            showLink={false}
          />
        )}
        {item07 && (
          <MosaicCard
            item={item07}
            index={6}
            isInView={isBottomInView}
            direction="right"
            delay={0.25}
            style={{ height: BOT_H }}
            className="min-h-[280px]"
            showNumber={false}
            showLink={false}
          />
        )}
      </div>

    </div>
  );
}