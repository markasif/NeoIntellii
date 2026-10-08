"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ClipboardCheck,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CAL_BOOKING_URL } from "@/lib/constants";
import ToolLeadCapture from "@/components/shared/ToolLeadCapture";
import TrustStrip from "@/components/gcc-calculator/TrustStrip";
import { trackEvent } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface QuestionOption {
  label: string;
  points: number;
}

interface Question {
  id: number;
  text: string;
  type: "single" | "multi" | "info";
  options: QuestionOption[];
}

/* ------------------------------------------------------------------ */
/* Questions data (Preserved 100% exact content) */
/* ------------------------------------------------------------------ */

const questions: Question[] = [
  {
    id: 1,
    text: "What is your company's annual revenue?",
    type: "single",
    options: [
      { label: "Under $10M", points: 1 },
      { label: "$10M-$50M", points: 2 },
      { label: "$50M-$200M", points: 3 },
      { label: "$200M-$1B", points: 4 },
      { label: "Over $1B", points: 5 },
    ],
  },
  {
    id: 2,
    text: "How many engineers/technical staff do you currently have?",
    type: "single",
    options: [
      { label: "1-10", points: 1 },
      { label: "11-50", points: 2 },
      { label: "51-200", points: 3 },
      { label: "201-500", points: 4 },
      { label: "500+", points: 5 },
    ],
  },
  {
    id: 3,
    text: "Do you currently use any offshore or outsourced engineering?",
    type: "single",
    options: [
      { label: "No, all in-house", points: 1 },
      { label: "Yes, outsourcing", points: 2 },
      { label: "Yes, staff augmentation", points: 3 },
      { label: "Yes, small offshore team", points: 4 },
    ],
  },
  {
    id: 4,
    text: "What is your primary motivation for considering a GCC?",
    type: "single",
    options: [
      { label: "Cost reduction", points: 2 },
      { label: "Access to talent", points: 3 },
      { label: "Scale engineering fast", points: 3 },
      { label: "Build AI/ML capabilities", points: 4 },
      { label: "IP ownership", points: 4 },
      { label: "All of the above", points: 5 },
    ],
  },
  {
    id: 5,
    text: "What's your target team size in India within 12 months?",
    type: "single",
    options: [
      { label: "5-10", points: 1 },
      { label: "11-25", points: 2 },
      { label: "26-50", points: 3 },
      { label: "51-100", points: 4 },
      { label: "100+", points: 5 },
    ],
  },
  {
    id: 6,
    text: "What is your timeline to get started?",
    type: "single",
    options: [
      { label: "Within 3 months", points: 5 },
      { label: "3-6 months", points: 4 },
      { label: "6-12 months", points: 2 },
      { label: "Just exploring", points: 1 },
    ],
  },
  {
    id: 7,
    text: "What functions would your GCC handle?",
    type: "multi",
    options: [
      { label: "Software Engineering", points: 0.7 },
      { label: "AI/ML", points: 0.7 },
      { label: "Data Engineering", points: 0.7 },
      { label: "Cloud/DevOps", points: 0.7 },
      { label: "QA/Testing", points: 0.7 },
      { label: "Product Design", points: 0.7 },
      { label: "Data Science", points: 0.7 },
      { label: "Other", points: 0.7 },
    ],
  },
  {
    id: 8,
    text: "What industry are you in?",
    type: "info",
    options: [
      { label: "Technology/SaaS", points: 0 },
      { label: "Financial Services", points: 0 },
      { label: "Healthcare", points: 0 },
      { label: "Manufacturing", points: 0 },
      { label: "Retail", points: 0 },
      { label: "Other", points: 0 },
    ],
  },
];

