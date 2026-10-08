import { describe, it, expect } from "vitest";
import {
  buildSquadCalculatorUrl,
  countsForPod,
  totalSeats,
} from "@/components/landing/india-engineering-squad/TeamBlueprintDesigner";
import { parseCalculatorParams } from "@/lib/gccCalculatorParams";
import { teamCountsFromQuery } from "@/pages/GccCostCalculator";
import { blueprintPods, roles as roleConfigs } from "@/data/gccCostData";

/**
 * /lp/india-engineering-squad designs a squad and hands it to
 * /gcc-cost-calculator through the query string. Both sides read the roster
 * and the pods out of gccCostData, so what these tests lock is the round trip
 * itself: every pod and every role must survive the URL intact.
 */

const search = (url: string) => url.slice(url.indexOf("?"));

describe("buildSquadCalculatorUrl", () => {
  it("targets the calculator and carries the pod and the total", () => {
    const url = buildSquadCalculatorUrl("agentic", countsForPod("agentic"));
    expect(url.startsWith("/gcc-cost-calculator?pod=agentic&team=6&")).toBe(true);
  });

  it("percent-encodes labels rather than posting spaces and slashes raw", () => {
    const url = buildSquadCalculatorUrl("agentic", countsForPod("agentic"));
    expect(url).toContain("AI%20Engineers=2");
    expect(url).toContain("QA%2FSDET=1");
  });

  it("omits roles nobody picked", () => {
    expect(buildSquadCalculatorUrl("agentic", countsForPod("agentic"))).not.toContain("Mobile");
  });

  it("still names the pod when the squad is empty", () => {
    const url = buildSquadCalculatorUrl("custom", countsForPod("custom"));
    expect(url).toBe("/gcc-cost-calculator?pod=custom&team=0");
  });
});

describe("round trip into the calculator", () => {
  it("reads every pod back as itself", () => {
    for (const pod of blueprintPods) {
      const prefill = parseCalculatorParams(search(buildSquadCalculatorUrl(pod.key, countsForPod(pod.key))));
      expect(prefill.pod).toBe(pod.key);
      expect(prefill.applied).toBe(true);
    }
  });

  it("reads every pod's team shape back seat for seat", () => {
    for (const pod of blueprintPods) {
      const counts = countsForPod(pod.key);
      const prefill = parseCalculatorParams(search(buildSquadCalculatorUrl(pod.key, counts)));
      const expected = Object.fromEntries(
        Object.entries(counts).filter(([, n]) => n > 0),
      );
      expect(prefill.teamCounts ?? {}).toEqual(expected);
    }
  });

  it("carries an edited squad, not the pod's own default shape", () => {
    // The Agentic pod ships a backend seat; a visitor who drops it and adds
    // two data engineers must arrive with exactly that.
    const counts = { ...countsForPod("agentic"), backend: 0, dataeng: 2 };
    const prefill = parseCalculatorParams(search(buildSquadCalculatorUrl("agentic", counts)));

    expect(prefill.pod).toBe("agentic");
    expect(prefill.teamCounts).toEqual({ ai: 2, dataeng: 2, devops: 1, qa: 1, po: 1 });
    expect(prefill.teamCounts).not.toHaveProperty("backend");
    expect(prefill.teamSource).toBe("roles");
  });

  it("resolves every role on the landing page to a calculator role", () => {
    const keys = roleConfigs.map((role) => role.key);
    for (const role of roleConfigs) {
      const url = buildSquadCalculatorUrl("custom", { [role.key]: 1 });
      const parsed = parseCalculatorParams(search(url));
      expect(Object.keys(parsed.teamCounts ?? {})).toEqual([role.key]);
      expect(keys).toContain(role.key);
      // The calculator's own legacy reader must agree with the shared parser.
      expect(teamCountsFromQuery(search(url))).toEqual({ [role.key]: 1 });
    }
  });

  it("agrees with the total it advertises", () => {
    const counts = countsForPod("mlops");
    const url = buildSquadCalculatorUrl("mlops", counts);
    expect(url).toContain(`team=${totalSeats(counts)}`);
  });
});

describe("pod parameter", () => {
  it("accepts the key, the label and everyday shorthand", () => {
    expect(parseCalculatorParams("?pod=mlops").pod).toBe("mlops");
    expect(parseCalculatorParams("?pod=MLOps%20Platform%20Pod").pod).toBe("mlops");
    expect(parseCalculatorParams("?blueprint=agentic%20ai").pod).toBe("agentic");
    expect(parseCalculatorParams("?preset=Fast%20AI%20POC%20Sprint%20Unit").pod).toBe("poc");
    expect(parseCalculatorParams("?pod=start%20from%20scratch").pod).toBe("custom");
  });

  it("ignores a pod it does not recognise rather than guessing", () => {
    expect(parseCalculatorParams("?pod=quantum").pod).toBeNull();
    expect(parseCalculatorParams("?pod=quantum").applied).toBe(false);
  });

  it("leaves links that never mention a pod alone", () => {
    const prefill = parseCalculatorParams("?team=8&Backend%20Engineer=2");
    expect(prefill.pod).toBeNull();
    expect(prefill.applied).toBe(true);
  });
});
