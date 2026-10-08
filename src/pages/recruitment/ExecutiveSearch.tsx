import SubServicePage from "@/components/shared/SubServicePage";

export default function ExecutiveSearch() {
 return (
  <SubServicePage
   pageTitle="Executive Search Firms India | CXO & Leadership Hiring | NeoIntelli"
   metaDescription="Retained executive search for CXO, board and leadership hiring across India. Research-led, confidential mandates with mapped-market shortlists and structured assessment."
   subtitle="Recruitment - Executive Search"
   title="Executive Search & Leadership Hiring in India"
   description="Retained search for CXO, country head, function head and board-level roles - mapped-market research, confidential outreach and structured assessment."
   breadcrumbs={[
    { name: "Home", href: "/" },
    { name: "Capabilities", href: "/services/ai-engineering" },
    { name: "Recruitment", href: "/recruitment" },
    { name: "Executive Search" },
   ]}
   intro="A leadership hire is the most expensive decision your organisation makes."
   introMuted=" We treat it like one - with mapped-market research, structured assessment, deep referencing and a confidential process that protects both client and candidate."
   metricsBand={[
    { value: "45 days", label: "Median search closure" },
    { value: "100%", label: "Confidential mandates" },
    { value: "12 months", label: "Replacement guarantee" },
    { value: "CXO+", label: "Board & C-suite" },
   ]}
   whyItMatters={{
    title: "Why retained executive search",
    paragraphs: [
     "Leadership roles - CEO, COO, CTO, CFO, country head, business head, function head - are rarely filled through job board postings alone. Top candidates are passive, well-compensated and only move for the right narrative.",
     "NeoIntelli's executive search practice runs every mandate as a dedicated retained search led by a senior consultant, with mapped-market research, structured assessment and 360-degree referencing on every search.",
    ],
   }}
   deliverablesTitle="What we deliver on a retained search"
   deliverables={[
    { title: "Mandate brief & success profile", desc: "Co-created role specification, success profile, scorecard and target company map - signed off in week one." },
    { title: "Mapped-market research", desc: "Comprehensive long-list of 80-120 leaders across target companies, with current title, tenure, comp band and reachability." },
    { title: "Confidential approach", desc: "Senior-consultant-led outreach with a calibrated narrative - no client name in market until shortlist stage." },
    { title: "Structured assessment", desc: "Behavioural interviews, leadership psychometrics and case-based deep-dives aligned to the success profile." },
    { title: "360-degree referencing", desc: "Multi-level references across managers, peers and reports - on the record and back-channel." },
    { title: "Offer & onboarding support", desc: "Comp benchmarking, counter-offer management, joining narrative and 90-day onboarding check-ins." },
   ]}
   approachTitle="Our retained search process"
   approach={[
    { step: "01", title: "Define", desc: "Detailed brief with the chair, CEO or hiring sponsor - role context, success profile, scorecard, target companies and timeline." },
    { step: "02", title: "Research", desc: "Mapped market across target and adjacent companies - long-list of 80-120 leaders with full profiling." },
    { step: "03", title: "Approach", desc: "Calibrated outreach by senior consultants, qualifying conversations and confidential narrative." },
    { step: "04", title: "Assess", desc: "Structured behavioural interviews, psychometrics, case discussions and on-the-record references." },
    { step: "05", title: "Present", desc: "Written shortlist of 3 to 5 with full assessment, references and comp positioning - panel interviews coordinated." },
    { step: "06", title: "Close", desc: "Offer negotiation, counter-offer management, joining support and 90-day onboarding check-ins." },
   ]}
   pitfalls={{
    title: "Leadership-hiring traps to avoid",
    items: [
     { title: "Hiring on resume, not scorecard", desc: "Leadership impact is contextual. A CTO who scaled a 200-person team may struggle at 20 - and vice versa. We assess against your context, not their last title." },
     { title: "Skipping back-channel references", desc: "On-the-record references are curated. The decisive signal comes from back-channel references via the consultant's own network." },
     { title: "Comp without total-rewards view", desc: "Cash, ESOP, joining bonus, retention pool and exit clauses all decide whether a leader joins and stays. We benchmark the full package." },
     { title: "Underestimating counter-offers", desc: "Counter-offers often surface in the final week of a process. Without a structured closing plan, strong candidates are lost at the buzzer." },
    ],
   }}
   successMetrics={{
    title: "What success looks like",
    items: [
     "Mapped market and long-list within 14 days of mandate signoff",
     "Calibrated shortlist of 3 to 5 within 30 days",
     "Median search closure under 45 days",
     "100% confidentiality maintained through shortlist stage",
     "12-month replacement guarantee on every retained search",
     "Quarterly check-ins with the hired leader for the first year",
    ],
   }}
   industries={{
    title: "Sectors we search for",
    items: [
     { name: "BFSI", href: "/industries/bfsi-gcc" },
     { name: "Healthcare", href: "/industries/healthcare-gcc" },
     { name: "Technology", href: "/industries/technology-gcc" },
     { name: "Manufacturing", href: "/industries/manufacturing-gcc" },
     { name: "Retail", href: "/industries/retail-gcc" },
     { name: "Private Equity (portfolio)", href: "/industries/private-equity-gcc" },
    ],
   }}
   darkTitle="Roles we search for"
   darkDescription="Board, C-suite and function-head leadership across India and GCC mandates."
   darkPoints={[
    "Board roles - independent directors, audit committee chairs, nomination committee",
    "C-suite - CEO, COO, CFO, CTO, CIO, CHRO, CMO, CDO, CISO",
    "Country and business heads - India MD, country GM, P&L leaders",
    "GCC heads - centre heads, COE leaders, GCC CTO and CHRO",
    "Function heads - Head of Engineering, Head of Product, Head of AI/Data",
    "Private equity portfolio CXOs and value-creation leadership",
   ]}
   faqs={[
    { q: "How does your retained search process work?", a: "Every mandate is led by a senior consultant and runs through mapped-market research, confidential approach, structured assessment and 360-degree referencing. Our median closure is 45 days, fees are retained across three milestones, and every search carries a 12-month replacement guarantee." },
    { q: "What is the fee model?", a: "Retained, with a three-stage milestone structure (engagement, shortlist, joining), charged as a percentage of first-year total compensation. Rates move with mandate complexity, confidentiality and market scarcity, so contact us for pricing - quoted in full, with no hidden costs, before the search begins." },
    { q: "What is your replacement guarantee?", a: "12 months from join date. If the leader leaves voluntarily or is exited for performance, we re-execute the search at no additional fee." },
    { q: "Can you run confidential searches?", a: "Yes - 100% of our retained searches maintain confidentiality through shortlist stage. Client name is shared only with consented shortlisted candidates." },
    { q: "Do you handle India and global mandates?", a: "We focus on India-based roles - including India MD, GCC head and India-based CXO roles for global parent companies." },
    { q: "How long does a typical search take?", a: "30 days to shortlist, 45 days median to signed offer. Complex or highly confidential searches may extend to 60-90 days." },
   ]}
   relatedLinks={[
    { name: "Permanent Recruitment", href: "/recruitment/permanent" },
    { name: "Contract Staffing", href: "/recruitment/contract-staffing" },
    { name: "RPO Services", href: "/recruitment/rpo" },
    { name: "GCC Workforce Strategy", href: "/services/gcc-operations/workforce-strategy" },
   ]}
   ctaTitle="Considering a leadership search?"
   ctaDescription="Speak to a senior consultant - confidentially - about your mandate, success profile and shortlist plan."
  />
 );
}