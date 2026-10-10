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

              {/* Slanted / Chevron Arrow (Visible on md+) — navy filled so the sharp arrow area carries the panel colour */}
              <div className="hidden md:block relative w-8 self-stretch shrink-0 overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 32 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M -1,0 L 30,50 L -1,100 Z M 12,0 L 31,50 L 12,100 Z"
                    fill="#081B3E"
                    fillRule="evenodd"
                  />
                </svg>
              </div>

              {/* Mobile Horizontal Divider */}
              <div className="block md:hidden border-t border-slate-100 mx-5" />

              {/* Right Side: Alternative & Recommendation Link (navy panel) */}
              <div className="flex items-center justify-between gap-4 flex-1 py-4 sm:py-5 px-5 sm:px-6 bg-[#081B3E]">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-[#C5D7F0] font-normal leading-normal">
                    {item.alternative}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-bold text-[#38BDF8] group-hover:text-white transition-colors">
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:text-white group-hover:translate-x-1 transition-all" strokeWidth={2.2} />
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
