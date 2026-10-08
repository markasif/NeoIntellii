"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface ImageFeatureCardItem {
  eyebrow?: string;
  title: string;
  desc?: string;
  body?: string;
  items?: string[];
  image: string;
  imageAlt?: string;
  href?: string;
  linkLabel?: string;
  cta?: { label: string; href: string };
}

export interface ImageFeatureCardGridProps {
  items: ImageFeatureCardItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export default function ImageFeatureCardGrid({
  items,
  className = "",
  columns = 3,
}: ImageFeatureCardGridProps) {
  const colClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${colClass} gap-5 lg:gap-8 items-stretch max-w-6xl mx-auto ${className}`}>
      {items.map((stage, idx) => {
        const linkHref = stage.cta?.href || stage.href;
        const linkText = stage.cta?.label || stage.linkLabel;
        const isExternal = linkHref?.startsWith("http");

        const cardBody = (
          <div className="flex flex-col h-full justify-between">
            {/* TOP WHITE CONTENT SECTION */}
            <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 bg-white">
              {/* Category Eyebrow in uppercase vibrant blue */}
              {stage.eyebrow && (
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#169DC8] mb-1.5 sm:mb-2">
                  {stage.eyebrow}
                </span>
              )}

              {/* Main Title */}
              <h3 className="text-xl sm:text-2xl lg:text-[23px] font-extrabold text-[#0D306C] tracking-tight leading-[1.25] group-hover:text-[#169DC8] transition-colors mb-2">
                {stage.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed mb-3">
                {stage.desc || stage.body}
              </p>

              {/* Optional checklist items */}
              {stage.items && stage.items.length > 0 && (
                <div className="pt-3 border-t border-[#E7EDF9] mt-auto">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-[13px] text-[#2B3D66] list-none p-0 m-0">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-medium">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#169DC8]" aria-hidden="true" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optional action link */}
              {linkText && (
                <div className="pt-3.5 border-t border-[#E7EDF9] mt-3">
                  <span className="text-xs sm:text-[13px] font-bold text-[#008EC4] group-hover:text-[#0D306C] transition-colors inline-flex items-center gap-1.5">
                    {linkText}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              )}
            </div>

            {/* BOTTOM IMAGE CONTAINER (Flush with bottom rounded corners) */}
            <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-[#081B3E] flex-shrink-0">
              <img
                src={stage.image}
                alt={stage.imageAlt || stage.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B3E]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        );

        return (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 text-left"
          >
            {linkHref ? (
              isExternal ? (
                <a href={linkHref} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {cardBody}
                </a>
              ) : (
                <Link to={linkHref} className="block h-full">
                  {cardBody}
                </Link>
              )
            ) : (
              cardBody
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
