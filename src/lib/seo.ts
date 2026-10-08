import { blogPosts } from "@/data/blogPosts";
import { pageMeta } from "@/lib/pageMeta";
import { AI_ENGINEERING_CHILD_PAGES, AI_ENGINEERING_HUB_PATH, AI_ENGINEERING_PAGES } from "@/data/aiEngineering";
import { gccOverviewFaqs } from "@/data/gccStrategyFaqs";
import { gccOperationsPaths, gccOperationsRouteSeo, gccOperationsFaqs, buildGccOperationsServiceSchemas } from "@/data/gccOperationsContent";
import { GCC_PLAYBOOK_FAQS } from "@/data/gccPlaybook";
import { HOME_FAQS } from "@/data/homepage";
import { ABOUT_FAQS } from "@/data/about";

export const SITE_URL ="https://neointelli.com";
export const SITE_NAME ="NeoIntelli";

export type RouteSeo = {
 title: string;
 description: string;
 path: string;
 type?:"website"|"article";
 keywords?: string[];
 /**
  * Absolute URL for <link rel="canonical"> when it is not this path. A paid
  * page that mirrors an organic one points at the organic page, so the two
  * never compete and link equity lands in one place.
  */
 canonical?: string;
};

export const PRERENDER_ROUTES = [
"/",
"/about",
"/contact",
"/book-a-call",
"/blog",
"/case-studies",
"/industries",
"/privacy-policy",
"/terms-of-service",
"/cookie-policy",
"/blueprint",
"/services/gcc",
"/services/gcc/setup-launch",
"/services/gcc/strategy-business-case",
"/services/gcc/location-strategy",
"/services/gcc/modernization-transformation",
"/services/ai-gcc",
"/services/ai-gcc/ai-advisory-strategy",
"/services/ai-gcc/setup-operations",
"/services/ai-gcc/generative-ai",
"/services/ai-gcc/data-engineering",
"/services/ai-gcc/mlops",
"/services/ai-gcc/responsible-ai",
"/services/ai-gcc/ai-infrastructure-gpu",
"/services/ai-talent",
"/services/ai-talent/ai-ml-recruitment",
"/services/ai-talent/genai-agentic-ai-hiring",
"/services/ai-talent/data-engineering-data-science-hiring",
"/services/ai-talent/mlops-ai-platform-hiring",
"/services/ai-talent/ai-leadership-executive-search",
"/services/ai-talent/recruitment-hub",
"/services/ai-talent/ai-reskilling-academy",
 ...AI_ENGINEERING_PAGES.map((page) => page.path),
"/services/ai-delivery-teams",
"/services/ai-delivery-teams/dedicated-ai-engineering-team",
"/services/ai-delivery-teams/ai-delivery-pod",
"/services/ai-delivery-teams/forward-deployed-ai-engineers",
"/services/ai-delivery-teams/ai-team-transfer",
"/services/micro-gcc",
"/services/ai-talent-acquisition",
"/services/ai-data-recruitment",
"/gcc-for-ai-startups",
"/gcc-readiness-assessment",
"/gcc-roi-estimator",
"/gcc-faq",
"/careers",
"/industries/manufacturing-gcc",
"/industries/private-equity-gcc",
"/industries/retail-gcc",
 "/industries/bfsi-gcc",
 "/industries/healthcare-gcc",
 "/industries/technology-gcc",
 "/gcc-vs-outsourcing",
 "/gcc-cost-calculator",
 "/gcc-as-a-service",
 "/gcc-india-cost",
 "/recruitment",
 "/recruitment/permanent",
 "/recruitment/contract-staffing",
 "/recruitment/executive-search",
 "/recruitment/rpo",
 "/lp/ai-first-gcc",
 "/lp/gcc-playbook",
 ...gccOperationsPaths,
 ...blogPosts.map((post) => `/blog/${post.slug}`),
] as const;

// Enterprise AI Engineering (/services/ai-engineering and children). Titles,
// descriptions and keywords come from the section registry so the subnav,
// sitemap, schema and tests read the same values.
const AI_ENGINEERING_ROUTE_SEO: RouteSeo[] = AI_ENGINEERING_PAGES.map((page) => ({
 path: page.path,
 title: page.seoTitle,
 description: page.metaDescription,
 keywords: page.keywords,
}));

