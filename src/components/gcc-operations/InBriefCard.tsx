import { useId, type ReactNode } from "react";

interface InBriefCardProps {
  imageSrc?: string;
  imageAlt?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Standardized "IN BRIEF" card for GCC Operations:
 * - Deep navy gradient background
 * - Subtle technical grid, soft cyan ambient glows and a cyan wave along the
 *   bottom edge (kept clear of the copy), matching the site theme
 * - Amber "IN BRIEF" tag and clean underline accent
 * - High text contrast and visibility without obstruction
 */
export default function InBriefCard({
  children,
  className = "",
}: InBriefCardProps) {
  const waveId = useId();

  return (
    <div
      className={`w-full h-full relative overflow-hidden rounded-none bg-gradient-to-b from-[#06152F] via-[#091F44] to-[#051126] border border-[#16427D]/60 p-6 sm:p-7 lg:p-8 flex flex-col justify-center text-left group ${className}`}
    >
      {/* 1. DECORATIVE NAVY + CYAN BACKGROUND (MATCHES THE SITE THEME) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Soft technical grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#169DC8]/12 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#00A3E0]/10 rounded-full blur-3xl" />

        {/* Soft cyan wave accent along the bottom edge (kept clear of the text) */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-16 sm:h-20"
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${waveId}-cyanWave`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00A3E0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 84 C 200 44, 400 124, 600 74 C 780 34, 900 94, 1000 64"
            stroke={`url(#${waveId}-cyanWave)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
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


