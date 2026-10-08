"use client";

import React, { type ReactNode } from "react";
import AiGccPointOfView from "@/components/ai-gcc/PointOfView";

interface PointOfViewProps {
  statement?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Editorial Point of View callout:
 * Delegating to the approved AiGccPointOfView component:
 * - Rich navy blue gradient (from-[#081B3E] via-[#0A224E] to-[#081B3E])
 * - Ambient radial glow
 * - Cyan quote badge and uppercase "OUR VIEW" tag
 * - Bold Manrope typography
 */
export default function PointOfView({ statement, children, className = "" }: PointOfViewProps) {
  return (
    <AiGccPointOfView className={className}>
      {statement && (
        <p className="font-bold text-white text-base sm:text-lg md:text-xl leading-snug mb-3 font-sans">
          {statement}
        </p>
      )}
      {children && (
        <div className="text-slate-300 text-sm sm:text-[14.5px] leading-relaxed space-y-2 font-normal">
          {children}
        </div>
      )}
    </AiGccPointOfView>
  );
}
