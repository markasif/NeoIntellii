import {
  Sparkles,
  Target,
  Clock,
  ShieldCheck,
  UserCheck,
  BadgeCheck,
  Sliders,
  Compass,
  ClipboardCheck,
  Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import RecruitmentPageLayout from "@/components/recruitment/RecruitmentPageLayout";
import Section from "@/components/ui/Section";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import OutcomeCardGrid from "@/components/shared/OutcomeCardGrid";
import FiveCardHeroGrid from "@/components/shared/FiveCardHeroGrid";
import ResponsiveTable from "@/components/ai-gcc/ResponsiveTable";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import RecruitmentRealityCardGrid, {
  RECRUITMENT_INDUSTRIES,
  RECRUITMENT_CITIES,
} from "@/components/recruitment/RecruitmentRealityCardGrid";
import PillTagList from "@/components/shared/PillTagList";

const services = [
  { title: "Permanent Recruitment", desc: "For mid-to-senior lateral hires when speed and quality both matter.", href: "/recruitment/permanent", tag: "Direct Hire" },
  { title: "Contract Staffing", desc: "For project-based, statutory-compliant scaling without long-term commitment.", href: "/recruitment/contract-staffing", tag: "C2H & Temp" },
  { title: "Executive Search", desc: "For retained search where confidentiality and depth matter more than speed.", href: "/recruitment/executive-search", tag: "CXO & Board" },
  { title: "RPO Services", desc: "For end-to-end or project-based hiring pods that own the funnel.", href: "/recruitment/rpo", tag: "Managed Hiring" },
  { title: "AI-Powered Talent Acquisition", desc: "For a technology-enabled model combining recruitment PODs, recruiters and NeoHireX, our AI hiring platform.", href: "/services/ai-talent-acquisition", tag: "PODs + NeoHireX" },
];

const whyUs = [
  { title: "AI-powered sourcing", desc: "AI-screened pipelines built for scarce skills, so sourcing on hard roles stays short.", icon: Sparkles },
  { title: "GCC-grade quality bar", desc: "We hire for global enterprises, so the quality bar is calibrated to global enterprise standards.", icon: Target },
  { title: "Transparent SLAs", desc: "21-day median offer for permanent, 14-day onboarding for contract, 45-day median closure for executive search.", icon: Clock },
  { title: "Compliance-first", desc: "100% statutory compliance with state-wise PF/ESI/PT/LWF registrations and digital audit trail.", icon: ShieldCheck },
  { title: "Senior account ownership", desc: "Every account gets a senior recruiter as a single point of contact for the life of the engagement.", icon: UserCheck },
  { title: "Replacement guarantees", desc: "90-day on permanent, 12-month on retained executive searches - in writing in every MSA.", icon: BadgeCheck },
];



const process = [
  {
    id: "01",
    title: "Brief",
    desc: "We capture role context, success profile, comp band and target companies in one structured intake.",
    icon: Sliders,
    tag: "Intake Brief",
  },
  {
    id: "02",
    title: "Map",
    desc: "Named market map across peer and adjacent companies, built for the role.",
    icon: Compass,
    tag: "Market Mapping",
  },
  {
    id: "03",
    title: "Engage",
    desc: "Recruiter-led outbound, qualifying conversations and AI-screened shortlist.",
    icon: UserCheck,
    tag: "AI Outreach",
  },
  {
    id: "04",
    title: "Assess",
    desc: "Structured technical and behavioural interviews mapped to your scorecard.",
    icon: ClipboardCheck,
    tag: "Scorecard Vetting",
  },
  {
    id: "05",
    title: "Close",
    desc: "Offer management, counter-offer handling, BGV coordination and 90-day onboarding check-ins.",
    icon: Handshake,
    tag: "90-Day Guarantee",
  },
];

const faqs = [
  { q: "Which recruitment services does NeoIntelli offer in India?", a: "Five core services - permanent recruitment, contract staffing (including C2H and temp), retained executive search, recruitment process outsourcing (RPO), and AI-powered talent acquisition combining recruitment PODs with our NeoHireX hiring platform. All operate pan-India across Bangalore, Hyderabad, Mumbai, Delhi NCR, Pune and Chennai." },
  { q: "What does the NeoIntelli operating model look like?", a: "AI-powered sourcing, senior account ownership, transparent line-item billing, published SLAs (21-day median offer on permanent, 14-day contract onboarding) and a digital compliance dashboard - applied consistently across all five services." },
  { q: "Which industries do you hire for?", a: "BFSI, healthcare, technology, manufacturing, retail and private equity portfolio companies - across India and for global enterprises hiring into their India GCC." },
  { q: "Do you work with global parent companies or only Indian entities?", a: "Both. We hire for global enterprises building India GCCs, India-headquartered companies, and India-based subsidiaries of global firms." },
  { q: "What is your fee model?", a: "Permanent: contingent or retained, charged as a percentage of first-year compensation. Contract staffing: a transparent markup on cost-to-company, plus statutory contributions and agreed pass-throughs, billed as line items. Executive search: retained, across a three-stage milestone structure. RPO: a monthly capability fee plus a smaller per-hire success component. Rates depend on role mix, volume, seniority and the shape of the engagement, so contact us for pricing - confirmed in the MSA." },
  { q: "Do you handle statutory compliance for contract staff?", a: "Yes - 100% of contract staff are employed by NeoIntelli with full PF, ESI, PT, LWF, gratuity and bonus filings. We are registered across all major Indian states." },
  { q: "What is your replacement guarantee?", a: "90 days for every permanent hire and 12 months for every retained executive search. If the candidate leaves voluntarily or is exited for performance, we replace at no additional fee." },
  { q: "How fast can you start?", a: "Mandate kickoff within 48 hours of signoff. First shortlist within 7-10 business days for permanent and executive search, 48 hours for contract roles." },
  { q: "Can you scale hiring quickly for GCC ramp-up?", a: "Yes - this is one of our core strengths. Our RPO pods stand up in 30 days and can deliver 50 to 500+ hires per quarter for GCC build-outs." },
];

const pricingRows = [
  { service: "Permanent recruitment", fee: "Contingent on joining, or retained for senior and confidential mandates. Charged as a percentage of first-year CTC." },
  { service: "Contract staffing", fee: "A transparent markup on cost-to-company, billed as line items alongside statutory contributions and agreed pass-throughs." },
  { service: "Executive search", fee: "Retained, paid across three milestones - engagement, shortlist and joining." },
  { service: "RPO and managed hiring", fee: "A monthly capability fee for the pod, plus a smaller per-hire success component." },
];



const coverageRoles = [
  "Software Engineering",
  "AI & Machine Learning",
  "Data Engineering",
  "Product Management",
  "Design",
  "Cloud & DevOps",
  "Cybersecurity",
  "Architecture",
  "Sales & Revenue",
  "Marketing",
  "Finance & Audit",
  "HR & People",
  "Operations",
  "Customer Success",
  "Legal & Compliance",
  "Leadership",
];

const relatedLinks = [
  { name: "AI Talent Services", href: "/services/ai-talent" },
  { name: "AI-Powered Talent Acquisition", href: "/services/ai-talent-acquisition" },
  { name: "AI & Data Recruitment", href: "/services/ai-data-recruitment" },
  { name: "GCC Workforce Strategy", href: "/services/gcc-operations/workforce-strategy" },
  { name: "AI Delivery Teams", href: "/services/ai-delivery-teams" },
  { name: "Dedicated AI Team", href: "/services/ai-delivery-teams/dedicated-ai-engineering-team" },
  { name: "Industries", href: "/industries" },
  { name: "Contact a recruiter", href: "/contact" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Recruitment & Staffing Services",
  provider: { "@type": "Organization", name: "NeoIntelli" },
  areaServed: { "@type": "Country", name: "India" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Recruitment Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.desc, url: `https://neointelli.com${s.href}` },
    })),
  },
};

