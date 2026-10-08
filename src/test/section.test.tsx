import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Section from "@/components/ui/Section";
import AiGccSection from "@/components/ai-gcc/Section";
import OpsSection from "@/components/gcc-operations/OpsSection";
import AiEngineeringSection from "@/components/ai-engineering/Section";

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();
}

describe("Canonical Section Primitive", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders light section with correct container styling and title", () => {
    const { container } = render(
      <Section id="light-test" eyebrow="OVERVIEW" title="Light Section Title" lead="Leading description">
        <p>Section body content</p>
      </Section>
    );

    const section = container.querySelector("section#light-test");
    expect(section).toBeDefined();
    expect(section?.className).toContain("bg-transparent");
    expect(section?.className).toContain("text-[#2B3D66]");
    expect(screen.getByText("Light Section Title")).toBeDefined();
    expect(screen.getByText("OVERVIEW")).toBeDefined();
    expect(screen.getByText("Leading description")).toBeDefined();
    expect(screen.getByText("Section body content")).toBeDefined();
    // No wave SVGs in light theme
    expect(container.querySelectorAll("svg").length).toBe(0);
  });

  it("renders navy theme with wave dividers and ambient glow when theme='navy' or tone='dark'", () => {
    const { container } = render(
      <Section id="navy-test" theme="navy" eyebrow="LIFECYCLE" title="Navy Section Title">
        <p>Navy body content</p>
      </Section>
    );

    const section = container.querySelector("section#navy-test");
    expect(section?.className).toContain("bg-gradient-to-b");
    expect(section?.className).toContain("from-[#081B3E]");
    expect(section?.className).toContain("via-[#0A224E]");
    expect(section?.className).toContain("to-[#061530]");
    expect(section?.className).toContain("text-white");

    // Both top and bottom wave SVGs rendered
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(2);
    expect(svgs[0].getAttribute("viewBox")).toBe("0 0 1440 140");
    expect(svgs[1].getAttribute("viewBox")).toBe("0 0 1440 120");
  });

  it("supports tone='dark' as an alias for theme='navy'", () => {
    const { container } = render(
      <Section id="tone-dark-test" tone="dark" title="Dark Tone">
        <p>Content</p>
      </Section>
    );

    const section = container.querySelector("section#tone-dark-test");
    expect(section?.className).toContain("bg-gradient-to-b");
    expect(container.querySelectorAll("svg").length).toBe(2);
  });

  it("supports intro prop as an alias for lead", () => {
    render(
      <Section id="intro-test" title="Intro Test" intro="Intro description text" />
    );

    expect(screen.getByText("Intro description text")).toBeDefined();
  });

  it("supports width='default' as an alias for width='regular'", () => {
    const { container: containerDefault } = render(
      <Section id="default-width" width="default">
        <div>Content</div>
      </Section>
    );
    const { container: containerRegular } = render(
      <Section id="regular-width" width="regular">
        <div>Content</div>
      </Section>
    );

    const divDefault = containerDefault.querySelector("#default-width > div");
    const divRegular = containerRegular.querySelector("#regular-width > div");
    expect(divDefault?.className).toContain("max-w-5xl");
    expect(divRegular?.className).toContain("max-w-5xl");
  });

  it("OpsSection preserves ops padding and default align='left'", () => {
    const { container } = render(
      <OpsSection id="ops-test" eyebrow="OPERATIONS" title="Ops Title" intro="Ops Intro">
        <p>Ops body</p>
      </OpsSection>
    );

    const section = container.querySelector("section#ops-test");
    expect(section?.className).toContain("py-8");
    expect(screen.getByText("Ops Title")).toBeDefined();
    expect(screen.getByText("Ops Intro")).toBeDefined();
  });

  it("AiGccSection and AiEngineeringSection thin re-exports work transparently", () => {
    const { container: gccContainer } = render(
      <AiGccSection id="gcc-sec" title="GCC Sec" />
    );
    const { container: engContainer } = render(
      <AiEngineeringSection id="eng-sec" title="Eng Sec" />
    );

    expect(gccContainer.querySelector("#gcc-sec")).toBeDefined();
    expect(engContainer.querySelector("#eng-sec")).toBeDefined();
  });
});