export const ROUTE_SEO: RouteSeo[] = [
 { path:"/", title:"AI GCC Services India | End-to-End GCC Partner | NeoIntelli", description:"Build and scale an AI GCC in India with NeoIntelli across GCC strategy, AI talent, AI engineering, delivery teams, setup and ongoing operations.", keywords: ["AI GCC India","AI Global Capability Center India","AI GCC services","AI GCC setup India","AI capability center India","GCC services India","GCC partner India","AI talent India","GCC operations India"] },
 { path:"/about", title:"About NeoIntelli | India AI GCC Operating Partner", description:"How NeoIntelli helps global companies build, operate and scale AI-led capability in India across strategy, talent, AI engineering and GCC operations."},
 { path:"/contact", title:"Contact NeoIntelli | India GCC & AI", description:"Contact NeoIntelli to discuss GCC setup, AI-first GCC strategy, specialist talent, or technology enablement in India."},
 { path:"/book-a-call", title:"Book a 30-Minute GCC Strategy Call | NeoIntelli", description:"Book a 30-minute call with a NeoIntelli GCC strategy lead to talk through your India capability center: team shape, city, cost and timeline."},
 { path:"/blog", title:"GCC, AI & Enterprise Insights | NeoIntelli Blog", description:"Expert insights on India GCC setup, AI-first capability centres, talent strategy, and enterprise transformation for global companies."},
  { path:"/case-studies", title:"Our Approach | GCC Delivery Methodology | NeoIntelli", description:"The NeoIntelli methodology for designing, launching, and scaling GCCs in India: 4-phase delivery framework, engagement types, and how we measure success."},
 { path:"/industries", title:"Industries | India GCC & AI | NeoIntelli", description:"NeoIntelli supports GCC and AI programs across BFSI, healthcare, retail, manufacturing, software, and PE-backed portfolios."},
 { path:"/privacy-policy", title:"Privacy Policy | NeoIntelli", description:"Review NeoIntelli's Privacy Policy for information on data collection, processing, and your rights."},
 { path:"/terms-of-service", title:"Terms of Service | NeoIntelli", description:"Read NeoIntelli's Terms of Service governing website access and service interactions."},
 { path:"/cookie-policy", title:"Cookie Policy | NeoIntelli", description:"Read NeoIntelli's Cookie Policy for details on how cookies are used and managed."},
 { path:"/blueprint", title:"GCC Blueprint | India GCC Strategy | NeoIntelli", description:"NeoIntelli's GCC Blueprint defines your India GCC strategy, operating model, launch path, talent plan, and AI readiness."},
 { path:"/services/micro-gcc", title:"Micro GCC Setup in India | NeoIntelli", description:"Launch a Micro GCC in India: a lean, squad-based captive center of 8-50 people. Full ownership of IP, senior-led pods, and a 90-day path to operational.", keywords: ["micro GCC","micro GCC India","micro GCC setup","small GCC India","lean captive center India","squad-based GCC","mid-market GCC India"] },
 { path:"/services/gcc", title:"GCC Strategy & Setup in India | NeoIntelli", description:"Design and launch your India GCC with NeoIntelli across business case, operating model, location strategy, workforce planning and coordinated setup execution.", keywords: ["GCC services India","GCC consulting India","GCC advisory India","GCC setup India","Global Capability Center India","GCC partner India","GCC strategy and setup"] },
 { path:"/services/gcc/setup-launch", title:"GCC Setup & Launch Services in India | NeoIntelli", description:"Launch your India GCC through coordinated entity, leadership, talent, workplace, IT, governance and readiness workstreams built around one integrated program.", keywords: ["GCC setup India","set up GCC India","GCC launch India","build GCC India","GCC implementation India"] },
 { path:"/services/gcc/strategy-business-case", title:"GCC Strategy & Business Case India | NeoIntelli", description:"Build a board-ready GCC strategy covering mandate, operating model, cost case, workforce, location, risk, governance and ownership path.", keywords: ["GCC strategy India","GCC business case","GCC feasibility","GCC advisory","GCC operating model strategy","GCC vs outsourcing","GCC vs BOT"] },
 { path:"/services/gcc/location-strategy", title:"GCC Location Strategy India | City Selection | NeoIntelli", description:"Choose the right India GCC city using role-level talent depth, AI and data skills, pay, attrition, infrastructure, real estate and state policy.", keywords: ["GCC location strategy India","best city for GCC India","GCC city comparison India","Bengaluru GCC","Hyderabad GCC","Pune GCC","Chennai GCC","AI talent location India"] },
 { path:"/services/gcc/modernization-transformation", title:"GCC Modernization & Transformation India | NeoIntelli", description:"Modernize an existing India GCC through mandate redesign, AI and data capability, workforce transformation and a stronger operating model.", keywords: ["GCC transformation India","GCC modernization","GCC maturity","existing GCC transformation","AI-enabled GCC transformation","GCC mandate expansion"] },
 { path:"/services/ai-gcc", title:"AI GCC in India | Build, Operate & Scale | NeoIntelli", description:"Build and operate an AI GCC in India with one partner for strategy, hiring, HR, workspace, GPU infrastructure, AI engineering, AgentOps, governance and scale.", keywords: ["AI GCC India","AI GCC setup India","AI-first GCC India","AI Global Capability Center India","AI capability center India","build AI GCC India","AI engineering center India","AI GCC partner India","AI Micro GCC","GCC for AI startups"] },
 { path:"/services/ai-gcc/ai-advisory-strategy", title:"AI Advisory for GCCs | Strategy & Value | NeoIntelli", description:"Define your AI GCC strategy with maturity assessment, use-case prioritization, operating-model design, AI value realization and responsible AI governance.", keywords: ["AI advisory GCC","AI GCC strategy","AI value realization","GCC AI mandate","AI operating model GCC"] },
 { path:"/services/ai-gcc/setup-operations", title:"AI GCC Setup & Operations in India | NeoIntelli", description:"Set up and run an AI GCC in India with team design, Hiring OS, HR, workspace, cloud/GPU infrastructure, operating governance and BOT support.", keywords: ["AI GCC setup India","AI GCC operations","managed AI GCC","build operate transfer AI GCC","AI team India setup"] },
 { path:"/services/ai-gcc/generative-ai", title:"Generative & Agentic AI for GCCs | NeoIntelli", description:"Build production GenAI and agentic AI inside your GCC with RAG, evaluation, AI agents, guardrails, deployment and cost controls.", keywords: ["agentic AI GCC","generative AI GCC","enterprise RAG India","AI agents GCC","GenAI engineering center India"] },
 { path:"/services/ai-gcc/data-engineering", title:"Data Engineering for AI GCCs | NeoIntelli", description:"Build the AI-ready data foundation for your GCC with data platforms, pipelines, reusable data products, vector infrastructure, governance and FinOps.", keywords: ["AI data platform GCC","data engineering AI GCC","AI-ready data foundation","vector infrastructure GCC","data products for AI"] },
 { path:"/services/ai-gcc/mlops", title:"MLOps, LLMOps & AgentOps for GCCs | NeoIntelli", description:"Run production AI reliably with MLOps, LLMOps and AgentOps covering CI/CD, evaluation, observability, model routing, drift, cost and governance.", keywords: ["MLOps GCC","AgentOps GCC","LLMOps India","AI production operations GCC","what is AgentOps"] },
 { path:"/services/ai-gcc/responsible-ai", title:"Responsible AI Governance for GCCs | NeoIntelli", description:"Establish AI governance for your GCC with AI inventory, risk classification, agent governance, evaluation, controls, monitoring and audit evidence.", keywords: ["AI governance GCC","responsible AI GCC","agent governance","AI risk classification","EU AI Act readiness GCC"] },
 { path:"/services/ai-gcc/ai-infrastructure-gpu", title:"AI Infrastructure & GPU for GCCs | NeoIntelli", description:"Design GPU and AI infrastructure for your GCC across cloud, reserved and dedicated compute, training, inference, developer environments and AI FinOps.", keywords: ["AI infrastructure GCC","GPU setup GCC India","GPU infrastructure India AI team","AI FinOps","dedicated GPU vs cloud GPU"] },
 { path:"/services/ai-talent", title:"AI Recruitment & Talent Services India | NeoIntelli", description:"Hire technically validated GenAI, Agentic AI, ML, Data and MLOps talent in India with specialist recruiters, NeoHireX and practitioner-led evaluation.", keywords: ["AI recruitment India","AI talent India","AI recruitment agency India","hire AI engineers India","AI hiring services India","technically validated AI talent","GCC AI hiring India"] },
 { path:"/services/ai-talent/ai-ml-recruitment", title:"AI & ML Recruitment Agency India | NeoIntelli", description:"AI and machine learning recruitment in India: AI and ML engineers, NLP, computer vision, data scientists and AI architects, validated on production work.", keywords: ["AI ML recruitment agency India","machine learning recruitment India","hire ML engineers India","AI engineer recruitment India","AI engineer vs ML engineer"] },
 { path:"/services/ai-talent/genai-agentic-ai-hiring", title:"GenAI & Agentic AI Recruitment India | NeoIntelli", description:"Hire GenAI, LLM, RAG and agentic AI engineers and architects in India, assessed on retrieval, evaluation, tool calling, orchestration, security and cost.", keywords: ["GenAI recruitment India","agentic AI hiring India","LLM engineer hiring India","hire agentic AI engineers","AI agent developer hiring","RAG engineer recruitment"] },
 { path:"/services/ai-talent/data-engineering-data-science-hiring", title:"Data Engineering & Data Science Hiring India | NeoIntelli", description:"Hire data engineers, platform and streaming engineers, data architects, data scientists and AI data engineers in India, validated by practising engineers.", keywords: ["data engineer recruitment India","data scientist recruitment India","data engineering recruitment","hire data engineers India","data scientist vs ML engineer"] },
 { path:"/services/ai-talent/mlops-ai-platform-hiring", title:"MLOps & AI Platform Recruitment India | NeoIntelli", description:"Hire MLOps, AI platform, AI infrastructure, LLMOps, AgentOps and GPU engineers in India, assessed on the production systems they have actually operated.", keywords: ["MLOps recruitment India","AI platform engineer hiring","hire MLOps engineers India","AgentOps engineer","AI infrastructure engineer hiring India"] },
 { path:"/services/ai-talent/ai-leadership-executive-search", title:"AI Leadership & Executive Search India | NeoIntelli", description:"Senior-led search for Chief AI Officer, Head of AI, VP AI and Data, AI directors and GCC AI heads in India, validated by practising AI leaders.", keywords: ["AI executive search India","Head of AI hiring","Chief AI Officer search India","VP AI recruitment","GCC AI head hiring"] },
 { path:"/services/ai-talent/recruitment-hub", title:"AI Recruitment RPO & Hiring Hub India | NeoIntelli", description:"A dedicated recruitment POD, the NeoHireX Hiring OS and practitioner validation in one model for companies hiring 10 to 100+ technical people in India.", keywords: ["AI RPO India","AI recruitment outsourcing India","recruitment POD India","NeoHireX","managed technical hiring India"] },
 { path:"/services/ai-talent/ai-reskilling-academy", title:"AI Reskilling & Talent Academy for Engineers | NeoIntelli", description:"Convert backend, data, DevOps, ML and QA engineers into validated GenAI, AI data, MLOps and agentic AI roles through assessment and real project work.", keywords: ["AI reskilling India","GenAI upskilling for GCCs","AI talent academy","reskill engineers for AI","AI upskilling program"] },
 ...AI_ENGINEERING_ROUTE_SEO,
 { path:"/services/ai-delivery-teams", title:"AI Delivery Teams India | AI Engineers & Pods | NeoIntelli", description:"Deploy dedicated AI engineering teams, AI delivery pods and forward-deployed engineers across GenAI, Agentic AI, ML, Data and MLOps.", keywords: ["AI delivery teams","AI engineering teams India","embedded AI team","AI delivery services","AI engineering pod"] },
 { path:"/services/ai-delivery-teams/dedicated-ai-engineering-team", title:"Dedicated AI Engineering Team India | NeoIntelli", description:"Build a dedicated AI engineering team in India for ongoing GenAI, ML, Data and production-AI roadmaps, embedded into your tools and delivery cadence.", keywords: ["dedicated AI engineering team","dedicated AI development team India","embedded AI engineering team","managed AI engineering team"] },
 { path:"/services/ai-delivery-teams/ai-delivery-pod", title:"AI Delivery Pod | GenAI, ML & Data Engineering | NeoIntelli", description:"Deploy a cross-functional AI delivery pod for a defined GenAI, Agentic AI, ML, Data or MLOps outcome from architecture through production.", keywords: ["AI delivery pod","AI engineering pod","AI pod India","GenAI delivery pod","AI implementation pod"] },
 { path:"/services/ai-delivery-teams/forward-deployed-ai-engineers", title:"Forward-Deployed AI Engineers India | NeoIntelli", description:"Embed Forward-Deployed AI Engineers into your repositories, systems and workflows to integrate, productionize and scale GenAI and Agentic AI.", keywords: ["Forward-Deployed AI Engineer India","forward-deployed AI engineering","embedded AI engineer","FDE services","AI implementation engineer"] },
 { path:"/services/ai-delivery-teams/ai-team-transfer", title:"AI Team Build & Transfer Services India | NeoIntelli", description:"Start with NeoIntelli AI delivery capability, stabilise production, then transfer knowledge and ownership to your team, Micro GCC or AI GCC.", keywords: ["AI team build and transfer","AI capability transfer","build AI team India","AI team transition"] },
 { path:"/services/ai-talent-acquisition", title:"AI-Powered Talent Acquisition Services India | NeoIntelli", description:"AI-powered talent acquisition in India: dedicated recruitment PODs, experienced recruiters, and NeoHireX AI screening with first-round AI interviews.", keywords: ["AI-powered talent acquisition services","AI talent acquisition India","AI recruitment services India","AI-powered recruitment","AI hiring platform","recruitment POD","dedicated recruitment team","NeoHireX","AI candidate screening","AI interview platform","talent acquisition services India","technology-enabled recruitment","AI recruitment agency India","agentic AI recruitment","AI recruiting","skills-based hiring India","recruitment automation India"] },
 { path:"/services/ai-data-recruitment", title:"AI & Data Recruitment Services India | NeoIntelli", description:"Specialist AI and Data recruitment in India: hire GenAI, LLM, ML, Data Engineering and MLOps talent with NeoHireX screening and expert technical vetting.", keywords: ["AI recruitment agency India","AI and data recruitment services","hire AI engineers India","GenAI engineer hiring","agentic AI developer hiring","hire LLM engineers","machine learning recruitment India","data engineer recruitment India","MLOps engineer hiring","data scientist recruitment","AI architect hiring","AI talent hiring India","AI staffing India","hire AI team India","hire GenAI engineers India","hire agentic AI developers","AI engineer recruitment India","GenAI talent shortage India","skills-based AI hiring"] },
 { path:"/gcc-for-ai-startups", title:"GCC for AI Startups | India AI Engineering Team | NeoIntelli", description:"AI startups: build a world-class India engineering team for 60% less. Flexible GCC models — start with 5, scale to 50.", keywords: ["gcc for startups","ai startup india team","build ai team india startup","gcc for ai companies","startup engineering team india","startup gcc india","ai startup gcc"] },
 { path:"/gcc-readiness-assessment", title:"GCC Readiness Check | Is Your Company Ready? | NeoIntelli", description:"Free GCC readiness assessment: 8 quick questions to find out if your company is ready for a Global Capability Centre in India.", keywords: ["gcc readiness assessment","gcc feasibility check","ready for gcc","gcc evaluation tool","should i build a gcc"] },
 { path:"/gcc-roi-estimator", title:"GCC ROI Estimator | India Savings Calculator | NeoIntelli", description:"Calculate the ROI of building a GCC in India: 5-year savings projection, break-even timeline, and total cost of ownership.", keywords: ["gcc roi calculator","gcc roi estimator","gcc savings calculator","gcc india roi","gcc return on investment"] },
 { path:"/gcc-faq", title:"GCC FAQ 2026 | Common GCC Questions | NeoIntelli", description:"30+ FAQs on Global Capability Centres in India: costs, setup process, legal requirements, talent, and timelines.", keywords: ["gcc faq","what is gcc","gcc meaning","gcc full form","global capability center faq","gcc questions"] },
 { path:"/careers", title:"Careers at NeoIntelli | Join India's AI-First GCC Company", description:"Join NeoIntelli - India's AI-first GCC company. Open roles in engineering, AI, operations, and consulting. Build the future of global capability centers.", keywords: ["neointelli careers","gcc jobs india","gcc consulting careers","neointelli jobs","ai gcc careers"] },
 { path:"/industries/manufacturing-gcc", title:"Manufacturing GCC India | Industry 4.0 & AI - NeoIntelli", description:"Build a Manufacturing GCC in India for Industry 4.0, predictive maintenance, supply chain AI, digital twins, and smart factory technology.", keywords: ["manufacturing gcc india","industry 4.0 gcc","smart manufacturing gcc","industrial gcc india","manufacturing global capability center"] },
 { path:"/industries/private-equity-gcc", title:"PE Portfolio GCC India | Private Equity GCC | NeoIntelli", description:"Private equity firms: accelerate portfolio growth with India GCCs — rapid engineering build-outs, cost value creation, and AI transformation.", keywords: ["private equity gcc india","pe portfolio gcc","gcc for pe portfolio companies","private equity india engineering","value creation gcc"] },
 { path:"/industries/retail-gcc", title:"Retail & E-commerce GCC India | NeoIntelli", description:"Build a Retail GCC in India for AI personalisation, demand forecasting, supply chain optimisation, and omnichannel engineering.", keywords: ["retail gcc india","ecommerce gcc india","retail global capability center","retail technology gcc"] },
 { path:"/industries/bfsi-gcc", title:"BFSI GCC India | Banking & Financial Services - NeoIntelli", description:"Build a BFSI GCC in India for banking, financial services, insurance, risk, payments, regulatory technology, and AI-first transformation.", keywords:["bfsi gcc india","banking gcc india","financial services gcc","insurance gcc","fintech gcc"] },
 { path:"/industries/healthcare-gcc", title:"Healthcare GCC India | Life Sciences & Pharma - NeoIntelli", description:"Build a Healthcare and Life Sciences GCC in India for clinical, R&D, regulatory, data, and AI-driven healthcare engineering.", keywords:["healthcare gcc india","life sciences gcc","pharma gcc india","medical devices gcc"] },
 { path:"/industries/technology-gcc", title:"Software & SaaS GCC India - NeoIntelli", description:"Build a Software & SaaS GCC in India for product engineering, platform engineering, AI/ML, and developer productivity at scale.", keywords:["software gcc india","saas gcc","technology gcc india","product engineering gcc"] },
 { path:"/gcc-vs-outsourcing", title:"GCC vs Outsourcing | India Comparison Guide | NeoIntelli", description:"Compare GCC vs outsourcing vs staff augmentation: cost, control, IP, talent retention, and long-term value for enterprise teams in India.", keywords:["gcc vs outsourcing","gcc vs bpo","gcc vs staff augmentation","captive vs outsourcing"] },
 { path:"/gcc-cost-calculator", title:"GCC Cost Calculator | India GCC Pricing | NeoIntelli", description:"Calculate the monthly and annual cost of building a GCC in India by team size, city, and seniority. Free India GCC pricing tool.", keywords:["gcc cost calculator","gcc india cost calculator","gcc pricing","gcc monthly cost"] },
 { path:"/gcc-as-a-service", title:"GCC-as-a-Service India | Managed GCC Setup | NeoIntelli", description:"Fully managed GCC-as-a-Service in India: build-operate-transfer, entity, talent, technology, governance — launch in weeks, not months.", keywords:["gcc as a service","managed gcc india","build operate transfer","bot gcc india","managed capability center"] },
 { path:"/gcc-india-cost", title:"GCC India Cost Benchmarks 2026 | NeoIntelli", description:"India GCC cost benchmarks across talent, real estate, infrastructure, compliance, and managed services for enterprise buyers.", keywords:["gcc india cost","gcc cost benchmarks","gcc india pricing","gcc cost guide","gcc india salary"] },
 { path:"/recruitment", title:"IT Recruitment & Tech Staffing Services India | NeoIntelli", description:"End-to-end IT recruitment and tech staffing across India. Permanent hire, contract staffing, executive search, and RPO for enterprise teams and GCCs.", keywords: ["IT recruitment India","tech staffing India","recruitment India","staffing India","GCC recruitment","GCC staffing","tech hiring India","permanent recruitment India","contract staffing India"] },
 { path:"/recruitment/permanent", title:"Permanent IT Hiring India | Tech & GCC | NeoIntelli", description:"Permanent recruitment for India GCCs and enterprise teams: engineering, AI, data, product, leadership, and specialist roles.", keywords:["permanent hiring india","permanent IT recruitment india","tech recruitment india","gcc permanent hiring"] },
 { path:"/recruitment/contract-staffing", title:"Contract IT Staffing India | Tech & GCC | NeoIntelli", description:"Contract staffing for India GCCs and enterprise teams: senior engineers, AI specialists, project-based hiring, and flexible workforce.", keywords:["contract staffing india","contract IT staffing India","contract hiring","contractors india","gcc contract staffing"] },
 { path:"/recruitment/executive-search", title:"Executive Search India | GCC Leadership Hiring | NeoIntelli", description:"Executive search for India GCCs and enterprise leadership: center heads, CTOs, engineering leaders, AI leaders, and CXO hires.", keywords:["executive search india","gcc leadership hiring","cxo search india","gcc center head hiring"] },
 { path:"/recruitment/rpo", title:"RPO Services India & Managed GCC Hiring | NeoIntelli", description:"Recruitment Process Outsourcing (RPO) for India GCCs and enterprise teams: end-to-end hiring at scale with dedicated recruiters.", keywords:["rpo india","recruitment process outsourcing","rpo gcc india","scaled hiring india"] },
 { path:"/lp/ai-first-gcc", title:"AI-First GCC in India | Design, Launch, Scale - NeoIntelli", description:"NeoIntelli designs, launches and scales AI-first Global Capability Centers in India - operating model, talent, and governance from day one.", keywords:["AI-first GCC","India GCC","GCC setup","AI operating model"] },
 // The Decision Lab. It carries its own canonical rather than pointing at
 // /gcc-cost-calculator: the two pages answer different questions (what does a
 // team cost, versus should we do this at all) even though they share an
 // engine, so canonicalizing one to the other would collapse two real search
 // intents into one.
 { path:"/lp/gcc-playbook", title:"AI GCC Playbook & Cost Planning | NeoIntelli", description:"Build your India AI GCC business case. Design your team, compare costs and cities, test assumptions, and download a practical launch plan.", keywords:["gcc playbook","india gcc business case","ai gcc planning","gcc cost model","gcc launch plan","gcc readiness","india gcc city comparison"] },
 // GCC Operations & Managed Services pillar. Titles and descriptions live in src/data/gccOperationsContent.ts.
 ...gccOperationsRouteSeo,
];

