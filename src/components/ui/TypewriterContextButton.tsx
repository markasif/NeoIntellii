"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export interface TypewriterContextButtonProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function TypewriterContextButton({
  href,
  label,
  onClick,
  className = "",
}: TypewriterContextButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanLabel = useMemo(() => label.replace(/→$/, "").trim(), [label]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setIsHovered(false), 250);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let charIndex = 0;

    if (isHovered) {
      setDisplayedText("");
      intervalId = setInterval(() => {
        if (charIndex <= cleanLabel.length) {
          setDisplayedText(cleanLabel.slice(0, charIndex));
          charIndex++;
        } else if (intervalId) {
          clearInterval(intervalId);
        }
      }, 14);
    } else {
      setDisplayedText("");
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [isHovered, cleanLabel]);

  const isInternal = href.startsWith("/");

  const buttonContent = (
    <>
      <div className="flex items-center justify-center w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white shrink-0 text-[#0D306C] group-hover:text-[#169DC8] transition-colors">
        <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:rotate-12" />
      </div>
      <div
        className={`flex items-center gap-1.5 whitespace-nowrap overflow-hidden transition-all duration-300 ease-out ${
          isHovered
            ? "max-w-[440px] opacity-100 pr-3 sm:pr-3.5 pl-1"
            : "max-w-0 opacity-0 pointer-events-none pr-0 pl-0"
        }`}
      >
        <span className="text-xs sm:text-[13px] font-semibold text-[#0D306C] tracking-tight">
          {displayedText}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ml-0.5" />
      </div>
    </>
  );

  const sharedClassName = `inline-flex items-center rounded-full bg-white/95 hover:bg-white border border-slate-300/90 hover:border-slate-400/90 shadow-xs hover:shadow-md backdrop-blur-sm p-1 sm:p-1.5 text-[#0D306C] transition-all duration-300 ease-out group shrink-0 cursor-pointer overflow-hidden ${className}`.trim();

  if (isInternal) {
    return (
      <Link
        to={href}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={sharedClassName}
        title={cleanLabel}
        aria-label={cleanLabel}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={sharedClassName}
      title={cleanLabel}
      aria-label={cleanLabel}
    >
      {buttonContent}
    </a>
  );
}
