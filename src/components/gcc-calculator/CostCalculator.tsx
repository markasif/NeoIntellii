import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Boxes,
  Check,
  CheckCircle2,
  Cloud,
  Gift,
  HelpCircle,
  Layers,
  Lightbulb,
  MapPin,
  Minus,
  Plus,
  Rocket,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { bucketForRange, track, type PageVariant, type BookCallPlacement } from "@/lib/dataLayer";
import { CAL_COM_BOOKING_URL } from "@/lib/calEmbed";
import EstimateEmailForm from "@/components/gcc-calculator/EstimateEmailForm";
import TrustStrip from "@/components/gcc-calculator/TrustStrip";
import { activeLenis } from "@/lib/lenisStore";
import {
  roles as roleConfigs,
  cities,
  seniorityLevels,
  blueprintPods,
  macroArchetypes,
  complexityTiers,
  cloudProviders,
  servingStackOptions,
  type CityKey,
  type BlueprintPodKey,
  type MacroArchetypeKey,
  type ComplexityTierKey,
} from "@/data/gccCostData";
import {
  COMPARISON_CITIES,
  ENGAGEMENT_CARDS,
  EXCLUDED_LINES,
  INCLUDED_LINES,
  RATES_UPDATED,
  SETUP_COSTS_HREF,
} from "@/data/gccCalculatorContent";
import {
  archetypeFromSeniorityIndex,
  archetypeRatios,
  buildBreakdownForCounts,
  distributeSeats,
  primaryTierForArchetype,
  teamCountsFromQuery,
} from "@/lib/gccCalculatorTeam";
import { computeCosts, roleCostRows, roundToNearest10k, usEquivalent } from "@/lib/gccCostEngine";
import { parseCalculatorParams } from "@/lib/gccCalculatorParams";
import { buildRecommendations, suggestedComplexityTier, type Recommendation } from "@/lib/gccPodRecommendations";

/**
 * The GCC cost calculator, shared by /gcc-cost-calculator and the paid
 * /lp/gcc-cost-calculator. Both pages get identical behaviour; only the page
 * chrome around them differs, and `pageVariant` is what the campaign events
 * report.
 *
 * Three steps: team, city, estimate. The estimate is never gated behind the
 * lead form - the visitor arrived from an ad for a number, and they get it.
 *
 * The first paint already shows a real monthly figure: the Agentic AI Pod and
 * the Senior-Led preset are the initial state rather than something an effect
 * applies after hydration, so there is no zero flashing on screen and no
 * layout shift when the number arrives.
 */

const STEPS = [
  { label: "Team", icon: Users },
  { label: "City", icon: MapPin },
];
const LAST_STEP = STEPS.length - 1;

const SIDEBAR_STEPS = [
  {
    stepNum: "01",
    label: "Team",
    title: "Build your team",
    description: "Roles, pods & seniority",
    icon: Users,
  },
  {
    stepNum: "02",
    label: "City",
    title: "Choose location",
    description: "India tech corridors",
    icon: MapPin,
  },
  {
    stepNum: "03",
    label: "Estimate",
    title: "View your costs",
    description: "Loaded monthly economics",
    icon: Sparkles,
  },
];

/**
 * The Tailwind config's fontSize scale has a "heading" key (1.5rem) that
 * generates a same-named `.text-heading{font-size:1.5rem}` utility, which
 * collides with index.css's own color-only `.text-heading`. Combining
 * `text-heading` with an arbitrary `text-[Npx]` on one element silently
 * loses the size to that 24px rule - this sidesteps it for small heading-
 * colored text without touching the shared Tailwind config.
 */
const HEADING_COLOR = { color: "hsl(var(--heading))" } as const;

const POD_ICONS: Record<BlueprintPodKey, typeof Layers> = {
  agentic: Bot,
  mlops: Layers,
  product: Boxes,
  poc: Rocket,
  custom: Wrench,
};

/** The estimate is priced on the managed model - see INCLUDED_LINES. */
const ENGAGEMENT = "managed" as const;

const DEFAULT_POD: BlueprintPodKey = "agentic";
const DEFAULT_ARCHETYPE: MacroArchetypeKey = "senior-led";
const DEFAULT_CITY: CityKey = "bengaluru";

const defaultPod = blueprintPods.find((pod) => pod.key === DEFAULT_POD)!;

const defaultCounts = (): Record<string, number> =>
  Object.fromEntries(roleConfigs.map((role) => [role.key, defaultPod.roleCounts[role.key] ?? 0]));

const defaultSpecializations = (): Record<string, string[]> =>
  Object.fromEntries(Object.entries(defaultPod.specializations).map(([key, value]) => [key, [...(value ?? [])]]));

const STORAGE_KEY = "ni_gcc_calc_v1";

interface PersistedState {
  teamCounts: Record<string, number>;
  seniorityBreakdown: Record<string, number[]>;
  specializations: Record<string, string[]>;
  selectedPod: BlueprintPodKey | null;
  macroArchetype: MacroArchetypeKey | null;
  complexityTier: ComplexityTierKey;
  includeSME: boolean;
  city: CityKey | null;
}

/** Restores a configuration a visitor left behind (reload, or back from the booking modal). */
const readPersisted = (): PersistedState | null => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!parsed || typeof parsed !== "object" || !parsed.teamCounts) return null;
    return parsed;
  } catch {
    return null;
  }
};

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = displayRef.current;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 600;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      displayRef.current = current;
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