// Paid/PPC landing pages. They carry curated titles and descriptions but stay
// out of ROUTE_SEO deliberately: that keeps them out of the sitemap and out of
// ALL_INDEXABLE_PATHS, so SEOHead renders noindex,follow and a paid page never
// competes with the organic pages targeting the same terms.
export const PAID_ROUTE_SEO: RouteSeo[] = [
 { path:"/lp/hire-ai-engineers", title:"Hire Pre-Interviewed AI & Data Engineers India | NeoIntelli", description:"Get 1-2 technically validated AI & Data engineers per role - screened by NeoHireX AI, tested by senior AI engineers, signed off by a 20-year AI delivery expert."},
 { path:"/lp/hire-ai_ml-engineers", title:"Hire Pre-Interviewed AI & Data Engineers India | NeoIntelli", description:"Get 1-2 technically validated AI & Data engineers per role - screened by NeoHireX AI, tested by senior AI engineers, signed off by a 20-year AI delivery expert."},
 { path:"/lp/micro-gcc-india", title:"Micro GCC in India | Start With 8 to 10 People | NeoIntelli", description:"Build an 8 to 10 person India team with NeoIntelli. Open-book costs, workspace included, milestone-based build operate transfer, IP yours from day one."},
 { path:"/lp/india-engineering-squad", title:"Build Your AI Engineering Team in India | NeoIntelli", description:"Build a dedicated AI-first engineering team in India. NeoIntelli helps startups hire and technically validate AI/ML, GenAI, data and cloud engineers.", keywords:["AI engineering team India","hire AI engineers India","AI developers India","ML engineers India","GenAI engineers India","build AI team India","AI startup India engineering team","MLOps engineers India","data engineers India"]},
 { path:"/lp/finance-procurement-shared-services-india", title:"Finance & Procurement Shared Services India | NeoIntelli", description:"Consolidate finance and procurement into a 30 to 100 person captive hub in India, with advisory, hiring, operations and automation built in-house."},
 { path:"/lp/gcc-cost-calculator", title:"GCC Cost Calculator India | Estimate GCC Cost | NeoIntelli", description:"Calculate the fully loaded monthly and annual cost of a Global Capability Center team in India by role, seniority and city. Instant estimate, no sales call.", canonical: `${SITE_URL}/gcc-cost-calculator` },
];

export const BLOG_ROUTE_SEO: RouteSeo[] = blogPosts.map((post) => ({
 path: `/blog/${post.slug}`,
 title: `${post.seoTitle} | NeoIntelli`,
 description: post.metaDescription,
 type:"article",
 keywords: post.secondaryKeywords,
}));

const normalizePath = (pathname: string) => {
 if (!pathname) return"/";
 const cleaned = pathname.split("?")[0].split("#")[0];
 return cleaned !=="/"? cleaned.replace(/\/$/,"") :"/";
};

const ALL_INDEXABLE_PATHS = new Set([
 ...ROUTE_SEO.map((route) => route.path),
 ...BLOG_ROUTE_SEO.map((route) => route.path),
]);

export const isIndexablePath = (pathname: string) => ALL_INDEXABLE_PATHS.has(normalizePath(pathname));

export const getRouteSeo = (pathname: string): RouteSeo => {
 const normalizedPath = normalizePath(pathname);

 const directMatch = ROUTE_SEO.find((route) => route.path === normalizedPath);
 if (directMatch) return directMatch;

 const paidMatch = PAID_ROUTE_SEO.find((route) => route.path === normalizedPath);
 if (paidMatch) return paidMatch;

 const blogMatch = BLOG_ROUTE_SEO.find((route) => route.path === normalizedPath);
 if (blogMatch) return blogMatch;

 return {
 path: normalizedPath,
 title:"NeoIntelli | AI-First GCC Services in India",
 description:"NeoIntelli helps global companies design, launch, and scale AI-first Global Capability Centers in India.",
 };
};

// Breadcrumb labels. The old implementation stripped hyphens without a
// separator, so "retail-gcc" rendered as "Retailgcc" in BreadcrumbList JSON-LD
// on every page. Labels now resolve in order of specificity:
//   1. pageMeta - the curated short names already used by on-page navigation
//   2. blog post titles for /blog/<slug>
//   3. SEGMENT_LABELS for path segments pageMeta does not cover
//   4. title-cased words, preserving the acronyms below
const SEGMENT_LABELS: Record<string, string> = {
"services":"Services",
"ai-delivery-teams":"AI Delivery Teams",
"lp":"Landing",
"blog":"Blog",
"about":"About",
"careers":"Careers",
"gcc-faq":"GCC FAQ",
"gcc-for-ai-startups":"GCC for AI Startups",
"gcc-readiness-assessment":"GCC Readiness Assessment",
"gcc-roi-estimator":"GCC ROI Estimator",
"micro-gcc":"Micro GCC",
"ai-gcc":"AI GCC",
"ai-talent":"AI Talent",
"ai-infrastructure-gpu":"AI Infrastructure & GPU",
"privacy-policy":"Privacy Policy",
"cookie-policy":"Cookie Policy",
"terms-of-service":"Terms of Service",
"ai-first-gcc":"AI-First GCC",
};

const ACRONYMS = new Set(["GCC","AI","ML","BFSI","RPO","ROI","BOT","FAQ","IT","HR","API","MLOPS","LLM","PE"]);

const titleCaseSegment = (segment: string) => segment
 .split("-")
 .map((word) => {
 const upper = word.toUpperCase();
 if (ACRONYMS.has(upper)) return upper ==="MLOPS"?"MLOps": upper;
 return word.charAt(0).toUpperCase() + word.slice(1);
 })
 .join(" ");

const cleanSegment = (segment: string) => SEGMENT_LABELS[segment] ?? titleCaseSegment(segment);

