"use client";

import React, { type ReactNode } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

export interface SplitValuePointOfViewProps {
  description: ReactNode;
  pillsTitle?: string;
  pills?: string[];
  footer?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  ourViewText: ReactNode;
  ourViewLabel?: string;
  className?: string;
  centerPillsOnMobile?: boolean;
}

/**
 * SplitValuePointOfView Component:
 * Reusable split component across AI GCC pages:
 * - Left side: Transparent to background, content vertically aligned starting ~20% from top and ending ~20% before bottom of right side.
 * - Right side:
 *   - Top: Rectangular image without rounded corners (rounded-none, optional)
 *   - Bottom: Rectangular Navy Blue box (#081B3E) without rounded corners (rounded-none) with "OUR VIEW" quote.
 */
export default function SplitValuePointOfView({
  description,
  pillsTitle,
  pills = [],
  footer,
  imageSrc,
  imageAlt = "",
  ourViewText,
  ourViewLabel = "OUR VIEW",
  className = "",
  centerPillsOnMobile = true,
}: SplitValuePointOfViewProps) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto ${className}`}
    >
      {/* ── LEFT SIDE: Text, tags, and footer unified into one block with equal top and bottom padding ── */}
      <div className="flex flex-col justify-center text-left h-full py-4 sm:py-6">
        <div className="space-y-5">
          <div className="text-[#3E4D68] text-base sm:text-[16.5px] leading-relaxed font-normal">
            {description}
          </div>

          {pills.length > 0 && (
            <div className={centerPillsOnMobile ? "text-center sm:text-left" : ""}>
              {pillsTitle && (
                <p className="text-xs uppercase tracking-wider font-bold text-[#0D306C] mb-3">
                  {pillsTitle}
                </p>
              )}
              <ul
                className={`flex flex-wrap gap-2 sm:gap-2.5 list-none p-0 m-0 ${
                  centerPillsOnMobile ? "justify-center sm:justify-start" : ""
                }`}
              >
                {pills.map((pill) => (
                  <li
                    key={pill}
                    className="inline-flex items-center justify-center text-center px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full border border-[#00A3E0] bg-transparent text-[#0D244D] text-xs sm:text-[13.5px] font-semibold hover:border-[#0D306C] hover:bg-white/40 transition-all duration-200 shadow-xs select-none"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {footer && (
            <div className="text-[#505D74] text-sm sm:text-[14.5px] leading-relaxed pt-3.5 border-t border-[#D2DCF0]/80">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT SIDE: Image on top + Rectangular Navy Box below with fixed little gap ── */}
      <div className="flex flex-col gap-3 sm:gap-3.5 self-center w-full">
        {/* Top Image: Rectangular without rounded corners */}
        {imageSrc && (
          <div className="relative w-full aspect-[16/9] overflow-hidden border border-[#CBD7E8] shadow-[0_4px_20px_rgba(13,48,108,0.06)] rounded-none bg-[#071D42]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Bottom Navy Box: Rectangular without rounded corners */}
        <div className="rounded-none bg-gradient-to-br from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D]/80 p-6 sm:p-7 text-white shadow-md text-left">
          <div className="flex items-center gap-2 mb-2.5 text-[#169DC8] text-xs uppercase tracking-widest font-extrabold">
            <Quote className="w-4 h-4 text-[#169DC8]" aria-hidden />
            <span>{ourViewLabel}</span>
          </div>
          <p className="text-white text-sm sm:text-[15.5px] leading-relaxed font-medium">
            {ourViewText}
          </p>
        </div>
      </div>
    </div>
  );
}
