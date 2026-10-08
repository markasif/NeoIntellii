import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, Globe2, MapPin } from "lucide-react";
import { CAL_BOOKING_URL } from "@/lib/constants";
import { activeLenis } from "@/components/animations/SmoothScroll";
import SquadForm from "@/components/landing/india-engineering-squad/SquadForm";
import TeamBlueprintDesigner from "@/components/landing/india-engineering-squad/TeamBlueprintDesigner";
import LandingHeader from "@/components/landing/india-engineering-squad/LandingHeader";
import LeaderCard from "@/components/landing/india-engineering-squad/LeaderCard";
import LeaderProfile from "@/components/landing/india-engineering-squad/LeaderProfile";
import LeaderPortrait from "@/components/landing/india-engineering-squad/LeaderPortrait";
import Chip from "@/components/landing/india-engineering-squad/Chip";
import Accordion from "@/components/landing/india-engineering-squad/Accordion";
import { LEADERS, leaderById } from "@/components/landing/india-engineering-squad/leadership";
import {
  AI_HIRING_PROBLEMS,
  AUDIENCE_CARDS,
  BRIDGE_GROUPS,
  DILIGENCE_CARDS,
  EVALUATION_COLUMNS,
  FAQS,
  HERO_CAPABILITIES,
  HERO_TRUST,
  HIRING_STAGES,
  JOURNEY,
  PROPOSAL_CONTENTS,
  REGIONS,
  SCENARIOS,
  SQUAD_SHAPES,
  STACK_GROUPS,
  TIMELINE,
  WE_HANDLE,
  WHY_NEOINTELLI,
  YOU_CONTROL,
} from "@/components/landing/india-engineering-squad/content";
import {
  trackCalendarOpen,
  trackCta,
  useScrollDepth,
  useSectionView,
} from "@/components/landing/india-engineering-squad/tracking";
import {
  BODY,
  BODY_DARK,
  BODY_LG,
  BTN_GHOST_DARK,
  BTN_ON_DARK,
  BTN_PRIMARY,
  CARD_LABEL,
  EYEBROW,
  H2,
  H2_DARK,
  H3,
  MUTED,
  PANEL,
  PANEL_ACCENT,
  PANEL_DARK,
  PANEL_TINT,
} from "@/components/landing/india-engineering-squad/theme";

/**
 * /lp/india-engineering-squad
 *
 * The proposition: an AI-first startup in the US, UK or Europe builds the
 * engineering team behind its product in India, across AI/ML, backend, data,
 * full stack, MLOps and cloud, while keeping every hiring, product and
 * technical decision.
 *
 * AI-first does not mean every engineer is an AI engineer. Almost every AI
 * product needs a mixed team, and the page is written to show that NeoIntelli
 * understands how to build that mix rather than to sell "AI developers".
 *
 * Two rules shape the page. First, no commercial detail is public: no rates, no
 * salary examples, no fee structure, no percentages. Commercials are discussed
 * privately after role calibration, and the page says so. The "Design your
 * team" section is the one place that leads to numbers, and it still holds the
 * line: it designs a team shape here and hands it to /gcc-cost-calculator in a
 * new tab, where the public ranges already live. Second,
 * nothing is claimed that cannot be stood behind: no testimonials, no logos, no
 * case studies, no invented metrics or certifications, and no technical
 * capability NeoIntelli cannot genuinely evaluate.
 *
 * Copy lives in ./content.ts and leadership copy in ./leadership.ts, so this
 * file stays the layout. Each of the three named leaders appears twice, as a
 * compact card near the top and a long profile further down, reading from the
 * same record.
 */

const FORM_ANCHOR = "squad-form";

/** Who the page is written for. Stated plainly rather than left to inference. */
const GEOGRAPHIES = ["United States", "United Kingdom", "Europe", "Global startup markets"];

const STAGES = ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Selectively Series B"];

/* ------------------------------------------------------------- helpers --- */