// Resolves the display name for a full path, preferring curated short names
// over anything derived from the trailing segment.
const breadcrumbLabel = (fullPath: string, segment: string) => {
 const curated = pageMeta[fullPath]?.title;
 // A few pageMeta entries hold a full SEO title ("... | Staffing, Search & RPO").
 // Those read badly as a crumb, so only short single-clause names are used.
 if (curated && !curated.includes("|") && curated.length <= 48) return curated;
 if (fullPath.startsWith("/blog/")) {
 const post = blogPosts.find((entry) => entry.slug === fullPath.slice("/blog/".length));
 if (post) return post.title;
 }
 return cleanSegment(segment);
};

export const buildBreadcrumbItems = (pathname: string) => {
 const normalizedPath = normalizePath(pathname);
 const segments = normalizedPath.split("/").filter(Boolean);

 if (segments.length === 0) {
 return [{ name:"Home", item: `${SITE_URL}/` }];
 }

 const items = [{ name:"Home", item: `${SITE_URL}/` }];
 segments.forEach((segment, index) => {
 const partialPath = `/${segments.slice(0, index + 1).join("/")}`;
 // An intermediate segment with no page of its own (/services redirects to
 // /services/gcc) is not a crumb a visitor can follow, so it is left out.
 // This keeps the BreadcrumbList aligned with the visible trail
 // (Home -> AI GCC -> Service) instead of inventing a "Services" step.
 const isLast = index === segments.length - 1;
 if (!isLast && !isIndexablePath(partialPath)) return;
 items.push({
 name: breadcrumbLabel(partialPath, segment),
 item: `${SITE_URL}${partialPath}`,
 });
 });

 return items;
};

export const buildCanonicalUrl = (pathname: string) => {
 const normalizedPath = normalizePath(pathname);
 return `${SITE_URL}${normalizedPath ==="/"?"/": normalizedPath}`;
};

export const buildOrganizationSchema = () => ({
"@context":"https://schema.org",
"@type":"Organization",
"@id": `${SITE_URL}/#organization`,
 name: SITE_NAME,
 alternateName:"NeoIntelli AI",
 url: SITE_URL,
 logo: `${SITE_URL}/images/neointelli.png`,
 description:"AI GCC Operating Partner in India. NeoIntelli designs, builds, hires, enables, operates and scales AI Global Capability Centers (GCCs) in India for companies headquartered in the US, UK and Europe, from an AI Micro GCC of one squad to a full capability center, with the NeoHireX Hiring OS, specialist AI and Data recruitment, AI delivery teams, people operations, workspace and IT, AI and GPU infrastructure, AI engineering, AgentOps and AI governance.",
 foundingDate:"2023",
 sameAs: ["https://in.linkedin.com/company/neointelli"],
 contactPoint: [{"@type":"ContactPoint", contactType:"sales", email:"reachus@neointelli.com", availableLanguage: ["English"] }],
 address: {
"@type":"PostalAddress",
 streetAddress:"1779, 19th Main Rd, HSR Layout",
 addressLocality:"Bengaluru",
 addressRegion:"Karnataka",
 postalCode:"560102",
 addressCountry:"IN",
 },
 areaServed: [
 {"@type":"Country", name:"India"},
 {"@type":"Country", name:"United Kingdom"},
 {"@type":"Country", name:"Norway"},
 {"@type":"Country", name:"Sweden"},
 {"@type":"Country", name:"Denmark"},
 {"@type":"Country", name:"Finland"},
 ],
 knowsAbout: [
"AI GCC in India",
"AI Micro GCC",
"Global Capability Centre setup in India",
"GCC-as-a-Service India",
"AI-first GCC strategy",
"AI infrastructure and GPU for GCCs",
"AgentOps and AI agent governance",
"NeoHireX Hiring OS and AI recruitment",
"Generative AI for enterprises",
"Enterprise AI engineering: Generative AI, Agentic AI, machine learning, AI data engineering, MLOps, LLMOps, AgentOps and AI evaluation",
"MLOps and LLMOps",
"Data engineering and data platforms",
"Responsible AI governance",
"Product engineering for GCCs",
"AI delivery teams, AI delivery pods and forward-deployed AI engineers",
"GCC operating model and governance",
"GCC vs outsourcing",
"Build-Operate-Transfer (BOT) for India GCCs",
 ],
});

export const buildWebsiteSchema = () => ({
"@context":"https://schema.org",
"@type":"WebSite",
"@id": `${SITE_URL}/#website`,
 name: SITE_NAME,
 url: `${SITE_URL}/`,
 publisher: {"@id": `${SITE_URL}/#organization`},
 inLanguage:"en-IN",
});

// Social/sharing image per section. A single square 1024x1024 image was
// previously used sitewide, which crops badly in the summary_large_image cards
// this site declares. These are 1200x630 (1.91:1) and chosen by section so a
// shared service page does not look identical to a shared blog post.
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

type OgImage = { url: string; alt: string; width: number; height: number };

const OG_IMAGE_BY_PREFIX: Array<[string, string, string]> = [
 ["/services/gcc-operations","og-gcc-operations.png","NeoIntelli GCC operations and managed services in India"],
 ["/services/ai-gcc","og-ai-gcc.png","NeoIntelli AI GCC in India: build, operate and scale"],
 ["/services/gcc","og-gcc.png","NeoIntelli GCC setup and advisory services in India"],
 ["/services/ai-engineering","og-ai-engineering.png","NeoIntelli Enterprise AI Engineering: production GenAI, agents, ML and data"],
 ["/services/ai-delivery-teams","og-talent.png","NeoIntelli AI delivery teams, pods and forward-deployed AI engineers"],
 ["/services/ai-talent","og-talent.png","NeoIntelli AI, ML and Data talent services in India"],
 ["/services/micro-gcc","og-gcc.png","NeoIntelli Micro GCC services in India"],
 ["/services/ai-talent-acquisition","og-talent.png","NeoIntelli AI talent acquisition services"],
 ["/services/ai-data-recruitment","og-talent.png","NeoIntelli AI and data recruitment services"],
 ["/recruitment","og-recruitment.png","NeoIntelli recruitment and staffing services in India"],
 ["/industries","og-industries.png","NeoIntelli industry GCC solutions"],
 ["/about","og-about.png","About NeoIntelli"],
 ["/careers","og-about.png","Careers at NeoIntelli"],
 ["/contact","og-contact.png","Contact NeoIntelli"],
 ["/case-studies","og-industries.png","NeoIntelli GCC case studies"],
 ["/blog","og-blog.png","NeoIntelli insights on India GCCs and AI"],
];

const OG_IMAGE_BY_BLOG_CATEGORY: Record<string, [string, string]> = {
"AI GCC": ["og-ai-gcc.png","NeoIntelli insights on AI-first GCCs"],
"GCC Setup": ["og-gcc.png","NeoIntelli insights on GCC setup in India"],
"GCC Strategy": ["og-gcc.png","NeoIntelli insights on GCC strategy"],
"GCC Talent": ["og-talent.png","NeoIntelli insights on GCC talent in India"],
};

export const getOgImage = (pathname: string): OgImage => {
 const normalizedPath = normalizePath(pathname);
 const asImage = (file: string, alt: string): OgImage => ({
 url: `${SITE_URL}/images/og/${file}`,
 alt,
 width: OG_IMAGE_WIDTH,
 height: OG_IMAGE_HEIGHT,
 });

 if (normalizedPath.startsWith("/blog/")) {
 const post = blogPosts.find((entry) => entry.slug === normalizedPath.slice("/blog/".length));
 const mapped = post ? OG_IMAGE_BY_BLOG_CATEGORY[post.category] : undefined;
 if (mapped) return asImage(mapped[0], `${post!.title} - NeoIntelli`);
 return asImage("og-blog.png","NeoIntelli insights on India GCCs and AI");
 }

 const match = OG_IMAGE_BY_PREFIX.find(([prefix]) =>
 normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`));
 if (match) return asImage(match[1], match[2]);

 return asImage("og-default.png","NeoIntelli - AI-first GCC services in India");
};

// schema.org has no "ArticlePage" type; the previous value was invalid markup
// on every blog URL. Blog posts keep WebPage here and carry their article
// semantics in the BlogPosting entity, which references this node via
// mainEntityOfPage.
const WEBPAGE_TYPE_BY_PATH: Record<string, string> = {
"/about":"AboutPage",
"/contact":"ContactPage",
"/blog":"CollectionPage",
"/case-studies":"CollectionPage",
"/industries":"CollectionPage",
};

/**
 * The six service pillar overview pages, in lifecycle order. Held as plain
 * strings rather than imported from src/data/serviceNav.ts so that the sitemap
 * and this module stay free of that file's React icon imports;
 * src/test/homepage.test.ts asserts the two lists stay identical.
 */
const SERVICE_PILLAR_PATHS = [
"/services/ai-gcc",
"/services/ai-talent",
"/services/ai-engineering",
"/services/ai-delivery-teams",
"/services/gcc",
"/services/gcc-operations",
];

export const buildWebPageSchema = (pathname: string): object | null => {
 const normalizedPath = normalizePath(pathname);
 if (!isIndexablePath(normalizedPath)) return null;
 const routeSeo = getRouteSeo(normalizedPath);
 const canonical = buildCanonicalUrl(normalizedPath);
 const ogImage = getOgImage(normalizedPath);
 return {
"@context":"https://schema.org",
"@type": WEBPAGE_TYPE_BY_PATH[normalizedPath] ??"WebPage",
"@id": `${canonical}#webpage`,
 url: canonical,
 name: routeSeo.title,
 description: routeSeo.description,
 inLanguage:"en-IN",
 isPartOf: {"@id": `${SITE_URL}/#website`},
 about: {"@id": `${SITE_URL}/#organization`},
 // The homepage is the distribution node into the six service pillars. These
 // are plain URL references to pages that already declare their own Service
 // entities, so no second entity is created for a service described elsewhere.
 significantLink: normalizedPath ==="/"
 ? SERVICE_PILLAR_PATHS.map((path) => `${SITE_URL}${path}`)
 : undefined,
 breadcrumb: normalizedPath ==="/"? undefined : {"@id": `${canonical}#breadcrumb`},
 primaryImageOfPage: {
"@type":"ImageObject",
 url: ogImage.url,
 width: ogImage.width,
 height: ogImage.height,
 },
 };
};

/*
 * No Person schema is published anywhere on the site. /about used to carry one
 * and every blog post attributed to it; both are now the NeoIntelli
 * Organization, which names no individual, job title or employer.
 */

