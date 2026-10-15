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
  columns?: 2 | 3;
}

/**
 * Modern Glassmorphism Card Grid matching executive reference design:
 * - 3-column responsive layout
 * - Left column (Col 1): Luxurious dark amber glass with golden amber typography (#FBBF24)
 * - Middle column (Col 2): Deep sapphire/navy frosted glass with crisp white typography
 * - Right column (Col 3): Luminous vibrant cyan/blue frosted glass with bright glow
 * - Clean bold title + description layout without symbols or corner clutter
 */
export default function IndustryChallengesGrid({
  items,
  className = "",
  columns = 3,
}: IndustryChallengesGridProps) {
  const gridColsClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={`grid ${gridColsClass} gap-5 sm:gap-6 max-w-7xl mx-auto items-stretch ${className}`}
    >
      {items.map((item, index) => {
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

        const displayTitle = title
          ? title.endsWith(":") || title.endsWith("?")
            ? title
            : `${title}:`
          : "";

        // Determine column variant based on 3-column progression:
        // 0 = Amber Glass (Left), 1 = Deep Blue Glass (Middle), 2 = Luminous Frosted Blue Glass (Right)
        const colVariant = index % 3;

        let cardTheme = "";
        let hairlineTheme = "";
        let titleColor = "";
        let descColor = "";

        if (colVariant === 0) {
          // Left Column: Amber Glass
          cardTheme =
            "border-[#F59E0B]/35 bg-gradient-to-br from-[#B45309]/20 via-[#451A03]/25 to-[#050D1A]/95 hover:border-[#F59E0B]/75";
          hairlineTheme =
            "bg-gradient-to-r from-[#F59E0B]/80 via-[#F59E0B]/30 to-transparent";
          titleColor = "text-[#FBBF24]";
          descColor = "text-slate-200";
        } else if (colVariant === 1) {
          // Middle Column: Deep Navy / Blue Frosted Glass
          cardTheme =
            "border-white/15 bg-gradient-to-br from-white/[0.08] via-[#0D244D]/40 to-[#041024]/90 hover:border-white/35";
          hairlineTheme =
            "bg-gradient-to-r from-white/50 via-white/15 to-transparent";
          titleColor = "text-white";
          descColor = "text-slate-300";
        } else {
          // Right Column: Luminous Vibrant Cyan/Blue Frosted Glass
          cardTheme =
            "border-[#38BDF8]/45 bg-gradient-to-br from-[#38BDF8]/30 via-[#1E40AF]/25 to-[#06142B]/90 hover:border-[#38BDF8]/80";
          hairlineTheme =
            "bg-gradient-to-r from-[#38BDF8]/80 via-white/50 to-transparent";
          titleColor = "text-white";
          descColor = "text-[#E0F2FE]/90";
        }

        return (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl p-6 sm:p-7 md:p-8 flex flex-col justify-start text-left transition-all duration-300 hover:-translate-y-1 backdrop-blur-xl border shadow-none ${cardTheme}`}
          >
            {/* Top Highlight Hairline */}
            <div
              className={`absolute top-0 inset-x-0 h-[2px] ${hairlineTheme} pointer-events-none`}
            />

            {/* Card Content: Title + Description */}
            <div className="relative z-10 flex flex-col h-full">
              {displayTitle && (
                <h3
                  className={`text-base sm:text-lg md:text-[19px] font-bold font-manrope leading-snug tracking-tight mb-2.5 sm:mb-3 ${titleColor}`}
                >
                  {displayTitle}
                </h3>
              )}
              {description && (
                <p
                  className={`text-sm sm:text-[14.5px] leading-relaxed font-normal font-sans ${descColor}`}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { IndustryChallengesGrid as GlassCardsGrid };
