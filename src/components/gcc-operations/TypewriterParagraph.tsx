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
  cursorColor = "#F59E0B",
  delayMs = 120,
}: TypewriterParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Compute smooth typing interval based on text length (targets ~2.6s - 3.2s total duration)
  const charInterval = useMemo(() => {
    return Math.max(7, Math.min(14, Math.round(2600 / Math.max(text.length, 1))));
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
        // Increment by 1 or 2 characters for extra fluid teletype feel on long texts
        const step = text.length > 300 ? 2 : 1;
        currentIdx = Math.min(text.length, currentIdx + step);
        setDisplayedLength(currentIdx);

        if (currentIdx >= text.length) {
          if (intervalId) clearInterval(intervalId);
          // Allow cursor to linger briefly then fade
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
  }, [isInView, text, charInterval, delayMs, isFinished]);

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
      </p>
    </div>
  );
}
