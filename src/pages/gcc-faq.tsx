"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import { ArrowRight, ChevronRight, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Consultation from "@/features/home/components/Consultation";
import ContextAdvisoryCallout from "@/components/shared/ContextAdvisoryCallout";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type Category =
  | "All"
  | "GCC Basics"
  | "Setup & Process"
  | "Cost & ROI"
  | "Talent"
  | "Operations & Compliance";

interface FAQItem {
  q: string;
  a: React.ReactNode;
  category: Category;
}

/* ------------------------------------------------------------------ */
/* FAQ data */
/* ------------------------------------------------------------------ */

const categories: Category[] = [
  "All",
  "GCC Basics",
  "Setup & Process",
  "Cost & ROI",
  "Talent",
  "Operations & Compliance",
];

const faqs: FAQItem[] = [
  /* ---- GCC Basics ---- */
  {
    category: "GCC Basics",
    q: "What is a GCC (Global Capability Center)?",
    a: (
      <>
        A Global Capability Center (GCC) is a wholly-owned offshore entity established by a company to
        perform critical business functions such as engineering, R&D, AI/ML, data analytics, and
        operations. Unlike outsourcing, a GCC gives you full ownership and control over your team, IP,
        and processes. India&apos;s FY2026 GCC ecosystem includes 2,117 GCCs operating across 3,728 units.
      </>
    ),
  },
  {
    category: "GCC Basics",
    q: "What does GCC stand for?",
    a: (
      <>
        GCC stands for Global Capability Center. It was formerly known as a captive center or Global
        In-house Center (GIC). The term reflects the evolution from cost-focused offshore operations to
        strategic capability hubs.
      </>
    ),
  },
  {
    category: "GCC Basics",
    q: "How is a GCC different from outsourcing?",
    a: (
      <>
        In outsourcing, a third-party vendor owns the team and manages delivery. In a GCC, you own the
        entity, hire the team directly, and retain full control over IP, processes, and quality. GCCs
        offer better retention, deeper domain knowledge, and stronger IP protection. Learn more on our{" "}
        <Link to="/services/gcc" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          GCC Services page
        </Link>
        .
      </>
    ),
  },
  {
    category: "GCC Basics",
    q: "How is a GCC different from a BOT (Build-Operate-Transfer)?",
    a: (
      <>
        A BOT model involves a partner building and operating your center initially, then transferring
        ownership to you. A GCC can be set up directly as your entity from day one, or through a managed
        GCC model where a partner handles operations while you retain ownership. NeoIntelli supports both
        approaches.
      </>
    ),
  },
  {
    category: "GCC Basics",
    q: "What types of companies build GCCs?",
    a: (
      <>
        Companies of all sizes build GCCs - from startups with 5 engineers to large multinationals with
        5,000+ employees. The common thread is a need for high-quality talent, IP ownership, and
        long-term cost efficiency. Industries include{" "}
        <Link to="/industries/technology-gcc" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          technology
        </Link>
        ,{" "}
        <Link to="/industries/bfsi-gcc" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          financial services
        </Link>
        ,{" "}
        <Link to="/industries/healthcare-gcc" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          healthcare
        </Link>
        ,{" "}
        <Link to="/industries/manufacturing-gcc" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          manufacturing
        </Link>
        ,{" "}
        <Link to="/industries/retail-gcc" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          retail
        </Link>
        , and{" "}
        <Link to="/industries/private-equity-gcc" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          private equity
        </Link>
        .
      </>
    ),
  },
  {
    category: "GCC Basics",
    q: "Why is India the #1 destination for GCCs?",
    a: (
      <>
        India combines the world&apos;s largest engineering talent pool (5M+ STEM graduates/year), English
        proficiency, favorable time zones for US/EU overlap, mature infrastructure, supportive government
        policies, and 30+ years of global delivery experience. No other country matches this combination
        at scale.
      </>
    ),
  },
  {
    category: "GCC Basics",
    q: "How many GCCs are there in India?",
    a: (
      <>
        According to the India GCC Landscape 2026 industry report, India has 2,117 GCCs
        operating across 3,728 units, employing approximately 2.36 million professionals and generating
        $98.4 billion in FY2026 revenue. Note that GCCs and GCC operating units are different measures:
        a single GCC often runs sites in more than one city.
      </>
    ),
  },
  {
    category: "GCC Basics",
    q: "What functions can a GCC handle?",
    a: (
      <>
        GCCs can handle virtually any knowledge-work function: software engineering, AI/ML, data
        engineering, product development, QA, DevOps, cybersecurity, finance operations, HR shared
        services, legal operations, supply chain analytics, and more.
      </>
    ),
  },

  /* ---- Setup & Process ---- */
  {
    category: "Setup & Process",
    q: "How long does it take to set up a GCC in India?",
    a: (
      <>
        With a managed GCC partner like NeoIntelli, you can have your first team members onboarded in
        4-8 weeks. Full entity setup with company registration typically takes 8-16 weeks depending on
        complexity.
      </>
    ),
  },
  {
    category: "Setup & Process",
    q: "What are the legal requirements for a GCC in India?",
    a: (
      <>
        You&apos;ll need to register a legal entity (typically a Private Limited Company), obtain a PAN and
        TAN, register for GST, comply with India&apos;s four Labour Codes and the applicable state
        requirements including Shops and Establishments registration, and set up appropriate tax
        structures. A managed GCC partner coordinates all of this with qualified advisers.
      </>
    ),
  },
  {
    category: "Setup & Process",
    q: "Do I need to register a company in India?",
    a: (
      <>
        For a fully owned GCC, yes - you&apos;ll register a subsidiary (Private Limited Company). However,
        with a managed GCC model, you can start without entity registration while NeoIntelli handles the
        legal structure. You can transition to your own entity later.
      </>
    ),
  },
  {
    category: "Setup & Process",
    q: "What cities are best for GCCs in India?",
    a: (
      <>
        Bengaluru leads for engineering, AI, and product development. Hyderabad excels in enterprise and
        financial services tech. Pune offers strong engineering at lower costs. Chennai is strong for
        manufacturing and automotive tech. NCR (Delhi/Gurgaon/Noida) serves finance and consulting. The
        best city depends on your talent needs and budget.
      </>
    ),
  },
  {
    category: "Setup & Process",
    q: "What is the minimum team size for a GCC?",
    a: (
      <>
        NeoIntelli can launch a GCC with as few as 3-5 engineers. While traditional GCCs required 50+
        people to be viable, the managed GCC model makes small teams economically feasible.
      </>
    ),
  },
  {
    category: "Setup & Process",
    q: "Can I start small and scale up?",
    a: (
      <>
        Absolutely. Most NeoIntelli clients start with 5-15 engineers and scale based on results. Our
        month-to-month model means you can grow at your own pace with no long-term commitments. Scale up
        or down with 30 days notice.
      </>
    ),
  },
  {
    category: "Setup & Process",
    q: "What infrastructure does a GCC need?",
    a: (
      <>
        At minimum: secure office space, high-speed internet (redundant connections), IT infrastructure
        (laptops, VPN, collaboration tools), HR and payroll systems, and compliance frameworks.
        NeoIntelli provides all infrastructure as part of our managed GCC model.
      </>
    ),
  },

  /* ---- Cost & ROI ---- */
  {
    category: "Cost & ROI",
    q: "How much does it cost to set up a GCC in India?",
    a: (
      <>
        It depends on the team you need, the city, the engagement model and whether you set up your own
        entity or run on ours. Build your own scenario with the{" "}
        <Link to="/gcc-roi-estimator" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          GCC Cost Calculator
        </Link>
        , or contact us for pricing and we will put a scoped figure in writing.
      </>
    ),
  },
  {
    category: "Cost & ROI",
    q: "What are the ongoing monthly costs?",
    a: (
      <>
        Monthly costs include salaries, office space, IT infrastructure, HR and admin, compliance, and
        management overhead. Salaries are the dominant line. The all-in figure moves with team size,
        seniority mix and city, so contact us for pricing on the team you have in mind.
      </>
    ),
  },
  {
    category: "Cost & ROI",
    q: "How does GCC cost compare to US/EU hiring?",
    a: (
      <>
        A senior software engineer in the US costs $150K-$200K/year. The same caliber of talent in India
        costs $30K-$60K/year. Including all overhead, GCCs typically deliver 60-70% cost savings compared
        to US hiring.
      </>
    ),
  },
  {
    category: "Cost & ROI",
    q: "When does a GCC break even?",
    a: (
      <>
        There is no credible universal GCC break-even period. It depends on team size, setup model,
        hiring ramp, transition cost, city, office model and the baseline being compared. NeoIntelli
        models break-even from the specific program assumptions rather than applying a generic market
        number. The{" "}
        <Link to="/gcc-roi-estimator" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          ROI Estimator
        </Link>{" "}
        and{" "}
        <Link to="/services/gcc/strategy-business-case" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          Strategy &amp; Business Case
        </Link>{" "}
        build that model from your own inputs.
      </>
    ),
  },
  {
    category: "Cost & ROI",
    q: "What are the hidden costs of a GCC?",
    a: (
      <>
        Common hidden costs include: management time for oversight, travel costs for team visits,
        culture-building investments, recruitment fees for initial hiring, and potential
        attrition-related re-hiring. A good managed GCC partner accounts for all of these upfront.
      </>
    ),
  },
  {
    category: "Cost & ROI",
    q: "Is a GCC cheaper than outsourcing long-term?",
    a: (
      <>
        Yes. While outsourcing may be cheaper in month one, GCCs become more cost-effective within 12-18
        months due to lower attrition, no vendor margins (typically 30-50% markup), better productivity
        from retained knowledge, and direct cost control.
      </>
    ),
  },

  /* ---- Talent ---- */
  {
    category: "Talent",
    q: "What talent is available in India for GCCs?",
    a: (
      <>
        India produces 1.5 million engineering graduates annually and has deep talent pools in software
        engineering, AI/ML, data science, cloud computing, DevOps, cybersecurity, and emerging
        technologies. Major tech hubs have 15-20 years of global delivery experience.
      </>
    ),
  },
  {
    category: "Talent",
    q: "Can I hire AI/ML specialists through a GCC?",
    a: (
      <>
        Yes. India has one of the world&apos;s largest pools of AI/ML talent, with strong communities in
        Bengaluru, Hyderabad, and Pune. NeoIntelli specializes in building AI-first GCC teams. Visit our{" "}
        <Link to="/services/ai-gcc" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          AI-First GCC page
        </Link>{" "}
        to learn more.
      </>
    ),
  },
  {
    category: "Talent",
    q: "What is the typical attrition rate in Indian GCCs?",
    a: (
      <>
        Industry average attrition in Indian tech is 15-20%. Well-managed GCCs achieve 8-12% attrition
        through competitive compensation, strong culture, career growth paths, and meaningful work.
        NeoIntelli&apos;s managed GCCs consistently achieve below-industry attrition.
      </>
    ),
  },
  {
    category: "Talent",
    q: "How do you ensure talent quality?",
    a: (
      <>
        NeoIntelli uses a rigorous multi-stage screening process: resume screening, technical
        assessments, coding challenges, domain interviews, and cultural fit evaluation. You interview and
        approve every hire. Our offer-to-join ratio exceeds 85%.
      </>
    ),
  },
  {
    category: "Talent",
    q: "Do GCC employees work for my company or a vendor?",
    a: (
      <>
        In a fully owned GCC, employees work directly for your Indian subsidiary. In a managed GCC
        model, employees may be on NeoIntelli&apos;s payroll initially but work exclusively for you, with
        transition to your entity as you scale.
      </>
    ),
  },

  /* ---- Operations & Compliance ---- */
  {
    category: "Operations & Compliance",
    q: "How does IP protection work in an India GCC?",
    a: (
      <>
        India has strong IP protection laws and is a signatory to major international IP treaties. GCC
        employees sign NDAs and IP assignment agreements. All code, data, and intellectual property
        belongs to your company. This is a key advantage over outsourcing.
      </>
    ),
  },
  {
    category: "Operations & Compliance",
    q: "What about data privacy and GDPR compliance?",
    a: (
      <>
        India&apos;s Digital Personal Data Protection Act (DPDPA) 2023 provides a strong privacy framework.
        GCCs can implement GDPR, HIPAA, SOC 2, and other compliance frameworks. NeoIntelli helps design
        compliant data handling processes from day one.
      </>
    ),
  },
  {
    category: "Operations & Compliance",
    q: "What government incentives are available to GCCs in India?",
    a: (
      <>
        Potential support comes from a combination of India&apos;s foreign-investment and export-services
        framework, eligible STPI structures, transfer-pricing mechanisms and state-specific GCC policies.
        State incentives may cover areas such as capital investment, employment, training, rent or
        infrastructure, but eligibility varies significantly. NeoIntelli treats incentives as validated
        upside rather than a guaranteed part of the base business case. See{" "}
        <Link to="/services/gcc/location-strategy" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          GCC Location Strategy
        </Link>{" "}
        for how state policy is assessed and{" "}
        <Link to="/services/gcc/setup-launch" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          Setup &amp; Launch
        </Link>{" "}
        for the entity and tax mechanics.
      </>
    ),
  },
  {
    category: "Operations & Compliance",
    q: "Are GCC export services exempt from GST?",
    a: (
      <>
        Qualifying exports of services are treated as zero-rated supplies under India&apos;s IGST framework
        when the statutory export-of-services conditions are satisfied. A GCC should not assume that every
        intercompany service invoice automatically qualifies. Zero-rated is not the same as exempt, and the
        treatment depends on the contract, the recipient, the place of supply and how consideration is
        received. Validate it with qualified tax advisers before modelling it.
      </>
    ),
  },
  {
    category: "Operations & Compliance",
    q: "What Indian labor laws apply to GCCs?",
    a: (
      <>
        India&apos;s four Labour Codes became effective on 21 November 2025, rationalising 29 central labour
        laws across wages, industrial relations, social security, and occupational safety and working
        conditions. Employment contracts, payroll, benefits and working-condition policies should be
        designed against that central framework. State-specific requirements, including Shops and
        Establishments registration and professional tax, still need to be assessed separately, and
        several central and state rules under the Codes are still being notified. NeoIntelli coordinates
        compliance workflows as part of its managed GCC service and works with qualified advisers for
        legal interpretation. This is not legal advice. See{" "}
        <Link to="/services/gcc-operations/governance-compliance" className="text-[#008EC4] font-medium hover:underline focus-visible:outline-none transition-colors">
          Governance &amp; Compliance
        </Link>.
      </>
    ),
  },
  {
    category: "Operations & Compliance",
    q: "How do time zones work for collaboration?",
    a: (
      <>
        India Standard Time (IST) is UTC+5:30, providing 3-4 hours of overlap with European work hours
        and can accommodate US overlap through flexible schedules (typically 11 AM - 8 PM IST for US West
        Coast alignment). Many teams use a mix of synchronous and asynchronous collaboration.
      </>
    ),
  },
  {
    category: "Operations & Compliance",
    q: "Who manages the day-to-day operations?",
    a: (
      <>
        In a managed GCC, NeoIntelli handles HR, admin, facilities, compliance, and operational
        management. You manage the technical direction, priorities, and team culture. As your team grows,
        you can bring in your own India leadership.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export default function GCCFaq() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.title = "GCC FAQ 2026 | Top GCC Questions Answered — NeoIntelli";
  }, []);

  useEffect(() => {
    const handleScrollAndResize = () => {
      const bar = document.getElementById("main-navbar-bar") || document.querySelector("header");
      const navH = bar ? bar.offsetHeight : 75;
      document.documentElement.style.setProperty("--site-navbar-height", `${navH}px`);

      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= navH + 2);
      }
    };

    handleScrollAndResize();
    window.addEventListener("scroll", handleScrollAndResize, { passive: true });
    window.addEventListener("resize", handleScrollAndResize);
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C] flex flex-col">
      <Navbar appearance="dark" />

      <main className="relative flex-grow">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION (Matches GCC Cost Page) */}
        {/* ============================================================ */}
        <section
          id="gcc-faq-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="GCC FAQ Hero"
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
              alt="India GCC FAQ"
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
                    GCC FAQ
                  </span>
                </li>
              </ol>
            </nav>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold font-manrope text-white tracking-[-0.035em] leading-[1.08] mb-4 sm:mb-5 max-w-2xl lg:max-w-3xl text-left"
            >
              India GCC FAQ &mdash; <br className="hidden sm:inline" />
              Your Questions, Answered
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-normal font-sans max-w-2xl text-left"
            >
              30+ frequently asked questions about Global Capability Centers in India &mdash; cost structures, legal setup process, compliance requirements, talent models, timelines, and operational governance.
            </motion.p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. STICKY FAQ CONTROL STRIP (Matches AI-GCC Inner Page Navigation) */}
        {/* ============================================================ */}
        <nav
          ref={navRef}
          id="gcc-faq-subnav"
          aria-label="FAQ Search and Category Filter"
          style={{ top: "var(--site-navbar-height, 75px)" }}
          className={`sticky top-[69px] sm:top-[74px] lg:top-[75px] z-40 bg-[#081B3E]/95 backdrop-blur-md border-b border-white/[0.08] select-none transition-shadow duration-300 ${
            isSticky
              ? "shadow-[0_12px_32px_rgba(4,14,35,0.7)]"
              : "shadow-lg shadow-[#081B3E]/20"
          }`}
        >
          {/* Top Vibrant Amber Accent Ribbon matching AI-GCC Subnav */}
          <div className="relative w-full overflow-hidden">
            <div
              className={`w-full transition-all duration-300 bg-gradient-to-r from-amber-600 via-amber-400 via-yellow-200 via-amber-400 to-amber-600 ${
                isSticky
                  ? "h-[3.5px] sm:h-[4px] shadow-[0_2px_14px_rgba(245,158,11,0.95),0_0_24px_rgba(251,191,36,0.7)]"
                  : "h-[3px] shadow-[0_1px_10px_rgba(245,158,11,0.75)]"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
            <div
              className={`absolute top-[3px] inset-x-0 h-3 bg-gradient-to-b from-amber-400/25 via-amber-400/10 to-transparent pointer-events-none transition-opacity duration-300 ${
                isSticky ? "opacity-100" : "opacity-35"
              }`}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input on the Left */}
            <div className="relative w-full md:w-72 lg:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-1.5 sm:py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/15 focus:border-[#00A3E0] text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00A3E0] transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills on the Right (Aligned in One Line) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 justify-start md:justify-end">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 font-manrope ${
                      isActive
                        ? "bg-[#008EC4] text-white shadow-sm shadow-[#008EC4]/30 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.08] font-medium"
                    }`}
                  >
                    <span>{cat}</span>
                    {cat === "All" && (
                      <span
                        className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                        }`}
                      >
                        {faqs.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ============================================================ */}
        {/* 3. FAQ ACCORDION SECTION (Matching Typography of Other Pages) */}
        {/* ============================================================ */}
        <section className="relative pt-10 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {activeCategory !== "All" && (
              <div className="mb-6 flex items-center justify-between border-b border-[#D2DCF0]/80 pb-3">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0D306C] font-manrope">
                  {activeCategory}
                </h2>
                <span className="text-xs sm:text-sm text-[#505D74] font-medium">
                  {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"}
                </span>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.q;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-[#D2DCF0] bg-white transition-all overflow-hidden shadow-xs hover:border-[#169DC8]/50 hover:shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.q)}
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer transition-colors hover:bg-slate-50/60"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base md:text-lg font-bold sm:font-extrabold text-[#0D306C] pr-3 sm:pr-4 font-manrope">
                        {faq.q}
                      </span>
                      <div
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-[#D2DCF0] transition-all duration-200 ${
                          isOpen
                            ? "bg-[#169DC8] text-white rotate-180 border-[#169DC8]"
                            : "bg-[#F0F5FA] text-[#505D74]"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm md:text-[15px] text-[#505D74] leading-relaxed border-t border-[#D2DCF0]/80 pt-3 sm:pt-4 font-sans font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#D2DCF0] shadow-xs">
                <p className="text-[#505D74] text-base mb-3 font-normal">
                  No questions match &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="text-sm font-semibold text-[#008EC4] hover:underline cursor-pointer"
                >
                  View all 30+ questions &rarr;
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. STILL HAVE QUESTIONS (ContextAdvisoryCallout Component) */}
        {/* ============================================================ */}
        <ContextAdvisoryCallout title="Still have questions about your GCC?" />

        {/* ============================================================ */}
        {/* 5. LET'S BUILD TOGETHER (Home Consultation with Wave Divider) */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
      </main>

      <Footer />
    </div>
  );
}
