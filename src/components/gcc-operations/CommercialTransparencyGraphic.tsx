"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  FileText,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function CommercialTransparencyGraphic() {
  return (
    <div className="relative w-full max-w-[500px] select-none mx-auto">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 520 480"
        className="w-full h-auto overflow-visible filter drop-shadow-[0_16px_36px_rgba(13,48,108,0.08)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Floor perspective runner gradient for center pillar */}
          <linearGradient id="floorRunnerGrad" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#0D306C" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#008EC4" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>

          {/* Left pillar gradient */}
          <linearGradient id="leftPillarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E9EFF7" />
          </linearGradient>

          {/* Center pillar gradient (Rich deep navy blue as requested) */}
          <linearGradient id="centerNavyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E2F68" />
            <stop offset="35%" stopColor="#0A224E" />
            <stop offset="100%" stopColor="#061530" />
          </linearGradient>

          {/* Right pillar gradient */}
          <linearGradient id="rightPillarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#EBF1F8" />
          </linearGradient>

          {/* Subtle 3D top roof bevel gradients */}
          <linearGradient id="leftRoofGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <linearGradient id="centerRoofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B4D9E" />
            <stop offset="100%" stopColor="#0A224E" />
          </linearGradient>

          <linearGradient id="rightRoofGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Drop shadows for floating hexagon badges */}
          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0D306C" floodOpacity="0.15" />
          </filter>

          <filter id="navyBadgeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#008EC4" floodOpacity="0.35" />
          </filter>

          {/* Pillar base shadow */}
          <filter id="pillarShadow" x="-10%" y="-5%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0D306C" floodOpacity="0.09" />
          </filter>

          {/* Soft glow that follows the pillar silhouette (replaces the old rectangle glow) */}
          <filter id="softPillarGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* ── GROUND FLOOR PERSPECTIVE GRID ── */}
        <g opacity="0.35">
          <line x1="30" y1="410" x2="490" y2="410" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="20" y1="445" x2="500" y2="445" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="10" y1="475" x2="510" y2="475" stroke="#CBD5E1" strokeWidth="1" />
          {/* Subtle perspective diagonals */}
          <line x1="75" y1="410" x2="20" y2="475" stroke="#CBD5E1" strokeWidth="1" opacity="0.5" />
          <line x1="445" y1="410" x2="500" y2="475" stroke="#CBD5E1" strokeWidth="1" opacity="0.5" />
        </g>

        {/* ── CENTER PILLAR BLUE FLOOR RUNNER (PERSPECTIVE TRACK) ── */}
        <motion.polygon
          points="200,405 320,405 240,475 110,475"
          fill="url(#floorRunnerGrad)"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "260px 405px" }}
        />

        {/* ── TOP-LEFT FLOATING HEADER BADGE ("TRANSPARENT MODEL") ── */}
        <motion.g
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Hexagon badge */}
          <polygon
            points="55,30 75,41 75,65 55,76 35,65 35,41"
            fill="#008EC4"
            filter="url(#navyBadgeGlow)"
          />
          {/* Inner white shield icon representation */}
          <path
            d="M 55 42 L 65 46 C 65 55 55 62 55 62 C 55 62 45 55 45 46 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="88" y="47" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="800" fill="#0D306C" letterSpacing="0.02em">
            100% UNBUNDLED
          </text>
          <text x="88" y="65" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#505D74" letterSpacing="0.06em">
            Operating Economics
          </text>
        </motion.g>

        {/* ========================================================================= */}
        {/* 1. LEFT PILLAR: CLEAR COST (White / Light Column)                        */}
        {/* ========================================================================= */}
        <motion.g
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="cursor-default"
        >
          {/* Base pillar shape with pointed chevron top */}
          <path
            d="M 75 395 L 75 220 L 130 195 L 185 220 L 185 395 Z"
            fill="url(#leftPillarGrad)"
            stroke="#CBD5E1"
            strokeWidth="1.2"
            filter="url(#pillarShadow)"
          />

          {/* Roof chevron facet highlight */}
          <path
            d="M 75 220 L 130 195 L 185 220 L 130 206 Z"
            fill="url(#leftRoofGrad)"
            opacity="0.9"
          />

          {/* Cyan top accent line */}
          <path
            d="M 75 220 L 130 195 L 185 220"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />

          {/* Badge: White Hexagon */}
          <polygon
            points="130,140 152,152 152,176 130,188 108,176 108,152"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            filter="url(#badgeShadow)"
          />
          {/* Rupee icon inside badge */}
          <g transform="translate(119, 153)">
            <IndianRupee size={22} className="text-[#008EC4]" strokeWidth={2.2} />
          </g>

          {/* Content inside Left Pillar */}
          <text x="130" y="258" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="17" fontWeight="800" fill="#0D306C" letterSpacing="-0.01em">
            Clear Cost
          </text>
          <text x="130" y="278" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="700" fill="#008EC4" letterSpacing="0.08em">
            UNBUNDLED
          </text>

          {/* Divider bar */}
          <rect x="105" y="292" width="50" height="1.5" rx="0.75" fill="#D5E1F2" />

          {/* Bullet points on pillar */}
          <text x="130" y="318" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#2B3D66">
            People Cost
          </text>
          <text x="130" y="336" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#2B3D66">
            Operating Layer
          </text>
          <text x="130" y="354" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#2B3D66">
            Infrastructure
          </text>
          <text x="130" y="376" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="500" fill="#64748B">
            Zero hidden margin
          </text>
        </motion.g>

        {/* ========================================================================= */}
        {/* 2. CENTER PILLAR: ALIGNED REPORTING (Navy Blue Column - Hero Focus)       */}
        {/* ========================================================================= */}
        <motion.g
          initial={{ opacity: 0, y: 110 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="cursor-default"
        >
          {/* Ambient cyan glow behind the centre pillar - same silhouette as the pillar, never a rectangle */}
          <path
            d="M 200 405 L 200 160 L 260 135 L 320 160 L 320 405 Z"
            fill="#008EC4"
            opacity="0.3"
            filter="url(#softPillarGlow)"
          />

          {/* Center pillar navy shape with pointed chevron top */}
          <path
            d="M 200 405 L 200 160 L 260 135 L 320 160 L 320 405 Z"
            fill="url(#centerNavyGrad)"
            stroke="#38BDF8"
            strokeWidth="1.5"
            filter="url(#navyBadgeGlow)"
          />

          {/* Roof chevron facet highlight */}
          <path
            d="M 200 160 L 260 135 L 320 160 L 260 148 Z"
            fill="url(#centerRoofGrad)"
            opacity="0.95"
          />

          {/* Cyan top chevron glowing edge */}
          <path
            d="M 200 160 L 260 135 L 320 160"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Badge: Deep Navy / Cyan Hexagon on Center Pillar */}
          <polygon
            points="260,78 284,91 284,117 260,130 236,117 236,91"
            fill="#061530"
            stroke="#38BDF8"
            strokeWidth="2"
            filter="url(#navyBadgeGlow)"
          />
          {/* FileText icon inside badge */}
          <g transform="translate(249, 93)">
            <FileText size={22} className="text-[#38BDF8]" strokeWidth={2.2} />
          </g>

          {/* Content inside Center Navy Pillar */}
          <text x="260" y="200" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="800" fill="#FFFFFF" letterSpacing="-0.01em">
            Aligned
          </text>
          <text x="260" y="222" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="800" fill="#FFFFFF" letterSpacing="-0.01em">
            Reporting
          </text>
          <text x="260" y="246" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#38BDF8" letterSpacing="0.09em">
            HQ & GCC PARITY
          </text>

          {/* Cyan separator bar */}
          <rect x="230" y="260" width="60" height="2" rx="1" fill="#38BDF8" opacity="0.8" />

          {/* Content points on Center Pillar */}
          <text x="260" y="288" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11.5" fontWeight="600" fill="#E2E8F0">
            Identical Cost Split
          </text>
          <text x="260" y="308" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11.5" fontWeight="600" fill="#E2E8F0">
            Real-Time Audit Trail
          </text>
          <text x="260" y="328" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11.5" fontWeight="600" fill="#E2E8F0">
            No Blended Overheads
          </text>
          <text x="260" y="356" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="500" fill="#93C5FD">
            Clear board-level reporting
          </text>

          {/* Subtle cyan glow line at bottom runner base */}
          <line x1="200" y1="405" x2="320" y2="405" stroke="#38BDF8" strokeWidth="2.5" opacity="0.9" />
        </motion.g>

        {/* ========================================================================= */}
        {/* 3. RIGHT PILLAR: BETTER DECISIONS (Tallest White / Light Column)          */}
        {/* ========================================================================= */}
        <motion.g
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="cursor-default"
        >
          {/* Base pillar shape with pointed chevron top */}
          <path
            d="M 335 395 L 335 105 L 390 80 L 445 105 L 445 395 Z"
            fill="url(#rightPillarGrad)"
            stroke="#CBD5E1"
            strokeWidth="1.2"
            filter="url(#pillarShadow)"
          />

          {/* Roof chevron facet highlight */}
          <path
            d="M 335 105 L 390 80 L 445 105 L 390 92 Z"
            fill="url(#rightRoofGrad)"
            opacity="0.9"
          />

          {/* Cyan top accent line */}
          <path
            d="M 335 105 L 390 80 L 445 105"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />

          {/* Badge: White Hexagon on Right Pillar */}
          <polygon
            points="390,26 412,38 412,62 390,74 368,62 368,38"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            filter="url(#badgeShadow)"
          />
          {/* BarChart3 icon inside badge */}
          <g transform="translate(379, 39)">
            <BarChart3 size={22} className="text-[#008EC4]" strokeWidth={2.2} />
          </g>

          {/* Content inside Right Pillar */}
          <text x="390" y="145" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="17" fontWeight="800" fill="#0D306C" letterSpacing="-0.01em">
            Better
          </text>
          <text x="390" y="167" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="17" fontWeight="800" fill="#0D306C" letterSpacing="-0.01em">
            Decisions
          </text>
          <text x="390" y="190" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="700" fill="#008EC4" letterSpacing="0.08em">
            OUTCOME DRIVEN
          </text>

          {/* Divider bar */}
          <rect x="365" y="205" width="50" height="1.5" rx="0.75" fill="#D5E1F2" />

          {/* Bullet points on pillar */}
          <text x="390" y="235" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#2B3D66">
            Predictable Scaling
          </text>
          <text x="390" y="255" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#2B3D66">
            SLA & KPI Visibility
          </text>
          <text x="390" y="275" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#2B3D66">
            Mandate Governance
          </text>
          <text x="390" y="300" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="500" fill="#64748B">
            Value, not vendor fees
          </text>

          {/* Feature labels moved here from the section's left column, centred on the pillar */}
          <rect x="365" y="312" width="50" height="1.5" rx="0.75" fill="#D5E1F2" />
          <text x="390" y="326" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#0D306C">
            Clear cost
          </text>
          <text x="390" y="337" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#0D306C">
            breakdown
          </text>
          <text x="390" y="352" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#0D306C">
            Aligned
          </text>
          <text x="390" y="363" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#0D306C">
            reporting
          </text>
          <text x="390" y="378" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#0D306C">
            Better decisions
          </text>
          <text x="390" y="389" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#0D306C">
            as you scale
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