export const buildLocalBusinessSchema = () => ({
"@context":"https://schema.org",
"@type":"LocalBusiness",
"@id": `${SITE_URL}/#localbusiness`,
 name: SITE_NAME,
 url: SITE_URL,
 image: `${SITE_URL}/images/neointelli.png`,
 logo: `${SITE_URL}/images/neointelli.png`,
 email:"reachus@neointelli.com",
 // No priceRange. We do not publish pricing in copy or in structured data -
 // the property is optional for LocalBusiness, so it is simply omitted.
 address: {
"@type":"PostalAddress",
 streetAddress:"1779, 19th Main Rd, HSR Layout",
 addressLocality:"Bengaluru",
 addressRegion:"Karnataka",
 postalCode:"560102",
 addressCountry:"IN",
 },
 geo: {
"@type":"GeoCoordinates",
 latitude: 12.9116,
 longitude: 77.6446,
 },
 areaServed: [
 {"@type":"Country", name:"India"},
 {"@type":"Country", name:"United Kingdom"},
 {"@type":"Country", name:"Norway"},
 {"@type":"Country", name:"Sweden"},
 {"@type":"Country", name:"Denmark"},
 {"@type":"Country", name:"Finland"},
 ],
 sameAs: ["https://in.linkedin.com/company/neointelli"],
});

const AI_GCC_CHILD_SERVICES: Array<{ path: string; name: string; serviceType: string; description: string }> = [
 { path:"/services/ai-gcc/ai-advisory-strategy", name:"AI Advisory & GCC Design", serviceType:"AI Advisory for GCCs", description:"AI maturity assessment, GCC mandate, use-case portfolio, target operating model, talent architecture, platform and compute direction, responsible AI and a value roadmap for an AI GCC in India."},
 { path:"/services/ai-gcc/setup-operations", name:"AI GCC Setup & Operations", serviceType:"AI GCC Setup and Operations", description:"Entity and location coordination, Hiring OS and Recruitment Hub, HR and payroll, workspace, IT and security, cloud and GPU, AI platform, governance and Build-Operate-Transfer for an AI GCC in India."},
 { path:"/services/ai-gcc/generative-ai", name:"Generative & Agentic AI", serviceType:"Generative and Agentic AI Engineering", description:"Enterprise RAG, AI copilots, agentic AI, model adaptation, evaluation, production engineering and AI economics inside a GCC."},
 { path:"/services/ai-gcc/data-engineering", name:"Data Engineering for AI GCCs", serviceType:"Data Engineering", description:"Data platform architecture, batch and streaming, AI-ready data products, RAG and vector foundation, evaluation datasets, governance, lineage and data FinOps."},
 { path:"/services/ai-gcc/mlops", name:"MLOps, LLMOps & AgentOps", serviceType:"MLOps, LLMOps and AgentOps", description:"Model, prompt and agent lifecycle, CI/CD, continuous evaluation, observability, reliability, AI FinOps and governance integration for production AI in a GCC."},
 { path:"/services/ai-gcc/responsible-ai", name:"AI Governance & Responsible AI", serviceType:"AI Governance", description:"AI system inventory, use-case risk classification, policy and controls, model and agent governance, evaluation and red teaming, third-party AI risk, incident management and board and audit reporting."},
 { path:"/services/ai-gcc/ai-infrastructure-gpu", name:"AI Infrastructure & GPU", serviceType:"AI Infrastructure and GPU", description:"Workload and capacity planning, GPU sourcing across cloud, reserved, dedicated and hybrid compute, development, training and inference environments, storage and network, MLOps integration, AI FinOps and security."},
];

const aiGccChildServiceSchemas = (): Record<string, object> => Object.fromEntries(
 AI_GCC_CHILD_SERVICES.map((service) => [service.path, {
"@context":"https://schema.org",
"@type":"Service",
"@id": `${SITE_URL}${service.path}#service`,
 serviceType: service.serviceType,
 name: service.name,
 description: service.description,
 url: `${SITE_URL}${service.path}`,
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 }]),
);

const AI_TALENT_SERVICES: Array<{ path: string; name: string; serviceType: string; description: string }> = [
 { path:"/services/ai-talent", name:"AI, ML & Data Talent Services in India", serviceType:"AI Recruitment and Talent Services", description:"Recruitment and technical validation of GenAI, agentic AI, ML, data, MLOps, AI platform and AI leadership talent in India, combining specialist recruiters, the NeoHireX Hiring OS and practitioner-led technical evaluation, from one hire to a complete AI team, AI Recruitment Hub or AI Micro GCC."},
 { path:"/services/ai-talent/ai-ml-recruitment", name:"AI & ML Recruitment", serviceType:"AI and Machine Learning Recruitment", description:"Recruitment of AI engineers, machine learning engineers, deep learning, NLP and computer vision engineers, research engineers, data scientists and AI solution architects in India with practitioner-led technical validation."},
 { path:"/services/ai-talent/genai-agentic-ai-hiring", name:"GenAI & Agentic AI Hiring", serviceType:"Generative and Agentic AI Recruitment", description:"Recruitment of GenAI, LLM, RAG, agentic AI, AI agent, AI application, AI systems and forward deployed engineers and GenAI and agentic architects in India, assessed on production ownership."},
 { path:"/services/ai-talent/data-engineering-data-science-hiring", name:"Data Engineering & Data Science Hiring", serviceType:"Data Engineering and Data Science Recruitment", description:"Recruitment of data engineers, analytics, platform and streaming engineers, data architects, data and applied scientists and AI data engineers in India."},
 { path:"/services/ai-talent/mlops-ai-platform-hiring", name:"MLOps & AI Platform Hiring", serviceType:"MLOps and AI Platform Recruitment", description:"Recruitment of MLOps, ML and AI platform, AI infrastructure, AI systems, LLMOps, AgentOps, GPU infrastructure and AI DevSecOps engineers in India."},
 { path:"/services/ai-talent/ai-leadership-executive-search", name:"AI Leadership & Executive Search", serviceType:"AI Executive Search", description:"Senior-led confidential search for Chief AI Officer, Head of AI, VP AI and Data, AI engineering and platform directors, distinguished AI architects and GCC AI heads in India."},
 { path:"/services/ai-talent/recruitment-hub", name:"AI Recruitment Hub + NeoHireX", serviceType:"Recruitment Process Outsourcing and Managed Technical Hiring", description:"Dedicated recruitment POD, NeoHireX Hiring OS and practitioner technical validation in one operating model for companies hiring 10 to 100+ technical people in India."},
 { path:"/services/ai-talent/ai-reskilling-academy", name:"AI Talent Academy & Reskilling", serviceType:"AI Reskilling and Role Conversion", description:"Assessment, capability gap, role conversion, practitioner-led learning path, real project and technical validation to convert existing engineers into GenAI, AI data, MLOps, agentic AI, AI evaluation and AI architecture roles."},
];

const aiTalentServiceSchemas = (): Record<string, object> => Object.fromEntries(
 AI_TALENT_SERVICES.map((service) => [service.path, {
"@context":"https://schema.org",
"@type":"Service",
"@id": `${SITE_URL}${service.path}#service`,
 serviceType: service.serviceType,
 name: service.name,
 description: service.description,
 url: `${SITE_URL}${service.path}`,
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 }]),
);

const aiEngineeringChildServiceSchemas = (): Record<string, object> => Object.fromEntries(
 AI_ENGINEERING_CHILD_PAGES.map((page) => [page.path, {
"@context":"https://schema.org",
"@type":"Service",
"@id": `${SITE_URL}${page.path}#service`,
 serviceType: page.name,
 name: `${page.name} Services`,
 description: page.metaDescription,
 url: `${SITE_URL}${page.path}`,
 provider: {"@id": `${SITE_URL}/#organization`},
 // Full reference rather than a bare @id: the hub Service node is not emitted
 // on child pages, so a bare reference would dangle within the page's graph.
 isPartOf: {"@type":"Service","@id": `${SITE_URL}${AI_ENGINEERING_HUB_PATH}#service`, name:"Enterprise AI Engineering Services", url: `${SITE_URL}${AI_ENGINEERING_HUB_PATH}`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 }]),
);

export const buildServiceSchema = (pathname: string): object | null => {
 const serviceSchemas: Record<string, object> = {
 ...buildGccOperationsServiceSchemas(SITE_URL),
"/services/ai-gcc": {
"@context":"https://schema.org",
"@type":"Service",
"@id": `${SITE_URL}/services/ai-gcc#service`,
 serviceType:"AI GCC Operating Partner",
 name:"AI GCC in India",
 description:"Build and operate an AI Global Capability Center in India under one operating model: AI advisory and GCC design, setup and operations, Recruitment Hub and NeoHireX Hiring OS, people and HR operations, workspace, IT and security, AI infrastructure and GPU, data, GenAI and AI engineering, MLOps, AgentOps and AI governance, and managed, Build-Operate-Transfer and captive ownership paths.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 hasOfferCatalog: {
"@type":"OfferCatalog",
 name:"AI GCC operating engines",
 itemListElement: [
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Advisory & GCC Design", url: `${SITE_URL}/services/ai-gcc/ai-advisory-strategy`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"GCC Setup & Operations", url: `${SITE_URL}/services/ai-gcc/setup-operations`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Recruitment Hub + NeoHireX Hiring OS", url: `${SITE_URL}/services/ai-talent-acquisition`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI & Data Recruitment", url: `${SITE_URL}/services/ai-data-recruitment`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"People & HR Operations", url: `${SITE_URL}/services/gcc-operations/people-hr-operations`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Workspace, IT & Security", url: `${SITE_URL}/services/gcc-operations/workplace-it-security`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Infrastructure & GPU", url: `${SITE_URL}/services/ai-gcc/ai-infrastructure-gpu`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Data Engineering", url: `${SITE_URL}/services/ai-gcc/data-engineering`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Generative & Agentic AI", url: `${SITE_URL}/services/ai-gcc/generative-ai`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"MLOps, LLMOps & AgentOps", url: `${SITE_URL}/services/ai-gcc/mlops`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Governance & Responsible AI", url: `${SITE_URL}/services/ai-gcc/responsible-ai`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Micro GCC", url: `${SITE_URL}/services/micro-gcc`} },
 ],
 },
 },
 ...aiGccChildServiceSchemas(),
 ...aiTalentServiceSchemas(),
"/services/gcc": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"GCC Strategy and Setup",
 name:"GCC Strategy & Setup in India",
 description:"Senior-led program that takes a global company from the GCC decision and business case through operating-model design, location strategy, workforce planning and coordinated launch of a Global Capability Center in India.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 hasOfferCatalog: {
"@type":"OfferCatalog",
 name:"GCC Strategy & Setup Services",
 itemListElement: [
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"GCC Strategy & Business Case", url: `${SITE_URL}/services/gcc/strategy-business-case`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"GCC Location Strategy", url: `${SITE_URL}/services/gcc/location-strategy`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"GCC Setup & Launch", url: `${SITE_URL}/services/gcc/setup-launch`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"GCC Modernization & Transformation", url: `${SITE_URL}/services/gcc/modernization-transformation`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Micro GCC", url: `${SITE_URL}/services/micro-gcc`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"GCC Operations & Managed Services", url: `${SITE_URL}/services/gcc-operations`} },
 ],
 },
 },
"/services/gcc/strategy-business-case": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"GCC Strategy and Business Case",
 name:"GCC Strategy & Business Case",
 description:"Board-ready GCC strategy and business case covering mandate, operating model, multi-year economics, workforce, location shortlist, risk, governance and ownership path.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"GCC Strategy & Setup in India", url: `${SITE_URL}/services/gcc`},
 },
