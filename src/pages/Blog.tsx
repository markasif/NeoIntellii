"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import { ArrowRight, ChevronRight, Clock, Search, FileText, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import Consultation from "@/features/home/components/Consultation";
import FiveCardHeroGrid from "@/components/shared/FiveCardHeroGrid";
import { blogPosts, getCategoryColor } from "@/data/blogPosts";

const categories = ["All", "GCC Strategy", "GCC Setup", "GCC Talent", "AI GCC"];

const faqs = [
  {
    q: "How often is new content published?",
    a: "We publish insights regularly, driven by real engagement patterns and evolving industry themes not a content calendar.",
  },
  {
    q: "Can I suggest a topic?",
    a: "Yes. Reach out through our contact page with topics you'd like us to explore.",
  },
  {
    q: "Are these based on real engagements?",
    a: "Our editorial perspective is shaped by real engagement experience, but we never disclose client details without permission.",
  },
  {
    q: "Do you publish whitepapers or reports?",
    a: "Yes. Longer-form content is published periodically on key themes like AI-first GCCs, operating model design, and India market trends.",
  },
  {
    q: "Can I subscribe for updates?",
    a: "Contact us to be added to our insights distribution list.",
  },
];

const topicClusters = [
  {
    title: "GCC Market Entry & Setup",
    desc: "Mandate, sequence, setup economics, and practical launch blueprints.",
    keywords: "build GCC in India, GCC setup cost India",
  },
  {
    title: "GCC Strategy & Governance",
    desc: "Operating models, governance, business cases, and board-level decision frameworks.",
    keywords: "Global Capability Center India, GCC operating model",
  },
  {
    title: "Location Strategy",
    desc: "City selection, Bengaluru deep-dives, and multi-site location design.",
    keywords: "best cities for GCC in India, GCC Bangalore",
  },
  {
    title: "GCC Talent & Staffing",
    desc: "Workforce design, hiring strategy, engineering staffing, and retention architecture.",
    keywords: "GCC talent strategy, GCC hiring strategy",
  },
  {
    title: "AI GCC",
    desc: "AI-first operating models, use-case prioritization, and pilot-to-production playbooks.",
    keywords: "AI GCC, AI-first GCC, AI-powered GCC",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const topicClusterRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.title = "GCC, AI & Enterprise Insights | NeoIntelli Blog";
  }, []);

  // Sticky detection + hide when topic clusters enters view
  useEffect(() => {
    const handleScroll = () => {
      const bar = document.getElementById("main-navbar-bar") || document.querySelector("header");
      const navH = bar ? bar.offsetHeight : 75;
      document.documentElement.style.setProperty("--site-navbar-height", `${navH}px`);

      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= navH + 2);
      }

      if (topicClusterRef.current) {
        const clusterRect = topicClusterRef.current.getBoundingClientRect();
        // Hide sticky bar when topic clusters section reaches top 2/3 of viewport
        setIsHidden(clusterRect.top < window.innerHeight * 0.66);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost =
    blogPosts.find((post) => !post.excludeFromPromotions) ?? blogPosts[0];
  const showFeatured = activeCategory === "All" && searchQuery === "";
  const remainingPosts = showFeatured
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar appearance="dark" />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="insights-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="Insights Hero"
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
              alt="GCC & AI Insights"
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
                    Insights
                  </span>
                </li>
              </ol>
            </nav>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold font-manrope text-white tracking-[-0.035em] leading-[1.08] mb-4 sm:mb-5 max-w-3xl text-left"
            >
              Perspectives on GCCs, AI, and enterprise capability.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-normal font-sans max-w-2xl text-left"
            >
              Practical, experience-informed writing on building and scaling high-value capability centers.
            </motion.p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. STICKY FILTER & SEARCH BAR (Matches FAQ Inner Page Nav) */}
        {/* ============================================================ */}
        {/* Anchor element — sticky bar detects its position relative to this */}
        <div ref={navRef as React.RefObject<HTMLDivElement>} className="h-0" />

        <nav
          id="blog-filter-nav"
          aria-label="Blog Search and Category Filter"
          style={{ top: "var(--site-navbar-height, 75px)" }}
          className={`sticky z-40 bg-[#081B3E]/95 backdrop-blur-md border-b border-white/[0.08] select-none transition-all duration-300 ${
            isSticky
              ? "shadow-[0_12px_32px_rgba(4,14,35,0.7)]"
              : "shadow-lg shadow-[#081B3E]/20"
          } ${
            isHidden
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
        >
          {/* Amber accent ribbon — matches FAQ/AI-GCC subnav */}
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
            {/* Search left */}
            <div className="relative w-full md:w-72 lg:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="blog-search-input"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-1.5 sm:py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/15 focus:border-[#00A3E0] text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00A3E0] transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category pills right */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 justify-start md:justify-end">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`blog-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 font-manrope ${
                      isActive
                        ? "bg-[#008EC4] text-white shadow-sm shadow-[#008EC4]/30 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.08] font-medium"
                    }`}
                  >
                    {cat}
                    {cat === "All" && (
                      <span
                        className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                        }`}
                      >
                        {blogPosts.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ============================================================ */}
        {/* 3. EDITORIAL PROMISE (Point of View Design - matches About) */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5">
              OUR EDITORIAL PROMISE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.2] mb-4">
              No thought-leadership fluff.{" "}
              <span className="text-[#505D74] font-normal block sm:inline mt-2 sm:mt-0">
                Every piece is grounded in real patterns we see in GCC strategy, AI adoption, and enterprise transformation.
              </span>
            </h2>
            <div className="w-16 h-1 bg-amber-300 mx-auto rounded-full mt-6" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. FEATURED POST */}
        {/* ============================================================ */}
        {showFeatured && (
          <section className="px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="max-w-7xl mx-auto">
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group block bg-white rounded-none border border-[#D2DCF0] shadow-xs hover:border-[#00A3E0]/40 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-8 sm:p-12 lg:p-14">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className={`text-xs px-3 py-1 rounded-full border font-mono font-bold ${getCategoryColor(
                        featuredPost.category
                      )}`}
                    >
                      {featuredPost.category}
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#169DC8] bg-[#169DC8]/10 px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-manrope font-extrabold text-[#0D306C] group-hover:text-[#008EC4] transition-colors leading-[1.15] mb-5 max-w-4xl tracking-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-[#505D74] text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[#D2DCF0]/60 text-xs sm:text-sm text-[#505D74]">
                    <div className="flex items-center gap-4">
                      <span>{featuredPost.date}</span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#008EC4]" />{" "}
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 font-manrope font-bold text-[#008EC4] group-hover:translate-x-1 transition-all">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* 5. ARTICLES GRID */}
        {/* ============================================================ */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E2EDF5] shadow-sm p-10">
                <p className="text-[#505D74] text-lg font-medium">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D306C] text-white font-manrope font-bold text-sm hover:bg-[#169DC8] transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {remainingPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group relative overflow-hidden rounded-none bg-white border border-[#D5E1F2] p-6 sm:p-7 shadow-[0_2px_12px_rgba(13,48,108,0.03)] hover:shadow-[0_12px_32px_rgba(13,48,108,0.08)] hover:border-[#1351D8]/40 transition-all duration-300 flex flex-col justify-between text-left h-full"
                  >
                    <div>
                      {/* Icon on the left, category + read time on the right */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-[#0D306C] stroke-[1.8] shrink-0 transition-transform duration-300 group-hover:scale-105" />
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <span
                            className={`text-[11px] px-2 py-0.5 border font-mono font-bold ${getCategoryColor(post.category)}`}
                          >
                            {post.category}
                          </span>
                          <span className="text-[11px] font-mono text-[#7B8B9E] flex items-center gap-1">
                            <Clock className="w-3 h-3" />{post.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Title — clamped to two lines */}
                      <h3 className="text-base sm:text-[17px] font-bold text-[#0D244D] tracking-tight mb-2.5 leading-snug group-hover:text-[#1351D8] transition-colors line-clamp-2 min-h-[2.75em]">
                        {post.title}
                      </h3>

                      {/* Excerpt — clamped to three lines */}
                      <p className="text-xs sm:text-[13.5px] text-[#505D74] leading-relaxed line-clamp-3 min-h-[4.875em] font-normal">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer link — matches CapabilitiesSection navigation links */}
                    <div className="pt-5 mt-auto flex flex-col space-y-2">
                      <span className="text-[11px] text-[#7B8B9E] mb-1 truncate">{post.date}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1351D8] group-hover:text-[#0D244D] transition-colors">
                        Read article
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. TOPIC CLUSTERS */}
        {/* ============================================================ */}
        <section
          ref={topicClusterRef as React.RefObject<HTMLElement>}
          id="topic-clusters"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
        >
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="TOPIC CLUSTERS"
              title="Five Pillars of Enterprise Insights"
              description="Our content is organized into five interconnected clusters designed to support enterprise buyers at every stage of the GCC journey."
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <FiveCardHeroGrid
              items={topicClusters.map((cluster, index) => ({
                n: String(index + 1).padStart(2, "0"),
                title: cluster.title,
                body: cluster.desc,
                keywords: cluster.keywords,
              }))}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6b. LET'S START A CONVERSATION (Callout CTA design) */}
        {/* ============================================================ */}
        <section className="relative py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-center select-none">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-4 sm:mb-5">
              <MessageSquare className="w-10 h-10 text-[#2B3D66] stroke-[1.8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0D306C] tracking-tight leading-[1.18] mb-4 sm:mb-5 font-manrope">
              Let&apos;s start a conversation.
            </h2>

            <p className="text-[#505D74] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-normal font-sans">
              If your leadership team is evaluating a GCC, AI strategy, or talent plan in India, we can help you move from concept to execution.
            </p>

            <Link
              to="/book-a-call"
              className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-full bg-[#2A2B68] hover:bg-[#1E1F4B] text-white text-sm sm:text-base font-bold font-manrope tracking-tight transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Speak to a GCC Advisor</span>
            </Link>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        {/* ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="INSIGHTS FAQS"
              title="Frequently asked questions"
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white rounded-2xl border border-[#D2DCF0] shadow-xs hover:border-[#00A3E0]/40 transition-all overflow-hidden"
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
        {/* 8. LET'S BUILD TOGETHER (AI GCC consultation section) */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />

      </main>

      <Footer />
    </div>
  );
}
