"use client";

import React from "react";

export interface PillTagListProps {
  /** Array of labels/tags to render */
  items: string[];
  /** Flex alignment of the pill list */
  align?: "center" | "start" | "left" | "end" | "right";
  /** Size variant for padding and font size */
  size?: "sm" | "md" | "lg";
  /** Visual theme */
  theme?: "light" | "navy";
  /** Additional container styling */
  className?: string;
  /** Additional styling applied to each pill */
  pillClassName?: string;
}

/**
 * Reusable PillTagList component:
 * Clean, lightweight, branded cyan outline pill badges matching the NeoIntelli design system:
 * `rounded-full border border-[#00A3E0] bg-transparent text-[#0D244D] text-xs font-semibold select-none`
 */
export default function PillTagList({
  items,
  align = "center",
  size = "sm",
  theme = "light",
  className = "",
  pillClassName = "",
}: PillTagListProps) {
  if (!items || items.length === 0) return null;

  const isNavy = theme === "navy";

  const alignClass =
    align === "start" || align === "left"
      ? "justify-start"
      : align === "end" || align === "right"
      ? "justify-end"
      : "justify-center";

  const sizeClass =
    size === "lg"
      ? "px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-[15px]"
      : size === "md"
      ? "px-4 py-2 text-xs sm:text-[13px]"
      : "px-3.5 py-1.5 text-xs";

  const themeClass = isNavy
    ? "border-[#00A3E0]/70 bg-transparent text-[#C5D7F0] hover:border-[#38BDF8] hover:bg-[#00A3E0]/20 hover:text-white"
    : "border-[#00A3E0] bg-transparent text-[#0D244D] hover:border-[#008EC4] hover:bg-[#00A3E0]/10 hover:text-[#0D306C]";

  return (
    <ul
      className={`flex flex-wrap gap-2 sm:gap-2.5 ${alignClass} list-none pl-0 m-0 ${className}`}
    >
      {items.map((item) => (
        <li
          key={item}
          className={`inline-flex items-center rounded-full border font-semibold select-none transition-all duration-200 shadow-2xs hover:shadow-xs ${sizeClass} ${themeClass} ${pillClassName}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
