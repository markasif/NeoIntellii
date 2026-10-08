import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Users, UserCog, Briefcase, Workflow, Check, Bot } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RelatedLinks from "@/components/shared/RelatedLinks";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import HeroBackground from "@/components/shared/HeroBackground";

const services = [
 {
  title: "Permanent Recruitment",
  desc: "For mid-to-senior lateral hires when speed and quality both matter.",
  href: "/recruitment/permanent",
  icon: Users,
  tag: "Direct Hire",
 },
 {
  title: "Contract Staffing",
  desc: "For project-based, statutory-compliant scaling without long-term commitment.",
  href: "/recruitment/contract-staffing",
  icon: Workflow,
  tag: "C2H & Temp",
 },
 {
  title: "Executive Search",
  desc: "For retained search where confidentiality and depth matter more than speed.",
  href: "/recruitment/executive-search",
  icon: Briefcase,
  tag: "CXO & Board",
 },
 {
  title: "RPO Services",
  desc: "For end-to-end or project-based hiring pods that own the funnel.",
  href: "/recruitment/rpo",
  icon: UserCog,
  tag: "Managed Hiring",
 },
 {
  title: "AI-Powered Talent Acquisition",
  desc: "For a technology-enabled model combining recruitment PODs, recruiters and NeoHireX, our AI hiring platform.",
  href: "/services/ai-talent-acquisition",
  icon: Bot,
  tag: "PODs + NeoHireX",
 },
];

const whyUs = [
 { title: "AI-powered sourcing", desc: "AI-screened pipelines built for scarce skills, so sourcing on hard roles stays short." },
 { title: "GCC-grade quality bar", desc: "We hire for global enterprises, so the quality bar is calibrated to global enterprise standards." },
 { title: "Transparent SLAs", desc: "21-day median offer for permanent, 14-day onboarding for contract, 45-day median closure for executive search." },
 { title: "Compliance-first", desc: "100% statutory compliance with state-wise PF/ESI/PT/LWF registrations and digital audit trail." },
 { title: "Senior account ownership", desc: "Every account gets a senior recruiter as a single point of contact for the life of the engagement." },
 { title: "Replacement guarantees", desc: "90-day on permanent, 12-month on retained executive searches - in writing in every MSA." },
];

const cities = [
 { name: "Bangalore", href: "/contact" },
 { name: "Hyderabad", href: "/contact" },
 { name: "Mumbai", href: "/contact" },
 { name: "Delhi NCR", href: "/contact" },
 { name: "Pune", href: "/contact" },
 { name: "Chennai", href: "/contact" },
];

// Fee STRUCTURES only - how each service is billed, never what it costs.
// Rates are quoted per engagement and agreed in the MSA, so no figure,
// range or "from" number belongs in this table or anywhere on the site.
const pricingRows = [
 { service: "Permanent recruitment", fee: "Contingent on joining, or retained for senior and confidential mandates. Charged as a percentage of first-year CTC." },
 { service: "Contract staffing", fee: "A transparent markup on cost-to-company, billed as line items alongside statutory contributions and agreed pass-throughs." },
 { service: "Executive search", fee: "Retained, paid across three milestones - engagement, shortlist and joining." },
 { service: "RPO and managed hiring", fee: "A monthly capability fee for the pod, plus a smaller per-hire success component." },
];

const industries = [
 { name: "BFSI", href: "/industries/bfsi-gcc" },
 { name: "Healthcare", href: "/industries/healthcare-gcc" },
 { name: "Technology", href: "/industries/technology-gcc" },
 { name: "Manufacturing", href: "/industries/manufacturing-gcc" },
 { name: "Retail", href: "/industries/retail-gcc" },
 { name: "Private Equity", href: "/industries/private-equity-gcc" },
];

const roles = [
 "Software Engineering", "AI & Machine Learning", "Data Engineering", "Product Management",
 "Design", "Cloud & DevOps", "Cybersecurity", "Architecture",
 "Sales & Revenue", "Marketing", "Finance & Audit", "HR & People",
 "Operations", "Customer Success", "Legal & Compliance", "Leadership",
];

const process = [
 { step: "01", title: "Brief", desc: "We capture role context, success profile, comp band and target companies in one structured intake." },
 { step: "02", title: "Map", desc: "Named market map across peer and adjacent companies, built for the role." },
 { step: "03", title: "Engage", desc: "Recruiter-led outbound, qualifying conversations and AI-screened shortlist." },
 { step: "04", title: "Assess", desc: "Structured technical and behavioural interviews mapped to your scorecard." },
 { step: "05", title: "Close", desc: "Offer management, counter-offer handling, BGV coordination and 90-day onboarding check-ins." },
];

