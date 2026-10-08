import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ScrollReveal, StaggerContainer, staggerItem, TextReveal } from "@/components/animations";
import HeroBackground from "@/components/shared/HeroBackground";
import RelatedLinks from "@/components/shared/RelatedLinks";

const modelPillars = [
 { title: "Dedicated Recruitment POD", desc: "A recruitment team aligned to your hiring priorities, skill requirements and expected hiring volumes." },
 { title: "Experienced Recruiters", desc: "Human recruiters manage sourcing, candidate engagement, qualification, hiring-manager coordination and candidate relationships." },
 { title: "NeoHireX", desc: "Our proprietary AI-powered hiring platform supports candidate management, screening, ranking, first-round AI interviews and recruitment pipeline visibility." },
 { title: "Human Evaluation", desc: "AI supports the recruitment workflow. Recruiters remain involved in candidate validation, communication and hiring coordination." },
];

const processSteps = [
 { step: "01", title: "Hiring Requirement & Calibration", desc: "We begin by understanding the role, business context, required capabilities, experience expectations, compensation range and hiring priorities. The objective is to establish a clear success profile before sourcing begins." },
 { step: "02", title: "Dedicated Recruitment POD", desc: "A dedicated or shared recruitment team is aligned to the engagement based on hiring volume, role complexity and skill mix." },
 { step: "03", title: "Candidate Sourcing", desc: "Recruiters identify and engage relevant candidates using appropriate sourcing channels, talent networks and targeted outreach." },
 { step: "04", title: "Candidate Management in NeoHireX", desc: "Candidate information and recruitment activity can be managed through NeoHireX as part of applicable engagements." },
 { step: "05", title: "AI Screening & Ranking", desc: "NeoHireX helps evaluate candidate profiles against the role requirements and organize the pipeline based on relevant fit signals." },
 { step: "06", title: "AI First-Round Interview", desc: "Where appropriate, candidates can complete an AI-powered first-round interview to provide an additional structured assessment layer before further evaluation." },
 { step: "07", title: "Recruiter Evaluation", desc: "NeoIntelli recruiters review candidate suitability, communication, availability, compensation expectations and engagement readiness." },
 { step: "08", title: "Client Interview", desc: "Qualified candidates move into the client's interview and decision process." },
 { step: "09", title: "Offer & Onboarding Coordination", desc: "NeoIntelli can support interview coordination, candidate communication, offer follow-up and joining management based on the engagement model." },
];

const neoHireXCapabilities = [
 { title: "Candidate Management", desc: "Maintain candidate information and recruitment activity within a structured hiring workflow." },
 { title: "AI-Assisted Screening", desc: "Evaluate candidate profiles against role requirements and surface relevant candidates for recruiter review." },
 { title: "Candidate Ranking", desc: "Prioritize candidate review using role-aligned matching and assessment signals." },
 { title: "AI First-Round Interviews", desc: "Add a structured initial interview layer before recruiter or client interviews where appropriate." },
 { title: "Recruitment Pipeline Visibility", desc: "Track candidate movement across different stages of the hiring process." },
 { title: "Structured Hiring Data", desc: "Give recruitment teams clearer information for reviewing pipeline progress and candidate status." },
];

const podScope = [
 "Requirement intake and role calibration",
 "Candidate sourcing",
 "Candidate engagement",
 "Resume review",
 "AI-assisted screening",
 "First-round interview workflows",
 "Recruiter evaluation",
 "Interview coordination",
 "Candidate pipeline management",
 "Offer follow-up",
 "Recruitment reporting",
];

const recruitmentModels = [
 { title: "RPO & Managed Hiring", desc: "For organizations that want a dedicated team to manage a significant part of the recruitment function.", href: "/recruitment/rpo", cta: "Explore RPO & Managed Hiring" },
 { title: "Permanent Hiring", desc: "For direct recruitment of permanent professionals across business and technology functions.", href: "/recruitment/permanent", cta: "Explore Permanent Recruitment" },
 { title: "Contract Staffing", desc: "For organizations that need flexible contract or contract-to-hire talent.", href: "/recruitment/contract-staffing", cta: "Explore Contract Staffing" },
 { title: "AI & Data Talent Hiring", desc: "For specialized AI, GenAI, machine learning, MLOps and Data roles requiring deeper technical evaluation.", href: "/services/ai-data-recruitment", cta: "Explore AI & Data Talent Hiring" },
];