"/services/gcc/location-strategy": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"GCC Location Strategy",
 name:"GCC Location Strategy in India",
 description:"India GCC city selection using role-level talent depth, AI and data skill availability, compensation, attrition, infrastructure, ecosystem, real estate and policy factors.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"GCC Strategy & Setup in India", url: `${SITE_URL}/services/gcc`},
 },
"/services/gcc/setup-launch": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"GCC Setup and Launch",
 name:"GCC Setup & Launch in India",
 description:"Coordinated GCC setup program covering entity and compliance coordination, leadership and talent mobilization, workplace, IT and security, people readiness, governance and go-live.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"GCC Strategy & Setup in India", url: `${SITE_URL}/services/gcc`},
 },
"/services/gcc/modernization-transformation": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"GCC Modernization and Transformation",
 name:"GCC Modernization & Transformation",
 description:"Modernization of existing India GCCs through mandate redesign, operating-model improvement, AI and data capability, workforce transformation, governance and stronger enterprise ownership.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"GCC Strategy & Setup in India", url: `${SITE_URL}/services/gcc`},
 },
"/services/ai-engineering": {
"@context":"https://schema.org",
"@type":"Service",
"@id": `${SITE_URL}${AI_ENGINEERING_HUB_PATH}#service`,
 serviceType:"Enterprise AI Engineering",
 name:"Enterprise AI Engineering Services",
 description:"Design, build, integrate and operate production AI systems across Generative AI, Agentic AI, applied machine learning, AI data engineering, AI product engineering, AI agents and automation, MLOps, LLMOps and AgentOps, and AI evaluation and assurance.",
 url: `${SITE_URL}${AI_ENGINEERING_HUB_PATH}`,
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 hasOfferCatalog: {
"@type":"OfferCatalog",
 name:"Enterprise AI Engineering Services",
 itemListElement: AI_ENGINEERING_CHILD_PAGES.map((page) => ({
"@type":"Offer", itemOffered: {"@type":"Service", name: page.name, url: `${SITE_URL}${page.path}`},
 })),
 },
 },
 ...aiEngineeringChildServiceSchemas(),
"/services/ai-delivery-teams": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"AI Delivery Teams",
 name:"AI Delivery Teams in India",
 description:"Embedded AI engineering capacity across Generative AI, Agentic AI, machine learning, data and MLOps, delivered as a dedicated AI engineering team, a cross-functional AI delivery pod, forward-deployed AI engineers, or a build-and-transfer engagement.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 hasOfferCatalog: {
"@type":"OfferCatalog",
 name:"AI Delivery Teams",
 itemListElement: [
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Dedicated AI Engineering Team", url: `${SITE_URL}/services/ai-delivery-teams/dedicated-ai-engineering-team`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Delivery Pod", url: `${SITE_URL}/services/ai-delivery-teams/ai-delivery-pod`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Forward-Deployed AI Engineers", url: `${SITE_URL}/services/ai-delivery-teams/forward-deployed-ai-engineers`} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Team Build & Transfer", url: `${SITE_URL}/services/ai-delivery-teams/ai-team-transfer`} },
 ],
 },
 },
 // The four engagement models. Each declares its own Service entity so an
 // answer engine resolving "dedicated AI team" or "forward-deployed AI
 // engineer" lands on an entity with a provider, not just a WebPage.
"/services/ai-delivery-teams/dedicated-ai-engineering-team": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"Dedicated AI Engineering Team",
 name:"Dedicated AI Engineering Team in India",
 description:"A stable team of AI specialists working on one ongoing roadmap inside the client's delivery system, keeping the technical context across releases, across Generative AI, machine learning, data and production AI.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"AI Delivery Teams in India", url: `${SITE_URL}/services/ai-delivery-teams`},
 },
"/services/ai-delivery-teams/ai-delivery-pod": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"AI Delivery Pod",
 name:"AI Delivery Pod",
 description:"A cross-functional AI engineering unit built around one defined outcome, from architecture through evaluation to production, with acceptance criteria agreed before build starts.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"AI Delivery Teams in India", url: `${SITE_URL}/services/ai-delivery-teams`},
 },
"/services/ai-delivery-teams/forward-deployed-ai-engineers": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"Forward-Deployed AI Engineering",
 name:"Forward-Deployed AI Engineers",
 description:"AI engineers embedded in the client's repositories, systems and workflows to integrate, productionise and scale Generative and Agentic AI where the constraint is integration rather than the model.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"AI Delivery Teams in India", url: `${SITE_URL}/services/ai-delivery-teams`},
 },
"/services/ai-delivery-teams/ai-team-transfer": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"AI Team Build and Transfer",
 name:"AI Team Build & Transfer",
 description:"Build AI delivery capability with NeoIntelli, stabilise it in production, then progressively transfer knowledge and ownership to the client's internal team, Micro GCC or AI GCC.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"AI Delivery Teams in India", url: `${SITE_URL}/services/ai-delivery-teams`},
 },
 // Micro GCC is referenced as an Offer by both the AI GCC and GCC Strategy
 // catalogs, so it needs its own Service entity for those references to land.
"/services/micro-gcc": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"Micro GCC Setup",
 name:"AI Micro GCC in India",
 description:"A captive India capability center built squad by squad, starting at roughly 8 people and scaling to 50, with fully owned, jointly owned or managed operating models and the same IP control as a full GCC.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 isPartOf: {"@type":"Service", name:"GCC Strategy & Setup in India", url: `${SITE_URL}/services/gcc`},
 },
"/services/ai-talent-acquisition": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"AI-Powered Talent Acquisition Services",
 name:"AI-Powered Talent Acquisition Services in India",
 description:"Technology-enabled talent acquisition combining dedicated recruitment PODs, experienced recruiters and NeoHireX, NeoIntelli's proprietary AI-powered hiring platform, across sourcing, AI screening, ranking, first-round AI interviews, recruiter evaluation and pipeline management.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 hasOfferCatalog: {
"@type":"OfferCatalog",
 name:"AI-Powered Talent Acquisition Services",
 itemListElement: [
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Dedicated Recruitment PODs"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Candidate Sourcing"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Screening & Ranking"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI First-Round Interviews"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Recruiter Evaluation"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Offer & Onboarding Coordination"} },
 ],
 },
 },
"/services/ai-data-recruitment": {
"@context":"https://schema.org",
"@type":"Service",
 serviceType:"AI & Data Recruitment Services",
 name:"AI & Data Recruitment Services in India",
 description:"Specialist recruitment for AI, GenAI, Agentic AI, machine learning, Data Engineering, Data Science, MLOps and AI architecture roles, combining specialized sourcing, NeoHireX screening, AI first-round interviews, recruiter validation and technical evaluation by experienced AI professionals.",
 provider: {"@id": `${SITE_URL}/#organization`},
 areaServed: ["India","United Kingdom","Norway","Sweden","Denmark","Finland"],
 hasOfferCatalog: {
"@type":"OfferCatalog",
 name:"AI & Data Recruitment Services",
 itemListElement: [
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"GenAI & Agentic AI Engineer Hiring"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI/ML Engineer & Data Scientist Hiring"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"Data Engineering Recruitment"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"MLOps & AI Infrastructure Hiring"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Architecture & Technical Leadership Hiring"} },
 {"@type":"Offer", itemOffered: {"@type":"Service", name:"AI Team Building"} },
 ],
 },
 },
 };
 const normalizedPath = normalizePath(pathname);
 return serviceSchemas[normalizedPath] ?? null;
};

