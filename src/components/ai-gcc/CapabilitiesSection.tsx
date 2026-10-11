"use client";

import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Settings,
  Users,
  UserCheck,
  Laptop,
  Server,
  Layers,
  BarChart3,
  ExternalLink,
  Boxes,
  MessageSquareCode,
  Bot,
  Workflow,
  Sparkles,
  Activity,
  Shield,
  Coins,
  FileCheck,
  Database,
  Sliders,
  ShieldCheck,
  Crosshair,
  Globe,
  AlertCircle,
  FileText,
  TrendingUp,
  Cpu,
  Zap,
  HardDrive,
  LucideIcon,
} from "lucide-react";
import Section from "./Section";

export interface CapabilityLink {
  path: string;
  anchor: string;
}

export interface CapabilityItem {
  title: string;
  body?: string;
  desc?: string;
  links?: CapabilityLink[];
  icon?: LucideIcon;
}

export interface CapabilitiesSectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  items: CapabilityItem[];
  columns?: 2 | 3 | 4;
  navigation?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Intelligent icon resolver mapping capability titles to crisp navy line icons
 * matching the visual reference in the design system.
 */
function resolveIcon(title: string, customIcon?: LucideIcon): LucideIcon {
  if (customIcon) return customIcon;
  const t = title.toLowerCase();

  if (t.includes("advisory") || t.includes("strategy")) return Brain;
  if (t.includes("setup") || t.includes("operations")) return Settings;
  if (t.includes("recruitment") || t.includes("hiring") || t.includes("hirex")) return Users;
  if (t.includes("people") || t.includes("hr")) return UserCheck;
  if (t.includes("workspace") || t.includes("development environment")) return Laptop;
  if (t.includes("gpu") || t.includes("infrastructure") || t.includes("compute")) return Server;
  if (t.includes("genai") || t.includes("data,") || t.includes("training")) return Layers;
  if (t.includes("observability") || t.includes("agentops") || t.includes("metrics")) return BarChart3;
  if (t.includes("scale") || t.includes("bot &") || t.includes("ownership")) return ExternalLink;

  // MLOps Lifecycle
  if (t.includes("prompt")) return MessageSquareCode;
  if (t.includes("agent")) return Bot;
  if (t.includes("ci/cd") || t.includes("pipeline")) return Workflow;
  if (t.includes("continuous evaluation") || t.includes("eval")) return Sparkles;
  if (t.includes("observability") || t.includes("drift") || t.includes("monitor")) return Activity;
  if (t.includes("reliability")) return Shield;
  if (t.includes("finops") || t.includes("cost")) return Coins;
  if (t.includes("governance integration") || t.includes("evidence")) return FileCheck;
  if (t.includes("model")) return Boxes;

  // AI Governance
  if (t.includes("inventory")) return Database;
  if (t.includes("risk classification")) return Sliders;
  if (t.includes("policy") || t.includes("control")) return ShieldCheck;
  if (t.includes("red team") || t.includes("testing")) return Crosshair;
  if (t.includes("third-party") || t.includes("vendor")) return Globe;
  if (t.includes("incident")) return AlertCircle;
  if (t.includes("board") || t.includes("audit") || t.includes("reporting")) return FileText;

  // Infrastructure
  if (t.includes("capacity") || t.includes("workload")) return TrendingUp;
  if (t.includes("sourcing")) return Cpu;
  if (t.includes("inference") || t.includes("latency")) return Zap;
  if (t.includes("storage") || t.includes("network")) return HardDrive;
  if (t.includes("security")) return ShieldCheck;

  return Layers;
}

/**
 * Universal Capabilities / Operating System component:
 * - Crisp rectangular white card surfaces with rounded-none (no round corners)
 * - Prominent deep navy line icon at the top-left of each card
 * - Bold navy typography with slate body text
 * - Conditionally renders navigation links with arrow ("Explore ... →") at the bottom
 * - Smooth hover elevation and responsive layout
 */
export default function CapabilitiesSection({
  id,
  eyebrow,
  title,
  lead,
  items = [],
  columns = 3,
  navigation,
  footer,
  children,
  className = "",
}: CapabilitiesSectionProps) {
  const gridCols =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const content = (
    <>
      <div className={`grid ${gridCols} gap-5 lg:gap-6 ${className}`}>
        {items.map((item, index) => {
          const text = item.body ?? item.desc ?? "";
          const Icon = resolveIcon(item.title, item.icon);

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: (index % columns) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-none bg-white border border-[#D5E1F2] p-6 sm:p-7 shadow-[0_2px_12px_rgba(13,48,108,0.03)] hover:shadow-[0_12px_32px_rgba(13,48,108,0.08)] hover:border-[#1351D8]/40 transition-all duration-300 flex flex-col justify-between text-center md:text-left"
            >
              <div>
                {/* Icon - centered on mobile, left on desktop */}
                <div className="mb-4 flex items-center justify-center md:justify-start">
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-[#0D306C] stroke-[1.8] transition-transform duration-300 group-hover:scale-105" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-[18px] font-bold text-[#0D244D] tracking-tight mb-2.5 leading-snug group-hover:text-[#1351D8] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                {text && (
                  <p className="text-xs sm:text-[13.5px] text-[#505D74] leading-relaxed font-normal">
                    {text}
                  </p>
                )}
              </div>

              {/* Contextual Navigation Links (rendered only when provided) */}
              {item.links && item.links.length > 0 && (
                <div className="pt-5 mt-auto flex flex-col space-y-2">
                  {item.links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="group/link inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1351D8] hover:text-[#0D244D] transition-colors"
                    >
                      <span>{link.anchor}</span>
                      <span className="text-sm transition-transform duration-200 group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Optional Navigation / Footer below the grid */}
      {navigation && <div className="mt-8 text-center">{navigation}</div>}
      {footer && <div className="mt-8 text-center">{footer}</div>}
      {children}
    </>
  );

  // If section heading details are passed, wrap in Section
  if (id || title || eyebrow) {
    return (
      <Section id={id} eyebrow={eyebrow} title={title} lead={lead} width="wide" align="center">
        {content}
      </Section>
    );
  }

  return content;
}