const QUESTION_STEPS = [
  { id: 1, stepNum: 1, title: "Annual Revenue", short: "Revenue scale" },
  { id: 2, stepNum: 2, title: "Engineering Team", short: "Current headcount" },
  { id: 3, stepNum: 3, title: "Offshore Experience", short: "Sourcing model" },
  { id: 4, stepNum: 4, title: "Primary Goal", short: "GCC motivation" },
  { id: 5, stepNum: 5, title: "Target Scale", short: "12-month target" },
  { id: 6, stepNum: 6, title: "Start Timeline", short: "Target horizon" },
  { id: 7, stepNum: 7, title: "Capability Scope", short: "Functions handled" },
  { id: 8, stepNum: 8, title: "Industry Sector", short: "Business domain" },
];

/* ------------------------------------------------------------------ */
/* Scoring helpers (Preserved 100% exact logic) */
/* ------------------------------------------------------------------ */

type Answers = Record<number, number | number[]>;

/** Renders the stored answer indices as readable "question: choice" lines. */
function describeAnswers(answers: Answers): string {
  return questions
    .map((q) => {
      const answer = answers[q.id];
      if (answer === undefined) return null;
      const chosen = Array.isArray(answer)
        ? answer.map((i) => q.options[i]?.label).filter(Boolean).join(", ")
        : q.options[answer]?.label;
      return chosen ? `${q.text} ${chosen}` : null;
    })
    .filter(Boolean)
    .join("\n");
}

/** Question 8 is the industry selector and carries no score. */
function industryOf(answers: Answers): string {
  const question = questions.find((q) => q.id === 8);
  const answer = question ? answers[question.id] : undefined;
  if (!question || typeof answer !== "number") return "";
  return question.options[answer]?.label ?? "";
}

function calculateScore(answers: Answers): number {
  let total = 0;
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer === undefined) return;

    if (q.type === "info") return; // Q8 has no scoring

    if (q.type === "multi" && Array.isArray(answer)) {
      // each selected option = 0.7pt
      total += answer.length * 0.7;
    } else if (typeof answer === "number") {
      total += q.options[answer].points;
    }
  });
  return Math.round(total * 10) / 10;
}

function getTier(score: number): "high" | "medium" | "low" {
  if (score >= 28) return "high";
  if (score >= 16) return "medium";
  return "low";
}

/* ------------------------------------------------------------------ */
/* Animation variants */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

/* ------------------------------------------------------------------ */
/* Main Component */
/* ------------------------------------------------------------------ */