const PAGE_FAQS: Record<string, Array<{ q: string; a: string }>> = {
 // Visible question-and-answer sections on the GCC Operations pages.
 ...gccOperationsFaqs,
 // Imported rather than restated: the Decision Lab renders these same entries,
 // so the structured data cannot drift from what a visitor can actually read.
 "/lp/gcc-playbook": GCC_PLAYBOOK_FAQS,
"/services/ai-talent-acquisition": [
 { q:"What are AI-powered talent acquisition services?", a:"AI-powered talent acquisition services combine recruitment expertise with artificial intelligence and recruitment technology to support activities such as candidate sourcing, screening, ranking, interviewing and pipeline management. NeoIntelli combines experienced recruiters and dedicated recruitment PODs with its proprietary hiring platform, NeoHireX."},
 { q:"Is NeoHireX a third-party ATS?", a:"No. NeoHireX is NeoIntelli's proprietary AI-powered ATS and hiring platform."},
 { q:"Do we need to purchase NeoHireX separately?", a:"For applicable NeoIntelli recruitment engagements, NeoHireX is included as part of the service and does not require a separate ATS subscription for managing the NeoIntelli recruitment workflow."},
 { q:"Can NeoIntelli work with our existing ATS?", a:"Where an organization requires its existing ATS or HR technology environment to remain the primary system of record, the appropriate recruitment workflow can be agreed during engagement discovery."},
 { q:"Does AI make the final hiring decision?", a:"No. NeoIntelli uses AI to support parts of the hiring process such as screening, ranking and first-round assessment. Recruiters and client hiring teams remain involved in evaluation and hiring decisions."},
 { q:"What is a Recruitment POD?", a:"A Recruitment POD is a dedicated recruitment team aligned to a client's hiring requirements. Depending on the engagement, the POD can include recruiters, sourcing capability and recruitment coordination."},
 { q:"Is this the same as RPO?", a:"Not necessarily. A technology-enabled talent acquisition engagement can support individual or ongoing hiring needs. RPO typically involves broader ownership of a client's recruitment function or a defined portion of it. NeoIntelli supports both models."},
 { q:"Can NeoIntelli hire specialized AI professionals?", a:"Yes. NeoIntelli has a separate AI & Data Talent Hiring service focused on roles such as AI/ML Engineers, GenAI Engineers, AI Agent Developers, Data Engineers, MLOps Engineers and AI Architects."},
],
"/services/ai-data-recruitment": [
 { q:"What does an AI recruitment agency do?", a:"An AI recruitment agency helps organizations identify, evaluate and hire professionals working in areas such as Artificial Intelligence, machine learning, Generative AI, Data Science and related engineering disciplines. NeoIntelli combines specialist recruitment with its proprietary AI hiring platform and additional technical validation for selected AI and Data roles."},
 { q:"Which AI roles can NeoIntelli help us hire?", a:"NeoIntelli supports roles including AI/ML Engineers, AI Agent Developers, Agentic AI Engineers, GenAI Engineers, LLM Engineers, Data Scientists, Data Engineers, MLOps Engineers, AI Platform Engineers and AI Architects."},
 { q:"Can you help hire an entire AI team?", a:"Yes. The recruitment model can support multiple complementary AI and Data roles rather than only individual vacancies. The appropriate team structure should be determined by the organization's objectives, technology environment and delivery responsibilities."},
 { q:"How do you technically evaluate AI candidates?", a:"Depending on the role, evaluation can include AI-assisted screening, structured interviews and technical validation by experienced AI professionals. Technical evaluation is aligned to the responsibilities of the role rather than relying on one generic AI interview."},
 { q:"Is NeoHireX used for AI recruitment?", a:"Yes. NeoHireX is NeoIntelli's proprietary AI-powered hiring platform and supports candidate management, screening, ranking, AI first-round interviews and recruitment pipeline management."},
 { q:"Do we need to purchase NeoHireX separately?", a:"For applicable NeoIntelli recruitment engagements, NeoHireX is included as part of the service with no separate ATS subscription required to manage the NeoIntelli recruitment workflow."},
 { q:"Do technical interviews replace our own engineering interviews?", a:"No. NeoIntelli's technical validation provides an additional assessment layer before or alongside the client's interview process. The client retains its own final evaluation and hiring decision."},
 { q:"Can NeoIntelli hire Agentic AI developers?", a:"Yes. Agentic AI and AI Agent Developer roles can be supported as part of NeoIntelli's specialist AI talent hiring service. The exact assessment criteria should be calibrated to the architecture, frameworks, integrations and production responsibilities expected from the candidate."},
 { q:"Can you help us build an AI team for a new GCC in India?", a:"Yes. Specialist AI hiring can be connected to NeoIntelli's broader AI-First GCC and Micro GCC services when an organization is establishing or expanding an India capability center."},
],
"/blog/gcc-model-in-india": [
 { q:"What does GCC model mean?", a:"A GCC model is the ownership and operating structure used to build, run, and govern a Global Capability Center. It determines who owns the entity, who employs the team, who controls IP and data, and whether the center is captive, partner-built, managed, or transferred through BOT."},
 { q:"What are the main types of GCC models?", a:"The eight main models are captive, Build-Operate-Transfer (BOT), managed GCC (GCC-as-a-Service), hybrid, EOR-led pilot, joint venture, shared services, and Center of Excellence. Each serves a different combination of ownership ambition, speed requirement, and control need."},
 { q:"What is the difference between captive and BOT?", a:"In a captive model, the enterprise builds and owns the center from day one. In BOT, a partner builds and operates the center first, then transfers ownership once predefined readiness conditions are met. BOT is a path to captive, not a permanent alternative."},
 { q:"Is EOR the same as a GCC?", a:"No. EOR is a hiring mechanism where a third-party employer legally employs a small team on the company's behalf. It can serve as an entry point for a GCC pilot, but it is not a scalable or permanent GCC model."},
 { q:"Which GCC model is best for AI teams?", a:"Captive, BOT-to-captive, or hybrid with a captive core. AI work involves sensitive data, proprietary models, and deep integration with enterprise platforms, all of which require strong IP and data controls."},
 { q:"Which GCC model is fastest to launch?", a:"EOR is fastest for small teams. A managed GCC is fastest for larger groups. Both sacrifice ownership and long-term control for speed."},
 { q:"How should companies choose a GCC model in India?", a:"Start with the mandate, not the model. Define whether the work is strategic or transactional, assess control needs, set timeline and scale targets, map compliance requirements, and decide whether the end state is captive ownership or ongoing managed delivery."},
 ],
// The homepage's visible questions and their answers are one list, defined
 // with the section that renders them, so the page and the markup can never
 // disagree about what was answered.
 "/": HOME_FAQS,
// The About page renders this same array, so the answers a search engine
 // reads are the answers a visitor reads.
 "/about": ABOUT_FAQS,
"/blog": [
 { q:"How often is new content published?", a:"We publish insights regularly, driven by real engagement patterns and evolving industry themes not a content calendar."},
 { q:"Can I suggest a topic?", a:"Yes. Reach out through our contact page with topics you'd like us to explore."},
 { q:"Are these based on real engagements?", a:"Our editorial perspective is shaped by real engagement experience, but we never disclose client details without permission."},
 { q:"Do you publish whitepapers or reports?", a:"Yes. Longer-form content is published periodically on key themes like AI-first GCCs, operating model design, and India market trends."},
 { q:"Can I subscribe for updates?", a:"Contact us to be added to our insights distribution list."},
 ],
"/services/gcc": gccOverviewFaqs,
"/gcc-for-ai-startups": [
 { q:"How small can I start a GCC?", a:"NeoIntelli launches GCCs with as few as 3-5 engineers. You can start with a small managed pod and scale up as product-market fit materializes."},
 { q:"Do I need to register a company in India?", a:"Not initially. With NeoIntelli's managed GCC model, you can start building your team without entity registration. We handle the legal structure while you focus on product."},
 { q:"How does IP protection work for startups?", a:"All engineers sign IP assignment agreements and NDAs. Your code, models, and data belong entirely to your company. This is a key advantage over outsourcing."},
 { q:"Can I interview and approve every hire?", a:"Yes. We source and screen candidates, but you interview and approve every person who joins your team. They're your team, not ours."},
 { q:"What if I need to scale down?", a:"Our month-to-month model allows you to scale up or down with 30 days notice. No long-term contracts or penalties."},
 { q:"How do time zones work for a startup?", a:"India teams can flex their hours for 4-6 hours of overlap with US time zones. Many startups find the follow-the-sun model actually increases productivity."},
 ],
"/gcc-faq": [
 { q:"What is a GCC (Global Capability Center)?", a:"A Global Capability Center is a wholly-owned offshore entity established by a company to perform critical business functions such as engineering, R&D, AI/ML, data analytics, and operations. Unlike outsourcing, a GCC gives you full ownership and control over your team, IP, and processes."},
 { q:"How is a GCC different from outsourcing?", a:"In outsourcing, a third-party vendor owns the team and manages delivery. In a GCC, you own the entity, hire the team directly, and retain full control over IP, processes, and quality. GCCs offer better retention, deeper domain knowledge, and stronger IP protection."},
 { q:"How long does it take to set up a GCC in India?", a:"With a managed GCC partner like NeoIntelli, you can have your first team members onboarded in 4-8 weeks. Full entity setup typically takes 8-16 weeks depending on complexity."},
 { q:"How much does it cost to set up a GCC in India?", a:"It depends on the team you need, the city, the engagement model and whether you set up your own entity or run on ours. Build your own scenario with the GCC cost calculator, or contact NeoIntelli for pricing and we will put a scoped figure in writing."},
 { q:"What is the minimum team size for a GCC?", a:"NeoIntelli can launch a GCC with as few as 3-5 engineers. The managed GCC model makes small teams economically feasible."},
 { q:"Why is India the #1 destination for GCCs?", a:"India combines the world's largest engineering talent pool, English proficiency, favorable time zones, mature infrastructure, supportive government policies, and 30+ years of global delivery experience."},
 { q:"How does IP protection work in an India GCC?", a:"India has strong IP protection laws. GCC employees sign NDAs and IP assignment agreements. All code, data, and intellectual property belongs to your company."},
 { q:"Is a GCC cheaper than outsourcing long-term?", a:"Yes. While outsourcing may be cheaper initially, GCCs become more cost-effective within 12-18 months due to lower attrition, no vendor margins, better productivity, and direct cost control."},
 { q:"How many GCCs are there in India?", a:"According to the India GCC Landscape 2026 industry report, India has 2,117 GCCs operating across 3,728 units, employing approximately 2.36 million professionals and generating $98.4 billion in FY2026 revenue. GCCs and GCC operating units are different measures: a single GCC often runs sites in more than one city."},
 { q:"When does a GCC break even?", a:"There is no credible universal GCC break-even period. It depends on team size, setup model, hiring ramp, transition cost, city, office model and the baseline being compared. NeoIntelli models break-even from the specific program assumptions rather than applying a generic market number."},
 { q:"What government incentives are available to GCCs in India?", a:"Potential support comes from a combination of India's foreign-investment and export-services framework, eligible STPI structures, transfer-pricing mechanisms and state-specific GCC policies. State incentives may cover areas such as capital investment, employment, training, rent or infrastructure, but eligibility varies significantly. NeoIntelli treats incentives as validated upside rather than a guaranteed part of the base business case."},
 { q:"Are GCC export services exempt from GST?", a:"Qualifying exports of services are treated as zero-rated supplies under India's IGST framework when the statutory export-of-services conditions are satisfied. A GCC should not assume that every intercompany service invoice automatically qualifies. Zero-rated is not the same as exempt, and the treatment depends on the contract, the recipient, the place of supply and how consideration is received."},
 { q:"What Indian labour laws apply to GCCs?", a:"India's four Labour Codes became effective on 21 November 2025, rationalising 29 central labour laws across wages, industrial relations, social security, and occupational safety and working conditions. Employment contracts, payroll, benefits and working-condition policies should be designed against that central framework. State-specific requirements, including Shops and Establishments registration and professional tax, still need to be assessed separately, and several central and state rules under the Codes are still being notified. This is not legal advice."},
 ],
"/industries/manufacturing-gcc": [
 { q:"What makes manufacturing GCCs different from IT GCCs?", a:"Manufacturing GCCs focus on Industry 4.0 capabilities - IoT, embedded systems, digital twins, predictive maintenance, and supply chain optimization. They require domain-specific engineering talent with manufacturing knowledge."},
 { q:"Can a GCC handle ITAR-sensitive work?", a:"GCCs can be structured to handle varying levels of sensitive work. For ITAR-adjacent work, appropriate security controls and compliance frameworks are put in place. Fully ITAR-restricted work typically stays onshore."},
 { q:"What manufacturing roles are available in India?", a:"India has strong talent pools for IoT engineers, embedded systems developers, computer vision engineers, supply chain data scientists, ERP integration specialists, digital twin developers, and industrial automation engineers."},
 { q:"How do quality standards apply to manufacturing GCCs?", a:"Manufacturing GCCs operate under relevant ISO standards and quality management systems. NeoIntelli helps establish quality frameworks aligned with your existing standards."},
 ],
"/industries/private-equity-gcc": [
 { q:"How does a GCC fit into a PE 100-day plan?", a:"NeoIntelli's 12-week GCC launch aligns with typical 100-day value creation plans. We can have initial engineers onboarded within weeks of acquisition close."},
 { q:"Can one GCC serve multiple portfolio companies?", a:"Yes. Our shared services GCC model allows smaller portfolio companies to share infrastructure while maintaining separate team management and IP boundaries."},
 { q:"How does a GCC impact EBITDA?", a:"Engineering cost savings from a GCC directly improve EBITDA. A typical 20-person GCC can save $2-4M annually compared to US-based teams, with savings visible from month one."},
 { q:"What's the GCC-in-a-Box model?", a:"GCC-in-a-Box is NeoIntelli's standardized playbook for rapidly deploying GCCs across multiple portfolio companies. Same processes, proven frameworks, 12-week launch."},
 ],
"/industries/retail-gcc": [
 { q:"What retail-specific capabilities can a GCC handle?", a:"Retail GCCs typically handle personalization engines, recommendation systems, demand forecasting, inventory optimization, omnichannel platforms, supply chain analytics, and computer vision for retail."},
 { q:"Can a retail GCC work with seasonal demand?", a:"Yes. GCCs can scale engineering teams up for peak seasons and major launches, then adjust. The managed model provides flexibility for seasonal needs."},
 { q:"How quickly can a retail GCC start delivering?", a:"With NeoIntelli, first engineers can be onboarded in 4-6 weeks. Most retail GCCs achieve full productivity within 3 months of launch."},
 ],
"/gcc-vs-outsourcing": [
 { q:"Is a GCC always cheaper than outsourcing?", a:"Not in year one. A GCC is usually 30 to 50 percent cheaper than outsourcing over a 5-year horizon because there are no vendor margins, attrition is lower, and institutional knowledge stays with you. In year one, outsourcing is often cheaper because there is no setup cost."},
 { q:"When does outsourcing make more sense than a GCC?", a:"Outsourcing is the better fit for short-term, project-based, or non-core work, for teams under 5 people, or when you do not want to manage an India operation and do not want a managed GCC partner."},
 { q:"Can I start with outsourcing and transition to a GCC later?", a:"Yes. Many global enterprises start with outsourcing to validate the India model, then convert the team into a captive GCC for long-term cost savings and full IP ownership. NeoIntelli supports this transition."},
 { q:"What about a hybrid GCC plus outsourcing model?", a:"A hybrid model works well for many enterprises. Core IP, AI, and long-term capabilities sit inside the GCC, while non-core work, surge capacity, and short-term projects go to outsourcing vendors."},
 { q:"Is NeoIntelli biased toward GCCs?", a:"We are a GCC partner, but we will tell you when outsourcing is the better fit. If your work is short-term, small-scale, or non-core, outsourcing usually makes more sense than building a GCC."},
 ],
"/gcc-as-a-service": [
 { q:"Do I legally own the team with GCC-as-a-Service?", a:"Yes. Employees are hired under your India entity (which NeoIntelli helps set up) or a co-employment arrangement. IP, codebase, data, and team direction stay 100 percent with you."},
 { q:"How is GCC-as-a-Service different from an EOR?", a:"An Employer of Record only employs people on your behalf and offers limited operational support. GCC-as-a-Service provides full operational infrastructure, including office, HR, compliance, retention programs, governance, and scaling support."},
 { q:"Can I transition from GCC-as-a-Service to a fully in-house GCC?", a:"Yes. Many global enterprises start with GCC-as-a-Service and transition to full in-house management as their India team matures. NeoIntelli designs every engagement so this transition is supported from day one."},
 { q:"What is the minimum team size for GCC-as-a-Service?", a:"We typically recommend 10 or more people to justify the GCC-as-a-Service model. For teams of 1 to 10, an EOR or specialist talent pod is usually more cost-effective."},
 ],
"/gcc-india-cost": [
 { q:"What is the total first-year cost to set up a 10-person GCC in India?", a:"Including entity setup, office, hiring, salaries, IT, and compliance, budget from around 400K USD for the first year, rising with seniority and team shape. That is roughly 40 to 50 percent of the same team in the US, with ongoing savings of 60 to 70 percent from year two onward. The figure is a starting point, not a quote."},
 { q:"Are these costs for Bengaluru or all of India?", a:"Salary ranges are national averages weighted toward Tier-1 cities. Bengaluru tends to be at the higher end; Hyderabad, Chennai, and Pune are 10 to 20 percent lower. NeoIntelli provides city-specific estimates as part of feasibility."},
 { q:"Do GCC India cost estimates include employer statutory contributions?", a:"Yes. Salary figures are fully loaded, including Provident Fund (12 percent), gratuity, ESI where applicable, professional tax, and statutory bonuses, plus standard benefits like health insurance and meal allowances."},
 { q:"How do GCC costs change as the team scales?", a:"Per-person costs typically fall 10 to 15 percent as you scale beyond 25 people, driven by better office rates, shared infrastructure, and operational efficiencies. Leadership and management layers add cost but improve delivery quality and retention."},
 { q:"Is it cheaper to use an EOR or set up our own GCC entity in India?", a:"EOR is cheaper for teams under 5 people or for pilots. Beyond that, an owned entity is more cost-effective long-term and gives full control over IP, data, and operations. Many global enterprises start with EOR and transition to an owned GCC."},
 { q:"What currency risk should we plan for in a GCC budget?", a:"GCC costs are mainly in INR. The INR to USD rate has been relatively stable (within 3 to 5 percent annually). We recommend a 5 percent currency buffer; some enterprises hedge with forward contracts for large committed spend."},
 ],
"/industries/bfsi-gcc": [
 { q:"Can NeoIntelli help with regulatory compliance for financial services GCCs?", a:"Yes. We build BFSI GCCs in India with compliance-first design covering Indian regulatory requirements (RBI, SEBI, IRDAI) and supporting awareness for US and EU regulations like SOX, GDPR, and PCI-DSS."},
 { q:"How do you handle data residency requirements for a BFSI GCC?", a:"We work with cloud providers and data center partners to ensure data residency, sovereignty, and cross-border data transfer requirements are addressed from day one of GCC operations."},
 { q:"What is the typical team size for a BFSI GCC in India?", a:"Most BFSI GCCs start with 10 to 25 people focused on a specific function (such as risk analytics or fraud detection) and scale to 50 to 200+ as more capabilities are brought in-house from outsourcing or HQ."},
 { q:"How long does it take to launch a BFSI GCC in India?", a:"With NeoIntelli's managed approach, a BFSI GCC can be operational in 8 to 12 weeks, including compliance setup, initial hiring, and infrastructure readiness."},
 ],
"/industries/healthcare-gcc": [
 { q:"How does NeoIntelli handle HIPAA compliance in a healthcare GCC?", a:"We implement HIPAA awareness training, data handling protocols, and technical safeguards from day one. Healthcare GCC setup includes BAA frameworks, access controls, and audit-ready documentation."},
 { q:"Can a healthcare GCC support FDA-regulated software development?", a:"Yes. We staff QA engineers experienced in GxP-validated testing and 21 CFR Part 11 compliance, and build development processes that support regulatory submissions."},
 { q:"What healthcare IT systems does your India talent have experience with?", a:"Our talent pool includes engineers experienced with Epic, Cerner, Meditech, and other major EHR/EMR platforms, as well as FHIR and HL7 integration standards."},
 { q:"How do you handle cross-border health data transfers from an India GCC?", a:"We work with legal and compliance teams to establish data residency requirements, cross-border transfer agreements, and technical controls that meet both Indian and international regulatory standards."},
 ],
"/industries/technology-gcc": [
 { q:"How is a tech GCC different from hiring a dev shop?", a:"A tech GCC gives you a dedicated, permanent team that is part of your company. They build institutional knowledge, own your codebase, and are invested in your product, unlike contractors who rotate across clients."},
 { q:"What is the minimum team size to start a technology GCC?", a:"We recommend starting with 5 to 10 engineers focused on a specific product area. This gives enough critical mass for a functioning team while keeping initial investment manageable."},
 { q:"Can my India tech team work in our timezone?", a:"Yes. Most tech GCCs operate with 4 to 5 hours of overlap with US timezones. Teams flex hours for morning standups and cross-team collaboration, while using the non-overlap window for deep work."},
 { q:"How fast can a tech GCC ramp up in India?", a:"First hires are typically onboarded within 4 to 6 weeks. A 15-person team can be fully ramped within 12 weeks. NeoIntelli maintains active talent pipelines for common tech roles."},
 ],
};

