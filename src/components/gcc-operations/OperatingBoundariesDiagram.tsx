"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  FileText,
  Package,
  ShieldCheck,
  Database,
  Layers,
  Coins,
  UserCheck,
  Building2,
  Users,
  Award,
  Settings,
  Monitor,
  Headphones,
  BarChart2,
  Link2,
  Clock,
  ArrowLeftRight,
} from "lucide-react";

// 9 Left items: Retained / Client leadership owns
const CLIENT_ITEMS = [
  { label: "Business strategy", icon: TrendingUp },
  { label: "GCC mandate", icon: FileText },
  { label: "Product roadmap", icon: Package },
  { label: "Intellectual property", icon: ShieldCheck },
  { label: "Data ownership", icon: Database },
  { label: "Enterprise architecture", icon: Layers },
  { label: "Budget approval", icon: Coins },
  { label: "Final hiring decisions", icon: UserCheck },
  { label: "Executive governance", icon: Building2 },
];

// 11 Right items: Operated or supported / NeoIntelli can operate
const NEOINTELLI_ITEMS = [
  { label: "Recruitment operations", icon: Users },
  { label: "Local onboarding", icon: Award },
  { label: "HR administration", icon: Settings },
  { label: "Workplace support", icon: Monitor },
  { label: "IT operations coordination", icon: Layers },
  { label: "Service management", icon: Headphones },
  { label: "Operating reporting", icon: BarChart2 },
  { label: "Local vendor coordination", icon: Link2 },
  { label: "Compliance workflows", icon: ShieldCheck },
  { label: "GCC operating cadence", icon: Clock },
  { label: "Transition programme", icon: ArrowLeftRight },
];

interface PathData {
  d: string;
}

