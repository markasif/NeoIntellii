import {
 Rocket, Users, Server, Activity, ShieldCheck,
 Brain, Workflow, Sparkles, Database, GitBranch, ScrollText,
 Cpu, LayoutGrid, Zap, Link2,
 Building2, HeartPulse, MonitorSmartphone, Factory, Briefcase, ShoppingBag,
 Info, BookOpen, FileText, Award, GraduationCap, Mail,
 Cloud, RefreshCw, FileSearch, Plug, UserPlus, UserCog, Repeat, Bot, Settings2,
 MessageSquare, FileCheck, CalendarCheck, BarChart3, UserCheck, Target, Wand2,
 type LucideIcon,
} from "lucide-react";
import { SERVICE_PILLARS, RESOURCE_LINKS, SOLUTION_GROUPS } from "@/data/serviceNav";

export type MegaLink = {
 label: string;
 href: string;
 desc?: string;
 icon?: LucideIcon;
 external?: boolean;
};

export type MegaColumn = {
 label: string;
 links: MegaLink[];
};

export type MegaFeatured = {
 eyebrow: string;
 title: string;
 desc: string;
 href: string;
 cta: string;
 links?: MegaLink[];
 bullets?: string[];
};

export type MegaItem = {
 /** How many link columns sit on one row. Defaults to one row of all columns. */
 columnsPerRow?: number;
 /**
  * Stretch the panel to the full viewport width (minus a small gutter) instead
  * of the default 1240px. Needed when a panel carries more than four columns.
  */
 wide?: boolean;
 /**
  * "cards" renders each link as the bordered card used by "What We Do": a
  * leading glyph (the step number, or the link icon when there is no number),
  * the label and its description. "links" is the standard row list. Shared so
  * the two menus cannot drift apart visually.
  */
 variant?: "cards" | "links";
 name: string;
 /**
  * Hub page for the top-level link. Omitted when no single page represents the
  * menu - the trigger is then a disclosure button rather than a link.
  */
 href?: string;
 external?: boolean;
 logo?: {
   src: string;
   alt: string;
   tagline: string;
   heading?: string;
   subheading?: string;
   description?: string;
   href: string;
 };
 columns: MegaColumn[];
 featured?: MegaFeatured;
};

/**
 * The two service menus answer different questions and must not blur into each
 * other. "What We Do" lists the six capability pillars, numbered. "Solutions"
 * lists nine curated entry points named after the buyer's problem, outcome or
 * starting point - not a second copy of the service taxonomy. Both are
 * generated from src/data/serviceNav.ts so navigation and the footer cannot
 * drift apart, and both render through the same card layout in MegaMenuPanel.
 */
const pad = (index: number) => String(index + 1).padStart(2, "0");

