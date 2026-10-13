"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface HiringPath {
  title: string;
  tagline?: string;
  body?: string;
  desc?: string;
  items?: string[];
  cta?: { label: string; href: string } | null;
  href?: string;
  linkLabel?: string;
  highlight?: boolean;
  image?: string;
  imageAlt?: string;
}

export interface HiringPathCardsProps {
  paths?: HiringPath[];
  items?: HiringPath[];
  columns?: number;
  showButton?: boolean;
  /** "default" keeps the cyan/white CTA; "gradient" styles it like .btn-gradient; "white-to-cyan" renders .btn-white idle and .btn-cyan on hover. */
  buttonVariant?: "default" | "gradient" | "white-to-cyan" | "white-cyan" | "white";
}

const DEFAULT_IMAGES = [
  { image: "/images/how_we_work/phase_01_design.webp", alt: "One critical specialist hire" },
  { image: "/images/how_we_work/phase_02_build.webp", alt: "Build an AI team and engineering squad" },
  { image: "/images/how_we_work/phase_03_operate.webp", alt: "Run an AI Recruitment Hub" },
  { image: "/images/how_we_work/phase_04_scale.webp", alt: "Build an AI GCC operating model" },
  { image: "/images/solution_micro_gcc.webp", alt: "Build an AI Micro GCC capability center" },
];

/**
 * Interactive button with a smooth marquee/shift on hover when text overflows,
 * ensuring all buttons keep a uniform size while letting the user read the full text.
 */
