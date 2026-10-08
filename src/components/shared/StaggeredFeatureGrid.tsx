"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon, ShieldCheck } from "lucide-react";

export interface StaggeredFeatureCardItem {
  title?: string;
  who?: string;
  body?: string;
  does?: string;
  desc?: string;
  icon?: LucideIcon | React.ElementType;
  isTall?: boolean;
  highlight?: boolean;
  eyebrow?: string;
}

export interface StaggeredFeatureGridProps {
  items: StaggeredFeatureCardItem[];
  className?: string;
  defaultHovered?: number | null;
}

/**
 * Staggered 4-Card Feature Grid:
 * Reusable component based on the signature /services/ai-gcc overview Trust Strip:
 * - Outer cards (0 and 3) are tall framing the inner cards (1 and 2)
 * - Rounded 2xl/3xl with watermark circles
 * - Centered circular icon badge
 * - Smooth hover transition to dark navy gradient with white/cyan glow
 * - Directional entrance motion (card 0 from left, card 3 from right, center from down)
 */
export default function StaggeredFeatureGrid({
  items,
  className = "",
  defaultHovered,
}: StaggeredFeatureGridProps) {
  const highlightIdx = items.findIndex((it) => it.highlight);
  const initialIdx =
    defaultHovered !== undefined
      ? defaultHovered
      : highlightIdx >= 0
      ? highlightIdx
      : null;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(initialIdx);

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-5 lg:gap-6 pt-2 sm:pt-4 overflow-hidden py-2 max-w-7xl mx-auto ${className}`}
    >
      {items.map((item, idx) => {
        const title = item.title || item.who || "";
        const body = item.body || item.does || item.desc || "";
        const Icon = item.icon || ShieldCheck;
        const isHovered = hoveredIdx === idx;
        const isTall = item.isTall ?? (idx === 0 || idx === items.length - 1);

        // Directional entrance: Card 0 from left, Card 3 from right, Cards 1 & 2 from down
        const initialMotion =
          idx === 0
            ? { opacity: 0, x: -80, y: 0 }
            : idx === items.length - 1
            ? { opacity: 0, x: 80, y: 0 }
            : { opacity: 0, x: 0, y: 55 };

        return (
          <motion.div
            key={title}
            initial={initialMotion}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              delay: idx === 1 || idx === 2 ? 0.15 : 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(initialIdx)}
            className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 transition-all duration-300 flex flex-col justify-center items-center text-center group cursor-pointer ${
              isTall
                ? "sm:p-8 lg:p-9 min-h-[380px] sm:min-h-[400px] lg:min-h-[420px]"
                : "sm:p-7 min-h-[250px] sm:min-h-[260px]"
            } ${
              isHovered
                ? "border border-[#16427D]/60 -translate-y-1 shadow-md"
                : "bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 hover:-translate-y-1 hover:border-[#16427D]/60"
            }`}
          >
            {/* Subtle background circles default state */}
            <div
              className={`absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-300 ${
                isHovered
                  ? "opacity-0"
                  : "border border-[#0D306C]/5 opacity-100 group-hover:opacity-0"
              }`}
            />
            <div
              className={`absolute -bottom-14 -left-14 w-52 h-52 rounded-full pointer-events-none transition-opacity duration-300 ${
                isHovered
                  ? "opacity-0"
                  : "border border-[#0D306C]/5 opacity-100 group-hover:opacity-0"
              }`}
            />

            {/* Hover Navy Blue Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] transition-opacity duration-300 pointer-events-none z-0 ${
                isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute -bottom-14 -left-14 w-52 h-52 rounded-full border border-white/5 pointer-events-none" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isTall ? "mb-6 sm:mb-8" : "mb-4 sm:mb-5"
                } ${
                  isHovered
                    ? "bg-white text-[#008EC4] border-2 border-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] scale-105"
                    : "bg-[#EDF3FB] border border-[#C5D7EE] text-[#008EC4] shadow-xs group-hover:bg-white group-hover:text-[#008EC4] group-hover:border-white group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] group-hover:scale-105"
                }`}
              >
                <Icon className="w-7 h-7 text-[#008EC4] stroke-[2.2] transition-colors duration-300" />
              </div>

              {item.eyebrow && (
                <span
                  className={`text-2xs font-mono font-bold uppercase tracking-[0.2em] mb-2 transition-colors duration-300 ${
                    isHovered ? "text-[#00C2FF]" : "text-[#008EC4]"
                  }`}
                >
                  {item.eyebrow}
                </span>
              )}

              <h3
                style={{ color: isHovered ? "#ffffff" : undefined }}
                className={`font-bold tracking-tight mb-2 sm:mb-3 transition-colors duration-300 ${
                  isTall ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                } ${
                  isHovered
                    ? "!text-white"
                    : "text-[#0D306C] group-hover:!text-white"
                }`}
              >
                {title}
              </h3>
              <p
                style={{ color: isHovered ? "#ffffff" : undefined }}
                className={`leading-relaxed font-normal transition-colors duration-300 ${
                  isTall ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                } ${
                  isHovered
                    ? "!text-white"
                    : "text-[#505D74] group-hover:!text-white"
                }`}
              >
                {body}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
