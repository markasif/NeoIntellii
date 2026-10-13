"use client";

import { useState, useCallback, useMemo, FormEvent } from "react";
import { useLocation, Link } from "react-router-dom";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Target,
  MapPin,
  Users,
  TrendingUp,
  Layers,
  Cpu,
  ShieldAlert,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MathCaptcha from "@/components/MathCaptcha";
import { appendAttributionToFormData } from "@/lib/attribution";
import { submitNetlifyForm, NETLIFY_FORMS_ENDPOINT } from "@/lib/netlifyForms";
import { trackEvent } from "@/lib/analytics";
import { readBlueprintLeadContext } from "@/lib/blueprintLeadContext";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import Consultation from "@/features/home/components/Consultation";

/**
 * The eight outcomes a buyer leaves the engagement holding: location,
 * economics, talent strategy, regulatory view, risks and a launch roadmap.
 */
const includes: Array<{ n: string; title: string; desc: string; icon: LucideIcon }> = [
  { n: "01", title: "Mandate & Business Case", desc: "What the GCC should own, why India and what enterprise outcome justifies it.", icon: Target },
  { n: "02", title: "Location, Policy & Eligibility", desc: "City recommendation based on talent, economics, ecosystem and validated policy considerations.", icon: MapPin },
  { n: "03", title: "Workforce & Talent Architecture", desc: "Leadership spine, roles, seniority, compensation and hiring ramp.", icon: Users },
  { n: "04", title: "Multi-Year Economics", desc: "Setup investment, steady-state cost, 3-5 year economics and sensitivity scenarios.", icon: TrendingUp },
  { n: "05", title: "Target Operating Model & Governance", desc: "Organisation, decision rights, HQ interfaces, service model and governance.", icon: Layers },
  { n: "06", title: "Technology & AI Readiness", desc: "Enterprise technology baseline, data readiness, AI platform requirements and security.", icon: Cpu },
  { n: "07", title: "Risk Register & Mitigations", desc: "Talent, regulatory, transition, technology and operating-model risks with owners.", icon: ShieldAlert },
  { n: "08", title: "Launch Roadmap", desc: "Sequenced execution plan, dependencies, decision gates and milestones.", icon: Rocket },
];


const faqs = [
  {
    q: "What is the GCC Blueprint?",
    a: "A structured advisory engagement that produces a board-ready recommendation for your GCC covering business case, operating model, governance, talent, technology, and launch sequence.",
  },
  {
    q: "Who is this for?",
    a: "Enterprise leaders evaluating a new GCC in India, or those restructuring an existing center for higher value.",
  },
  {
    q: "How long does the blueprint process take?",
    a: "Timelines vary by scope, but a typical blueprint engagement runs 4-8 weeks.",
  },
  {
    q: "Is there a cost?",
    a: "Yes. The blueprint is a paid advisory engagement, scoped to your specific needs.",
  },
  {
    q: "What happens after the blueprint?",
    a: "You receive a board-ready recommendation. NeoIntelli can then support execution across setup, talent, technology, and governance.",
  },
];

