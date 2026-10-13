import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { activeLenis } from "./animations/SmoothScroll";

/** Sections where in-section navigation should scroll to content, not to top */
const SECTION_PREFIXES = [
  "/services/ai-delivery-teams",
  "/services/gcc-operations",
  "/services/ai-gcc",
  "/services/ai-talent",
  "/services/gcc",
  "/services/ai-engineering",
];

/** Returns the section prefix the path belongs to, or null */
function getSection(path: string): string | null {
  return SECTION_PREFIXES.find((p) => path.startsWith(p)) ?? null;
}

/**
 * Content anchor IDs to try, in priority order.
 * Each section page uses one of these just below its hero.
 */
const CONTENT_ANCHORS = [
  "ai-delivery-content",
  "gcc-operations-content",
  "ai-gcc-content",
  "ai-talent-content",
  "page-content",
];

function scrollToContent(behavior: "smooth" | "instant" = "smooth") {
  for (const id of CONTENT_ANCHORS) {
    const el = document.getElementById(id);
    if (el) {
      const navbar = document.getElementById("main-navbar-bar") || document.querySelector("header");
      const subnav = document.getElementById("ai-delivery-subnav") ||
                     document.getElementById("gcc-operations-subnav") ||
                     document.querySelector("[id$='-subnav']");
      const navH = (navbar?.offsetHeight ?? 75) + (subnav?.offsetHeight ?? 48) + 8;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navH;

      if (activeLenis) {
        activeLenis.scrollTo(Math.max(0, top), {
          immediate: behavior === "instant",
        });
      } else {
        window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
      }
      return;
    }
  }

  // Fallback — scroll to top
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: behavior === "instant" });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior });
  }
}

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef<string>(pathname);

  useEffect(() => {
    if (hash) {
      prevPathname.current = pathname;
      return;
    }

    const prev = prevPathname.current;
    const curr = pathname;
    prevPathname.current = curr;

    const prevSection = getSection(prev);
    const currSection = getSection(curr);
    const sameSectionNav =
      prevSection !== null &&
      currSection !== null &&
      prevSection === currSection &&
      prev !== curr;

    if (sameSectionNav) {
      // Give the new page a single frame to mount, then scroll to content
      const raf = requestAnimationFrame(() => {
        scrollToContent("smooth");
      });
      return () => cancelAnimationFrame(raf);
    }

    // Different section or unrelated page — instant jump to top
    if (activeLenis) {
      activeLenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
    if (typeof document !== "undefined") {
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