export const megaMenu: MegaItem[] = [
  {
    name: "What We Do",
    href: "/case-studies",
    variant: "cards",
    columns: [
      {
        label: "Six services, one operating model",
        links: SERVICE_PILLARS.map((pillar, index) => ({
          label: `${pad(index)}. ${pillar.name}`,
          href: pillar.href,
          desc: pillar.blurb,
          icon: pillar.icon,
        })),
      },
    ],
    featured: {
      eyebrow: "Our Approach",
      title: "The NeoIntelli Difference",
      desc: "Like traditional advisors - but we build, hire and operate the team, not just the slide deck.",
      href: "/case-studies",
      cta: "Learn about our approach",
      bullets: [
        "We ship production software, not slide decks",
        "We validate AI talent technically before you interview",
        "We train your team so you own it",
      ],
      links: RESOURCE_LINKS.slice(0, 3).map((link) => ({ label: link.label, href: link.href })),
    },
  },
  {
    name: "Solutions",
    // No /solutions hub page exists and this task does not create one, so the
    // trigger opens the panel instead of navigating. The nine destinations keep
    // their own canonical URLs - a page is not moved because it is featured
    // here.
    variant: "cards",
    // Three conceptual groups, three destinations each, on the standard 1240px
    // panel. No "Overview" rows: the headings are groupings, not landing pages.
    columnsPerRow: 3,
    columns: SOLUTION_GROUPS.map((group) => ({
      label: group.label,
      links: group.links.map((link) => ({
        label: link.label,
        href: link.href,
        desc: link.desc,
        icon: link.icon,
      })),
    })),
  },
  {
    name: "Product",
    href: "https://neohirex.ai/",
    external: true,
    logo: {
      // Self-hosted, user-supplied NeoHireX brand logo.
      src: "/images/neohirex-logo.webp",
      alt: "NeoHireX",
      tagline: "AI Hiring Operating System",
      heading: "AI Hiring Operating System",
      subheading: "From first resume to last contract - one AI platform runs it all.",
      description: "NeoHireX combines AI interviews, recruiter intelligence, offer management, skill tracking, and workforce analytics into a single operating system.",
      href: "https://neohirex.ai/",
    },
    columns: [
      {
        label: "Platform",
        links: [
          { label: "Platform overview", href: "https://neohirex.ai/platform", desc: "One platform for the entire hiring lifecycle.", icon: LayoutGrid, external: true },
          { label: "Agentic AI Interviews", href: "https://neohirex.ai/platform/ai-interviews", desc: "24/7 autonomous voice screenings with sentiment + skill analysis.", icon: MessageSquare, external: true },
          { label: "Applicant Tracking (ATS)", href: "https://neohirex.ai/platform/ats", desc: "Semantic resume processing and pipeline management.", icon: FileCheck, external: true },
          { label: "Offer Management", href: "https://neohirex.ai/platform/offer-management", desc: "Dynamic offer generation and digital acceptance.", icon: CalendarCheck, external: true },
          { label: "AI Process Automation", href: "https://neohirex.ai/platform/autopilot", desc: "Autopilot workflows that eliminate repetitive tasks.", icon: Wand2, external: true },
        ],
      },
      {
        label: "AI Agents",
        links: [
          { label: "Meet the AI Agents", href: "https://neohirex.ai/platform/ai-agents", desc: "18 specialized AI workers acting on your data 24/7.", icon: Bot, external: true },
          { label: "Workforce Intelligence", href: "https://neohirex.ai/platform/workforce-intelligence", desc: "Predictive analytics for churn and performance.", icon: BarChart3, external: true },
          { label: "Employee Lifecycle", href: "https://neohirex.ai/platform/employee-lifecycle", desc: "End-to-end management from onboarding to transition.", icon: UserCheck, external: true },
          { label: "Skill Management", href: "https://neohirex.ai/platform/skill-management", desc: "Live skill mapping and competency tracking.", icon: Target, external: true },
        ],
      },
      {
        label: "Trust & Resources",
        links: [
          { label: "Compliance & Security", href: "https://neohirex.ai/platform/compliance", desc: "SOC 2 ready architecture with full audit trails.", icon: ShieldCheck, external: true },
          { label: "DPDP Act 2023", href: "https://neohirex.ai/platform/compliance", desc: "Built ground-up for India's data protection law.", icon: ScrollText, external: true },
          { label: "Blog", href: "https://neohirex.ai/blog", desc: "Perspectives on AI hiring and recruitment ops.", icon: BookOpen, external: true },
          { label: "Book a demo", href: "/book-a-call?type=neohirex", desc: "30-min demo, no credit card required.", icon: Mail },
        ],
      },
    ],
  },
  {
    name: "Industries",
    href: "/industries",
    columns: [
      {
        label: "Regulated",
        links: [
          { label: "BFSI", href: "/industries/bfsi-gcc", desc: "Banks, capital markets, and insurance GCCs.", icon: Building2 },
          { label: "Healthcare", href: "/industries/healthcare-gcc", desc: "Payers, providers, and life sciences.", icon: HeartPulse },
          { label: "Private Equity", href: "/industries/private-equity-gcc", desc: "Value creation through portfolio GCCs.", icon: Briefcase },
        ],
      },
      {
        label: "Growth & Operations",
        links: [
          { label: "Technology", href: "/industries/technology-gcc", desc: "Software, SaaS, and platform companies.", icon: MonitorSmartphone },
          { label: "Manufacturing", href: "/industries/manufacturing-gcc", desc: "Industrial, automotive, and supply chain.", icon: Factory },
          { label: "Retail", href: "/industries/retail-gcc", desc: "Consumer, commerce, and omni-channel.", icon: ShoppingBag },
        ],
      },
    ],
    featured: {
      eyebrow: "By the numbers",
      title: "GCC India: cost & value",
      desc: "Benchmarks on what an India GCC actually costs and returns.",
      href: "/gcc-india-cost",
      cta: "See benchmarks",
      bullets: [
        "50%+ operational cost savings",
        "Access to top 1% engineering talent",
        "Fully compliant entity structures",
      ],
      links: [
        { label: "GCC FAQ", href: "/gcc-faq" },
      ],
    },
  },
  {
    name: "Company",
    href: "/about",
    columns: [
      {
        label: "Corporate",
        links: [
          { label: "About Us", href: "/about", desc: "Who we are and how we work.", icon: Info },
          { label: "Our Approach", href: "/case-studies", desc: "How we design, launch, and scale GCCs.", icon: Award },
          { label: "Careers", href: "/careers", desc: "Build with senior-led teams.", icon: GraduationCap },
        ],
      },
      {
        label: "Knowledge Hub",
        links: [
          { label: "Blog & Insights", href: "/blog", desc: "Perspectives on GCCs and enterprise AI.", icon: BookOpen },
          { label: "Contact Us", href: "/contact", desc: "Talk to a senior advisor.", icon: Mail },
        ],
      },
    ],
    featured: {
      eyebrow: "Talk to us",
      title: "Speak to a GCC advisor",
      desc: "Get a no-pressure walkthrough of how a GCC could work for you.",
      href: "/contact",
      cta: "Start a conversation",
    },
  },
];
