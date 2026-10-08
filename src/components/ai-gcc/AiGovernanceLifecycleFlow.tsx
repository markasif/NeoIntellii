"use client";

import React from "react";
import {
  Database,
  Tags,
  Sliders,
  CheckCircle2,
  Activity,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export interface GovernanceStage {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

const DEFAULT_STAGES: GovernanceStage[] = [
  {
    id: "01",
    name: "Inventory",
    description: "Every model, application and agent recorded with owner, purpose and data.",
    icon: Database,
  },
  {
    id: "02",
    name: "Classify",
    description: "Use-case risk tier by impact, autonomy, data sensitivity and regulatory exposure.",
    icon: Tags,
  },
  {
    id: "03",
    name: "Control",
    description: "Policies and technical controls proportionate to the tier.",
    icon: Sliders,
  },
  {
    id: "04",
    name: "Approve",
    description: "Documented sign-off with evidence, inside the delivery pipeline.",
    icon: CheckCircle2,
  },
  {
    id: "05",
    name: "Monitor",
    description: "Evaluation, drift, incidents and agent behaviour in production.",
    icon: Activity,
  },
  {
    id: "06",
    name: "Evidence",
    description: "Audit-ready records for boards, auditors and regulators.",
    icon: ShieldCheck,
  },
];

export interface AiGovernanceLifecycleFlowProps {
  stages?: GovernanceStage[];
  className?: string;
}

/**
 * AiGovernanceLifecycleFlow
 * Consolidated via UniversalLifecycle (6 stages, tagStyle="none")
 * Matches the undulating sine wave lifecycle aesthetic for AI Governance operating process.
 */
export default function AiGovernanceLifecycleFlow({
  stages = DEFAULT_STAGES,
  className = "",
}: AiGovernanceLifecycleFlowProps) {
  const lifecycleStages: LifecycleStageItem[] = stages.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    icon: s.icon,
  }));

  return (
    <UniversalLifecycle
      stages={lifecycleStages}
      id="ai-governance-lifecycle"
      className={className}
      tagStyle="none"
    />
  );
}
