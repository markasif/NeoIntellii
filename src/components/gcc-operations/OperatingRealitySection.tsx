"use client";

import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserPlus,
  IndianRupee,
  Heart,
  Lock,
  Laptop,
  Handshake,
  BarChart3,
  FileText,
  AlertTriangle,
  Users,
  TrendingUp,
  FileCheck,
  Puzzle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export interface OperatingRealityItem {
  number?: string;
  title: string;
  image?: string;
  icon: LucideIcon;
  /** Optional supporting line. Omitted on the original operating-reality cards. */
  desc?: string;
  /** Optional route — renders the whole card as a link. */
  href?: string;
}

export const operatingRealityItems: OperatingRealityItem[] = [
  {
    number: "01",
    title: "Employees join",
    image: "/images/gcc-operations/operating-reality/01-employees.webp",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Payroll starts",
    image: "/images/gcc-operations/operating-reality/02-payroll.webp",
    icon: IndianRupee,
  },
  {
    number: "03",
    title: "Benefits need administration",
    image: "/images/gcc-operations/operating-reality/03-benefits.webp",
    icon: Heart,
  },
  {
    number: "04",
    title: "Access needs control",
    image: "/images/gcc-operations/operating-reality/04-access.webp",
    icon: Lock,
  },
  {
    number: "05",
    title: "Devices need support",
    image: "/images/gcc-operations/operating-reality/05-devices.webp",
    icon: Laptop,
  },
  {
    number: "06",
    title: "Vendors need management",
    image: "/images/gcc-operations/operating-reality/06-vendors.webp",
    icon: Handshake,
  },
  {
    number: "07",
    title: "Performance needs measurement",
    image: "/images/gcc-operations/operating-reality/07-performance.webp",
    icon: BarChart3,
  },
  {
    number: "08",
    title: "HQ needs reporting",
    image: "/images/gcc-operations/operating-reality/08-reporting.webp",
    icon: FileText,
  },
  {
    number: "09",
    title: "Risk needs monitoring",
    image: "/images/gcc-operations/operating-reality/09-risk.webp",
    icon: AlertTriangle,
  },
  {
    number: "10",
    title: "New roles need hiring",
    image: "/images/gcc-operations/operating-reality/10-hiring.webp",
    icon: UserPlus,
  },
  {
    number: "11",
    title: "Leadership needs workforce data",
    image: "/images/gcc-operations/operating-reality/11-leadership.webp",
    icon: Users,
  },
  {
    number: "12",
    title: "Headcount grows",
    image: "/images/gcc-operations/operating-reality/12-headcount.webp",
    icon: TrendingUp,
  },
  {
    number: "13",
    title: "New mandates arrive",
    image: "/images/gcc-operations/operating-reality/13-mandates.webp",
    icon: FileCheck,
  },
  {
    number: "14",
    title: "BOT may eventually occur",
    image: "/images/gcc-operations/operating-reality/14-bot.webp",
    icon: Puzzle,
  },
];

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function OperatingRealityImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-right opacity-50 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Editorial Navy Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/85 to-[#0A224E]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/90 via-transparent to-transparent" />
      {/* Subtle Cyan Corner Ambient Lighting */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
    </div>
  );
}

export function OperatingRealityIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="absolute right-3.5 bottom-3.5 sm:right-4 sm:bottom-4 z-10">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#051329]/85 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
        <Icon className="w-4 h-4 stroke-[1.8] text-[#38BDF8]" />
      </div>
    </div>
  );
}

export function OperatingRealityCard({ item }: { item: OperatingRealityItem }) {
  const card = (
    <motion.div
      variants={cardVariants}
      className={`group relative rounded-2xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.12)] ${item.desc ? "h-full" : "h-[140px] sm:h-[150px] lg:h-[155px]"
        }`}
    >
      {item.image && <OperatingRealityImage src={item.image} alt={item.title} />}

      {/* Card Content (Relative z-10 to stay crisp above overlay) */}
      <div className="relative z-10 select-none flex flex-col items-start">
        {item.number ? (
          <>
            <span
              className="font-mono text-2xl sm:text-3xl lg:text-[32px] tracking-tight block leading-none font-bold"
              style={{
                WebkitTextStroke: "1.5px #38BDF8",
                color: "transparent",
              }}
            >
              {item.number}
            </span>
            <div className="w-6 sm:w-7 h-[2px] bg-[#38BDF8]/65 mt-1.5 mb-2 rounded-full" />
          </>
        ) : (
          <div className="w-6 sm:w-7 h-[2px] bg-[#38BDF8]/65 mb-2 rounded-full" />
        )}
      </div>

      <div className="relative z-10 max-w-[80%]">
        <h4 className="text-white font-bold text-sm sm:text-[15px] lg:text-[16px] leading-snug tracking-tight group-hover:text-white transition-colors">
          {item.title}
        </h4>
        {item.desc ? (
          <p className="text-[#C5D7F0] text-[11px] sm:text-xs leading-relaxed font-normal mt-1.5">
            {item.desc}
          </p>
        ) : null}
      </div>

      <OperatingRealityIcon icon={item.icon} />
    </motion.div>
  );

  if (item.href) {
    return (
      <Link
        to={item.href}
        className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081B3E]"
      >
        {card}
      </Link>
    );
  }

  return card;
}

export function OperatingRealityStatement({
  statement = "The operating model must scale with all of this.",
  subtext = "If it does not, leadership ends up running the scaffolding instead of the mandate.",
}: {
  statement?: string;
  subtext?: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/35 hover:border-[#38BDF8]/65 bg-[#051329] p-5 sm:p-6 lg:p-7 col-span-1 sm:col-span-2 lg:col-span-2 h-[140px] sm:h-[150px] lg:h-[155px] flex items-center justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)]"
    >
      {/* Background Globe visual on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-2/5 sm:w-1/2 pointer-events-none overflow-hidden flex items-center justify-end">
        <div className="relative w-full h-full opacity-65 mix-blend-screen transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src="/images/gcc-operations/operating-reality/globe.webp"
            alt="Operating Model Global Scale"
            fill
            className="object-contain object-right"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/60 to-transparent" />
      </div>

      {/* Left Arrow + Divider + Statement Content */}
      <div className="relative z-10 flex items-center gap-3.5 sm:gap-5 max-w-[85%] sm:max-w-[78%]">
        <div className="shrink-0 text-[#38BDF8] flex items-center justify-center">
          <ArrowRight
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2.2}
          />
        </div>

        <div className="h-9 sm:h-11 w-[1px] bg-[#38BDF8]/35 shrink-0" />

        <div className="flex flex-col justify-center">
          <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] tracking-tight leading-snug">
            {statement}
          </h3>
          {subtext && (
            <p className="text-[#94A3B8] text-[11px] sm:text-xs font-normal leading-relaxed mt-1">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function OperatingRealitySection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4.5 max-w-7xl mx-auto"
      aria-label="What arrives after launch"
    >
      {operatingRealityItems.map((item) => (
        <OperatingRealityCard key={item.number} item={item} />
      ))}
      <OperatingRealityStatement />
    </motion.div>
  );
}
