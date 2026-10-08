import { ShieldCheck, ShoppingCart, Wallet, type LucideIcon } from "lucide-react";

/**
 * Industry content for /lp/finance-procurement-shared-services-india.
 *
 * The industry block is swappable: healthcare ships first, and a second or
 * third vertical is added by appending an entry here rather than by editing
 * the page. The page renders whichever entry its INDUSTRY constant names.
 */

/**
 * Which compliance story to show. An Indian group cares about GST, TDS and MCA
 * filings; a foreign parent cares about group reporting. The two audiences run
 * on different ad groups, so the block shows one, never both.
 *
 * VERIFY before launch: which variant each ad group points at.
 */
export type ReportingVariant = "india-group" | "foreign-parent";

export type IndustryPillar = {
  icon: LucideIcon;
  title: string;
  points: string[];
};

export type IndustryContent = {
  key: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Pillar bodies that do not change with the reporting variant. */
  pillars: IndustryPillar[];
  /** The one line that differs between an Indian group and a foreign parent. */
  reporting: Record<ReportingVariant, string>;
};

const HEALTHCARE: IndustryContent = {
  key: "healthcare",
  eyebrow: "Industry",
  heading: "For hospital and clinic networks",
  intro:
    "Multi-unit networks carry the same finance and procurement work in every location. One hub does it once, to one standard.",
  pillars: [
    {
      icon: Wallet,
      title: "Finance hub",
      points: [
        "Consolidate billing, claims, record to report, FP&A, treasury and statutory compliance across units.",
        "Real-time CFO visibility across every unit.",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Procurement hub",
      points: [
        "Central vendor onboarding, contract management and POs for medical supplies and equipment.",
        "Supplier risk management.",
        "Bulk purchasing and category management.",
        "Integration with digital procurement platforms.",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Governance",
      points: [
        "Service catalogue, SLAs and pod-based teams.",
        // VERIFY before launch: name the specific healthcare regulations we will
        // align to. Until confirmed, this stays deliberately non-specific.
        "Controls aligned to the regulatory obligations your units already carry.",
      ],
    },
  ],
  reporting: {
    "india-group": "Standardise GST, TDS and MCA filings across the group.",
    "foreign-parent": "Standardise group reporting into your overseas parent.",
  },
};

/** Every industry the block can render. Add a vertical by appending to this map. */
export const INDUSTRIES: Record<string, IndustryContent> = {
  healthcare: HEALTHCARE,
};
