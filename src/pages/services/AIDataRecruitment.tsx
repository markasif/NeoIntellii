import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, ChevronRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ScrollReveal, StaggerContainer, staggerItem, TextReveal } from "@/components/animations";
import HeroBackground from "@/components/shared/HeroBackground";
import RelatedLinks from "@/components/shared/RelatedLinks";

const hiringModelLayers = [
 "Specialized Candidate Sourcing",
 "NeoHireX Screening & Ranking",
 "AI First-Round Interviews",
 "Recruiter Validation",
 "Technical Evaluation",
 "Qualified Candidate Shortlisting",
];

const marketStats = [
 { stat: "10:1", label: "Open GenAI/LLM roles per qualified engineer in India, per industry estimates" },
 { stat: "300%+", label: "Growth in job postings needing AI agent skills (LangChain, CrewAI) since early 2025" },
 { stat: "1M+", label: "AI and ML roles projected in India by the end of 2026" },
 { stat: "25-35%", label: "Typical offer-drop rate for in-demand GenAI profiles" },
];

const resumeRealityChecks = [
 "What the candidate actually built",
 "What part of the solution they owned",
 "Whether they worked beyond prototypes",
 "How they approached architecture and engineering trade-offs",
 "How they evaluated AI system quality",
 "How they deployed and operated systems",
 "How well their experience matches the role being hired for",
];

const roleCategories = [
 {
  category: "Generative AI & Agentic AI",
  roles: [
   { title: "AI Agent Developers", desc: "Engineers building tool-using, workflow-driven and multi-step AI applications." },
   { title: "Agentic AI Engineers", desc: "Professionals working on AI agent orchestration, integrations, memory, tools and enterprise workflows." },
   { title: "GenAI Engineers", desc: "Engineers building production applications using large language models and generative AI." },
   { title: "LLM Engineers", desc: "Professionals working across LLM applications, model integration, evaluation, retrieval and productionization." },
   { title: "AI Application Developers", desc: "Software engineers building AI-enabled enterprise and product applications." },
  ],
 },
 {
  category: "AI & Machine Learning",
  roles: [
   { title: "AI/ML Engineers", desc: "Engineers developing and deploying machine-learning and AI systems." },
   { title: "Machine Learning Engineers", desc: "Professionals working across model development, training, inference and production deployment." },
   { title: "Data Scientists", desc: "Professionals applying statistical analysis, experimentation and machine-learning techniques to business and product problems." },
   { title: "Computer Vision Engineers", desc: "Engineers developing image, video and vision-based AI systems." },
   { title: "NLP Engineers", desc: "Professionals developing language-processing and text intelligence systems." },
  ],
 },
 {
  category: "Data Engineering",
  roles: [
   { title: "Data Engineers", desc: "Engineers designing data pipelines, processing systems and scalable data foundations." },
   { title: "Data Architects", desc: "Senior professionals responsible for data architecture, integration and platform decisions." },
   { title: "Analytics Engineers", desc: "Professionals bridging transformed data, analytical models and business-facing data products." },
  ],
 },
 {
  category: "MLOps & AI Infrastructure",
  roles: [
   { title: "MLOps Engineers", desc: "Engineers responsible for deploying, operating, monitoring and improving machine-learning systems." },
   { title: "AI Platform Engineers", desc: "Professionals building common infrastructure used by AI engineering and Data Science teams." },
   { title: "Cloud AI Engineers", desc: "Engineers responsible for AI workloads and services across modern cloud environments." },
  ],
 },
 {
  category: "AI Architecture & Technical Leadership",
  roles: [
   { title: "AI Architects", desc: "Senior practitioners responsible for architecture decisions across enterprise AI solutions." },
   { title: "GenAI Architects", desc: "Architects designing LLM, RAG, agentic and generative-AI platforms." },
   { title: "AI Technical Leads", desc: "Experienced engineers leading implementation teams and technical delivery." },
  ],
 },
];

