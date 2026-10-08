import { useId, type ReactNode } from "react";

interface InBriefCardProps {
  imageSrc?: string;
  imageAlt?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Standardized "IN BRIEF" card matching the uploaded design:
 * - Exact Navy Blue from the wave divider section (from-[#081B3E] via-[#0A224E] to-[#081B3E])
 * - Geometric amber chevron (zigzag) background pattern across the entire div
 * - Amber "IN BRIEF" tag and underline accent
 * - Clean, highly legible typography with elegant contrast
 */
export default function InBriefCard({
  children,
  className = "",
}: InBriefCardProps) {
  const patternId = useId();

  return (
    <div
      className={`w-full h-full relative overflow-hidden rounded-none bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D]/60 p-6 sm:p-7 lg:p-8 flex flex-col justify-center text-left group ${className}`}
    >
      {/* 1. AMBER CHEVRON / ZIGZAG PATTERN ACROSS FULL DIV */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={patternId}
              width="120"
              height="110"
              patternUnits="userSpaceOnUse"
            >
              {[-44, -22, 0, 22, 44, 66, 88, 110, 132].map((y) => (
                <path
                  key={y}
                  d={`M 0 ${y + 34} L 60 ${y} L 120 ${y + 34}`}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="1.35"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>

        {/* Ambient subtle glow matching wave divider section */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="relative z-10 w-full flex flex-col justify-center my-auto">
        <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#EA8A1A] mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          IN BRIEF
        </span>
        <div className="w-10 sm:w-12 h-[3px] bg-[#EA8A1A] rounded-full mb-3.5 sm:mb-4 shadow-[0_0_10px_rgba(234,138,26,0.6)]" />
        {typeof children === "string" ? (
          <p className="text-[#F0F6FC] text-sm sm:text-base leading-relaxed sm:leading-[1.75] font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            {children}
          </p>
        ) : (
          <div className="text-[#F0F6FC] text-sm sm:text-base leading-relaxed sm:leading-[1.75] font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}


