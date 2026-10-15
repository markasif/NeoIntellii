"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  PhoneCall,
  Compass,
  Building2,
  Users,
  TrendingUp,
  type LucideIcon,
  ChevronRight,
} from "lucide-react";

export interface DeploymentPhaseItem {
  step: string;
  headline: string;
  timeline: string;
  desc: string;
  accent?: string;
  image: string;
  imageAlt?: string;
  icon?: LucideIcon;
  deliverables?: string[];
}

export interface DeploymentSequenceProps {
  phases?: DeploymentPhaseItem[];
  className?: string;
  id?: string;
}

const DEFAULT_PHASE_ICONS: Record<string, LucideIcon> = {
  "01": PhoneCall,
  "02": Compass,
  "03": Building2,
  "04": Users,
  "05": TrendingUp,
};

const DEFAULT_DELIVERABLES: Record<string, string[]> = {
  "01": [
    "30-min discovery scoping call",
    "Squad sizing & composition model",
    "Target city & location shortlist",
    "Initial cost & timeline brief",
  ],
  "02": [
    "Micro GCC build plan & charter",
    "Ownership model (Owned, Co-Owned, Managed)",
    "Workspace & infrastructure specification",
    "Statutory & compliance roadmap",
  ],
  "03": [
    "Entity registration / back-office ready",
    "Squad Lead recruitment & offer",
    "Dedicated workspace secured & fitted",
    "Zero-trust IAM & HQ network sync",
  ],
  "04": [
    "First squad fully onboarded",
    "Development toolchains & repos active",
    "Sprint 1 outcome delivery kickoff",
    "Daily standups with home leadership",
  ],
  "05": [
    "Steady-state delivery autonomy",
    "Monthly governance reviews & QBRs",
    "Structured headcount growth plan",
    "Next squad activation on demand",
  ],
};

