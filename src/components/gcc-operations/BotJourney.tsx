"use client";

import React from "react";
import {
  Rocket,
  RefreshCw,
  ShieldCheck,
  ArrowRightLeft,
  Award,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export interface JourneyStep {
  title: string;
  desc: string;
}

export const MANAGED_TO_CAPTIVE_STEPS: JourneyStep[] = [
  { title: "Launch", desc: "Entity coordination, first hires, workspace, identity and access, operating cadence." },
  { title: "Operate", desc: "NeoIntelli runs the agreed operating layer. Leadership focuses on capability and outcomes." },
  { title: "Stabilize", desc: "Services meet their levels, processes are documented, leadership is settled, reporting is trusted." },
  { title: "Transfer", desc: "Defined functions, records, vendors and control move to the client's organization by readiness criteria." },
  { title: "Own", desc: "The client operates the mature center directly. NeoIntelli supports on request." },
];

export interface BotJourneyProps {
  steps?: JourneyStep[];
  label?: string;
  theme?: "light" | "navy";
}

const DEFAULT_STAGES: LifecycleStageItem[] = [
  {
    id: "01",
    name: "Launch",
    description: "Entity coordination, first hires, workspace, identity and access, operating cadence.",
    visual: "Entity + Workplace + Access",
    icon: Rocket,
    x: 140,
    y: 110,
  },
  {
    id: "02",
    name: "Operate",
    description: "NeoIntelli runs the agreed operating layer. Leadership focuses on capability and outcomes.",
    visual: "Operate + Manage + Deliver",
    icon: RefreshCw,
    x: 420,
    y: 240,
  },
  {
    id: "03",
    name: "Stabilize",
    description: "Services meet their levels, processes are documented, leadership is settled, reporting is trusted.",
    visual: "SLA + Documentation + Trust",
    icon: ShieldCheck,
    x: 700,
    y: 110,
  },
  {
    id: "04",
    name: "Transfer",
    description: "Defined functions, records, vendors and control move to the client's organization by readiness criteria.",
    visual: "Readiness Criteria → Transfer",
    icon: ArrowRightLeft,
    x: 980,
    y: 240,
  },
  {
    id: "05",
    name: "Own",
    description: "The client operates the mature center directly. NeoIntelli supports on request.",
    visual: "100% Captive Sovereignty",
    icon: Award,
    x: 1260,
    y: 110,
  },
];

const STAGE_ICONS = [Rocket, RefreshCw, ShieldCheck, ArrowRightLeft, Award, Award];

export default function BotJourney({
  steps,
  label = "Managed to BOT to Captive journey",
  theme = "navy",
}: BotJourneyProps) {
  // If custom steps are passed, generate stage items dynamically
  const stages: LifecycleStageItem[] =
    steps && steps.length > 0
      ? steps.map((s, idx) => {
          const total = steps.length;
          const x = Math.round(110 + idx * ((1400 - 220) / (total - 1)));
          const y = idx % 2 === 0 ? 110 : 240;
          return {
            id: String(idx + 1).padStart(2, "0"),
            name: s.title,
            description: s.desc,
            visual: s.title,
            icon: STAGE_ICONS[idx % STAGE_ICONS.length],
            x,
            y,
          };
        })
      : DEFAULT_STAGES;

  return (
    <UniversalLifecycle
      stages={stages}
      theme={theme}
      ariaLabel={label}
      id="bot-journey-cycle"
      className="relative w-full pt-4 pb-2"
    />
  );
}
