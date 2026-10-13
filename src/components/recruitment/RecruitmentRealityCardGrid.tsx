import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Landmark,
  Stethoscope,
  Cpu,
  Factory,
  ShoppingBag,
  TrendingUp,
  Building2,
  Layers,
  ShieldCheck,
  Code2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RealityCardItem {
  name: string;
  href: string;
  image: string;
  icon: LucideIcon;
  subtitle?: string;
}

export const RECRUITMENT_INDUSTRIES: RealityCardItem[] = [
  {
    name: "BFSI",
    href: "/industries/bfsi-gcc",
    image: "/images/industries/crisp_fin.webp",
    icon: Landmark,
    subtitle: "Banking & FinTech",
  },
  {
    name: "Healthcare",
    href: "/industries/healthcare-gcc",
    image: "/images/industries/crisp_health.webp",
    icon: Stethoscope,
    subtitle: "Life Sciences & Health",
  },
  {
    name: "Technology",
    href: "/industries/technology-gcc",
    image: "/images/industries/crisp_saas.webp",
    icon: Cpu,
    subtitle: "SaaS & Cloud Platforms",
  },
  {
    name: "Manufacturing",
    href: "/industries/manufacturing-gcc",
    image: "/images/industries/crisp_mfg.webp",
    icon: Factory,
    subtitle: "Industry 4.0 & Auto",
  },
  {
    name: "Retail",
    href: "/industries/retail-gcc",
    image: "/images/industries/crisp_retail.webp",
    icon: ShoppingBag,
    subtitle: "Consumer & E-Commerce",
  },
  {
    name: "Private Equity",
    href: "/industries/private-equity-gcc",
    image: "/images/industries/crisp_pe.webp",
    icon: TrendingUp,
    subtitle: "PortCo Rapid Scale",
  },
];

export const RECRUITMENT_CITIES: RealityCardItem[] = [
  {
    name: "Bangalore",
    href: "/contact",
    image: "/images/gcc_cta_skyscraper.webp",
    icon: Building2,
    subtitle: "Tech & AI Capital",
  },
  {
    name: "Hyderabad",
    href: "/contact",
    image: "/images/gcc-operations/standards/continuity_building.webp",
    icon: Layers,
    subtitle: "HITEC City Enterprise",
  },
  {
    name: "Mumbai",
    href: "/contact",
    image: "/images/gcc-setup/02-entity-compliance.webp",
    icon: Landmark,
    subtitle: "BFSI & Commercial Hub",
  },
  {
    name: "Delhi NCR",
    href: "/contact",
    image: "/images/blueprint_advisory_workspace.webp",
    icon: ShieldCheck,
    subtitle: "Cyber Hub & Corporate",
  },
  {
    name: "Pune",
    href: "/contact",
    image: "/images/saas_realistic.webp",
    icon: Code2,
    subtitle: "Engineering & R&D",
  },
  {
    name: "Chennai",
    href: "/contact",
    image: "/images/gcc-operations/standards/enterprise-network.webp",
    icon: Cpu,
    subtitle: "SaaS & Global Centers",
  },
];

interface RecruitmentRealityCardGridProps {
  items: RealityCardItem[];
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

export default function RecruitmentRealityCardGrid({
  items,
  columns = 6,
  className = "",
}: RecruitmentRealityCardGridProps) {
  const gridColsClass =
    columns === 6
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-3.5 sm:gap-4 max-w-7xl mx-auto ${className}`}>
      {items.map((item) => (
        <motion.div
          key={item.name}
          whileHover={{ y: -3 }}
          className="h-full"
        >
          <Link
            to={item.href}
            className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)] min-h-[110px] sm:min-h-[118px] h-full text-left"
          >
            {/* Background Image with Editorial Navy Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-right opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/85 to-[#0A224E]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/90 via-transparent to-transparent" />
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
            </div>

            {/* Cyan accent bar (no numbers) */}
            <div className="relative z-10 w-5 h-[2px] bg-[#38BDF8]/60 rounded-full group-hover:w-9 group-hover:bg-[#38BDF8] transition-all duration-300" />

            {/* Title & Subtitle */}
            <div className="relative z-10 max-w-[76%] mt-2">
              <h4 className="text-white font-bold text-sm sm:text-[15px] leading-snug tracking-tight font-manrope group-hover:text-[#BAE6FD] transition-colors">
                {item.name}
              </h4>
              {item.subtitle && (
                <p className="text-[#88A4C8] text-[11px] sm:text-xs font-normal mt-0.5 line-clamp-1 group-hover:text-[#E0F2FE] transition-colors">
                  {item.subtitle}
                </p>
              )}
            </div>

            {/* Circular Icon in Bottom Right */}
            <div className="absolute right-3.5 bottom-3.5 z-10">
              <div className="w-8 h-8 rounded-full bg-[#051329]/90 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
                <item.icon className="w-4 h-4 stroke-[1.8] text-[#38BDF8]" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
