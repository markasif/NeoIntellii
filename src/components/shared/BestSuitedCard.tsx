"use client";

import Image from "next/image";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export interface MosaicCardContentProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkHref: string;
  linkLabel: string;
  number: string;
  showNumber?: boolean;
  showLink?: boolean;
}

export function MosaicCardContent({
  title,
  description,
  imageSrc,
  imageAlt,
  linkHref,
  linkLabel,
  number,
  showNumber = true,
  showLink = true,
}: MosaicCardContentProps) {
  return (
    <div className="group overflow-hidden flex flex-col border border-[#0D244D]/10 bg-white shadow-xs hover:shadow-md h-full">
      {/* ── IMAGE SECTION (top, flexible height) ── */}
      <div className="relative flex-1 overflow-hidden min-h-[120px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="border-0 object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* ── WHITE TEXT PANEL (bottom, fixed : never overlaps image) ── */}
      <div className="flex-shrink-0 bg-white px-4 py-3.5 sm:px-5 sm:py-4 space-y-2 border-t border-[#0D244D]/10">
        {/* Number + Heading */}
        <div className="flex items-baseline gap-2">
          {showNumber && (
            <span className="shrink-0 text-xs sm:text-sm font-mono font-black text-[#008EC4] tracking-wider leading-snug">
              {number}
            </span>
          )}
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0D244D] tracking-tight leading-snug">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[11.5px] sm:text-[12px] text-[#505D74] leading-relaxed font-normal">
          {description}
        </p>

        {/* Action Link */}
        {showLink && (
          <div className="pt-0.5">
            <Link
              to={linkHref}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#008EC4] hover:bg-[#0D244D] text-white text-[10px] sm:text-[10.5px] font-bold tracking-wide shadow-2xs transition-colors"
            >
              <span>{linkLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export interface BestSuitedCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkHref: string;
  linkLabel: string;
  number: string;
  index: number;
  direction?: "left" | "center" | "right";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  isInView?: boolean;
  showNumber?: boolean;
  showLink?: boolean;
}

export default function BestSuitedCard({
  title,
  description,
  imageSrc,
  imageAlt,
  linkHref,
  linkLabel,
  number,
  index,
  direction = "center",
  delay = 0,
  className = "",
  style,
  isInView = true,
  showNumber = true,
  showLink = true,
}: BestSuitedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialProps = () => {
    if (shouldReduceMotion) return { opacity: 1, x: 0, y: 0, scale: 1 };
    switch (direction) {
      case "left":
        return { opacity: 0, x: -80, y: 0, scale: 1 };
      case "right":
        return { opacity: 0, x: 80, y: 0, scale: 1 };
      case "center":
      default:
        return { opacity: 0, x: 0, y: 35, scale: 0.94 };
    }
  };

  const getAnimateProps = () => {
    if (shouldReduceMotion || isInView) {
      return { opacity: 1, x: 0, y: 0, scale: 1 };
    }
    return getInitialProps();
  };

  return (
    <motion.div
      style={style}
      initial={getInitialProps()}
      animate={getAnimateProps()}
      transition={{
        duration: 0.85,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`h-full ${className}`}
    >
      <MosaicCardContent
        title={title}
        description={description}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        linkHref={linkHref}
        linkLabel={linkLabel}
        number={number}
        showNumber={showNumber}
        showLink={showLink}
      />
    </motion.div>
  );
}