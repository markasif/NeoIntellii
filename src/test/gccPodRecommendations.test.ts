import { describe, it, expect } from "vitest";
import {
  buildRecommendations,
  suggestedComplexityTier,
  type PodInput,
} from "@/lib/gccPodRecommendations";

const pod = (overrides: Partial<PodInput>): PodInput => ({
  teamCounts: {},
  seniorityBreakdown: {},
  specializations: {},
  complexityTier: "standard",
  includeSME: false,
  ...overrides,
});

const ids = (input: PodInput) => buildRecommendations(input).map((r) => r.id);

describe("buildRecommendations", () => {
  it("says nothing about an empty team", () => {
    expect(buildRecommendations(pod({}))).toEqual([]);
  });

  it("flags the missing bridge, infra and eval seats on an AI-heavy pod", () => {
    const input = pod({
      teamCounts: { ai: 2, backend: 2 },
      seniorityBreakdown: { ai: [2, 2], backend: [2, 2] },
      specializations: { ai: ["langgraph"] },
    });
    const got = ids(input);
    expect(got).toContain("add-po");
    expect(got).toContain("add-devops");
    expect(got).toContain("add-qa-evals");
    expect(got).toContain("ai-evals");
    expect(got).toContain("lead-ai");
  });

  it("is quiet about a well-shaped agentic pod", () => {
    const input = pod({
      teamCounts: { ai: 2, backend: 1, devops: 1, qa: 1, po: 1 },
      seniorityBreakdown: { ai: [3, 2], backend: [2], devops: [2], qa: [1], po: [2] },
      specializations: {
        ai: ["langgraph", "rag", "guardrails"],
        devops: ["k8s", "cicd"],
        qa: ["llmeval"],
        po: ["bridge"],
      },
      complexityTier: "deep",
      includeSME: true,
    });
    expect(buildRecommendations(input).filter((r) => r.kind === "gap")).toEqual([]);
  });

  it("asks for GPU infra when ML work needs it", () => {
    const noDevops = pod({
      teamCounts: { ml: 1, dataeng: 1 },
      seniorityBreakdown: { ml: [2], dataeng: [2] },
      specializations: { ml: ["finetune"] },
    });
    expect(ids(noDevops)).toContain("gpu-infra");

    const devopsWithoutGpu = pod({
      teamCounts: { ml: 1, dataeng: 1, devops: 1 },
      seniorityBreakdown: { ml: [2], dataeng: [2], devops: [2] },
      specializations: { ml: ["finetune"], devops: ["k8s"] },
    });
    expect(buildRecommendations(devopsWithoutGpu).find((r) => r.id === "gpu-infra")?.roleKey).toBe("devops");

    const covered = pod({
      teamCounts: { ml: 1, dataeng: 1, devops: 1 },
      seniorityBreakdown: { ml: [2], dataeng: [2], devops: [2] },
      specializations: { ml: ["finetune"], devops: ["gpu"] },
    });
    expect(ids(covered)).not.toContain("gpu-infra");
  });

  it("warns on an all-junior pod and a mid-level Product Owner", () => {
    const input = pod({
      teamCounts: { fullstack: 2, po: 1 },
      seniorityBreakdown: { fullstack: [0, 0], po: [0] },
    });
    const got = ids(input);
    expect(got).toContain("all-junior");
    expect(got).toContain("po-senior");
  });

  it("suggests the Deep Tech tier only when a deep-tech focus area is ticked", () => {
    const plain = pod({ teamCounts: { ai: 1 }, specializations: { ai: ["rag"] } });
    expect(suggestedComplexityTier(plain)).toBe("standard");
    expect(ids(plain)).not.toContain("complexity-deep");

    const deep = pod({ teamCounts: { ml: 1 }, specializations: { ml: ["dl"] } });
    expect(suggestedComplexityTier(deep)).toBe("deep");
    expect(ids(deep)).toContain("complexity-deep");
  });
});
