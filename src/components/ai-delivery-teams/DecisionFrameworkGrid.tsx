"use client";

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface DecisionFrameworkItem {
  title: string;
  description: string;
  href?: string;
}

export interface DecisionFrameworkGridProps {
  leftTitle: string;
  leftItems: DecisionFrameworkItem[];
  rightTitle: string;
  rightItems: DecisionFrameworkItem[];
  rightFooter?: ReactNode;
  className?: string;
}

export default function DecisionFrameworkGrid({
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
  rightFooter,
  className = "",
}: DecisionFrameworkGridProps) {
  return (
    <div className={`grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch ${className}`}>
      {/* Left Column (Transparent / Light Canvas) */}
      <div className="flex flex-col h-full text-[#081B3E]">
        <div className="bg-transparent px-5 py-3.5 border-b border-black/10 shrink-0">
          <p className="text-2xs uppercase tracking-[0.18em] text-[#081B3E] font-bold">
            {leftTitle}
          </p>
        </div>
        <dl className="flex-1 flex flex-col">
          {leftItems.map((item) => (
            <div
              key={item.title}
              className="group flex flex-1 items-stretch bg-transparent hover:bg-black/[0.02] transition-colors duration-200"
            >
              <div className="px-5 py-4 flex flex-col justify-center flex-1">
                <dt className="text-[#081B3E] font-bold font-manrope text-sm sm:text-base mb-1">
                  {item.title}
                </dt>
                <dd className="text-[#505D74] text-xs sm:text-sm leading-relaxed font-normal">
                  {item.description}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {/* Right Column (Navy Blue Rectangle Shape) */}
      <div className="flex flex-col h-full bg-[#081B3E] text-white shadow-lg shadow-[#081B3E]/10">
        <div className="bg-transparent px-5 py-3.5 border-b border-white/10 shrink-0">
          <p className="text-2xs uppercase tracking-[0.18em] text-[#38BDF8] font-bold">
            {rightTitle}
          </p>
        </div>
        <ul className="flex-1 flex flex-col divide-y divide-white/10 list-none p-0 m-0">
          {rightItems.map((item) => (
            <li key={item.title} className="flex flex-1">
              {item.href ? (
                <Link
                  to={item.href}
                  className="group flex flex-1 items-stretch bg-transparent hover:bg-white/[0.04] transition-colors duration-200"
                >
                  <div className="flex flex-1 items-center justify-between gap-3 px-5 py-4">
                    <div>
                      <span className="block text-white font-bold font-manrope text-sm sm:text-base mb-1 group-hover:text-[#38BDF8] transition-colors">
                        {item.title}
                      </span>
                      <span className="block text-white/70 text-xs sm:text-sm leading-relaxed font-normal">
                        {item.description}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#38BDF8]/60 group-hover:text-[#38BDF8] shrink-0 transition-all group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ) : (
                <div className="flex flex-1 items-center justify-between gap-3 px-5 py-4 bg-transparent hover:bg-white/[0.04] transition-colors duration-200">
                  <div>
                    <span className="block text-white font-bold font-manrope text-sm sm:text-base mb-1">
                      {item.title}
                    </span>
                    <span className="block text-white/70 text-xs sm:text-sm leading-relaxed font-normal">
                      {item.description}
                    </span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {rightFooter && (
          <div className="px-5 py-4 border-t border-white/10 shrink-0">
            {rightFooter}
          </div>
        )}
      </div>
    </div>
  );
}
