/**
 * /lp/gcc-playbook - the NeoIntelli GCC Decision Lab.
 *
 * A short hero, the workspace opening in place, three steps explaining how the
 * model works, the practitioner approach, a compact FAQ and one contextual
 * review CTA. Deliberately not thirteen full-height sections: the interactive
 * part is the product, and the copy around it is there to make the product
 * legible rather than to fill a scroll.
 *
 * The page is indexable and carries its own canonical (see ROUTE_SEO in
 * src/lib/seo.ts). It does not compete with /gcc-cost-calculator: that page
 * answers "what does a team cost", this one answers "should we do this at
 * all", and both run on the same engine so they cannot disagree on the first
 * question.
 */

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers3, Plus, Users, ChartNoAxesCombined, SlidersHorizontal, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LabWorkspace from "@/components/gcc-lab/LabWorkspace";
import { trackEvent } from "@/lib/analytics";
import styles from "./GccPlaybook.module.css";
import { GCC_PLAYBOOK_FAQS, GCC_PLAYBOOK_GLOSSARY } from "@/data/gccPlaybook";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Design the team",
    body: "Start from a template, build your own rows, or answer a few questions and get a proposal you can accept or reject. Every seat carries a role, a seniority, an FTE and a start month, so the model prices a ramp rather than a headcount.",
  },
  {
    step: "02",
    title: "See the whole cost, and the gaps",
    body: "Compensation, statutory overhead, workspace, IT, fees and compute - each with what it is charged on and where the figure came from. Anything NeoIntelli has no approved figure for is shown as not budgeted rather than as zero.",
  },
  {
    step: "03",
    title: "Test it against something real",
    body: "Tell the model what the same scope costs you today and it produces a monthly comparison, a payback month and a set of stress tests. Without that, it says savings are unavailable instead of inventing them.",
  },
];


export default function GccPlaybook() {
  const workspaceRef = useRef<HTMLDivElement>(null);

  const scrollToWorkspace = (location: string) => {
    trackEvent("cta_click", { location });
    workspaceRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    // Focus follows the scroll, so keyboard and screen-reader users land where
    // sighted users do rather than at the top of the page.
    workspaceRef.current?.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="no-print"><Navbar appearance="light" /></div>
      <main className={styles.page}>
        <section className={`${styles.hero} no-print`}>
          <div className={styles.heroInner}>
            <div className={styles.heroMark} aria-hidden><Layers3 strokeWidth={1.25} /></div>
            <p className={styles.eyebrow}>NeoIntelli GCC Decision Lab</p>
            <h1 className={styles.title}>Build the business case<br className={styles.desktopBreak} /> for your <span>AI GCC in India.</span></h1>
            <p className={styles.lede}>Design your team, model the full cost, compare locations and identify what needs to be in place before you launch.</p>
            <p className={styles.audience}>For AI, data and product teams building from the US, UK and Europe.</p>
            <div className={styles.heroActions}>
              <button type="button" onClick={() => scrollToWorkspace("lab_hero_primary")} className={styles.primaryButton}>
                Calculate My GCC Cost <ArrowRight aria-hidden size={17} />
              </button>
              <button type="button" onClick={() => scrollToWorkspace("lab_hero_secondary")} className={styles.secondaryButton}>
                Help Me Design My Team <ArrowUpRight aria-hidden size={17} />
              </button>
            </div>
            <p className={styles.assurance}>No signup to explore · Editable assumptions · Downloadable results</p>
          </div>
        </section>

        <section ref={workspaceRef} id="workspace" className={styles.workspace}>
          <LabWorkspace />
        </section>

        <section className={`${styles.method} no-print`}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>How this model works</h2>
            <div className={styles.steps}>
              {HOW_IT_WORKS.map((item, index) => {
                const Icon = [Users, ChartNoAxesCombined, SlidersHorizontal][index];
                return (
                  <div key={item.step} className={styles.step}>
                    <div className={styles.stepTop}><Icon aria-hidden strokeWidth={1.5} /><span aria-hidden>{item.step}</span></div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.practitioner}>
              <div><ShieldCheck aria-hidden className={styles.practitionerIcon} strokeWidth={1.3} /><h2>Who is behind<br /> the numbers</h2></div>
              <div>
                <p>NeoIntelli builds and runs AI capability centres in India from a base in Bengaluru. The compensation bands,
                  operating assumptions and team shapes in this workspace come from that delivery experience - which is why they
                  are labelled as planning assumptions rather than as market data.</p>
                <p>Nothing here is reviewed until a practitioner reviews it. When you ask for a review, a person reads the case you
                  built - the assumptions you changed and the questions still open - and tells you what they would do differently.</p>
                <Link href="/about" className={styles.textLink} onClick={() => trackEvent("cta_click", { location: "lab_practitioner_about" })}>
                  More about how we work <ArrowUpRight aria-hidden size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.faq} no-print`}>
          <div className={styles.faqInner}>
            <h2 className={styles.sectionTitle}>Questions people<br /> actually ask</h2>
            <div className={styles.questions}>
              {GCC_PLAYBOOK_FAQS.map((faq, index) => (
                <details key={faq.q} className={styles.question} open={index === 0}>
                  <summary>{faq.q}<Plus aria-hidden size={20} /></summary>
                  <p>{faq.a}</p>
                </details>
              ))}
              <details className={styles.glossary}>
                <summary>Glossary: the words this workspace uses, and what they mean <Plus aria-hidden size={20} /></summary>
                <dl>{GCC_PLAYBOOK_GLOSSARY.map((entry) => (
                  <div key={entry.term}><dt>{entry.term}</dt><dd>{entry.definition}</dd></div>
                ))}</dl>
              </details>
              <div className={styles.resources}>
                <Link href="/gcc-cost-calculator">The standalone cost calculator <ArrowUpRight aria-hidden size={14} /></Link>
                <Link href="/gcc-readiness-assessment">GCC readiness assessment <ArrowUpRight aria-hidden size={14} /></Link>
                <Link href="/services/gcc/location-strategy">India location strategy <ArrowUpRight aria-hidden size={14} /></Link>
                <Link href="/gcc-faq">Full GCC FAQ <ArrowUpRight aria-hidden size={14} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.review} no-print`}>
          <div className={styles.reviewInner}>
            <h2>Want someone<br /> to check it?</h2>
            <div>
              <p>Build the case first, then ask for a review from inside the Decision pack area. A practitioner sees the assumptions
                you changed and the questions still open, not just the headline figure.</p>
              <button type="button" onClick={() => scrollToWorkspace("lab_footer_cta")} className={styles.primaryButton}>
                Back to the workspace <ArrowRight aria-hidden size={17} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <div className="no-print"><Footer /></div>
    </div>
  );
}