export default function RecruitmentHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <RecruitmentPageLayout
      pageKey="hub"
      pageTitle="IT Recruitment & Tech Staffing Services India | NeoIntelli"
      metaDescription="Permanent recruitment, contract staffing, executive search and RPO in India. AI-powered sourcing. GCC-grade quality bar. 90-day replacement in writing. Pan-India delivery."
      hero={{
        eyebrow: "Recruitment & Staffing · India",
        title: "AI-Powered Hiring. GCC-Grade Quality.",
        description:
          "Full-service recruitment and staffing for India. Permanent recruitment, contract staffing, executive search and RPO. Delivered pan-India with AI-powered sourcing, senior account ownership and written SLAs in every MSA.",
        secondaryCta: { label: "Explore Services", href: "#services" },
        trustStrip: [
          "500K+ active candidate database",
          "21-day median time-to-offer",
          "6-city pan-India delivery",
          "90-day replacement guarantee",
        ],
      }}
      cta={{
        title: "Hiring in India? Let's talk.",
        description:
          "Share your hiring plan - we'll come back with a sourcing strategy, timeline and SLA within 48 hours.",
        secondary: { label: "Explore AI Talent Services", href: "/services/ai-talent" },
      }}
      related={relatedLinks}
    >
      {/* 1. Services */}
      <Section
        id="services"
        eyebrow="Our services"
        title="Five ways to hire with NeoIntelli"
        width="wide"
        align="center"
      >
        <FiveCardHeroGrid
          compact
          items={services.map((s, i) => ({
            n: String(i + 1).padStart(2, "0"),
            title: s.title,
            subtitle: s.tag,
            body: s.desc,
            cta: { label: `Explore ${s.title}`, href: s.href },
          }))}
        />
      </Section>

      {/* 2. How we work */}
      <Section
        id="how-we-work"
        eyebrow="How we work"
        title="One operating model across every service"
        width="wide"
        align="center"
      >
        <CapabilitiesSection
          columns={3}
          items={whyUs.map((w) => ({ title: w.title, desc: w.desc, icon: w.icon }))}
        />
      </Section>

      {/* 3. Industries */}
      <Section
        id="industries"
        eyebrow="Industries"
        title="Industries we recruit for"
        width="wide"
        align="center"
      >
        <RecruitmentRealityCardGrid items={RECRUITMENT_INDUSTRIES} />
      </Section>

      {/* 4. City coverage */}
      <Section
        id="locations"
        eyebrow="Delivery footprint"
        title="Pan-India delivery footprint"
        width="wide"
        align="center"
      >
        <RecruitmentRealityCardGrid items={RECRUITMENT_CITIES} />
      </Section>

      {/* 5. Process */}
      <Section
        id="process"
        eyebrow="Process"
        title="Our 5-step hiring process"
        width="wide"
        align="center"
      >
        <UniversalLifecycle steps={process} theme="light" tagStyle="status" />
      </Section>

      {/* 6. Pricing */}
      <Section
        id="pricing"
        eyebrow="Pricing"
        title="How we price. Clear before the call."
        width="wide"
        align="center"
      >
        <ResponsiveTable
          caption="Recruitment and staffing fee model by service"
          headers={["Service", "Fee model"]}
          rows={pricingRows.map((row) => [row.service, row.fee])}
        />
        <p className="mt-6 text-center text-sm text-[#505D74] max-w-3xl mx-auto">
          All fees agreed in writing. No hidden costs. Replacement clauses included in every MSA.
        </p>
      </Section>

      {/* 7. Roles */}
      <Section
        id="roles"
        eyebrow="Coverage"
        title="Roles & functions we fill"
        width="regular"
        align="center"
      >
        <div className="max-w-4xl mx-auto py-2">
          <PillTagList items={coverageRoles} />
        </div>
      </Section>

      {/* 8. FAQs */}
      <Section
        id="faqs"
        eyebrow="Clarifications"
        title="Frequently asked questions"
        width="regular"
        align="center"
      >
        <AnswerBlock items={faqs.map((f) => ({ question: f.q, answer: f.a }))} level={3} />
      </Section>
      </RecruitmentPageLayout>
    </>
  );
}
