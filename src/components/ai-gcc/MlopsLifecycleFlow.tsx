"use client";

import React from "react";
import {
  Code2,
  CheckCircle2,
  Rocket,
  Activity,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export interface MlopsStage {
  id: string;
  name: string;
  description: string;
  visual: string;
  icon: LucideIcon;
  x: number;
  y: number;
}

const DEFAULT_STAGES: MlopsStage[] = [
  {
    id: "01",
    name: "Code / Data / Model / Prompt / Agent",
    description: "Every artifact versioned and traceable.",
    visual: "",
    icon: Code2,
    x: 120,
    y: 100,
  },
  {
    id: "02",
    name: "Evaluate",
    description: "Automated evaluation gates in CI for models, prompts, retrieval and agents.",
    visual: "",
    icon: CheckCircle2,
    x: 360,
    y: 230,
  },
  {
    id: "03",
    name: "Deploy",
    description: "Governed release with rollout, routing and rollback.",
    visual: "",
    icon: Rocket,
    x: 600,
    y: 100,
  },
  {
    id: "04",
    name: "Observe",
    description: "Quality, drift, latency, cost, task success and escalations in production.",
    visual: "",
    icon: Activity,
    x: 840,
    y: 230,
  },
  {
    id: "05",
    name: "Govern",
    description: "Inventory, approvals, incident handling and audit evidence fed back into the lifecycle.",
    visual: "",
    icon: ShieldCheck,
    x: 1080,
    y: 100,
  },
];

export interface MlopsLifecycleFlowProps {
  stages?: MlopsStage[];
  className?: string;
}

/**
 * MlopsLifecycleFlow
 * Consolidated via UniversalLifecycle (5 stages, tagStyle="none")
 */
export default function MlopsLifecycleFlow({
  stages = DEFAULT_STAGES,
  className = "",
}: MlopsLifecycleFlowProps) {
  const lifecycleStages: LifecycleStageItem[] = stages.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    visual: s.visual || undefined,
    icon: s.icon,
  }));

  return (
    <UniversalLifecycle
      stages={lifecycleStages}
      id="mlops-lifecycle-flow"
      className={className}
      tagStyle="none"
    />
  );
}
