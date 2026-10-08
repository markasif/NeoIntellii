"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface PathCard {
  title: string;
  desc: string;
  href: string;
  linkLabel: string;
}

interface PathCardsProps {
  items: PathCard[];
  columns?: 2 | 3 | 5;
}

const COL_CLASSES: Record<number, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

/**
 * Standardized Path & Starting Point Cards:
 * Matches the visual design system of BuyerPathCards & HiringPathCards:
 * - Clean editorial card on #E7EDF9 canvas with subtle border and elevation
 * - Monospace uppercase badge ("WAY 01", "WAY 02", etc.)
 * - Deep navy typography (#0D306C) and slate body copy
 * - Cyan rectangular action button with hover transition
 */
export default function PathCards({ items, columns = 3 }: PathCardsProps) {
  const colClass = COL_CLASSES[columns] || COL_CLASSES[3];

  return (
    <ul className={`grid gap-5 sm:gap-6 ${colClass} items-stretch max-w-7xl mx-auto list-none pl-0`}>
      {items.map((item, idx) => {
        const badge = `WAY ${String(idx + 1).padStart(2, "0")}`;
        const isExternal = item.href.startsWith("http");

        const content = (
          <div className="flex flex-col h-full justify-between p-6 sm:p-7 rounded-2xl border border-[#D2DCF0]/80 bg-white/95 backdrop-blur-sm shadow-xs hover:border-[#169DC8]/50 hover:shadow-md transition-all duration-300 group">
            <div>
              <span className="inline-block text-2xs font-mono font-bold uppercase tracking-[0.2em] text-[#169DC8] mb-3">
                {badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#0D306C] tracking-tight leading-snug mb-3 font-sans group-hover:text-[#008EC4] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed mb-6 font-normal">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EDF3FB] flex items-center justify-between mt-auto">
              <span className="text-xs sm:text-[13px] font-semibold text-[#008EC4] group-hover:text-[#0D306C] transition-colors inline-flex items-center gap-1.5">
                {item.linkLabel}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        );

        return (
          <li key={item.title} className="h-full">
            {isExternal ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8] rounded-2xl">
                {content}
              </a>
            ) : (
              <Link to={item.href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8] rounded-2xl">
                {content}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
