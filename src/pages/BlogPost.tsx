"use client";

import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Image from "next/image";
import { ArrowLeft, Clock, ArrowRight, ChevronRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Consultation from "@/features/home/components/Consultation";
import ConnectedEcosystem from "@/components/shared/ConnectedEcosystem";
import { blogPosts, getCategoryColor } from "@/data/blogPosts";
import { withInternalLinkTitles } from "@/lib/internal-link-titles";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.seoTitle} | NeoIntelli`;
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  // Splits a pipe-delimited row into trimmed cells: | a | b | -> ["a", "b"]
  const splitRow = (row: string) =>
    row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());

  // Markdown-lite for post bodies
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let key = 0;
    let i = 0;
    let isDropCapPending = true;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === "") {
        i++;
        continue;
      }

      if (trimmed.startsWith("|")) {
        const rows: string[][] = [];
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          const cells = splitRow(lines[i]);
          if (!cells.every((cell) => /^:?-{2,}:?$/.test(cell))) rows.push(cells);
          i++;
        }
        if (rows.length > 0) {
          const [head, ...body] = rows;
          elements.push(
            <div key={key++} className="mb-8 overflow-x-auto rounded-2xl border border-[#D2DCF0] bg-white shadow-[0_4px_24px_rgba(13,48,108,0.05)] max-w-6xl mx-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="bg-[#0D244D] text-white">
                  <tr>
                    {head.map((cell, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="p-4 sm:p-5 font-bold text-xs sm:text-[13px] tracking-wide uppercase font-mono align-middle first:rounded-tl-2xl last:rounded-tr-2xl"
                        dangerouslySetInnerHTML={{ __html: withInternalLinkTitles(cell) }}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D2DCF0]/60">
                  {body.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`transition-colors hover:bg-[#F0F6FC] ${rowIndex % 2 === 0 ? "bg-white" : "bg-[#F7FAFD]"}`}
                    >
                      {row.map((cell, cellIndex) =>
                        cellIndex === 0 ? (
                          <th
                            key={cellIndex}
                            scope="row"
                            className="p-4 sm:p-5 text-[#0D306C] font-bold text-xs sm:text-[13.5px] align-middle"
                            dangerouslySetInnerHTML={{ __html: withInternalLinkTitles(cell) }}
                          />
                        ) : (
                          <td
                            key={cellIndex}
                            className="p-4 sm:p-5 text-[#505D74] text-xs sm:text-[13px] leading-relaxed align-middle font-normal"
                            dangerouslySetInnerHTML={{ __html: withInternalLinkTitles(cell) }}
                          />
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      if (/^\d+\.\s/.test(trimmed) || trimmed.startsWith("- ")) {
        const ordered = /^\d+\.\s/.test(trimmed);
        const items: string[] = [];
        while (i < lines.length) {
          const item = lines[i].trim();
          const matchesOrdered = /^\d+\.\s/.test(item);
          const matchesBullet = item.startsWith("- ");
          if (ordered ? !matchesOrdered : !matchesBullet) break;
          items.push(item.replace(ordered ? /^\d+\.\s+/ : /^-\s+/, ""));
          i++;
        }
        const listItems = items.map((item, index) => (
          <li
            key={index}
            className="text-base sm:text-[17px] leading-[1.75] text-[#415A77] pl-1 font-normal"
            dangerouslySetInnerHTML={{ __html: withInternalLinkTitles(item) }}
          />
        ));
        elements.push(
          ordered ? (
            <ol key={key++} className="mb-6 space-y-2.5 pl-6 list-decimal marker:text-[#008EC4] marker:font-bold">
              {listItems}
            </ol>
          ) : (
            <ul key={key++} className="mb-6 space-y-2.5 pl-6 list-disc marker:text-[#008EC4]">
              {listItems}
            </ul>
          )
        );
        continue;
      }

      if (trimmed.startsWith("###")) {
        elements.push(
          <h3 key={key++} className="text-xl sm:text-2xl font-manrope font-extrabold text-[#0D306C] mt-10 mb-4 tracking-tight leading-snug">
            {trimmed.replace(/^#{3}\s*/, "")}
          </h3>
        );
        i++;
        continue;
      }

      if (trimmed.startsWith("##")) {
        elements.push(
          <h2 key={key++} className="text-2xl sm:text-3xl font-manrope font-extrabold text-[#0D306C] mt-14 mb-5 tracking-tight leading-tight">
            {trimmed.replace(/^#{2}\s*/, "")}
          </h2>
        );
        i++;
        continue;
      }

      const dropCap = isDropCapPending;
      isDropCapPending = false;
      elements.push(
        <p
          key={key++}
          className={`text-base sm:text-[17px] leading-[1.8] text-[#415A77] mb-6 font-normal font-sans${dropCap ? " drop-cap-amber" : ""}`}
          dangerouslySetInnerHTML={{ __html: withInternalLinkTitles(line) }}
        />
      );
      i++;
    }
    return elements;
  };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar appearance="dark" />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="post-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="Post Hero"
        >
          {/* Executive Background Overlay */}
          <div className="absolute inset-0 w-full h-full z-0">
            {/* Mobile artwork */}
            <div className="md:hidden absolute inset-0">
              <Image
                src="/hero/hero-half-viewport-mobile.webp"
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
                src="/hero/hero-half-viewport.webp"
              alt={post.title}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-right"
            />
            </div>
            {/* Soft responsive gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#012048]/95 via-[#012048]/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            {/* Back link & breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Link
                    to="/blog"
                    className="text-[#38BDF8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="font-medium text-slate-200">
                    {post.category}
                  </span>
                </li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className={`text-xs px-3 py-1 rounded-full border font-mono font-bold ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8] bg-white/10 px-2.5 py-1 rounded-full">
                {post.intent}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold font-manrope text-white tracking-[-0.035em] leading-[1.12] mb-5 text-left"
            >
              {post.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal font-sans mb-8 text-left max-w-3xl"
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 pt-6 border-t border-white/15"
            >
              <span>{post.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#38BDF8]" /> {post.readTime}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. ARTICLE BODY CONTENT */}
        {/* ============================================================ */}
        <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14 bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            {renderContent(post.content)}
          </motion.div>
        </article>

        {/* ============================================================ */}
        {/* 3. PREVIOUS / NEXT ARTICLE */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-6">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="group flex-1 min-w-0">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#008EC4] mb-1.5 flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </span>
                <span className="block font-manrope font-extrabold text-base sm:text-lg text-[#0D306C] group-hover:text-[#008EC4] transition-colors leading-snug line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <span className="flex-1" />
            )}
            {nextPost ? (
              <Link to={`/blog/${nextPost.slug}`} className="group flex-1 min-w-0 sm:text-right">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#008EC4] mb-1.5 flex items-center gap-1.5 sm:justify-end">
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="block font-manrope font-extrabold text-base sm:text-lg text-[#0D306C] group-hover:text-[#008EC4] transition-colors leading-snug line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <span className="flex-1" />
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. EXPLORE MORE (Connected Ecosystem design) */}
        {/* ============================================================ */}
        {relatedPosts.length > 0 && (
          <ConnectedEcosystem
            title={`More in ${post.category}`}
            hideConsultation
            cards={relatedPosts.map((related) => ({
              path: `/blog/${related.slug}`,
              name: related.title,
              summary: related.excerpt,
              anchor: "Read article",
              icon: FileText,
            }))}
          />
        )}

        {/* ============================================================ */}
        {/* 5. LET'S BUILD TOGETHER (no wave — the ecosystem above provides it) */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} hideWaveDivider={true} />
      </main>

      <Footer />
    </div>
  );
}
