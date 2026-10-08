import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TypewriterContextButton from "@/components/ui/TypewriterContextButton";

describe("TypewriterContextButton", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders an internal link with Router", () => {
    render(
      <MemoryRouter>
        <TypewriterContextButton href="/services/gcc" label="Explore GCC Models →" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Explore GCC Models" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/services/gcc");
  });

  it("renders an external link without Router", () => {
    render(
      <TypewriterContextButton href="https://example.com/demo" label="External Link →" />
    );

    const link = screen.getByRole("link", { name: "External Link" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("https://example.com/demo");
  });

  it("types label text on mouse enter at 14ms intervals and resets on mouse leave after 250ms debounce", () => {
    render(
      <MemoryRouter>
        <TypewriterContextButton href="/services/ai-gcc" label="AI GCC India →" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "AI GCC India" });

    // Initial state: empty text displayed
    expect(screen.queryByText("AI GCC India")).toBeNull();

    // Hover
    fireEvent.mouseEnter(link);

    // Advance 14ms - first char
    act(() => {
      vi.advanceTimersByTime(14);
    });

    // Advance enough time to type full string ("AI GCC India" is 12 chars * 14ms = 168ms)
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByText("AI GCC India")).toBeDefined();

    // Mouse leave
    fireEvent.mouseLeave(link);

    // Before 250ms debounce, text should still be there
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByText("AI GCC India")).toBeDefined();

    // After 250ms debounce
    act(() => {
      vi.advanceTimersByTime(160);
    });
    expect(screen.queryByText("AI GCC India")).toBeNull();
  });

  it("fires optional onClick callback when clicked", () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <TypewriterContextButton href="/services/micro-gcc" label="Micro GCC →" onClick={handleClick} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Micro GCC" });
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
