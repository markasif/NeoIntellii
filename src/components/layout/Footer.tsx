"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v1.51H6.198v3.98h3v8.01z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66 1.67 1.67 0 0 0 1.66 1.67 1.66 1.66 0 0 0 1.66-1.67c0-.92-.74-1.66-1.66-1.66Z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const mainNavLinks = [
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Our Approach", href: "/case-studies" },
  { label: "Insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const serviceCategories = [
  {
    title: "AI GCC",
    links: [
      { label: "Overview", href: "/services/ai-gcc" },
      { label: "AI Advisory & Strategy", href: "/services/ai-gcc/ai-advisory-strategy" },
      { label: "AI GCC Setup & Operations", href: "/services/ai-gcc/setup-operations" },
      { label: "Generative & Agentic AI for GCCs", href: "/services/ai-gcc/generative-ai" },
      { label: "Data Engineering for AI GCCs", href: "/services/ai-gcc/data-engineering" },
      { label: "MLOps, LLMOps & AgentOps for GCCs", href: "/services/ai-gcc/mlops" },
      { label: "AI Governance & Responsible AI", href: "/services/ai-gcc/responsible-ai" },
      { label: "AI Infrastructure & GPU", href: "/services/ai-gcc/ai-infrastructure-gpu" },
    ],
  },
  {
    title: "AI Talent",
    links: [
      { label: "Overview", href: "/services/ai-talent" },
      { label: "AI & ML Recruitment", href: "/services/ai-talent/ai-ml-recruitment" },
      { label: "GenAI & Agentic AI Hiring", href: "/services/ai-talent/genai-agentic-ai-hiring" },
      { label: "Data Engineering & Data Science Hiring", href: "/services/ai-talent/data-engineering-data-science-hiring" },
      { label: "MLOps & AI Platform Hiring", href: "/services/ai-talent/mlops-ai-platform-hiring" },
      { label: "AI Leadership & Executive Search", href: "/services/ai-talent/ai-leadership-executive-search" },
      { label: "AI Recruitment Hub + NeoHireX", href: "/services/ai-talent/recruitment-hub" },
      { label: "AI Talent Academy & Reskilling", href: "/services/ai-talent/ai-reskilling-academy" },
    ],
  },
  {
    title: "AI Engineering",
    links: [
      { label: "Overview", href: "/services/ai-engineering" },
      { label: "Generative & Agentic AI", href: "/services/ai-engineering/generative-agentic-ai" },
      { label: "Applied AI & Machine Learning", href: "/services/ai-engineering/applied-ai-ml" },
      { label: "AI Data Engineering", href: "/services/ai-engineering/data-engineering" },
      { label: "AI Product Engineering", href: "/services/ai-engineering/ai-product-engineering" },
      { label: "AI Agents & Automation", href: "/services/ai-engineering/ai-agents-automation" },
      { label: "MLOps, LLMOps & AgentOps", href: "/services/ai-engineering/mlops-llmops-agentops" },
      { label: "AI Evaluation & Assurance", href: "/services/ai-engineering/ai-evaluation-assurance" },
    ],
  },
  {
    title: "AI Delivery Teams",
    links: [
      { label: "Overview", href: "/services/ai-delivery-teams" },
      { label: "Dedicated AI Engineering Team", href: "/services/ai-delivery-teams/dedicated-ai-engineering-team" },
      { label: "AI Delivery Pod", href: "/services/ai-delivery-teams/ai-delivery-pod" },
      { label: "Forward-Deployed AI Engineers", href: "/services/ai-delivery-teams/forward-deployed-ai-engineers" },
      { label: "AI Team Build & Transfer", href: "/services/ai-delivery-teams/ai-team-transfer" },
    ],
  },
  {
    title: "GCC Strategy & Setup",
    links: [
      { label: "Overview", href: "/services/gcc" },
      { label: "GCC Strategy & Business Case", href: "/services/gcc/strategy-business-case" },
      { label: "GCC Location Strategy", href: "/services/gcc/location-strategy" },
      { label: "GCC Setup & Launch", href: "/services/gcc/setup-launch" },
      { label: "GCC Modernization & Transformation", href: "/services/gcc/modernization-transformation" },
      { label: "AI Micro GCC", href: "/services/micro-gcc" },
    ],
  },
  {
    title: "GCC Operations",
    links: [
      { label: "Overview", href: "/services/gcc-operations" },
      { label: "People & HR Operations", href: "/services/gcc-operations/people-hr-operations" },
      { label: "GCC Workforce Strategy", href: "/services/gcc-operations/workforce-strategy" },
      { label: "Workplace, IT & Security", href: "/services/gcc-operations/workplace-it-security" },
      { label: "Service Management & Performance", href: "/services/gcc-operations/service-management-performance" },
      { label: "Governance & Compliance", href: "/services/gcc-operations/governance-compliance" },
      { label: "BOT & Transition", href: "/services/gcc-operations/bot-transition" },
      { label: "Scale & Expansion", href: "/services/gcc-operations/scale-expansion" },
    ],
  },
  {
    title: "More Services",
    links: [
      { label: "Recruitment Hub", href: "/recruitment" },
      { label: "Contract & Contract-to-Hire", href: "/recruitment/contract-staffing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GCC Cost Calculator", href: "/gcc-cost-calculator" },
      { label: "GCC ROI Estimator", href: "/gcc-roi-estimator" },
      { label: "GCC Readiness Assessment", href: "/gcc-readiness-assessment" },
      { label: "GCC Blueprint", href: "/blueprint" },
      { label: "GCC Cost Guide", href: "/gcc-india-cost" },
      { label: "GCC FAQ", href: "/gcc-faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden font-[family-name:var(--font-manrope)]"
      style={{
        background:
          "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
      }}
    >
      {/* ── TOP SECTION: 3-COLUMN BALANCED LAYOUT ─────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">

          {/* ── LEFT: Brand + Socials + Contact Info ────────────────────────── */}
          <div className="space-y-4">
            {/* Logo */}
            <a href="#" aria-label="NeoIntelli Home" className="inline-block">
              <Image
                src="/logo/neointelli_logo.webp"
                alt="NeoIntelli"
                width={150}
                height={34}
                className="h-7 sm:h-8 w-auto object-contain"
                priority
              />
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 text-[#475569] pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-[#169DC8] transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#169DC8] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-[#169DC8] transition-colors"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Email */}
            <div className="pt-1">
              <a
                href="mailto:reachus@neointelli.com"
                className="text-[13px] text-[#0D306C] font-semibold hover:text-[#169DC8] transition-colors"
              >
                reachus@neointelli.com
              </a>
            </div>

            {/* Address */}
            <div className="text-[12px] text-[#505D74] leading-[1.6]">
              1779, 19th Main Rd. Vanganahalli, Sector 1,<br />
              HSR Layout, Bengaluru, Karnataka 560102
            </div>

            {/* Working Hours */}
            <div className="text-[12px] text-[#505D74] leading-[1.6]">
              <span className="text-[#0D306C] font-semibold block">Working Hours:</span>
              Mon–Fri: 9AM–6PM IST<br />
              Saturday: 10AM–4PM
            </div>
          </div>

          {/* ── CENTER: Data Stats Style CTA Card ─────────────────────────── */}
          <div className="flex items-start justify-start sm:justify-center w-full">
            <div
              className="relative group bg-[#0A224E] border border-white/20 backdrop-blur-xl p-6 sm:p-7 text-left w-full max-w-full sm:max-w-[340px] rounded-2xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
              }}
            >
              {/* Subtle inner shine overlay matching data stats cards */}
              <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-[19px] sm:text-[21px] font-extrabold text-white mb-1.5 tracking-tight leading-tight">
                  Ready to transform?
                </h3>

                {/* Subtitle */}
                <p className="text-[12px] sm:text-[12.5px] text-[#C5D7F0] mb-5 leading-normal font-normal">
                  Start your GCC journey with us today.
                </p>

                {/* Button */}
                <Link
                  href="#contact"
                  className="group/btn relative inline-flex items-center justify-center gap-2.5 w-full rounded-xl bg-gradient-to-r from-[#169DC8] via-[#1288B0] to-[#0D6EA8] text-white text-[13px] sm:text-[13.5px] font-semibold py-3 px-5 transition-all duration-200 shadow-[0_4px_16px_rgba(22,157,200,0.35)] hover:shadow-[0_6px_22px_rgba(22,157,200,0.5)] hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Main Navigation Links (About, Industries, Our Approach, Insights, Careers, Contact) ── */}
          <div className="flex justify-start lg:justify-end">
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5 sm:space-y-3 text-left lg:text-right">
                {mainNavLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] sm:text-[14px] text-[#1E293B] hover:text-[#169DC8] transition-colors duration-150 font-semibold tracking-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </div>

        {/* ── SERVICES & RESOURCES DIRECTORY (BELOW WORKING HOURS & RIGHT NAV) ── */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-8 sm:gap-y-10">
            {serviceCategories.map((category) => (
              <div key={category.title} className="space-y-2 sm:space-y-2.5">
                <h4 className="text-[13px] sm:text-[14px] font-bold text-[#0D306C] tracking-tight mb-2 sm:mb-2.5">
                  {category.title}
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {category.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[11.5px] sm:text-[12px] text-[#475569] hover:text-[#169DC8] transition-colors duration-150 font-medium leading-normal block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GIANT TRANSLUCENT WATERMARK OF NEOINTELLI (PLACED ABOVE THE LEGAL & COPYRIGHT BAR) ── */}
      <div className="relative z-10 w-full overflow-hidden leading-none select-none pointer-events-none text-center pt-6 sm:pt-10 pb-0">
        <div
          className="w-full text-center font-extrabold tracking-tighter"
          style={{
            fontSize: "clamp(56px, 15.5vw, 240px)",
            color: "rgba(255, 255, 255, 0.42)",
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
          }}
          aria-hidden="true"
        >
          NeoIntelli
        </div>
      </div>

      {/* ── BOTTOM BAR: LEGAL LINKS & COPYRIGHT ───────────────────────── */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6 pb-4 sm:pb-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[11.5px] sm:text-[12px] text-[#2C4D6F] font-medium">
        {/* Legal links */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-start">
          {[
            { label: "Terms of Service", href: "/terms-of-service" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Cookie Policy", href: "/cookie-policy" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-[#0D306C] transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
        {/* Copyright */}
        <p className="text-center sm:text-right">
          © 2026 NeoIntelli. All Rights Reserved. | Bengaluru, India
        </p>
      </div>

      {/* ── DISCLAIMER TEXT ───────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 pb-6 text-[10px] sm:text-[11px] text-[#505D74]/80 leading-relaxed text-center sm:text-left">
        Disclaimer: NeoIntelli and its affiliated parties are not authorized to request any payment from job applicants at any stage of the recruitment process. Any individual or entity posing as NeoIntelli and soliciting money from candidates with promises of employment is engaging in fraudulent activity and unlawfully using the company’s name. If you encounter such demands for money from someone claiming to be a NeoIntelli employee, affiliate, or consultant, please report this immediately by contacting us at reachus@neointelli.com.
      </div>
    </footer>
  );
}
