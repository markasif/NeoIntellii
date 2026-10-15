"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import MobileSidebar from "./MobileSidebar";

type NavItemKey = "what-we-do" | "solutions" | "product" | "industries" | "company" | null;

export interface NavbarProps {
  appearance?: string;
}

export default function Navbar({ appearance }: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<NavItemKey>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };

    const updateNavbarHeight = () => {
      const bar = document.getElementById("main-navbar-bar") || headerRef.current;
      if (bar) {
        document.documentElement.style.setProperty("--site-navbar-height", `${bar.offsetHeight}px`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", updateNavbarHeight);
    handleScroll();
    updateNavbarHeight();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  const handleMouseEnter = (menuKey: NavItemKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const toggleMenu = (menuKey: NavItemKey) => {
    setActiveMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const { pathname } = useLocation();

  /** Which top-level nav section the current page belongs to. */
  const activeSection: NavItemKey = (() => {
    if (!pathname) return null;
    if (pathname.startsWith("/industries")) return "industries";
    if (/^\/(about|careers|contact|case-studies|blog|book-a-call|thank-you-call|privacy-policy|terms-of-service|cookie-policy|gcc-faq)/.test(pathname)) return "company";
    if (/^\/(gcc-cost-calculator|gcc-roi-estimator|gcc-readiness-assessment|gcc-india-cost|blueprint|gcc-as-a-service|gcc-for-ai-startups|gcc-vs-outsourcing)/.test(pathname)) return "solutions";
    if (pathname.startsWith("/services")) return "what-we-do";
    if (pathname.startsWith("/recruitment")) return "solutions";
    return null;
  })();

  /** Nav button classes — highlights the current page's section as well as an open menu. */
  const navBtnClass = (key: NavItemKey) => {
    const highlighted = activeMenu === key || activeSection === key;
    if (isDarkNav) {
      return highlighted ? "text-[#38BDF8]" : "text-white hover:text-[#38BDF8]";
    }
    return highlighted ? "text-[#169DC8]" : "text-[#2B3D66] hover:text-[#169DC8]";
  };

  /** True when the given link href matches the current page (segment-aware). */
  const isActiveHref = (href?: string) => {
    if (!pathname || !href) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isTransparent = !scrolled && activeMenu === null && !mobileMenuOpen;
  const isDarkNav = appearance === "dark" && isTransparent;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 w-full transition-colors duration-150 ${isTransparent
          ? "bg-transparent border-b border-transparent shadow-none"
          : activeMenu !== null
            ? "bg-transparent border-b border-transparent shadow-none"
            : "bg-white border-b border-slate-200/80 shadow-[0_2px_14px_rgba(13,48,108,0.06)]"
        }`}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Navbar Bar */}
      <div
        id="main-navbar-bar"
        className="relative z-20 w-full mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4"
      >
        {/* Left: Brand Logo */}
        <a
          href="/"
          className="flex items-center group shrink-0"
          aria-label="NeoIntelli Home"
          onClick={(event) => {
            if (typeof window !== "undefined" && window.location.pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Image
            src="/logo/neointelli_logo.webp"
            alt="NeoIntelli"
            width={160}
            height={38}
            className={`h-8 sm:h-9 w-auto object-contain hover:opacity-90 transition-all ${isDarkNav ? "brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" : ""
              }`}
            priority
          />
        </a>

        {/* Center: Desktop Navigation with Dropdowns */}
        <nav
          className={`hidden lg:flex items-center gap-1.5 xl:gap-2 text-[14px] font-medium ${isDarkNav ? "text-white" : "text-[#2B3D66]"
            }`}
        >
          {/* What We Do */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("what-we-do")}
          >
            <button
              onClick={() => toggleMenu("what-we-do")}
              className={`relative inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${navBtnClass("what-we-do")}`}
            >
              <span>What We Do</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "what-we-do"
                    ? isDarkNav
                      ? "rotate-180 text-[#38BDF8]"
                      : "rotate-180 text-[#169DC8]"
                    : isDarkNav
                      ? "text-white/80"
                      : "text-[#7B8B9E]"
                  }`}
              />
            </button>
          </div>

          {/* Solutions */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("solutions")}
          >
            <button
              onClick={() => toggleMenu("solutions")}
              className={`relative inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${navBtnClass("solutions")}`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "solutions"
                    ? isDarkNav
                      ? "rotate-180 text-[#38BDF8]"
                      : "rotate-180 text-[#169DC8]"
                    : isDarkNav
                      ? "text-white/80"
                      : "text-[#7B8B9E]"
                  }`}
              />
            </button>
          </div>

          {/* Product (Highlighted in cyan) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("product")}
          >
            <button
              onClick={() => toggleMenu("product")}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${navBtnClass("product")}`}
            >
              <span>Product</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "product"
                    ? isDarkNav
                      ? "rotate-180 text-[#38BDF8]"
                      : "rotate-180 text-[#169DC8]"
                    : isDarkNav
                      ? "text-[#38BDF8]"
                      : "text-[#169DC8]"
                  }`}
              />
            </button>
          </div>

          {/* Industries */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("industries")}
          >
            <button
              onClick={() => toggleMenu("industries")}
              className={`relative inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${navBtnClass("industries")}`}
            >
              <span>Industries</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "industries"
                    ? isDarkNav
                      ? "rotate-180 text-[#38BDF8]"
                      : "rotate-180 text-[#169DC8]"
                    : isDarkNav
                      ? "text-white/80"
                      : "text-[#7B8B9E]"
                  }`}
              />
            </button>
          </div>

          {/* Company */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("company")}
          >
            <button
              onClick={() => toggleMenu("company")}
              className={`relative inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${navBtnClass("company")}`}
            >
              <span>Company</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "company"
                    ? isDarkNav
                      ? "rotate-180 text-[#38BDF8]"
                      : "rotate-180 text-[#169DC8]"
                    : isDarkNav
                      ? "text-white/80"
                      : "text-[#7B8B9E]"
                  }`}
              />
            </button>
          </div>
        </nav>

        {/* Right: Consultation Button with btn-gradient-primary style */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden shadow-xs active:scale-95 transition-all ${isDarkNav
                ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                : "border-slate-200 bg-white text-[#0D306C]"
              }`}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP MEGA MENU DROPDOWNS                                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeMenu === "product" && (
          <motion.div
            key="mega-product"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={() => handleMouseEnter("product")}
            onMouseLeave={handleMouseLeave}
            className="absolute top-0 left-0 right-0 z-10 pointer-events-auto w-full border-b border-[#8EBDE4]/60 shadow-[0_25px_50px_rgba(13,48,108,0.18)]"
            style={{
              background: "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
            }}
          >
            <div className="pt-[68px] sm:pt-[72px]">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">

                {/* Left Feature Column: Light Blue NeoHireX Spotlight */}
                <div className="w-full lg:w-[290px] xl:w-[320px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#0D306C]/10 pr-6 lg:pr-8 flex flex-col justify-between text-left">
                  <div>
                    {/* NeoHireX Logo */}
                    <div className="mb-5">
                      <Image
                        src="/logo/neohirex_logo.webp"
                        alt="NeoHireX - Every hire is human"
                        width={130}
                        height={42}
                        className="h-7 sm:h-8 w-auto object-contain"
                        priority
                      />
                    </div>

                    {/* Tag / Platform label */}
                    <div className="text-[10.5px] font-mono font-bold tracking-[0.18em] text-[#169DC8] uppercase mb-2">
                      AI HIRING OPERATING SYSTEM
                    </div>

                    {/* Heading */}
                    <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#0D306C] leading-snug mb-2.5 tracking-tight">
                      From first resume to last contract — one AI platform runs it all.
                    </h3>

                    {/* Description */}
                    <p className="text-[11.5px] sm:text-[12px] text-[#505D74] leading-relaxed font-normal">
                      NeoHireX combines AI interviews, recruiter intelligence, offer management, skill tracking, and workforce analytics into a single operating system.
                    </p>
                  </div>

                  {/* Bottom Link */}
                  <div className="pt-6">
                    <a
                      href="https://neohirex.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="btn-navy"
                    >
                      <span>Visit NeoHireX</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Columns Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start text-left">

                  {/* Column 1: PLATFORM */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="px-1 mb-1.5">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Platform</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    <a
                      href="https://neohirex.ai/platform" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Platform overview
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        One platform for the entire hiring lifecycle.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/platform/ai-interviews" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Agentic AI Interviews
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        24/7 autonomous voice screenings with sentiment + skill analysis.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/platform/ats" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Applicant Tracking (ATS)
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        Semantic resume processing and pipeline management.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/platform/offer-management" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Offer Management
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        Dynamic offer generation and digital acceptance.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/platform/autopilot" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          AI Process Automation
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        Autopilot workflows that eliminate repetitive tasks.
                      </p>
                    </a>
                  </div>

                  {/* Column 2: AI AGENTS */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="px-1 mb-1.5">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">AI Agents</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    <a
                      href="https://neohirex.ai/platform/ai-agents" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Meet the AI Agents
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        18 specialized AI workers acting on your data 24/7.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/platform/workforce-intelligence" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Workforce Intelligence
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        Predictive analytics for churn and performance.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/platform/employee-lifecycle" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Employee Lifecycle
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        End-to-end management from onboarding to transition.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/platform/skill-management" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Skill Management
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        Live skill mapping and competency tracking.
                      </p>
                    </a>
                  </div>

                  {/* Column 3: TRUST & RESOURCES */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="px-1 mb-1.5">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Trust &amp; Resources</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    <a
                      href="https://neohirex.ai/platform/compliance" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Compliance &amp; Security
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        SOC 2 ready architecture with full audit trails.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/platform/compliance" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          DPDP Act 2023
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        Built ground-up for India&apos;s data protection law.
                      </p>
                    </a>

                    <a
                      href="https://neohirex.ai/blog" target="_blank" rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Blog &amp; Perspectives
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        Perspectives on AI hiring and recruitment ops.
                      </p>
                    </a>

                    <Link
                      href="/book-a-call?type=neohirex"
                      onClick={() => setActiveMenu(null)}
                      className="group block p-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:shadow-2xs text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] sm:text-[15px] font-bold text-[#0D306C] group-hover:text-[#169DC8] transition-colors leading-snug">
                          Book a demo
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">
                        30-min live demo, no credit card required.
                      </p>
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        )}


        {/* What We Do Mega Menu */}
        {activeMenu === "what-we-do" && (
          <motion.div
            key="mega-what-we-do"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={() => handleMouseEnter("what-we-do")}
            onMouseLeave={handleMouseLeave}
            className="absolute top-0 left-0 right-0 z-10 pointer-events-auto w-full border-b border-[#8EBDE4]/60 shadow-[0_25px_50px_rgba(13,48,108,0.18)]"
            style={{
              background: "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
            }}
          >
            <div className="pt-[68px] sm:pt-[72px]">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">

                {/* LEFT: Numbered Services Grid */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="px-1 mb-3">
                    <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Six Services, One Operating Model</p>
                    <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                    {[
                      { title: "AI GCC", desc: "Build and operate an AI capability center in India under one operating model, from one squad to a full GCC.", href: "/services/ai-gcc" },
                      { title: "AI Talent", desc: "Technically validated GenAI, ML, Data and MLOps talent, from one specialist hire to a complete AI team.", href: "/services/ai-talent" },
                      { title: "AI Engineering", desc: "Build production AI: generative and agentic systems, applied ML, data, products and the operations around them.", href: "/services/ai-engineering" },
                      { title: "AI Delivery Teams", desc: "Senior-led AI squads that deliver inside your operating model, with a path to transferring the team to you.", href: "/services/ai-delivery-teams" },
                      { title: "GCC Strategy & Setup", desc: "Business case, location, entity and launch for a new India capability center, or the modernization of an existing one.", href: "/services/gcc" },
                      { title: "GCC Operations", desc: "Run the center day to day: people, workplace, service performance, governance, transition and expansion.", href: "/services/gcc-operations" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-2xl transition-all duration-200 text-left ${isActiveHref(item.href) ? "" : "hover:bg-white/60 hover:shadow-2xs"
                          }`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[14px] sm:text-[15px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"
                            }`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Our Approach Feature Column */}
                <div className="w-full lg:w-[260px] xl:w-[290px] shrink-0 border-t lg:border-t-0 lg:border-l border-[#0D306C]/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between text-left">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#169DC8] mb-2">Our Approach</p>
                    <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#0D306C] leading-snug mb-2.5">The NeoIntelli Difference</h3>
                    <p className="text-[11.5px] sm:text-[12px] text-[#505D74] leading-relaxed mb-5">
                      Like traditional advisors — but we build, hire and operate the team, not just the slide deck.
                    </p>
                    <div className="divide-y divide-[#E5E9F8]/80">
                      {[
                        { label: "GCC Cost Calculator", href: "/gcc-cost-calculator" },
                        { label: "GCC ROI Estimator", href: "/gcc-roi-estimator" },
                        { label: "GCC Readiness Assessment", href: "/gcc-readiness-assessment" },
                      ].map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setActiveMenu(null)}
                          className={`group flex items-center justify-between py-2.5 text-[12px] font-semibold transition-colors duration-200 ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] hover:text-[#169DC8]"}`}>
                          <span>{item.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#169DC8] transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="pt-5 mt-3 border-t border-[#0D306C]/15">
                    <Link href="/case-studies" onClick={() => setActiveMenu(null)}
                      className="btn-navy">
                      <span>Learn about our approach</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}



        {/* Solutions Mega Menu */}
        {activeMenu === "solutions" && (
          <motion.div
            key="mega-solutions"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={() => handleMouseEnter("solutions")}
            onMouseLeave={handleMouseLeave}
            className="absolute top-0 left-0 right-0 z-10 pointer-events-auto w-full border-b border-[#8EBDE4]/60 shadow-[0_25px_50px_rgba(13,48,108,0.18)]"
            style={{
              background: "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
            }}
          >
            <div className="pt-[68px] sm:pt-[72px]">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">

                {/* Full-width columns: Build / Solve / Recruitment / Plan */}
                <div className="flex-1 p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start text-left">

                  {/* Column 1: BUILD YOUR AI CAPABILITY */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="px-1 mb-1.5">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Build Your AI Capability</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    {[
                      { title: "AI Micro GCC", desc: "Start your dedicated India AI team.", href: "/services/micro-gcc" },
                      { title: "AI Delivery Pods", desc: "One focused team. One defined outcome.", href: "/services/ai-delivery-teams/ai-delivery-pod" },
                      { title: "AI Team Build & Transfer", desc: "Build now. Bring the capability in-house.", href: "/services/ai-delivery-teams/ai-team-transfer" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-2xl transition-all duration-200 text-left ${isActiveHref(item.href) ? "" : "hover:bg-white/60 hover:shadow-2xs"}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[14px] sm:text-[15px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"}`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">{item.desc}</p>
                      </Link>
                    ))}
                  </div>

                  {/* Column 2: SOLVE AN AI CHALLENGE */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="px-1 mb-1.5">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Solve an AI Challenge</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    {[
                      { title: "Expert-Validated AI Hiring", desc: "Hire AI engineers assessed by practitioners.", href: "/services/ai-talent/ai-ml-recruitment" },
                      { title: "AI Pilot to Production", desc: "Turn an existing AI pilot into a production system.", href: "/services/ai-delivery-teams/forward-deployed-ai-engineers" },
                      { title: "AI CoE for Existing GCCs", desc: "Build AI capability inside your existing center.", href: "/services/gcc/modernization-transformation" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-2xl transition-all duration-200 text-left ${isActiveHref(item.href) ? "" : "hover:bg-white/60 hover:shadow-2xs"}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[14px] sm:text-[15px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"}`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">{item.desc}</p>
                      </Link>
                    ))}
                  </div>

                  {/* Column 3: PLAN YOUR RECRUITMENT */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="px-1 mb-1.5">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Plan Your Recruitment</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    {[
                      { title: "Recruitment & Staffing", desc: "Permanent, contract, executive search and RPO in India.", href: "/recruitment" },
                      { title: "Permanent Recruitment", desc: "Direct hire for mid-to-senior roles, with a 90-day guarantee.", href: "/recruitment/permanent" },
                      { title: "Executive Search", desc: "Retained CXO, board and leadership search.", href: "/recruitment/executive-search" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-2xl transition-all duration-200 text-left ${isActiveHref(item.href) ? "" : "hover:bg-white/60 hover:shadow-2xs"}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[14px] sm:text-[15px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"}`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal line-clamp-1">{item.desc}</p>
                      </Link>
                    ))}
                  </div>

                  {/* Column 4: PLAN YOUR GCC */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="px-1 mb-1.5">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Plan Your GCC</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    {[
                      { title: "GCC Cost Calculator", desc: "Estimate the cost of your India team.", href: "/gcc-cost-calculator" },
                      { title: "GCC ROI Estimator", desc: "Compare current spend against an India model to see break-even and multi-year effect.", href: "/gcc-roi-estimator" },
                      { title: "GCC Readiness Assessment", desc: "Find your best starting model.", href: "/gcc-readiness-assessment" },
                      { title: "GCC Blueprint", desc: "Define your team, economics and launch plan.", href: "/blueprint" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-2xl transition-all duration-200 text-left ${isActiveHref(item.href) ? "" : "hover:bg-white/60 hover:shadow-2xs"}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[14px] sm:text-[15px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"}`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[12px] sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1 font-normal">{item.desc}</p>
                      </Link>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Industries Mega Menu */}
        {activeMenu === "industries" && (
          <motion.div
            key="mega-industries"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={() => handleMouseEnter("industries")}
            onMouseLeave={handleMouseLeave}
            className="absolute top-0 left-0 right-0 z-10 pointer-events-auto w-full border-b border-[#8EBDE4]/60 shadow-[0_25px_50px_rgba(13,48,108,0.18)]"
            style={{
              background: "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
            }}
          >
            <div className="pt-[68px] sm:pt-[72px]">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">

                {/* LEFT: 2-column industry grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">

                  {/* Column 1: REGULATED */}
                  <div className="space-y-1.5">
                    <div className="px-1 mb-2">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Regulated</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    {[
                      { title: "BFSI", desc: "Banks, capital markets, and insurance GCCs.", href: "/industries/bfsi-gcc" },
                      { title: "Healthcare", desc: "Payers, providers, and life sciences.", href: "/industries/healthcare-gcc" },
                      { title: "Private Equity", desc: "Value creation through portfolio GCCs.", href: "/industries/private-equity-gcc" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-xl transition-colors duration-200 ${isActiveHref(item.href) ? "" : "hover:bg-white/60"}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[13.5px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"}`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[11.5px] text-[#505D74] leading-relaxed mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                  </div>

                  {/* Column 2: GROWTH & OPERATIONS */}
                  <div className="space-y-1.5">
                    <div className="px-1 mb-2">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Growth &amp; Operations</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    {[
                      { title: "Technology", desc: "Software, SaaS, and platform companies.", href: "/industries/technology-gcc" },
                      { title: "Manufacturing", desc: "Industrial, automotive, and supply chain.", href: "/industries/manufacturing-gcc" },
                      { title: "Retail", desc: "Consumer, commerce, and omni-channel.", href: "/industries/retail-gcc" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-xl transition-colors duration-200 ${isActiveHref(item.href) ? "" : "hover:bg-white/60"}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[13.5px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"}`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[11.5px] text-[#505D74] leading-relaxed mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                  </div>

                </div>

                {/* RIGHT: Industries feature column */}
                <div className="w-full lg:w-[260px] xl:w-[290px] shrink-0 border-t lg:border-t-0 lg:border-l border-[#0D306C]/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between text-left">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#169DC8] mb-2">By The Numbers</p>
                    <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#0D306C] leading-snug mb-2.5">GCC India: cost &amp; value</h3>
                    <p className="text-[11.5px] sm:text-[12px] text-[#505D74] leading-relaxed mb-5">
                      Benchmarks on what an India GCC actually costs and returns.
                    </p>
                    <div className="divide-y divide-[#E5E9F8]/80">
                      {[
                        { label: "GCC FAQ", href: "/gcc-faq" },
                        { label: "See benchmarks", href: "/gcc-india-cost" },
                      ].map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setActiveMenu(null)}
                          className="group flex items-center justify-between py-2.5 text-[12px] font-semibold text-[#0D306C] hover:text-[#169DC8] transition-colors duration-200">
                          <span>{item.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#169DC8] transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="pt-5 mt-3 border-t border-[#0D306C]/15">
                    <Link href="/industries" onClick={() => setActiveMenu(null)}
                      className="btn-navy">
                      <span>All industries</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* Company Mega Menu */}
        {activeMenu === "company" && (
          <motion.div
            key="mega-company"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={() => handleMouseEnter("company")}
            onMouseLeave={handleMouseLeave}
            className="absolute top-0 left-0 right-0 z-10 pointer-events-auto w-full border-b border-[#8EBDE4]/60 shadow-[0_25px_50px_rgba(13,48,108,0.18)]"
            style={{
              background: "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
            }}
          >
            <div className="pt-[68px] sm:pt-[72px]">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">

                {/* LEFT: 2-column company grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">

                  {/* Column 1: CORPORATE */}
                  <div className="space-y-1.5">
                    <div className="px-1 mb-2">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Corporate</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    {[
                      { title: "About Us", desc: "Who we are and how we work.", href: "/about" },
                      { title: "Our Approach", desc: "How we design, launch, and scale GCCs.", href: "/case-studies" },
                      { title: "Careers", desc: "Build with senior-led teams.", href: "/careers" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-xl transition-colors duration-200 ${isActiveHref(item.href) ? "" : "hover:bg-white/60"}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[13.5px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"}`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[11.5px] text-[#505D74] leading-relaxed mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                  </div>

                  {/* Column 2: KNOWLEDGE HUB */}
                  <div className="space-y-1.5">
                    <div className="px-1 mb-2">
                      <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7B8B9E] mb-1.5">Knowledge Hub</p>
                      <div className="w-8 h-[3px] bg-[#DE8017] rounded-full" />
                    </div>
                    {[
                      { title: "Blog & Insights", desc: "Perspectives on GCCs and enterprise AI.", href: "/blog" },
                      { title: "Contact Us", desc: "Talk to a senior advisor.", href: "/contact" },
                    ].map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)}
                        className={`group relative block p-2 rounded-xl transition-colors duration-200 ${isActiveHref(item.href) ? "" : "hover:bg-white/60"}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[13.5px] font-bold transition-colors leading-snug ${isActiveHref(item.href) ? "text-[#169DC8]" : "text-[#0D306C] group-hover:text-[#169DC8]"}`}>{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[11.5px] text-[#505D74] leading-relaxed mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                  </div>

                </div>

                {/* RIGHT: Company Talk To Us panel */}
                <div className="w-full lg:w-[260px] xl:w-[290px] shrink-0 border-t lg:border-t-0 lg:border-l border-[#0D306C]/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between text-left">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#169DC8] mb-2">Talk To Us</p>
                    <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#0D306C] leading-snug mb-2.5">Speak to a GCC advisor</h3>
                    <p className="text-[11.5px] sm:text-[12px] text-[#505D74] leading-relaxed mb-5">
                      Get a no-pressure walkthrough of how a GCC could work for you.
                    </p>
                    <div className="divide-y divide-[#E5E9F8]/80">
                      {[
                        { label: "Start a conversation", href: "/contact" },
                      ].map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setActiveMenu(null)}
                          className="group flex items-center justify-between py-2.5 text-[12px] font-semibold text-[#0D306C] hover:text-[#169DC8] transition-colors duration-200">
                          <span>{item.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#169DC8] transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="pt-5 mt-3 border-t border-[#0D306C]/15">
                    <Link href="/book-a-call" onClick={() => setActiveMenu(null)}
                      className="btn-navy">
                      <span>Book a consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MOBILE MENU DRAWER (Slide from Right, Tree-View Navigations)              */}
      {/* ========================================================================= */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