/** One advisory line, in the pod panel or under a role. */
function RecommendationNote({ rec, compact = false }: { rec: Recommendation; compact?: boolean }) {
  const gap = rec.kind === "gap";
  const Icon = gap ? AlertCircle : Lightbulb;
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl ${compact ? "px-3 py-2.5" : "px-4 py-3"} ${
        gap ? "bg-amber-950/40 border border-amber-500/50 text-amber-200" : "bg-[#06224A]/80 border border-[#1E3A8A] text-white"
      }`}
    >
      <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${gap ? "text-amber-400" : "text-[#38BDF8]"}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className={`${compact ? "text-2xs" : "text-xs"} font-bold font-manrope leading-snug ${gap ? "text-amber-200" : "text-white"}`}>{rec.title}</p>
        <p className={`${compact ? "text-2xs" : "text-2xs"} ${gap ? "text-amber-200/80" : "text-slate-300"} leading-relaxed mt-0.5`}>{rec.detail}</p>
      </div>
    </div>
  );
}

export interface CostCalculatorProps {
  pageVariant: PageVariant;
}

export default function CostCalculator({ pageVariant }: CostCalculatorProps) {
  /**
   * The step-3 CTAs go straight to cal.com rather than opening the on-site
   * booking modal: the embedded calendar was rendering blank, so the modal was
   * a dead end for anyone trying to book off an estimate. The click is still
   * measured here; the booking confirmation now happens on cal.com, so
   * `meeting_booked` no longer fires for these two CTAs.
   */
  const trackBookCallClick = (placement: BookCallPlacement) => {
    track("cta_book_call_click", { placement });
    trackEvent("cta_click", { location: `book_call_${placement}` });
  };

  const [step, setStep] = useState(0);
  const stepperRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [teamCounts, setTeamCounts] = useState<Record<string, number>>(defaultCounts);
  const [selectedPod, setSelectedPod] = useState<BlueprintPodKey | null>(DEFAULT_POD);
  const [cloudProvider, setCloudProvider] = useState(cloudProviders[0].key);
  const [servingStack, setServingStack] = useState<string[]>(["triton-vllm", "kubernetes"]);
  const [seniorityBreakdown, setSeniorityBreakdown] = useState<Record<string, number[]>>(() =>
    buildBreakdownForCounts(defaultCounts(), DEFAULT_ARCHETYPE),
  );
  const [specializations, setSpecializations] = useState<Record<string, string[]>>(defaultSpecializations);
  const [macroArchetype, setMacroArchetype] = useState<MacroArchetypeKey | null>(DEFAULT_ARCHETYPE);
  const [complexityTier, setComplexityTier] = useState<ComplexityTierKey>(defaultPod.complexity ?? "deep");
  const [includeSME, setIncludeSME] = useState(true);
  const [city, setCity] = useState<CityKey | null>(DEFAULT_CITY);
  const [showResults, setShowResults] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  const startedRef = useRef(false);
  const viewedConfigsRef = useRef<Set<string>>(new Set());

  /** gcc_calc_start: the first time the visitor touches the configuration, once per page load. */
  const markStart = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("gcc_calc_start", { page_variant: pageVariant });
  }, [pageVariant]);

  /**
   * Campaigns and partner links arrive with the team already worked out
   * (?team=10&Product%20Owner=1&...), and a visitor who reloads or comes back
   * from the booking modal should find their own configuration intact.
   *
   * Precedence is deliberate: a link beats a stored session, and a stored
   * session beats the default pod. window.location rather than the router,
   * because the page is statically generated and the query string is only
   * ever known on the client.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const search = window.location.search;
    const prefill = parseCalculatorParams(search);
    const deepLinkCounts = teamCountsFromQuery(search);
    const hasDeepLink = Object.keys(deepLinkCounts).length > 0;

    if (prefill.applied || hasDeepLink) {
      // A pod first, so the link inherits its focus areas, seniority preset
      // and complexity tier exactly as a click on that card would set them.
      // Role counts in the same link then say what the team actually is.
      if (prefill.pod) setPodState(prefill.pod);

      if (prefill.teamCounts || hasDeepLink) {
        // A full replace rather than a merge: with a pod applied, a role the
        // visitor removed on the landing page must not survive as the pod's
        // own default. A link that named a pod keeps it selected.
        if (!prefill.pod) setSelectedPod(null);
        const counts = { ...prefill.teamCounts, ...deepLinkCounts };
        setTeamCounts(Object.fromEntries(roleConfigs.map((r) => [r.key, counts[r.key] ?? 0])));
      }
      if (prefill.seniority !== null) setMacroArchetype(archetypeFromSeniorityIndex(prefill.seniority));
      if (prefill.city !== null) setCity(prefill.city === "recommend" ? null : prefill.city);
      setPrefilled(true);

      trackEvent("cost_calculator_prefilled", {
        team_source: prefill.teamSource ?? "deep_link",
        pod: prefill.pod ?? "none",
        total_team: Object.values({ ...prefill.teamCounts, ...deepLinkCounts }).reduce((a, b) => a + b, 0),
      });
      return;
    }

    const stored = readPersisted();
    if (!stored) return;
    setTeamCounts(stored.teamCounts);
    setSeniorityBreakdown(stored.seniorityBreakdown ?? {});
    setSpecializations(stored.specializations ?? {});
    setSelectedPod(stored.selectedPod ?? null);
    setMacroArchetype(stored.macroArchetype ?? null);
    if (stored.complexityTier) setComplexityTier(stored.complexityTier);
    setIncludeSME(Boolean(stored.includeSME));
    setCity(stored.city ?? null);
    // Mount only: a visitor's own edits must never be reverted by a re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const state: PersistedState = {
        teamCounts,
        seniorityBreakdown,
        specializations,
        selectedPod,
        macroArchetype,
        complexityTier,
        includeSME,
        city,
      };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* private mode, quota - the calculator still works without persistence */
    }
  }, [teamCounts, seniorityBreakdown, specializations, selectedPod, macroArchetype, complexityTier, includeSME, city]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    stepperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, showResults]);

  // Keeps each role's seat-level seniority breakdown in sync with its
  // headcount, whatever changed it (a counter, a blueprint pod, a link).
  // Existing seats are preserved; only the roles/seats that actually grew or
  // shrank are touched.
  useEffect(() => {
    setSeniorityBreakdown((prev) => {
      let changed = false;
      const next: Record<string, number[]> = { ...prev };
      roleConfigs.forEach((role) => {
        const count = teamCounts[role.key] || 0;
        const existing = prev[role.key] ?? [];
        if (count === 0) {
          if (existing.length > 0) { next[role.key] = []; changed = true; }
          return;
        }
        if (existing.length === count) return;
        changed = true;
        const archetypeKey = macroArchetype ?? "balanced";
        if (existing.length === 0) {
          next[role.key] = distributeSeats(count, archetypeRatios(archetypeKey));
        } else if (existing.length > count) {
          next[role.key] = existing.slice(0, count);
        } else {
          const fillTier = primaryTierForArchetype(archetypeKey);
          next[role.key] = [...existing, ...Array(count - existing.length).fill(fillTier)];
        }
      });
      return changed ? next : prev;
    });
  }, [teamCounts, macroArchetype]);

  const totalTeam = useMemo(() => Object.values(teamCounts).reduce((a, b) => a + b, 0), [teamCounts]);

  /** "3x Full-Stack Engineers, 1x QA/SDET" - the team, in one field. */
  const teamSummary = useMemo(
    () =>
      roleConfigs
        .filter((role) => (teamCounts[role.key] || 0) > 0)
        .map((role) => `${teamCounts[role.key]}x ${role.label}`)
        .join(", "),
    [teamCounts],
  );

  const specializationSummary = useMemo(
    () =>
      roleConfigs
        .filter((role) => (teamCounts[role.key] || 0) > 0 && (specializations[role.key] ?? []).length > 0)
        .map((role) => {
          const labels = role.specializations
            .filter((spec) => (specializations[role.key] ?? []).includes(spec.key))
            .map((spec) => spec.label);
          return `${role.label}: ${labels.join(", ")}`;
        })
        .join("; "),
    [teamCounts, specializations],
  );

  const updateCount = useCallback((key: string, delta: number) => {
    markStart();
    setSelectedPod(null);
    setTeamCounts((prev) => ({ ...prev, [key]: Math.max(0, (prev[key] || 0) + delta) }));
  }, [markStart]);

  /** Applies a 1-click Blueprint Pod: team shape, focus areas, seniority preset and (if the pod defines one) complexity tier. */
  const setPodState = useCallback((podKey: BlueprintPodKey) => {
    const pod = blueprintPods.find((p) => p.key === podKey);
    if (!pod) return;
    const nextCounts = Object.fromEntries(roleConfigs.map((r) => [r.key, pod.roleCounts[r.key] ?? 0]));
    const archetype = pod.archetype ?? macroArchetype ?? DEFAULT_ARCHETYPE;
    setSelectedPod(podKey);
    setTeamCounts(nextCounts);
    setSpecializations(Object.fromEntries(Object.entries(pod.specializations).map(([k, v]) => [k, [...(v ?? [])]])));
    setMacroArchetype(archetype);
    setSeniorityBreakdown(buildBreakdownForCounts(nextCounts, archetype));
    if (pod.complexity) setComplexityTier(pod.complexity);
  }, [macroArchetype]);

  /**
   * A visitor clicking a pod card. Separate from setPodState because a pod
   * arriving in a link is not an interaction: it must not report
   * `gcc_calc_start`, which is the campaign's "someone began configuring"
   * signal.
   */
  const applyBlueprintPod = useCallback((podKey: BlueprintPodKey) => {
    markStart();
    setPodState(podKey);
    trackEvent("cta_click", { location: "cost_calculator_blueprint_pod", pod: podKey });
  }, [setPodState, markStart]);

  /** Toggling a macro archetype re-ratios every active role's seats instantly. */
  const applyArchetype = useCallback((key: MacroArchetypeKey) => {
    markStart();
    setMacroArchetype(key);
    setSeniorityBreakdown(buildBreakdownForCounts(teamCounts, key));
  }, [teamCounts, markStart]);

  /** Sets one seat's tier directly. Leaves the macro preset as "custom". */
  const setSeatLevel = useCallback((roleKey: string, seatIndex: number, level: number) => {
    markStart();
    setMacroArchetype(null);
    setSeniorityBreakdown((prev) => {
      const seats = [...(prev[roleKey] ?? [])];
      if (seats[seatIndex] === level) return prev;
      seats[seatIndex] = level;
      return { ...prev, [roleKey]: seats };
    });
  }, [markStart]);

  const toggleSpecialization = useCallback((roleKey: string, specKey: string) => {
    setSpecializations((prev) => {
      const current = prev[roleKey] ?? [];
      const next = current.includes(specKey) ? current.filter((k) => k !== specKey) : [...current, specKey];
      return { ...prev, [roleKey]: next };
    });
  }, []);

  const toggleServingStack = useCallback((key: string) => {
    setServingStack((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }, []);

  const effectiveCity: CityKey = city ?? "hyderabad";
  const showCloudDrawer = (teamCounts["devops"] || 0) > 0;
  const activeArchetype = macroArchetype ? macroArchetypes.find((a) => a.key === macroArchetype) ?? null : null;
  const activeComplexity = complexityTiers.find((c) => c.key === complexityTier) ?? complexityTiers[0];

  const podInput = useMemo(
    () => ({ teamCounts, seniorityBreakdown, specializations, complexityTier, includeSME }),
    [teamCounts, seniorityBreakdown, specializations, complexityTier, includeSME],
  );
  const recommendations = useMemo(() => buildRecommendations(podInput), [podInput]);
  const podRecommendations = recommendations.filter((r) => !r.roleKey);
  const gapCount = recommendations.filter((r) => r.kind === "gap").length;
  const suggestedTier = useMemo(() => suggestedComplexityTier(podInput), [podInput]);

  const costInput = useMemo(
    () => ({
      seniorityBreakdown,
      complexityMultiplier: activeComplexity.multiplier,
      engagement: ENGAGEMENT,
      includeSME,
    }),
    [seniorityBreakdown, activeComplexity, includeSME],
  );

  const costs = useMemo(() => computeCosts({ ...costInput, city: effectiveCity }), [costInput, effectiveCity]);

  /** The same team, priced in every city, for the comparison strip. */
  const cityCosts = useMemo(
    () =>
      COMPARISON_CITIES.map((key) => ({
        key,
        label: cities.find((c) => c.key === key)?.label ?? key,
        monthly: computeCosts({ ...costInput, city: key }).monthly,
      })),
    [costInput],
  );

  const roleRows = useMemo(
    () => roleCostRows(seniorityBreakdown, effectiveCity, activeComplexity.multiplier),
    [seniorityBreakdown, effectiveCity, activeComplexity],
  );

  const usTeam = useMemo(
    () => usEquivalent(seniorityBreakdown, effectiveCity, activeComplexity.multiplier),
    [seniorityBreakdown, effectiveCity, activeComplexity],
  );

  const savings = {
    low: Math.max(0, usTeam.low - costs.annual.high),
    high: Math.max(0, usTeam.high - costs.annual.low),
  };
  const savingsPct = {
    low: usTeam.low > 0 ? Math.round(((usTeam.low - costs.annual.high) / usTeam.low) * 100) : 0,
    high: usTeam.high > 0 ? Math.round(((usTeam.high - costs.annual.low) / usTeam.high) * 100) : 0,
  };

  /** gcc_calc_result_viewed: once per configuration, and never for an empty team. */
  useEffect(() => {
    if (!showResults || totalTeam === 0 || costs.monthly.high <= 0) return;
    const bucket = bucketForRange(costs.monthly.low, costs.monthly.high);
    const seniorityPreset = activeArchetype?.key ?? "custom";
    const signature = [effectiveCity, totalTeam, seniorityPreset, complexityTier, includeSME, bucket].join("|");
    if (viewedConfigsRef.current.has(signature)) return;
    viewedConfigsRef.current.add(signature);
    track("gcc_calc_result_viewed", {
      city: effectiveCity,
      team_size: totalTeam,
      seniority_preset: seniorityPreset,
      complexity_tier: complexityTier,
      sme_addon: includeSME,
      monthly_bucket: bucket,
      page_variant: pageVariant,
    });
  }, [showResults, totalTeam, costs, effectiveCity, activeArchetype, complexityTier, includeSME, pageVariant]);

  const scrollToForm = useCallback((immediate = false) => {
    if (!stepperRef.current) return;
    const yOffset = -70;
    const elementTop = stepperRef.current.getBoundingClientRect().top + window.scrollY;
    const targetY = Math.max(0, elementTop + yOffset);
    if (activeLenis) {
      activeLenis.scrollTo(targetY, { immediate });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: immediate ? ("instant" as ScrollBehavior) : "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToForm();
    const timer = setTimeout(() => {
      scrollToForm(true);
    }, 320);
    return () => clearTimeout(timer);
  }, [step, showResults, scrollToForm]);

  const canProceed = step === 0 ? totalTeam > 0 : true;

  const handleNext = () => {
    if (step < LAST_STEP) {
      setStep(step + 1);
      scrollToForm();
      return;
    }
    // Leaving the city step: step 2 is complete.
    track("gcc_calc_city_selected", { city: effectiveCity });
    setShowResults(true);
    scrollToForm();
    trackEvent("cost_calculator_complete", {
      total_team: totalTeam,
      city: effectiveCity,
      seniority: activeArchetype?.key ?? "custom",
      engagement: ENGAGEMENT,
      monthly_low: costs.monthly.low,
      monthly_high: costs.monthly.high,
    });
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      scrollToForm();
    } else if (step > 0) {
      setStep(step - 1);
      scrollToForm();
    }
  };

  const selectedClass = "bg-gradient-to-br from-[#00A3E0] to-[#008EC4] text-white border-2 border-white/60 shadow-md shadow-[#00A3E0]/30 ring-2 ring-[#00A3E0]/30";
  const idleClass = "bg-[#06224A]/70 hover:bg-[#0A2E63]/60 text-white border border-[#1E3A8A]/60 hover:border-[#00A3E0]/50 shadow-2xs transition-all";
  const compactStep = step > 0 && !showResults;
  const stepIndex = showResults ? STEPS.length : step;
  const currentStepIndex = showResults ? 2 : step;

  const leadFields = {
    totalTeam,
    roles: teamSummary,
    specializations: specializationSummary,
    city: city ? cities.find((c) => c.key === city)?.label ?? "" : "Let NeoIntelli recommend (Hyderabad baseline)",
    seniority: activeArchetype ? activeArchetype.label : "Custom seat mix",
    engagement: "Managed GCC",
    blueprintPod: selectedPod ? blueprintPods.find((p) => p.key === selectedPod)?.label ?? "" : "Custom build",
    complexityTier: activeComplexity.label,
    cloudProvider: showCloudDrawer ? cloudProviders.find((p) => p.key === cloudProvider)?.label ?? "" : "",
    smeIncluded: includeSME ? "Yes" : "No",
    monthlyLow: costs.monthly.low,
    monthlyHigh: costs.monthly.high,
    annualLow: costs.annual.low,
    annualHigh: costs.annual.high,
    salaryLow: costs.salary.low,
    salaryHigh: costs.salary.high,
    infraLow: costs.infra.low,
    infraHigh: costs.infra.high,
    opsLow: costs.ops.low,
    opsHigh: costs.ops.high,
    partnerLow: costs.partner.low,
    partnerHigh: costs.partner.high,
    smeLow: costs.sme.low,
    smeHigh: costs.sme.high,
    usEquivLow: usTeam.low,
    usEquivHigh: usTeam.high,
    savingsLow: savings.low,
    savingsHigh: savings.high,
    savingsPctLow: savingsPct.low,
    savingsPctHigh: savingsPct.high,
  };

  return (
    <>
      <div ref={stepperRef} className="scroll-mt-20 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <p className="inline-block text-xs sm:text-[13px] font-bold font-mono text-[#008EC4] uppercase tracking-[0.22em] mb-2">
              {showResults ? "STEP 03 OF 03" : step === 0 ? "STEP 01 OF 03" : "STEP 02 OF 03"}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold font-manrope text-[#0D306C] tracking-tight leading-[1.15] mb-3">
              {showResults ? "Your GCC Cost Estimate" : step === 0 ? "Build your team" : "Where in India?"}
            </h2>
            <p className="text-base sm:text-[17px] text-[#505D74] leading-relaxed font-sans max-w-2xl mx-auto">
              {showResults
                ? `${totalTeam} people · ${cities.find((c) => c.key === effectiveCity)?.label} · ${activeArchetype ? activeArchetype.label : "Custom seat mix"} · ${activeComplexity.label}`
                : step === 0
                ? "Pick a blueprint, then fine-tune every seat: headcount, seniority and what each engineer should actually know."
                : "Location affects talent availability and cost."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ============================================================ */}
            {/* LEFT COLUMN: Vertical Stepper Card matching Image 2 */}
            {/* ============================================================ */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
              <div className="p-6 sm:p-7 shadow-xs relative overflow-hidden">

                {/* Vertical connected steps */}
                <div className="space-y-0">
                  {SIDEBAR_STEPS.map((s, idx) => {
                    const isCompleted = idx < currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    const isLast = idx === SIDEBAR_STEPS.length - 1;
                    const Icon = s.icon;

                    return (
                      <div key={s.stepNum} className="relative">
                        <div
                          className={`flex items-start gap-3.5 group ${
                            isCompleted ? "cursor-pointer" : ""
                          }`}
                          onClick={() => {
                            if (isCompleted) {
                              setStep(idx);
                              setShowResults(false);
                              scrollToForm();
                            }
                          }}
                        >
                          {/* Circular Badge */}
                          <div className="relative shrink-0 flex items-center justify-center">
                            {isCompleted ? (
                              <div className="w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                              </div>
                            ) : isActive ? (
                              <div className="w-9 h-9 rounded-full ring-4 ring-[#008EC4]/25 bg-[#0D306C] border-2 border-[#00A3E0] text-white flex items-center justify-center shadow-xs">
                                <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                              </div>
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-white border-2 border-[#CBD5E1] text-[#94A3B8] flex items-center justify-center font-bold text-xs">
                                {s.stepNum}
                              </div>
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="min-w-0 pt-0.5 pb-2">
                            <span
                              className={`block text-[10px] sm:text-2xs font-mono font-bold uppercase tracking-[0.16em] ${
                                isCompleted
                                  ? "text-[#10B981]"
                                  : isActive
                                  ? "text-[#008EC4]"
                                  : "text-[#94A3B8]"
                              }`}
                            >
                              STEP {idx + 1}
                            </span>
                            <p
                              className={`text-sm sm:text-[15px] font-manrope leading-snug ${
                                isCompleted
                                  ? "font-bold text-[#0D306C] group-hover:text-[#008EC4] transition-colors"
                                  : isActive
                                  ? "font-extrabold text-[#0D306C]"
                                  : "font-semibold text-[#94A3B8]"
                              }`}
                            >
                              {s.title}
                            </p>
                            <p
                              className={`text-2xs leading-snug mt-0.5 ${
                                isActive ? "text-[#505D74] font-medium" : "text-[#94A3B8]"
                              }`}
                            >
                              {s.description}
                            </p>
                          </div>
                        </div>

                        {/* Connecting Line Downward */}
                        {!isLast && (
                          <div
                            className={`w-[2.5px] ml-[17px] my-1 h-8 sm:h-10 rounded-full transition-colors ${
                              isCompleted ? "bg-[#10B981]" : "bg-[#E2E8F0]"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom-right faceted geometric watermark art matching Image 2 */}
                <div
                  className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none opacity-20 select-none"
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
              </div>
            </aside>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Redesigned Executive Calculator Panel in Navy Blue */}
            {/* ============================================================ */}
            <div className="lg:col-span-8 xl:col-span-9 min-w-0">
              {/* MOBILE TOP STEPPER CARD: Clean, compact horizontal progress */}
              <div className="block lg:hidden bg-white rounded-2xl border border-[#D2DCF0] p-4 sm:p-5 shadow-xs mb-6">
                {/* Top row with Step indicator & percent */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2.5 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="text-2xs sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#008EC4]">
                      STEP 0{currentStepIndex + 1} OF 03
                    </span>
                  </div>
                  <span className="text-2xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#00A3E0]/15 text-[#008EC4] border border-[#00A3E0]/30 tabular-nums">
                    {showResults ? "100% COMPLETE" : currentStepIndex === 0 ? "33% COMPLETE" : "66% COMPLETE"}
                  </span>
                </div>

                {/* Current Step Title */}
                <div className="mb-3.5">
                  <h3 className="text-sm sm:text-base font-extrabold font-manrope text-[#0D306C] tracking-tight">
                    {SIDEBAR_STEPS[currentStepIndex]?.title || "Cost & Savings Breakdown"}
                  </h3>
                  <p className="text-2xs text-[#505D74] mt-0.5 font-sans">
                    {SIDEBAR_STEPS[currentStepIndex]?.description}
                  </p>
                </div>

                {/* Horizontal Stepper Row */}
                <div className="relative pt-1 pb-1">
                  {/* Connector Track */}
                  <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#E2E8F0] -z-0" />
                  <div
                    className="absolute top-4 left-6 h-0.5 bg-[#10B981] transition-all duration-300 -z-0"
                    style={{
                      width:
                        currentStepIndex === 0
                          ? "0%"
                          : currentStepIndex === 1
                          ? "50%"
                          : "100%",
                    }}
                  />

                  <div className="flex items-center justify-between relative z-10">
                    {SIDEBAR_STEPS.map((s, idx) => {
                      const isCompleted = idx < currentStepIndex;
                      const isActive = idx === currentStepIndex;
                      const Icon = s.icon;

                      return (
                        <button
                          key={s.stepNum}
                          type="button"
                          disabled={!isCompleted && !isActive}
                          onClick={() => {
                            if (isCompleted) {
                              setStep(idx);
                              setShowResults(false);
                              scrollToForm();
                            }
                          }}
                          className={`flex flex-col items-center group transition-all ${
                            isCompleted
                              ? "cursor-pointer"
                              : isActive
                              ? "cursor-default"
                              : "cursor-not-allowed opacity-60"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isCompleted
                                ? "bg-[#10B981] text-white shadow-xs group-hover:scale-105"
                                : isActive
                                ? "ring-3 ring-[#008EC4]/25 bg-[#0D306C] border-2 border-[#00A3E0] text-white shadow-xs"
                                : "bg-white border-2 border-[#CBD5E1] text-[#94A3B8]"
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                            ) : (
                              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#94A3B8]"}`} />
                            )}
                          </div>
                          <span
                            className={`text-2xs font-manrope font-bold mt-1.5 transition-colors ${
                              isActive
                                ? "text-[#0D306C]"
                                : isCompleted
                                ? "text-[#10B981]"
                                : "text-[#94A3B8]"
                            }`}
                          >
                            {idx === 0 ? "Team" : idx === 1 ? "Location" : "Estimate"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-[#012048] p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!showResults ? (
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step 1: team, seniority, focus areas and depth - one screen */}
                      {step === 0 && (
                        <div>
                          {prefilled && (
                            <div className="mb-6 rounded-2xl bg-[#06224A]/80 border border-[#00A3E0]/40 px-5 py-4 text-center">
                              <p className="text-sm font-bold font-manrope text-white">
                                We filled this in from your link - {totalTeam} {totalTeam === 1 ? "person" : "people"}.
                              </p>
                              <p className="text-sm text-slate-300 mt-1">Adjust anything below, then continue.</p>
                            </div>
                          )}

                          {/* 1-click blueprint pods */}
                          <p className="block text-xs sm:text-[13px] font-bold text-white uppercase tracking-[0.18em] mb-3">
                            1-click blueprint selection
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                            {blueprintPods.map((pod) => {
                              const active = selectedPod === pod.key;
                              return (
                                <button
                                  key={pod.key}
                                  type="button"
                                  onClick={() => applyBlueprintPod(pod.key)}
                                  className={`group relative text-left p-4 pt-8 sm:pt-9 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[112px] ${
                                    active
                                      ? "bg-gradient-to-br from-[#00A3E0] to-[#008EC4] text-white border-2 border-white/60 shadow-lg shadow-[#00A3E0]/35 ring-2 ring-[#00A3E0]/30"
                                      : "bg-[#06224A]/70 hover:bg-[#0A2E63]/60 text-white border border-[#1E3A8A]/60 hover:border-[#00A3E0]/50 shadow-2xs"
                                  }`}
                                >
                                  {/* Gift-style ribbon/tag in the top-right corner */}
                                  {pod.badge && (
                                    <div className="absolute top-0 right-0 z-10">
                                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#012048] text-[9px] sm:text-[9.5px] font-extrabold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-bl-xl rounded-tr-2xl shadow-md border-b border-l border-amber-300/40">
                                        <Gift className="w-2.5 h-2.5 text-[#012048] shrink-0" aria-hidden="true" />
                                        {pod.badge}
                                      </span>
                                    </div>
                                  )}

                                  <div>
                                    <p className="text-sm sm:text-[15px] font-extrabold font-manrope text-white tracking-tight leading-snug mb-1.5 group-hover:text-[#38BDF8] transition-colors">
                                      {pod.label}
                                    </p>
                                    <p className={`text-2xs sm:text-[11.5px] leading-snug ${active ? "text-sky-50 font-medium" : "text-slate-300"}`}>
                                      {pod.tagline}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Dynamic cloud & serving environment drawer */}
                          <AnimatePresence>
                            {showCloudDrawer && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden mb-8"
                              >
                                <div className="rounded-2xl bg-[#06224A]/80 border border-[#1E3A8A] p-5">
                                  <p className="flex items-center gap-2 text-xs font-bold font-manrope text-white mb-4">
                                    <Cloud className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" /> Cloud &amp; serving environment
                                  </p>
                                  <div className="mb-4">
                                    <p className="text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">Primary target cloud</p>
                                    <div className="flex flex-wrap gap-2">
                                      {cloudProviders.map((provider) => (
                                        <button
                                          key={provider.key}
                                          type="button"
                                          onClick={() => setCloudProvider(provider.key)}
                                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-manrope transition-colors cursor-pointer ${
                                            cloudProvider === provider.key ? "bg-[#00A3E0] text-white shadow-xs" : "bg-[#0A2E63] text-slate-200 border border-[#1E3A8A] hover:border-[#00A3E0]/60"
                                          }`}
                                        >
                                          {provider.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">Model serving stack</p>
                                    <div className="flex flex-wrap gap-2">
                                      {servingStackOptions.map((stack) => {
                                        const checked = servingStack.includes(stack.key);
                                        return (
                                          <button
                                            key={stack.key}
                                            type="button"
                                            onClick={() => toggleServingStack(stack.key)}
                                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-manrope transition-colors cursor-pointer ${
                                              checked ? "bg-[#00A3E0] text-white shadow-xs" : "bg-[#0A2E63] text-slate-200 border border-[#1E3A8A] hover:border-[#00A3E0]/60"
                                            }`}
                                          >
                                            {checked && <Check className="w-3 h-3" aria-hidden="true" />} {stack.label}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Seniority preset - applies to every seat, still editable per seat below */}
                          <p className="block text-xs sm:text-[13px] font-bold text-white uppercase tracking-[0.18em] mb-1">
                            Seniority preset
                          </p>
                          <p className="text-xs text-slate-300 mb-3">
                            Sets every seat at once. Change any single seat below and it becomes a custom mix.
                          </p>
                          <div className="grid sm:grid-cols-3 gap-3 mb-8">
                            {macroArchetypes.map((preset) => {
                              const active = macroArchetype === preset.key;
                              return (
                                <button
                                  key={preset.key}
                                  type="button"
                                  onClick={() => applyArchetype(preset.key)}
                                  className={`text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer ${active ? selectedClass : idleClass}`}
                                >
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <p className="text-sm font-bold font-manrope text-white">{preset.label}</p>
                                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                      active ? "border-white bg-white" : "border-[#334E7B] bg-transparent"
                                    }`}>
                                      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#008EC4]" />}
                                    </span>
                                  </div>
                                  <p className={`text-2xs font-semibold mt-1 ${active ? "text-white font-bold" : "text-[#38BDF8]/90"}`}>{preset.ratioLabel}</p>
                                  <p className={`text-2xs mt-1 leading-snug ${active ? "text-sky-50 font-medium" : "text-slate-300"}`}>{preset.description}</p>
                                </button>
                              );
                            })}
                          </div>

                          {/* Roles: headcount, per-seat seniority, focus areas, advice */}
                          <p className="block text-xs sm:text-[13px] font-bold text-white uppercase tracking-[0.18em] mb-1">
                            Review &amp; fine-tune team composition
                          </p>
                          <p className="text-xs text-slate-300 mb-3">
                            Add a seat to a role and it opens up: set each seat&apos;s level and tick what the engineer should know.
                            {!macroArchetype && " Custom seat mix in use."}
                          </p>
                          <div className="space-y-3">
                            {roleConfigs.map((role) => {
                              const count = teamCounts[role.key] || 0;
                              const seats = seniorityBreakdown[role.key] ?? [];
                              const chosen = specializations[role.key] ?? [];
                              const roleRecs = recommendations.filter((r) => r.roleKey === role.key);
                              return (
                                <div
                                  key={role.key}
                                  className={`rounded-2xl transition-colors border ${
                                    count > 0 ? "bg-[#06224A]/80 border-2 border-[#00A3E0]/50 shadow-sm" : "bg-[#06224A]/40 border border-[#1E3A8A]/60"
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                                    <div className="min-w-0">
                                      <p className="text-sm font-bold font-manrope text-white">{role.label}</p>
                                      <p className="text-2xs text-slate-300 leading-snug mt-0.5">{role.note}</p>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                      <button
                                        onClick={() => updateCount(role.key, -1)}
                                        className="w-8 h-8 rounded-full bg-[#0A2E63] border border-[#1E3A8A] text-white hover:border-[#00A3E0] hover:text-[#38BDF8] flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:border-[#1E3A8A] disabled:hover:text-white cursor-pointer disabled:cursor-not-allowed"
                                        disabled={count === 0}
                                        aria-label={`Decrease ${role.label}`}
                                      >
                                        <Minus className="w-3.5 h-3.5" />
                                      </button>
                                      <span className="w-8 text-center tabular-nums font-bold text-sm text-white">{count}</span>
                                      <button
                                        onClick={() => updateCount(role.key, 1)}
                                        className="w-8 h-8 rounded-full bg-[#0A2E63] border border-[#1E3A8A] text-white hover:border-[#00A3E0] hover:text-[#38BDF8] flex items-center justify-center transition-colors cursor-pointer"
                                        aria-label={`Increase ${role.label}`}
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  <AnimatePresence initial={false}>
                                    {count > 0 && (
                                      <motion.div
                                        key="details"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4 border-t border-[#1E3A8A] pt-4">
                                          <div>
                                            <p className="text-2xs font-bold text-white uppercase tracking-[0.18em] mb-2">Seniority per seat</p>
                                            <div className="space-y-1.5">
                                              {seats.map((tier, seatIndex) => (
                                                <div key={seatIndex} className="flex items-center gap-2">
                                                  {seats.length > 1 && (
                                                    <span className="text-2xs font-medium text-slate-300 w-12 shrink-0">Seat {seatIndex + 1}</span>
                                                  )}
                                                  <div className="inline-flex flex-wrap gap-1">
                                                    {seniorityLevels.map((level) => {
                                                      const active = tier === level.key;
                                                      return (
                                                        <button
                                                          key={level.key}
                                                          type="button"
                                                          onClick={() => setSeatLevel(role.key, seatIndex, level.key)}
                                                          aria-pressed={active}
                                                          title={level.label}
                                                          className={`px-2.5 py-1 rounded-full text-2xs font-semibold transition-colors cursor-pointer ${
                                                            active
                                                              ? "bg-[#00A3E0] text-white shadow-xs"
                                                              : "bg-[#0A2E63] text-slate-300 border border-[#1E3A8A] hover:text-white hover:border-[#00A3E0]/50"
                                                          }`}
                                                        >
                                                          {level.shortLabel}
                                                        </button>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div>
                                            <p className="text-2xs font-bold text-white uppercase tracking-[0.18em] mb-2">Focus areas - what should they know?</p>
                                            <div className="flex flex-wrap gap-1.5">
                                              {role.specializations.map((spec) => {
                                                const active = chosen.includes(spec.key);
                                                return (
                                                  <button
                                                    key={spec.key}
                                                    type="button"
                                                    onClick={() => toggleSpecialization(role.key, spec.key)}
                                                    aria-pressed={active}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-semibold transition-colors cursor-pointer ${
                                                      active
                                                        ? "bg-[#00A3E0] text-white border border-[#38BDF8]"
                                                        : "bg-[#0A2E63] text-slate-300 border border-[#1E3A8A] hover:text-white hover:border-[#00A3E0]/50"
                                                    }`}
                                                  >
                                                    {active && <Check className="w-3 h-3 text-white" aria-hidden="true" />}
                                                    {spec.label}
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </div>

                                          {roleRecs.length > 0 && (
                                            <div className="space-y-1.5">
                                              {roleRecs.map((rec) => (
                                                <RecommendationNote key={rec.id} rec={rec} compact />
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-6 text-center">
                            <p className="text-sm text-slate-300">Team size: <span className="font-bold text-white">{totalTeam} people &amp; leads</span></p>
                          </div>

                          {/* NeoIntelli's read on the pod */}
                          {totalTeam > 0 && (
                            <div className="mt-8 rounded-2xl border border-[#00A3E0]/40 bg-[#06224A]/80 p-5">
                              <div className="flex items-start gap-3 mb-4">
                                {gapCount === 0 ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                                ) : (
                                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                                )}
                                <div>
                                  <p className="text-sm font-bold font-manrope text-white">
                                    {gapCount === 0
                                      ? "NeoIntelli's read: this pod can run autonomously"
                                      : `NeoIntelli's read: ${gapCount} ${gapCount === 1 ? "gap" : "gaps"} to close before this pod runs on its own`}
                                  </p>
                                  <p className="text-2xs text-slate-300 mt-0.5">
                                    What we would say on the first call. Advice only - the estimate is your configuration, not ours.
                                  </p>
                                </div>
                              </div>
                              {podRecommendations.length > 0 ? (
                                <div className="space-y-2">
                                  {podRecommendations.map((rec) => (
                                    <RecommendationNote key={rec.id} rec={rec} />
                                  ))}
                                </div>
                              ) : (
                                <p className="text-2xs text-slate-300">
                                  Shape, seniority and infra coverage all check out. Per-role notes, if any, sit under each role above.
                                </p>
                              )}
                            </div>
                          )}

                          {/* Value-add capability multipliers */}
                          <p className="block text-xs sm:text-[13px] font-bold text-white uppercase tracking-[0.18em] mt-10 mb-1">
                            Value-add capability multipliers
                          </p>
                          <p className="text-xs text-slate-300 mb-3">
                            Adjust workload complexity tier to match the depth of AI &amp; infrastructure engineering.
                          </p>

                          <div className="grid sm:grid-cols-3 gap-3 mb-4">
                            {complexityTiers.map((tier) => {
                              const active = complexityTier === tier.key;
                              const suggested = tier.key === suggestedTier && totalTeam > 0;
                              return (
                                <button
                                  key={tier.key}
                                  type="button"
                                  onClick={() => setComplexityTier(tier.key)}
                                  className={`text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                    active ? selectedClass : idleClass
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                      <p className="text-sm font-bold font-manrope text-white">{tier.label}</p>
                                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                        active ? "border-white bg-white" : "border-[#334E7B] bg-transparent"
                                      }`}>
                                        {active && <span className="w-1.5 h-1.5 rounded-full bg-[#008EC4]" />}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                      <p className={`text-2xs font-semibold ${active ? "text-white font-bold" : "text-[#38BDF8]"}`}>
                                        {tier.multiplier > 0 ? `+${Math.round(tier.multiplier * 100)}% rate` : "Baseline rate"}
                                      </p>
                                      {suggested && (
                                        <span className={`text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-bold ${
                                          active ? "bg-white/20 text-white" : "bg-[#00A3E0]/20 text-[#38BDF8]"
                                        }`}>
                                          Suggested
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-2xs mt-1 leading-snug ${active ? "text-sky-50 font-medium" : "text-slate-300"}`}>
                                      {tier.description}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <button
                            type="button"
                            onClick={() => setIncludeSME((v) => !v)}
                            className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-start gap-3 mb-8 cursor-pointer ${
                              includeSME ? selectedClass : idleClass
                            }`}
                          >
                            <span className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                              includeSME ? "border-white bg-white text-[#008EC4]" : "bg-[#0A2E63] border-[#1E3A8A]"
                            }`}>
                              {includeSME && <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-bold font-manrope text-white flex items-center gap-1.5">
                                  <Sparkles className={`w-3.5 h-3.5 ${includeSME ? "text-amber-300" : "text-[#38BDF8]"}`} aria-hidden="true" />
                                  Strategic advisory add-on: Fractional Principal AI SME (10-15 hrs/month)
                                </span>
                                <span className={`text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold shrink-0 hidden sm:inline-block ${
                                  includeSME ? "bg-white/20 text-white" : "bg-[#00A3E0]/20 text-[#38BDF8]"
                                }`}>
                                  Optional
                                </span>
                              </div>
                              <span className={`block text-2xs mt-1 leading-snug ${includeSME ? "text-sky-50 font-medium" : "text-slate-300"}`}>
                                Weekly architectural code reviews, RFC validation &amp; benchmark audits
                              </span>
                            </div>
                          </button>

                          <div className="rounded-2xl bg-gradient-to-br from-[#0A2E63] via-[#0D306C] to-[#012048] p-5 sm:p-6 text-center text-white border border-[#00A3E0]/50 shadow-lg">
                            <p className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-1">Estimated monthly cost</p>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-manrope text-white tracking-tight tabular-nums">
                              <AnimatedNumber value={costs.monthly.low} prefix="$" /> - <AnimatedNumber value={costs.monthly.high} prefix="$" /> / month
                            </p>
                            <p className="text-slate-300 text-2xs mt-1">Bengaluru rates until you pick a city on the next step.</p>
                          </div>

                          <IncludesExcludes includeSME={includeSME} />
                        </div>
                      )}

                      {/* Step 2: City */}
                      {step === 1 && (
                        <div>
                          <p className="block text-xs sm:text-[13px] font-bold text-white uppercase tracking-[0.18em] mb-4">
                            Select primary delivery location in India
                          </p>
                          <div className="space-y-3">
                            {cities.map((c) => {
                              const active = city === c.key;
                              return (
                                <button
                                  key={c.key}
                                  type="button"
                                  onClick={() => setCity(c.key)}
                                  className={`w-full text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer ${active ? selectedClass : idleClass}`}
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm sm:text-base font-bold font-manrope text-white">{c.label}</p>
                                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                      active ? "border-white bg-white" : "border-[#334E7B] bg-transparent"
                                    }`}>
                                      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#008EC4]" />}
                                    </span>
                                  </div>
                                  <p className={`text-xs sm:text-sm mt-1 ${active ? "text-sky-50 font-medium" : "text-slate-300"}`}>{c.description}</p>
                                </button>
                              );
                            })}
                            <button
                              type="button"
                              onClick={() => setCity(null)}
                              className={`w-full text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer ${city === null ? selectedClass : idleClass}`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-sm sm:text-base font-bold font-manrope text-white">Let NeoIntelli recommend</p>
                                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  city === null ? "border-white bg-white" : "border-[#334E7B] bg-transparent"
                                }`}>
                                  {city === null && <span className="w-1.5 h-1.5 rounded-full bg-[#008EC4]" />}
                                </span>
                              </div>
                              <p className={`text-xs sm:text-sm mt-1 ${city === null ? "text-sky-50 font-medium" : "text-slate-300"}`}>Based on your needs (estimate uses Hyderabad as baseline)</p>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between items-center mt-8 pt-6">
                        <button
                          onClick={handleBack}
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold font-manrope transition-colors cursor-pointer ${
                            step === 0
                              ? "invisible"
                              : "bg-[#06224A] hover:bg-[#0A2E63] text-white border border-[#1E3A8A] shadow-2xs"
                          }`}
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={!canProceed}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold font-manrope text-white transition-all shadow-md shadow-[#00A3E0]/25 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed bg-[#00A3E0] hover:bg-[#008EC4] cursor-pointer"
                        >
                          {step === LAST_STEP ? "See Estimate" : "Continue to City"} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* Step 3: results */
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A8A] pb-4">
                        <p className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-[0.18em]">
                          Executive Summary &amp; Projections
                        </p>
                        <span className="text-2xs font-bold font-mono px-3 py-1 rounded-full bg-[#00A3E0]/20 text-[#38BDF8] border border-[#00A3E0]/30 uppercase tracking-wider">
                          {totalTeam} {totalTeam === 1 ? "Seat" : "Seats"} · {cities.find((c) => c.key === effectiveCity)?.label}
                        </span>
                      </div>

                      {/* (a) The number */}
                      <div className="space-y-4 mb-10">
                        {/* Monthly Cost */}
                        <div className="rounded-2xl bg-gradient-to-r from-[#008EC4] to-[#007AA8] p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md">
                          <div>
                            <p className="text-white/90 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
                              Estimated Monthly Cost
                            </p>
                            <p className="text-2xs sm:text-xs text-sky-100 mt-0.5 font-sans">
                              Fully loaded monthly delivery rate based on your selected city &amp; seniority
                            </p>
                          </div>
                          <p className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-manrope text-white tracking-tight tabular-nums whitespace-nowrap">
                            <AnimatedNumber value={costs.monthly.low} prefix="$" /> - <AnimatedNumber value={costs.monthly.high} prefix="$" />
                            <span className="text-xs sm:text-sm font-medium text-white/80 ml-1.5 font-sans">/ month</span>
                          </p>
                        </div>

                        {/* Annual Cost */}
                        <div className="rounded-2xl bg-gradient-to-r from-[#0A2E63] via-[#0D306C] to-[#012048] p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md border border-[#00A3E0]/40">
                          <div>
                            <p className="text-[#38BDF8] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
                              Estimated Annual Cost
                            </p>
                            <p className="text-2xs sm:text-xs text-slate-300 mt-0.5 font-sans">
                              Full 12-month all-inclusive operational projection
                            </p>
                          </div>
                          <p className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-manrope text-white tracking-tight tabular-nums whitespace-nowrap">
                            <AnimatedNumber value={costs.annual.low} prefix="$" /> - <AnimatedNumber value={costs.annual.high} prefix="$" />
                            <span className="text-xs sm:text-sm font-medium text-slate-300 ml-1.5 font-sans">/ year</span>
                          </p>
                        </div>
                      </div>

                      {/* (b) Per-role breakdown */}
                      <div className="rounded-2xl bg-[#06224A]/80 border border-[#1E3A8A] p-6 md:p-7 mb-10 shadow-2xs">
                        <h3 className="text-xl sm:text-[22px] font-extrabold font-manrope text-white tracking-tight leading-snug mb-1">
                          Your team, role by role
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed font-sans">
                          Fully loaded salary and statutory cost per role. Workspace, IT, operations and the NeoIntelli fee are team-wide and sit in the cost breakdown below.
                        </p>
                        <div className="overflow-x-auto -mx-2">
                          <table className="w-full min-w-[420px]">
                            <thead>
                              <tr className="border-b border-[#1E3A8A]">
                                <th className="text-left py-3 px-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.16em]">Role</th>
                                <th className="text-right py-3 px-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.16em]">Seats</th>
                                <th className="text-left py-3 px-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.16em]">Level</th>
                                <th className="text-right py-3 px-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.16em]">Monthly</th>
                              </tr>
                            </thead>
                            <tbody>
                              {roleRows.map((row) => (
                                <tr key={`${row.roleKey}-${row.level}`} className="border-b border-[#1E3A8A]/50">
                                  <td className="py-3 px-2 text-sm font-manrope font-bold text-white">{row.role}</td>
                                  <td className="py-3 px-2 text-sm text-slate-300 text-right tabular-nums">{row.seats}</td>
                                  <td className="py-3 px-2 text-sm text-slate-300">{row.level}</td>
                                  <td className="py-3 px-2 text-sm font-semibold text-white text-right tabular-nums">
                                    ${row.monthly.low.toLocaleString()} - ${row.monthly.high.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* (c) City comparison */}
                      <div className="mb-10">
                        <h3 className="text-xl sm:text-[22px] font-extrabold font-manrope text-white tracking-tight leading-snug mb-1">
                          The same team, priced by city
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-sans">
                          Monthly, all-in. {city ? "Your selection is highlighted." : "No city chosen - Hyderabad is the baseline."}
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {cityCosts.map((entry) => {
                            const active = entry.key === effectiveCity;
                            return (
                              <div
                                key={entry.key}
                                className={`rounded-2xl p-4 border transition-colors ${
                                  active
                                    ? "bg-[#0A2E63] text-white border-2 border-[#00A3E0] shadow-md shadow-[#00A3E0]/20"
                                    : "bg-[#06224A]/70 border border-[#1E3A8A]/60"
                                }`}
                              >
                                <p className="text-xs sm:text-sm font-bold font-manrope text-white">{entry.label}</p>
                                <p className={`text-sm sm:text-base font-extrabold font-manrope mt-1 tabular-nums ${active ? "text-[#38BDF8]" : "text-white"}`}>
                                  ${entry.monthly.low.toLocaleString()} - ${entry.monthly.high.toLocaleString()}
                                </p>
                                <p className={`text-2xs mt-1 ${active ? "text-slate-200" : "text-slate-300"}`}>per month</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* (d) US comparison */}
                      <div className="rounded-2xl border border-[#1E3A8A] p-6 mb-10 bg-[#06224A]/60 text-white shadow-2xs">
                        <p className="text-sm sm:text-base font-bold font-manrope text-white">
                          Equivalent US team: approximately ${roundToNearest10k(usTeam.low).toLocaleString()} to ${roundToNearest10k(usTeam.high).toLocaleString()} per year.
                        </p>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                          {usTeam.modeledSeats === 0
                            ? "Based on the published US total-compensation ranges in our India GCC cost guide."
                            : `Based on the published US total-compensation ranges in our India GCC cost guide for ${usTeam.publishedSeats} of ${usTeam.publishedSeats + usTeam.modeledSeats} seats; the remaining seats use NeoIntelli's India-to-US cost model until published ranges are confirmed for those roles.`}
                        </p>
                        {savings.high > 0 && (
                          <p className="text-xs sm:text-sm font-bold font-manrope text-emerald-400 mt-3">
                            Estimated annual saving: ${savings.low.toLocaleString()} - ${savings.high.toLocaleString()} ({savingsPct.low}-{savingsPct.high}%).
                          </p>
                        )}
                      </div>

                      {/* (e) Engagement models */}
                      <div className="mb-10">
                        <h3 className="text-xl sm:text-[22px] font-extrabold font-manrope text-white tracking-tight leading-snug mb-1">
                          How you can hold the team
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-sans">
                          The estimate above is priced on our managed model. Ownership is a separate decision.
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {ENGAGEMENT_CARDS.map((card) => (
                            <div key={card.title} className="rounded-2xl bg-[#06224A]/70 border border-[#1E3A8A] p-4">
                              <p className="text-xs sm:text-sm font-bold font-manrope text-white">{card.title}</p>
                              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{card.line}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Category breakdown - what the total is made of */}
                      <div className="rounded-2xl bg-[#06224A]/80 border border-[#1E3A8A] p-6 md:p-7 mb-10 shadow-2xs">
                        <h3 className="text-xl sm:text-[22px] font-extrabold font-manrope text-white tracking-tight leading-snug mb-6">
                          Cost Breakdown
                        </h3>
                        <div className="overflow-x-auto -mx-2">
                          <table className="w-full min-w-[400px]">
                            <thead>
                              <tr className="border-b border-[#1E3A8A]">
                                <th className="text-left py-3 px-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.16em]">Category</th>
                                <th className="text-right py-3 px-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.16em]">Monthly</th>
                                <th className="text-right py-3 px-2 text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.16em]">Annual</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { label: "Salaries & Benefits", value: costs.salary },
                                { label: "Workspace & IT", value: costs.infra },
                                { label: "Operations & Compliance", value: costs.ops },
                                { label: "NeoIntelli Recruiting & Operations Fee", value: costs.partner },
                                ...(costs.sme.high > 0 ? [{ label: "Strategic Advisory (Fractional SME)", value: costs.sme }] : []),
                              ].map((row) => (
                                <tr key={row.label} className="border-b border-[#1E3A8A]/50">
                                  <td className="py-3 px-2 text-sm font-manrope font-bold text-white">{row.label}</td>
                                  <td className="py-3 px-2 text-sm text-slate-300 text-right font-mono">${Math.round(row.value.low / 12).toLocaleString()} - ${Math.round(row.value.high / 12).toLocaleString()}</td>
                                  <td className="py-3 px-2 text-sm text-slate-300 text-right font-mono">${row.value.low.toLocaleString()} - ${row.value.high.toLocaleString()}</td>
                                </tr>
                              ))}
                              <tr>
                                <td className="py-3 px-2 text-sm font-extrabold font-manrope text-white">Total</td>
                                <td className="py-3 px-2 text-sm font-extrabold font-manrope text-white text-right font-mono">${costs.monthly.low.toLocaleString()} - ${costs.monthly.high.toLocaleString()}</td>
                                <td className="py-3 px-2 text-sm font-extrabold font-manrope text-white text-right font-mono">${costs.annual.low.toLocaleString()} - ${costs.annual.high.toLocaleString()}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/*
                        The estimate deliberately does not net off government support: eligibility
                        is conditional, so subtracting it here would overstate the saving.
                      */}
                      <div className="rounded-2xl border border-[#1E3A8A] p-6 mb-10 bg-[#06224A]/60">
                        <p className="text-sm sm:text-base font-bold font-manrope text-white mb-2">Government incentives are not included</p>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          Applicable central or state support can improve GCC economics, but eligibility depends on the entity
                          structure, business activity, location, investment, employment and current policy conditions. This estimate
                          does not assume unverified incentives.
                        </p>
                        <a href="/services/gcc/location-strategy" className="inline-block mt-3 text-xs font-semibold text-[#38BDF8] hover:text-white underline underline-offset-2 transition-colors">
                          Evaluate location &amp; policy eligibility
                        </a>
                      </div>

                      {recommendations.length > 0 && (
                        <div className="rounded-2xl border border-[#1E3A8A] p-6 md:p-8 mb-10 bg-[#06224A]/60">
                          <h3 className="text-xl sm:text-[22px] font-extrabold font-manrope text-white tracking-tight leading-snug mb-1">
                            NeoIntelli&apos;s recommendations
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-sans">
                            Advice on the pod shape - it does not change the estimate above.
                          </p>
                          <div className="space-y-2">
                            {recommendations.map((rec) => (
                              <RecommendationNote key={rec.id} rec={rec} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* (f) Email me this estimate */}
                      <div className="mb-8">
                        <EstimateEmailForm pageVariant={pageVariant} fields={leadFields} />
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
                        <button
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold font-manrope bg-[#06224A] hover:bg-[#0A2E63] text-white border border-[#1E3A8A] transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" /> Edit Inputs
                        </button>
                        <a
                          href={CAL_COM_BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackBookCallClick("results")}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold font-manrope text-white bg-[#00A3E0] hover:bg-[#008EC4] shadow-md shadow-[#00A3E0]/25 hover:shadow-lg transition-all"
                        >
                          Discuss this estimate <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrustStrip />

      {/* (g) Sticky bar - rendered with the results, so nothing shifts under it */}
      {showResults && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#0D306C] bg-[#012048]/95 backdrop-blur-md px-4 sm:px-8 py-3 shadow-2xl text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <p className="text-xs leading-snug font-bold font-manrope text-white">
              Discuss this estimate: <span className="text-slate-300 font-medium">30-minute call with a GCC strategy lead</span>
            </p>
            <a
              href={CAL_COM_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookCallClick("sticky")}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold font-manrope text-white bg-[#00A3E0] hover:bg-[#008EC4] shadow-sm transition-colors"
            >
              Book a call <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/** What the estimate covers, and what it does not. Mirrors the rate engine. */
function IncludesExcludes({ includeSME }: { includeSME: boolean }) {
  const included = includeSME ? [...INCLUDED_LINES, "fractional principal AI SME"] : INCLUDED_LINES;
  return (
    <div className="mt-4 rounded-2xl border border-[#1E3A8A] bg-[#06224A]/60 p-4 sm:p-5 space-y-2 text-white">
      <p className="text-2xs leading-relaxed">
        <span className="font-bold text-white">Included:</span>{" "}
        <span className="text-slate-300">{included.join(", ")}.</span>
      </p>
      <p className="text-2xs leading-relaxed">
        <span className="font-bold text-white">Not included:</span>{" "}
        <span className="text-slate-300">{EXCLUDED_LINES.join(", ")}.</span>{" "}
        <a href={SETUP_COSTS_HREF} className="text-[#38BDF8] hover:text-white underline underline-offset-2 transition-colors">See setup costs</a>.
      </p>
      <p className="text-2xs text-slate-400 leading-relaxed">
        Rates updated {RATES_UPDATED} from NeoIntelli placements and published India benchmarks.
      </p>
    </div>
  );
}
