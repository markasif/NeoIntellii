import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UniversalSubnav from "@/components/navigation/UniversalSubnav";
import GccStrategySubnav from "@/components/gcc-strategy/GccStrategySubnav";
import GccOperationsSubnav from "@/components/gcc-operations/GccOperationsSubnav";
import AiGccSubnav from "@/components/ai-gcc/AiGccSubnav";
import AiEngineeringSubnav from "@/components/ai-engineering/AiEngineeringSubnav";
import AiTalentSubnav from "@/components/ai-talent/AiTalentSubnav";
import AiDeliveryTeamsSubnav from "@/components/shared/AiDeliveryTeamsSubnav";

describe("UniversalSubnav Component & Pillar Wrappers", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders with navigation element, amber ribbon, and links", () => {
    const items = [
      { key: "item-1", label: "Item 1", href: "/path-1", active: true },
      { key: "item-2", label: "Item 2", href: "/path-2", active: false },
    ];

    const { container } = render(
      <MemoryRouter>
        <UniversalSubnav
          id="test-subnav"
          ariaLabel="Test Subnav"
          items={items}
          variant="ocean"
        />
      </MemoryRouter>
    );

    const nav = container.querySelector("nav#test-subnav");
    expect(nav).toBeDefined();
    expect(nav?.getAttribute("aria-label")).toBe("Test Subnav");
    expect(nav?.className).toContain("sticky");
    expect(nav?.className).toContain("bg-[#081B3E]/95");

    // Top amber ribbon
    const ribbon = container.querySelector(".bg-gradient-to-r.from-amber-600");
    expect(ribbon).toBeDefined();

    // Links rendered
    expect(screen.getByRole("link", { name: "Item 1" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Item 2" })).toBeDefined();
  });

  it("applies ocean variant active styles", () => {
    const items = [
      { key: "item-1", label: "Item 1", href: "/path-1", active: true },
      { key: "item-2", label: "Item 2", href: "/path-2", active: false },
    ];

    render(
      <MemoryRouter>
        <UniversalSubnav
          id="ocean-subnav"
          ariaLabel="Ocean Subnav"
          items={items}
          variant="ocean"
        />
      </MemoryRouter>
    );

    const activeLink = screen.getByRole("link", { name: "Item 1" });
    const inactiveLink = screen.getByRole("link", { name: "Item 2" });

    expect(activeLink.className).toContain("bg-[#008EC4]");
    expect(activeLink.className).toContain("text-white");
    expect(inactiveLink.className).toContain("text-slate-300");
  });

  it("applies cyan variant active styles and promoted styles", () => {
    const items = [
      { key: "item-1", label: "Item 1", href: "/path-1", active: true },
      { key: "item-promoted", label: "Promoted Item", href: "/path-p", active: false, promoted: true },
    ];

    const { container } = render(
      <MemoryRouter>
        <UniversalSubnav
          id="cyan-subnav"
          ariaLabel="Cyan Subnav"
          items={items}
          variant="cyan"
        />
      </MemoryRouter>
    );

    const activeLink = screen.getByRole("link", { name: "Item 1" });
    const promotedLink = screen.getByRole("link", { name: /Promoted Item/ });

    expect(activeLink.className).toContain("bg-[#00A3E0]");
    expect(promotedLink.className).toContain("text-[#38BDF8]");

    // Promoted indicator dot
    const promotedDot = container.querySelector("span.bg-\\[\\#38BDF8\\]");
    expect(promotedDot).toBeDefined();
  });

  it("records sessionStorage when clicked", () => {
    const items = [
      { key: "item-1", label: "Item 1", href: "/path-1", active: true },
    ];

    render(
      <MemoryRouter>
        <UniversalSubnav
          id="storage-subnav"
          ariaLabel="Storage Subnav"
          items={items}
          sessionStorageKey="test_subnav_key"
        />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Item 1" });
    fireEvent.click(link);
    expect(sessionStorage.getItem("test_subnav_key")).toBe("true");
  });

  it("renders GccStrategySubnav without error", () => {
    render(
      <MemoryRouter initialEntries={["/services/gcc/location-strategy"]}>
        <GccStrategySubnav />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation", { name: /sections/i })).toBeDefined();
  });

  it("renders GccOperationsSubnav without error", () => {
    render(
      <MemoryRouter>
        <GccOperationsSubnav pathname="/services/gcc-operations/workforce-strategy" />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation", { name: /GCC Operations/i })).toBeDefined();
  });

  it("renders AiGccSubnav without error", () => {
    render(
      <MemoryRouter>
        <AiGccSubnav current="genai" />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation", { name: /AI GCC/i })).toBeDefined();
  });

  it("renders AiEngineeringSubnav without error", () => {
    render(
      <MemoryRouter>
        <AiEngineeringSubnav current="applied" />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation", { name: /AI Engineering/i })).toBeDefined();
  });

  it("renders AiTalentSubnav without error", () => {
    render(
      <MemoryRouter>
        <AiTalentSubnav current="aiml" />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation", { name: /AI Talent/i })).toBeDefined();
  });

  it("renders AiDeliveryTeamsSubnav without error", () => {
    render(
      <MemoryRouter initialEntries={["/services/ai-delivery-teams/ai-delivery-pod"]}>
        <AiDeliveryTeamsSubnav />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation", { name: /AI Delivery Teams/i })).toBeDefined();
  });
});