export default function GCCReadinessAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const assessmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "GCC Readiness Check | Is Your Company Ready? — NeoIntelli";
  }, []);

  const scrollToAssessment = () => {
    if (assessmentRef.current) {
      const yOffset = -70;
      const elementTop = assessmentRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, elementTop + yOffset), behavior: "smooth" });
    }
  };

  const question = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  /* --- handlers --- */

  function handleSingleSelect(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  }

  function handleMultiSelect(optionIndex: number) {
    setAnswers((prev) => {
      const current = (prev[question.id] as number[]) || [];
      const updated = current.includes(optionIndex)
        ? current.filter((i) => i !== optionIndex)
        : [...current, optionIndex];
      return { ...prev, [question.id]: updated };
    });
  }

  function canProceed(): boolean {
    const answer = answers[question.id];
    if (question.type === "multi") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined;
  }

  function goNext() {
    if (!canProceed()) return;
    setDirection(1);
    if (currentStep < questions.length - 1) {
      setCurrentStep((s) => s + 1);
      scrollToAssessment();
    } else {
      setShowResults(true);
      const finalScore = calculateScore(answers);
      const finalTier = getTier(finalScore);
      trackEvent("readiness_assessment_complete", {
        score: finalScore,
        tier: finalTier,
      });
      scrollToAssessment();
    }
  }

  function goBack() {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      scrollToAssessment();
    }
  }

  function restartQuiz() {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    scrollToAssessment();
  }

  const score = calculateScore(answers);
  const tier = getTier(score);

  const selectedClass =
    "bg-gradient-to-br from-[#00A3E0] to-[#008EC4] text-white border-2 border-white/60 shadow-md shadow-[#00A3E0]/30 ring-2 ring-[#00A3E0]/30";
  const idleClass =
    "bg-[#06224A]/70 hover:bg-[#0A2E63]/60 text-white border border-[#1E3A8A]/60 hover:border-[#00A3E0]/50 shadow-2xs transition-all";

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar appearance="dark" />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="readiness-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="GCC Readiness Assessment Hero"
        >
          {/* Executive Background Overlay with 3D Cyan Fluid Ribbon */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/tools/hero_tools_bg.webp"
              alt="India GCC Readiness Assessment"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-right"
            />
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
                    GCC Readiness Assessment
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
              Is Your Company Ready for a GCC?
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-normal font-sans max-w-xl text-left"
            >
              Answer 8 quick questions. Get a personalized readiness score and
              recommendation in 3 minutes.
            </motion.p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. EXECUTIVE READINESS ASSESSMENT SECTION (RECTANGLE SHAPE) */}
        {/* ============================================================ */}
        <section
          ref={assessmentRef}
          id="assessment-section"
          className="pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-transparent"
        >
          <div className="max-w-7xl mx-auto">
            {/* Centered Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <p className="inline-block text-xs sm:text-[13px] font-bold font-mono text-[#008EC4] uppercase tracking-[0.22em] mb-2">
                {showResults ? "ASSESSMENT RESULTS" : `QUESTION 0${currentStep + 1} OF 0${questions.length}`}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold font-manrope text-[#0D306C] tracking-tight leading-[1.15] mb-3">
                {showResults ? "Your GCC Readiness Report" : "Evaluate Your GCC Feasibility"}
              </h2>
              <p className="text-base sm:text-[17px] text-[#505D74] leading-relaxed font-sans max-w-2xl mx-auto">
                {showResults
                  ? "Here is your objective readiness score, feasibility tier, and strategic recommendations."
                  : "Assess your organizational maturity, talent requirements, and operational readiness for an India captive center."}
              </p>
            </div>

            {/* 2-Column Responsive Layout matching gcc-cost and gcc-estimator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* ============================================================ */}
              {/* LEFT COLUMN: Assessment Steps Tracker (Same length as right div) */}
              {/* ============================================================ */}
              <aside className="lg:col-span-4 xl:col-span-4 flex flex-col h-full">
                <div className="h-full p-6 sm:p-7 shadow-xs flex flex-col justify-between relative overflow-hidden">
                  {/* Top Milestones Header */}
                  <div className="mb-4 pb-3.5 border-b border-[#E2E8F0] shrink-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008EC4]">
                        ASSESSMENT STEPS
                      </span>
                      <span className="text-2xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#00A3E0]/15 text-[#008EC4] border border-[#00A3E0]/30 tabular-nums">
                        {showResults ? "8/8 Done" : `0${currentStep + 1} / 08`}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold font-manrope text-[#0D306C] mt-1 tracking-tight">
                      Readiness Milestones
                    </h3>
                  </div>

                  {/* Flexible Step Items filling the exact column height */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    {QUESTION_STEPS.map((s, idx) => {
                      const isAnswered = answers[s.id] !== undefined;
                      const isCurrent = idx === currentStep && !showResults;
                      const isPast = idx < currentStep;
                      const isLast = idx === QUESTION_STEPS.length - 1;

                      return (
                        <div key={s.id} className="relative flex flex-col flex-1 last:flex-none">
                          <div
                            className={`flex items-start gap-3.5 group ${
                              (isAnswered || isPast) && !showResults ? "cursor-pointer" : ""
                            }`}
                            onClick={() => {
                              if ((isAnswered || isPast) && !showResults) {
                                setCurrentStep(idx);
                                scrollToAssessment();
                              }
                            }}
                          >
                            {/* Circular Badge */}
                            <div className="relative shrink-0 flex items-center justify-center">
                              {isAnswered && !isCurrent ? (
                                <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                  <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                                </div>
                              ) : isCurrent ? (
                                <div className="w-8 h-8 rounded-full ring-4 ring-[#008EC4]/25 bg-[#0D306C] border-2 border-[#00A3E0] text-white flex items-center justify-center shadow-xs">
                                  <span className="text-xs font-bold font-mono">{s.stepNum}</span>
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-white border-2 border-[#CBD5E1] text-[#94A3B8] flex items-center justify-center font-bold text-xs">
                                  {s.stepNum}
                                </div>
                              )}
                            </div>

                            {/* Step Content */}
                            <div className="min-w-0 pt-0.5">
                              <span
                                className={`block text-[10px] sm:text-2xs font-mono font-bold uppercase tracking-[0.16em] ${
                                  isAnswered && !isCurrent
                                    ? "text-[#10B981]"
                                    : isCurrent
                                    ? "text-[#008EC4]"
                                    : "text-[#94A3B8]"
                                }`}
                              >
                                STEP {s.stepNum}
                              </span>
                              <p
                                className={`text-sm sm:text-[15px] font-manrope leading-snug ${
                                  isAnswered && !isCurrent
                                    ? "font-bold text-[#0D306C] group-hover:text-[#008EC4] transition-colors"
                                    : isCurrent
                                    ? "font-extrabold text-[#0D306C]"
                                    : "font-semibold text-[#94A3B8]"
                                }`}
                              >
                                {s.title}
                              </p>
                              <p
                                className={`text-2xs leading-snug mt-0.5 ${
                                  isCurrent ? "text-[#505D74] font-medium" : "text-[#94A3B8]"
                                }`}
                              >
                                {s.short}
                              </p>
                            </div>
                          </div>

                          {/* Dynamic Vertical Connecting Line */}
                          {!isLast && (
                            <div
                              className={`w-[2px] ml-[15px] my-1 flex-1 min-h-[14px] rounded-full transition-colors ${
                                isAnswered && idx < currentStep ? "bg-[#10B981]" : "bg-[#E2E8F0]"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

             
                </div>
              </aside>

              {/* ============================================================ */}
              {/* RIGHT COLUMN: Executive Navy Console (Rectangle Shape) */}
              {/* ============================================================ */}
              <div className="lg:col-span-8 xl:col-span-8 min-w-0 flex flex-col">
                <div className="h-full bg-[#012048] p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden border border-[#1E3A8A] flex flex-col justify-between">
                  {/* Faceted geometric watermark in the top-right corner */}
                  <div
                    className="absolute -top-6 -right-6 w-48 h-48 pointer-events-none opacity-20 select-none"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
                      <polygon points="120,60 80,10 60,70" fill="#0D306C" opacity="0.6" />
                      <polygon points="120,60 60,70 90,120" fill="#008EC4" opacity="0.8" />
                      <polygon points="90,120 60,70 30,110" fill="#00A3E0" opacity="0.5" />
                      <polygon points="60,70 80,10 30,30" fill="#38BDF8" opacity="0.7" />
                      <polygon points="60,70 30,30 30,110" fill="#0D306C" opacity="0.4" />
                      <polygon points="120,60 120,120 90,120" fill="#005B94" opacity="0.9" />
                    </svg>
                  </div>

                  {!showResults ? (
                    <div className="flex-1 flex flex-col justify-between">
                      {/* Progress bar header */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                            Question {currentStep + 1} of {questions.length}
                          </span>
                          <span className="text-xs font-mono font-bold text-white bg-[#00A3E0]/20 px-3 py-0.5 rounded-full border border-[#00A3E0]/30">
                            {Math.round(progress)}% Completed
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#06224A] rounded-full overflow-hidden border border-[#1E3A8A]">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#00A3E0] to-[#38BDF8] rounded-full"
                            initial={false}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          />
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="relative min-h-[300px] flex-1 flex flex-col justify-center">
                        <AnimatePresence mode="wait" custom={direction}>
                          <motion.div
                            key={currentStep}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="w-full"
                          >
                            <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold font-manrope text-white tracking-tight leading-snug mb-2">
                              <span className="text-[#38BDF8] font-mono mr-2.5">Q{question.id}.</span>
                              {question.text}
                            </h2>

                            <p className="text-xs sm:text-sm text-slate-300 mb-6">
                              {question.type === "multi"
                                ? "Select all technical disciplines that apply to your planned operation."
                                : "Choose the option that most closely matches your current organizational profile."}
                            </p>

                            {/* Rectangular Options Grid (2-column on tablet/desktop) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                              {question.options.map((option, idx) => {
                                const isMulti = question.type === "multi";
                                const selected = isMulti
                                  ? ((answers[question.id] as number[]) || []).includes(idx)
                                  : answers[question.id] === idx;

                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() =>
                                      isMulti
                                        ? handleMultiSelect(idx)
                                        : handleSingleSelect(idx)
                                    }
                                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                                      selected ? selectedClass : idleClass
                                    }`}
                                  >
                                    <span className="text-sm sm:text-base font-bold font-manrope text-white">
                                      {option.label}
                                    </span>

                                    {/* Indicator */}
                                    <span
                                      className={`shrink-0 w-5 h-5 border-2 flex items-center justify-center transition-all duration-200 ${
                                        isMulti ? "rounded-md" : "rounded-full"
                                      } ${
                                        selected
                                          ? "border-white bg-white text-[#008EC4]"
                                          : "border-[#334E7B] bg-transparent"
                                      }`}
                                    >
                                      {selected &&
                                        (isMulti ? (
                                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        ) : (
                                          <span className="w-2 h-2 rounded-full bg-[#008EC4]" />
                                        ))}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {question.type === "multi" && (
                              <p className="text-xs font-mono font-medium text-[#38BDF8] mt-3 flex items-center gap-1.5">
                                <Info className="w-3.5 h-3.5 text-[#38BDF8]" />
                                Multiple selections permitted
                              </p>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1E3A8A]">
                        <button
                          onClick={goBack}
                          disabled={currentStep === 0}
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold font-manrope transition-all duration-200 cursor-pointer ${
                            currentStep === 0
                              ? "invisible"
                              : "bg-[#06224A] hover:bg-[#0A2E63] text-white border border-[#1E3A8A] shadow-2xs"
                          }`}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        <button
                          onClick={goNext}
                          disabled={!canProceed()}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold font-manrope text-white transition-all shadow-md shadow-[#00A3E0]/25 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed bg-[#00A3E0] hover:bg-[#008EC4] cursor-pointer"
                        >
                          <span>{currentStep === questions.length - 1 ? "See Results" : "Next Question"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Results Dashboard in Executive Navy Container */
                    <div>
                      {/* Header */}
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A8A] pb-4">
                        <p className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-[0.18em]">
                          Executive Assessment Summary
                        </p>
                        <span className="text-2xs font-bold font-mono px-3 py-1 rounded-full bg-[#00A3E0]/20 text-[#38BDF8] border border-[#00A3E0]/30 uppercase tracking-wider">
                          {tier === "high"
                            ? "HIGH READINESS"
                            : tier === "medium"
                            ? "MODERATE READINESS"
                            : "EARLY STAGE EXPLORATION"}
                        </span>
                      </div>

                      {/* Score Highlight Box */}
                      <div className="rounded-2xl bg-gradient-to-r from-[#008EC4] to-[#007AA8] p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                            {tier === "high" && <CheckCircle2 className="w-8 h-8 text-white" />}
                            {tier === "medium" && <AlertCircle className="w-8 h-8 text-white" />}
                            {tier === "low" && <Info className="w-8 h-8 text-white" />}
                          </div>
                          <div>
                            <p className="text-white/90 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
                              GCC Readiness Score
                            </p>
                            <p className="text-xs text-sky-100 mt-0.5 font-sans">
                              Benchmark evaluated across revenue, headcount, sourcing and technical requirements
                            </p>
                          </div>
                        </div>
                        <p className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-manrope text-white tracking-tight tabular-nums whitespace-nowrap self-start sm:self-center">
                          {score} <span className="text-sm sm:text-base font-medium text-white/80 font-sans">/ 40 points</span>
                        </p>
                      </div>

                      {/* Strategic Recommendation */}
                      <div className="rounded-2xl bg-[#06224A]/80 border border-[#1E3A8A] p-6 sm:p-7 text-white mb-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                          <h3 className="text-base sm:text-lg font-extrabold font-manrope text-white tracking-tight">
                            Strategic Recommendation
                          </h3>
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans mb-6">
                          {tier === "high" &&
                            "Your organization exhibits high organizational maturity, adequate engineering scale, and a strategic profile exceptionally suited for establishing an India GCC. Establishing a captive operation can unlock 60-70% cost efficiencies while ensuring complete intellectual property and operational control."}
                          {tier === "medium" &&
                            "Your organization has compelling potential for a GCC initiative, though specific considerations around scale, timeline, and capability focus warrant deeper architectural scoping. A hybrid or staged managed model is recommended."}
                          {tier === "low" &&
                            "Your current scale or timeline indicates that an immediate captive GCC might introduce operational friction. We recommend consolidating core technical roadmaps or initiating with dedicated remote squads before formal captive commitment."}
                        </p>

                        <div className="pt-4 border-t border-[#1E3A8A]/60 flex flex-wrap gap-4 items-center justify-between">
                          {tier === "high" && (
                            <a
                              href={CAL_BOOKING_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold font-manrope text-white bg-[#00A3E0] hover:bg-[#008EC4] shadow-md shadow-[#00A3E0]/25 hover:shadow-lg transition-all"
                            >
                              <span>Book a Strategy Call</span>
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          )}
                          {tier === "medium" && (
                            <a
                              href={CAL_BOOKING_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold font-manrope text-white bg-[#00A3E0] hover:bg-[#008EC4] shadow-md shadow-[#00A3E0]/25 hover:shadow-lg transition-all"
                            >
                              <span>Book a Feasibility Assessment</span>
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          )}
                          {tier === "low" && (
                            <Link
                              to="/blog"
                              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold font-manrope text-white bg-[#00A3E0] hover:bg-[#008EC4] shadow-md shadow-[#00A3E0]/25 hover:shadow-lg transition-all"
                            >
                              <span>Explore GCC Insights &amp; Guides</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            to="/gcc-cost-calculator"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold font-manrope bg-[#06224A] hover:bg-[#0A2E63] text-white border border-[#1E3A8A] transition-colors"
                          >
                            <span>Model GCC Headcount Costs</span>
                            <ArrowRight className="w-4 h-4 text-[#00A3E0]" />
                          </Link>
                        </div>
                      </div>

                      {/* Lead capture form */}
                      <div id="lead-capture" className="mb-8">
                        <ToolLeadCapture
                          formName="readiness-assessment"
                          heading="Email me this readiness report"
                          description="Get your score, tier and a breakdown of what moves the needle - plus the gaps worth closing before you commit to a GCC."
                          submitLabel="Send my readiness report"
                          event="readiness_assessment_complete"
                          source="readiness_assessment"
                          emailTool="readiness"
                          variant="dark"
                          fields={{
                            score,
                            tier,
                            industry: industryOf(answers),
                            answers: describeAnswers(answers),
                          }}
                        />
                      </div>

                      {/* Retake Action */}
                      <div className="text-center pt-4 border-t border-[#1E3A8A]">
                        <button
                          onClick={restartQuiz}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold font-manrope text-slate-300 hover:text-white transition-colors duration-200 py-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-[#00A3E0]" />
                          <span>Retake the Assessment</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. PROVEN DELIVERY ENGINE & TRUST STRIP WITH WAVE DIVIDER */}
        {/* ============================================================ */}
        <TrustStrip />
      </main>

      <Footer />
    </div>
  );
}
