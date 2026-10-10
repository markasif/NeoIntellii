"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Layers,
  Zap,
  Cpu,
  Building2,
  Users,
  Brain,
  Sparkles,
  Rocket,
  Settings2,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";
import { SERVICE_PILLARS, SOLUTION_GROUPS } from "@/data/serviceNav";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const pillarIconMap: Record<string, LucideIcon> = {
  "AI GCC": Building2,
  "AI Talent": Brain,
  "AI Engineering": Sparkles,
  "AI Delivery Teams": Users,
  "GCC Strategy & Setup": Rocket,
  "GCC Operations": Settings2,
};

/** Planning tools surfaced first inside "What We Do" (they sit above the pillars). */
const gccTools = [
  { label: "GCC Cost Calculator", href: "/gcc-cost-calculator" },
  { label: "GCC ROI Estimator", href: "/gcc-roi-estimator" },
  { label: "GCC Readiness Assessment", href: "/gcc-readiness-assessment" },
];

const industryLinks = [
  { label: "BFSI", href: "/industries/bfsi-gcc", desc: "Banks, capital markets, and insurance" },
  { label: "Healthcare", href: "/industries/healthcare-gcc", desc: "Payers, providers, and life sciences" },
  { label: "Private Equity", href: "/industries/private-equity-gcc", desc: "Value creation for portfolio GCCs" },
  { label: "Technology", href: "/industries/technology-gcc", desc: "Software, SaaS, and platform GCCs" },
  { label: "Manufacturing", href: "/industries/manufacturing-gcc", desc: "Industrial & supply chain operations" },
  { label: "Retail & E-commerce", href: "/industries/retail-gcc", desc: "Omni-channel & consumer retail" },
];

