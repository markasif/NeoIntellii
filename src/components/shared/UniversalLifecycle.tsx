"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";

const ITEM_LINKS: Record<string, string> = {
  "AI Talent": "/services/ai-talent",
  "AI Micro GCC": "/services/micro-gcc",
  "AI GCC": "/services/ai-gcc",
};

export type LifecycleTagStyle = "status" | "diagram" | "none";
export type LifecycleTheme = "light" | "navy";

export interface LifecycleStageItem {
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  desc?: string;
  visual?: string;
  tag?: string;
  tagLabel?: string;
  tagSub?: string;
  tagText?: string;
  items?: string[] | readonly string[];
  icon: React.ComponentType<{ className?: string }>;
  x?: number;
  y?: number;
  isHigh?: boolean;
  href?: string;
}

export interface LifecycleInputItem {
  id?: string;
  name?: string;
  title?: string;
  label?: string;
  description?: string;
  desc?: string;
  detail?: string;
  note?: string;
  visual?: string;
  tag?: string;
  tagLabel?: string;
  tagSub?: string;
  tagText?: string;
  items?: string[] | readonly string[];
  icon?: React.ComponentType<{ className?: string }>;
  x?: number;
  y?: number;
  isHigh?: boolean;
  href?: string;
}

export interface UniversalLifecycleProps {
  stages?: LifecycleStageItem[];
  items?: LifecycleStageItem[];
  steps?: LifecycleInputItem[];
  id?: string;
  className?: string;
  ariaLabel?: string;
  theme?: LifecycleTheme;
  variant?: "default" | "employee-journey" | "workforce-model" | "navy" | string;
  tagStyle?: LifecycleTagStyle;
}

/**
 * UniversalLifecycle
 * The single consolidated component for the "LIFECYCLE / JOURNEY / LOOP / MODEL / PATH" visual design family.
 * Supports 5, 6, 7, and 8 points dynamically without duplication.
 * Preserves exact visual output, styling variants, responsive timeline, and animations.
 */