export default function DeploymentSequence({
  phases = [],
  className = "",
  id = "deployment-sequence",
}: DeploymentSequenceProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!phases || phases.length === 0) return null;

  const currentPhase = phases[activeIdx];
  const Icon = currentPhase.icon || DEFAULT_PHASE_ICONS[currentPhase.step] || PhoneCall;
  const deliverables =
    currentPhase.deliverables || DEFAULT_DELIVERABLES[currentPhase.step] || [];
  const isLast = activeIdx === phases.length - 1;
  const isFirst = activeIdx === 0;

  return (
    <div id={id} className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* ── 1. TOP INTERACTIVE ROADMAP TIMELINE (PROGRESS TRACK) ───────── */}
      <div className="relative mb-8 sm:mb-12 px-2 sm:px-6">
        {/* Background connecting track line */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
        
        {/* Glowing active progress fill line */}
        <div
          className="hidden md:block absolute top-1/2 left-8 h-[2px] bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#F19326] -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${(activeIdx / (phases.length - 1)) * 92}%`,
          }}
        />

        {/* 5 Milestone Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 relative z-10">
          {phases.map((p, idx) => {
            const isActive = idx === activeIdx;
            const isCompleted = idx < activeIdx;
            const StepIcon = p.icon || DEFAULT_PHASE_ICONS[p.step] || PhoneCall;

            return (
              <button
                key={p.step}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative group flex flex-col items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 text-center cursor-pointer border ${
                  isActive
                    ? "bg-[#0B2554] border-[#38BDF8] shadow-[0_0_25px_rgba(56,189,248,0.35)] -translate-y-0.5"
                    : isCompleted
                    ? "bg-white/[0.04] border-white/20 hover:border-[#38BDF8]/50 hover:bg-white/[0.08]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
                }`}
              >
                {/* Node Pill Indicator */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono font-extrabold text-xs mb-2 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#00E5FF] to-[#0A85EA] text-[#061530] shadow-[0_0_15px_rgba(0,229,255,0.7)] scale-110"
                      : isCompleted
                      ? "bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40"
                      : "bg-white/5 text-slate-400 border border-white/15 group-hover:text-white"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#38BDF8]" />
                  ) : (
                    <span>{p.step}</span>
                  )}
                </div>

                {/* Timeline Tag */}
                <span
                  className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider mb-1 transition-colors ${
                    isActive
                      ? "text-[#F19326]"
                      : isCompleted
                      ? "text-[#38BDF8]"
                      : "text-slate-400"
                  }`}
                >
                  {p.timeline.replace(/\.$/, "")}
                </span>

                {/* Short Headline */}
                <span
                  className={`text-xs sm:text-[13px] font-bold line-clamp-1 transition-colors ${
                    isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {p.headline.replace(/\.$/, "")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. FEATURED ACTIVE SHOWCASE HERO PANEL (SPLIT VIEW) ────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase.step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-[#0D244D]/80 via-[#071F4F]/90 to-[#04122C]/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden text-left"
        >
          {/* Ambient Background Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F19326]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* ── LEFT COLUMN: EDITORIAL CONTENT & DELIVERABLES ─────── */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Meta Header Badges */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#38BDF8] text-xs font-mono font-bold tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                    Phase {currentPhase.step} of 05
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F19326]/15 border border-[#F19326]/30 text-[#F19326] text-xs font-mono font-bold tracking-wider uppercase">
                    <Clock className="w-3.5 h-3.5" />
                    {currentPhase.timeline.replace(/\.$/, "")}
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-white tracking-tight leading-[1.18] mb-4 font-manrope">
                  {currentPhase.headline}
                </h3>

                {/* Detailed Narrative */}
                <p className="text-sm sm:text-base text-[#C5D7F0] leading-relaxed mb-6 font-normal">
                  {currentPhase.desc}
                </p>

                {/* Key Deliverables & Outcomes Grid */}
                <div className="mb-8 pt-5 border-t border-white/10">
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8] mb-3 font-mono">
                    Key Deliverables &amp; Outcomes
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-[13px] text-white/90"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                        <span className="font-medium leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                    disabled={isFirst}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isFirst
                        ? "opacity-30 cursor-not-allowed text-slate-500 bg-white/5 border border-white/5"
                        : "text-white bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer active:scale-95"
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Phase</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveIdx((prev) => Math.min(phases.length - 1, prev + 1))}
                    disabled={isLast}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isLast
                        ? "opacity-30 cursor-not-allowed text-slate-500 bg-white/5 border border-white/5"
                        : "text-white bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer active:scale-95"
                    }`}
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00A3E0] to-[#008EC4] hover:from-[#38BDF8] hover:to-[#00A3E0] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Scope Your Micro GCC</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* ── RIGHT COLUMN: HIGH-RES PHOTOREALISTIC STAGE IMAGE ─── */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#0A192F] shadow-2xl group">
                <img
                  src={currentPhase.image}
                  alt={currentPhase.imageAlt || `${currentPhase.step} ${currentPhase.headline}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle dark glass gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061530]/85 via-transparent to-transparent pointer-events-none" />

                {/* Top Floating Glass Badge */}
                <div className="absolute top-3.5 left-3.5 bg-[#061530]/85 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-[#38BDF8] shadow-md flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#F19326]" />
                  <span>Phase {currentPhase.step} · {currentPhase.timeline.replace(/\.$/, "")}</span>
                </div>

                {/* Bottom Floating Title */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-[#061530]/80 backdrop-blur-md border border-white/15">
                  <p className="text-white text-xs sm:text-[13px] font-bold font-manrope line-clamp-1 mb-0.5">
                    {currentPhase.headline}
                  </p>
                  <p className="text-[11px] text-[#C5D7F0] line-clamp-1">
                    {currentPhase.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── 3. BOTTOM 5-PHASE COMPACT CARD GRID (SIMULTANEOUS OVERVIEW) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mt-6 sm:mt-8">
        {phases.map((p, idx) => {
          const isSelected = idx === activeIdx;
          const PhaseIcon = p.icon || DEFAULT_PHASE_ICONS[p.step] || PhoneCall;

          return (
            <div
              key={p.step}
              onClick={() => setActiveIdx(idx)}
              className={`group relative rounded-2xl border p-4 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? "bg-[#0B2554] border-[#38BDF8] shadow-[0_8px_25px_rgba(56,189,248,0.25)] -translate-y-1"
                  : "bg-white/[0.04] border-white/10 hover:border-white/25 hover:bg-white/[0.07]"
              }`}
            >
              {/* Top Accent line on active */}
              {isSelected && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00E5FF] to-[#F19326]" />
              )}

              {/* Header: Step & Timeline */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-extrabold ${
                      isSelected ? "text-[#00E5FF]" : "text-white/60"
                    }`}
                  >
                    {p.step}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isSelected ? "text-[#F19326]" : "text-slate-400"
                    }`}
                  >
                    {p.timeline.replace(/\.$/, "")}
                  </span>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 border border-white/10 bg-[#0A192F]">
                  <img
                    src={p.image}
                    alt={p.headline}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061530]/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <h4
                  className={`text-xs sm:text-[13px] font-bold font-manrope line-clamp-1 mb-1 transition-colors ${
                    isSelected ? "text-white" : "text-slate-200 group-hover:text-white"
                  }`}
                >
                  {p.headline}
                </h4>

                <p className="text-[11px] text-[#C5D7F0]/80 line-clamp-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              {/* Active Indicator bar */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold tracking-wider uppercase ${
                    isSelected ? "text-[#38BDF8]" : "text-slate-400 group-hover:text-white"
                  }`}
                >
                  {isSelected ? "Active Phase" : "View Phase"}
                </span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isSelected ? "text-[#38BDF8] translate-x-0.5" : "text-slate-500 group-hover:translate-x-0.5"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
