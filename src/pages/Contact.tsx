"use client";

import { useEffect, useState, useCallback, FormEvent } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import {
  ChevronRight,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  Calendar,
  Send,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import Consultation from "@/features/home/components/Consultation";
import MathCaptcha from "@/components/MathCaptcha";
import { appendAttributionToFormData } from "@/lib/attribution";
import { submitNetlifyForm, NETLIFY_FORMS_ENDPOINT } from "@/lib/netlifyForms";
import { trackEvent } from "@/lib/analytics";
import {
  AI_ENGINEERING_CONTACT_TOPIC,
  readAiEngineeringLeadParams,
  type AiEngineeringLeadParamKey,
} from "@/lib/aiEngineeringCta";

const topics = [
  "GCC strategy and business case",
  "Launching a new GCC in India",
  "AI-first GCC design",
  AI_ENGINEERING_CONTACT_TOPIC,
  "Technology and platform capability",
  "AI delivery teams and pods",
  "GCC Blueprint request",
];

/**
 * Lead metadata carried on service-page CTAs.
 */
const appendLeadMetaToFormData = (data: FormData) => {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  data.set("service_interest", params.get("service") ?? "");
  data.set("cta_name", params.get("cta") ?? "");
  data.set("source_page", params.get("source") ?? "");
};

const faqs = [
  {
    q: "What happens after I submit this form?",
    a: "A senior member of our team will review your enquiry and respond within one business day.",
  },
  {
    q: "Is there a cost for an initial conversation?",
    a: "No. Initial conversations are exploratory — no obligations, no pitch decks.",
  },
  {
    q: "Can I request a specific service area?",
    a: "Yes. Use the topic selector or describe your needs in the message field.",
  },
  {
    q: "Where are you based?",
    a: "NeoIntelli is headquartered in Bengaluru, India.",
  },
  {
    q: "Do you work with companies outside India?",
    a: "Yes. We work with global companies establishing or improving GCCs in India.",
  },
];

const quickMeetings = [
  {
    title: "AI Solutions",
    description: "Explore AI capabilities, generative AI, LLM fine-tuning, AI governance, and enterprise AI transformation.",
    href: "/book-a-call?type=ai",
    badge: "30-min strategy",
  },
  {
    title: "GCC Setup",
    description: "Set up your Global Capability Center in India. From strategy to operations, we guide you through every step.",
    href: "/book-a-call?type=gcc",
    badge: "12-week roadmap",
  },
  {
    title: "Staffing Solutions",
    description: "Build your team with top talent. Executive search, IT staffing, managed services, and talent development.",
    href: "/book-a-call?type=staffing",
    badge: "Talent pipeline",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [topic, setTopic] = useState("");
  const [leadContext, setLeadContext] = useState<Partial<Record<AiEngineeringLeadParamKey, string>>>({});

  useEffect(() => {
    document.title = "Contact NeoIntelli | Start Your GCC & AI Conversation";
    const search = window.location.search;
    const requested = new URLSearchParams(search).get("topic");
    if (requested && topics.includes(requested)) setTopic(requested);
    setLeadContext(readAiEngineeringLeadParams(search));
  }, []);

  const onCaptchaVerified = useCallback((v: boolean) => setCaptchaVerified(v), []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast.error("Please verify you're human before submitting.");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    appendLeadMetaToFormData(data);
    appendAttributionToFormData(data);
    submitNetlifyForm("contact", data)
      .then(() => {
        setSubmitted(true);
        toast.success("Thank you. We'll be in touch.");
        try {
          trackEvent("contact_form_submit", {
            topic: (data.get("topic") as string) || undefined,
            company: (data.get("company") as string) || undefined,
            service_interest: (data.get("service_interest") as string) || undefined,
            cta_name: (data.get("cta_name") as string) || undefined,
            source_page: (data.get("source_page") as string) || undefined,
          });
          trackEvent("qualified_lead", { source: "contact_form" });
        } catch {
          /* analytics must never break the form */
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar appearance="dark" />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="contact-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="Contact NeoIntelli Hero"
        >
          {/* Executive Background Overlay with 3D Cyan Fluid Ribbon */}
          <div className="absolute inset-0 w-full h-full z-0">
            {/* Mobile artwork */}
            <div className="md:hidden absolute inset-0">
              <Image
                src="/images/hero/hero-half-viewport-mobile.webp"
                alt="Mobile hero artwork"
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-bottom"
              />
            </div>
            {/* Desktop artwork */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/images/hero/hero-half-viewport.webp"
              alt="Contact NeoIntelli"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-right"
            />
            </div>
            {/* Soft responsive gradient overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#012048]/95 via-[#012048]/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Link
                    to="/"
                    className="text-[#38BDF8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
                  >
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="font-medium text-slate-200">
                    Contact Us
                  </span>
                </li>
              </ol>
            </nav>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-manrope font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.035em] leading-[1.08] mb-5 max-w-4xl"
            >
              Let&apos;s start a conversation.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mb-8"
            >
              Tell us what you&apos;re exploring. A senior member of our team will respond within one business day
            </motion.p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. DIRECT SCHEDULER MEETING TRACKS */}
        {/* ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="FAST TRACK CONSULTATION"
              title="Book a direct meeting with a practice lead"
              description="Skip the back-and-forth email exchange. Pick your area of interest and reserve a time slot directly on our calendar."
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <div className="grid md:grid-cols-3 gap-6">
              {quickMeetings.map((meeting) => (
                <a
                  key={meeting.title}
                  href={meeting.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-none bg-white border border-[#D5E1F2] p-6 sm:p-7 shadow-[0_2px_12px_rgba(13,48,108,0.03)] hover:shadow-[0_12px_32px_rgba(13,48,108,0.08)] hover:border-[#1351D8]/40 transition-all duration-300 flex flex-col justify-between text-left h-full"
                >
                  <div>
                    {/* Icon on the left, badge on the right */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#0D306C] stroke-[1.8] shrink-0 transition-transform duration-300 group-hover:scale-105" />
                      <span className="text-[11px] px-2 py-0.5 border border-[#D2DCF0] bg-[#F0F5FA] font-mono font-bold uppercase tracking-wider text-[#008EC4]">
                        {meeting.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-[17px] font-bold text-[#0D244D] tracking-tight mb-2.5 leading-snug group-hover:text-[#1351D8] transition-colors line-clamp-2 min-h-[2.75em]">
                      {meeting.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13.5px] text-[#505D74] leading-relaxed line-clamp-3 min-h-[4.875em] font-normal">
                      {meeting.description}
                    </p>
                  </div>

                  {/* Footer link */}
                  <div className="pt-5 mt-auto flex flex-col space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1351D8] group-hover:text-[#0D244D] transition-colors">
                      Book 30-Min Session
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. DETAILED INQUIRY (Blueprint Advisory Intake design) */}
        {/* ============================================================ */}
        <section id="scheduler" className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left column: Section header, workspace image, contact details */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full min-w-0">
                <SectionHeader
                  eyebrow="DETAILED INQUIRY"
                  title="Or send us a message"
                  description="Prefer to write? Share a few details and we'll get back to you within one business day."
                  variant="cyan"
                  align="left"
                  className="!mb-6 max-w-none"
                />

                {/* Dual-capsule workspace image */}
                <div className="pt-2 flex-1 flex flex-col justify-end min-h-[240px]">
                  <div className="relative w-full flex-1 min-h-[240px] flex gap-2.5 sm:gap-3.5 select-none">
                    <div className="relative flex-1 h-full rounded-[22px] sm:rounded-[28px] overflow-hidden border border-[#D2DCF0] shadow-md group bg-[#0A224E]">
                      <div className="absolute inset-0 w-[200%] h-full left-0">
                        <img
                          src="/images/services/ai-gcc/blueprint_advisory_workspace.webp"
                          alt="NeoIntelli advisory session"
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061836]/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="relative flex-1 h-full rounded-[22px] sm:rounded-[28px] overflow-hidden border border-[#D2DCF0] shadow-md group bg-[#0A224E]">
                      <div className="absolute inset-0 w-[200%] h-full -left-[100%]">
                        <img
                          src="/images/services/ai-gcc/blueprint_advisory_workspace.webp"
                          alt="NeoIntelli advisory session"
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061836]/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Email Us + Headquarters */}
                <div className="pt-4 space-y-3">
                  <a
                    href="mailto:reachus@neointelli.com"
                    className="flex items-center gap-3 rounded-2xl border border-[#D2DCF0] bg-white/70 px-4 py-3 hover:border-[#00A3E0]/50 transition-colors"
                  >
                    <span className="w-9 h-9 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center text-[#008EC4] shrink-0">
                      <Mail className="w-[18px] h-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#008EC4]">Email Us</span>
                      <span className="block text-sm font-bold text-[#0D306C] truncate">reachus@neointelli.com</span>
                    </span>
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl border border-[#D2DCF0] bg-white/70 px-4 py-3">
                    <span className="w-9 h-9 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center text-[#008EC4] shrink-0">
                      <MapPin className="w-[18px] h-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#008EC4]">Headquarters</span>
                      <span className="block text-sm font-bold text-[#0D306C]">Bengaluru, Karnataka, India</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right column: navy console form */}
              <div className="lg:col-span-7 flex flex-col h-full min-w-0">
                <div className="bg-[#012048] p-6 sm:p-8 md:p-9 text-white relative overflow-hidden rounded-2xl shadow-xl border border-[#1E3A8A] flex flex-col justify-between h-full">
                  {/* Faceted geometric watermark */}
                  <div className="absolute -top-6 -right-6 w-48 h-48 pointer-events-none opacity-20 select-none" aria-hidden="true">
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
                    <div className="relative z-10 text-center py-10 sm:py-12 my-auto">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5 text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-manrope font-extrabold text-2xl text-white mb-2.5">
                        Thank you. We&apos;ve received your message.
                      </h3>
                      <p className="text-slate-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                        A senior member of our advisory team will review your requirements and reach out within one business day.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-sm font-manrope font-bold text-[#38BDF8] hover:underline cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form
                      name="contact"
                      method="POST"
                      action={NETLIFY_FORMS_ENDPOINT}
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-4.5 relative z-10"
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      <input type="hidden" name="source_page" value={leadContext.source_page ?? ""} />
                      <input type="hidden" name="service_interest" value={leadContext.service_interest ?? ""} />
                      <input type="hidden" name="cta_name" value={leadContext.cta_name ?? ""} />
                      <p className="hidden" aria-hidden="true" style={{ display: "none" }}>
                        <label htmlFor="bot-field-contact">Don&apos;t fill this out if you are human: </label>
                        <input id="bot-field-contact" name="bot-field" tabIndex={-1} autoComplete="off" />
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                            Your Name <span className="text-[#38BDF8]">*</span>
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            required
                            placeholder="e.g. Sarah Jenkins"
                            className="w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                            Work Email <span className="text-[#38BDF8]">*</span>
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            placeholder="e.g. sarah@enterprise.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-company" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                          Company / Organization <span className="text-slate-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          placeholder="e.g. Acme Health Technologies"
                          className="w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-topic" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                          Topic of Exploration <span className="text-[#38BDF8]">*</span>
                        </label>
                        <select
                          id="contact-topic"
                          name="topic"
                          required
                          value={topic}
                          onChange={(event) => setTopic(event.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
                        >
                          <option value="">Select a topic</option>
                          {topics.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                          Message / Project Context <span className="text-slate-400 font-normal lowercase">(optional)</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          placeholder="Briefly describe what you're exploring — timing, scale, sector, or specific questions."
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
                        <span>Send Message</span>
                        <Send className="w-4 h-4 text-white" />
                      </button>

                      {/* Trust strip */}
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
                        By submitting, you agree to NeoIntelli contacting you about GCC services. No spam, no selling your data.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. FREQUENTLY ASKED QUESTIONS */}
        {/* ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="INQUIRY FAQS"
              title="Frequently asked questions"
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white rounded-2xl border border-[#D2DCF0] shadow-xs transition-all hover:border-[#00A3E0]/40 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-manrope font-bold text-base sm:text-lg text-[#0D306C] list-none select-none">
                    <span className="pr-4">{faq.q}</span>
                    <ChevronRight className="w-5 h-5 text-[#00A3E0] shrink-0 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 pt-2 border-t border-[#D2DCF0]/50 text-sm sm:text-base text-[#505D74] leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. LET'S BUILD TOGETHER (Home consultation with wave divider) */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
      </main>

      <Footer />
    </div>
  );
}
