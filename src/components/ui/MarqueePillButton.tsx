"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface MarqueePillButtonProps {
  to: string;
  label: string;
  className?: string;
  variant?: "outline" | "solid" | "navy";
}

/**
 * Standardized Marquee Pill Button:
 * Compact, uniform-height pill button that smoothly shifts/marquees overflowing text
 * on hover so users can read the entire label while keeping all buttons across cards
 * aligned to identical height and width dimensions.
 */
export default function MarqueePillButton({
  to,
  label,
  className = "",
  variant = "outline",
}: MarqueePillButtonProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const measure = useCallback(() => {
    if (containerRef.current && textRef.current) {
      const extra = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setShift(extra > 2 ? extra : 0);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isHovered) measure();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [measure, isHovered]);

  const variantStyles =
    variant === "navy"
      ? "border-[#16427D]/80 bg-[#081B3E]/70 text-[#38BDF8] hover:bg-[#008EC4] hover:border-[#008EC4] hover:text-white"
      : variant === "solid"
      ? "border-[#008EC4] bg-[#008EC4] text-white hover:bg-[#0D306C] hover:border-[#0D306C]"
      : "border-[#00A3E0] bg-white/95 text-[#0D306C] hover:bg-[#008EC4] hover:border-[#008EC4] hover:text-white";

  return (
    <Link
      to={to}
      title={label}
      onMouseEnter={() => {
        measure();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group/marquee inline-flex items-center justify-between gap-1.5 w-full max-w-[210px] h-8 px-3 rounded-full border text-xs font-bold font-manrope transition-all duration-200 shadow-2xs hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] ${variantStyles} ${className}`}
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
                ? `transform ${Math.max(0.65, shift * 0.018)}s cubic-bezier(0.2, 0.8, 0.4, 1)`
                : "transform 0.3s ease-out",
          }}
        >
          {label}
        </span>
      </span>

      <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/marquee:translate-x-0.5" />
    </Link>
  );
}
