"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useInView } from "framer-motion";

interface TypewriterParagraphProps {
  text: string;
  className?: string;
  cursorColor?: string;
  delayMs?: number;
}

/**
 * TypewriterParagraph
 * Renders a paragraph that smoothly types out when scrolled into view.
 * Uses a zero-CLS invisible ghost layout so the surrounding content never shifts or jumps.
 * Designed to preserve drop-cap styling (e.g. .drop-cap-amber).
 */
export default function TypewriterParagraph({
  text,
  className = "drop-cap-amber",
  cursorColor,
  delayMs = 120,
}: TypewriterParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const effectiveCursorColor = cursorColor ?? (className.includes("f19326") ? "#F19326" : "#F59E0B");

  // Dynamic step and interval targeting ~2.0s - 2.6s total duration across any text length
  const { charInterval, step } = useMemo(() => {
    const len = Math.max(text.length, 1);
    const calculatedStep = Math.max(1, Math.ceil(len / 180));
    const interval = Math.max(8, Math.min(14, Math.round(2200 / (len / calculatedStep))));
    return { charInterval: interval, step: calculatedStep };
  }, [text.length]);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedLength(text.length);
      setIsFinished(true);
      return;
    }

    if (!isInView || isFinished) return;

    let timeoutId: NodeJS.Timeout | null = null;
    let intervalId: NodeJS.Timeout | null = null;

    timeoutId = setTimeout(() => {
      setIsTyping(true);
      let currentIdx = 0;

      intervalId = setInterval(() => {
        currentIdx = Math.min(text.length, currentIdx + step);
        setDisplayedLength(currentIdx);

        if (currentIdx >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setTimeout(() => {
            setIsTyping(false);
            setIsFinished(true);
          }, 350);
        }
      }, charInterval);
    }, delayMs);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView, text, charInterval, step, delayMs, isFinished]);

  // When completely finished, render standard static paragraph
  if (isFinished) {
    return (
      <p className={className}>
        {text}
      </p>
    );
  }

  const displayedText = text.slice(0, displayedLength);

  return (
    <div ref={containerRef} className="relative">
      {/* Ghost paragraph to eliminate CLS (layout shift) while keeping exact flow dimensions */}
      <p className={`${className} invisible select-none pointer-events-none`} aria-hidden="true">
        {text}
      </p>

      {/* Active typing paragraph */}
      <p className={`${className} absolute inset-0 select-text`} aria-live="polite">
        {displayedText}
        {isTyping && (
          <span
            className="inline-block w-[3px] h-[0.95em] ml-1 align-baseline rounded-xs animate-pulse"
            style={{ backgroundColor: effectiveCursorColor }}
            aria-hidden="true"
          />
        )}
      </p>
    </div>
  );
}
