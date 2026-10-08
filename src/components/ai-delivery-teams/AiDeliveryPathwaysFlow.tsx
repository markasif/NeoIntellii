"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AI_DELIVERY_TEAMS, ECOSYSTEM_LINKS } from "@/lib/aiDeliveryTeams";
import ProductionCapabilitySvg from "./ProductionCapabilitySvg";
import AiDeliveryTeamSvg from "./AiDeliveryTeamSvg";

interface PathwayCard {
  id: string;
  title: string;
  desc: string;
  href: string;
}

const pathwayCards: PathwayCard[] = [
  {
    id: "dedicated",
    title: "Continue the delivery team",
    desc: "The roadmap keeps producing work and the team keeps context across releases, maintaining the engineering momentum that makes each iteration faster.",
    href: AI_DELIVERY_TEAMS.dedicated,
  },
  {
    id: "transfer",
    title: "Build your internal team",
    desc: "Recruit and technically validate permanent roles directly onto your payroll, pair them with the team, and progressively transfer ownership.",
    href: AI_DELIVERY_TEAMS.transfer,
  },
  {
    id: "micro-gcc",
    title: "AI Micro GCC",
    desc: "Establish a lean, owned India capability centre of your own from 8 to 50 specialists with dedicated operational and facility infrastructure.",
    href: ECOSYSTEM_LINKS.microGcc,
  },
  {
    id: "ai-gcc",
    title: "AI GCC",
    desc: "A complete enterprise AI capability centre operating with its own governance framework, talent pipelines, and scaled operating model.",
    href: ECOSYSTEM_LINKS.aiGcc,
  },
];

const VIEWBOX_W = 1200;
const VIEWBOX_H = 480;

