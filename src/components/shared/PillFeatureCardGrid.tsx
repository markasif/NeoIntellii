"use client";

import React from "react";
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
 * Standardized Pill Feature Card Grid:
 * Reusable card grid component for category cards with:
 * - Eyebrow / action verb tag
 * - Bold title
 * - Pill-shaped tag chips
 * - Descriptive paragraph body
 * - Bottom CTA link with directional hover arrow
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
    <ul className={`grid ${colClass} gap-5 sm:gap-6 list-none pl-0 items-stretch ${className}`}>
      {items.map((item, idx) => {
        const tag = item.verb || item.eyebrow;
        const pills = item.items || item.tags || [];
        const content = item.body || item.desc;
        const cta = item.ctaText || (item.title ? `Explore ${item.title}` : "Learn more");

        const CardContent = (
          <>
            {tag && (
              <span
                className={`block text-2xs font-mono font-bold uppercase tracking-[0.2em] mb-2.5 ${
                  isNavy ? "text-[#38BDF8]" : "text-[#008EC4]"
                }`}
              >
                {tag}
              </span>
            )}
            <h3
              className={`text-base sm:text-lg font-bold tracking-tight leading-snug mb-3 font-sans transition-colors ${
                isNavy
                  ? "text-white group-hover:text-[#38BDF8]"
                  : "text-[#0D306C] group-hover:text-[#008EC4]"
              }`}
            >
              {item.title}
            </h3>
            {pills.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-4 list-none pl-0">
                {pills.map((pill) => (
                  <li
                    key={pill}
                    className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold select-none transition-colors ${
                      isNavy
                        ? "border-[#00A3E0]/70 bg-[#00A3E0]/15 text-[#C5D7F0] group-hover:border-[#38BDF8]/90 group-hover:bg-[#00A3E0]/25 group-hover:text-white"
                        : "border-[#00A3E0] bg-transparent text-[#0D244D]"
                    }`}
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            )}
            {content && (
              <p
                className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${
                  isNavy ? "text-slate-300/90" : "text-[#505D74]"
                }`}
              >
                {content}
              </p>
            )}
            {item.href && (
              <span
                className={`mt-auto inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold transition-colors ${
                  isNavy
                    ? "text-[#38BDF8] group-hover:text-white"
                    : "text-[#008EC4] group-hover:text-[#0D306C]"
                }`}
              >
                {cta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </>
        );

        const cardStyle = isNavy
          ? "rounded-2xl bg-gradient-to-b from-[#0C3262]/85 via-[#08234B]/90 to-[#051836] border border-[#20528E]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_24px_rgba(4,18,43,0.32)] hover:shadow-[0_14px_36px_rgba(22,157,200,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
          : "rounded-2xl border border-[#D2DCF0]/80 bg-white/95 backdrop-blur-sm shadow-xs hover:border-[#169DC8]/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8]";

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
                className={`flex flex-col h-full p-6 sm:p-7 transition-all duration-300 group ${cardStyle} ${cardClassName}`}
              >
                {CardContent}
              </Link>
            ) : (
              <div
                className={`flex flex-col h-full p-6 sm:p-7 transition-all duration-300 group ${cardStyle} ${cardClassName}`}
              >
                {CardContent}
              </div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
