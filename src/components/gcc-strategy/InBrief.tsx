import type { ReactNode } from "react";

interface InBriefProps {
  children: ReactNode;
  label?: string;
  id?: string;
}

/**
 * The page's own answer to its primary question, 50-100 words, placed about
 * a fifth of the way down the page. Written with concrete nouns so it stands
 * on its own when extracted.
 */
export default function InBrief({ children, label = "In brief", id = "in-brief" }: InBriefProps) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
      <div className="max-w-6xl mx-auto rounded-2xl border border-[#0a93bd]/25 bg-[#0a93bd]/[0.04] p-6 md:p-8">
        <p id={`${id}-label`} className="text-2xs uppercase tracking-[0.16em] text-[#0a6f8e] mb-3">{label}</p>
        <p className="text-heading text-base md:text-lg leading-relaxed">{children}</p>
      </div>
    </section>
  );
}
