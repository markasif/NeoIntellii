import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Activity,
  Users,
  Cpu,
  Sparkles,
  Bot,
  Calculator,
  BookOpen,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { GCC_OPERATIONS_BASE, PILLAR_LINKS, type GccOpsPageKey } from "@/data/gccOperationsContent";
import SectionHeader from "@/components/ui/SectionHeader";

interface RelatedItem {
  label: string;
  desc: string;
  href: string;
}

interface RelatedGccServicesProps {
  currentKey: GccOpsPageKey;
  extra?: RelatedItem[];
  theme?: "light" | "navy";
}

const getPillarIcon = (label: string): ComponentType<{ className?: string }> => {
  if (label.includes("Setup") || label.includes("Launch")) return Compass;
  if (label.includes("Operations")) return Activity;
  if (label.includes("Talent")) return Users;
  if (label.includes("Engineering")) return Cpu;
  if (label.includes("Micro")) return Bot;
  if (label.includes("AI GCC")) return Sparkles;
  return Sparkles;
};

const getToolIcon = (href: string): ComponentType<{ className?: string }> => {
  if (href.includes("cost-calculator") || href.includes("calculator")) return Calculator;
  if (href.includes("cost-guide") || href.includes("guide")) return BookOpen;
  if (href.includes("readiness")) return CheckCircle2;
  return HelpCircle;
};

/**
 * The cross-pillar map every page in the section closes with. It states the
 * relationship between the pillars in one line each, styled to match the Home Page Data Stats cards.
 */
