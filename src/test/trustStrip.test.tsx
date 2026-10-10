import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import TrustStrip from "@/components/gcc-calculator/TrustStrip";

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("TrustStrip Component", () => {
  it("renders with 3 metric cards matching Consultation responsive layout", () => {
    render(<TrustStrip />);

    expect(screen.getByText("Institutional Trust & Scale")).toBeDefined();
    expect(screen.getByText("GCCs shaped")).toBeDefined();
    expect(screen.getByText("First response")).toBeDefined();
    expect(screen.getByText("Senior-led")).toBeDefined();
  });
});
