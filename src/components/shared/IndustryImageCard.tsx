"use client";

import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export interface IndustryImageCardProps {
  title: string;
  description?: string;
  /** Small row rendered above the title (e.g. meta badges). */
  eyebrow?: ReactNode;
  image: string;
  imageAlt?: string;
  /** When provided (and no custom `action`), renders the default "Explore" link. */
  href?: string;
  linkLabel?: string;
  /** "text" (default) renders the cyan inline link; "button" the filled accent button. */
  linkVariant?: "text" | "button";
  /** Custom action node rendered at the bottom of the text column. */
  action?: ReactNode;
  /** Vertical alignment of the text column. */
  align?: "center" | "between";
  className?: string;
  style?: CSSProperties;
}

/**
 * Industry image + text card — the shared design used on the home page
 * Industries section and reused across pages (Micro GCC, Case Studies, Careers).
 * Flat card surface, sharp image panel on the right, no overlay.
 *
 * With `linkVariant="button"` the card CTA uses the same clean rectangular
 * accent button styling as the Insights "Read article" button, anchored at the
 * bottom part of the card with the heading at the top and the description centered.
 */
export default function IndustryImageCard({
  title,
  description,
  eyebrow,
  image,
  imageAlt,
  href,
  linkLabel = "Explore GCC",
  linkVariant = "text",
  action,
  align = "between",
  className = "",
  style,
}: IndustryImageCardProps) {
  const isPlain = href ? href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") : false;
  const isButton = linkVariant === "button";

  const [isHovered, setIsHovered] = useState(false);
  const [overflowShift, setOverflowShift] = useState(0);
  const labelRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    const label = labelRef.current;
    const wrap = wrapRef.current;
    if (label && wrap) {
      const extra = label.scrollWidth - wrap.clientWidth;
      setOverflowShift(extra > 2 ? extra : 0);
    }
    setIsHovered(true);
  };
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const handleResize = () => {
      if (isHovered && labelRef.current && wrapRef.current) {
        const extra = labelRef.current.scrollWidth - wrapRef.current.clientWidth;
        setOverflowShift(extra > 2 ? extra : 0);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isHovered]);

  const truncated = isButton && overflowShift > 0;

  const arrow = isButton ? (
    <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
  ) : (
    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-200 group-hover/link:translate-x-1" />
  );

  /** Single line, fade-truncated by default; slides to reveal the rest on hover. */
  const buttonLabel = isButton ? (
    <>
      <span
        ref={wrapRef}
        className={`relative block min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left ${
          truncated && !isHovered
            ? "[mask-image:linear-gradient(to_right,black_calc(100%-16px),transparent_100%)]"
            : ""
        }`}
      >
        <span
          ref={labelRef}
          className="inline-block will-change-transform"
          style={{
            transform:
              isHovered && truncated ? `translateX(-${overflowShift + 6}px)` : "translateX(0px)",
            transition:
              isHovered && truncated
                ? `transform ${Math.max(0.5, overflowShift * 0.012)}s cubic-bezier(0.2, 0.8, 0.4, 1)`
                : "transform 0.3s ease-out",
          }}
        >
          {linkLabel}
        </span>
      </span>
      {arrow}
    </>
  ) : null;

  const linkClasses = isButton
    ? `btn-cyan btn-cyan-compact group/btn w-full justify-start overflow-hidden`
    : "inline-flex items-center gap-1.5 text-xs sm:text-[13px] lg:text-sm font-bold text-[#169DC8] group-hover:text-[#0D306C] transition-colors group/link leading-snug";

  const colWidthClass = isButton
    ? "w-[62%] sm:w-[60%] max-w-[64%]"
    : "w-[63%] sm:w-[61%] max-w-[65%] sm:max-w-[63%]";
  const imgWidthClass = isButton ? "w-[38%] sm:w-[40%]" : "w-[37%] sm:w-[39%]";
  const minHeightClass = isButton
    ? "min-h-[240px] sm:min-h-[250px] lg:min-h-[260px]"
    : "min-h-[240px] sm:min-h-[260px] lg:min-h-[270px]";

  return (
    <div
      style={style}
      className={`group relative rounded-2xl bg-white border border-[#DCE7F6] hover:border-[#169DC8]/60 shadow-[0_4px_20px_rgba(13,48,108,0.04)] hover:shadow-[0_10px_30px_rgba(13,48,108,0.08)] p-5 sm:p-6 ${minHeightClass} flex items-stretch justify-between overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* Left content */}
      <div
        className={`relative z-10 ${colWidthClass} pr-2 sm:pr-3 flex flex-col justify-between h-full`}
      >
        {/* Above: Heading */}
        <div>
          {eyebrow}
          <h3 className="text-base sm:text-lg lg:text-[19px] font-extrabold text-[#0D306C] tracking-tight leading-snug group-hover:text-[#169DC8] transition-colors font-manrope">
            {title}
          </h3>
        </div>

        {/* Center: Description */}
        {description && (
          <div className="my-auto py-2">
            <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-[#505D74] leading-relaxed font-normal line-clamp-3">
              {description}
            </p>
          </div>
        )}

        {/* Bottom part: CTA Button */}
        {action ? (
          <div className="pt-2 mt-auto">{action}</div>
        ) : href ? (
          <div className="mt-auto pt-2 sm:pt-3">
            {isPlain ? (
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={linkClasses}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {buttonLabel}
              </a>
            ) : (
              <Link
                href={href}
                className={linkClasses}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {buttonLabel}
              </Link>
            )}
          </div>
        ) : null}
      </div>

      {/* Right imagery */}
      <div className={`absolute right-0 top-0 bottom-0 ${imgWidthClass} h-full pointer-events-none overflow-hidden`}>
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  );
}