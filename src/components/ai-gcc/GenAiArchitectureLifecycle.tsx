"use client";

import React from "react";
import {
  Database,
  Cpu,
  Bot,
  Workflow,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export interface GenAiArchitectureStep {
  label: string;
  detail: string;
  icon?: LucideIcon;
}

export interface GenAiArchitectureLifecycleProps {
  steps?: GenAiArchitectureStep[];
  className?: string;
}

const DEFAULT_STEPS: GenAiArchitectureStep[] = [
  {
    label: "Enterprise data",
    detail: "Documents, records, APIs and events under the client's classification.",
    icon: Database,
  },
  {
    label: "RAG and models",
    detail: "Retrieval, ranking, model routing and adaptation where it earns its cost.",
    icon: Cpu,
  },
  {
    label: "Agents",
    detail: "Tool-using agents with permissions, registry and versioning.",
    icon: Bot,
  },
  {
    label: "Workflows",
    detail: "Embedded in the business process with human decision points.",
    icon: Workflow,
  },
  {
    label: "Evaluation",
    detail: "Continuous evaluation, tracing and cost per task feeding back into every stage.",
    icon: ShieldCheck,
  },
];

/**
 * GenAiArchitectureLifecycle
 * Consolidated via UniversalLifecycle (5 stages, tagStyle="none")
 */
export default function GenAiArchitectureLifecycle({
  steps = DEFAULT_STEPS,
  className = "",
}: GenAiArchitectureLifecycleProps) {
  const stages: LifecycleStageItem[] = steps.slice(0, 5).map((step, idx) => {
    const id = String(idx + 1).padStart(2, "0");
    const defaultMeta = DEFAULT_STEPS[idx] || DEFAULT_STEPS[0];
    return {
      id,
      name: step.label,
      description: step.detail,
      icon: step.icon || defaultMeta.icon || Cpu,
    };
  });

  return (
    <UniversalLifecycle
      stages={stages}
      id="genai-arch-cycle"
      className={className}
      tagStyle="none"
    />
  );
}
