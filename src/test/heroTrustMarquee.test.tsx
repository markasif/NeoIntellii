import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroTrustMarquee from "@/components/shared/HeroTrustMarquee";

describe("HeroTrustMarquee Component", () => {
  it("renders custom trust items with navy blue text and without enclosing div badges", () => {
    const items = [
      "Senior-led operations",
      "Transparent operating model",
      "Managed → BOT → Captive",
    ];

    const { container } = render(<HeroTrustMarquee items={items} />);

    // Verify text is rendered in the marquee
    expect(screen.getAllByText("Senior-led operations").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Transparent operating model").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Managed → BOT → Captive").length).toBeGreaterThan(0);

    // Verify SVG Lucide icons are present with text-[#0D306C]
    const icons = container.querySelectorAll("svg.text-\\[\\#0D306C\\]");
    expect(icons.length).toBeGreaterThan(0);

    // Verify no circular badge wrapper div exists (e.g. rounded-full bg-white/95)
    const circularBadges = container.querySelectorAll(".rounded-full.bg-white\\/95");
    expect(circularBadges.length).toBe(0);
  });
});
