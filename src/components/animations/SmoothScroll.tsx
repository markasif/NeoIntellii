import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { activeLenis, setActiveLenis, type LenisInstance } from "@/lib/lenisStore";
export { activeLenis };

let LenisClass: { new (...args: unknown[]): LenisInstance } | null = null;
let lenisImportStarted = false;

function ensureLenis(): Promise<void> {
  if (LenisClass) return Promise.resolve();
  if (lenisImportStarted) return new Promise((resolve) => {
    const check = setInterval(() => { if (LenisClass) { clearInterval(check); resolve(); } }, 50);
  });
  lenisImportStarted = true;
  return import("lenis").then((m) => { LenisClass = m.default as unknown as { new (...args: unknown[]): LenisInstance }; });
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  const rafRef = useRef(0);
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || isTouch) return;

    let cancelled = false;

    ensureLenis().then(() => {
      if (cancelled || !LenisClass) return;
      const lenis = new LenisClass({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });
      if (cancelled) { lenis.destroy(); return; }
      lenisRef.current = lenis;
      setActiveLenis(lenis);

      const loop = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      setActiveLenis(null);
    };
  }, []);

  useEffect(() => {
    if (hash) return;
    if (activeLenis) {
      activeLenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash]);

  return <>{children}</>;
}