export const buildFaqSchema = (pathname: string): object | null => {
 const normalizedPath = normalizePath(pathname);
 const faqs = PAGE_FAQS[normalizedPath];
 if (!faqs || faqs.length === 0) return null;
 return {
"@context":"https://schema.org",
"@type":"FAQPage",
 mainEntity: faqs.map((faq) => ({
"@type":"Question",
 name: faq.q,
 acceptedAnswer: {"@type":"Answer", text: faq.a },
 })),
 };
};

export const buildHowToSchema = (pathname: string): object | null => {
 if (normalizePath(pathname) !== "/services/gcc/setup-launch") return null;
 return {
"@context":"https://schema.org",
"@type":"HowTo",
 name:"How to set up a GCC in India",
 description:"The eight setup workstreams NeoIntelli runs in parallel to convert an approved GCC mandate and business case into a working Global Capability Center in India.",
 step: [
 {"@type":"HowToStep", name:"Program management", text:"One integrated plan across every workstream, with dependencies, decision gates, a risk register and a weekly cadence."},
 {"@type":"HowToStep", name:"Entity and compliance coordination", text:"Coordinate the entity route, statutory registrations, advisers, the employment framework and policy requirements."},
 {"@type":"HowToStep", name:"Leadership and talent mobilization", text:"Search for the center head and function leads, design the initial roles, launch recruitment with technical validation and sequence onboarding."},
 {"@type":"HowToStep", name:"Workplace", text:"Set the office strategy, select and contract workspace, and make equipment and facilities ready for day one."},
 {"@type":"HowToStep", name:"IT and security", text:"Provision identity, devices and connectivity, apply the security baseline and integrate with headquarters systems."},
 {"@type":"HowToStep", name:"People readiness", text:"Stand up employment workflows, payroll, benefits, policies and the onboarding journey before the first offer."},
 {"@type":"HowToStep", name:"Governance", text:"Agree decision rights, reporting, launch governance and the operating cadence the center keeps after go-live."},
 {"@type":"HowToStep", name:"Go-live", text:"Sign off the readiness checklist, start the first employees against a defined objective and hand over into GCC Operations."},
 ],
 };
};

const MONTH_NUMBERS: Record<string, string> = {
 Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
 Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12",
};

/**
 * Blog dates are authored at month precision ("Aug 2026"), which is also what
 * the post renders on-page, so the ISO value is the first of that month. Used
 * by both the sitemap lastmod and the BlogPosting dates so the two agree.
 */
export const postDateIso = (date: string): string | null => {
 const match = date.trim().match(/^([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
 if (!match) return null;
 const month = MONTH_NUMBERS[match[1]];
 return month ? `${match[2]}-${month}-01` : null;
};

export const buildBlogPostingSchema = (pathname: string): object | null => {
 const normalizedPath = normalizePath(pathname);
 if (!normalizedPath.startsWith("/blog/")) return null;
 const slug = normalizedPath.replace("/blog/","");
 const post = blogPosts.find((p) => p.slug === slug);
 if (!post) return null;
 const canonical = buildCanonicalUrl(normalizedPath);
 const published = postDateIso(post.date);
 const ogImage = getOgImage(normalizedPath);
 return {
"@context":"https://schema.org",
"@type":"BlogPosting",
"@id": `${canonical}#blogposting`,
 url: canonical,
 headline: post.title,
 description: post.metaDescription,
 articleSection: post.category,
 author: {"@id": `${SITE_URL}/#organization`},
 publisher: {"@id": `${SITE_URL}/#organization`},
 image: {
"@type":"ImageObject",
 url: ogImage.url,
 width: ogImage.width,
 height: ogImage.height,
 },
 ...(published ? { datePublished: published, dateModified: postDateIso(post.updated ?? post.date) ?? published } : {}),
 mainEntityOfPage: {"@id": `${canonical}#webpage` },
 isPartOf: {"@type":"CollectionPage","@id": `${SITE_URL}/blog#webpage`, name:"NeoIntelli Insights", url: `${SITE_URL}/blog`},
 keywords: post.secondaryKeywords.join(","),
 };
};
