"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export interface HexagonLifecycleStage {
  id: string; // e.g. "01"
  name: string; // e.g. "Strategy"
  description: string; // e.g. "Decide what the center should own."
  href?: string;
  badge?: string;
  iconType?: "target" | "talent" | "engineering" | "delivery" | "setup" | "operations" | string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: string | number }>;
}

export interface HexagonArcLifecycleProps {
  stages?: HexagonLifecycleStage[];
  centerLogoSrc?: string;
  centerTitle?: string;
  className?: string;
  id?: string;
}

// Default 6 lifecycle stages strictly matching the reference design
export const DEFAULT_HEXAGON_STAGES: HexagonLifecycleStage[] = [
  {
    id: "01",
    name: "Strategy",
    description: "Decide what the center should own.",
    href: "/services/gcc/strategy-business-case",
    iconType: "target",
  },
  {
    id: "02",
    name: "Talent",
    description: "Find and validate specialist people.",
    href: "/services/ai-talent",
    iconType: "talent",
  },
  {
    id: "03",
    name: "Engineering",
    description: "Build production AI capability.",
    href: "/services/ai-engineering",
    iconType: "engineering",
  },
  {
    id: "04",
    name: "Delivery",
    description: "Deploy execution capacity.",
    href: "/services/ai-delivery-teams",
    iconType: "delivery",
  },
  {
    id: "05",
    name: "Setup",
    description: "Launch the GCC.",
    href: "/services/gcc/setup-launch",
    iconType: "setup",
  },
  {
    id: "06",
    name: "Operations",
    description: "Run and scale the center.",
    href: "/services/gcc-operations",
    iconType: "operations",
  },
];

// Helper to convert degrees to radians
function deg2rad(deg: number) {
  return (deg * Math.PI) / 180;
}

// Helper to convert polar coordinates (angle from bottom = 0°) to cartesian (x, y)
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = deg2rad(angleDeg);
  return {
    x: cx + r * Math.sin(rad),
    y: cy + r * Math.cos(rad),
  };
}

// Build a smooth rounded annular wedge path
function makeRoundedWedgePath(
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
  aStart: number,
  aEnd: number,
  cornerR = 10
): string {
  const rad2deg = (r: number) => (r * 180) / Math.PI;
  const dAngleIn = rad2deg(cornerR / rIn);
  const dAngleOut = rad2deg(cornerR / rOut);

  const p1_start = polar(cx, cy, rIn, aStart + dAngleIn);
  const p1_end = polar(cx, cy, rIn, aEnd - dAngleIn);

  const p2_start = polar(cx, cy, rIn + cornerR, aEnd);
  const p2_end = polar(cx, cy, rOut - cornerR, aEnd);

  const p3_start = polar(cx, cy, rOut, aEnd - dAngleOut);
  const p3_end = polar(cx, cy, rOut, aStart + dAngleOut);

  const p4_start = polar(cx, cy, rOut - cornerR, aStart);
  const p4_end = polar(cx, cy, rIn + cornerR, aStart);

  return [
    `M ${p1_start.x.toFixed(1)} ${p1_start.y.toFixed(1)}`,
    `A ${rIn} ${rIn} 0 0 1 ${p1_end.x.toFixed(1)} ${p1_end.y.toFixed(1)}`,
    `A ${cornerR} ${cornerR} 0 0 1 ${p2_start.x.toFixed(1)} ${p2_start.y.toFixed(1)}`,
    `L ${p2_end.x.toFixed(1)} ${p2_end.y.toFixed(1)}`,
    `A ${cornerR} ${cornerR} 0 0 1 ${p3_start.x.toFixed(1)} ${p3_start.y.toFixed(1)}`,
    `A ${rOut} ${rOut} 0 0 0 ${p3_end.x.toFixed(1)} ${p3_end.y.toFixed(1)}`,
    `A ${cornerR} ${cornerR} 0 0 1 ${p4_start.x.toFixed(1)} ${p4_start.y.toFixed(1)}`,
    `L ${p4_end.x.toFixed(1)} ${p4_end.y.toFixed(1)}`,
    `A ${cornerR} ${cornerR} 0 0 1 ${p1_start.x.toFixed(1)} ${p1_start.y.toFixed(1)}`,
    `Z`,
  ].join(" ");
}

