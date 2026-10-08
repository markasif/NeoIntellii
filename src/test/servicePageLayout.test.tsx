import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServicePageLayout from "@/components/layout/ServicePageLayout";
import GccStrategyPageLayout from "@/components/gcc-strategy/GccStrategyPageLayout";
import AiDeliveryTeamsPageLayout from "@/components/ai-delivery-teams/AiDeliveryTeamsPageLayout";

vi.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "/",
    pathname: "/",
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();
}

describe("ServicePageLayout System & Wrappers", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders with canvas background, children, and global layout chrome", () => {
    const { container } = render(
      <MemoryRouter>
        <ServicePageLayout>
          <div data-testid="page-content">Sample Page Content</div>
        </ServicePageLayout>
      </MemoryRouter>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.className).toContain("bg-[#E7EDF9]");
    expect(layoutDiv.className).toContain("text-[#2B3D66]");
    expect(screen.getByTestId("page-content")).toBeDefined();
  });

  it("GccStrategyPageLayout delegates to ServicePageLayout", () => {
    const { container } = render(
      <MemoryRouter>
        <GccStrategyPageLayout>
          <div data-testid="gcc-strategy-content">Strategy Content</div>
        </GccStrategyPageLayout>
      </MemoryRouter>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.className).toContain("bg-[#E7EDF9]");
    expect(screen.getByTestId("gcc-strategy-content")).toBeDefined();
  });

  it("AiDeliveryTeamsPageLayout delegates to ServicePageLayout", () => {
    const { container } = render(
      <MemoryRouter>
        <AiDeliveryTeamsPageLayout>
          <div data-testid="delivery-teams-content">Delivery Teams Content</div>
        </AiDeliveryTeamsPageLayout>
      </MemoryRouter>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.className).toContain("bg-[#E7EDF9]");
    expect(screen.getByTestId("delivery-teams-content")).toBeDefined();
  });
});