export default function UniversalLifecycle({
  stages: stagesProp,
  items: itemsProp,
  steps: stepsProp,
  id = "universal-lifecycle",
  className = "",
  ariaLabel = "Continuous lifecycle journey",
  theme: themeProp,
  variant = "default",
  tagStyle: tagStyleProp,
}: UniversalLifecycleProps) {
  // Normalize input data
  const rawStages: LifecycleStageItem[] = useMemo(() => {
    const source = (stagesProp || itemsProp || stepsProp || []) as LifecycleInputItem[];
    return source.map((s, idx: number): LifecycleStageItem => {
      return {
        id: s.id || String(idx + 1).padStart(2, "0"),
        name: s.name || s.title || s.label || "",
        description: s.description || s.desc || s.detail || s.note || "",
        visual: s.visual,
        tag: s.tag,
        tagLabel: s.tagLabel,
        tagSub: s.tagSub,
        tagText: s.tagText,
        items: s.items ? [...s.items] : undefined,
        icon: s.icon || (() => null),
        x: s.x,
        y: s.y,
        isHigh: s.isHigh,
        href: s.href,
      };
    });
  }, [stagesProp, itemsProp, stepsProp]);

  const numStages = rawStages.length;
  const isNavy = themeProp === "navy" || variant === "navy";

  // Determine tagStyle
  const resolvedTagStyle: LifecycleTagStyle = useMemo(() => {
    if (tagStyleProp) return tagStyleProp;
    // Check if stages have status tags
    const hasStatusTag = rawStages.some(
      (s) => s.tag !== undefined || s.tagLabel !== undefined || s.tagSub !== undefined
    );
    if (hasStatusTag) return "status";
    const hasDiagramVisual = rawStages.some((s) => Boolean(s.visual || s.tagText));
    if (hasDiagramVisual) return "diagram";
    return "none";
  }, [tagStyleProp, rawStages]);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
  const [mobileTrackHeight, setMobileTrackHeight] = useState<number | null>(null);

  // Mobile scroll tracking
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTimelineRef,
    offset: ["start 75%", "end 65%"],
  });

  const [mobileScrollVal, setMobileScrollVal] = useState<number>(0);

  // Dynamic mobile thresholds based on stage count
  const stageThresholds = useMemo(() => {
    return rawStages.map((_, i) => {
      if (i === 0) return 0.01;
      return +((i / (numStages - 0.3)).toFixed(2));
    });
  }, [numStages, rawStages]);

  useMotionValueEvent(mobileScrollYProgress, "change", (latest) => {
    setMobileScrollVal(latest);
    let current = 0;
    for (let i = 0; i < stageThresholds.length; i++) {
      if (latest >= stageThresholds[i]) {
        current = i;
      }
    }
    setActiveStage(current);
  });

  // Calculate layout coordinates for each stage if not explicitly provided
  const computedStages = useMemo(() => {
    // Determine viewBox width & spread based on point count
    const viewBoxWidth = 1460;
    
    // Balanced symmetric margins ensuring equal space on left and right for any point count
    let margin = 90;
    if (numStages <= 4) {
      margin = 180;
    } else if (numStages === 5) {
      margin = 140;
    } else if (numStages === 6) {
      margin = 115;
    } else if (numStages === 7) {
      margin = 95;
    } else {
      margin = 85;
    }

    const startX = margin;
    const endX = viewBoxWidth - margin;
    const stepX = numStages > 1 ? (endX - startX) / (numStages - 1) : 0;

    // Check if stages have explicit coordinates that are already symmetrically centered in viewBoxWidth
    const hasExplicitX = rawStages.length > 0 && rawStages.every((s) => s.x !== undefined);
    const isSymmetricX =
      hasExplicitX &&
      rawStages.length > 1 &&
      Math.abs((rawStages[0].x! + rawStages[rawStages.length - 1].x!) - viewBoxWidth) < 20;

    const hasItems = rawStages.some((s) => s.items && s.items.length > 0);

    return rawStages.map((stage, idx) => {
      const computedX =
        isSymmetricX && stage.x !== undefined
          ? stage.x
          : Math.round(startX + idx * stepX);
      const isHigh =
        stage.isHigh !== undefined ? stage.isHigh : idx % 2 === 0;
      const computedY =
        stage.y !== undefined
          ? stage.y
          : hasItems
          ? isHigh
            ? 85
            : 195
          : isHigh
          ? 110
          : 240;
      const stageId = stage.id || String(idx + 1).padStart(2, "0");
      const stageTitle = stage.name || "";
      const stageDesc = stage.description || "";

      return {
        ...stage,
        computedX,
        computedY,
        isHigh,
        stageId,
        stageTitle,
        stageDesc,
      };
    });
  }, [rawStages, numStages]);

  // Construct smooth sinusoidal cubic bezier wave path & directional chevrons
  const { wavePathD, chevrons, originY } = useMemo(() => {
    if (computedStages.length < 2) {
      return { wavePathD: "", chevrons: [], originY: 175 };
    }

    const first = computedStages[0];
    const last = computedStages[computedStages.length - 1];

    // Wave starts cleanly at the first stage node and terminates cleanly at the last stage node,
    // ensuring identical spacing from left to right so the section is perfectly centered
    let d = `M ${first.computedX},${first.computedY}`;

    const chevs: { x: number; y: number; rot: number }[] = [];

    for (let i = 0; i < computedStages.length - 1; i++) {
      const curr = computedStages[i];
      const next = computedStages[i + 1];
      const dx = next.computedX - curr.computedX;

      // Smooth sinusoidal cubic bezier control points (at 35% and 65% of horizontal span)
      const cp1x = Math.round(curr.computedX + dx * 0.35);
      const cp1y = curr.computedY;
      const cp2x = Math.round(curr.computedX + dx * 0.65);
      const cp2y = next.computedY;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.computedX},${next.computedY}`;

      // Chevron placed at the exact midpoint inflection of the curve segment
      const chevX = Math.round((curr.computedX + next.computedX) / 2);
      const chevY = Math.round((curr.computedY + next.computedY) / 2);
      const rot = next.computedY > curr.computedY ? 40 : -40;
      chevs.push({ x: chevX, y: chevY, rot });
    }

    return { wavePathD: d, chevrons: chevs, originY: first.computedY };
  }, [computedStages]);

  // Staggered sequential illumination on first viewport reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);

          const stepDelay = Math.min(380, Math.round(2400 / Math.max(numStages, 1)));
          rawStages.forEach((_, idx) => {
            setTimeout(() => {
              setActiveStage(idx);
            }, 200 + idx * stepDelay);
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, numStages, rawStages]);

  // Dynamically calculate mobile vertical track height to end precisely at the last node
  useEffect(() => {
    const updateMobileTrack = () => {
      if (!lastNodeRef.current || !mobileTimelineRef.current) return;
      const timelineRect = mobileTimelineRef.current.getBoundingClientRect();
      const lastNodeRect = lastNodeRef.current.getBoundingClientRect();
      const lastNodeCenterY = lastNodeRect.top + lastNodeRect.height / 2 - timelineRect.top;
      setMobileTrackHeight(Math.max(0, lastNodeCenterY - 24));
    };

    updateMobileTrack();
    window.addEventListener("resize", updateMobileTrack);
    return () => window.removeEventListener("resize", updateMobileTrack);
  }, [computedStages]);

  // Tag styling helper matching existing GCC operations pill colors
  const getStatusTagBadge = (stage: typeof computedStages[0]) => {
    const t = stage.tag || "";
    const isAmber =
      t === "supports" ||
      t === "execution" ||
      t === "infrastructure" ||
      t === "cadence" ||
      t === "authority" ||
      t === "mandate";
    const isNavyBg =
      t === "operates" ||
      t === "constraint" ||
      t === "governance" ||
      t === "access" ||
      t === "definition" ||
      t === "control" ||
      t === "foundation";

    const badgeColorClass = isAmber
      ? "bg-[#EA8A1A] text-white border-[#EA8A1A] shadow-xs"
      : isNavyBg
      ? "bg-[#0D244D] text-white border-[#0D244D] shadow-xs"
      : "bg-gradient-to-r from-[#008EC4] to-[#EA8A1A] text-white border-transparent shadow-xs";

    // Text representation based on variant / available properties
    let content: React.ReactNode = null;
    if (variant === "employee-journey" || (stage.tagLabel && !stage.tagSub)) {
      content = stage.tagLabel || stage.tag;
    } else if (variant === "workforce-model" || (!stage.tagLabel && stage.tagSub)) {
      content = stage.tagSub;
    } else if (stage.tagLabel && stage.tagSub) {
      content = (
        <>
          <span>{stage.tagLabel}</span>
          <span className="text-white/60 mx-1">·</span>
          <span>{stage.tagSub}</span>
        </>
      );
    } else {
      content = stage.tagText || stage.tagLabel || stage.tagSub || stage.tag;
    }

    return (
      <div
        className={`mt-2 text-[10px] font-mono font-semibold tracking-tight px-2.5 py-0.5 rounded-full border ${badgeColorClass}`}
      >
        {content}
      </div>
    );
  };

  const gradientId = `${id}-gradient`;

  return (
    <div
      ref={sectionRef}
      className={`w-full select-none ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      {/* ========================================================================= */}
      {/* DESKTOP: Continuous Sinusoidal Undulating Wave Lifecycle Visualization     */}
      {/* ========================================================================= */}
      <div
        className={`hidden lg:block relative ${
          rawStages.some((s) => s.items && s.items.length > 0) ? "h-[620px]" : "h-[530px]"
        } w-full select-none transition-all duration-1000 ease-out delay-200 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Continuous SVG Undulating Wave Path */}
        <svg
          viewBox="0 0 1460 440"
          fill="none"
          className="relative z-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {isNavy ? (
                <>
                  <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#67D5F7" stopOpacity="1" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#169DC8" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#169DC8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#169DC8" stopOpacity="1" />
                </>
              )}
            </linearGradient>
            {isNavy && (
              <filter id={`${id}-cyan-glow`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.5" />
              </filter>
            )}
          </defs>

          {/* Base subtle dashed guide track */}
          <path
            d={wavePathD}
            stroke={isNavy ? "rgba(255,255,255,0.18)" : "#D2DCF0"}
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Active Continuous Blue Wave Path with Smooth Draw Animation */}
          <path
            d={wavePathD}
            stroke={`url(#${gradientId})`}
            strokeWidth={isNavy ? "3.2" : "2.8"}
            strokeLinecap="round"
            filter={isNavy ? `url(#${id}-cyan-glow)` : undefined}
            style={{
              strokeDasharray: 2600,
              strokeDashoffset: isInView ? 0 : 2600,
              transition: isInView
                ? "stroke-dashoffset 2.7s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          />


          {/* Directional Path Chevrons (>) */}
          {chevrons.map((chev, i) => (
            <g
              key={i}
              transform={`translate(${chev.x}, ${chev.y}) rotate(${chev.rot})`}
            >
              {/* Clean backdrop to mask line so arrow is sharp and intact */}
              <circle
                cx="0"
                cy="0"
                r="7"
                fill={isNavy ? "#081B3E" : "#E7EDF9"}
              />
              <path
                d="M -3.5 -4.5 L 3.5 0 L -3.5 4.5"
                stroke={isNavy ? "#38BDF8" : "#169DC8"}
                strokeWidth={isNavy ? "2.2" : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className={`transition-opacity duration-500 ${
                  activeStage > i ? "opacity-100" : "opacity-35"
                }`}
              />
            </g>
          ))}
        </svg>

        {/* Stage Nodes & Content Cards overlaying the SVG */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {computedStages.map((stage, index) => {
            const IconComponent = stage.icon;
            const isActive = activeStage === index;
            const isPast = activeStage > index;

            const leftPercent = `${(stage.computedX / 1460) * 100}%`;
            const topPercent = `${(stage.computedY / 440) * 100}%`;

            return (
              <div
                key={stage.stageId}
                style={{ left: leftPercent, top: topPercent }}
                className="absolute -translate-x-1/2 -translate-y-6 z-20 pointer-events-auto"
              >
                {/* Node Container */}
                <div
                  onMouseEnter={() => setActiveStage(index)}
                  onClick={() => {
                    if (stage.href) {
                      if (stage.href.startsWith("#")) {
                        const el = document.querySelector(stage.href);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = stage.href;
                      }
                    }
                  }}
                  className={`relative flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "scale-105"
                      : isPast
                      ? "opacity-95"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Number Above Hexagon */}
                  <span
                    className={`text-xs sm:text-sm font-mono font-bold mb-1.5 transition-all duration-300 ${
                      isActive
                        ? isNavy
                          ? "text-[#38BDF8] font-extrabold scale-110 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                          : "text-[#169DC8] font-extrabold scale-110"
                        : isNavy
                        ? "text-[#38BDF8]/70"
                        : "text-[#169DC8]/80"
                    }`}
                  >
                    {stage.stageId}
                  </span>

                  {/* Hexagon Icon Node matching NeoIntelli Brand Shape */}
                  <div className="relative flex items-center justify-center w-13 h-14 z-20">
                    {/* Solid masking backdrop to block background line */}
                    <div
                      className={`absolute inset-0.5 rounded-full -z-10 ${
                        isNavy ? "bg-[#081B3E]" : "bg-[#E7EDF9]"
                      }`}
                    />

                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg
                          viewBox="0 0 54 60"
                          className={`w-14 h-16 animate-ping opacity-30 ${
                            isNavy ? "text-[#38BDF8]" : "text-[#169DC8]"
                          }`}
                        >
                          <polygon
                            points="27,3 50,16 50,44 27,57 4,44 4,16"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}

                    <svg
                      viewBox="0 0 54 60"
                      className={`w-12 h-13 transition-all duration-300 drop-shadow-md ${
                        isActive
                          ? isNavy
                            ? "scale-110 drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]"
                            : "scale-110 drop-shadow-lg"
                          : "group-hover:scale-105"
                      }`}
                    >
                      <polygon
                        points="27,3 50,16 50,44 27,57 4,44 4,16"
                        fill={
                          isActive
                            ? isNavy
                              ? "#38BDF8"
                              : "#169DC8"
                            : isNavy
                            ? "#081B3E"
                            : "#FFFFFF"
                        }
                        stroke={
                          isActive
                            ? isNavy
                              ? "#FFFFFF"
                              : "#0D306C"
                            : isNavy
                            ? "#38BDF8"
                            : "#169DC8"
                        }
                        strokeWidth={isActive ? "2.5" : "2"}
                        strokeLinejoin="round"
                        className="transition-colors duration-300"
                      />
                    </svg>

                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 z-10 ${
                        isActive
                          ? isNavy
                            ? "text-[#081B3E]"
                            : "text-white"
                          : isNavy
                          ? "text-[#38BDF8] group-hover:text-white"
                          : "text-[#169DC8] group-hover:text-[#0D306C]"
                      }`}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Stage Title & Details Below */}
                  <div
                    className={`mt-3.5 text-center ${
                      numStages <= 5 ? "w-44 sm:w-52" : "w-36 sm:w-44"
                    } flex flex-col items-center`}
                  >
                    <h3
                      className={`text-base font-bold tracking-tight mb-1 transition-colors duration-200 ${
                        isNavy
                          ? isActive
                            ? "text-[#38BDF8]"
                            : "text-[#E7EDF9] group-hover:text-[#38BDF8]"
                          : isActive
                          ? "text-[#0D306C]"
                          : "text-[#0D306C] group-hover:text-[#169DC8]"
                      }`}
                    >
                      {stage.href ? (
                        <a
                          href={stage.href}
                          className="hover:underline underline-offset-4"
                          onClick={(e) => {
                            if (stage.href?.startsWith("#")) {
                              e.preventDefault();
                              const el = document.querySelector(stage.href);
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          {stage.stageTitle}
                        </a>
                      ) : (
                        stage.stageTitle
                      )}
                    </h3>

                    {stage.stageDesc && (
                      <p
                        className={`text-[11px] sm:text-[12px] leading-relaxed font-normal ${
                          isNavy ? "text-[#C5D7F0]" : "text-[#505D74]"
                        }`}
                      >
                        {stage.stageDesc}
                      </p>
                    )}

                    {/* Detailed Framework Items (e.g. Business problem, Workflow, etc.) */}
                    {stage.items && stage.items.length > 0 && (
                      <ul className="mt-2.5 space-y-1 list-none p-0 m-0 text-center">
                        {stage.items.map((item) => (
                          <li
                            key={item}
                            className={`text-[11px] leading-tight font-normal transition-colors duration-200 ${
                              isNavy
                                ? isActive
                                ? "text-[#38BDF8]"
                                : "text-[#93A5C8]"
                              : isActive
                              ? "text-[#0D306C] font-semibold"
                              : "text-[#505D74]"
                            }`}
                          >
                            {ITEM_LINKS[item] ? (
                              <Link
                                to={ITEM_LINKS[item]}
                                className="underline underline-offset-2 hover:text-[#169DC8] transition-colors"
                              >
                                {item}
                              </Link>
                            ) : (
                              item
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tag Pills (rendered only when no items are supplied) */}
                    {!stage.items && resolvedTagStyle === "status" && getStatusTagBadge(stage)}

                    {resolvedTagStyle === "diagram" && (stage.visual || stage.tagText) && (
                      <div
                        className={`mt-2 text-[10px] font-mono font-medium tracking-tight px-2 py-0.5 rounded border transition-all duration-300 ${
                          isNavy
                            ? isActive
                              ? "bg-white/10 text-[#38BDF8] border-[#38BDF8]/30 opacity-100"
                              : "text-[#C5D7F0]/60 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-[#38BDF8]/20 group-hover:bg-white/5"
                            : isActive
                            ? "bg-[#E7EDF9] text-[#0D306C] border-[#169DC8]/40 shadow-xs opacity-100"
                            : "text-[#505D74]/70 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-[#D2DCF0] group-hover:bg-white/80"
                        }`}
                      >
                        {stage.visual || stage.tagText}
                      </div>
                    )}
                  </div>
                </div>
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
        className={`block lg:hidden relative w-full max-w-2xl mx-auto pl-6 sm:pl-8 mt-8 sm:mt-10 space-y-4 sm:space-y-5 transition-all duration-1000 ease-out delay-200 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Clean Vertical Connecting Line Track terminating at the last node point */}
        <div
          className="absolute left-6 sm:left-8 top-6 w-0 pointer-events-none"
          style={mobileTrackHeight !== null ? { height: `${mobileTrackHeight}px` } : { bottom: "4.5rem" }}
        >
          <div
            className={`absolute inset-0 w-[2px] -translate-x-1/2 ${
              isNavy ? "bg-[#38BDF8]/30" : "bg-[#169DC8]/30"
            }`}
          />
        </div>

        {computedStages.map((stage, index) => {
          const IconComponent = stage.icon;
          const isActive = activeStage === index;
          const isPassed = mobileScrollVal >= stageThresholds[index];
          const isHighlighted = isActive || isPassed;

          return (
            <React.Fragment key={stage.stageId}>
              <div
                onClick={() => setActiveStage(index)}
                className="relative flex items-start gap-4 sm:gap-6 group cursor-pointer"
              >
                {/* Node on Vertical Line - Hexagon Shape */}
                <div
                  ref={index === computedStages.length - 1 ? lastNodeRef : undefined}
                  className="relative z-10 -ml-6 sm:-ml-8 shrink-0 flex items-center justify-center w-12 h-13"
                >
                  <svg
                    viewBox="0 0 54 60"
                    className={`w-11 h-12 transition-all duration-300 drop-shadow-sm ${
                      isHighlighted ? "scale-105 drop-shadow-md" : ""
                    }`}
                  >
                    <polygon
                      points="27,3 50,16 50,44 27,57 4,44 4,16"
                      fill={
                        isHighlighted
                          ? isNavy
                            ? "#38BDF8"
                            : "#169DC8"
                          : isNavy
                          ? "#081B3E"
                          : "#FFFFFF"
                      }
                      stroke={
                        isHighlighted
                          ? isNavy
                            ? "#FFFFFF"
                            : "#0D306C"
                          : isNavy
                          ? "#38BDF8"
                          : "#169DC8"
                      }
                      strokeWidth={isHighlighted ? "2.5" : "2"}
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                      isHighlighted
                        ? isNavy
                          ? "text-[#081B3E]"
                          : "text-white"
                        : isNavy
                        ? "text-[#38BDF8]"
                        : "text-[#169DC8]"
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-4.5 h-4.5" />}
                  </div>
                </div>

                {/* Stage Details */}
                <div
                  className={`flex-1 min-w-0 rounded-2xl border p-4 sm:p-5 shadow-sm transition-colors ${
                    isNavy ? "border-white/10 bg-white/[0.04]" : "border-[#D2DCF0] bg-white/95"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isNavy ? "text-[#38BDF8]" : "text-[#169DC8]"
                      }`}
                    >
                      {stage.stageId}
                    </span>
                    <h3
                      className={`text-base sm:text-lg font-bold ${
                        isNavy ? "text-[#E7EDF9]" : "text-[#0D306C]"
                      }`}
                    >
                      {stage.href ? (
                        <a
                          href={stage.href}
                          className="hover:underline underline-offset-4"
                          onClick={(e) => {
                            if (stage.href?.startsWith("#")) {
                              e.preventDefault();
                              const el = document.querySelector(stage.href);
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          {stage.stageTitle}
                        </a>
                      ) : (
                        stage.stageTitle
                      )}
                    </h3>
                  </div>

                  {stage.stageDesc && (
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-2 font-normal ${
                        isNavy ? "text-[#C5D7F0]" : "text-[#505D74]"
                      }`}
                    >
                      {stage.stageDesc}
                    </p>
                  )}

                  {/* Detailed Framework Items */}
                  {stage.items && stage.items.length > 0 && (
                    <ul className="mt-2 mb-1 flex flex-wrap gap-1.5 list-none p-0">
                      {stage.items.map((item) => (
                        <li
                          key={item}
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium border ${
                            isNavy
                              ? "border-white/15 bg-white/5 text-[#C5D7F0]"
                              : "border-[#D2DCF0] bg-white/90 text-[#3B4B68]"
                          }`}
                        >
                          {ITEM_LINKS[item] ? (
                            <Link
                              to={ITEM_LINKS[item]}
                              className="underline underline-offset-2 hover:text-[#169DC8] transition-colors"
                            >
                              {item}
                            </Link>
                          ) : (
                            item
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Mobile Tag Pill (rendered only when no items are supplied) */}
                  {!stage.items && resolvedTagStyle === "status" && (
                    <div className="mt-1 w-fit">{getStatusTagBadge(stage)}</div>
                  )}

                  {resolvedTagStyle === "diagram" && (stage.visual || stage.tagText) && (
                    <div
                      className={`inline-block max-w-full break-words text-[10.5px] sm:text-[11px] font-mono px-2.5 py-1 rounded border ${
                        isNavy
                          ? "bg-[#081B3E] text-[#38BDF8] border-[#38BDF8]/40"
                          : "bg-white text-[#0D306C] border-[#D2DCF0]"
                      }`}
                    >
                      {stage.visual || stage.tagText}
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting Chevron Arrow */}
              {index < computedStages.length - 1 && (
                <div className="relative flex items-center -ml-6 sm:-ml-8 py-1 pointer-events-none z-10">
                  <div className="w-12 flex items-center justify-center">
                    <svg viewBox="0 0 20 20" className="w-5 h-5 overflow-visible">
                      <circle
                        cx="10"
                        cy="10"
                        r="8.5"
                        fill={isNavy ? "#081B3E" : "#E7EDF9"}
                        stroke={isNavy ? "#38BDF8" : "#169DC8"}
                        strokeWidth="1.2"
                        strokeOpacity="0.4"
                      />
                      <path
                        d="M 6.5 8.5 L 10 12 L 13.5 8.5"
                        stroke={isNavy ? "#38BDF8" : "#169DC8"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