const companyLinks = [
  { label: "About Us", href: "/about", desc: "Who we are and how we work" },
  { label: "Our Approach", href: "/case-studies", desc: "How we design, launch, and scale GCCs" },
  { label: "Careers", href: "/careers", desc: "Build with senior-led teams" },
  { label: "Blog & Insights", href: "/blog", desc: "Perspectives on GCCs and enterprise AI" },
  { label: "Contact Us", href: "/contact", desc: "Talk to a senior advisor" },
];

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const router = useRouter();
  const currentPath = router?.asPath?.split("?")[0] || "";

  // Main menu accordion state: What We Do is open by default as requested
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "what-we-do": true,
    solutions: false,
    product: false,
    industries: false,
    company: false,
  });

  // Pillars inner accordion state: all pillars closed by default
  const [openPillars, setOpenPillars] = useState<Record<string, boolean>>({});

  // Reset inner pillar accordion state when sidebar closes so it never reopens expanded
  useEffect(() => {
    if (!isOpen) {
      setOpenPillars({});
    }
  }, [isOpen]);

  // Lock body & document scroll completely when sidebar is open so background cannot scroll on mobile or desktop
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const initialPath = window.location.pathname + window.location.search;
      let routeChanged = false;

      const handleRouteChange = () => {
        routeChanged = true;
      };

      if (router?.events) {
        router.events.on("routeChangeStart", handleRouteChange);
      }

      const originalHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalBodyTop = document.body.style.top;
      const originalBodyWidth = document.body.style.width;
      const originalPaddingRight = document.body.style.paddingRight;
      const originalOverscroll = document.body.style.overscrollBehavior;
      const originalHtmlOverscroll = document.documentElement.style.overscrollBehavior;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overscrollBehavior = "none";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        if (router?.events) {
          router.events.off("routeChangeStart", handleRouteChange);
        }

        document.documentElement.style.scrollBehavior = "auto";
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.documentElement.style.overscrollBehavior = originalHtmlOverscroll;
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.top = originalBodyTop;
        document.body.style.width = originalBodyWidth;
        document.body.style.paddingRight = originalPaddingRight;
        document.body.style.overscrollBehavior = originalOverscroll;

        const currentWindowPath = window.location.pathname + window.location.search;
        if (routeChanged || currentWindowPath !== initialPath) {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        } else {
          window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
        }
        document.documentElement.style.scrollBehavior = originalHtmlScrollBehavior;
      };
    }
  }, [isOpen, router]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const togglePillar = (pillarName: string) => {
    setOpenPillars((prev) => ({
      ...prev,
      [pillarName]: !prev[pillarName],
    }));
  };

  const isLinkActive = (href: string) => {
    if (href === "/" && currentPath === "/") return true;
    if (href !== "/" && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          {/* Backdrop overlay */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 bg-[#0A224E]/45 backdrop-blur-xs touch-none"
            onClick={onClose}
            onTouchMove={(e) => {
              e.preventDefault();
            }}
            aria-hidden="true"
          />

          {/* Right-sliding Sidebar */}
          <motion.aside
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 w-[88vw] sm:w-[380px] max-w-[420px] flex flex-col shadow-[-16px_0_40px_rgba(13,48,108,0.22)] border-l border-white/70 overflow-hidden font-[family-name:var(--font-manrope)] select-none"
            style={{
              background:
                "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
            }}
            aria-label="Mobile Navigation"
          >
            {/* ── TOP HEADER ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/60 bg-white/40 backdrop-blur-md shrink-0">
              <Image
                src="/logo/neointelli_logo.webp"
                alt="NeoIntelli"
                width={150}
                height={34}
                priority
                className="h-6 sm:h-7 w-auto object-contain"
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/75 hover:bg-white text-[#0D306C] hover:text-[#169DC8] shadow-2xs border border-white/80 transition-all active:scale-90"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ── SCROLLABLE NAVIGATION CONTENT ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-2.5">

              {/* ────────────────────────────────────────────────────────── */}
              {/* 1. WHAT WE DO (Accordion with nested tree navigation)      */}
              {/* ────────────────────────────────────────────────────────── */}
              <div className="rounded-2xl transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleSection("what-we-do")}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left ${
                    openSections["what-we-do"]
                      ? "bg-white/85 shadow-2xs border border-white/80 text-[#0D306C]"
                      : "hover:bg-white/50 text-[#0D306C]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className={`h-4.5 w-4.5 shrink-0 ${openSections["what-we-do"] ? "text-[#169DC8]" : "text-[#0D306C]"}`} />
                    <span className="text-[14px] font-bold tracking-tight">What We Do</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-4 w-4 text-[#7B8B9E] transition-transform duration-200 ${
                        openSections["what-we-do"] ? "rotate-180 text-[#169DC8]" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Sub-tree inside What We Do */}
                <AnimatePresence>
                  {openSections["what-we-do"] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* Vertical Tree Trunk */}
                      <div className="relative pl-3.5 ml-5 border-l-2 border-[#169DC8]/30 space-y-2 mt-2 pb-1">
                        {/* Planning tools first: the three GCC decision tools, styled like the footer CTA */}
                        <div className="relative space-y-1.5 pt-0.5">
                          <span className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#169DC8] mb-1.5 px-0.5">
                            Planning tools
                          </span>
                          {gccTools.map((tool) => (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              onClick={onClose}
                              className="group/btn relative inline-flex items-center justify-center gap-2.5 w-full rounded-xl bg-gradient-to-r from-[#169DC8] via-[#1288B0] to-[#0D6EA8] text-white text-[13px] font-semibold py-2.5 px-4 transition-all duration-200 shadow-[0_4px_16px_rgba(22,157,200,0.35)] hover:shadow-[0_6px_22px_rgba(22,157,200,0.5)] hover:-translate-y-0.5 active:translate-y-0"
                            >
                              <span>{tool.label}</span>
                              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" />
                            </Link>
                          ))}
                        </div>
                        {SERVICE_PILLARS.map((pillar) => {
                          const PillarIcon = pillarIconMap[pillar.name] || Layers;
                          const isPillarOpen = !!openPillars[pillar.name];
                          const hasActiveChild =
                            isLinkActive(pillar.href) ||
                            pillar.links.some((l) => isLinkActive(l.href));

                          return (
                            <div key={pillar.name} className="relative">
                              {/* Horizontal Tree Branch Connector */}
                              <span className="absolute -left-[18px] top-4 w-2.5 h-[1.5px] bg-[#169DC8]/35 rounded-full pointer-events-none" />

                              {/* Pillar Header / Toggle */}
                              <button
                                type="button"
                                onClick={() => togglePillar(pillar.name)}
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all ${
                                  isPillarOpen
                                    ? "bg-white/75 text-[#0D306C] font-bold shadow-2xs"
                                    : hasActiveChild
                                    ? "bg-white/50 text-[#0D306C] font-semibold"
                                    : "hover:bg-white/50 text-[#2B3D66] font-semibold"
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <PillarIcon className="h-3.5 w-3.5 text-[#169DC8] shrink-0" />
                                  <span className="text-[13px] truncate">{pillar.name}</span>
                                </div>

                                <ChevronDown
                                  className={`h-3.5 w-3.5 text-[#7B8B9E] shrink-0 transition-transform duration-200 ${
                                    isPillarOpen ? "rotate-180 text-[#169DC8]" : ""
                                  }`}
                                />
                              </button>

                              {/* Pillar Sub-Links with Inner Tree Branch */}
                              <AnimatePresence>
                                {isPillarOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.18, ease: "easeOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="relative pl-3 ml-3 border-l-2 border-[#169DC8]/20 space-y-0.5 mt-1 mb-1.5">
                                      {/* Pillar Overview Link */}
                                      <div className="relative">
                                        <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-2 h-[1px] bg-[#169DC8]/30 rounded-full" />
                                        <Link
                                          href={pillar.href}
                                          onClick={onClose}
                                          className={`group relative flex items-center justify-between py-1 px-2.5 rounded-md text-[12px] transition-all ${
                                            isLinkActive(pillar.href) &&
                                            currentPath === pillar.href
                                              ? "bg-white/95 text-[#0D306C] font-bold shadow-2xs border border-white/80"
                                              : "text-[#505D74] hover:text-[#0D306C] hover:bg-white/80 font-medium"
                                          }`}
                                        >
                                          <span className="truncate">Overview</span>
                                          <ChevronRight
                                            className={`h-3 w-3 text-[#169DC8] transition-transform duration-150 ${
                                              isLinkActive(pillar.href) &&
                                              currentPath === pillar.href
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                                            }`}
                                          />
                                        </Link>
                                      </div>

                                      {/* All Inner Navigations for this pillar */}
                                      {pillar.links.map((link) => {
                                        const active = isLinkActive(link.href);
                                        return (
                                          <div key={link.href} className="relative">
                                            <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-2 h-[1px] bg-[#169DC8]/30 rounded-full" />
                                            <Link
                                              href={link.href}
                                              onClick={onClose}
                                              className={`group relative flex items-center justify-between py-1 px-2.5 rounded-md text-[12px] transition-all ${
                                                active
                                                  ? "bg-white/95 text-[#0D306C] font-bold shadow-2xs border border-white/80"
                                                  : "text-[#505D74] hover:text-[#0D306C] hover:bg-white/80 font-medium"
                                              }`}
                                            >
                                              <span className="truncate">{link.label}</span>
                                              <ChevronRight
                                                className={`h-3 w-3 text-[#169DC8] transition-transform duration-150 ${
                                                  active
                                                    ? "opacity-100"
                                                    : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                                                }`}
                                              />
                                            </Link>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* 2. SOLUTIONS (Accordion with tree navigation)              */}
              {/* ────────────────────────────────────────────────────────── */}
              <div className="rounded-2xl transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleSection("solutions")}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left ${
                    openSections["solutions"]
                      ? "bg-white/85 shadow-2xs border border-white/80 text-[#0D306C]"
                      : "hover:bg-white/50 text-[#0D306C]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className={`h-4.5 w-4.5 shrink-0 ${openSections["solutions"] ? "text-[#169DC8]" : "text-[#0D306C]"}`} />
                    <span className="text-[14px] font-bold tracking-tight">Solutions</span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-[#7B8B9E] transition-transform duration-200 ${
                      openSections["solutions"] ? "rotate-180 text-[#169DC8]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openSections["solutions"] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="relative pl-3.5 ml-5 border-l-2 border-[#169DC8]/30 space-y-2.5 mt-2 pb-1">
                        {SOLUTION_GROUPS.map((group) => (
                          <div key={group.label} className="relative space-y-1">
                            <span className="absolute -left-[18px] top-2.5 w-2.5 h-[1.5px] bg-[#169DC8]/35 rounded-full" />
                            <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#169DC8] pl-2 pt-1">
                              {group.label}
                            </p>

                            <div className="space-y-0.5">
                              {group.links.map((link) => {
                                const active = isLinkActive(link.href);
                                return (
                                  <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={onClose}
                                    className={`group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[12.5px] transition-all ${
                                      active
                                        ? "bg-white/95 text-[#0D306C] font-bold shadow-2xs border border-white/80"
                                        : "text-[#2B3D66] hover:text-[#0D306C] hover:bg-white/80 font-medium"
                                    }`}
                                  >
                                    <span className="truncate">{link.label}</span>
                                    <ChevronRight
                                      className={`h-3.5 w-3.5 text-[#169DC8] transition-transform duration-150 ${
                                        active
                                          ? "opacity-100"
                                          : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                                      }`}
                                    />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* 3. PRODUCT (NeoHireX AI Hiring OS)                         */}
              {/* ────────────────────────────────────────────────────────── */}
              <div className="rounded-2xl transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleSection("product")}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left ${
                    openSections["product"]
                      ? "bg-white/85 shadow-2xs border border-white/80 text-[#0D306C]"
                      : "hover:bg-white/50 text-[#0D306C]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className={`h-4.5 w-4.5 shrink-0 ${openSections["product"] ? "text-[#169DC8]" : "text-[#0D306C]"}`} />
                    <span className="text-[14px] font-bold tracking-tight">Product</span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-[#7B8B9E] transition-transform duration-200 ${
                      openSections["product"] ? "rotate-180 text-[#169DC8]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openSections["product"] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="relative pl-3.5 ml-5 border-l-2 border-[#169DC8]/30 space-y-2 mt-2 pb-1">
                        {/* NeoHireX Spotlight Card */}
                        <div className="p-3 rounded-xl bg-white/80 border border-white/80 shadow-2xs space-y-2 mr-1">
                          <div className="flex items-center justify-between">
                            <Image
                              src="/logo/neohirex_logo.png"
                              alt="NeoHireX"
                              width={96}
                              height={26}
                              className="h-5 w-auto object-contain"
                            />
                            <span className="text-[9.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#169DC8]/10 text-[#169DC8] uppercase">
                              Agentic
                            </span>
                          </div>
                          <p className="text-[11.5px] text-[#505D74] leading-relaxed">
                            From first resume to last contract — one AI platform runs it all.
                          </p>

                          <a
                            href="https://neohirex.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#169DC8] hover:text-[#0D306C] transition-colors pt-1"
                          >
                            <span>Explore Platform</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>

                        {/* Direct product feature links */}
                        <div className="space-y-0.5">
                          {[
                            { label: "Platform Overview", href: "https://neohirex.ai/platform", ext: true },
                            { label: "Agentic AI Interviews", href: "https://neohirex.ai/platform/ai-interviews", ext: true },
                            { label: "Applicant Tracking (ATS)", href: "https://neohirex.ai/platform/ats", ext: true },
                            { label: "Offer Management", href: "https://neohirex.ai/platform/offer-management", ext: true },
                            { label: "Book a Demo", href: "/book-a-call?type=neohirex", ext: false },
                          ].map((item) => (
                            <div key={item.label} className="relative">
                              <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-2.5 h-[1.5px] bg-[#169DC8]/35 rounded-full" />
                              {item.ext ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={onClose}
                                  className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[12.5px] text-[#2B3D66] hover:text-[#0D306C] hover:bg-white/80 font-medium transition-all"
                                >
                                  <span>{item.label}</span>
                                  <ExternalLink className="h-3 w-3 text-[#169DC8] opacity-70 group-hover:opacity-100" />
                                </a>
                              ) : (
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[12.5px] text-[#2B3D66] hover:text-[#0D306C] hover:bg-white/80 font-medium transition-all"
                                >
                                  <span>{item.label}</span>
                                  <ChevronRight className="h-3.5 w-3.5 text-[#169DC8] opacity-0 group-hover:opacity-100" />
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* 4. INDUSTRIES (Accordion with tree navigation)             */}
              {/* ────────────────────────────────────────────────────────── */}
              <div className="rounded-2xl transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleSection("industries")}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left ${
                    openSections["industries"]
                      ? "bg-white/85 shadow-2xs border border-white/80 text-[#0D306C]"
                      : "hover:bg-white/50 text-[#0D306C]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className={`h-4.5 w-4.5 shrink-0 ${openSections["industries"] ? "text-[#169DC8]" : "text-[#0D306C]"}`} />
                    <span className="text-[14px] font-bold tracking-tight">Industries</span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-[#7B8B9E] transition-transform duration-200 ${
                      openSections["industries"] ? "rotate-180 text-[#169DC8]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openSections["industries"] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="relative pl-3.5 ml-5 border-l-2 border-[#169DC8]/30 space-y-1 mt-2 pb-1">
                          {/* All Industries on top, styled like the What We Do planning-tool buttons */}
                          <Link
                            href="/industries"
                            onClick={onClose}
                            className="group/btn relative inline-flex items-center justify-center gap-2.5 w-full rounded-xl bg-gradient-to-r from-[#169DC8] via-[#1288B0] to-[#0D6EA8] text-white text-[12.5px] font-semibold py-2.5 px-4 transition-all duration-200 shadow-[0_4px_16px_rgba(22,157,200,0.35)] hover:shadow-[0_6px_22px_rgba(22,157,200,0.5)] hover:-translate-y-0.5 active:translate-y-0"
                          >
                            <span>All Industries</span>
                            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" />
                          </Link>

                          {industryLinks.map((item) => {
                          const active = isLinkActive(item.href);
                          return (
                            <div key={item.label} className="relative">
                              <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-2.5 h-[1.5px] bg-[#169DC8]/35 rounded-full" />
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className={`group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[12.5px] transition-all ${
                                  active
                                    ? "text-[#169DC8] font-bold"
                                    : "text-[#2B3D66] hover:text-[#0D306C] font-medium"
                                }`}
                              >
                                <span className="truncate">{item.label}</span>
                                <ChevronRight
                                  className={`h-3.5 w-3.5 text-[#169DC8] transition-transform duration-150 ${
                                    active
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                                  }`}
                                />
                              </Link>
                            </div>
                          );
                        })}
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* 5. COMPANY (Accordion with tree navigation)                */}
              {/* ────────────────────────────────────────────────────────── */}
              <div className="rounded-2xl transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleSection("company")}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left ${
                    openSections["company"]
                      ? "bg-white/85 shadow-2xs border border-white/80 text-[#0D306C]"
                      : "hover:bg-white/50 text-[#0D306C]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className={`h-4.5 w-4.5 shrink-0 ${openSections["company"] ? "text-[#169DC8]" : "text-[#0D306C]"}`} />
                    <span className="text-[14px] font-bold tracking-tight">Company</span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-[#7B8B9E] transition-transform duration-200 ${
                      openSections["company"] ? "rotate-180 text-[#169DC8]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openSections["company"] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="relative pl-3.5 ml-5 border-l-2 border-[#169DC8]/30 space-y-1 mt-2 pb-1">
                        {companyLinks.map((item) => {
                          const active = isLinkActive(item.href);
                          return (
                            <div key={item.label} className="relative">
                              <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-2.5 h-[1.5px] bg-[#169DC8]/35 rounded-full" />
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className={`group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[12.5px] transition-all ${
                                  active
                                    ? "bg-white/95 text-[#0D306C] font-bold shadow-2xs border border-white/80"
                                    : "text-[#2B3D66] hover:text-[#0D306C] hover:bg-white/80 font-medium"
                                }`}
                              >
                                <span className="truncate">{item.label}</span>
                                <ChevronRight
                                  className={`h-3.5 w-3.5 text-[#169DC8] transition-transform duration-150 ${
                                    active
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                                  }`}
                                />
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* ── STICKY / FIXED BOTTOM FOOTER DOCK ── */}
            <div className="p-4 pt-3.5 border-t border-white/70 bg-white/50 backdrop-blur-md shrink-0 flex flex-col gap-3">
              {/* NeoIntelli Logo Nicely Placed */}
              <div className="flex items-center justify-center py-0.5">
                <Link href="/" onClick={onClose} aria-label="NeoIntelli Home">
                  <Image
                    src="/logo/neointelli_logo.webp"
                    alt="NeoIntelli"
                    width={138}
                    height={32}
                    className="h-7 w-auto object-contain hover:opacity-90 transition-opacity"
                  />
                </Link>
              </div>

              {/* Book Consultation Button */}
              <Link
                href="/book-a-call"
                onClick={onClose}
                className="btn-navy self-center"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="h-4 w-4 text-white shrink-0" />
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
