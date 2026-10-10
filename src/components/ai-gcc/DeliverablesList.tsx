"use client";

import React from "react";
import { type LucideIcon, ArrowRight } from "lucide-react";
import VerifiedBadge from "@/components/ui/VerifiedBadge";

export interface DeliverableItem {
  id?: string;
  text: string;
  icon?: LucideIcon;
}

export interface DeliverablesListProps {
  items: (DeliverableItem | string)[];
  className?: string;
  defaultIcon?: LucideIcon;
  /** Leading marker style: "none" = arrow icon, "hexagon" = icon in the brand hexagon, "hexagon-logo" = brand hexagon logo mark (no icon). */
  iconBadge?: "none" | "hexagon" | "hexagon-logo";
}

/**
 * DeliverablesList - Displays AI GCC Deliverables & Measures of Success:
 * - Two-column responsive layout
 * - Left outline icon (ArrowRight by default) in navy (#0D244D), turning cyan on hover
 * - Middle clear text
 * - Right scalloped VerifiedBadge rosette in navy (#0D306C) with white checkmark
 * - Subtle border bottom row dividers
 */
export default function DeliverablesList({
  items,
  className = "",
  defaultIcon = ArrowRight,
  iconBadge = "none",
}: DeliverablesListProps) {
  // Normalize items to DeliverableItem shape
  const normalizedItems: DeliverableItem[] = items.map((item, idx) => {
    if (typeof item === "string") {
      return { id: `deliv-${idx}`, text: item };
    }
    return { id: item.id || `deliv-${idx}`, text: item.text, icon: item.icon };
  });

  // Split items evenly into two columns
  const midPoint = Math.ceil(normalizedItems.length / 2);
  const leftColumn = normalizedItems.slice(0, midPoint);
  const rightColumn = normalizedItems.slice(midPoint);

  const renderRow = (item: DeliverableItem) => {
    const IconComponent = item.icon || defaultIcon;

    return (
      <div
        key={item.id}
        className="flex items-center justify-between gap-3.5 sm:gap-5 py-2.5 sm:py-3.5 group select-none transition-colors border-b border-[#DCE8F4]/60 last:border-b-0"
      >
        {/* Left: brand hexagon mark, or the leading icon */}
        {iconBadge === "none" ? (
          <div className="shrink-0 text-[#0D244D] group-hover:text-[#008EC4] transition-colors">
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
          </div>
        ) : (
          <div className="relative shrink-0 flex items-center justify-center w-8 h-9 sm:w-8.5 sm:h-9.5">
            <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm transition-transform duration-200 group-hover:scale-105" aria-hidden="true">
              <polygon
                points="27,3 50,16 50,44 27,57 4,44 4,16"
                fill="#EBF4FC"
                stroke="#169DC8"
                strokeWidth="2.4"
                strokeOpacity="0.85"
                strokeLinejoin="round"
              />
            </svg>
            {iconBadge === "hexagon" || item.icon ? (
              <div className="absolute inset-0 flex items-center justify-center text-[#008EC4] group-hover:text-[#0D306C] transition-colors">
                <IconComponent className="w-4 h-4 sm:w-[17px] sm:h-[17px] stroke-[2]" />
              </div>
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-[#0D306C] font-extrabold font-manrope text-[13px] leading-none" aria-hidden="true">
                N
              </span>
            )}
          </div>
        )}

        {/* Middle: Text */}
        <div className="flex-1 px-1 sm:px-2">
          <span className="text-sm sm:text-[14.5px] font-semibold leading-snug text-[#0D244D]">
            {item.text}
          </span>
        </div>

        {/* Right: Navy Rosette Badge with White Tick */}
        <div className="shrink-0">
          <VerifiedBadge
            className="w-5 h-5 sm:w-6 sm:h-6"
            badgeColor="#0D306C"
            checkColor="#FFFFFF"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`max-w-5xl mx-auto select-none ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-2 sm:gap-y-3">
        {/* Left Column */}
        <div className="space-y-1 sm:space-y-2">{leftColumn.map(renderRow)}</div>

        {/* Right Column */}
        <div className="space-y-1 sm:space-y-2">{rightColumn.map(renderRow)}</div>
      </div>
    </div>
  );
}