export default function AiDeliveryPathwaysFlow() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const teamColRef = useRef<HTMLDivElement>(null);
  const hubColRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  const [teamToHubPath, setTeamToHubPath] = useState("M 365 215 L 425 215");
  const [rightPaths, setRightPaths] = useState([
    "M 725 215 C 785 215, 815 54, 856 54",
    "M 725 215 C 780 215, 815 176, 856 176",
    "M 725 215 C 780 215, 815 298, 856 298",
    "M 725 215 C 785 215, 815 420, 856 420",
  ]);

  const computePaths = useCallback(() => {
    const svg = svgRef.current;
    const team = teamColRef.current;
    const hub = hubColRef.current;
    if (!svg || !team || !hub) return;

    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;

    const scaleX = VIEWBOX_W / svgRect.width;
    const scaleY = VIEWBOX_H / svgRect.height;

    const teamRect = team.getBoundingClientRect();
    const hubRect = hub.getBoundingClientRect();

    const t2hStartX = (teamRect.right - svgRect.left) * scaleX;
    const t2hStartY = (teamRect.top + teamRect.height / 2 - svgRect.top) * scaleY;
    const t2hEndX   = (hubRect.left - svgRect.left) * scaleX;
    const t2hEndY   = (hubRect.top + hubRect.height / 2 - svgRect.top) * scaleY;
    setTeamToHubPath(`M ${t2hStartX.toFixed(1)} ${t2hStartY.toFixed(1)} L ${t2hEndX.toFixed(1)} ${t2hEndY.toFixed(1)}`);

    const originX = (hubRect.right - svgRect.left) * scaleX;
    const originY = (hubRect.top + hubRect.height / 2 - svgRect.top) * scaleY;

    const newPaths = cardRefs.current.map((ref) => {
      if (!ref) return "";
      const r = ref.getBoundingClientRect();
      const endX = (r.left - svgRect.left) * scaleX;
      const endY = (r.top + r.height / 2 - svgRect.top) * scaleY;
      const cp1X = originX + 55;
      const cp1Y = originY;
      const cp2X = endX - 42;
      const cp2Y = endY;
      return `M ${originX.toFixed(1)} ${originY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
    });
    setRightPaths(newPaths);
  }, []);

  useEffect(() => {
    const timer = setTimeout(computePaths, 200);
    const observer = new ResizeObserver(computePaths);
    if (svgRef.current) observer.observe(svgRef.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [computePaths]);

  return (
    <div className="relative w-full bg-transparent select-none py-2">

      {/* DESKTOP xl+ */}
      <div className="hidden xl:block relative min-h-[480px]">
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <marker id="cyan-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M 2 2 L 10 6 L 2 10" stroke="#00D2FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </marker>
            <marker id="cyan-arrow-active" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto">
              <path d="M 2 2 L 10 6 L 2 10" stroke="#00E5FF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </marker>
          </defs>

          <path d={teamToHubPath} stroke="#00D2FF" strokeWidth={1.8} strokeOpacity={0.85} strokeLinecap="round" markerEnd="url(#cyan-arrow)" />

          {rightPaths.map((d, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            return (
              <path
                key={`path-${idx}`}
                d={d}
                stroke="#00D2FF"
                strokeWidth={isHovered ? 2.8 : 1.8}
                strokeOpacity={isHovered ? 1 : isAnyHovered ? 0.25 : 0.85}
                strokeLinecap="round"
                markerEnd={isHovered ? "url(#cyan-arrow-active)" : "url(#cyan-arrow)"}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        <div className="w-[1200px] max-w-full mx-auto relative min-h-[480px] flex items-center">

          <div ref={teamColRef} className="w-[360px] flex-shrink-0 flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center w-full">
              <div className="h-[205px] w-full flex items-center justify-center mb-1">
                <AiDeliveryTeamSvg className="max-h-full max-w-full" />
              </div>
              <div className="text-center mt-2.5">
                <p className="text-white font-manrope font-bold text-xl tracking-tight leading-tight">AI Delivery</p>
                <p className="text-[#00D2FF] font-manrope font-bold text-xl tracking-tight leading-tight">Team</p>
              </div>
            </div>
          </div>

          <div ref={hubColRef} className="w-[295px] flex-shrink-0 flex flex-col items-center justify-center text-center ml-[70px]">
            <div className="flex flex-col items-center w-full">
              <div className="h-[205px] w-full flex items-center justify-center mb-1">
                <ProductionCapabilitySvg className="max-h-full max-w-full" />
              </div>
              <div className="text-center mt-2.5">
                <p className="text-white font-manrope font-bold text-xl tracking-tight leading-tight">Production</p>
                <p className="text-[#00D2FF] font-manrope font-bold text-xl tracking-tight leading-tight">capability</p>
              </div>
            </div>
          </div>

          <div className="w-[340px] flex-shrink-0 flex flex-col justify-between py-1 min-h-[460px] ml-[135px]">
            {pathwayCards.map((card, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div key={card.id} ref={(el) => { cardRefs.current[idx] = el; }}>
                  <Link
                    to={card.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`group relative block rounded-xl p-3.5 transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? "bg-[#00D2FF]/10 border border-[#00D2FF]/40 shadow-[0_0_28px_rgba(0,210,255,0.18)] translate-x-1.5"
                        : "bg-transparent border border-transparent"
                    }`}
                  >
                    <h4 className={`font-manrope font-bold text-base leading-snug transition-all duration-300 ${isHovered ? "text-[#00D2FF]" : "text-white"}`}>
                      {card.title}
                    </h4>
                    <p className={`text-[13px] leading-relaxed mt-1 font-normal transition-all duration-300 ${isHovered ? "text-[#E0F7FF]" : "text-[#A5BEE0]"}`}>
                      {card.desc}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TABLET and MOBILE below xl */}
      <div className="block xl:hidden space-y-5">

        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
          <div className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:flex-1 text-center">
            <div className="h-[130px] sm:h-[150px] w-full flex items-center justify-center">
              <AiDeliveryTeamSvg className="max-h-full max-w-full" />
            </div>
            <p className="text-white font-manrope font-bold text-base leading-tight">
              AI Delivery <span className="text-[#00D2FF]">Team</span>
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-center justify-center gap-1 flex-shrink-0 px-1">
            <div className="w-[2px] h-8 bg-gradient-to-b from-[#00D2FF] to-transparent" />
            <span className="text-[#00D2FF] text-sm rotate-90 inline-block">&#9658;</span>
          </div>
          <div className="flex sm:hidden items-center justify-center gap-1">
            <div className="h-[2px] w-10 bg-gradient-to-r from-[#00D2FF] to-transparent" />
            <span className="text-[#00D2FF] text-sm">&#9658;</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:flex-1 text-center">
            <div className="h-[130px] sm:h-[150px] w-full flex items-center justify-center">
              <ProductionCapabilitySvg className="max-h-full max-w-full" />
            </div>
            <div>
              <p className="text-white font-manrope font-bold text-base leading-tight">
                Production <span className="text-[#00D2FF]">capability</span>
              </p>
              <div className="h-[2px] w-7 bg-[#00D2FF] rounded-full mx-auto mt-1.5" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00D2FF]/30" />
          <span className="text-[10px] tracking-widest uppercase font-mono text-[#38BDF8] font-bold whitespace-nowrap">
            Evolution Pathways
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#00D2FF]/30" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pathwayCards.map((card) => (
            <Link
              key={card.id}
              to={card.href}
              className="group block p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-[#00D2FF]/10 hover:border-[#00D2FF]/40 hover:shadow-[0_0_20px_rgba(0,210,255,0.15)] transition-all duration-300"
            >
              <h4 className="font-manrope font-bold text-white text-sm sm:text-base group-hover:text-[#00D2FF] transition-colors flex items-center justify-between gap-2">
                <span>{card.title}</span>
                <ChevronRight className="w-4 h-4 text-[#38BDF8] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 flex-shrink-0 transition-all" />
              </h4>
              <p className="text-[#A5BEE0] text-xs leading-relaxed mt-1.5 font-normal group-hover:text-[#E0F7FF] transition-colors">
                {card.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}