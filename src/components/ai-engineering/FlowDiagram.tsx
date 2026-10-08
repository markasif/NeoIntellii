"use client";

import React, { useMemo } from "react";
import {
  Database,
  Layers,
  Cpu,
  Bot,
  Workflow,
  Sparkles,
  CheckCircle2,
  Activity,
  FileCheck,
  Rocket,
  Shield,
  type LucideIcon,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export interface FlowStep {
  label: string;
  detail: string;
}

const DEFAULT_FLOW_ICONS: LucideIcon[] = [
  Database,
  Layers,
  Cpu,
  Bot,
  Workflow,
  Sparkles,
  CheckCircle2,
  Activity,
];

function resolveFlowIcon(label: string, idx: number): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes("data") || l.includes("source") || l.includes("test")) return Database;
  if (l.includes("context") || l.includes("retrieval") || l.includes("feature") || l.includes("pipeline") || l.includes("ux")) return Layers;
  if (l.includes("model") || l.includes("code") || l.includes("orchestration")) return Cpu;
  if (l.includes("agent") || l.includes("reasoning") || l.includes("decision")) return Bot;
  if (l.includes("tool") || l.includes("workflow") || l.includes("action") || l.includes("deploy")) return Workflow;
  if (l.includes("eval") || l.includes("monitor") || l.includes("observe") || l.includes("validation")) return CheckCircle2;
  if (l.includes("govern") || l.includes("improve") || l.includes("acceptance")) return FileCheck;
  return DEFAULT_FLOW_ICONS[idx % DEFAULT_FLOW_ICONS.length];
}

/**
 * Universal Flow Journey for Enterprise AI Engineering inner pages:
 * Replaces legacy flex arrows with the signature UniversalLifecycle continuous sinusoidal wave visualization.
 * Preserves 100% of labels and details while upgrading aesthetics to the approved design system.
 */
export default function FlowDiagram({
  steps,
  tone = "white",
}: {
  steps: FlowStep[];
  tone?: "white" | "muted" | "dark";
}) {
  const isNavy = tone === "dark";

  const stages: LifecycleStageItem[] = useMemo(() => {
    return steps.map((step, idx) => ({
      id: String(idx + 1).padStart(2, "0"),
      name: step.label,
      description: step.detail,
      tag: `Step ${String(idx + 1).padStart(2, "0")}`,
      tagLabel: `Step ${String(idx + 1).padStart(2, "0")}`,
      tagText: `Step ${String(idx + 1).padStart(2, "0")}`,
      icon: resolveFlowIcon(step.label, idx),
    }));
  }, [steps]);

  return (
    <div className="w-full">
      <UniversalLifecycle
        id="flow-journey-wave"
        stages={stages}
        theme={isNavy ? "navy" : "light"}
        variant="default"
        tagStyle="status"
        ariaLabel="Continuous flow journey"
      />
    </div>
  );
}