const whyNeoIntelli = [
 { title: "Recruitment Service + Recruitment Technology", desc: "NeoIntelli combines recruitment delivery with its own hiring platform instead of treating recruitment technology as a separate purchase." },
 { title: "Recruiter-Led Delivery", desc: "Experienced recruiters remain responsible for candidate engagement, evaluation and recruitment coordination." },
 { title: "AI-Assisted Assessment", desc: "NeoHireX adds structured screening, ranking and first-round interview capabilities to the hiring workflow." },
 { title: "Flexible Delivery Models", desc: "Use NeoIntelli for individual mandates, dedicated recruitment capacity, managed hiring or specialist recruitment." },
 { title: "Built for Technology and GCC Hiring", desc: "NeoIntelli's broader work across AI, technology talent and Global Capability Centers allows recruitment engagements to connect with larger workforce-building initiatives where required." },
];

const faqs = [
 { q: "What are AI-powered talent acquisition services?", a: "AI-powered talent acquisition services combine recruitment expertise with artificial intelligence and recruitment technology to support activities such as candidate sourcing, screening, ranking, interviewing and pipeline management. NeoIntelli combines experienced recruiters and dedicated recruitment PODs with its proprietary hiring platform, NeoHireX." },
 { q: "Is NeoHireX a third-party ATS?", a: "No. NeoHireX is NeoIntelli's proprietary AI-powered ATS and hiring platform." },
 { q: "Do we need to purchase NeoHireX separately?", a: "For applicable NeoIntelli recruitment engagements, NeoHireX is included as part of the service and does not require a separate ATS subscription for managing the NeoIntelli recruitment workflow." },
 { q: "Can NeoIntelli work with our existing ATS?", a: "Where an organization requires its existing ATS or HR technology environment to remain the primary system of record, the appropriate recruitment workflow can be agreed during engagement discovery." },
 { q: "Does AI make the final hiring decision?", a: "No. NeoIntelli uses AI to support parts of the hiring process such as screening, ranking and first-round assessment. Recruiters and client hiring teams remain involved in evaluation and hiring decisions." },
 { q: "What is a Recruitment POD?", a: "A Recruitment POD is a dedicated recruitment team aligned to a client's hiring requirements. Depending on the engagement, the POD can include recruiters, sourcing capability and recruitment coordination." },
 { q: "Is this the same as RPO?", a: "Not necessarily. A technology-enabled talent acquisition engagement can support individual or ongoing hiring needs. RPO typically involves broader ownership of a client's recruitment function or a defined portion of it. NeoIntelli supports both models." },
 { q: "Can NeoIntelli hire specialized AI professionals?", a: "Yes. NeoIntelli has a separate AI & Data Talent Hiring service focused on roles such as AI/ML Engineers, GenAI Engineers, AI Agent Developers, Data Engineers, MLOps Engineers and AI Architects." },
];

const relatedLinks = [
 { name: "RPO & Managed Hiring", href: "/recruitment/rpo" },
 { name: "Permanent Recruitment", href: "/recruitment/permanent" },
 { name: "Contract Staffing", href: "/recruitment/contract-staffing" },
 { name: "AI & Data Recruitment", href: "/services/ai-data-recruitment" },
 { name: "Recruitment Hub", href: "/recruitment" },
 { name: "AI Delivery Teams", href: "/services/ai-delivery-teams" },
 { name: "AI Recruitment Hub + NeoHireX", href: "/services/ai-talent/recruitment-hub" },
 { name: "AI Talent Services", href: "/services/ai-talent" },
 { name: "AI GCC in India", href: "/services/ai-gcc" },
];