/** Smooth-scrolls to a section id, through Lenis when it is running. */
const scrollToId = (id: string) => {
  if (typeof document === "undefined") return;
  if (id === "top") {
    if (activeLenis) activeLenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(id);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - 88;
  if (activeLenis) activeLenis.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
};

const goToForm = (location: string) => {
  trackCta(location);
  scrollToId(FORM_ANCHOR);
};

const KARTHICK = leaderById("karthick-raju");

export default function IndiaEngineeringSquad() {
  const [scrolled, setScrolled] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useScrollDepth();
  const evaluationRef = useSectionView("ai_evaluation");
  const howItWorksRef = useSectionView("how_it_works");
  const securityRef = useSectionView("security_section");
  const journeyRef = useSectionView("start_scale_own");
  const designRef = useSectionView("design_your_team");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setShowStickyBar(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-white">
      {/* 1 - Minimal header */}
      <LandingHeader onNavigate={scrollToId} scrolled={scrolled} hideMobileCta={showStickyBar} />

      {/* 2 - AI-first hero */}
      <section className="relative overflow-hidden bg-white px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-20 lg:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[460px] bg-[linear-gradient(180deg,#f5f8fd_0%,#ffffff_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[460px] opacity-[0.55] [background-image:linear-gradient(rgba(31,95,208,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(31,95,208,0.05)_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`${EYEBROW} mb-5 text-[#1f5fd0]`}>
            For AI-first startups &middot; US &middot; UK &middot; Europe
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-[-0.035em] text-[#101c4a] md:text-7xl">
            Build or expand the engineering team behind your AI product.
          </h1>
          <p className="mx-auto mb-4 max-w-3xl text-base leading-relaxed text-[#2a3556] md:text-xl">
            From first MVP to a growing AI platform, build a dedicated India engineering team across AI/ML, GenAI,
            data, backend, full stack, MLOps and cloud.
          </p>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-[#5d6a8a] md:text-base">
            NeoIntelli helps you find, technically validate and employ the right engineers in India while you retain
            every hiring, product and technical decision.
          </p>

          <ul className="mx-auto mb-9 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {HERO_CAPABILITIES.map((capability) => (
              <Chip key={capability}>{capability}</Chip>
            ))}
          </ul>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button type="button" onClick={() => goToForm("hero_build_ai_team")} className={BTN_PRIMARY}>
              Build or Expand My AI Team <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCalendarOpen("hero_talk_to_advisor")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.06] bg-white px-7 py-3.5 text-sm font-semibold text-[#101c4a] transition-colors hover:border-[#1f5fd0]/40 hover:text-[#1f5fd0]"
            >
              Talk to an AI Engineering Advisor
            </a>
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl gap-x-6 gap-y-3 border-t border-[#dde7f7] pt-8 text-left sm:grid-cols-2">
            {HERO_TRUST.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-[#2a3556]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 - Built for AI-first product companies */}
      <section id="built-for" className="scroll-mt-20 bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Built for AI-first product companies</p>
          <h2 className={`${H2} mb-5 max-w-4xl`}>
            If AI is part of your product, your engineering team needs more than an &ldquo;AI developer.&rdquo;
          </h2>
          <p className={`${BODY_LG} mb-10 max-w-3xl`}>
            AI products are built by multidisciplinary teams. The right squad may combine AI/ML specialists with
            backend, data, full-stack, platform and cloud engineers.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE_CARDS.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL} p-6 md:p-7`}>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-base font-bold leading-snug text-[#101c4a]">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </div>
            ))}

            <div className={`${PANEL_TINT} p-6 md:p-7`}>
              <p className={`${CARD_LABEL} mb-4`}>Where our clients are</p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {GEOGRAPHIES.map((place) => (
                  <Chip key={place}>{place}</Chip>
                ))}
              </ul>
              <p className={`${CARD_LABEL} mb-4`}>Stage we work with</p>
              <ul className="flex flex-wrap gap-2">
                {STAGES.map((stage) => (
                  <Chip key={stage}>{stage}</Chip>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 rounded-2xl bg-[#0a1533] px-6 py-6 text-lg font-bold tracking-[-0.02em] text-white md:px-9 md:py-7 md:text-xl">
            We build the engineering team around the product you are actually trying to ship.
          </p>
        </div>
      </section>

      {/* 4 - Early leadership and accountability */}
      <section id="leadership" className="scroll-mt-20 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>The people behind your India team</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>Senior leadership stays accountable.</h2>
          <p className={`${BODY_LG} mb-6 max-w-3xl`}>
            AI engineering teams are difficult to hire well because job titles often hide very different levels of
            technical depth. The engagement combines executive, technical and people leadership so the first team is
            calibrated around the product, not around generic r&eacute;sum&eacute;s.
          </p>
          <p className="mb-10 text-base font-semibold leading-snug text-[#101c4a] md:text-lg">
            The people you meet before signing remain accountable after signing.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {LEADERS.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-[#0a1533] p-6 md:p-7">
            <h3 className="mb-8 text-xl font-bold tracking-[-0.02em] text-white md:text-3xl">
              Three responsibilities. One accountable team.
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {LEADERS.map((leader) => (
                <div key={leader.id} className={`${PANEL_DARK} p-5`}>
                  <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.16em] text-[#f97316]">
                    {leader.lane}
                  </p>
                  <p className="mb-1.5 text-base font-bold text-white">{leader.name}</p>
                  <p className="text-xs leading-relaxed text-[#93a6cd]">{leader.laneSummary}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-[#c2d2ee] md:text-base">
              You aren&apos;t buying r&eacute;sum&eacute;s from NeoIntelli. You&apos;re getting an operating team
              behind the engineering team you&apos;re building.
            </p>
          </div>
        </div>
      </section>

      {/* 5 - Hiring for AI products is different */}
      <section className="bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>What actually makes this hard</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>Hiring for AI products is different.</h2>
          <p className={`${BODY_LG} mb-10 max-w-3xl`}>
            The challenge isn&apos;t finding people with AI keywords on their r&eacute;sum&eacute;. It&apos;s
            identifying engineers who can build production systems around models, data and software.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {AI_HIRING_PROBLEMS.map(({ title, body }) => (
              <div key={title} className={`${PANEL} p-6 md:p-7`}>
                <h3 className="mb-2.5 text-base font-bold leading-snug text-[#101c4a]">{title}</h3>
                <p className={BODY}>{body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-2xl bg-[#0a1533] px-6 py-6 text-lg font-bold tracking-[-0.02em] text-white md:px-9 md:py-7 md:text-xl">
            NeoIntelli combines technical calibration with the India operating layer required to build the team
            properly.
          </p>
        </div>
      </section>

      {/* 6 - We evaluate AI engineers differently */}
      <section
        id="evaluation"
        ref={evaluationRef}
        className="scroll-mt-20 px-5 py-16 sm:px-8 md:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Technical evaluation</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>We evaluate AI engineers differently.</h2>
          <p className={`${BODY_LG} mb-10 max-w-3xl`}>
            AI hiring should not be reduced to framework keywords. Evaluation should reflect the type of AI product the
            engineer will actually build.
          </p>

          <div className="grid gap-4 lg:grid-cols-2">
            {EVALUATION_COLUMNS.map(({ title, note, areas }, index) => (
              <div key={title} className={`${index === 0 ? PANEL_ACCENT : PANEL} p-6 md:p-8`}>
                <h3 className={`${H3} mb-1.5`}>{title}</h3>
                <p className={`${MUTED} mb-5`}>{note}</p>
                <ul className="flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <Chip key={area}>{area}</Chip>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-2xl bg-[#0a1533] px-6 py-6 text-lg font-bold tracking-[-0.02em] text-white md:px-9 md:py-7 md:text-xl">
            The interview bar should follow the product architecture, not the job title.
          </p>
        </div>
      </section>

      {/* 7 - AI and engineering capability stack */}
      <section className="bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Capability stack</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>We hire against the stack you&apos;re actually building.</h2>
          <p className={`${BODY_LG} mb-10 max-w-3xl`}>
            Everything here sits around one job: getting an AI product into production and keeping it there. The exact
            technical evaluation changes based on your architecture, maturity and product requirements.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {STACK_GROUPS.map(({ icon: Icon, title, lanes }) => (
              <div key={title} className={`${PANEL} p-6 md:p-7`}>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-5 text-base font-bold leading-snug text-[#101c4a]">{title}</h3>

                <div className="space-y-4">
                  {lanes.map(({ label, items }) => (
                    <div key={label}>
                      <p className={`${CARD_LABEL} mb-2.5`}>{label}</p>
                      <ul className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip key={item}>{item}</Chip>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-2xl bg-[#0a1533] px-6 py-6 text-lg font-bold tracking-[-0.02em] text-white md:px-9 md:py-7 md:text-xl">
            Your architecture decides which of these matter. We calibrate the evaluation to it, not to a checklist.
          </p>
        </div>
      </section>

      {/* 8 - Example AI-first squad shapes */}
      <section id="squads" className="scroll-mt-20 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Squad shapes</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>Build the squad around the product.</h2>
          <p className={`${BODY_LG} mb-10 max-w-3xl`}>
            Different AI products require different engineering mixes. These are examples of team shapes, not fixed
            packages.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {SQUAD_SHAPES.map(({ title, roles, body }) => (
              <div key={title} className={`${PANEL} flex h-full flex-col p-6 md:p-7`}>
                <h3 className={`${H3} mb-5`}>{title}</h3>
                <ul className="mb-5 space-y-2.5 border-y border-[#eef3fb] py-5">
                  {roles.map((role) => (
                    <li
                      key={role}
                      className="flex items-start gap-2.5 text-sm font-medium leading-snug text-[#101c4a]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]" aria-hidden="true" />
                      {role}
                    </li>
                  ))}
                </ul>
                <p className={`${BODY} mt-auto text-sm`}>{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-5 rounded-2xl bg-[#0a1533] px-6 py-7 md:flex-row md:items-center md:justify-between md:px-9">
            <p className="text-lg font-bold tracking-[-0.02em] text-white md:max-w-xl md:text-xl">
              Need a different mix? We calibrate roles against your architecture before sourcing begins.
            </p>
            <button type="button" onClick={() => goToForm("squads_design")} className={`${BTN_ON_DARK} shrink-0`}>
              Design My AI Engineering Squad <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/*
        8b - Design your team: the bridge into /gcc-cost-calculator.

        Its own band rather than the page's white/tint alternation. This is the
        one interactive module outside the form, and the section that follows is
        tinted too, so a flat tint would run the two together.
      */}
      <section
        id="design-your-team"
        ref={designRef}
        className="scroll-mt-20 border-y border-[#dde7f7] bg-[linear-gradient(180deg,#eaf1fc_0%,#f5f8fd_55%,#f3f6fc_100%)] px-5 py-16 sm:px-8 md:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Design your team</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>What would your 8 to 10 person India team look like?</h2>
          <p className={`${BODY_LG} mb-10 max-w-3xl`}>
            Build the team you actually need, then take it straight into our India cost calculator - city by city,
            seniority by seniority, operating model by operating model.
          </p>

          <TeamBlueprintDesigner />
        </div>
      </section>

      {/* 9 - You control / NeoIntelli handles */}
      <section className="bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>The division of responsibility</p>
          <h2 className={`${H2} mb-10 max-w-3xl`}>
            It is your engineering team. We operate the India layer around it.
          </h2>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className={`${PANEL_ACCENT} p-6 md:p-8`}>
              <p className="mb-5 text-2xs font-semibold uppercase tracking-[0.16em] text-[#f97316]">You control</p>
              <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {YOU_CONTROL.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-[#101c4a]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${PANEL} p-6 md:p-8`}>
              <p className={`${CARD_LABEL} mb-5`}>NeoIntelli handles</p>
              <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {WE_HANDLE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-[#2a3556]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1f5fd0]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 rounded-2xl bg-[#0a1533] px-6 py-6 text-lg font-bold tracking-[-0.02em] text-white md:px-9 md:py-7 md:text-xl">
            We don&apos;t run your product team for you. We make it possible for you to operate one in India.
          </p>
        </div>
      </section>

      {/* 10 - Hiring process */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="scroll-mt-20 px-5 py-16 sm:px-8 md:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>How it works</p>
          <h2 className={`${H2} mb-4 max-w-3xl`}>Every engineer earns the right to reach your calendar.</h2>
          <p className={`${BODY_LG} mb-10 max-w-2xl`}>
            Your time should be spent evaluating credible finalists, not discovering whether a candidate understands
            the fundamentals.
          </p>

          <ol className="space-y-4">
            {HIRING_STAGES.map(({ number, title, body, extra }) => (
              <li key={number} className={`${PANEL} p-6 md:p-7`}>
                <div className="grid gap-4 md:grid-cols-[64px_minmax(0,1fr)] md:gap-6">
                  <p className="text-3xl font-bold leading-none tracking-[-0.03em] text-[#dde7f7] md:text-5xl">
                    {number}
                  </p>
                  <div>
                    <h3 className={`${H3} mb-2`}>{title}</h3>
                    <p className={BODY}>{body}</p>

                    {extra === "neohirex" ? (
                      <p className="mt-4 inline-flex items-center gap-2.5 rounded-xl border border-[#dde7f7] bg-[#f7fafe] px-3.5 py-2.5">
                        <img
                          src="/images/neohirex-logo.svg"
                          alt="NeoHireX"
                          width={84}
                          height={18}
                          loading="lazy"
                          decoding="async"
                          className="h-[18px] w-auto"
                        />
                        <span className="text-2xs text-[#5d6a8a]">NeoIntelli&apos;s in-house hiring platform</span>
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 11 - Hiring timeline */}
      <section className="bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Timeline</p>
          <h2 className={`${H2} mb-10 max-w-3xl`}>
            See validated candidates early. Build the team around real notice periods.
          </h2>

          <ol className="grid gap-4 md:grid-cols-4">
            {TIMELINE.map(({ marker, title, body }) => (
              <li key={marker} className={`${PANEL} p-6`}>
                <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.16em] text-[#f97316]">{marker}</p>
                <span aria-hidden="true" className="mb-4 block h-px w-full bg-[#dde7f7]" />
                <h3 className="mb-2 text-sm font-bold leading-snug text-[#101c4a]">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </li>
            ))}
          </ol>

          <p className={`${PANEL} mt-4 flex items-start gap-2.5 p-5 text-sm leading-relaxed text-[#2a3556]`}>
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]" aria-hidden="true" />
            India notice periods commonly affect joining dates. We begin sourcing immediately so hiring and notice
            periods run in parallel wherever possible.
          </p>
          <p className={`${MUTED} mt-3`}>
            Full-squad joining time varies by role, seniority and candidate notice periods.
          </p>
        </div>
      </section>

      {/* 12 - AI and engineering leadership bridge */}
      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>AI &amp; engineering leadership bridge</p>
          <h2 className={`${H2} mb-4 max-w-3xl`}>AI and engineering guidance while your India team takes shape.</h2>
          <p className={`${BODY_LG} mb-10 max-w-2xl`}>
            Your first AI engineers should not have to figure out the technical operating model alone.
          </p>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-10">
            <div>
              <LeaderPortrait leader={KARTHICK} />
              <p className="mt-4 text-base font-bold leading-tight text-[#101c4a]">{KARTHICK.name}</p>
              {KARTHICK.shortRole ? (
                <p className="text-sm font-semibold text-[#1f5fd0]">{KARTHICK.shortRole}</p>
              ) : null}
            </div>

            <div>
              <p className={`${BODY_LG} mb-4`}>
                During the initial team-building phase, Karthick helps founders translate the AI product roadmap into
                the engineering roles and technical bar required to build it.
              </p>
              <p className={`${BODY} mb-8`}>
                Depending on the product, this may include AI/ML architecture, RAG or agent workflows, data
                requirements, backend dependencies, model integration, MLOps and cloud considerations.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                {BRIDGE_GROUPS.map(({ label, items }) => (
                  <div key={label} className={`${PANEL_TINT} p-5`}>
                    <p className={`${CARD_LABEL} mb-4`}>{label}</p>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#2a3556]">
                          <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#f97316]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-6 rounded-2xl border border-black/[0.06] bg-white p-6 text-sm font-semibold leading-relaxed text-[#101c4a]">
                This is not outsourced CTO ownership. Product, model and engineering decisions remain with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 13 - Bangalore operating presence */}
      <section className="bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>India operating presence</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>Your AI engineering team has people and infrastructure behind it.</h2>
          <p className={`${BODY_LG} mb-4 max-w-3xl`}>
            NeoIntelli operates from Bangalore, giving startups access to one of India&apos;s deepest technology, AI,
            data and product-engineering talent markets. That is the market we hire AI engineers in India from, along
            with ML engineers, GenAI engineers, data engineers, backend and full-stack engineers, and MLOps and cloud
            engineers.
          </p>
          <p className={`${BODY_LG} mb-4 max-w-3xl`}>
            Depending on the operating model, teams can work from NeoIntelli-supported workspace, remotely or in a
            hybrid structure.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2 text-sm font-semibold text-[#101c4a]">
            <MapPin className="h-4 w-4 text-[#f97316]" aria-hidden="true" />
            Bangalore, India
          </p>
        </div>
      </section>

      {/* 14 - Commercial transparency. No pricing anywhere on this page. */}
      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Commercials</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>Commercials are private. The structure is transparent.</h2>
          <p className={`${BODY_LG} mb-10 max-w-3xl`}>
            AI engineering teams vary significantly by role, seniority and technical specialization. NeoIntelli
            therefore discusses commercials privately after understanding the team you actually need.
          </p>

          <div className={`${PANEL} p-6 md:p-8`}>
            <p className={`${H3} mb-6`}>Before you commit, you receive:</p>
            <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
              {PROPOSAL_CONTENTS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-[#2a3556]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-5 rounded-2xl bg-[#0a1533] px-6 py-7 md:flex-row md:items-center md:justify-between md:px-9">
            <p className="text-lg font-bold tracking-[-0.02em] text-white md:max-w-xl md:text-xl">
              No commitment until you understand the proposed team structure and commercial model.
            </p>
            <button
              type="button"
              onClick={() => goToForm("commercial_request_proposal")}
              className={`${BTN_ON_DARK} shrink-0`}
            >
              Request a Private Squad Proposal <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 15 - IP, AI data and security */}
      <section
        id="security"
        ref={securityRef}
        className="relative scroll-mt-20 overflow-hidden bg-[#0a1533] px-5 py-16 sm:px-8 md:py-24 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>IP, AI data and security</p>
          <h2 className={`${H2_DARK} mb-10 max-w-3xl`}>Your code, models and data stay under your control.</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {DILIGENCE_CARDS.map(({ icon: Icon, title, body, items }) => (
              <div key={title} className={`${PANEL_DARK} p-6 md:p-7`}>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f97316]/15 text-[#f97316]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-sm font-semibold leading-snug text-white">{title}</h3>
                <p className={BODY_DARK}>{body}</p>
                {items ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Chip key={item} tone="dark">
                        {item}
                      </Chip>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-4">
            <button type="button" onClick={() => goToForm("security_discuss")} className={BTN_ON_DARK}>
              Discuss Security &amp; AI Data Controls <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="text-xs leading-relaxed text-[#93a6cd]">
              Specific legal, tax, security and data-protection requirements should be reviewed with your counsel and
              security team.
            </p>
          </div>
        </div>
      </section>

      {/* 16 - Distributed US / UK / EU teams */}
      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Operating model</p>
          <h2 className={`${H2} mb-10 max-w-3xl`}>Built for distributed AI product teams.</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {REGIONS.map(({ title, body }) => (
              <div key={title} className={`${PANEL} p-6 md:p-7`}>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0]">
                  <Globe2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-base font-bold leading-snug text-[#101c4a]">{title}</h3>
                <p className={BODY}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17 - The difficult scenarios */}
      <section className="bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>The difficult scenarios</p>
          <h2 className={`${H2} mb-10 max-w-3xl`}>Plan for the difficult scenarios before they happen.</h2>
          <Accordion items={SCENARIOS} group="scenarios" />
        </div>
      </section>

      {/* 18 - Start, scale, own */}
      <section
        id="path"
        ref={journeyRef}
        className="relative scroll-mt-20 overflow-hidden bg-[#0a1533] px-5 py-16 sm:px-8 md:py-24 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Start &rarr; Scale &rarr; Own</p>
          <h2 className={`${H2_DARK} mb-12 max-w-3xl`}>
            Start with an AI squad. Build toward an India engineering organization.
          </h2>

          <ol className="grid gap-4 md:grid-cols-3">
            {JOURNEY.map(({ label, title, subtitle, body }) => (
              <li key={label} className={`${PANEL_DARK} p-6 md:p-7`}>
                <p className="mb-5 text-4xl font-bold leading-none tracking-[-0.03em] text-white/20">{label}</p>
                <h3 className="mb-1.5 text-xl font-bold uppercase tracking-[0.16em] text-[#f97316]">{title}</h3>
                <p className="mb-4 text-sm font-semibold text-white">{subtitle}</p>
                <p className={BODY_DARK}>{body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-lg font-bold tracking-[-0.02em] text-white md:text-3xl">
            NeoIntelli should help you build independence, not dependency.
          </p>
        </div>
      </section>

      {/* 19 - Why NeoIntelli */}
      <section id="why-neointelli" className="scroll-mt-20 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Why NeoIntelli</p>
          <h2 className={`${H2} mb-10 max-w-3xl`}>Why AI-first founders use NeoIntelli to build in India.</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_NEOINTELLI.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL} p-6`}>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-sm font-bold leading-snug text-[#101c4a]">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20 - Detailed leadership */}
      <section id="leadership-detail" className="scroll-mt-20 bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>The people you can call</p>
          <h2 className={`${H2} mb-5 max-w-3xl`}>Know who&apos;s accountable before you start.</h2>
          <p className={`${BODY_LG} max-w-3xl`}>
            For an early-stage company, access to senior people matters. Your first India team should not disappear
            behind layers of account management.
          </p>

          <div className="mt-4">
            {LEADERS.map((leader, index) => (
              <LeaderProfile key={leader.id} leader={leader} reverse={index % 2 === 1} />
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-[#0a1533] p-6 md:p-7">
            <h3 className="mb-7 max-w-2xl text-xl font-bold tracking-[-0.025em] text-white md:text-4xl">
              Your escalation path shouldn&apos;t be a ticketing system.
            </h3>
            <ul className="grid gap-4 md:grid-cols-3">
              {LEADERS.map((leader) => (
                <li key={leader.id} className={`${PANEL_DARK} p-5`}>
                  <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.16em] text-[#f97316]">
                    {leader.lane}
                  </p>
                  <p className="text-sm leading-relaxed text-white">{leader.escalation}</p>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-base font-semibold text-[#c2d2ee] md:text-lg">
              You know who owns the problem before the engagement begins.
            </p>
          </div>
        </div>
      </section>

      {/* 21 - FAQ */}
      <section id="faq" className="scroll-mt-20 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className={`${EYEBROW} mb-4 text-[#f97316]`}>FAQ</p>
          <h2 className={`${H2} mb-10`}>Questions AI founders ask before the first call.</h2>
          <Accordion items={FAQS} group="faq" columns={2} />
        </div>
      </section>

      {/* 22 - Final CTA */}
      <section className="relative overflow-hidden bg-[#0a1533] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-16 h-[460px] w-[460px] rounded-full bg-[#1f5fd0]/25 blur-[120px]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="mb-5 text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
            Build the engineering team behind your AI product.
          </h2>
          <p className={`${BODY_DARK} mx-auto mb-8 max-w-2xl text-base md:text-lg`}>
            Tell us what you&apos;re building, what the product needs to own over the next 6&ndash;12 months and where
            the current team has capability gaps. We&apos;ll help translate that into the right India engineering roles
            and hiring bar.
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button type="button" onClick={() => goToForm("final_build_ai_team")} className={BTN_ON_DARK}>
              Build My AI Engineering Team <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCalendarOpen("final_talk_to_advisor")}
              className={BTN_GHOST_DARK}
            >
              Talk to an AI Engineering Advisor
            </a>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-[#93a6cd]">
            Start with your product architecture, not a generic staffing proposal.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#c2d2ee]">
            You&apos;ll speak with NeoIntelli leadership, not an outsourced appointment-setting team.
          </p>
        </div>
      </section>

      {/* 23 - Lead form */}
      <section id={FORM_ANCHOR} className="scroll-mt-20 bg-[#f3f6fc] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={`${EYEBROW} mb-4 text-[#f97316]`}>Start the conversation</p>
            <h2 className={`${H2} mb-5`}>What should your India AI engineering team own?</h2>
            <p className={`${BODY_LG} mb-8 max-w-lg`}>
              A short calibration call turns your AI product architecture into roles, seniority and a hiring bar. The
              commercial proposal follows privately, once the structure is agreed.
            </p>
            <ul className="space-y-3">
              {HERO_TRUST.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-[#2a3556]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <SquadForm />
        </div>
      </section>

      {/* 24 - Minimal footer */}
      <footer className="border-t border-[#dde7f7] px-5 py-10 pb-28 sm:px-8 md:pb-10 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-[#5d6a8a] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} NeoIntelli</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA. The header CTA hides on mobile while this is up. */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 bg-[#0a1533] px-4 py-3 transition-transform duration-300 md:hidden ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          type="button"
          onClick={() => goToForm("sticky_mobile_build_ai_team")}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f5fd0] px-5 py-3.5 text-sm font-semibold text-white"
        >
          Build My AI Engineering Team <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
