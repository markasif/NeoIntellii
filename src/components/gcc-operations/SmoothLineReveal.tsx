"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface SmoothLineRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

/**
 * SmoothLineReveal
 * Reveals narrative text smoothly from the first line down line-by-line through each paragraph
 * to the bottom paragraph as the user scrolls into view.
 *
 * Features:
 * - Staggered progressive downward reveal across all paragraphs.
 * - Hardware-accelerated clipPath sweep revealing text from top to bottom.
 * - Zero extra lines, blinking bars, or cursor artifacts.
 * - Full preservation of drop-cap typography (e.g. .drop-cap-amber).
 * - Full accessibility and prefers-reduced-motion support.
 */
export default function SmoothLineReveal({
  children,
  className = "",
  staggerDelay = 0.35,
  duration = 0.85,
}: SmoothLineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.18 });
  const shouldReduceMotion = useReducedMotion();

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0, clipPath: "none" }
              : {
                  opacity: 0,
                  y: 14,
                  clipPath: "inset(-8px -8px 100% -8px)",
                }
          }
          animate={
            shouldReduceMotion || isInView
              ? {
                  opacity: 1,
                  y: 0,
                  clipPath: "inset(-8px -8px -8px -8px)",
                }
              : {
                  opacity: 0,
                  y: 14,
                  clipPath: "inset(-8px -8px 100% -8px)",
                }
          }
          transition={{
            clipPath: {
              duration,
              delay: index * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: duration * 0.7,
              delay: index * staggerDelay,
              ease: "easeOut",
            },
            y: {
              duration,
              delay: index * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="relative"
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
