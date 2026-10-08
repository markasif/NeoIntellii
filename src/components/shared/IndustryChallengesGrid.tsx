import React from "react";

export type ChallengeItemType =
  | string
  | {
      title: string;
      desc?: string;
      description?: string;
    };

interface IndustryChallengesGridProps {
  items: ChallengeItemType[];
  className?: string;
}

/**
 * Cyber/Navy numbered challenges grid matching executive reference design.
 * Features glowing cyan glassmorphism panels, diagonal tech accents,
 * and high-contrast bold gradient numeric indices (01, 02, etc.).
 */
export default function IndustryChallengesGrid({
  items,
  className = "",
}: IndustryChallengesGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto ${className}`}
    >
      {items.map((item, index) => {
        const isOddTotal = items.length % 2 !== 0;
        const isLastItem = index === items.length - 1;
        const spansTwoCols = isOddTotal && isLastItem;

        const numberStr = String(index + 1).padStart(2, "0");

        let title: string | undefined;
        let description: string | undefined;

        if (typeof item === "string") {
          // Check if it's formatted as "Title - Description" or "Title: Description"
          if (item.includes(" - ")) {
            const parts = item.split(" - ");
            title = parts[0].trim();
            description = parts.slice(1).join(" - ").trim();
          } else if (item.includes(": ")) {
            const parts = item.split(": ");
            title = parts[0].trim();
            description = parts.slice(1).join(": ").trim();
          } else {
            description = item;
          }
        } else {
          title = item.title;
          description = item.desc || item.description;
        }

        return (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-xl border border-[#0099FF]/40 bg-[#041D40]/70 backdrop-blur-md transition-all duration-300 hover:border-[#00C2FF]/80 hover:shadow-[0_0_28px_rgba(0,194,255,0.22)] ${
              spansTwoCols ? "md:col-span-2" : "col-span-1"
            }`}
          >
            {/* Top Cyan Highlight Bar */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-[#00E5FF]/70 via-[#0099FF]/40 to-transparent pointer-events-none" />

            {/* Left Edge Subtle Glow */}
            <div className="absolute top-0 left-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#00E5FF]/70 via-[#0099FF]/20 to-transparent pointer-events-none" />

            {/* Diagonal Tech Shard / Angle Accent in top-left */}
            <div
              className="absolute top-0 left-0 w-36 sm:w-44 h-full pointer-events-none select-none opacity-40 transition-opacity duration-300 group-hover:opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 194, 255, 0.35) 0%, rgba(0, 102, 204, 0.08) 70%, transparent 100%)",
                clipPath: "polygon(0 0, 100% 0, 55% 100%, 0 100%)",
              }}
            />

            {/* Subtle Diagonal Shard Edge Line */}
            <div
              className="absolute top-0 left-0 w-36 sm:w-44 h-full pointer-events-none select-none opacity-50"
              style={{
                clipPath: "polygon(98% 0, 100% 0, 56% 100%, 54% 100%)",
                background:
                  "linear-gradient(180deg, rgba(0, 229, 255, 0.75) 0%, rgba(0, 153, 255, 0.2) 100%)",
              }}
            />

            {/* Ambient Corner Glow Flare */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#00C2FF]/15 rounded-full blur-xl pointer-events-none" />

            {/* Card Content: Number + Text */}
            <div className="relative z-10 flex items-center gap-5 sm:gap-7 md:gap-8 p-5 sm:p-6 md:p-7 min-h-[100px] sm:min-h-[110px]">
              {/* Giant Cyan Gradient Number */}
              <div className="shrink-0 select-none">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black font-manrope leading-none tracking-tight bg-gradient-to-b from-white via-[#70D6FF] to-[#0099FF] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(0,194,255,0.4)]">
                  {numberStr}
                </span>
              </div>

              {/* Text Description / Title */}
              <div className="flex-1 pr-1">
                {title && (
                  <h3 className="text-sm sm:text-base md:text-[17px] font-bold font-manrope text-white mb-1 leading-snug tracking-tight">
                    {title}
                  </h3>
                )}
                {description && (
                  <p
                    className={`${
                      title
                        ? "text-xs sm:text-sm text-slate-200 leading-relaxed font-sans"
                        : "text-sm sm:text-base md:text-[16.5px] text-white font-normal leading-relaxed font-sans"
                    }`}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
