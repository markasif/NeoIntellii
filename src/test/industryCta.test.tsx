import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IndustryCTA from "@/components/shared/IndustryCTA";

describe("IndustryCTA Component", () => {
  it("renders with title, description, and primary/secondary CTAs", () => {
    render(
      <MemoryRouter>
        <IndustryCTA
          eyebrow="• TAKE THE NEXT STEP"
          title="Ready to Build Your GCC?"
          description="Speak with our team about building your GCC."
          primaryCta={{
            label: "Book a consultation",
            mobileLabel: "Consultation",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Explore all industries",
            mobileLabel: "All industries",
            href: "/industries",
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("• TAKE THE NEXT STEP")).toBeDefined();
    expect(screen.getByText("Ready to Build Your GCC?")).toBeDefined();
    expect(screen.getByText("Speak with our team about building your GCC.")).toBeDefined();

    // Verify mobile and desktop labels are both rendered
    expect(screen.getByText("Book a consultation")).toBeDefined();
    expect(screen.getByText("Consultation")).toBeDefined();
    expect(screen.getByText("Explore all industries")).toBeDefined();
    expect(screen.getByText("All industries")).toBeDefined();
  });
});
