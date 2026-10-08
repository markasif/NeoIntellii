"use client";

import React, { useEffect, useRef, useState } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: "center" | "left";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  variant?: "default" | "navy" | "white" | "cyan";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  variant = "default",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isNavy = variant === "navy";
  const isWhite = variant === "white";
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`${className.includes("max-w-") ? "" : "max-w-3xl"} ${isCenter ? "mx-auto text-center" : "text-left"} mb-8 sm:mb-10 lg:mb-12 ${className}`}
    >
      {/* 1. EYEBROW: Starts big & slightly offset, then smoothly scales down and docks into place */}
      {eyebrow && (
        <div
          className={`transition-all duration-700 ease-out origin-center ${
            isInView
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-[1.35] translate-y-4"
          }`}
        >
          <span
            className={`block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] ${
              isWhite ? "text-[#38BDF8]" : isNavy ? "text-[#0D306C]" : variant === "cyan" ? "text-[#008EC4]" : "text-[#169DC8]"
            } mb-2.5 sm:mb-3 ${eyebrowClassName}`}
          >
            {eyebrow}
          </span>
        </div>
      )}

      {/* 2. TITLE: Reveals with staggered slide-up */}
      <h2
        className={`text-2xl sm:text-4xl lg:text-[44px] font-extrabold ${
          isWhite ? "text-white" : isNavy ? "text-[#0D306C]" : variant === "cyan" ? "text-[#0D244D]" : "text-[#1E2560]"
        } tracking-[-0.03em] leading-[1.14] transition-all duration-700 delay-150 ease-out ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } ${titleClassName}`}
      >
        {title}
      </h2>

      {/* 3. DESCRIPTION: Reveals smoothly below title */}
      {description && (
        typeof description === "string" ? (
          <p
            className={`mt-3 sm:mt-4 text-base sm:text-[17px] ${
              isWhite ? "text-[#C5D7F0]" : isNavy ? "text-[#0D306C]/90 font-medium" : variant === "cyan" ? "text-[#475569]" : "text-[#505D74]"
            } leading-relaxed transition-all duration-700 delay-300 ease-out ${
              descriptionClassName.includes("max-w-") ? "" : isCenter ? "max-w-2xl mx-auto text-center" : "max-w-xl text-left"
            } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${descriptionClassName}`}
          >
            {description}
          </p>
        ) : (
          <div
            className={`mt-3 sm:mt-4 text-base sm:text-[17px] ${
              isWhite ? "text-[#C5D7F0]" : isNavy ? "text-[#0D306C]/90 font-medium" : variant === "cyan" ? "text-[#475569]" : "text-[#505D74]"
            } leading-relaxed transition-all duration-700 delay-300 ease-out ${
              descriptionClassName.includes("max-w-") ? "" : isCenter ? "max-w-2xl mx-auto text-center" : "max-w-xl text-left"
            } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${descriptionClassName}`}
          >
            {description}
          </div>
        )
      )}
    </div>
  );
}
