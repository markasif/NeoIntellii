import { gccOperationsPageMeta } from "@/data/gccOperationsContent";

export interface PageMeta {
 title: string;
 description: string;
}

export const pageMeta: Record<string, PageMeta> = {
"/": {
 title:"NeoIntelli",
 description:"Enterprise AI and GCC partner helping global companies scale capability centers in India.",
 },
"/blueprint": {
 title:"GCC Blueprint",
 description:"End-to-end playbook for launching a high-performing Global Capability Center in India.",
 },
"/case-studies": {
 title:"Case Studies",
 description:"How enterprises transformed delivery, AI and operations through NeoIntelli GCC programs.",
 },
"/book-a-call": {
 title:"Book a Call",
 description:"Book a 30-minute strategy call with a NeoIntelli GCC lead.",
 },
"/contact": {
 title:"Talk to Us",
 description:"Book a working session with our GCC and AI leadership team to map your next move.",
 },
"/gcc-as-a-service": {
 title:"GCC as a Service",
 description:"A fully managed model that runs your GCC end-to-end while you keep IP and control.",
 },
"/gcc-cost-calculator": {
 title:"GCC Cost Calculator",
 description:"Estimate the cost of building and operating a GCC in India across roles and locations.",
 },
"/lp/gcc-playbook": {
 title:"GCC Decision Lab",
 description:"Design an India AI GCC team, model the full cost, compare cities and export a decision pack.",
 },
"/gcc-india-cost": {
 title:"GCC India Cost Guide",
 description:"Benchmarks on talent, real estate, infrastructure and compliance costs for India GCCs.",
 },
"/gcc-vs-outsourcing": {
 title:"GCC vs Outsourcing",
 description:"How a captive GCC compares to traditional outsourcing on cost, control and value.",
 },
"/industries": {
 title:"Industries",
 description:"GCC and AI solutions tailored to BFSI, healthcare, technology, manufacturing and more.",
 },
"/industries/bfsi-gcc": {
 title:"BFSI GCC",
 description:"Compliant, secure capability centers for banks, insurers and capital markets firms.",
 },
"/industries/healthcare-gcc": {
 title:"Healthcare GCC",
 description:"HIPAA-aligned engineering, data and AI pods for payers, providers and med-tech.",
 },
"/industries/technology-gcc": {
 title:"Technology GCC",
 description:"Product engineering, platform and AI pods built for high-velocity tech companies.",
 },
"/industries/manufacturing-gcc": {
 title:"Manufacturing GCC",
 description:"Industry 4.0, supply chain and digital engineering capability centers for manufacturers.",
 },
"/industries/private-equity-gcc": {
 title:"Private Equity GCC",
 description:"Cross-portfolio GCC platforms that drive EBITDA, value creation and rapid scale.",
 },
"/industries/retail-gcc": {
 title:"Retail GCC",
 description:"Commerce, supply chain and customer analytics pods for global retail and CPG brands.",
 },
"/services/ai-delivery-teams": {
 title:"AI Delivery Teams",
 description:"Dedicated AI engineering teams, delivery pods and forward-deployed engineers embedded in your delivery system.",
 },
"/services/ai-delivery-teams/dedicated-ai-engineering-team": {
 title:"Dedicated AI Team",
 description:"A stable AI engineering team on your ongoing roadmap, keeping technical context across releases.",
 },
"/services/ai-delivery-teams/ai-delivery-pod": {
 title:"AI Delivery Pod",
 description:"A cross-functional AI unit built around one defined production outcome and one charter.",
 },
"/services/ai-delivery-teams/forward-deployed-ai-engineers": {
 title:"Forward-Deployed AI Engineers",
 description:"AI engineers embedded in your repositories, systems and workflows to reach production.",
 },
"/services/ai-delivery-teams/ai-team-transfer": {
 title:"AI Team Build & Transfer",
 description:"Deliver now, then transfer knowledge and ownership to your internal team, Micro GCC or AI GCC.",
 },
"/services/ai-gcc": {
 title:"AI GCC",
 description:"Build and operate your AI GCC in India: strategy, hiring, HR, workspace, GPU, AI engineering, AgentOps, governance and scale.",
 },
"/services/ai-gcc/ai-advisory-strategy": {
 title:"AI Advisory",
 description:"AI maturity, GCC mandate, use-case portfolio, operating model and a value roadmap measured in business outcomes.",
 },
"/services/ai-gcc/data-engineering": {
 title:"Data Engineering",
 description:"AI-ready data platforms, pipelines, reusable data products, vector infrastructure, lineage and data FinOps.",
 },
"/services/ai-gcc/generative-ai": {
 title:"Generative & Agentic AI",
 description:"Enterprise RAG, copilots, agentic AI, evaluation and production engineering inside your GCC.",
 },
"/services/ai-gcc/mlops": {
 title:"MLOps, LLMOps & AgentOps",
 description:"The production operating layer for models, LLM applications and agents: CI/CD, evaluation, observability, cost, governance.",
 },
"/services/ai-gcc/responsible-ai": {
 title:"AI Governance & Responsible AI",
 description:"AI inventory, risk classification, model and agent governance, evaluation, controls, monitoring and audit evidence.",
 },
"/services/ai-gcc/setup-operations": {
 title:"Setup & Operations",
 description:"Entity coordination, Hiring OS, HR, workspace, IT, cloud and GPU, AI platform, governance and the path to captive.",
 },
"/services/ai-gcc/ai-infrastructure-gpu": {
 title:"AI Infrastructure & GPU",
 description:"Cloud, reserved and dedicated GPU, developer, training and inference environments, storage, networking and AI FinOps.",
 },
"/services/micro-gcc": {
 title:"Micro GCC",
 description:"A dedicated capability pod starting from 5 to 50 engineers with managed operations, workspace and IT.",
 },
"/services/ai-talent": {
 title:"AI Talent",
 description:"Technically validated GenAI, Agentic AI, ML, Data, MLOps and AI Platform talent in India, from one hire to a complete AI team.",
 },
"/services/ai-talent/ai-ml-recruitment": {
 title:"AI & ML Recruitment",
 description:"AI engineers, ML engineers, deep learning, NLP, computer vision, research engineers, data scientists and AI architects.",
 },
"/services/ai-talent/genai-agentic-ai-hiring": {
 title:"GenAI & Agentic AI Hiring",
 description:"GenAI, LLM, RAG, agentic AI and AI application engineers and architects, assessed on production ownership.",
 },
"/services/ai-talent/data-engineering-data-science-hiring": {
 title:"Data Engineering & Data Science Hiring",
 description:"Data engineers, analytics and platform engineers, data architects, data scientists and AI data engineers.",
 },
"/services/ai-talent/mlops-ai-platform-hiring": {
 title:"MLOps & AI Platform Hiring",
 description:"MLOps, AI platform, AI infrastructure, LLMOps, AgentOps and GPU infrastructure engineers for production AI.",
 },
"/services/ai-talent/ai-leadership-executive-search": {
 title:"AI Leadership & Executive Search",
 description:"Chief AI Officer, Head of AI, VP AI and Data, AI engineering and platform directors and GCC AI heads.",
 },
"/services/ai-talent/recruitment-hub": {
 title:"AI Recruitment Hub + NeoHireX",
 description:"A dedicated recruitment POD, NeoHireX Hiring OS and technical validation for 10 to 100+ technical hires.",
 },
"/services/ai-talent/ai-reskilling-academy": {
 title:"AI Talent Academy & Reskilling",
 description:"Convert the engineers you already employ into validated GenAI, AI data, MLOps, agentic AI and AI evaluation roles.",
 },
"/services/gcc": {
 title:"GCC Strategy & Setup",
 description:"Decide, design and launch the right GCC in India: business case, operating model, location and coordinated launch.",
 },
"/services/gcc/strategy-business-case": {
 title:"Strategy & Business Case",
 description:"Should we build a GCC, what should it own, and what is the board-ready multi-year case for it?",
 },
"/services/gcc/location-strategy": {
 title:"Location Strategy",
 description:"Choose the Indian city around the mandate: role-level talent depth, cost, attrition, ecosystem and policy.",
 },
"/services/gcc/setup-launch": {
 title:"Setup & Launch",
 description:"Entity, leadership, talent, workplace, IT and governance workstreams run in parallel to a working center.",
 },
"/services/gcc/modernization-transformation": {
 title:"Modernization & Transformation",
 description:"Move an existing GCC from delivery capacity to enterprise capability, ownership and AI.",
 },
"/services/ai-engineering": {
 title:"AI Engineering",
 description:"Production AI across Generative AI, Agentic AI, machine learning and data, from proof of value to permanent capability.",
 },
"/services/ai-engineering/generative-agentic-ai": {
 title:"Generative & Agentic AI",
 description:"Enterprise RAG, copilots, LLM applications and tool-using agents engineered for production workflows.",
 },
"/services/ai-engineering/applied-ai-ml": {
 title:"Applied AI & Machine Learning",
 description:"Forecasting, prediction, optimisation, recommendation, anomaly detection, computer vision and NLP as decision systems.",
 },
"/services/ai-engineering/data-engineering": {
 title:"AI Data Engineering",
 description:"AI-ready data platforms: pipelines, governed data products, document pipelines, vector and hybrid retrieval, evaluation datasets.",
 },
"/services/ai-engineering/ai-product-engineering": {
 title:"AI Product Engineering",
 description:"AI-native products and AI features inside existing software, with AI UX, evaluation, latency and cost designed together.",
 },
"/services/ai-engineering/ai-agents-automation": {
 title:"AI Agents & Automation",
 description:"Enterprise AI agents and agent-enabled workflows with tool use, permissions, evaluation and human oversight.",
 },
"/services/ai-engineering/mlops-llmops-agentops": {
 title:"MLOps, LLMOps & AgentOps",
 description:"The operating layer for models, LLM applications and agents: deployment, evaluation gates, tracing, observability, cost.",
 },
"/services/ai-engineering/ai-evaluation-assurance": {
 title:"AI Evaluation & Assurance",
 description:"Golden datasets, task-success metrics, groundedness, tool-call correctness, red teaming and production monitoring.",
 },
"/recruitment": {
  title:"Recruitment Agency India | Staffing, Search & RPO",
  description:"Full-service recruitment agency - permanent hiring, contract staffing, executive search and RPO across Bangalore, Hyderabad, Mumbai, Delhi NCR, Pune and Chennai.",
 },
"/recruitment/permanent": {
  title:"Permanent Recruitment India",
  description:"Direct hire for mid-to-senior roles - 21-day median time-to-offer, 92% offer-to-join, 90-day replacement guarantee.",
 },
"/recruitment/contract-staffing": {
  title:"Contract Staffing & C2H India",
  description:"Compliant contract staffing with candidates on our payroll, full PF/ESI/PT/LWF compliance and 14-day onboarding SLA.",
 },
"/recruitment/executive-search": {
  title:"Executive Search Firms India",
  description:"Retained executive search for CXO, country head and board-level roles - mapped-market research with 12-month replacement guarantee.",
 },
"/recruitment/rpo": {
  title:"RPO Services India",
  description:"Recruitment process outsourcing with embedded recruiter pods - 30-day stand-up, 40-60% lower cost-per-hire, quarterly flex.",
 },
"/services/ai-talent-acquisition": {
  title:"AI-Powered Talent Acquisition",
  description:"Dedicated recruitment PODs, experienced recruiters and NeoHireX - AI screening, ranking and first-round interviews in one hiring model.",
 },
"/services/ai-data-recruitment": {
  title:"AI & Data Recruitment",
  description:"Hire GenAI, Agentic AI, ML, Data Engineering and MLOps professionals - specialist sourcing, NeoHireX screening and technical validation by AI practitioners.",
 },
...gccOperationsPageMeta,
};

export function getPageMeta(href: string, fallbackName?: string): PageMeta {
 const found = pageMeta[href];
 if (found) return found;
 return {
 title: fallbackName ?? href,
 description:"",
 };
}