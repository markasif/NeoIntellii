import"@testing-library/jest-dom";

Object.defineProperty(window,"matchMedia", {
 writable: true,
 value: (query: string) => ({
 matches: false,
 media: query,
 onchange: null,
 addListener: () => {},
 removeListener: () => {},
 addEventListener: () => {},
 removeEventListener: () => {},
 dispatchEvent: () => {},
 }),
});

/**
 * jsdom has no ResizeObserver, and recharts' ResponsiveContainer constructs one
 * on mount. Without this a chart throws at render time and takes the tree with
 * it, which looks like a product bug and is not one - every browser the site
 * supports has ResizeObserver.
 *
 * It reports nothing, which is correct: jsdom has no layout, so there is no
 * size to report. Charts render at zero and their table alternative - which is
 * the thing worth testing - renders normally.
 */
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}
