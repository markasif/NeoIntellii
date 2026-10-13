import { describe, it, expect } from "vitest";
import {
  tiers,
  models,
  squadRoles,
  compareRows,
  blocks,
  phases,
  costRows,
  costDrivers,
  cityRows,
  builds,
  whyNeo,
  whyItems,
  faqs,
  microGccFaqs,
  relatedLinks,
} from "@/data/microGcc";

describe("Micro GCC Data Extraction (Phase E)", () => {
  it("exports all 4 squad tiers with required fields and assets", () => {
    expect(tiers).toHaveLength(4);
    tiers.forEach((tier) => {
      expect(tier.name).toBeTruthy();
      expect(tier.tierTag).toMatch(/^TIER 0[1-4]$/);
      expect(tier.squadPods).toBeGreaterThanOrEqual(1);
      expect(tier.image).toMatch(/^\/images\/services\/micro-gcc\//);
      expect(tier.desc).toBeTruthy();
    });
  });

  it("exports all 3 engagement models", () => {
    expect(models).toHaveLength(3);
    expect(models[0].name).toContain("Fully Owned");
    expect(models[1].name).toContain("Co-Owned");
    expect(models[2].name).toContain("Managed Squad");
    models.forEach((m) => {
      expect(m.image).toMatch(/^\/images\/services\/micro-gcc\//);
      expect(m.desc).toBeTruthy();
    });
  });

  it("exports squad roles and model compare rows", () => {
    expect(squadRoles).toHaveLength(4);
    expect(compareRows).toHaveLength(8);
    expect(compareRows[0][0]).toBe("Team size");
  });

  it("exports all 8 foundation blocks with icons and image paths", () => {
    expect(blocks).toHaveLength(8);
    blocks.forEach((block) => {
      expect(block.t).toMatch(/^Block [1-8]\./);
      expect(block.image).toMatch(/^\/images\/services\/micro-gcc\//);
      expect(block.icon).toBeDefined();
      expect(block.items.length).toBeGreaterThanOrEqual(4);
    });
  });

  it("exports all 5 deployment phases", () => {
    expect(phases).toHaveLength(5);
    phases.forEach((phase, idx) => {
      expect(phase.step).toBe(`0${idx + 1}`);
      expect(phase.image).toMatch(/^\/images\/services\/micro-gcc\/phase-0/);
      expect(phase.icon).toBeDefined();
    });
  });

  it("exports economics, cost drivers, and city matrix", () => {
    expect(costRows).toHaveLength(4);
    expect(costDrivers).toHaveLength(6);
    expect(cityRows).toHaveLength(6);
    expect(cityRows[0][0]).toBe("Bengaluru");
  });

  it("exports all 3 proven squad architecture builds", () => {
    expect(builds).toHaveLength(3);
    builds.forEach((build) => {
      expect(build.t).toBeTruthy();
      expect(build.image).toMatch(/^\/images\/industries\//);
      expect(build.metrics.length).toBe(4);
      expect(build.cta.href).toBe("/contact");
    });
  });

  it("exports whyNeo (and whyItems alias) with all 6 reasons", () => {
    expect(whyNeo).toHaveLength(6);
    expect(whyItems).toBe(whyNeo);
    whyNeo.forEach((w) => {
      expect(w.id).toBeTruthy();
      expect(w.image).toMatch(/^\/images\/services\/micro-gcc\/why-0/);
      expect(w.icon).toBeDefined();
    });
  });

  it("exports faqs (and microGccFaqs alias) with all 11 questions", () => {
    expect(faqs).toHaveLength(11);
    expect(microGccFaqs).toBe(faqs);
    faqs.forEach((faq) => {
      expect(faq.q).toBeTruthy();
      expect(faq.a).toBeTruthy();
    });
  });

  it("exports relatedLinks with 6 cross-pillar entries", () => {
    expect(relatedLinks).toHaveLength(6);
    relatedLinks.forEach((link) => {
      expect(link.name).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.icon).toBeDefined();
    });
  });
});
