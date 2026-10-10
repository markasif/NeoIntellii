import { useEffect, useRef, useState } from "react";
import { Target, Clock, CheckCircle2 } from "lucide-react";
import { useInView, animate } from "framer-motion";
import { STRATEGY_LEAD, TRUST_CASE_LINE } from "@/data/gccCalculatorContent";
import { PRICING_DISCLAIMER } from "@/components/shared/PricingDisclaimer";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  trigger?: boolean;
}

function AnimatedCounter({ value, duration = 1.2, trigger }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "60px" });
  const shouldAnimate = trigger !== undefined ? (trigger || inView) : inView;
  const [count, setCount] = useState(value);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (shouldAnimate && !animatedRef.current) {
      animatedRef.current = true;
      setCount(0);

      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setCount(Math.round(latest)),
        onComplete: () => setCount(value),
      });

      return () => {
        controls.stop();
        setCount(value);
      };
    }
  }, [shouldAnimate, value, duration]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {count}
    </span>
  );
}

/**
 * Proof & Disclaimer strip under the calculator matching NeoIntelli redesigned pages:
 * Navy background with top organic wave divider, live animated counters,
 * and integrated dark pricing disclaimer footnote.
 */
export default function TrustStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "100px" });

  return (
    <section
      className="relative bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-x-clip font-sans"
    >
      {/* ── TOP ORGANIC WAVE SECTION DIVIDER (Light -> Navy) ─────────── */}
      <div className="absolute -top-[2px] sm:-top-[3px] inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 lg:h-16 xl:h-18 block pointer-events-none"
        >
          <path
            d="M0,-4 L1440,-4 L1440,30 C1300,32 1160,65 1000,82 C840,99 720,74 540,84 C360,94 200,136 0,136 Z"
            fill="#D2DCF0"
            opacity="0.6"
          />
          <path
            d="M0,-4 L1440,-4 L1440,22 C1300,24 1160,58 1000,74 C840,90 720,66 540,76 C360,86 200,126 0,126 Z"
            fill="#F0F5FA"
          />
        </svg>
      </div>

      {/* Ambient background glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-[0.18em] mb-2 font-mono">
            Proven Delivery Engine
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-manrope text-white tracking-tight leading-tight">
            Institutional Trust &amp; Scale
          </h3>
        </div>

        {/* 3 Metric Cards with Chamfered Cut & Live Animation */}
        <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5">
          {/* Card 1: 30+ GCCs Shaped */}
          <div
            className="relative p-3.5 sm:p-6 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-md transition-all duration-300 shadow-md group hover:-translate-y-1 text-left flex flex-col justify-between"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
            }}
          >
            <div>
              <div className="relative flex items-center justify-center w-7 h-8 sm:w-8 sm:h-9 mb-2 sm:mb-3">
                <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                  <polygon
                    points="27,3 50,16 50,44 27,57 4,44 4,16"
                    fill="rgba(255, 255, 255, 0.15)"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[#67D5F7]">
                  <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="flex items-baseline font-mono font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-none">
                <AnimatedCounter value={30} trigger={isInView} />
                <span className="text-base sm:text-xl lg:text-2xl font-bold ml-0.5 sm:ml-1 text-[#67D5F7]">+</span>
              </div>
              <div className="text-xs sm:text-sm font-bold font-manrope text-white mt-1.5 sm:mt-2 leading-tight">
                GCCs shaped
              </div>
            </div>
            <div className="text-right text-[9px] sm:text-[10px] text-[#CBD5E1] font-mono font-semibold uppercase tracking-wider mt-2.5 sm:mt-4">
              Lifecycle
            </div>
          </div>

          {/* Card 2: 48h First Response */}
          <div
            className="relative p-3.5 sm:p-6 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-md transition-all duration-300 shadow-md group hover:-translate-y-1 text-left flex flex-col justify-between"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
            }}
          >
            <div>
              <div className="relative flex items-center justify-center w-7 h-8 sm:w-8 sm:h-9 mb-2 sm:mb-3">
                <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                  <polygon
                    points="27,3 50,16 50,44 27,57 4,44 4,16"
                    fill="rgba(255, 255, 255, 0.15)"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[#67D5F7]">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="flex items-baseline font-mono font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-none">
                <AnimatedCounter value={48} trigger={isInView} />
                <span className="text-base sm:text-xl lg:text-2xl font-bold ml-0.5 sm:ml-1 text-[#67D5F7]">h</span>
              </div>
              <div className="text-xs sm:text-sm font-bold font-manrope text-white mt-1.5 sm:mt-2 leading-tight">
                First response
              </div>
            </div>
            <div className="text-right text-[9px] sm:text-[10px] text-[#CBD5E1] font-mono font-semibold uppercase tracking-wider mt-2.5 sm:mt-4">
              SLA
            </div>
          </div>

          {/* Card 3: 100% Senior-Led - Spans full width on mobile (Row 2) */}
          <div
            className="col-span-2 sm:col-span-1 relative p-3.5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#169DC8] via-[#0EA5C9] to-[#0D306C] border border-white/30 backdrop-blur-md transition-all duration-300 shadow-[0_10px_28px_rgba(22,157,200,0.3)] hover:shadow-[0_14px_35px_rgba(22,157,200,0.45)] group hover:-translate-y-1 text-left flex flex-row sm:flex-col items-center sm:items-stretch justify-between overflow-hidden"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-white/15 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center gap-3 sm:block">
              <div className="relative flex items-center justify-center w-7 h-8 sm:w-8 sm:h-9 mb-0 sm:mb-3 shrink-0">
                <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                  <polygon
                    points="27,3 50,16 50,44 27,57 4,44 4,16"
                    fill="rgba(255, 255, 255, 0.25)"
                    stroke="rgba(255, 255, 255, 0.55)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline font-mono font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-none">
                  <AnimatedCounter value={100} trigger={isInView} />
                  <span className="text-base sm:text-xl lg:text-2xl font-bold ml-0.5 sm:ml-1 text-white">%</span>
                </div>
                <div className="text-xs sm:text-sm font-bold font-manrope text-white mt-0.5 sm:mt-2 leading-tight">
                  Senior-led
                </div>
              </div>
            </div>
            <div className="relative z-10 text-right text-[9px] sm:text-[10px] text-white/90 font-mono font-semibold uppercase tracking-wider mt-0 sm:mt-4 shrink-0">
              Quality
            </div>
          </div>
        </div>

        {TRUST_CASE_LINE && (
          <p className="mt-8 text-center text-sm sm:text-base font-medium font-sans text-slate-200 leading-relaxed max-w-xl mx-auto">
            &ldquo;{TRUST_CASE_LINE}&rdquo;
          </p>
        )}

        {STRATEGY_LEAD && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <img
              src={STRATEGY_LEAD.photo}
              alt={STRATEGY_LEAD.name}
              width={48}
              height={48}
              loading="lazy"
              className="w-12 h-12 rounded-full object-cover border border-[#38BDF8]"
            />
            <div className="text-left">
              <p className="text-sm font-bold font-manrope text-white">{STRATEGY_LEAD.name}</p>
              <p className="text-xs text-slate-300">{STRATEGY_LEAD.title}</p>
            </div>
          </div>
        )}

        {/* ── INCLUDED PRICING DISCLAIMER & METHODOLOGY FOOTNOTE (NAVY DESIGN) ── */}
        <div className="mt-6 pt-8 text-center">
          <p
            id="pricing-note"
            className="text-xs text-slate-300/90 leading-relaxed max-w-3xl mx-auto font-sans"
          >
            <span className="text-[#38BDF8] font-bold text-sm leading-none mr-0.5">*</span>{" "}
            {PRICING_DISCLAIMER}
          </p>
          <p className="mt-3 text-2xs text-slate-400/80 leading-relaxed max-w-2xl mx-auto font-sans">
            Estimates are based on market data and NeoIntelli&apos;s experience building GCCs across India. Actual costs
            may vary based on specific requirements, timing, and market conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