const processSteps = [
 { step: "01", title: "Technical Requirement & Role Calibration", desc: "We work to understand the business objective behind the hire, the technical environment, expected responsibilities, experience level and required capabilities. The goal is to differentiate genuine must-have skills from tools that simply appear in a job description." },
 { step: "02", title: "Role & Skill Mapping", desc: "The requirement is translated into a structured candidate and assessment profile. For example, a GenAI Engineer may require a very different evaluation from an ML Research Engineer, Data Engineer or MLOps Engineer." },
 { step: "03", title: "Specialized Candidate Sourcing", desc: "Recruiters identify candidates with relevant AI, Data or engineering backgrounds through targeted sourcing and talent networks." },
 { step: "04", title: "NeoHireX Screening & Ranking", desc: "Candidate profiles are processed through NeoHireX to support role-aligned screening and prioritization." },
 { step: "05", title: "AI First-Round Interview", desc: "Where appropriate, shortlisted candidates complete a structured AI-powered first-round interview." },
 { step: "06", title: "Recruiter Validation", desc: "NeoIntelli recruiters evaluate candidate communication, experience alignment, availability, compensation expectations and overall engagement readiness." },
 { step: "07", title: "Technical Evaluation", desc: "For relevant technical roles, candidates can undergo additional technical assessment based on the actual requirements of the position." },
 { step: "08", title: "AI Professional / Architect Interview", desc: "Experienced AI professionals can participate in technical validation for selected roles to assess practical engineering knowledge and solution experience." },
 { step: "09", title: "Qualified Shortlist", desc: "Candidates who complete the required assessment stages are presented to the client with the relevant evaluation context." },
 { step: "10", title: "Client Interview & Hiring", desc: "The client's team completes its interview and selection process, while NeoIntelli supports candidate coordination and hiring follow-through." },
];

const validationAreas = [
 { title: "Generative AI Engineering", desc: "LLM application design, prompt and context strategies, retrieval patterns, evaluation and enterprise integration." },
 { title: "Agentic AI", desc: "Agent orchestration, tool integration, workflow design, reliability, state management and multi-agent patterns." },
 { title: "RAG", desc: "Retrieval architecture, embeddings, vector search, chunking strategy, reranking, evaluation and grounding." },
 { title: "Machine Learning", desc: "Model selection, feature engineering, training, validation, inference and production considerations." },
 { title: "MLOps", desc: "Model deployment, versioning, pipelines, observability, monitoring and operational reliability." },
 { title: "Data Engineering", desc: "Data pipelines, processing patterns, data quality, architecture and platform scalability." },
 { title: "AI Architecture", desc: "System boundaries, integration patterns, model selection, scalability, security and production architecture." },
];

const neoHireXCapabilities = [
 { title: "Candidate Management", desc: "Maintain candidate profiles and recruitment activity within a structured pipeline." },
 { title: "AI Screening", desc: "Support initial candidate evaluation against defined role requirements." },
 { title: "Candidate Ranking", desc: "Prioritize profiles for recruiter and technical review." },
 { title: "AI Interviews", desc: "Add a structured first-round assessment before deeper technical interviews where appropriate." },
 { title: "Pipeline Visibility", desc: "Track candidates through different stages of the recruitment process." },
];

const engagementModels = [
 { title: "Permanent AI Hiring", desc: "Recruit AI and Data professionals directly into your organization." },
 { title: "Contract AI Talent", desc: "Add specialist capability for defined projects or periods where appropriate." },
 { title: "Dedicated AI Recruitment POD", desc: "Create dedicated recruitment capacity around ongoing AI and Data hiring requirements." },
 { title: "AI Team Building", desc: "Build multiple complementary roles as part of a new AI, Data or engineering team." },
 { title: "Specialized Technical Hiring", desc: "Use NeoIntelli for individual hard-to-fill roles requiring additional technical validation." },
];

const teamCapabilityStack = [
 "Data Engineering",
 "AI/ML Engineering",
 "GenAI / Agentic AI",
 "MLOps & AI Infrastructure",
 "Architecture & Technical Leadership",
];