export default function SEOBlueprint() {
  const { search } = useLocation();
  // Lead context handed over by the GCC Strategy & Setup CTAs (?source_page=&service_interest=&cta_name=).
  const leadContext = useMemo(() => readBlueprintLeadContext(search), [search]);
  const [submitted, setSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const onCaptchaVerified = useCallback((v: boolean) => setCaptchaVerified(v), []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast.error("Please verify you're human before submitting.");
      return;
    }
    const data = new FormData(e.currentTarget);
    appendAttributionToFormData(data);
    submitNetlifyForm("blueprint", data)
      .then(() => {
        setSubmitted(true);
        toast.success("Blueprint request received. We'll be in touch.");
        trackEvent("blueprint_request", {
          company: (data.get("company") as string) || undefined,
          ...leadContext,
        });
        trackEvent("qualified_lead", { source: "blueprint_form" });
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="blueprint-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-between overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="GCC Blueprint Hero"
        >
          {/* ── MOBILE BACKGROUND: FOOTER GRADIENT (HIDDEN ON DESKTOP) ── */}
          <div
            className="sm:hidden absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
            }}
          />

          {/* ── DESKTOP BACKGROUND: EXECUTIVE VIEW (HIDDEN ON MOBILE) ── */}
          <div className="hidden sm:block absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.webp"
              alt="India GCC Blueprint Strategic Planning"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
            />
            {/* Soft responsive overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          {/* Top spacer for navbar */}
          <div className="h-12 sm:h-14 lg:h-16 shrink-0" />

          {/* Hero Content Area */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto py-2 sm:py-4">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 shrink-0">
              <ol className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs text-[#505D74]">
                <li className="flex items-center gap-1.5">
                  <Link
                    to="/"
                    className="hover:text-[#00A3E0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
                  >
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span aria-current="page" className="font-semibold text-[#0D306C]">
                    GCC Blueprint
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-center sm:text-left shrink-0 w-full max-w-5xl mx-auto sm:mx-0 flex flex-col items-center sm:items-start">
              <div className="max-w-xl lg:max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
                <h1 className="text-[28px] xs:text-[32px] sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-manrope text-[#0D1B2A] tracking-[-0.035em] leading-[1.16] sm:leading-[1.1] mb-2.5 sm:mb-3 text-center sm:text-left">
                  Start with a Board-Ready GCC Blueprint.
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#1D3557] sm:text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-center sm:text-left font-sans mx-auto sm:mx-0">
                  Clarify why the GCC should exist, which capabilities it should own, how it should be governed, and how AI changes the operating model.
                </p>

                {/* CTAs Row - In mobile: show ONLY the navy blue button in center */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                    <a
                      href="#request-form"
                      className="btn-navy shrink-0 text-xs sm:text-[13px] px-4 sm:px-5 py-2.5 whitespace-nowrap"
                    >
                      <span>Request the Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                    </a>
                  </div>

                  <a
                    href="#what-is-included"
                    data-secondary-cta
                    className="hidden sm:inline-flex btn-white cursor-pointer shrink-0 whitespace-nowrap text-xs sm:text-[13px] !py-2 sm:!py-2.5 !px-3.5 sm:!px-5"
                  >
                    <span>Explore Deliverables</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

 
        </section>

        {/* ============================================================ */}
        {/* 2. CORE STRATEGIC STATEMENT */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5">
              Strategic Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.2] mb-4">
              Most GCC failures start before launch.{" "}
              <span className="text-[#505D74] font-normal block sm:inline mt-2 sm:mt-0">
                Unclear mandates, misaligned stakeholders, and operating models that don&apos;t fit. The blueprint fixes this.
              </span>
            </h2>
            <div className="w-16 h-1 bg-amber-300 mx-auto rounded-full mt-5" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. WHAT THE BLUEPRINT INCLUDES (8 DELIVERABLES) */}
        {/* ============================================================ */}
        <Section
          id="what-is-included"
          eyebrow="COMPREHENSIVE DELIVERABLES"
          title="What the Blueprint Includes"
          lead="The eight tangible outcomes enterprise leaders hold after a 4-8 week structured advisory engagement."
          width="wide"
          align="center"
          className="bg-transparent"
        >
          <div className="mt-4 sm:mt-6">
            <UniversalLifecycle
              id="blueprint-deliverables-lifecycle"
              stages={includes.map((item) => ({
                id: item.n,
                name: item.title,
                description: item.desc,
                icon: item.icon,
              }))}
            />
          </div>
        </Section>

        {/* ============================================================ */}
        {/* 4. WHO THIS IS FOR */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
          <SectionHeader
            eyebrow="TARGET PROFILES"
            title="Who this is for"
            description="Enterprise leaders evaluating a new GCC in India. Companies restructuring existing offshore operations into a governed capability center. Leadership teams that need a board-ready recommendation backed by analysis, not assumptions."
            align="center"
            variant="cyan"
            className="max-w-4xl"
          />
        </section>

        {/* ============================================================ */}
        {/* 5. REQUEST FORM (ADVISORY INTAKE) */}
        {/* ============================================================ */}
        <section id="request-form" className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Section Header & Workspace Image (Matching Consultation dual-capsule slices) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full min-w-0">
                <SectionHeader
                  eyebrow="ADVISORY INTAKE"
                  title="Request the GCC Blueprint"
                  description="Tell us about your capability priorities and headcount goals. Within one business day, an advisory partner will reach out to schedule an executive scoping sprint."
                  variant="cyan"
                  align="left"
                  className="!mb-6 max-w-none"
                />

                {/* Horizontal Dual-Capsule Pill Slices Framing Workspace Photo */}
                <div className="pt-2 flex-1 flex flex-col justify-end min-h-[280px]">
                  <div className="relative w-full flex-1 min-h-[280px] flex gap-2.5 sm:gap-3.5 select-none">
                    <div className="relative flex-1 h-full rounded-[22px] sm:rounded-[28px] overflow-hidden border border-[#D2DCF0] shadow-md group bg-[#0A224E]">
                      <div className="absolute inset-0 w-[200%] h-full left-0">
                        <img
                          src="/images/blueprint_advisory_workspace.webp"
                          alt="NeoIntelli GCC Strategy & Architecture Session"
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061836]/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="relative flex-1 h-full rounded-[22px] sm:rounded-[28px] overflow-hidden border border-[#D2DCF0] shadow-md group bg-[#0A224E]">
                      <div className="absolute inset-0 w-[200%] h-full -left-[100%]">
                        <img
                          src="/images/blueprint_advisory_workspace.webp"
                          alt="NeoIntelli GCC Strategy & Architecture Session"
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061836]/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Navy Blue Console Form (Matching cost-gcc / ROI estimator design) */}
              <div className="lg:col-span-7 flex flex-col h-full min-w-0">
                <div className="bg-[#012048] p-6 sm:p-8 md:p-9 text-white relative overflow-hidden rounded-2xl shadow-xl border border-[#1E3A8A] flex flex-col justify-between h-full">
                  {/* Faceted geometric watermark in the top-right corner */}
                  <div
                    className="absolute -top-6 -right-6 w-48 h-48 pointer-events-none opacity-20 select-none"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
                      <polygon points="120,60 80,10 60,70" fill="#0D306C" opacity="0.6" />
                      <polygon points="120,60 60,70 90,120" fill="#008EC4" opacity="0.8" />
                      <polygon points="90,120 60,70 30,110" fill="#00A3E0" opacity="0.5" />
                      <polygon points="60,70 80,10 30,30" fill="#38BDF8" opacity="0.7" />
                      <polygon points="60,70 30,30 30,110" fill="#0D306C" opacity="0.4" />
                      <polygon points="120,60 120,120 90,120" fill="#005B94" opacity="0.9" />
                    </svg>
                  </div>

                  {submitted ? (
                    <div className="text-center py-10 sm:py-12 my-auto">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5 text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-manrope font-extrabold text-2xl text-white mb-2.5">
                        Blueprint Request Received
                      </h3>
                      <p className="text-slate-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                        A senior GCC advisory partner will review your requirements and reach out within one business day.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-sm font-manrope font-bold text-[#38BDF8] hover:underline cursor-pointer"
                      >
                        Submit another request
                      </button>
                    </div>
                  ) : (
                    <form
                      name="blueprint"
                      method="POST"
                      action={NETLIFY_FORMS_ENDPOINT}
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-4.5 relative z-10"
                    >
                      <input type="hidden" name="form-name" value="blueprint" />
                      <input type="hidden" name="source_page" value={leadContext.source_page} />
                      <input type="hidden" name="service_interest" value={leadContext.service_interest} />
                      <input type="hidden" name="cta_name" value={leadContext.cta_name} />
                      <p className="hidden" aria-hidden="true" style={{ display: "none" }}>
                        <label htmlFor="bot-field-blueprint">Don&apos;t fill this out if you are human: </label>
                        <input id="bot-field-blueprint" name="bot-field" tabIndex={-1} autoComplete="off" />
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                            Your Name <span className="text-[#38BDF8]">*</span>
                          </label>
                          <input
                            name="name"
                            required
                            placeholder="Sarah Jenkins"
                            className="w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                            Work Email <span className="text-[#38BDF8]">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            required
                            placeholder="s.jenkins@enterprise.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                          Company Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          name="company"
                          placeholder="Acme Financial Corp"
                          className="w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                          Tell us about your GCC plans &amp; goals
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder="We are evaluating a 20-40 person AI and data capability team in Bengaluru or Hyderabad..."
                          className="w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans resize-none"
                        />
                      </div>

                      <div className="py-0.5">
                        <MathCaptcha onVerified={onCaptchaVerified} dark={true} />
                      </div>

                      <button
                        type="submit"
                        disabled={!captchaVerified}
                        className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold font-manrope text-white bg-[#00A3E0] hover:bg-[#008EC4] shadow-md shadow-[#00A3E0]/25 hover:shadow-lg transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span>Request the GCC Blueprint</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>

                      {/* Trust & Guarantee Strip */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1E3A8A]/60 text-center">
                        <div className="flex flex-col items-center">
                          <ShieldCheck className="w-4 h-4 text-[#38BDF8] mb-1" />
                          <span className="text-[11px] font-semibold text-white">Strict NDA</span>
                          <span className="text-[10px] text-slate-400">Confidential</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Clock className="w-4 h-4 text-[#38BDF8] mb-1" />
                          <span className="text-[11px] font-semibold text-white">24h Response</span>
                          <span className="text-[10px] text-slate-400">Partner review</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-4 h-4 text-[#38BDF8] mb-1" />
                          <span className="text-[11px] font-semibold text-white">Zero Fee</span>
                          <span className="text-[10px] text-slate-400">Qualified leads</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                        By requesting the blueprint, you agree to NeoIntelli contacting you about GCC services. No spam, no selling your data.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================ */}
        {/* 6. FAQS */}
        {/* ============================================================ */}
        <Section
          id="faqs"
          eyebrow="QUESTIONS & ANSWERS"
          title="Frequently Asked Questions"
          width="regular"
          align="center"
          className="bg-transparent"
        >
          <AnswerBlock
            items={faqs.map((faq) => ({
              question: faq.q,
              answer: faq.a,
            }))}
            level={3}
          />
        </Section>

        {/* ============================================================ */}
        {/* 7. LET'S BUILD TOGETHER (Home Consultation Section with Top Wave Divider) */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
      </main>

      <Footer />
    </div>
  );
}
