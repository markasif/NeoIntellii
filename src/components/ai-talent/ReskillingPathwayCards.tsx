"use client";

import React from "react";
import { ArrowRight, Sparkles, Terminal, Database, Cpu, Bot, Shield, Layers } from "lucide-react";

interface ConversionItem {
  from: string;
  to: string;
  curriculum: string;
}

const CONVERSION_ICONS: Record<string, React.ElementType> = {
  "Backend Engineer": Terminal,
  "Data Engineer": Database,
  "DevOps Engineer": Cpu,
  "ML Engineer": Bot,
  "QA Engineer": Shield,
  "Architect": Layers,
};

export default function ReskillingPathwayCards({ conversions }: { conversions: string[][] }) {
  const items: ConversionItem[] = conversions.map(([from, to, curriculum]) => ({
    from,
    to,
    curriculum,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 select-none">
      {items.map((item, index) => {
        const Icon = CONVERSION_ICONS[item.from] || Sparkles;

        return (
          <div
            key={item.from}
            className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.07] hover:border-[#0e92b8]/50 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              {/* Header: Track Tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#0e92b8] font-bold bg-[#0e92b8]/10 px-2.5 py-0.5 rounded-full border border-[#0e92b8]/20">
                  Pathway 0{index + 1}
                </span>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E7EDF9] text-[#0D306C] group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Conversion Visual Flow: From -> To */}
              <div className="p-3.5 rounded-xl bg-[#F0F5FA] border border-[#CBD5E1]/60 mb-4">
                <div className="text-[11px] font-mono text-[#7B8B9E] uppercase tracking-wider font-semibold mb-1">
                  Current Role
                </div>
                <div className="text-sm font-bold text-[#415A77] line-through decoration-slate-400">
                  {item.from}
                </div>

                <div className="flex items-center gap-1.5 my-2 text-[#00A3E0]">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  <span className="text-[11px] font-bold uppercase tracking-wider font-mono">
                    Converts To
                  </span>
                </div>

                <div className="text-base font-extrabold text-[#0D306C] font-display">
                  {item.to}
                </div>
              </div>

              {/* Curriculum */}
              <div>
                <span className="text-[11px] font-mono uppercase text-[#0D306C] tracking-wider font-bold block mb-1.5">
                  Core Curriculum & Project Focus:
                </span>
                <p className="text-xs sm:text-[13px] text-[#415A77] leading-relaxed">
                  {item.curriculum}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-black/[0.05] flex items-center justify-between text-[11px] font-medium text-emerald-700">
              <span className="inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Validated Pass Bar</span>
              </span>
              <span className="text-slate-400">Production Project</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