function CtaButton({
  label,
  href,
  isActive,
  isExternal,
  isCompact = false,
  variant = "default",
}: {
  label: string;
  href: string;
  isActive: boolean;
  isExternal: boolean;
  isCompact?: boolean;
  variant?: "default" | "gradient" | "white-to-cyan" | "white-cyan" | "white";
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState<number>(0);
  const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);

  const measure = useCallback(() => {
    if (containerRef.current && textRef.current) {
      const extra = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setShift(extra > 2 ? extra : 0);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isBtnHovered) measure();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [measure, isBtnHovered]);

  const isGradient = variant === "gradient";
  const isWhiteToCyan = variant === "white-to-cyan" || variant === "white-cyan" || variant === "white";

  const buttonClasses = `w-fit sm:w-full inline-flex items-center justify-between gap-2.5 group/btn ${
    isCompact ? "px-3 py-2 xl:px-3.5 xl:py-2.5 text-xs" : "px-4 py-2 sm:px-4 sm:py-2.5 text-xs"
  } ${
    isGradient || isWhiteToCyan ? "rounded-full" : "rounded-sm"
  } font-bold tracking-normal transition-all duration-200 shrink-0 cursor-pointer overflow-hidden ${
    isWhiteToCyan
      ? isActive
        ? "bg-[#169DC8] text-white border border-[#169DC8] shadow-[0_1px_2px_rgba(22,157,200,0.25)] hover:bg-[#0D306C] hover:border-[#0D306C] hover:shadow-[0_0_22px_rgba(22,157,200,0.55),0_4px_16px_rgba(13,48,108,0.3)] hover:-translate-y-0.5 active:translate-y-0"
        : "bg-white text-[#0D244D] border border-[#CBD5E1] shadow-xs hover:bg-[#169DC8] hover:text-white hover:border-[#169DC8] hover:shadow-[0_0_22px_rgba(22,157,200,0.55),0_4px_16px_rgba(13,48,108,0.3)] hover:-translate-y-0.5 active:translate-y-0"
      : isGradient
      ? "bg-gradient-to-br from-[#169DC8] to-[#0D306C] text-white hover:shadow-[0_0_22px_rgba(22,157,200,0.55),0_4px_16px_rgba(13,48,108,0.3)]"
      : isActive
      ? "bg-white hover:bg-slate-100 text-[#093552] shadow-md"
      : "bg-[#169DC8] hover:bg-[#0D306C] text-white shadow-xs"
  }`;

  const content = (
    <>
      <span
        ref={containerRef}
        className="relative block min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left"
      >
        <span
          ref={textRef}
          className="inline-block will-change-transform"
          style={{
            transform: isBtnHovered && shift > 0 ? `translateX(-${shift + 6}px)` : "translateX(0px)",
            transition: isBtnHovered && shift > 0
              ? `transform ${Math.max(0.7, shift * 0.018)}s cubic-bezier(0.2, 0.8, 0.4, 1)`
              : "transform 0.35s ease-out",
          }}
        >
          {label}
        </span>
      </span>
      <ArrowRight
        className={`w-3.5 h-3.5 shrink-0 ml-1.5 transition-all duration-200 group-hover/btn:translate-x-0.5 ${
          isWhiteToCyan ? (isActive ? "text-white" : "text-[#169DC8] group-hover/btn:text-white") : ""
        }`}
      />
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={label}
        onMouseEnter={() => {
          measure();
          setIsBtnHovered(true);
        }}
        onMouseLeave={() => setIsBtnHovered(false)}
        className={buttonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={href}
      title={label}
      onMouseEnter={() => {
        measure();
        setIsBtnHovered(true);
      }}
      onMouseLeave={() => setIsBtnHovered(false)}
      className={buttonClasses}
    >
      {content}
    </Link>
  );
}

/**
 * Interactive Process Columns:
 * Supports 4-card or 5-card processes matching the exact design,
 * active duotone image background, and hover/click transitions.
 */
export default function HiringPathCards({
  paths,
  items,
  columns,
  showButton = true,
  buttonVariant = "default",
}: HiringPathCardsProps) {
  const cardList = paths || items || [];
  const totalCols = columns ?? cardList.length;
  const isFiveOrMore = totalCols >= 5;
  const isThree = totalCols === 3;
  const defaultIdx = cardList.findIndex((p) => p.highlight);
  const [activePath, setActivePath] = useState<number>(defaultIdx >= 0 ? defaultIdx : 0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Automatically activate cards on mobile as the user scrolls / moves past them
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-card-index");
            if (indexStr !== null) {
              const idx = parseInt(indexStr, 10);
              if (!isNaN(idx)) {
                setActivePath(idx);
              }
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0.25,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [cardList.length]);

  return (
    <div>
      {/* Process Columns with smooth staggered entrance animation */}
      <div
        className={
          isFiveOrMore
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5 xl:gap-3.5 2xl:gap-5 items-stretch pt-2 sm:pt-4"
            : isThree
            ? "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2 sm:pt-4 max-w-6xl mx-auto"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 items-stretch pt-2 sm:pt-4"
        }
      >
        {cardList.map((path, index) => {
          const isActive = activePath === index;
          const num = String(index + 1).padStart(2, "0");
          const imgInfo = DEFAULT_IMAGES[index] || DEFAULT_IMAGES[0];
          const imageSrc = path.image || imgInfo.image;
          const imageAlt = path.imageAlt || imgInfo.alt;
          const hasCta = showButton && path.cta !== null;
          const cta = path.cta || (path.href ? { label: path.linkLabel || "Explore", href: path.href } : { label: "Explore", href: "/contact" });
          const isExternal = cta.href.startsWith("http");
          const bodyText = path.body || path.desc || "";

          return (
            <motion.div
              key={path.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-card-index={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActivePath(index)}
              onTouchStart={() => setActivePath(index)}
              onTouchMove={() => setActivePath(index)}
              onClick={() => setActivePath(index)}
              className={
                isFiveOrMore
                  ? `relative p-4 sm:p-6 lg:p-5 xl:p-4 2xl:p-6 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] xl:min-h-[500px] transition-all duration-500 ease-out cursor-pointer rounded-2xl ${
                      isActive
                        ? "xl:-my-6 xl:py-12 scale-[1.01] shadow-xl xl:shadow-none text-white z-20 overflow-hidden"
                        : "bg-white/50 sm:bg-transparent text-slate-900 z-10 shadow-none border border-[#D2DCF0]/40 sm:border-transparent"
                    }`
                  : isThree
                  ? `relative p-6 sm:p-8 lg:p-9 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] md:min-h-[500px] transition-all duration-500 ease-out cursor-pointer rounded-2xl ${
                      isActive
                        ? "md:-my-8 md:py-14 scale-[1.01] md:scale-[1.02] shadow-xl md:shadow-none text-white z-20 overflow-hidden"
                        : "bg-white/50 sm:bg-transparent text-slate-900 z-10 shadow-none border border-[#D2DCF0]/40 sm:border-transparent"
                    }`
                  : `relative p-5 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] transition-all duration-500 ease-out cursor-pointer rounded-2xl ${
                      isActive
                        ? "lg:-my-8 lg:py-14 scale-[1.01] lg:scale-[1.02] shadow-xl lg:shadow-none text-white z-20 overflow-hidden"
                        : "bg-white/50 sm:bg-transparent text-slate-900 z-10 shadow-none border border-[#D2DCF0]/40 sm:border-transparent"
                    }`
              }
            >
              {/* ACTIVE STATE BACKGROUND IMAGE & CYAN DUOTONE ARCHITECTURAL WASH */}
              {isActive && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full object-cover object-center filter contrast-[1.3] brightness-[0.7] grayscale scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Cyan / Teal Duotone architectural overlay matching reference image */}
                  <div className="absolute inset-0 bg-[#0A4870] mix-blend-multiply opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031926] via-[#083D5C]/85 to-[#0E7490]/70 mix-blend-color" />
                  <div className="absolute inset-0 bg-cyan-600/15" />
                </div>
              )}

              {/* CARD CONTENT */}
              <div className="relative z-10 text-left">
                {/* Big Numerals 01, 02, etc. in website's typography */}
                <div className="flex items-center justify-between leading-none">
                  <span
                    className={
                      isFiveOrMore
                        ? `text-5xl sm:text-6xl xl:text-6xl 2xl:text-7xl font-sans font-bold tracking-tighter leading-none transition-colors duration-300 select-none ${
                            isActive ? "text-white" : "text-black"
                          }`
                        : `text-6xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tighter leading-none transition-colors duration-300 select-none ${
                            isActive ? "text-white" : "text-black"
                          }`
                    }
                  >
                    {num}
                  </span>
                </div>

                {/* Vertical Dotted Track Line under the number */}
                <div
                  className={`w-px h-8 border-l border-dashed my-4 transition-colors duration-300 ${
                    isActive ? "border-white/60" : "border-slate-300"
                  }`}
                />

                {/* Model Title */}
                <h3
                  className={
                    isFiveOrMore
                      ? `text-lg sm:text-xl xl:text-[19px] 2xl:text-xl font-bold tracking-tight mb-2 transition-colors duration-300 ${
                          isActive ? "text-white" : "text-black"
                        }`
                      : `text-2xl sm:text-[26px] font-bold tracking-tight mb-2 transition-colors duration-300 ${
                          isActive ? "text-white" : "text-black"
                        }`
                  }
                >
                  {path.title}
                </h3>

                {/* Tagline */}
                {path.tagline && (
                  <p
                    className={`text-xs ${
                      isFiveOrMore ? "font-semibold mb-2" : "sm:text-[13px] font-semibold mb-3"
                    } transition-colors duration-300 ${
                      isActive ? "text-[#67D5F7]" : "text-[#008EC4]"
                    }`}
                  >
                    {path.tagline}
                  </p>
                )}

                {/* Lead Description */}
                {bodyText && (
                  <p
                    className={`text-xs ${
                      isFiveOrMore ? "leading-relaxed mb-3" : "sm:text-[13px] leading-relaxed mb-3"
                    } font-normal transition-colors duration-300 ${
                      isActive ? "text-slate-100" : "text-slate-600"
                    }`}
                  >
                    {bodyText}
                  </p>
                )}

                {/* Capability / Sub-items List */}
                {path.items && path.items.length > 0 && (
                  <ul className="mt-3 space-y-2 list-none pl-0">
                    {path.items.map((entry) => (
                      <li
                        key={entry}
                        className={`flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug transition-colors duration-300 ${
                          isActive ? "text-slate-100" : "text-[#505D74]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 transition-colors duration-300 ${
                            isActive ? "bg-[#67D5F7]" : "bg-[#169DC8]"
                          }`}
                        />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom CTA Button */}
              {hasCta && (
                <div className="relative z-10 pt-6 text-left flex justify-start sm:block">
                  <CtaButton
                    label={cta.label}
                    href={cta.href}
                    isActive={isActive}
                    isExternal={isExternal}
                    isCompact={isFiveOrMore}
                    variant={buttonVariant}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