const faqs = [
 {
  q: "Which recruitment services does NeoIntelli offer in India?",
  a: "Five core services - permanent recruitment, contract staffing (including C2H and temp), retained executive search, recruitment process outsourcing (RPO), and AI-powered talent acquisition combining recruitment PODs with our NeoHireX hiring platform. All operate pan-India across Bangalore, Hyderabad, Mumbai, Delhi NCR, Pune and Chennai.",
 },
 {
  q: "What does the NeoIntelli operating model look like?",
  a: "AI-powered sourcing, senior account ownership, transparent line-item billing, published SLAs (21-day median offer on permanent, 14-day contract onboarding) and a digital compliance dashboard - applied consistently across all five services.",
 },
 {
  q: "Which industries do you hire for?",
  a: "BFSI, healthcare, technology, manufacturing, retail and private equity portfolio companies - across India and for global enterprises hiring into their India GCC.",
 },
 {
  q: "Do you work with global parent companies or only Indian entities?",
  a: "Both. We hire for global enterprises building India GCCs, India-headquartered companies, and India-based subsidiaries of global firms.",
 },
 {
  q: "What is your fee model?",
  a: "Permanent: contingent or retained, charged as a percentage of first-year compensation. Contract staffing: a transparent markup on cost-to-company, plus statutory contributions and agreed pass-throughs, billed as line items. Executive search: retained, across a three-stage milestone structure. RPO: a monthly capability fee plus a smaller per-hire success component. Rates depend on role mix, volume, seniority and the shape of the engagement, so contact us for pricing - confirmed in the MSA.",
 },
 {
  q: "Do you handle statutory compliance for contract staff?",
  a: "Yes - 100% of contract staff are employed by NeoIntelli with full PF, ESI, PT, LWF, gratuity and bonus filings. We are registered across all major Indian states.",
 },
 {
  q: "What is your replacement guarantee?",
  a: "90 days for every permanent hire and 12 months for every retained executive search. If the candidate leaves voluntarily or is exited for performance, we replace at no additional fee.",
 },
 {
  q: "How fast can you start?",
  a: "Mandate kickoff within 48 hours of signoff. First shortlist within 7-10 business days for permanent and executive search, 48 hours for contract roles.",
 },
 {
  q: "Can you scale hiring quickly for GCC ramp-up?",
  a: "Yes - this is one of our core strengths. Our RPO pods stand up in 30 days and can deliver 50 to 500+ hires per quarter for GCC build-outs.",
 },
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

export default function RecruitmentHub() {
 useEffect(() => {
  document.title = "IT Recruitment & Tech Staffing Services India | NeoIntelli";
  const desc = "Permanent recruitment, contract staffing, executive search and RPO in India. AI-powered sourcing. GCC-grade quality bar. 90-day replacement in writing. Pan-India delivery.";
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
   tag = document.createElement("meta");
   tag.setAttribute("name", "description");
   document.head.appendChild(tag);
  }
  tag.setAttribute("content", desc);
 }, []);

 return (
  <div className="min-h-screen bg-white">
   <Navbar />
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

   {/* Hero (text-only per inner-page rule) */}
   <section className="relative isolate pt-28 pb-4 md:pt-36 md:pb-6 px-6 sm:px-8 lg:px-12 text-center overflow-hidden">
    <HeroBackground />
    <div className="absolute top-[68px] left-0 right-0 px-6 sm:px-8 lg:px-12">
     <div className="max-w-[1120px] mx-auto">
      <nav className="flex items-center gap-0.5 text-2xs text-white/40">
       <Link to="/" className="transition-colors">Home</Link>
       <ChevronRight className="w-2 h-2 text-white/30" />
       <Link to="/services/ai-engineering" className="transition-colors">Capabilities</Link>
       <ChevronRight className="w-2 h-2 text-white/30" />
       <span className="text-white/40">Recruitment</span>
      </nav>
     </div>
    </div>
    <div className="max-w-4xl mx-auto relative z-10">
     <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-cyan-200 text-sm tracking-[0.16em] uppercase mb-5"
     >
      Recruitment & Staffing - India
     </motion.p>
     <motion.h1
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="text-hero-sm md:text-hero inner-page-hero font-display text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
     >
      AI-Powered Hiring. GCC-Grade Quality.
     </motion.h1>
     <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="text-slate-100/90 text-lg md:text-body-lg max-w-2xl mx-auto mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
     >
      Full-service recruitment and staffing for India. Permanent recruitment, contract staffing, executive search and RPO. Delivered pan-India with AI-powered sourcing, senior account ownership and written SLAs in every MSA.
     </motion.p>
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-wrap justify-center gap-4"
     >
      <Link to="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 bg-white hover:bg-white/95 text-[#054f67] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
       Talk to a Recruiter <ArrowRight className="w-4 h-4" />
      </Link>
      <Link to="#services" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 border border-white/30 text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm hover:-translate-y-0.5 transform">Explore Services</Link>
     </motion.div>
    </div>
     {/* Stats strip */}
     <div className="relative z-10 max-w-6xl mx-auto mt-12 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
       <div className="text-center"><div className="text-2xl md:text-3xl font-display text-white">500K+</div><div className="text-xs text-slate-100/70 mt-1">Active candidate database</div></div>
       <div className="text-center"><div className="text-2xl md:text-3xl font-display text-white">21 days</div><div className="text-xs text-slate-100/70 mt-1">Median time-to-offer</div></div>
       <div className="text-center"><div className="text-2xl md:text-3xl font-display text-white">6 cities</div><div className="text-xs text-slate-100/70 mt-1">Pan-India delivery</div></div>
       <div className="text-center"><div className="text-2xl md:text-3xl font-display text-white">90 days</div><div className="text-xs text-slate-100/70 mt-1">Replacement guarantee in writing</div></div>
      </div>
     </div>
   </section>

   {/* 4 service cards */}
   <section id="services" className="pt-16 md:pt-24 pb-24 md:pb-32 px-6 sm:px-8 lg:px-12">
    <div className="max-w-6xl mx-auto">
     <ScrollReveal className="text-center mb-12">
      <p className="text-2xs tracking-[0.16em] uppercase text-section-label mb-4">Our services</p>
      <h2 className="text-display-sm md:text-display font-display text-heading">Five ways to hire with NeoIntelli</h2>
     </ScrollReveal>
     <StaggerContainer className="grid md:grid-cols-2 gap-6" stagger={0.08}>
      {services.map((s) => (
       <motion.div key={s.title} variants={staggerItem}>
        <Link to={s.href} className="group block h-full p-8 rounded-2xl bg-[#f5f5f7] transition-all duration-300 hover:bg-[#ececef]">
         <div className="flex items-start justify-end mb-5">
          <span className="text-xs px-3 py-1 rounded-full bg-white text-body-muted">{s.tag}</span>
         </div>
         <h3 className="text-heading font-display text-xl mb-3">{s.title}</h3>
         <p className="text-body text-sm leading-relaxed mb-5">{s.desc}</p>
         <span className="inline-flex items-center gap-1.5 text-primary text-sm">
          Explore {s.title} <ChevronRight className="w-3.5 h-3.5" />
         </span>
        </Link>
       </motion.div>
      ))}
     </StaggerContainer>
    </div>
   </section>

   {/* How we work */}
   <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
    <div className="max-w-5xl mx-auto">
     <ScrollReveal className="text-center mb-12">
      <h2 className="text-display-sm font-display text-heading mb-4">How we work</h2>
      <p className="text-body text-base max-w-3xl mx-auto">
       Full-service recruitment across permanent, contract, executive search and RPO - delivered through one operating model.
      </p>
     </ScrollReveal>
     <StaggerContainer className="grid md:grid-cols-2 gap-4" stagger={0.06}>
      {whyUs.map((w) => (
       <motion.div key={w.title} variants={staggerItem} className="flex items-start gap-4 p-6 rounded-2xl bg-white">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
         <Check className="w-4 h-4 text-primary" />
        </div>
        <div>
         <h3 className="text-heading font-display text-base mb-1.5">{w.title}</h3>
         <p className="text-body text-sm leading-relaxed">{w.desc}</p>
        </div>
       </motion.div>
      ))}
     </StaggerContainer>
    </div>
   </section>

   {/* Industries */}
   <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
    <div className="max-w-5xl mx-auto">
     <ScrollReveal className="mb-8">
      <h2 className="text-display-sm font-display text-heading mb-4">Industries we recruit for</h2>
      <p className="text-body text-base max-w-3xl">Sector-aware recruiters who understand the regulatory, technical and cultural context of your hires.</p>
     </ScrollReveal>
     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {industries.map((i) => (
       <Link
        key={i.name}
        to={i.href}
        className="group p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center text-center min-h-[88px]"
       >
        <span className="text-heading font-display text-sm group-hover:text-primary transition-colors">{i.name}</span>
       </Link>
      ))}
     </div>
    </div>
   </section>

   {/* City coverage */}
   <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
    <div className="max-w-5xl mx-auto">
     <ScrollReveal className="mb-8">
      <h2 className="text-display-sm font-display text-heading mb-4">Pan-India delivery footprint</h2>
      <p className="text-body text-base max-w-3xl">Active recruiter teams, statutory compliance and asset management across India's primary GCC and enterprise hubs.</p>
     </ScrollReveal>
     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cities.map((c) => (
       <Link key={c.name} to={c.href} className="p-5 rounded-2xl bg-white text-center transition-all duration-300 hover:bg-primary hover:-translate-y-0.5 hover:shadow-md group">
        <p className="text-heading font-display text-base group-hover:text-white">{c.name}</p>
       </Link>
      ))}
     </div>
    </div>
   </section>

   {/* Process */}
   <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
    <div className="max-w-5xl mx-auto">
     <ScrollReveal className="text-center mb-12">
      <h2 className="text-display-sm md:text-display font-display text-heading">Our 5-step hiring process</h2>
     </ScrollReveal>
     <StaggerContainer className="space-y-0" stagger={0.08}>
      {process.map((p) => (
       <motion.div key={p.step} variants={staggerItem} className="grid md:grid-cols-[80px_1fr] gap-6 py-8 border-b border-black/[0.04] last:border-0">
        <p className="text-5xl font-display text-[#f0f0f0]">{p.step}</p>
        <div>
         <h3 className="text-heading font-display text-lg mb-2">{p.title}</h3>
         <p className="text-body text-sm leading-relaxed">{p.desc}</p>
        </div>
       </motion.div>
      ))}
     </StaggerContainer>
    </div>
   </section>

   {/* Roles we fill */}
   {/* How we price */}
   <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
    <div className="max-w-5xl mx-auto">
     <ScrollReveal className="mb-8">
      <h2 className="text-display-sm font-display text-heading mb-4">How we price. Clear before the call.</h2>
      <p className="text-body text-base max-w-3xl">The fee structure for each service, set out before you engage. Contact us for pricing against your role mix, volume and seniority, agreed in the MSA.</p>
     </ScrollReveal>
     <div className="overflow-hidden rounded-2xl bg-white border border-black/[0.06]">
      <table className="w-full text-left">
       <thead className="bg-[#fafafa] border-b border-black/[0.06]">
        <tr>
         <th className="p-5 text-heading font-display text-sm">Service</th>
         <th className="p-5 text-heading font-display text-sm">Fee model</th>
        </tr>
       </thead>
       <tbody>
        {pricingRows.map((row) => (
         <tr key={row.service} className="border-b border-black/[0.04] last:border-0">
          <td className="p-5 text-heading font-display text-sm align-top w-1/3">{row.service}</td>
          <td className="p-5 text-body text-sm leading-relaxed">{row.fee}</td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
     <p className="text-body text-sm mt-6 text-center max-w-5xl mx-auto">All fees agreed in writing. No hidden costs. Replacement clauses included in every MSA.</p>
    </div>
   </section>

   {/* Roles we fill */}
   <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
    <div className="max-w-5xl mx-auto">
     <ScrollReveal className="mb-8">
      <h2 className="text-display-sm font-display text-heading mb-4">Roles & functions we fill</h2>
      <p className="text-body text-base max-w-3xl">From individual contributors to function heads - across tech and non-tech functions.</p>
     </ScrollReveal>
     <div className="flex flex-wrap gap-3">
      {roles.map((r) => (
       <span key={r} className="text-sm px-4 py-2 rounded-full bg-white border border-black/[0.06]">
        {r}
       </span>
      ))}
     </div>
    </div>
   </section>

   {/* FAQs */}
   <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
    <div className="max-w-3xl mx-auto">
     <ScrollReveal className="text-center mb-12">
      <h2 className="text-display-sm font-display text-heading">Frequently asked questions</h2>
     </ScrollReveal>
     <StaggerContainer className="space-y-3" stagger={0.05}>
      {faqs.map((faq) => (
       <motion.details key={faq.q} variants={staggerItem} className="group bg-[#f5f5f7] rounded-2xl">
        <summary className="flex items-center justify-between p-6 cursor-pointer text-sm text-heading">
         {faq.q}
         <ChevronRight className="w-4 h-4 text-body-muted shrink-0 ml-4 transition-transform duration-300 group-open:rotate-90" />
        </summary>
        <div className="px-6 pb-6 -mt-1">
         <p className="text-body text-sm leading-relaxed">{faq.a}</p>
        </div>
       </motion.details>
      ))}
     </StaggerContainer>
    </div>
   </section>

   {/* CTA band */}
   <section className="bg-footer-cta dark-section py-20 md:py-28 px-6 sm:px-8 lg:px-12">
    <div className="max-w-3xl mx-auto text-center">
     <h2 className="text-display-sm md:text-display font-display text-white mb-5">Hiring in India? Let's talk.</h2>
     <p className="text-white/60 text-lg mb-8">Share your hiring plan - we'll come back with a sourcing strategy, timeline and SLA within 48 hours.</p>
     <Link to="/contact" className="btn-primary inline-flex">
      Speak with a recruiter <ArrowRight className="w-4 h-4" />
     </Link>
    </div>
   </section>

   <RelatedLinks links={relatedLinks} />
   <Footer />
  </div>
 );
}