export default function RelatedGccServices({
  currentKey,
  extra = [],
  theme = "navy",
}: RelatedGccServicesProps) {
  const isNavy = theme === "navy";

  const pillars: RelatedItem[] = [
    { label: "GCC Setup & Launch", desc: "Design and launch the center.", href: PILLAR_LINKS.gccSetupLaunch },
    ...(currentKey === "overview" ? [] : [{ label: "GCC Operations", desc: "Run and scale the center.", href: GCC_OPERATIONS_BASE }]),
    { label: "AI Talent", desc: "Find and validate the people.", href: PILLAR_LINKS.aiTalent },
    { label: "AI Engineering", desc: "Build the AI capability.", href: PILLAR_LINKS.aiEngineering },
    { label: "AI GCC", desc: "Build an AI-focused capability center.", href: PILLAR_LINKS.aiGcc },
    { label: "AI Micro GCC", desc: "Start smaller with a lightweight operating model.", href: PILLAR_LINKS.microGcc },
  ];

  const tools: RelatedItem[] = [
    { label: "Estimate the operating cost of an India GCC", desc: "GCC Cost Calculator", href: PILLAR_LINKS.costCalculator },
    { label: "GCC Cost Guide", desc: "India GCC cost benchmarks", href: PILLAR_LINKS.costGuide },
    { label: "GCC Readiness Assessment", desc: "Is your company ready?", href: PILLAR_LINKS.readiness },
    { label: "GCC FAQ", desc: "Common GCC questions", href: PILLAR_LINKS.gccFaq },
  ];

  return (
    <section
      aria-labelledby="related-gcc-heading"
      className={`relative px-4 sm:px-6 lg:px-8 ${
        isNavy
          ? "pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-10 sm:pb-14 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white"
          : "py-14 md:py-20 bg-transparent border-t border-[#0D306C]/10"
      } overflow-hidden`}
    >
      {/* ========================================================================= */}
      {/* TOP ORGANIC WAVE SECTION DIVIDER (Flowing down into Navy Blue background) */}
      {/* ========================================================================= */}
      {isNavy && (
        <div className="absolute top-0 inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
          <svg
            viewBox="0 0 1440 140"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 lg:h-16 xl:h-18 block pointer-events-none"
          >
            <path
              d="M0,0 L1440,0 L1440,30 C1300,32 1160,65 1000,82 C840,99 720,74 540,84 C360,94 200,136 0,136 Z"
              fill="#D2DCF0"
              opacity="0.6"
            />
            <path
              d="M0,0 L1440,0 L1440,22 C1300,24 1160,58 1000,74 C840,90 720,66 540,76 C360,86 200,126 0,126 Z"
              fill="#E7EDF9"
            />
          </svg>
        </div>
      )}

      {/* Ambient background glow highlights matching Consultation */}
      {isNavy && (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none z-0" />
          <div
            className="absolute inset-0 opacity-[0.045] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="CONNECTED ECOSYSTEM"
          title={
            isNavy ? (
              <>
                How GCC Operations connects to the rest of NeoIntelli
                <span className="text-[#38BDF8]">.</span>
              </>
            ) : (
              "How GCC Operations connects to the rest of NeoIntelli"
            )
          }
          description="A complete lifecycle model spanning strategy, initial setup, talent acquisition, AI engineering, and multi-year operations."
          align="center"
          variant={isNavy ? "white" : "cyan"}
          className="mb-8 sm:mb-12"
        />

        {/* ========================================================================= */}
        {/* CONNECTED ECOSYSTEM: Matched to Homepage Data Stats Cards with Chamfered  */}
        {/* Bottom-Left Cut, Hexagon Icon Badge, Ascending Mini Chart Motif & Shine   */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* CONNECTED ECOSYSTEM: 3 Columns x 2 Rows (6 Balanced Cards)                */}
        {/* ========================================================================= */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {[...pillars, ...extra].map((item) => {
            const Icon = getPillarIcon(item.label);
            return (
              <li key={item.href + item.label} className="h-full flex">
                <Link
                  to={item.href}
                  className={`group relative flex flex-col justify-between w-full h-full min-h-[185px] sm:min-h-[200px] p-4 sm:p-4.5 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 ${
                    isNavy
                      ? "bg-gradient-to-b from-[#0C3262] via-[#08234B] to-[#051836] border border-[#20528E]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_8px_24px_rgba(4,18,43,0.32)] hover:shadow-[0_14px_36px_rgba(22,157,200,0.28)]"
                      : "bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 hover:border-[#169DC8]/35 shadow-[0_4px_24px_rgba(13,48,108,0.05)] hover:shadow-[0_12px_32px_rgba(13,48,108,0.09)]"
                  }`}
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
                  }}
                >
                  {/* Chamfer Corner Border Accent (Bottom-Left Cut) */}
                  <svg
                    className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none overflow-visible z-20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <line
                      x1="0"
                      y1="2"
                      x2="22"
                      y2="24"
                      stroke={isNavy ? "#20528E" : "#0D306C"}
                      strokeOpacity={isNavy ? 0.75 : 0.2}
                      strokeWidth="1.5"
                      className={
                        isNavy
                          ? "group-hover:stroke-[#38BDF8] transition-colors"
                          : "group-hover:stroke-[#169DC8] transition-colors"
                      }
                    />
                  </svg>

                  {/* Inner Specular Highlight Overlay (Data Stats Card Match) */}
                  {isNavy && (
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />
                  )}

                  <div className="relative z-10 flex flex-col justify-between h-full w-full">
                    <div>
                      {/* Top Hexagon Icon Badge */}
                      <div className="relative flex items-center justify-center w-8 h-9 mb-2.5">
                        <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                          <polygon
                            points="27,3 50,16 50,44 27,57 4,44 4,16"
                            fill={isNavy ? "#123B70" : "#EBF4FC"}
                            stroke={isNavy ? "#38BDF8" : "#169DC8"}
                            strokeWidth="2.4"
                            strokeOpacity="0.85"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className={`absolute inset-0 flex items-center justify-center ${isNavy ? "text-[#67D5F7]" : "text-[#008EC4]"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Title */}
                      <span
                        className={`block font-extrabold text-sm sm:text-[15px] mb-1 leading-snug transition-colors min-h-[38px] ${
                          isNavy
                            ? "text-white group-hover:text-[#38BDF8]"
                            : "text-[#0D244D] group-hover:text-[#008EC4]"
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed line-clamp-2 ${isNavy ? "text-[#C5D7F0]" : "text-[#505D74]"}`}>
                        {item.desc}
                      </p>
                    </div>

                    {/* Action Link at Bottom */}
                    <div className="mt-auto pt-3">
                      <span
                        className={`inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm transition-colors ${
                          isNavy
                            ? "text-[#38BDF8] group-hover:text-white"
                            : "text-[#008EC4] group-hover:text-[#0D306C]"
                        }`}
                      >
                        <span>Open</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ========================================================================= */}
        {/* TOOLS AND REFERENCES: Same Size Cards for All in 4 Columns                */}
        {/* ========================================================================= */}
        <div className="mt-14 mb-8 flex items-center justify-center gap-4 text-center">
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#38BDF8]/60" />
          <h3 className={`font-extrabold text-xl sm:text-2xl tracking-tight ${isNavy ? "text-white" : "text-[#0D306C]"}`}>
            Tools and references
          </h3>
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#38BDF8]/60" />
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {tools.map((tool) => {
            const ToolIcon = getToolIcon(tool.href);
            return (
              <li key={tool.href} className="h-full flex">
                <Link
                  to={tool.href}
                  className={`group relative flex flex-col justify-between w-full h-full min-h-[195px] sm:min-h-[210px] p-4 sm:p-4.5 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 ${
                    isNavy
                      ? "bg-gradient-to-b from-[#0C3262] via-[#08234B] to-[#051836] border border-[#20528E]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_8px_24px_rgba(4,18,43,0.32)] hover:shadow-[0_14px_36px_rgba(22,157,200,0.28)]"
                      : "bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 hover:border-[#169DC8]/35 shadow-[0_4px_24px_rgba(13,48,108,0.05)] hover:shadow-[0_12px_32px_rgba(13,48,108,0.09)]"
                  }`}
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
                  }}
                >
                  {/* Chamfer Corner Border Accent (Bottom-Left Cut) */}
                  <svg
                    className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none overflow-visible z-20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <line
                      x1="0"
                      y1="2"
                      x2="22"
                      y2="24"
                      stroke={isNavy ? "#20528E" : "#0D306C"}
                      strokeOpacity={isNavy ? 0.75 : 0.2}
                      strokeWidth="1.5"
                      className={
                        isNavy
                          ? "group-hover:stroke-[#38BDF8] transition-colors"
                          : "group-hover:stroke-[#169DC8] transition-colors"
                      }
                    />
                  </svg>

                  {/* Inner Specular Highlight Overlay (Data Stats Card Match) */}
                  {isNavy && (
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />
                  )}

                  <div className="relative z-10 flex flex-col justify-between h-full w-full">
                    <div>
                      {/* Top Row: Hexagon Icon Badge + Arrow Indicator */}
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="relative flex items-center justify-center w-8 h-9">
                          <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                            <polygon
                              points="27,3 50,16 50,44 27,57 4,44 4,16"
                              fill={isNavy ? "#123B70" : "#EBF4FC"}
                              stroke={isNavy ? "#38BDF8" : "#169DC8"}
                              strokeWidth="2.4"
                              strokeOpacity="0.85"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className={`absolute inset-0 flex items-center justify-center ${isNavy ? "text-[#67D5F7]" : "text-[#008EC4]"}`}>
                            <ToolIcon className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="w-6.5 h-6.5 rounded-full bg-white/10 group-hover:bg-[#38BDF8] text-white/70 group-hover:text-[#0A224E] flex items-center justify-center transition-all duration-200">
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      {/* Tool Title */}
                      <span
                        className={`block font-extrabold text-sm sm:text-[15px] mb-1 leading-snug transition-colors min-h-[38px] ${
                          isNavy
                            ? "text-white group-hover:text-[#38BDF8]"
                            : "text-[#0D306C] group-hover:text-[#008EC4]"
                        }`}
                      >
                        {tool.label}
                      </span>
                    </div>

                    {/* Context Badge Pill pinned to bottom */}
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center text-[10.5px] font-bold tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                          isNavy
                            ? "text-[#38BDF8] bg-[#38BDF8]/15 border border-[#38BDF8]/20 group-hover:bg-[#38BDF8]/25"
                            : "text-[#008EC4] bg-[#169DC8]/10 border border-[#169DC8]/20 group-hover:bg-[#169DC8]/20"
                        }`}
                      >
                        {tool.desc}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 font-bold text-xs transition-colors ${
                          isNavy
                            ? "text-[#38BDF8] group-hover:text-white"
                            : "text-[#008EC4] group-hover:text-[#0D306C]"
                        }`}
                      >
                        <span>Open</span>
                        <ChevronRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