const whyNeoIntelli = [
 { title: "Specialized AI & Data Focus", desc: "The recruitment process can be aligned to the specific technical requirements of AI, machine-learning, Data Engineering and MLOps roles." },
 { title: "Recruitment + Technology", desc: "NeoIntelli combines experienced recruiters with its proprietary hiring platform, NeoHireX." },
 { title: "Multiple Assessment Layers", desc: "Candidate evaluation can combine AI-assisted screening, AI first-round interviews, recruiter validation and technical assessment." },
 { title: "Technical Validation", desc: "Experienced AI professionals can participate in technical evaluation for relevant specialist roles." },
 { title: "India Talent Capability", desc: "Support organizations recruiting AI and Data talent across India's technology ecosystem." },
 { title: "Connected AI Capability", desc: "For organizations building larger teams, NeoIntelli can connect specialist recruitment with AI delivery pods, Micro GCC and AI-First GCC models." },
];

const faqs = [
 { q: "What does an AI recruitment agency do?", a: "An AI recruitment agency helps organizations identify, evaluate and hire professionals working in areas such as Artificial Intelligence, machine learning, Generative AI, Data Science and related engineering disciplines. NeoIntelli combines specialist recruitment with its proprietary AI hiring platform and additional technical validation for selected AI and Data roles." },
 { q: "Which AI roles can NeoIntelli help us hire?", a: "NeoIntelli supports roles including AI/ML Engineers, AI Agent Developers, Agentic AI Engineers, GenAI Engineers, LLM Engineers, Data Scientists, Data Engineers, MLOps Engineers, AI Platform Engineers and AI Architects." },
 { q: "Can you help hire an entire AI team?", a: "Yes. The recruitment model can support multiple complementary AI and Data roles rather than only individual vacancies. The appropriate team structure should be determined by the organization's objectives, technology environment and delivery responsibilities." },
 { q: "How do you technically evaluate AI candidates?", a: "Depending on the role, evaluation can include AI-assisted screening, structured interviews and technical validation by experienced AI professionals. Technical evaluation is aligned to the responsibilities of the role rather than relying on one generic AI interview." },
 { q: "Is NeoHireX used for AI recruitment?", a: "Yes. NeoHireX is NeoIntelli's proprietary AI-powered hiring platform and supports candidate management, screening, ranking, AI first-round interviews and recruitment pipeline management." },
 { q: "Do we need to purchase NeoHireX separately?", a: "For applicable NeoIntelli recruitment engagements, NeoHireX is included as part of the service with no separate ATS subscription required to manage the NeoIntelli recruitment workflow." },
 { q: "Do technical interviews replace our own engineering interviews?", a: "No. NeoIntelli's technical validation provides an additional assessment layer before or alongside the client's interview process. The client retains its own final evaluation and hiring decision." },
 { q: "Can NeoIntelli hire Agentic AI developers?", a: "Yes. Agentic AI and AI Agent Developer roles can be supported as part of NeoIntelli's specialist AI talent hiring service. The exact assessment criteria should be calibrated to the architecture, frameworks, integrations and production responsibilities expected from the candidate." },
 { q: "Can you help us build an AI team for a new GCC in India?", a: "Yes. Specialist AI hiring can be connected to NeoIntelli's broader AI-First GCC and Micro GCC services when an organization is establishing or expanding an India capability center." },
];

const relatedLinks = [
 { name: "AI-Powered Talent Acquisition", href: "/services/ai-talent-acquisition" },
 { name: "AI Delivery Pod", href: "/services/ai-delivery-teams/ai-delivery-pod" },
 { name: "AI Talent Services", href: "/services/ai-talent" },
 { name: "GenAI & Agentic AI Hiring", href: "/services/ai-talent/genai-agentic-ai-hiring" },
 { name: "AI GCC in India", href: "/services/ai-gcc" },
 { name: "Permanent Recruitment", href: "/recruitment/permanent" },
 { name: "Contract Staffing", href: "/recruitment/contract-staffing" },
 { name: "Recruitment Hub", href: "/recruitment" },
];

