"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SubnavItem {
  key?: string;
  label: string;
  href: string;
  active?: boolean;
  promoted?: boolean;
}

export interface UniversalSubnavProps {
  id: string;
  ariaLabel: string;
  items: SubnavItem[];
  variant?: "cyan" | "ocean";
  contentId?: string;
  sessionStorageKey?: string;
  scrollMode?: "offset" | "center";
  justify?: "start" | "center";
}

/**
 * UniversalSubnav Engine:
 * Shared implementation for all 6 pillar subnavigations:
 * - Sticky navigation offset by main navbar height (--site-navbar-height)
 * - Top vibrant amber accent ribbon with reactive sticky glow
 * - Horizontal smooth-scroll track with overflow detection and hide scrollbars
 * - Interactive left/right scroll controls when content exceeds viewport
 * - Auto-scroll active item into visible view on mount and route change
 * - Smooth scroll-to-content on re-clicking the active section link
 * - Configurable pill visual variants ("cyan" and "ocean")
 */
export default function UniversalSubnav({
  id,
  ariaLabel,
  items,
  variant = "ocean",
  contentId,
  sessionStorageKey,
  scrollMode,
  justify,
}: UniversalSubnavProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeItemRef = useRef<HTMLLIElement | null>(null);

  const isCyan = variant === "cyan";
  const resolvedScrollMode = scrollMode ?? (isCyan ? "offset" : "center");
  const resolvedJustify = justify ?? (isCyan ? "center" : "start");

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  useEffect(() => {
    const handleScrollAndResize = () => {
      const bar = document.getElementById("main-navbar-bar") || document.querySelector("header");
      const navH = bar ? bar.offsetHeight : 75;
      document.documentElement.style.setProperty("--site-navbar-height", `${navH}px`);

      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= navH + 2);
      }
      checkScroll();
    };

    handleScrollAndResize();
    window.addEventListener("scroll", handleScrollAndResize, { passive: true });
    window.addEventListener("resize", handleScrollAndResize);
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, []);

  useEffect(() => {
    checkScroll();
    if (activeItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const item = activeItemRef.current;

      if (resolvedScrollMode === "center") {
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const containerWidth = container.clientWidth;
        container.scrollTo?.({
          left: Math.max(0, itemLeft - containerWidth / 2 + itemWidth / 2),
          behavior: "smooth",
        });
      } else {
        const containerLeft = container.getBoundingClientRect().left;
        const itemLeft = item.getBoundingClientRect().left;
        const offset = itemLeft - containerLeft - 32;
        container.scrollTo?.({ left: container.scrollLeft + offset, behavior: "smooth" });
      }

      const timer = setTimeout(checkScroll, 350);
      return () => clearTimeout(timer);
    }
  }, [items, resolvedScrollMode]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = direction === "left" ? -220 : 220;
    el.scrollBy?.({ left: amount, behavior: "smooth" });
    setTimeout(checkScroll, 250);
  };

  const handleClick = (item: SubnavItem) => {
    if (typeof window !== "undefined") {
      if (sessionStorageKey) {
        sessionStorage.setItem(sessionStorageKey, "true");
      }
      if (item.active && contentId) {
        const target = document.getElementById(contentId);
        if (target) {
          const bar = document.getElementById("main-navbar-bar") || document.querySelector("header");
          const navH = bar ? bar.offsetHeight : 75;
          const subnavH = navRef.current ? navRef.current.offsetHeight : 50;
          const topOffset = navH + subnavH;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
          window.scrollTo({ top: Math.max(0, targetPos), behavior: "smooth" });
        }
      }
    }
  };

  return (
    <nav
      ref={navRef}
      id={id}
      aria-label={ariaLabel}
      style={{ top: "var(--site-navbar-height, 75px)" }}
      className={`sticky top-[69px] sm:top-[74px] lg:top-[75px] z-40 bg-[#081B3E]/95 backdrop-blur-md border-b border-white/[0.08] select-none transition-shadow duration-300 ${
        isSticky
          ? "shadow-[0_12px_32px_rgba(4,14,35,0.7)]"
          : "shadow-lg shadow-[#081B3E]/20"
      }`}
    >
      {/* Top Vibrant Amber Accent Ribbon */}
      <div className="relative w-full overflow-hidden">
        <div
          className={`w-full transition-all duration-300 bg-gradient-to-r from-amber-600 via-amber-400 via-yellow-200 via-amber-400 to-amber-600 ${
            isSticky
              ? "h-[3.5px] sm:h-[4px] shadow-[0_2px_14px_rgba(245,158,11,0.95),0_0_24px_rgba(251,191,36,0.7)]"
              : "h-[3px] shadow-[0_1px_10px_rgba(245,158,11,0.75)]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
        <div
          className={`absolute top-[3px] inset-x-0 h-3 bg-gradient-to-b from-amber-400/25 via-amber-400/10 to-transparent pointer-events-none transition-opacity duration-300 ${
            isSticky ? "opacity-100" : "opacity-35"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Left Scroll Arrow */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll subnav left"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#0D244D]/95 hover:bg-[#008EC4] text-white flex items-center justify-center shadow-lg border border-white/20 transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Right Scroll Arrow */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll subnav right"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#0D244D]/95 hover:bg-[#008EC4] text-white flex items-center justify-center shadow-lg border border-white/20 transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="overflow-x-auto py-2.5 sm:py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        >
          <ul
            className={`flex items-center gap-1.5 sm:gap-2 w-max min-w-full px-4 ${
              resolvedJustify === "center" ? "justify-center" : "justify-start xl:justify-center"
            }`}
          >
            {items.map((item, idx) => {
              const active = !!item.active;
              const promoted = !!item.promoted;

              return (
                <li
                  key={item.key || item.href || idx}
                  ref={active ? activeItemRef : undefined}
                  className={`shrink-0 ${promoted ? "ml-2 pl-2 border-l border-white/20" : ""}`}
                >
                  <Link
                    to={item.href}
                    onClick={() => handleClick(item)}
                    aria-current={active ? "page" : undefined}
                    className={
                      isCyan
                        ? `inline-flex items-center text-xs sm:text-[13px] font-semibold py-1.5 px-3.5 sm:px-4 rounded-full transition-all duration-200 tracking-wide font-manrope ${
                            active
                              ? "bg-[#00A3E0] text-white shadow-[0_2px_12px_rgba(0,163,224,0.45)] ring-1 ring-white/30"
                              : promoted
                                ? "text-[#38BDF8] hover:text-white hover:bg-white/[0.08]"
                                : "text-[#D2DCF0] hover:text-white hover:bg-white/[0.08]"
                          }`
                        : `inline-flex items-center rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081B3E] ${
                            active
                              ? "bg-[#008EC4] text-white shadow-sm shadow-[#008EC4]/30 font-semibold"
                              : "text-slate-300 hover:text-white hover:bg-white/[0.08] font-medium"
                          }`
                    }
                  >
                    {promoted && (
                      <span aria-hidden className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
