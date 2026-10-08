import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountingNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

/**
 * CountingNumber:
 * Automatically parses prefixed and suffixed numeric strings (e.g. "2,117", "3,728", "2.36M", "$98.4B")
 * and smoothly animates the count from 0 to the target value when scrolled into view.
 */
export default function CountingNumber({
  value,
  duration = 1.8,
  className = "",
}: CountingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const [displayValue, setDisplayValue] = useState<string>(() => {
    const match = value.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
    if (!match) return value;
    const [, prefix, , suffix] = match;
    return `${prefix}0${suffix}`;
  });

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) setDisplayValue(value);
      return;
    }

    const match = value.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const cleanNum = parseFloat(numStr.replace(/,/g, ""));
    if (isNaN(cleanNum)) {
      setDisplayValue(value);
      return;
    }

    const hasCommas = numStr.includes(",");
    const decimalPlaces = numStr.includes(".") ? (numStr.split(".")[1]?.length || 0) : 0;

    let startTime: number | null = null;
    let animId: number;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic deceleration curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = cleanNum * ease;

      let formatted: string;
      if (decimalPlaces > 0) {
        formatted = current.toFixed(decimalPlaces);
      } else if (hasCommas) {
        formatted = Math.floor(current).toLocaleString("en-US");
      } else {
        formatted = Math.floor(current).toString();
      }

      if (progress >= 1) {
        setDisplayValue(value);
      } else {
        setDisplayValue(`${prefix}${formatted}${suffix}`);
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, shouldReduceMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