export default function AIDataRecruitment() {
 useEffect(() => {
 document.title = "AI & Data Recruitment Services India | NeoIntelli";
 }, []);
 return (
 <div className="min-h-screen bg-white">
 <Navbar />

 {/* Hero */}
 <section className="relative isolate pt-28 pb-4 md:pt-36 md:pb-6 px-6 sm:px-8 lg:px-12 text-center overflow-hidden">
 <HeroBackground />
 <div className="absolute top-[68px] left-0 right-0 px-6 sm:px-8 lg:px-12">
 <div className="max-w-[1120px] mx-auto">
 <nav className="flex items-center gap-0.5 text-2xs text-white/40 flex-wrap">
 <Link to="/" className="transition-colors hover:text-white/70">Home</Link>
 <ChevronRight className="w-2 h-2 text-white/30" />
 <Link to="/recruitment" className="transition-colors hover:text-white/70">Recruitment</Link>
 <ChevronRight className="w-2 h-2 text-white/30" />
 <Link to="/services/ai-talent-acquisition" className="transition-colors hover:text-white/70">AI-Powered Talent Acquisition</Link>
 <ChevronRight className="w-2 h-2 text-white/30" />
 <span className="text-white/50">AI & Data Recruitment</span>
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
 Recruitment - AI & Data Talent Hiring
 </motion.p>
 <motion.h1
 initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
 transition={{ duration: 0.7, delay: 0.1 }}
 className="text-hero-sm md:text-hero inner-page-hero font-display text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
 >
 AI & Data Recruitment Services in India
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="text-slate-100/90 text-lg md:text-body-lg max-w-2xl mx-auto mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
 >
 Hire specialized AI, GenAI, Agentic AI, machine learning, Data Engineering and MLOps professionals through a recruitment process that combines specialist sourcing, NeoHireX screening, recruiter validation and technical evaluation by experienced AI professionals.
 </motion.p>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.4 }}
 className="flex flex-wrap justify-center gap-4"
 >
 <Link to="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 bg-white hover:bg-white/95 text-[#054f67] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
 Build Your AI Team <ArrowRight className="w-4 h-4" />
 </Link>
 <Link to="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 border border-white/30 text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm hover:-translate-y-0.5 transform">
 Discuss Your AI Talent Requirements
 </Link>
 </motion.div>
 </div>
 </section>

 {/* What is */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto">
 <TextReveal className="text-display-sm md:text-[2.75rem] font-display text-heading leading-[1.12] mb-10">
 Specialized AI & Data talent hiring
 </TextReveal>
 <ScrollReveal>
 <p className="text-body text-base leading-relaxed mb-8">
 NeoIntelli provides specialist AI and Data recruitment services for organizations building technical teams across Artificial Intelligence, Generative AI, Agentic AI, machine learning, Data Engineering, Data Science, MLOps and AI architecture. Our hiring model combines:
 </p>
 </ScrollReveal>
 <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" stagger={0.06}>
 {hiringModelLayers.map((layer, i) => (
 <motion.div key={layer} variants={staggerItem} className="p-6 rounded-2xl bg-[#f5f5f7]">
 <p className="text-xs text-body-muted mb-3">0{i + 1}</p>
 <p className="text-heading font-display text-sm">{layer}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 <ScrollReveal>
 <p className="text-body text-base leading-relaxed">
 For roles requiring deeper technical assessment, experienced AI professionals can participate in evaluating candidates before they reach the client's technical interview process.
 </p>
 </ScrollReveal>
 </div>
 </section>

 {/* Market stats */}
 <section className="px-6 sm:px-8 lg:px-12 pb-10">
 <div className="max-w-5xl mx-auto bg-[#f5f5f7] rounded-2xl p-6 md:p-7">
 <p className="text-2xs tracking-[0.16em] uppercase text-section-label mb-6 text-center">India's AI talent market in 2026</p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
 {marketStats.map((m) => (
 <div key={m.stat}>
 <p className="text-2xl font-display text-heading">{m.stat}</p>
 <p className="text-sm text-body">{m.label}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Beyond keyword matching */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
 <div className="max-w-4xl mx-auto">
 <ScrollReveal className="mb-10">
 <h2 className="text-display-sm md:text-display font-display text-heading mb-6">AI hiring requires more than matching keywords on a resume</h2>
 <p className="text-body text-base leading-relaxed mb-4">
 AI engineering roles are evolving quickly. Two candidates may both list LLMs, RAG, machine learning or Agentic AI on their resumes while having very different levels of implementation experience.
 </p>
 <p className="text-body text-base leading-relaxed">
 The challenge is therefore not simply identifying candidates who mention the right technologies. Organizations need to understand:
 </p>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 gap-4 mb-10" stagger={0.05}>
 {resumeRealityChecks.map((c) => (
 <motion.div key={c} variants={staggerItem} className="flex items-start gap-4 p-5 rounded-2xl bg-white">
 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
 <p className="text-heading text-sm">{c}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 <ScrollReveal>
 <p className="text-body text-base leading-relaxed">
 NeoIntelli combines recruitment expertise with additional technical validation so hiring teams can spend more interview time with candidates who have already gone through a more structured evaluation process.
 </p>
 </ScrollReveal>
 </div>
 </section>

 {/* Roles */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <p className="text-2xs tracking-[0.16em] uppercase text-section-label mb-4">Roles</p>
 <h2 className="text-display-sm md:text-display font-display text-heading">Roles we help organizations hire</h2>
 </ScrollReveal>
 <div className="space-y-14">
 {roleCategories.map((cat) => (
 <div key={cat.category}>
 <ScrollReveal className="mb-6">
 <h3 className="text-2xl font-display text-heading">{cat.category}</h3>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
 {cat.roles.map((r) => (
 <motion.div key={r.title} variants={staggerItem} className="p-6 rounded-2xl bg-[#f5f5f7] h-full">
 <h4 className="text-heading font-display text-base mb-2">{r.title}</h4>
 <p className="text-body text-sm leading-relaxed">{r.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Process */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#fafafc]">
 <div className="max-w-5xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm md:text-display font-display text-heading">How NeoIntelli's AI & Data hiring process works</h2>
 </ScrollReveal>
 <StaggerContainer className="space-y-0" stagger={0.07}>
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

 {/* Technical validation */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="max-w-3xl mb-12">
 <h2 className="text-display-sm md:text-display font-display text-heading mb-5">Technical validation by people who understand AI delivery</h2>
 <p className="text-body text-base leading-relaxed">
 Technical validation is an additional layer within NeoIntelli's specialist AI hiring process. Depending on the role, evaluation may explore experience across areas such as:
 </p>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
 {validationAreas.map((v) => (
 <motion.div key={v.title} variants={staggerItem} className="p-6 rounded-2xl border border-black/[0.06] bg-white h-full">
 <h3 className="text-heading font-display text-lg mb-2">{v.title}</h3>
 <p className="text-body text-sm leading-relaxed">{v.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 <ScrollReveal>
 <p className="text-body-muted text-sm mt-8 max-w-3xl">
 The depth and scope of technical validation should be aligned to the role rather than using the same interview process for every AI candidate.
 </p>
 </ScrollReveal>
 </div>
 </section>

 {/* NeoHireX */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-footer-cta dark-section">
 <div className="max-w-5xl mx-auto">
 <ScrollReveal className="text-center mb-12">
 <h2 className="text-display-sm md:text-display font-display text-white mb-6">Powered by our own hiring platform, NeoHireX</h2>
 <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto mb-4">
 NeoHireX is NeoIntelli's proprietary AI-powered ATS and hiring platform. It supports the recruitment process across candidate management, screening, ranking, AI first-round interviews and pipeline management.
 </p>
 <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto">
 For applicable NeoIntelli recruitment engagements, NeoHireX is included as part of the service, so organizations do not need to separately procure an ATS subscription simply to manage the NeoIntelli recruitment engagement.
 </p>
 </ScrollReveal>
 <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
 {neoHireXCapabilities.map((c) => (
 <motion.div key={c.title} variants={staggerItem} className="p-6 rounded-2xl bg-white/[0.04]">
 <h3 className="text-white font-display text-lg mb-2">{c.title}</h3>
 <p className="text-white/60 text-sm leading-relaxed">{c.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 <ScrollReveal className="text-center mt-10">
 <a href="https://neohirex.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-200 hover:text-white transition-colors text-sm">
 Explore NeoHireX <ArrowRight className="w-4 h-4" />
 </a>
 </ScrollReveal>
 </div>
 </section>

 {/* Engagement models */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm md:text-display font-display text-heading">AI & Data hiring engagement models</h2>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
 {engagementModels.map((m, i) => (
 <motion.div key={m.title} variants={staggerItem} className="p-8 rounded-2xl bg-[#f5f5f7] h-full">
 <p className="text-xs text-body-muted mb-5">0{i + 1}</p>
 <h3 className="text-heading font-display text-lg mb-3">{m.title}</h3>
 <p className="text-body text-sm leading-relaxed">{m.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* Team building */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
 <div className="max-w-4xl mx-auto">
 <ScrollReveal className="mb-10">
 <h2 className="text-display-sm md:text-display font-display text-heading mb-5">Building an AI team, not just filling one position?</h2>
 <p className="text-body text-base leading-relaxed">
 Hiring one AI Engineer and building an AI capability are different problems. An AI team may require complementary expertise across areas such as:
 </p>
 </ScrollReveal>
 <StaggerContainer className="flex flex-col items-center gap-2 mb-10" stagger={0.08}>
 {teamCapabilityStack.map((layer, i) => (
 <motion.div key={layer} variants={staggerItem} className="flex flex-col items-center gap-2 w-full max-w-md">
 {i > 0 && <ArrowDown className="w-4 h-4 text-body-muted" />}
 <div className="w-full p-5 rounded-2xl bg-white text-center">
 <p className="text-heading font-display text-sm">{layer}</p>
 </div>
 </motion.div>
 ))}
 </StaggerContainer>
 <ScrollReveal>
 <p className="text-body text-base leading-relaxed mb-4">
 NeoIntelli can support organizations hiring individual specialists as well as broader AI and Data teams.
 </p>
 <p className="text-body text-base leading-relaxed mb-6">
 For global companies building larger India capabilities, this hiring requirement can also connect with NeoIntelli's AI GCC and AI Micro GCC models, where hiring runs alongside people operations, workspace, IT and AI infrastructure.
 </p>
 <Link to="/services/ai-gcc" className="inline-flex items-center gap-2 text-primary text-sm">
 Explore AI GCC in India <ArrowRight className="w-4 h-4" />
 </Link>
 </ScrollReveal>
 </div>
 </section>

 {/* Hiring vs pod */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto rounded-2xl bg-[#f5f5f7] p-8 md:p-12">
 <ScrollReveal>
 <h2 className="text-display-sm font-display text-heading mb-4">Hiring vs. building a delivery pod</h2>
 <p className="text-body text-sm leading-relaxed mb-4">
 Not every capability gap needs to be solved through permanent recruitment.
 </p>
 <p className="text-body text-sm leading-relaxed mb-4">
 If you want professionals to become part of your organization, AI & Data Talent Hiring can help build the internal team.
 </p>
 <p className="text-body text-sm leading-relaxed mb-6">
 If you need a delivery capability responsible for executing AI or Data work rather than people to hire, explore NeoIntelli's AI Delivery Teams.
 </p>
 <Link to="/services/ai-delivery-teams" className="inline-flex items-center gap-2 text-primary text-sm">
 Explore AI Delivery Teams <ArrowRight className="w-4 h-4" />
 </Link>
 </ScrollReveal>
 </div>
 </section>

 {/* Why NeoIntelli */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm md:text-display font-display text-heading">Why NeoIntelli for AI & Data recruitment?</h2>
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

 {/* FAQ */}
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-3xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm font-display text-heading">Frequently asked questions</h2>
 </ScrollReveal>
 <StaggerContainer className="space-y-3" stagger={0.06}>
 {faqs.map((faq) => (
 <motion.details key={faq.q} variants={staggerItem} className="group bg-[#f5f5f7] rounded-2xl transition-shadow duration-300">
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
 <h2 className="text-display-sm md:text-display font-display text-white mb-6">Build your AI team with stronger technical signal</h2>
 <p className="text-white/60 text-lg mb-4">
 Tell us the AI capability you are building, the roles you need and the technical outcomes those people will own.
 </p>
 <p className="text-white/60 text-lg mb-10">
 NeoIntelli can design a specialist recruitment process combining targeted sourcing, NeoHireX, recruiter evaluation and technical validation.
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <Link to="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 bg-white hover:bg-white/95 text-[#054f67] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
 Build Your AI Team <ArrowRight className="w-4 h-4" />
 </Link>
 <Link to="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 border border-white/30 text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm hover:-translate-y-0.5 transform">
 Discuss Your AI Talent Requirements
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