export default function OperatingBoundariesDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gccRef = useRef<HTMLDivElement>(null);
  const leftItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [leftPaths, setLeftPaths] = useState<PathData[]>([]);
  const [rightPaths, setRightPaths] = useState<PathData[]>([]);
  const [hoveredTarget, setHoveredTarget] = useState<{
    side: "left" | "right";
    index: number;
  } | null>(null);

  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Calculate pixel-perfect SVG curved bezier lines connecting items and the central GCC hub
  const calculatePaths = () => {
    if (!containerRef.current || !gccRef.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const gRect = gccRef.current.getBoundingClientRect();

    // Center and radius of GCC circle relative to container
    const gccCenterX = gRect.left - cRect.left + gRect.width / 2;
    const gccCenterY = gRect.top - cRect.top + gRect.height / 2;
    const gccRadius = gRect.width / 2;

    // 1. Calculate left paths (from client item right edge to left perimeter of GCC hub)
    const newLeftPaths: PathData[] = [];
    leftItemRefs.current.forEach((el, i) => {
      if (!el) return;
      const elRect = el.getBoundingClientRect();
      const startX = elRect.right - cRect.left;
      const startY = elRect.top - cRect.top + elRect.height / 2;

      // Distribute attachment points along the left arc of the GCC circle
      const normalizedI =
        (i - (CLIENT_ITEMS.length - 1) / 2) / ((CLIENT_ITEMS.length - 1) / 2);
      // Angle spans between 145 deg and 215 deg (around left center 180 deg)
      const angle = Math.PI - normalizedI * 0.62;
      const endX = gccCenterX + gccRadius * Math.cos(angle);
      const endY = gccCenterY + gccRadius * Math.sin(angle);

      const dx = endX - startX;
      const cp1X = startX + dx * 0.52;
      const cp1Y = startY;
      const cp2X = endX - dx * 0.32;
      const cp2Y = endY;

      newLeftPaths.push({
        d: `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`,
      });
    });

    // 2. Calculate right paths (from right perimeter of GCC hub to NeoIntelli icon badge)
    const newRightPaths: PathData[] = [];
    rightItemRefs.current.forEach((el, j) => {
      if (!el) return;
      const elRect = el.getBoundingClientRect();
      const endX = elRect.left - cRect.left;
      const endY = elRect.top - cRect.top + elRect.height / 2;

      // Distribute attachment points along the right arc of the GCC circle
      const normalizedJ =
        (j - (NEOINTELLI_ITEMS.length - 1) / 2) /
        ((NEOINTELLI_ITEMS.length - 1) / 2);
      // Angle spans between -48 deg and +48 deg (around right center 0 deg)
      const angle = normalizedJ * 0.82;
      const startX = gccCenterX + gccRadius * Math.cos(angle);
      const startY = gccCenterY + gccRadius * Math.sin(angle);

      const dx = endX - startX;
      const cp1X = startX + dx * 0.32;
      const cp1Y = startY;
      const cp2X = endX - dx * 0.52;
      const cp2Y = endY;

      newRightPaths.push({
        d: `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`,
      });
    });

    setLeftPaths(newLeftPaths);
    setRightPaths(newRightPaths);
  };

  useEffect(() => {
    calculatePaths();
    const handleResize = () => calculatePaths();
    window.addEventListener("resize", handleResize);

    const timer1 = setTimeout(calculatePaths, 120);
    const timer2 = setTimeout(calculatePaths, 450);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto py-4 sm:py-6 select-none bg-transparent"
    >
      {/* ========================================================================= */}
      {/* SVG DESKTOP CONNECTOR ARROW OVERLAY                                       */}
      {/* ========================================================================= */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        fill="none"
      >
        <defs>
          {/* Default Left Arrowhead (Dark Slate/Navy, points toward GCC) */}
          <marker
            id="arrow-left-default"
            viewBox="0 0 10 10"
            refX="7.5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 1 2 L 7.5 5 L 1 8 Z" fill="#334155" />
          </marker>

          {/* Active Left Arrowhead (Cyan highlight) */}
          <marker
            id="arrow-left-active"
            viewBox="0 0 10 10"
            refX="7.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 1 2 L 7.5 5 L 1 8 Z" fill="#008EC4" />
          </marker>

          {/* Default Right Arrowhead (Cyan/Navy, points toward NeoIntelli item) */}
          <marker
            id="arrow-right-default"
            viewBox="0 0 10 10"
            refX="7.5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 1 2 L 7.5 5 L 1 8 Z" fill="#008EC4" />
          </marker>

          {/* Active Right Arrowhead (Bright Cyan highlight) */}
          <marker
            id="arrow-right-active"
            viewBox="0 0 10 10"
            refX="7.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 1 2 L 7.5 5 L 1 8 Z" fill="#00B4F5" />
          </marker>
        </defs>

        {/* ── Left Splines: Client items -> GCC Hub ── */}
        {leftPaths.map((path, i) => {
          const isThisHovered =
            hoveredTarget?.side === "left" && hoveredTarget?.index === i;
          const isAnyHovered = hoveredTarget !== null;

          return (
            <g key={`left-path-${i}`}>
              {/* Static / hover line with arrowhead marker at GCC hub */}
              <path
                d={path.d}
                stroke={isThisHovered ? "#008EC4" : "#475569"}
                strokeWidth={isThisHovered ? 2.2 : 1.4}
                strokeOpacity={isThisHovered ? 1 : isAnyHovered ? 0.22 : 0.65}
                markerEnd={
                  isThisHovered
                    ? "url(#arrow-left-active)"
                    : "url(#arrow-left-default)"
                }
                className="transition-all duration-200"
              />

              {/* Scroll reveal drawing effect */}
              <motion.path
                d={path.d}
                stroke="#008EC4"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        pathLength: [0, 1],
                        opacity: [0, 1, 1, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 0.9,
                  delay: 0.12 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Energy pulse traveling toward center */}
              <motion.path
                d={path.d}
                stroke="#38BDF8"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="18 160"
                initial={{ strokeDashoffset: 160, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        strokeDashoffset: [160, 0],
                        opacity: [0, 1, 1, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1.1,
                  delay: 0.15 + i * 0.04,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* ── Right Splines: GCC Hub -> NeoIntelli items ── */}
        {rightPaths.map((path, j) => {
          const isThisHovered =
            hoveredTarget?.side === "right" && hoveredTarget?.index === j;
          const isAnyHovered = hoveredTarget !== null;

          return (
            <g key={`right-path-${j}`}>
              {/* Static / hover line with arrowhead marker at icon badge */}
              <path
                d={path.d}
                stroke={isThisHovered ? "#00B4F5" : "#008EC4"}
                strokeWidth={isThisHovered ? 2.4 : 1.5}
                strokeOpacity={isThisHovered ? 1 : isAnyHovered ? 0.22 : 0.75}
                markerEnd={
                  isThisHovered
                    ? "url(#arrow-right-active)"
                    : "url(#arrow-right-default)"
                }
                className="transition-all duration-200"
              />

              {/* Scroll reveal drawing effect */}
              <motion.path
                d={path.d}
                stroke="#008EC4"
                strokeWidth={2.2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        pathLength: [0, 1],
                        opacity: [0, 1, 1, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 0.95,
                  delay: 0.28 + j * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Energy pulse traveling outward toward NeoIntelli items */}
              <motion.path
                d={path.d}
                stroke="#E0F2FE"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="20 180"
                initial={{ strokeDashoffset: 180, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        strokeDashoffset: [180, 0],
                        opacity: [0, 1, 1, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1.15,
                  delay: 0.32 + j * 0.04,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* ========================================================================= */}
      {/* 3-COLUMN EDITORIAL RELATIONSHIP LAYOUT                                     */}
      {/* ========================================================================= */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0">
        {/* ───────────────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: RETAINED / Client leadership owns                     */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full pr-0 lg:pr-2">
          <div className="lg:text-right">
            <span className="block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-[#008EC4] mb-1.5">
              RETAINED
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D244D] tracking-tight mb-2.5">
              Client leadership owns
            </h3>
            <div className="w-10 h-[3px] bg-[#DE8017] rounded-full mb-5 sm:mb-6 lg:ml-auto" />

            {/* 9 Items List */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {CLIENT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const isHovered =
                  hoveredTarget?.side === "left" && hoveredTarget?.index === i;

                return (
                  <div
                    key={item.label}
                    onMouseEnter={() =>
                      setHoveredTarget({ side: "left", index: i })
                    }
                    onMouseLeave={() => setHoveredTarget(null)}
                    className="flex items-center lg:justify-end gap-3 group cursor-default transition-all"
                  >
                    {/* Mobile: Standard left-to-right (icon first, then text) */}
                    <div className="flex items-center gap-3 lg:hidden">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isHovered
                            ? "bg-[#E0F2FE] border-[#008EC4] text-[#008EC4] scale-105"
                            : "bg-[#EDF5FD] border-[#D5E6F7] text-[#008EC4]"
                        }`}
                      >
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      <span
                        className={`text-[13px] sm:text-[14px] font-semibold transition-colors duration-200 ${
                          isHovered ? "text-[#008EC4]" : "text-[#0D244D]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Desktop: Mirrored toward center hub (text first, then icon right next to connector line) */}
                    <span
                      className={`hidden lg:inline text-[13px] sm:text-[14px] font-semibold text-right transition-colors duration-200 ${
                        isHovered ? "text-[#008EC4]" : "text-[#0D244D]"
                      }`}
                    >
                      {item.label}
                    </span>

                    <div
                      className={`hidden lg:flex w-7 h-7 sm:w-8 sm:h-8 rounded-full border items-center justify-center shrink-0 transition-all duration-200 ${
                        isHovered
                          ? "bg-[#E0F2FE] border-[#008EC4] text-[#008EC4] scale-105"
                          : "bg-[#EDF5FD] border-[#D5E6F7] text-[#008EC4]"
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>

                    {/* Anchor ref for SVG line connection */}
                    <div
                      ref={(el) => {
                        leftItemRefs.current[i] = el;
                      }}
                      className="w-1 h-1 opacity-0 shrink-0"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Note */}
          <p className="text-[11.5px] sm:text-[12px] text-[#505D74] mt-8 leading-relaxed lg:text-right">
            <span className="text-[#008EC4] font-bold">Note:</span> Exact
            responsibilities are defined in the engagement operating model and
            contract.
          </p>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* CENTER COLUMN: Central GCC Hub Node                               */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-4 flex justify-center items-center py-8 lg:py-0 relative">
          <div className="relative flex items-center justify-center">
            {/* Core Circular GCC Hub Node */}
            <div
              ref={gccRef}
              className="relative w-36 h-36 sm:w-42 sm:h-42 rounded-full bg-white flex flex-col items-center justify-center text-center shadow-[0_10px_35px_rgba(13,48,108,0.08)] border border-[#D0E3F5] transition-transform duration-300 hover:scale-105 z-20"
            >
              {/* Dominant GCC text */}
              <span className="text-3xl sm:text-[38px] font-black tracking-tight text-[#0D244D] leading-none mb-1">
                GCC
              </span>

              {/* SHARED SUCCESS label */}
              <span className="text-[9.5px] sm:text-[10px] font-extrabold tracking-[0.22em] text-[#0D244D] uppercase leading-none mt-1">
                SHARED SUCCESS
              </span>

              {/* Small cyan horizontal accent dash */}
              <div className="w-6 h-0.5 bg-[#008EC4] rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* RIGHT COLUMN: OPERATED OR SUPPORTED / NeoIntelli can operate       */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full pl-0 lg:pl-2">
          <div>
            <span className="block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-[#008EC4] mb-1.5">
              OPERATED OR SUPPORTED
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D244D] tracking-tight mb-2.5">
              NeoIntelli can operate
            </h3>
            <div className="w-10 h-[3px] bg-[#DE8017] rounded-full mb-5 sm:mb-6" />

            {/* 11 Items List */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {NEOINTELLI_ITEMS.map((item, j) => {
                const Icon = item.icon;
                const isHovered =
                  hoveredTarget?.side === "right" &&
                  hoveredTarget?.index === j;

                return (
                  <div
                    key={item.label}
                    onMouseEnter={() =>
                      setHoveredTarget({ side: "right", index: j })
                    }
                    onMouseLeave={() => setHoveredTarget(null)}
                    className="flex items-center gap-3 group cursor-default transition-all"
                  >
                    {/* Anchor ref for incoming SVG connector line */}
                    <div
                      ref={(el) => {
                        rightItemRefs.current[j] = el;
                      }}
                      className="w-1 h-1 opacity-0 shrink-0"
                    />

                    {/* Dark Navy Circular Icon Badge */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-200 ${
                        isHovered
                          ? "bg-[#008EC4] text-white scale-105 shadow-md"
                          : "bg-[#0D244D] text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>

                    {/* Text Label */}
                    <span
                      className={`text-[13px] sm:text-[14px] font-medium transition-colors duration-200 ${
                        isHovered ? "text-[#008EC4] font-semibold" : "text-[#0D244D]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