// Render custom dual-tone icons strictly matching the reference graphic
function renderStageIcon(iconType?: string, cx = 0, cy = 0) {
  switch (iconType) {
    case "target": // 01 Strategy: Target + Dart
      return (
        <g transform={`translate(${cx - 24}, ${cy - 24})`}>
          <circle cx="24" cy="24" r="19" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="12.5" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
          <circle cx="24" cy="24" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M 37 11 L 25 23" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 37 11 L 32 11 M 37 11 L 37 16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );
    case "talent": // 02 Talent: Users + Magnifying Glass
      return (
        <g transform={`translate(${cx - 24}, ${cy - 24})`}>
          <circle cx="17" cy="16" r="4.8" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
          <path d="M 9 32 C 9 26 13 24 17 24 C 21 24 25 26 25 32" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
          <circle cx="29" cy="18" r="5.2" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
          <path d="M 20 35 C 20 28 25 26 30 26 C 35 26 40 28 40 35" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
          <circle cx="34" cy="30" r="6.8" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M 39 35 L 45 41" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" />
        </g>
      );
    case "engineering": // 03 Engineering: Gear / Cog
      return (
        <g transform={`translate(${cx - 24}, ${cy - 24})`}>
          <path
            d="M 21 8 L 27 8 L 28 12 C 30 13 32 14 34 16 L 38 14 L 42 18 L 40 22 C 41 24 42 26 43 28 L 47 29 L 47 35 L 43 36 C 42 38 41 40 40 42 L 42 46 L 38 50 L 34 48 C 32 50 30 51 28 52 L 27 56 L 21 56 L 20 52 C 18 51 16 50 14 48 L 10 50 L 6 46 L 8 42 C 7 40 6 38 5 36 L 1 35 L 1 29 L 5 28 C 6 26 7 24 8 22 L 6 18 L 10 14 L 14 16 C 16 14 18 13 20 12 Z"
            transform="scale(0.85) translate(4, 4)"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="24" r="6.5" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="2.8" fill="#F59E0B" />
        </g>
      );
    case "delivery": // 04 Delivery: Isometric Stack
      return (
        <g transform={`translate(${cx - 24}, ${cy - 24})`}>
          <path d="M 24 11 L 40 18 L 24 25 L 8 18 Z" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M 8 24 L 24 31 L 40 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 8 30 L 24 37 L 40 30" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "setup": // 05 Setup: Corporate Tower
      return (
        <g transform={`translate(${cx - 24}, ${cy - 24})`}>
          <rect x="12" y="11" width="24" height="29" rx="3" fill="none" stroke="#FFFFFF" strokeWidth="2.4" />
          <path d="M 19 11 L 19 8 L 29 8 L 29 11" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <rect x="16" y="16" width="4.5" height="4.5" rx="1" fill="#F59E0B" />
          <rect x="27.5" y="16" width="4.5" height="4.5" rx="1" fill="#F59E0B" />
          <rect x="16" y="24" width="4.5" height="4.5" rx="1" fill="#F59E0B" />
          <rect x="27.5" y="24" width="4.5" height="4.5" rx="1" fill="#F59E0B" />
          <path d="M 21 40 L 21 33 L 27 33 L 27 40" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        </g>
      );
    case "operations": // 06 Operations: Clockwise Cycle / Sync
      return (
        <g transform={`translate(${cx - 24}, ${cy - 24})`}>
          <path d="M 14 20 A 13 13 0 0 1 34 16" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 34 11 L 37 17 L 30 19" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" />
          <path d="M 34 28 A 13 13 0 0 1 14 32" fill="none" stroke="#F59E0B" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 14 37 L 11 31 L 18 29" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" strokeLinejoin="round" />
        </g>
      );
    default:
      return null;
  }
}

export default function HexagonArcLifecycle({
  stages = DEFAULT_HEXAGON_STAGES,
  centerLogoSrc = "/logo/neointelli_monogram-removebg-preview.png",
  centerTitle = "NEOINTELLI",
  className = "",
  id = "hexagon-arc-lifecycle",
}: HexagonArcLifecycleProps) {
  const compId = useId().replace(/:/g, "_");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG Geometry Parameters
  const originX = 540;
  const originY = 200;
  const rIn = 175;
  const rOut = 295;
  const rMid = (rIn + rOut) / 2; // ~235

  const is8Stage = stages.length === 8;

  // 6 Card Angles (angles from bottom = 0°)
  const cardConfigs6 = [
    {
      idx: 0,
      centerAngle: -75,
      startAngle: -86,
      endAngle: -64,
      isLeft: true,
      color: "cyan",
      stroke: "#00E5FF",
      glow: "url(#cyanGlow_" + compId + ")",
      leader: { x1: 254, y1: 277, elbowX: 254, elbowY: 347, x2: 191, y2: 347 },
      elbowPath: "M 254 277 L 254 347 L 191 347",
      label: { x: 135, y: 347, subX: 135, subY: 388, numY: 308 },
      badgeW: 112,
    },
    {
      idx: 1,
      centerAngle: -45,
      startAngle: -56,
      endAngle: -34,
      isLeft: true,
      color: "cyan",
      stroke: "#00E5FF",
      glow: "url(#cyanGlow_" + compId + ")",
      leader: { x1: 331, y1: 416, elbowX: 331, elbowY: 486, x2: 269, y2: 486 },
      elbowPath: "M 331 416 L 331 486 L 269 486",
      label: { x: 213, y: 486, subX: 213, subY: 527, numY: 447 },
      badgeW: 112,
    },
    {
      idx: 2,
      centerAngle: -15,
      startAngle: -26,
      endAngle: -4,
      isLeft: true,
      color: "cyan",
      stroke: "#00E5FF",
      glow: "url(#cyanGlow_" + compId + ")",
      leader: { x1: 463, y1: 486, elbowX: 463, elbowY: 556, x2: 401, y2: 556 },
      elbowPath: "M 463 486 L 463 556 L 401 556",
      label: { x: 345, y: 556, subX: 345, subY: 596, numY: 524 },
      badgeW: 112,
    },
    {
      idx: 3,
      centerAngle: 15,
      startAngle: 4,
      endAngle: 26,
      isLeft: false,
      color: "amber",
      stroke: "#F59E0B",
      glow: "url(#amberGlow_" + compId + ")",
      leader: { x1: 617, y1: 486, elbowX: 617, elbowY: 556, x2: 679, y2: 556 },
      elbowPath: "M 617 486 L 617 556 L 679 556",
      label: { x: 735, y: 556, subX: 735, subY: 596, numY: 524 },
      badgeW: 112,
    },
    {
      idx: 4,
      centerAngle: 45,
      startAngle: 34,
      endAngle: 56,
      isLeft: false,
      color: "amber",
      stroke: "#F59E0B",
      glow: "url(#amberGlow_" + compId + ")",
      leader: { x1: 749, y1: 416, elbowX: 749, elbowY: 486, x2: 811, y2: 486 },
      elbowPath: "M 749 416 L 749 486 L 811 486",
      label: { x: 867, y: 486, subX: 867, subY: 527, numY: 447 },
      badgeW: 112,
    },
    {
      idx: 5,
      centerAngle: 75,
      startAngle: 64,
      endAngle: 86,
      isLeft: false,
      color: "amber",
      stroke: "#F59E0B",
      glow: "url(#amberGlow_" + compId + ")",
      leader: { x1: 826, y1: 277, elbowX: 826, elbowY: 347, x2: 889, y2: 347 },
      elbowPath: "M 826 277 L 826 347 L 889 347",
      label: { x: 945, y: 347, subX: 945, subY: 388, numY: 308 },
      badgeW: 112,
    },
  ];

  // 8 Card Angles & Calibrated Leader Geometries
  // Evenly distributed without overlapping: 4 Left (Cyan), 4 Right (Amber)
  const cardConfigs8 = [
    {
      idx: 0,
      centerAngle: -73,
      startAngle: -80.5,
      endAngle: -65.5,
      isLeft: true,
      color: "cyan",
      stroke: "#00E5FF",
      glow: "url(#cyanGlow_" + compId + ")",
      leader: { x1: 258, y1: 286, elbowX: 258, elbowY: 336, x2: 190, y2: 336 },
      elbowPath: "M 258 286 L 258 336 L 190 336",
      label: { x: 130, y: 336, subX: 130, subY: 376, numY: 298 },
      badgeW: 120,
    },
    {
      idx: 1,
      centerAngle: -52,
      startAngle: -59.5,
      endAngle: -44.5,
      isLeft: true,
      color: "cyan",
      stroke: "#00E5FF",
      glow: "url(#cyanGlow_" + compId + ")",
      leader: { x1: 308, y1: 382, elbowX: 308, elbowY: 432, x2: 255, y2: 432 },
      elbowPath: "M 308 382 L 308 432 L 255 432",
      label: { x: 195, y: 432, subX: 195, subY: 472, numY: 394 },
      badgeW: 120,
    },
    {
      idx: 2,
      centerAngle: -31,
      startAngle: -38.5,
      endAngle: -23.5,
      isLeft: true,
      color: "cyan",
      stroke: "#00E5FF",
      glow: "url(#cyanGlow_" + compId + ")",
      leader: { x1: 388, y1: 453, elbowX: 388, elbowY: 528, x2: 335, y2: 528 },
      elbowPath: "M 388 453 L 388 528 L 335 528",
      label: { x: 275, y: 528, subX: 275, subY: 568, numY: 490 },
      badgeW: 120,
    },
    {
      idx: 3,
      centerAngle: -10,
      startAngle: -17.5,
      endAngle: -2.5,
      isLeft: true,
      color: "cyan",
      stroke: "#00E5FF",
      glow: "url(#cyanGlow_" + compId + ")",
      leader: { x1: 489, y1: 491, elbowX: 489, elbowY: 624, x2: 420, y2: 624 },
      elbowPath: "M 489 491 L 489 624 L 420 624",
      label: { x: 360, y: 624, subX: 360, subY: 664, numY: 586 },
      badgeW: 120,
    },
    {
      idx: 4,
      centerAngle: 10,
      startAngle: 2.5,
      endAngle: 17.5,
      isLeft: false,
      color: "amber",
      stroke: "#F59E0B",
      glow: "url(#amberGlow_" + compId + ")",
      leader: { x1: 591, y1: 491, elbowX: 591, elbowY: 624, x2: 660, y2: 624 },
      elbowPath: "M 591 491 L 591 624 L 660 624",
      label: { x: 720, y: 624, subX: 720, subY: 664, numY: 586 },
      badgeW: 120,
    },
    {
      idx: 5,
      centerAngle: 31,
      startAngle: 23.5,
      endAngle: 38.5,
      isLeft: false,
      color: "amber",
      stroke: "#F59E0B",
      glow: "url(#amberGlow_" + compId + ")",
      leader: { x1: 692, y1: 453, elbowX: 692, elbowY: 528, x2: 745, y2: 528 },
      elbowPath: "M 692 453 L 692 528 L 745 528",
      label: { x: 805, y: 528, subX: 805, subY: 568, numY: 490 },
      badgeW: 120,
    },
    {
      idx: 6,
      centerAngle: 52,
      startAngle: 44.5,
      endAngle: 59.5,
      isLeft: false,
      color: "amber",
      stroke: "#F59E0B",
      glow: "url(#amberGlow_" + compId + ")",
      leader: { x1: 772, y1: 382, elbowX: 772, elbowY: 432, x2: 825, y2: 432 },
      elbowPath: "M 772 382 L 772 432 L 825 432",
      label: { x: 885, y: 432, subX: 885, subY: 472, numY: 394 },
      badgeW: 120,
    },
    {
      idx: 7,
      centerAngle: 73,
      startAngle: 65.5,
      endAngle: 80.5,
      isLeft: false,
      color: "amber",
      stroke: "#F59E0B",
      glow: "url(#amberGlow_" + compId + ")",
      leader: { x1: 822, y1: 286, elbowX: 822, elbowY: 336, x2: 890, y2: 336 },
      elbowPath: "M 822 286 L 822 336 L 890 336",
      label: { x: 950, y: 336, subX: 950, subY: 376, numY: 298 },
      badgeW: 120,
    },
  ];

  const cardConfigs = is8Stage ? cardConfigs8 : cardConfigs6;

  // Central Hexagon Dimensions (horizontal flat top/bottom, pointed left/right)
  const hexW = 86; // half width
  const hexH = 68; // half height
  const hexPath = `M ${originX - 44} ${originY - hexH} L ${originX + 44} ${originY - hexH} L ${originX + hexW} ${originY} L ${originX + 44} ${originY + hexH} L ${originX - 44} ${originY + hexH} L ${originX - hexW} ${originY} Z`;
  const hexOuterPath = `M ${originX - 48} ${originY - hexH - 6} L ${originX + 48} ${originY - hexH - 6} L ${originX + hexW + 8} ${originY} L ${originX + 48} ${originY + hexH + 6} L ${originX - 48} ${originY + hexH + 6} L ${originX - hexW - 8} ${originY} Z`;

  return (
    <div id={id} className={`w-full relative select-none ${className}`}>
      {/* ========================================================================= */}
      {/* 1. DESKTOP & TABLET VIEW: FULL RADIAL FAN LAYOUT WITH STAGGERED ANIMATION */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full max-w-[1080px] mx-auto overflow-visible">
        <svg
          viewBox={is8Stage ? "0 50 1080 660" : "0 60 1080 580"}
          className="w-full h-auto overflow-visible block"
          style={{ filter: "drop-shadow(0 20px 45px rgba(0, 0, 0, 0.4))" }}
        >
          <defs>
            {/* Cyan Glow Filter */}
            <filter id={`cyanGlow_${compId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Amber Glow Filter */}
            <filter id={`amberGlow_${compId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Deep Glass Card Radial Gradient */}
            <radialGradient id={`cardGrad_${compId}`} cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#124BA2" stopOpacity="0.88" />
              <stop offset="55%" stopColor="#0A2C68" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#06183B" stopOpacity="0.98" />
            </radialGradient>

            {/* Card Gloss Sheen */}
            <linearGradient id={`cardGloss_${compId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Hexagon Border Dual-Gradient */}
            <linearGradient id={`hexBorderGrad_${compId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="45%" stopColor="#38BDF8" />
              <stop offset="55%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F19326" />
            </linearGradient>

            {/* Arc Path Dual Gradient */}
            <linearGradient id={`arcGrad_${compId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F19326" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* ── BACKGROUND AMBIENT GLOWS ──────────────────────────────────── */}
          <circle cx={originX} cy={originY + 60} r="280" fill="#00E5FF" opacity="0.05" filter="blur(60px)" />
          <circle cx={originX} cy={originY + 120} r="220" fill="#F59E0B" opacity="0.04" filter="blur(50px)" />

          {/* ── DOTTED SEMICIRCLE BEHIND THE LOGO (BELOW THE HEXAGON) ─────── */}
          <path
            d={`M ${polar(originX, originY, 118, -90).x.toFixed(1)} ${polar(originX, originY, 118, -90).y.toFixed(1)} A 118 118 0 0 0 ${polar(originX, originY, 118, 90).x.toFixed(1)} ${polar(originX, originY, 118, 90).y.toFixed(1)}`}
            fill="none"
            stroke={`url(#arcGrad_${compId})`}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeDasharray="0.5 7"
            opacity="0.6"
          />

          {/* ── CURVED WEDGE CARDS (STAGGERED ANIMATION: LEFT TO RIGHT) ────── */}
          {cardConfigs.map((cfg) => {
            const stage = stages[cfg.idx] || DEFAULT_HEXAGON_STAGES[cfg.idx] || {
              id: String(cfg.idx + 1).padStart(2, "0"),
              name: `Stage ${cfg.idx + 1}`,
              description: "",
            };
            const wedgePath = makeRoundedWedgePath(
              originX,
              originY,
              rIn,
              rOut,
              cfg.startAngle,
              cfg.endAngle,
              is8Stage ? 8 : 12
            );
            const iconPos = polar(originX, originY, rMid, cfg.centerAngle);
            const isHovered = hoveredIdx === cfg.idx;

            const entranceDelay = 0.2 + cfg.idx * (is8Stage ? 0.09 : 0.14);
            const badgeW = Math.max(cfg.badgeW || 112, stage.name.length * 7.8 + 24);
            const halfBadge = badgeW / 2;

            return (
              <motion.g
                key={cfg.idx}
                initial={{ opacity: 0, scale: 0.84, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.65,
                  delay: entranceDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredIdx(cfg.idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
                style={{ transformOrigin: `${iconPos.x}px ${iconPos.y}px` }}
              >
                <Link to={stage.href || "#"} aria-label={`${stage.id} ${stage.name}`}>
                  {/* Card Glow Halo on Hover or Resting */}
                  <path
                    d={wedgePath}
                    fill="none"
                    stroke={cfg.stroke}
                    strokeWidth={isHovered ? 4.5 : 2.5}
                    filter={cfg.glow}
                    opacity={isHovered ? 1 : 0.75}
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />

                  {/* Base Glass Wedge Fill */}
                  <path
                    d={wedgePath}
                    fill={`url(#cardGrad_${compId})`}
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />

                  {/* Subtle Glass Gloss Sheen Overlay */}
                  <path
                    d={wedgePath}
                    fill={`url(#cardGloss_${compId})`}
                    strokeLinejoin="round"
                    pointerEvents="none"
                  />

                  {/* Inner Crisp Rim Stroke */}
                  <path
                    d={wedgePath}
                    fill="none"
                    stroke={isHovered ? "#FFFFFF" : cfg.stroke}
                    strokeWidth={isHovered ? 2 : 1.4}
                    opacity={isHovered ? 0.95 : 0.6}
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />

                  {/* Stage Icon Centered inside Card */}
                  <g
                    className="transition-transform duration-300"
                    style={{
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                      transformOrigin: `${iconPos.x}px ${iconPos.y}px`,
                    }}
                  >
                    {stage.icon ? (
                      <foreignObject
                        x={iconPos.x - 20}
                        y={iconPos.y - 20}
                        width={40}
                        height={40}
                        className="overflow-visible pointer-events-none"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <stage.icon
                            className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                            strokeWidth={2.2}
                          />
                        </div>
                      </foreignObject>
                    ) : (
                      renderStageIcon(stage.iconType, iconPos.x, iconPos.y)
                    )}
                  </g>

                  {/* ── ELBOW LEADER LINE CONNECTING CARD TO BADGE ────────── */}
                  <motion.path
                    d={cfg.elbowPath}
                    fill="none"
                    stroke={isHovered ? "#38BDF8" : cfg.color === "cyan" ? "#38BDF8" : "#F59E0B"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isHovered ? 1 : 0.8}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.85 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: entranceDelay + 0.15 }}
                  />

                  {/* ── EXTERNAL BADGE & STAGE LABEL ─────────────────────── */}
                  <motion.g
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: entranceDelay + 0.2 }}
                  >
                    {/* Numeric Prefix (e.g. "01") */}
                    <text
                      x={cfg.label.x}
                      y={cfg.label.numY}
                      textAnchor="middle"
                      fill={cfg.color === "cyan" ? "#38BDF8" : "#F59E0B"}
                      fontSize="14"
                      fontWeight="800"
                      letterSpacing="0.08em"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {stage.id}
                    </text>

                    {/* Pill Badge Container */}
                    <rect
                      x={cfg.label.x - halfBadge}
                      y={cfg.label.y - 18}
                      width={badgeW}
                      height="36"
                      rx="18"
                      fill="#0B2046"
                      stroke="#DE8017"
                      strokeWidth="2"
                      className="transition-all duration-300"
                      style={{
                        filter: isHovered
                          ? "drop-shadow(0 0 10px rgba(222, 128, 23, 0.6))"
                          : "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.35))",
                      }}
                    />

                    {/* Pill Badge Text (e.g. "Strategy") */}
                    <text
                      x={cfg.label.x}
                      y={cfg.label.y + 5}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={is8Stage ? "13.5" : "14.5"}
                      fontWeight="700"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      letterSpacing="-0.01em"
                    >
                      {stage.name}
                    </text>

                    {/* Subtitle Description */}
                    <text
                      x={cfg.label.subX}
                      y={cfg.label.subY}
                      textAnchor="middle"
                      fill="#D3E2F8"
                      fontSize="13"
                      fontWeight="400"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      letterSpacing="-0.01em"
                    >
                      {stage.description}
                    </text>
                  </motion.g>
                </Link>
              </motion.g>
            );
          })}

          {/* ── CENTRAL GLOWING HEXAGON WITH NEOINTELLI LOGO ─────────────── */}
          <motion.g
            initial={{ opacity: 0, scale: 0.78 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${originX}px ${originY}px` }}
          >
            {/* Outer Glowing Neon Hexagon Stroke */}
            <path
              d={hexOuterPath}
              fill="none"
              stroke={`url(#hexBorderGrad_${compId})`}
              strokeWidth="4"
              filter={`url(#cyanGlow_${compId})`}
              opacity="0.9"
              strokeLinejoin="round"
            />

            {/* Secondary Golden Outline */}
            <path
              d={hexOuterPath}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              opacity="0.8"
              strokeLinejoin="round"
            />

            {/* Solid White Hexagon Center */}
            <path
              d={hexPath}
              fill="#FFFFFF"
              stroke="#D2DCF0"
              strokeWidth="1.5"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.45))" }}
            />

            {/* NeoIntelli Monogram Image inside Hexagon */}
            <image
              href={centerLogoSrc}
              x={originX - 22}
              y={originY - 44}
              width="44"
              height="44"
              preserveAspectRatio="xMidYMid meet"
            />

            {/* NEOINTELLI Text Wordmark */}
            <text
              x={originX}
              y={originY + 22}
              textAnchor="middle"
              fill="#0D244D"
              fontSize="13.5"
              fontWeight="900"
              letterSpacing="2.8"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {centerTitle}
            </text>
          </motion.g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW (<768px): FULLY RESPONSIVE TOUCH-FRIENDLY BLUE CARDS      */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full max-w-lg mx-auto px-2">
        {/* Mobile 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stages.map((stage, idx) => {
            const isLeftGroup = idx < Math.ceil(stages.length / 2);
            const borderColor = isLeftGroup ? "border-[#00E5FF]/60" : "border-[#F59E0B]/70";
            const glowShadow = isLeftGroup
              ? "shadow-[0_8px_25px_rgba(0,229,255,0.18)]"
              : "shadow-[0_8px_25px_rgba(245,158,11,0.2)]";

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={stage.href || "#"}
                  className={`block relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#124BA2]/90 via-[#0A2C68]/95 to-[#06183B] border ${borderColor} ${glowShadow} backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group`}
                >
                  {/* Top Bar: Number Tag + Pill Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black tracking-wider text-[#38BDF8]">
                      {stage.id}
                    </span>
                    <div className="px-3 py-1 rounded-full bg-[#0B2046] border border-[#DE8017] text-white text-xs font-bold shadow-xs">
                      {stage.name}
                    </div>
                  </div>

                  {/* Centered Glowing Stage Icon */}
                  <div className="flex items-center justify-center my-3.5">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      {stage.icon ? (
                        <stage.icon className="w-7 h-7 text-white" strokeWidth={2} />
                      ) : (
                        <svg viewBox="0 0 48 48" className="w-10 h-10">
                          {renderStageIcon(stage.iconType, 24, 24)}
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Subtitle Description */}
                  <p className="text-xs sm:text-[13px] text-[#D3E2F8] text-center font-normal leading-relaxed">
                    {stage.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
