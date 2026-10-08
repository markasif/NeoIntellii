import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { POINTY_TOP } from "./theme";

// The hexagon is the load-bearing shape of the NeoIntelli infographics: the
// logo mark, every process icon and the background texture all use it.

type HexTone = "blue" | "cyan" | "white" | "navy";

const TONES: Record<HexTone, { background: string; icon: string }> = {
  blue: { background: "linear-gradient(150deg, #1a6ed0 0%, #0b57bd 55%, #073f92 100%)", icon: "text-white" },
  cyan: { background: "linear-gradient(150deg, #12a0cf 0%, #0084b4 55%, #026287 100%)", icon: "text-white" },
  navy: { background: "linear-gradient(150deg, #16306e 0%, #0a1f52 100%)", icon: "text-white" },
  white: { background: "linear-gradient(150deg, #ffffff 0%, #eff5fd 100%)", icon: "text-[#0b57bd]" },
};

const SIZES = {
  sm: { box: "w-10 h-10", glyph: "w-4 h-4" },
  md: { box: "w-14 h-14", glyph: "w-5 h-5" },
  lg: { box: "w-16 h-16 md:w-[72px] md:h-[72px]", glyph: "w-6 h-6 md:w-7 md:h-7" },
};

export function HexBadge({
  icon: Icon,
  tone = "blue",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  tone?: HexTone;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const { background, icon } = TONES[tone];
  const { box, glyph } = SIZES[size];
  return (
    <span className={`${box} shrink-0 flex items-center justify-center ${className}`} style={{ clipPath: POINTY_TOP, background }}>
      <Icon className={`${glyph} ${icon}`} aria-hidden="true" />
    </span>
  );
}

/** Hexagon wrapper for content that is not a Lucide glyph (a number, say). */
export function HexTile({
  children,
  tone = "navy",
  className = "",
}: {
  children: ReactNode;
  tone?: HexTone;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center justify-center ${className}`}
      style={{ clipPath: POINTY_TOP, background: TONES[tone].background }}
    >
      {children}
    </span>
  );
}

/**
 * Faint hexagon lattice used as a section texture, mirroring the scattered
 * outlines in the source artwork. Decorative only.
 *
 * The two tones carry distinct pattern ids: SVG pattern ids are global, so a
 * light and a dark instance on the same page would otherwise collide.
 */
export function HexPattern({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const id = `lp-hex-${tone}`;
  const stroke = tone === "dark" ? "#7dd3f5" : "#0b57bd";
  const strokeOpacity = tone === "dark" ? 0.22 : 0.1;
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute ${className}`} width="100%" height="100%">
      <defs>
        <pattern id={id} width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(1.6)">
          <path
            d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 64 L56 80 L56 112 M28 64 L0 80 L0 112"
            fill="none"
            stroke={stroke}
            strokeOpacity={strokeOpacity}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
