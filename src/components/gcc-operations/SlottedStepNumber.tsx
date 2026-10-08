import React from "react";

interface SlottedStepNumberProps {
  /** 0-indexed step number (0 => "01", 1 => "02", etc.) */
  index: number;
  /** Optional custom color override. Defaults to Operational Reality cyan palette. */
  color?: string;
  className?: string;
}

/**
 * Signature Operational Reality cyan palette:
 * Unified high-tech cyan/blue matching the Operational Reality section in GccOperations.tsx
 */
export const SLOTTED_STEP_COLORS = [
  "#008EC4", // 01: NeoIntelli Primary Cyan
  "#169DC8", // 02: Sky Cyan
  "#008EC4", // 03: NeoIntelli Primary Cyan
  "#169DC8", // 04: Sky Cyan
  "#008EC4", // 05: NeoIntelli Primary Cyan
  "#169DC8", // 06: Fallback Cyan
];

/**
 * SlottedStepNumber renders a two-digit number tucked ("dug by half")
 * into a clean horizontal slit cut, styled after the Operational Reality section:
 * - Font: font-mono tracking-tighter
 * - Signature cyan outline stroke like Operational Reality (WebkitTextStroke: "2.5px #008EC4")
 * - Clean slit cut with no shadow in the dig area
 * - Preserves font weight on hover (no unbolding)
 */
export default function SlottedStepNumber({
  index,
  color,
  className = "",
}: SlottedStepNumberProps) {
  const numStr = String(index + 1).padStart(2, "0");
  const strokeColor = color || SLOTTED_STEP_COLORS[index % SLOTTED_STEP_COLORS.length];

  return (
    <div className={`relative w-full flex flex-col items-center mb-5 select-none ${className}`}>
      {/* Lifted clipping window: raises the outlined number so it sits prominently above the slit cut */}
      <div className="relative overflow-hidden w-full flex items-start justify-center h-14 sm:h-16 lg:h-[72px] pt-0.5 pointer-events-none">
        <span
          className="slotted-step-number text-5xl sm:text-6xl lg:text-[70px] font-mono font-bold tracking-tighter leading-none select-none block transition-transform duration-300 ease-out group-hover:-translate-y-2"
          style={{
            WebkitTextStroke: `2.5px ${strokeColor}`,
            color: "transparent",
            fontWeight: 800,
          }}
          aria-hidden="true"
        >
          {numStr}
        </span>
      </div>

      {/* Horizontal Slit Cut without shadow in the dig area */}
      <div className="relative w-24 sm:w-28 lg:w-32 flex flex-col items-center pointer-events-none -mt-[1px]">
        {/* Clean Slit line cut into surface */}
        <div className="w-full h-[1.5px] bg-[#B0BFD0]/80 rounded-full" />
      </div>
    </div>
  );
}
