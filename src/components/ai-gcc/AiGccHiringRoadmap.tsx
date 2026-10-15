"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Sliders,
  Search,
  Bot,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Award,
  Rocket,
} from "lucide-react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";

export interface HiringStep {
  label: string;
}

const STEP_ICONS = [
  Sliders,
  Search,
  Bot,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Award,
  Rocket,
];

/**
 * AI GCC Hiring Roadmap Component:
 * Adapts the exact continuous serpentine S-curve roadmap architecture from the homepage
 * WhyNeoIntelliLifecycle without affecting the homepage component:
 * - 8 continuous hiring stages from Role calibration to Onboarding
 * - Real-time scroll-driven line drawing with spring physics
 * - Brand hexagon polygon nodes with active ping & drop-shadow
 * - Mid-span directional arrow chevrons along each curve
 * - Zero extra descriptions or data added; uses only current labels
 * - Mobile responsive vertical timeline with scroll tracking
 */
export default function AiGccHiringRoadmap({
  steps,
}: {
  steps: HiringStep[];
}) {
  const desktopTimelineRef = useRef<HTMLDivElement | null>(null);
  const mobileTimelineRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [passedIndex, setPassedIndex] = useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Desktop Scroll Progress targeting the continuous serpentine roadmap
  const { scrollYProgress: rawDesktopScrollProgress } = useScroll({
    target: desktopTimelineRef,
    offset: ["start 70%", "end 55%"],
  });

  const smoothDesktopProgress = useSpring(rawDesktopScrollProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  const [desktopProgressVal, setDesktopProgressVal] = useState<number>(0);

  // 8 thresholds along the serpentine pathway
  const desktopThresholds = [0.04, 0.16, 0.28, 0.41, 0.54, 0.67, 0.80, 0.93];

  useMotionValueEvent(smoothDesktopProgress, "change", (latest) => {
    setDesktopProgressVal(latest);
    let currentIdx = -1;
    for (let i = 0; i < desktopThresholds.length; i++) {
      if (latest >= desktopThresholds[i]) {
        currentIdx = i;
      }
    }
    setPassedIndex(currentIdx);
  });

  // Mobile Scroll Progress
  const { scrollYProgress: rawMobileScrollProgress } = useScroll({
    target: mobileTimelineRef,
    offset: ["start 75%", "end 60%"],
  });

  const smoothMobileProgress = useSpring(rawMobileScrollProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  const [mobileProgressVal, setMobileProgressVal] = useState<number>(0);
  const mobileThresholds = [0.03, 0.16, 0.29, 0.43, 0.57, 0.71, 0.85, 0.96];

  useMotionValueEvent(smoothMobileProgress, "change", (latest) => {
    setMobileProgressVal(latest);
  });

  useEffect(() => {
    const el = desktopTimelineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // S-Curve Continuous Serpentine Path through all 8 nodes
  const sCurvePathD =
    "M 750,0 L 750,80 C 750,160 250,160 250,240 C 250,320 750,320 750,400 C 750,480 250,480 250,560 C 250,640 750,640 750,720 C 750,800 250,800 250,880 C 250,960 750,960 750,1040 C 750,1120 250,1120 250,1200 C 250,1280 500,1280 500,1310";

  // Mid-span directional arrow chevrons along each curve
  const pathChevrons = [
    { x: 500, y: 160, rot: 180, thresh: 0.10 }, // 01 to 02 (right to left)
    { x: 500, y: 320, rot: 0, thresh: 0.22 },   // 02 to 03 (left to right)
    { x: 500, y: 480, rot: 180, thresh: 0.35 }, // 03 to 04 (right to left)
    { x: 500, y: 640, rot: 0, thresh: 0.48 },   // 04 to 05 (left to right)
    { x: 500, y: 800, rot: 180, thresh: 0.61 }, // 05 to 06 (right to left)
    { x: 500, y: 960, rot: 0, thresh: 0.74 },   // 06 to 07 (left to right)
    { x: 500, y: 1120, rot: 180, thresh: 0.87 },// 07 to 08 (right to left)
  ];

  return (
    <div className="w-full select-none" role="region" aria-label="AI GCC hiring calibrated flow roadmap">
      {/* ========================================================================= */}
      {/* SVG DEFINITIONS                                                           */}
      {/* ========================================================================= */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="aiHiringLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#169DC8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#67D5F7" stopOpacity="1" />
            <stop offset="100%" stopColor="#169DC8" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* DESKTOP LIFECYCLE LINE WITH ARROWS                                        */}
      {/* ========================================================================= */}
      <div ref={desktopTimelineRef} className="hidden lg:block relative max-w-5xl mx-auto min-h-[1340px]">
        {/* CONTINUOUS SVG S-CURVE LIFECYCLE LINE WITH DIRECTIONAL ARROWS */}
        <svg
          viewBox="0 0 1000 1340"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        >
          {/* Base Subtle Dashed Guide Track */}
          <path
            d={sCurvePathD}
            stroke="#169DC8"
            strokeWidth="2"
            strokeDasharray="5 5"
            strokeOpacity="0.25"
          />

          {/* Primary Animated Cyan Line */}
          <motion.path
            d={sCurvePathD}
            stroke="url(#aiHiringLineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              pathLength: smoothDesktopProgress,
            }}
          />

          {/* Starting Origin Dot */}
          <circle cx="750" cy="0" r="5" fill="#169DC8" />

          {/* Directional Path Arrow Chevrons */}
          {pathChevrons.map((chev, i) => {
            const isChevronPassed = desktopProgressVal >= chev.thresh || passedIndex > i;
            return (
              <g
                key={i}
                transform={`translate(${chev.x}, ${chev.y}) rotate(${chev.rot})`}
              >
                <path
                  d="M -4.5 -6 L 4.5 0 L -4.5 6"
                  stroke={isChevronPassed ? "#67D5F7" : "#169DC8"}
                  strokeWidth={isChevronPassed ? "3.6" : "2.8"}
                  strokeOpacity={isChevronPassed ? 1 : 0.45}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* Terminating Arrowhead at Bottom (x: 500, y: 1310 pointing downward) */}
          <g transform="translate(500, 1310)">
            <path
              d="M -6 -8 L 0 0 L 6 -8"
              stroke={passedIndex >= 7 || desktopProgressVal >= 0.96 ? "#67D5F7" : "#169DC8"}
              strokeWidth={passedIndex >= 7 || desktopProgressVal >= 0.96 ? "3.6" : "2.8"}
              strokeOpacity={passedIndex >= 7 || desktopProgressVal >= 0.96 ? 1 : 0.45}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="transition-all duration-300"
            />
          </g>
        </svg>

        {/* 8 MILESTONE ROWS CORRESPONDING TO S-CURVE NODES */}
        <div className="relative z-10 grid grid-rows-8 gap-0">
          {steps.map((step, idx) => {
            const isNodeRight = idx % 2 === 0;
            const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];
            const isPassed = passedIndex >= idx;
            const isHovered = hoveredIndex === idx;
            const isActive = isPassed || isHovered;
            const num = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={step.label}
                className="grid grid-cols-2 items-center h-[160px] group/row cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* TEXT ON LEFT (When Node is on Right) */}
                {isNodeRight ? (
                  <div
                    className={`flex items-center gap-4 sm:gap-6 pr-8 lg:pr-12 transition-all duration-700 ease-out text-left ${
                      isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    {/* Large count 01, 02... */}
                    <div className="w-12 sm:w-14 shrink-0">
                      <span
                        className={`text-3xl sm:text-4xl font-mono font-extrabold transition-all duration-300 block select-none ${
                          isActive
                            ? "text-[#169DC8] translate-x-1"
                            : "text-white/40 group-hover/row:text-[#169DC8] group-hover/row:translate-x-1"
                        }`}
                      >
                        {num}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#7DD3FC] block mb-1">
                        STAGE {num}
                      </span>
                      <h3
                        className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/85 group-hover/row:text-white"
                        }`}
                      >
                        {step.label}
                      </h3>
                    </div>
                  </div>
                ) : (
                  /* NODE ON LEFT */
                  <div className="flex justify-center items-center">
                    <div className="relative flex items-center justify-center w-14 h-16">
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <svg viewBox="0 0 54 60" className="w-16 h-16 animate-ping opacity-30 text-[#169DC8]">
                            <polygon points="27,3 50,16 50,44 27,57 4,44 4,16" fill="currentColor" />
                          </svg>
                        </div>
                      )}

                      <svg
                        viewBox="0 0 54 60"
                        className={`w-12 h-14 transition-all duration-300 drop-shadow-md ${
                          isActive ? "scale-110 drop-shadow-lg" : "group-hover/row:scale-105"
                        }`}
                      >
                        <polygon
                          points="27,3 50,16 50,44 27,57 4,44 4,16"
                          fill={isActive ? "#169DC8" : "#0A224E"}
                          stroke={isActive ? "#38BDF8" : "#169DC8"}
                          strokeWidth={isActive ? "2.5" : "2"}
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                          isActive ? "text-white" : "text-[#169DC8] group-hover/row:text-white"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TEXT ON RIGHT (When Node is on Left) */}
                {!isNodeRight ? (
                  <div
                    className={`flex items-center gap-4 sm:gap-6 pl-8 lg:pl-12 transition-all duration-700 ease-out text-left ${
                      isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                    }`}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    {/* Large count 01, 02... */}
                    <div className="w-12 sm:w-14 shrink-0">
                      <span
                        className={`text-3xl sm:text-4xl font-mono font-extrabold transition-all duration-300 block select-none ${
                          isActive
                            ? "text-[#169DC8] translate-x-1"
                            : "text-white/40 group-hover/row:text-[#169DC8] group-hover/row:translate-x-1"
                        }`}
                      >
                        {num}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#7DD3FC] block mb-1">
                        STAGE {num}
                      </span>
                      <h3
                        className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/85 group-hover/row:text-white"
                        }`}
                      >
                        {step.label}
                      </h3>
                    </div>
                  </div>
                ) : (
                  /* NODE ON RIGHT */
                  <div className="flex justify-center items-center">
                    <div className="relative flex items-center justify-center w-14 h-16">
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <svg viewBox="0 0 54 60" className="w-16 h-16 animate-ping opacity-30 text-[#169DC8]">
                            <polygon points="27,3 50,16 50,44 27,57 4,44 4,16" fill="currentColor" />
                          </svg>
                        </div>
                      )}

                      <svg
                        viewBox="0 0 54 60"
                        className={`w-12 h-14 transition-all duration-300 drop-shadow-md ${
                          isActive ? "scale-110 drop-shadow-lg" : "group-hover/row:scale-105"
                        }`}
                      >
                        <polygon
                          points="27,3 50,16 50,44 27,57 4,44 4,16"
                          fill={isActive ? "#169DC8" : "#0A224E"}
                          stroke={isActive ? "#38BDF8" : "#169DC8"}
                          strokeWidth={isActive ? "2.5" : "2"}
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                          isActive ? "text-white" : "text-[#169DC8] group-hover/row:text-white"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET: Vertical Continuous Lifecycle Journey                    */}
      {/* ========================================================================= */}
      <div
        ref={mobileTimelineRef}
        className="block lg:hidden relative pl-6 sm:pl-8 space-y-4 sm:space-y-5 mt-4"
      >
        {/* Vertical Connecting Line Track */}
        <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-0 pointer-events-none">
          <div className="absolute inset-0 w-[2px] -translate-x-1/2 bg-[#169DC8]/30" />
        </div>

        {steps.map((step, index) => {
          const IconComponent = STEP_ICONS[index % STEP_ICONS.length];
          const isPassed = mobileProgressVal >= mobileThresholds[index];
          const isActive = hoveredIndex === index || isPassed;
          const num = String(index + 1).padStart(2, "0");

          return (
            <div
              key={step.label}
              onClick={() => setHoveredIndex(index)}
              className="relative flex items-center gap-4 sm:gap-6 group cursor-pointer text-left"
            >
              {/* Hexagon Node */}
              <div className="relative z-10 -ml-6 sm:-ml-8 shrink-0 flex items-center justify-center w-12 h-12">
                <svg
                  viewBox="0 0 54 60"
                  className={`w-11 h-12 transition-all duration-300 drop-shadow-sm ${
                    isActive ? "scale-105 drop-shadow-md" : ""
                  }`}
                >
                  <polygon
                    points="27,3 50,16 50,44 27,57 4,44 4,16"
                    fill={isActive ? "#169DC8" : "#0A224E"}
                    stroke={isActive ? "#38BDF8" : "#169DC8"}
                    strokeWidth={isActive ? "2.5" : "2"}
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                    isActive ? "text-white" : "text-[#169DC8]"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              {/* Step Details */}
              <div className="flex-1 min-w-0 pt-0.5 pb-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono font-bold text-[#38BDF8]">
                    {num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7DD3FC]">
                    STAGE
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {step.label}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
