"use client";

import type { ElementType } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertCircle } from "lucide-react";

export interface WrongAnswerItem {
  situation: string;
  alternative: string;
  href: string;
  label: string;
  icon?: ElementType;
}

interface WrongAnswerCardsProps {
  items: WrongAnswerItem[];
  className?: string;
}

export default function WrongAnswerCards({ items, className = "" }: WrongAnswerCardsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => {
        const IconComponent = item.icon || AlertCircle;
        return (
          <Link
            key={item.situation}
            to={item.href}
            className="group relative block bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(8,27,62,0.06)] hover:border-slate-300 transition-all duration-200 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-stretch">
              {/* Left Side: Icon & Situation */}
              <div className="flex items-center gap-4 sm:gap-5 py-4 sm:py-5 px-5 sm:px-6 md:w-[48%] lg:w-[49%] shrink-0">
                <div className="w-12 h-12 rounded-xl bg-[#EDF4FE] flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 text-[#081B3E]" strokeWidth={2} />
                </div>
                <p className="text-[#081B3E] font-bold text-sm sm:text-base leading-snug">
                  {item.situation}
                </p>
              </div>

              {/* Slanted / Chevron Divider Line (Visible on md+) */}
              <div className="hidden md:block relative w-8 self-stretch shrink-0 overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 32 100"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <polyline
                    points="4,0 28,50 4,100"
                    stroke="#D2DCF0"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Mobile Horizontal Divider */}
              <div className="block md:hidden border-t border-slate-100 mx-5" />

              {/* Right Side: Alternative & Recommendation Link */}
              <div className="flex items-center justify-between gap-4 flex-1 py-4 sm:py-5 px-5 sm:px-6">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-[#505D74] font-normal leading-normal">
                    {item.alternative}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-bold text-[#008EC4] group-hover:text-[#008EC4] transition-colors">
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#081B3E] group-hover:text-[#008EC4] group-hover:translate-x-1 transition-all" strokeWidth={2.2} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