export default function AITalentAcquisition() {
 useEffect(() => {
 document.title = "AI-Powered Talent Acquisition Services India | NeoIntelli";
 }, []);
 return (
 <div className="min-h-screen bg-white">
 <Navbar />

 {/* Hero */}
 <section className="relative isolate pt-28 pb-4 md:pt-36 md:pb-6 px-6 sm:px-8 lg:px-12 text-center overflow-hidden">
 <HeroBackground />
 <div className="absolute top-[68px] left-0 right-0 px-6 sm:px-8 lg:px-12">
 <div className="max-w-[1120px] mx-auto">
 <nav className="flex items-center gap-0.5 text-2xs text-white/40">
 <Link to="/" className="transition-colors hover:text-white/70">Home</Link>
 <ChevronRight className="w-2 h-2 text-white/30" />
 <Link to="/recruitment" className="transition-colors hover:text-white/70">Recruitment</Link>
 <ChevronRight className="w-2 h-2 text-white/30" />
 <span className="text-white/50">AI-Powered Talent Acquisition</span>
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
 Recruitment - AI-Powered Talent Acquisition
 </motion.p>
 <motion.h1
 initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
 transition={{ duration: 0.7, delay: 0.1 }}
 className="text-hero-sm md:text-hero inner-page-hero font-display text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
 >
 AI-Powered Talent Acquisition Services in India
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="text-slate-100/90 text-lg md:text-body-lg max-w-2xl mx-auto mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
 >
 Build a more structured recruitment engine with dedicated recruitment PODs, experienced recruiters and NeoHireX, NeoIntelli's proprietary AI-powered hiring platform.
 </motion.p>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.35 }}
 className="text-slate-100/80 text-base max-w-2xl mx-auto mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
 >
 From candidate sourcing and AI-powered screening to first-round interviews, recruiter evaluation and pipeline management, NeoIntelli combines recruitment expertise and hiring technology in one operating model.
 </motion.p>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.4 }}
 className="flex flex-wrap justify-center gap-4"
 >
 <Link to="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 bg-white hover:bg-white/95 text-[#054f67] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
 Discuss Your Hiring Plan <ArrowRight className="w-4 h-4" />
 </Link>
 <a href="https://neohirex.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 border border-white/30 text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm hover:-translate-y-0.5 transform">
 Explore NeoHireX
 </a>
 </motion.div>
 </div>
 </section>

 {/* What is */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto">
 <TextReveal className="text-display-sm md:text-[2.75rem] font-display text-heading leading-[1.12] mb-10">
 What is NeoIntelli's AI-powered talent acquisition service?
 </TextReveal>
 <ScrollReveal>
 <p className="text-body text-base leading-relaxed mb-5">
 NeoIntelli provides technology-enabled talent acquisition services that combine dedicated recruitment teams, experienced recruiters and our proprietary AI-powered hiring platform, NeoHireX.
 </p>
 <p className="text-body text-base leading-relaxed mb-5">
 We support the recruitment lifecycle from requirement intake and sourcing through candidate screening, ranking, first-round interviews, recruiter validation, pipeline management and hiring coordination.
 </p>
 <p className="text-body text-base leading-relaxed">
 For applicable engagements, NeoHireX is included as part of the recruitment service, so clients do not need to separately purchase an ATS subscription to manage the NeoIntelli hiring workflow.
 </p>
 </ScrollReveal>
 </div>
 </section>

 {/* Model pillars */}
 <section className="pb-24 md:pb-32 px-6 sm:px-8 lg:px-12">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="max-w-4xl mb-12">
 <h2 className="text-display-sm md:text-display font-display text-heading mb-6">Bring recruitment expertise and hiring technology together</h2>
 <p className="text-body text-base leading-relaxed mb-4">
 Enterprise recruitment often involves multiple disconnected systems and partners. A hiring team may need to coordinate recruiters, staffing vendors, an ATS, screening tools, interview tools, spreadsheets and candidate reports before a shortlist reaches the hiring manager.
 </p>
 <p className="text-body text-base leading-relaxed">
 NeoIntelli brings these activities into a more connected talent acquisition model.
 </p>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
 {modelPillars.map((p, i) => (
 <motion.div key={p.title} variants={staggerItem} className="p-8 rounded-2xl bg-[#f5f5f7] h-full">
 <p className="text-xs text-body-muted mb-5">0{i + 1}</p>
 <h3 className="text-heading font-display text-lg mb-3">{p.title}</h3>
 <p className="text-body text-sm leading-relaxed">{p.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* Process */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#fafafc]">
 <div className="max-w-5xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm md:text-display font-display text-heading">How our AI-powered talent acquisition model works</h2>
 </ScrollReveal>
 <StaggerContainer className="space-y-0" stagger={0.08}>
 {processSteps.map((a) => (
 <motion.div
 key={a.step}
 variants={staggerItem}
 className="grid md:grid-cols-[80px_1fr] gap-6 py-8 border-b border-black/[0.04] last:border-0"
 >
 <p className="text-5xl font-display text-[#e8e8ea]">{a.step}</p>
 <div>
 <h3 className="text-heading font-display text-lg mb-2">{a.title}</h3>
 <p className="text-body text-sm leading-relaxed">{a.desc}</p>
 </div>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* NeoHireX included */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-footer-cta dark-section">
 <div className="max-w-4xl mx-auto">
 <ScrollReveal className="text-center mb-12">
 <p className="text-cyan-200 text-sm tracking-[0.16em] uppercase mb-4">NeoHireX is built into the NeoIntelli recruitment model</p>
 <h2 className="text-display-sm md:text-display font-display text-white mb-6">Our proprietary ATS is included with applicable recruitment engagements</h2>
 </ScrollReveal>
 <ScrollReveal>
 <p className="text-white/70 text-sm leading-relaxed mb-5">
 NeoHireX is NeoIntelli's own AI-powered ATS and hiring platform. It is not a third-party tool added to the service.
 </p>
 <p className="text-white/70 text-sm leading-relaxed mb-5">
 For applicable NeoIntelli recruitment engagements, access to NeoHireX is included as part of the service, with no separate ATS subscription required for managing the NeoIntelli recruitment workflow.
 </p>
 <p className="text-white/70 text-sm leading-relaxed mb-5">
 This can give hiring teams a structured environment for candidate tracking, screening, interview workflows and pipeline visibility without having to procure another recruitment platform solely for the engagement.
 </p>
 <p className="text-white/70 text-sm leading-relaxed mb-8">
 Where an enterprise requires its existing ATS or HR technology environment to remain the primary system of record, the operating model can be aligned during engagement discovery.
 </p>
 <div className="text-center">
 <a href="https://neohirex.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-200 hover:text-white transition-colors text-sm">
 Explore the NeoHireX platform <ArrowRight className="w-4 h-4" />
 </a>
 </div>
 </ScrollReveal>
 </div>
 </section>

 {/* NeoHireX capabilities */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <p className="text-2xs tracking-[0.16em] uppercase text-section-label mb-4">Platform</p>
 <h2 className="text-display-sm md:text-display font-display text-heading">What NeoHireX adds to the recruitment process</h2>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
 {neoHireXCapabilities.map((d, i) => (
 <motion.div key={d.title} variants={staggerItem} className="p-8 rounded-2xl bg-[#f5f5f7] h-full">
 <p className="text-xs text-body-muted mb-5">0{i + 1}</p>
 <h3 className="text-heading font-display text-lg mb-3">{d.title}</h3>
 <p className="text-body text-sm leading-relaxed">{d.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 <ScrollReveal className="text-center mt-10">
 <p className="text-body-muted text-sm max-w-2xl mx-auto">
 Technology helps make the process more structured. Recruiters and hiring teams remain accountable for hiring decisions.
 </p>
 </ScrollReveal>
 </div>
 </section>

 {/* Recruitment PODs */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
 <div className="max-w-5xl mx-auto">
 <ScrollReveal className="max-w-3xl mb-12">
 <h2 className="text-display-sm md:text-display font-display text-heading mb-5">Dedicated recruitment PODs that work with your team</h2>
 <p className="text-body text-base leading-relaxed">
 A Recruitment POD gives organizations dedicated talent acquisition capacity without requiring them to build every part of the recruitment operation internally. Depending on the engagement, a POD can support:
 </p>
 </ScrollReveal>
 <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.05}>
 {podScope.map((s) => (
 <motion.div key={s} variants={staggerItem} className="flex items-start gap-4 p-5 rounded-2xl bg-white">
 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
 <p className="text-heading text-sm">{s}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 <ScrollReveal>
 <p className="text-body mt-8 text-sm">
 The POD structure can be aligned to hiring volume, skills and business priorities.
 </p>
 </ScrollReveal>
 </div>
 </section>

 {/* Recruitment models */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm md:text-display font-display text-heading mb-5">Recruitment models for different hiring needs</h2>
 <p className="text-body text-lg max-w-3xl mx-auto">
 AI-powered talent acquisition is one of several NeoIntelli recruitment models. Choose the engagement that fits your hiring plan.
 </p>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 gap-6" stagger={0.08}>
 {recruitmentModels.map((m) => (
 <motion.div key={m.title} variants={staggerItem}>
 <Link to={m.href} className="group flex flex-col h-full p-8 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
 <h3 className="text-heading font-display text-xl mb-3">{m.title}</h3>
 <p className="text-body text-sm leading-relaxed mb-6">{m.desc}</p>
 <span className="mt-auto inline-flex items-center gap-1.5 text-primary text-sm">
 {m.cta} <ChevronRight className="w-3.5 h-3.5" />
 </span>
 </Link>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* Why NeoIntelli */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm md:text-display font-display text-heading">Why organizations choose NeoIntelli</h2>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
 {whyNeoIntelli.map((w) => (
 <motion.div key={w.title} variants={staggerItem} className="p-8 rounded-2xl bg-white h-full">
 <h3 className="text-heading font-display text-lg mb-3">{w.title}</h3>
 <p className="text-body text-sm leading-relaxed">{w.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* AI & Data callout */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto rounded-2xl bg-[#f5f5f7] p-8 md:p-12">
 <ScrollReveal>
 <h2 className="text-display-sm font-display text-heading mb-4">Building an AI or Data team?</h2>
 <p className="text-body text-sm leading-relaxed mb-4">
 AI and Data roles frequently require a deeper technical assessment model.
 </p>
 <p className="text-body text-sm leading-relaxed mb-6">
 NeoIntelli's AI & Data Talent Hiring service combines specialized sourcing, NeoHireX screening, recruiter validation and technical evaluation by experienced AI professionals for roles across AI, GenAI, machine learning, Data Engineering and MLOps.
 </p>
 <Link to="/services/ai-data-recruitment" className="inline-flex items-center gap-2 text-primary text-sm">
 Explore AI & Data Talent Hiring <ArrowRight className="w-4 h-4" />
 </Link>
 </ScrollReveal>
 </div>
 </section>

 {/* FAQ */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
 <div className="max-w-3xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm font-display text-heading">Frequently asked questions</h2>
 </ScrollReveal>
 <StaggerContainer className="space-y-3" stagger={0.06}>
 {faqs.map((faq) => (
 <motion.details key={faq.q} variants={staggerItem} className="group bg-white rounded-2xl transition-shadow duration-300">
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

 {/* CTA */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-footer-cta dark-section">
 <div className="max-w-3xl mx-auto text-center">
 <ScrollReveal>
 <h2 className="text-display-sm md:text-display font-display text-white mb-6">Build a more connected recruitment engine</h2>
 <p className="text-white/60 text-lg mb-4">
 Bring together experienced recruiters, dedicated recruitment capacity and NeoHireX in one talent acquisition model.
 </p>
 <p className="text-white/60 text-lg mb-10">
 Tell us what you need to hire, where you need to hire and how quickly you need the recruitment capability to scale.
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <Link to="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 bg-white hover:bg-white/95 text-[#054f67] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
 Discuss Your Hiring Plan <ArrowRight className="w-4 h-4" />
 </Link>
 <Link to="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 border border-white/30 text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm hover:-translate-y-0.5 transform">
 Book a Talent Acquisition Consultation
 </Link>
 </div>
 </ScrollReveal>
 </div>
 </section>

 <RelatedLinks links={relatedLinks} />

 <Footer />
 </div>
 );
}
