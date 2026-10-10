import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

export interface CapabilityItem {
  title: string;
  desc?: string;
  body?: string;
  icon: LucideIcon;
}

export type CapabilityVariant = "ai" | "hr" | "workforce" | "governance" | "scale" | "performance" | "workstreams" | "hub";

interface CapabilityGridProps {
  items: CapabilityItem[];
  variant?: CapabilityVariant;
  rowPattern?: number[];
  bottomPanels?: React.ReactNode;
  footer?: React.ReactNode;
}


// 3D Perspective Topological Particle Dot Wave rows (matching high-tech cyan particle lattice reference)
interface DotWaveRow {
  baseY: number;
  amp1: number;
  amp2: number;
  amp3: number;
  shift: number;
  strokeWidth: number;
  dash: string;
  opacity: number;
  color: string;
}

const DOT_WAVE_ROWS: DotWaveRow[] = [
  // Deep background perspective rows (tight, dense, subtle navy-cyan depth)
  { baseY: 30, amp1: 7, amp2: 2.5, amp3: 1.0, shift: 0, strokeWidth: 1.3, dash: "0.1 5.2", opacity: 0.30, color: "#16427D" },
  { baseY: 35, amp1: 8, amp2: 2.8, amp3: 1.2, shift: 6, strokeWidth: 1.4, dash: "0.1 5.5", opacity: 0.38, color: "#0E5A86" },
  { baseY: 40, amp1: 9, amp2: 3.2, amp3: 1.4, shift: 12, strokeWidth: 1.6, dash: "0.1 5.8", opacity: 0.45, color: "#0B6E9E" },
  { baseY: 46, amp1: 10, amp2: 3.6, amp3: 1.6, shift: 18, strokeWidth: 1.8, dash: "0.1 6.2", opacity: 0.55, color: "#008EC4" },
  { baseY: 52, amp1: 11, amp2: 4.0, amp3: 1.8, shift: 24, strokeWidth: 2.0, dash: "0.1 6.6", opacity: 0.65, color: "#00A3E0" },
  // Midground rising crest
  { baseY: 58, amp1: 13, amp2: 4.5, amp3: 2.2, shift: 30, strokeWidth: 2.2, dash: "0.1 7.0", opacity: 0.78, color: "#169DC8" },
  { baseY: 65, amp1: 14, amp2: 5.0, amp3: 2.5, shift: 36, strokeWidth: 2.5, dash: "0.1 7.4", opacity: 0.90, color: "#38BDF8" },
  // Main glowing luminous crest ridge (brand cyan crest)
  { baseY: 72, amp1: 16, amp2: 5.8, amp3: 2.8, shift: 42, strokeWidth: 2.8, dash: "0.1 7.8", opacity: 1.00, color: "#38BDF8" },
  { baseY: 79, amp1: 15, amp2: 5.2, amp3: 2.6, shift: 48, strokeWidth: 2.9, dash: "0.1 8.2", opacity: 0.95, color: "#22B8E6" },
  // Foreground descending slope (larger dots, wider spacing for 3D perspective)
  { baseY: 86, amp1: 13, amp2: 4.5, amp3: 2.2, shift: 54, strokeWidth: 3.0, dash: "0.1 8.6", opacity: 0.88, color: "#169DC8" },
  { baseY: 93, amp1: 12, amp2: 4.0, amp3: 1.8, shift: 60, strokeWidth: 3.1, dash: "0.1 9.0", opacity: 0.80, color: "#008EC4" },
  { baseY: 100, amp1: 10, amp2: 3.5, amp3: 1.5, shift: 66, strokeWidth: 3.2, dash: "0.1 9.4", opacity: 0.70, color: "#0B6E9E" },
  { baseY: 106, amp1: 9, amp2: 3.0, amp3: 1.2, shift: 72, strokeWidth: 3.3, dash: "0.1 9.8", opacity: 0.60, color: "#16427D" },
];

function buildDotWavePath(baseY: number, amp1: number, amp2: number, amp3: number, shift: number): string {
  const pts: string[] = [];
  const L = 200;
  for (let x = -200; x <= 400; x += 10) {
    const effX = x - shift;
    const rad1 = (effX * 2 * Math.PI) / L;
    const rad2 = (effX * 4 * Math.PI) / L;
    const rad3 = (effX * 6 * Math.PI) / L;
    const y = baseY + amp1 * Math.sin(rad1) + amp2 * Math.cos(rad2) + amp3 * Math.sin(rad3);
    pts.push(`${x === -200 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const PRECOMPUTED_DOT_PATHS = DOT_WAVE_ROWS.map((row) =>
  buildDotWavePath(row.baseY, row.amp1, row.amp2, row.amp3, row.shift)
);

/**
 * Custom SVG illustration component for AI Acceleration, HR Scope, Workforce Strategy, Governance, Scale, Parallel Workstreams & Recruitment Hub cards
 */
function CardIllustration({ index, variant }: { index: number; variant: CapabilityVariant }) {
  const idPrefix = `${variant}-${index}`;
  const waveSvgRef = useRef<SVGSVGElement | null>(null);
  const [waveActive, setWaveActive] = useState(true);

  // Only run the particle drift while this card is near the viewport, so
  // offscreen waves don't animate (and jank) during scroll.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const svg = waveSvgRef.current;
    if (!svg) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setWaveActive(entry.isIntersecting));
      },
      { rootMargin: "150px 0px" }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <div className="h-20 sm:h-24 w-full mt-2 pt-0.5 flex items-end justify-center overflow-hidden relative select-none pointer-events-none rounded-xl">
      {/* 3D Perspective Cyan Particle Dot Wave - All areas of CapabilityGrid use this animated dot wave */}
      <svg
        ref={waveSvgRef}
        viewBox="0 0 200 110"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {/* Deep Navy/Space Backdrop Gradient (brand navy) */}
          <linearGradient id={`${idPrefix}-dotwave-bg`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D244D" stopOpacity="0" />
            <stop offset="28%" stopColor="#0A224E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#061530" stopOpacity="0.98" />
          </linearGradient>

          {/* Ambient Radial Cyan Aura behind the crest (brand cyan) */}
          <radialGradient id={`${idPrefix}-ambient-glow`} cx="35%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.24" />
            <stop offset="50%" stopColor="#169DC8" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#061530" stopOpacity="0" />
          </radialGradient>

          {/* Soft luminous horizon band behind the crest */}
          <radialGradient id={`${idPrefix}-horizon`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Backdrop Deep Ocean / Cyber Night Fill */}
        <path
          d="M -200 32 Q -100 22, 0 32 Q 100 22, 200 32 Q 300 22, 400 32 L 400 110 L -200 110 Z"
          fill={`url(#${idPrefix}-dotwave-bg)`}
        />
        <rect x="0" y="24" width="200" height="86" fill={`url(#${idPrefix}-ambient-glow)`} />
        <ellipse cx="105" cy="72" rx="130" ry="16" fill={`url(#${idPrefix}-horizon)`} />

        {/* Layer 1: Background perspective dot rows (slower rightward drift) */}
        <g
          className={`cap-wave-layer${waveActive ? "" : " cap-wave-paused"}`}
          style={{ animationDuration: "26s" }}
        >
          {DOT_WAVE_ROWS.slice(0, 5).map((row, i) => (
            <path
              key={`bg-${i}`}
              d={PRECOMPUTED_DOT_PATHS[i]}
              fill="none"
              stroke={row.color}
              strokeWidth={row.strokeWidth}
              strokeLinecap="round"
              strokeDasharray={row.dash}
              opacity={row.opacity}
            />
          ))}
        </g>

        {/* Layer 2: Foreground luminous crest & front slopes (gentle rightward flow) */}
        <g
          className={`cap-wave-layer${waveActive ? "" : " cap-wave-paused"}`}
          style={{ animationDuration: "16s" }}
        >
          {DOT_WAVE_ROWS.slice(5).map((row, i) => {
            const actualIndex = i + 5;
            const isCrest = actualIndex === 7 || actualIndex === 8;
            return (
              <React.Fragment key={`fg-${actualIndex}`}>
                {isCrest && (
                  <path
                    d={PRECOMPUTED_DOT_PATHS[actualIndex]}
                    fill="none"
                    stroke={row.color}
                    strokeWidth={row.strokeWidth + 5}
                    strokeLinecap="round"
                    strokeDasharray={row.dash}
                    opacity={row.opacity * 0.18}
                  />
                )}
                <path
                  d={PRECOMPUTED_DOT_PATHS[actualIndex]}
                  fill="none"
                  stroke={row.color}
                  strokeWidth={row.strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={row.dash}
                  opacity={row.opacity}
                />
              </React.Fragment>
            );
          })}
        </g>
      </svg>

      {/* Foreground contextual vector elements */}
      <svg
        viewBox="0 0 200 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain object-bottom relative z-10"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${idPrefix}-wave`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDF5FD" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D4EAFB" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-cyan`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#008EC4" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-navy`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#123B7D" />
            <stop offset="100%" stopColor="#081E44" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-amber`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#DE8017" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-glass`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#EEF6FC" stopOpacity="0.8" />
          </linearGradient>
          <filter id={`${idPrefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>


        {variant === "ai" ? (
          /* ==========================================================
             AI ACCELERATION (14 CARDS)
             ========================================================== */
          index === 0 ? (
            /* 0. Recruitment screening: Candidate cards & inspection beam */
            <g transform="translate(10, 0)">
              {/* Back card */}
              <rect x="50" y="32" width="38" height="48" rx="6" fill={`url(#${idPrefix}-glass)`} stroke="#CDE0F3" strokeWidth="1" />
              <circle cx="69" cy="46" r="6" fill="#B8D5EF" />
              <rect x="58" y="58" width="22" height="3" rx="1.5" fill="#C5DBF0" />
              <rect x="62" y="64" width="14" height="2.5" rx="1.2" fill="#D5E6F5" />

              {/* Back card right */}
              <rect x="94" y="36" width="36" height="44" rx="6" fill={`url(#${idPrefix}-glass)`} stroke="#CDE0F3" strokeWidth="1" />
              <circle cx="112" cy="48" r="5" fill="#B8D5EF" />
              <rect x="103" y="59" width="18" height="3" rx="1.5" fill="#C5DBF0" />

              {/* Main highlighted front card */}
              <rect x="70" y="24" width="46" height="58" rx="7" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.4" filter={`url(#${idPrefix}-glow)`} />
              <circle cx="93" cy="42" r="8" fill={`url(#${idPrefix}-cyan)`} />
              <path d="M89 42 C89 39.5 91 38 93 38 C95 38 97 39.5 97 42" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="79" y="56" width="28" height="3.5" rx="1.7" fill="#0D306C" />
              <rect x="83" y="63" width="20" height="2.5" rx="1.2" fill="#008EC4" />
              
              {/* Verification check bubble */}
              <circle cx="110" cy="30" r="7" fill={`url(#${idPrefix}-amber)`} />
              <path d="M107 30 L109 32 L113 28" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Scan beam */}
              <line x1="66" y1="52" x2="120" y2="52" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />
            </g>
          ) : index === 1 ? (
            /* 1. Candidate evaluation: Scorecard with progress & stars */
            <g transform="translate(15, 0)">
              {/* Clipboard body */}
              <rect x="65" y="22" width="54" height="64" rx="8" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="80" y="18" width="24" height="7" rx="3.5" fill="#0D306C" />
              
              {/* Evaluation score ring */}
              <circle cx="92" cy="42" r="12" fill="#EDF6FD" stroke="#008EC4" strokeWidth="2.2" strokeDasharray="55 20" />
              <text x="92" y="45" textAnchor="middle" fill="#0D306C" fontSize="8" fontWeight="bold">94%</text>

              {/* Checkmark criteria bars */}
              <g transform="translate(73, 60)">
                <circle cx="3" cy="3" r="2.5" fill="#008EC4" />
                <rect x="9" y="1.5" width="28" height="3" rx="1.5" fill="#0D306C" />
              </g>
              <g transform="translate(73, 69)">
                <circle cx="3" cy="3" r="2.5" fill="#38BDF8" />
                <rect x="9" y="1.5" width="24" height="3" rx="1.5" fill="#505D74" />
              </g>

              {/* Star rating pill */}
              <rect x="110" y="48" width="28" height="15" rx="7.5" fill={`url(#${idPrefix}-amber)`} />
              <text x="124" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">★ 4.9</text>
            </g>
          ) : index === 2 ? (
            /* 2. Onboarding assistance: Welcoming avatar & concentric rings */
            <g transform="translate(10, 0)">
              {/* Concentric rings */}
              <circle cx="95" cy="52" r="38" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="95" cy="52" r="28" stroke="#008EC4" strokeWidth="1" opacity="0.4" />
              
              {/* Central badge */}
              <circle cx="95" cy="52" r="18" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.5" />
              <circle cx="95" cy="48" r="6" fill={`url(#${idPrefix}-cyan)`} />
              <path d="M87 59 C87 55 90.5 53 95 53 C99.5 53 103 55 103 59" fill="#0D306C" />

              {/* Joiner welcome tag */}
              <rect x="112" y="32" width="34" height="14" rx="4" fill="#FFFFFF" stroke="#DE8017" strokeWidth="1" />
              <text x="129" y="42" textAnchor="middle" fill="#DE8017" fontSize="7" fontWeight="bold">DAY 1 ✓</text>

              {/* Step counter pill */}
              <rect x="46" y="58" width="32" height="13" rx="6.5" fill="#0D306C" />
              <text x="62" y="67" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">Step 3/4</text>
            </g>
          ) : index === 3 ? (
            /* 3. HR knowledge assistant: AI Chat dialog & sparkles */
            <g transform="translate(10, 0)">
              {/* Left query bubble */}
              <rect x="44" y="24" width="62" height="24" rx="7" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="52" y="31" width="36" height="3" rx="1.5" fill="#505D74" />
              <rect x="52" y="37" width="24" height="3" rx="1.5" fill="#A0AEC0" />

              {/* Right AI response bubble */}
              <rect x="78" y="52" width="72" height="28" rx="8" fill={`url(#${idPrefix}-navy)`} />
              <rect x="88" y="60" width="46" height="3" rx="1.5" fill="#38BDF8" />
              <rect x="88" y="66" width="34" height="3" rx="1.5" fill="#FFFFFF" />

              {/* Sparkling 4-point stars */}
              <path d="M142 32 Q144 38 150 40 Q144 42 142 48 Q140 42 134 40 Q140 38 142 32 Z" fill={`url(#${idPrefix}-amber)`} />
              <path d="M68 62 Q69 66 73 67 Q69 68 68 72 Q67 68 63 67 Q67 66 68 62 Z" fill="#38BDF8" />
            </g>
          ) : index === 4 ? (
            /* 4. Policy search: Document clauses & magnifying inspection */
            <g transform="translate(15, 0)">
              {/* Document sheet */}
              <rect x="60" y="22" width="56" height="66" rx="6" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="68" y="30" width="26" height="3.5" rx="1.7" fill="#0D306C" />
              <rect x="68" y="38" width="40" height="2.5" rx="1.2" fill="#CBD5E1" />
              <rect x="68" y="44" width="36" height="2.5" rx="1.2" fill="#CBD5E1" />
              <rect x="68" y="50" width="38" height="2.5" rx="1.2" fill="#CBD5E1" />
              <rect x="68" y="56" width="30" height="2.5" rx="1.2" fill="#CBD5E1" />

              {/* Magnifying glass over clauses */}
              <circle cx="106" cy="54" r="16" fill="#FFFFFF" stroke="#008EC4" strokeWidth="2.5" filter={`url(#${idPrefix}-glow)`} />
              <line x1="118" y1="66" x2="132" y2="80" stroke="#0D306C" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M98 54 L103 54 M100 50 L112 50 M100 58 L110 58" stroke="#008EC4" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : index === 5 ? (
            /* 5. IT ticket triage: Ticket card & routing pathways */
            <g transform="translate(10, 0)">
              {/* Ticket console card */}
              <rect x="42" y="28" width="50" height="42" rx="7" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.4" />
              <rect x="48" y="35" width="22" height="3" rx="1.5" fill="#0D306C" />
              <rect x="48" y="41" width="36" height="2.5" rx="1.2" fill="#94A3B8" />
              <rect x="48" y="47" width="28" height="2.5" rx="1.2" fill="#94A3B8" />
              <rect x="48" y="55" width="18" height="6" rx="3" fill={`url(#${idPrefix}-amber)`} />
              <text x="57" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">P1</text>

              {/* Branching pathways */}
              <path d="M92 49 C110 49 110 32 126 32" stroke="#008EC4" strokeWidth="1.8" fill="none" strokeDasharray="3 2" />
              <path d="M92 49 L126 49" stroke="#0D306C" strokeWidth="1.8" fill="none" />
              <path d="M92 49 C110 49 110 68 126 68" stroke="#38BDF8" strokeWidth="1.8" fill="none" strokeDasharray="3 2" />

              {/* Destination nodes */}
              <circle cx="132" cy="32" r="5" fill="#38BDF8" />
              <circle cx="132" cy="49" r="6" fill="#0D306C" />
              <circle cx="132" cy="68" r="5" fill="#008EC4" />
            </g>
          ) : index === 6 ? (
            /* 6. Knowledge management: Stacked runbook binders & core sync */
            <g transform="translate(15, 0)">
              {/* Stacked books/binders */}
              <path d="M50 72 L85 82 L120 72 L85 62 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
              <path d="M50 72 L50 78 L85 88 L85 82 Z" fill="#94A3B8" />
              <path d="M85 82 L85 88 L120 78 L120 72 Z" fill="#64748B" />

              <path d="M54 58 L85 67 L116 58 L85 49 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
              <path d="M54 58 L54 64 L85 73 L85 67 Z" fill="#0284C7" />
              <path d="M85 67 L85 73 L116 64 L116 58 Z" fill="#0369A1" />

              <path d="M58 44 L85 52 L112 44 L85 36 Z" fill={`url(#${idPrefix}-navy)`} stroke="#0D306C" strokeWidth="1" />
              <path d="M58 44 L58 50 L85 58 L85 52 Z" fill="#081E44" />
              <path d="M85 52 L85 58 L112 50 L112 44 Z" fill="#051329" />

              {/* Floating bookmark ribbon */}
              <path d="M82 32 L88 32 L88 46 L85 43 L82 46 Z" fill={`url(#${idPrefix}-amber)`} />
              
              {/* Sync glow icon */}
              <circle cx="126" cy="36" r="10" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
              <path d="M122 36 A4 4 0 1 1 128 39" stroke="#008EC4" strokeWidth="1.4" fill="none" />
              <polygon points="127,41 130,38 126,38" fill="#008EC4" />
            </g>
          ) : index === 7 ? (
            /* 7. Service desk copilots: Copilot assistant dialog & quick response */
            <g transform="translate(10, 0)">
              {/* User message */}
              <rect x="42" y="24" width="58" height="22" rx="7" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="50" y="32" width="34" height="2.5" rx="1.2" fill="#64748B" />
              <rect x="50" y="37" width="22" height="2.5" rx="1.2" fill="#94A3B8" />

              {/* Copilot suggestion box */}
              <rect x="74" y="48" width="76" height="32" rx="8" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.5" filter={`url(#${idPrefix}-glow)`} />
              <rect x="82" y="55" width="20" height="6" rx="3" fill="#008EC4" />
              <text x="92" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">COPILOT</text>
              <rect x="82" y="65" width="50" height="2.5" rx="1.2" fill="#0D306C" />
              <rect x="82" y="70" width="38" height="2.5" rx="1.2" fill="#64748B" />

              {/* Action accept button */}
              <circle cx="138" cy="64" r="6" fill={`url(#${idPrefix}-amber)`} />
              <path d="M135 64 L137 66 L141 62" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : index === 8 ? (
            /* 8. Operational reporting: 3D bar chart & trend telemetry */
            <g transform="translate(15, 0)">
              {/* Baseline */}
              <line x1="45" y1="78" x2="135" y2="78" stroke="#CBD5E1" strokeWidth="1.5" />
              
              {/* 4 Isometric volumetric bars */}
              {/* Bar 1 */}
              <rect x="55" y="54" width="12" height="24" rx="2" fill="#B8D9F7" />
              {/* Bar 2 */}
              <rect x="74" y="42" width="12" height="36" rx="2" fill="#38BDF8" />
              {/* Bar 3 */}
              <rect x="93" y="32" width="12" height="46" rx="2" fill="#008EC4" />
              {/* Bar 4 */}
              <rect x="112" y="20" width="12" height="58" rx="2" fill={`url(#${idPrefix}-navy)`} />

              {/* Trend line */}
              <path d="M52 56 L70 48 L89 36 L118 16" fill="none" stroke={`url(#${idPrefix}-amber)`} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="118" cy="16" r="3.5" fill="#FFFFFF" stroke="#DE8017" strokeWidth="2" />
            </g>
          ) : index === 9 ? (
            /* 9. Workforce analytics: Capacity curve & telemetry points */
            <g transform="translate(10, 0)">
              {/* Graph grid lines */}
              <line x1="40" y1="35" x2="150" y2="35" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="40" y1="55" x2="150" y2="55" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="40" y1="75" x2="150" y2="75" stroke="#CBD5E1" strokeWidth="1" />

              {/* Capacity smooth sine curve */}
              <path
                d="M40 70 C 65 68, 80 40, 105 38 C 130 36, 138 24, 155 18"
                fill="none"
                stroke={`url(#${idPrefix}-cyan)`}
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M40 70 C 65 68, 80 40, 105 38 C 130 36, 138 24, 155 18 L 155 75 L 40 75 Z"
                fill="url(#ai-9-wave)"
                opacity="0.5"
              />

              {/* Data points */}
              <circle cx="105" cy="38" r="4" fill="#FFFFFF" stroke="#008EC4" strokeWidth="2" />
              <circle cx="152" cy="19" r="4.5" fill="#DE8017" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Metric pill */}
              <rect x="85" y="16" width="38" height="14" rx="7" fill="#0D306C" />
              <text x="104" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">+18.4%</text>
            </g>
          ) : index === 10 ? (
            /* 10. Anomaly detection: Radar grid & amber outlier pin */
            <g transform="translate(15, 0)">
              {/* Radar circles */}
              <circle cx="85" cy="50" r="32" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
              <circle cx="85" cy="50" r="22" stroke="#008EC4" strokeWidth="1" fill="none" opacity="0.4" />
              <circle cx="85" cy="50" r="12" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.6" />
              <circle cx="85" cy="50" r="3" fill="#0D306C" />

              {/* Radar sweep angle */}
              <path d="M85 50 L115 32 A32 32 0 0 0 95 18 Z" fill="#38BDF8" opacity="0.25" />

              {/* Normal data nodes */}
              <circle cx="75" cy="42" r="2.5" fill="#008EC4" />
              <circle cx="95" cy="60" r="2.5" fill="#008EC4" />
              <circle cx="68" cy="58" r="2.5" fill="#38BDF8" />

              {/* Outlier / Anomaly highlighted node */}
              <circle cx="108" cy="36" r="6" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
              <circle cx="108" cy="36" r="2" fill="#FFFFFF" />
              <text x="125" y="32" fill="#DE8017" fontSize="7" fontWeight="extrabold">FLAGGED</text>
            </g>
          ) : index === 11 ? (
            /* 11. Vendor workflow automation: Infinity loop & sync stages */
            <g transform="translate(10, 0)">
              {/* Infinity track */}
              <path
                d="M58 50 C 42 35, 42 65, 58 50 C 74 35, 90 65, 106 50 C 122 35, 138 65, 122 50 C 106 35, 90 65, 74 50 Z"
                fill="none"
                stroke="#CDE0F3"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M58 50 C 42 35, 42 65, 58 50 C 74 35, 90 65, 106 50 C 122 35, 138 65, 122 50 C 106 35, 90 65, 74 50 Z"
                fill="none"
                stroke={`url(#${idPrefix}-cyan)`}
                strokeWidth="2.2"
                strokeDasharray="6 3"
              />

              {/* Workflow stage nodes */}
              <rect x="42" y="42" width="16" height="16" rx="4" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.2" />
              <path d="M47 50 L53 50 M50 47 L50 53" stroke="#0D306C" strokeWidth="1.2" />

              <rect x="82" y="42" width="16" height="16" rx="4" fill="#008EC4" />
              <path d="M87 50 L89 52 L93 47" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

              <rect x="122" y="42" width="16" height="16" rx="4" fill={`url(#${idPrefix}-amber)`} />
              <circle cx="130" cy="50" r="3" fill="#FFFFFF" />
            </g>
          ) : index === 12 ? (
            /* 12. Document processing: Document sheets & laser scanner bar */
            <g transform="translate(15, 0)">
              {/* Under document */}
              <rect x="52" y="32" width="46" height="52" rx="6" fill="#E2E8F0" />
              
              {/* Main document */}
              <rect x="62" y="20" width="54" height="64" rx="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              <rect x="72" y="28" width="22" height="3" rx="1.5" fill="#0D306C" />
              <rect x="72" y="36" width="34" height="2.5" rx="1.2" fill="#94A3B8" />
              <rect x="72" y="42" width="30" height="2.5" rx="1.2" fill="#94A3B8" />
              <rect x="72" y="48" width="32" height="2.5" rx="1.2" fill="#94A3B8" />
              <rect x="72" y="54" width="26" height="2.5" rx="1.2" fill="#94A3B8" />

              {/* Active scanning bar & laser */}
              <line x1="56" y1="46" x2="122" y2="46" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" filter={`url(#${idPrefix}-glow)`} />
              <circle cx="56" cy="46" r="3" fill="#008EC4" />
              <circle cx="122" cy="46" r="3" fill="#008EC4" />

              {/* Extraction badge */}
              <rect x="94" y="62" width="32" height="14" rx="4" fill="#0D306C" />
              <text x="110" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">EXTRACTED</text>
            </g>
          ) : (
            /* 13. Compliance evidence support: Audit shield & verified evidence folder */
            <g transform="translate(15, 0)">
              {/* Back folder */}
              <rect x="50" y="28" width="60" height="48" rx="6" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="58" y="38" width="28" height="3" rx="1.5" fill="#64748B" />
              <rect x="58" y="44" width="20" height="3" rx="1.5" fill="#94A3B8" />
              
              {/* Prominent compliance shield */}
              <path
                d="M106 32 C106 32 118 36 128 32 C128 50 120 62 106 72 C92 62 84 50 84 32 C94 36 106 32 106 32 Z"
                fill={`url(#${idPrefix}-navy)`}
                stroke="#008EC4"
                strokeWidth="1.6"
                filter={`url(#${idPrefix}-glow)`}
              />
              <path
                d="M98 48 L104 54 L114 42"
                stroke="#38BDF8"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Amber seal */}
              <circle cx="126" cy="58" r="6" fill={`url(#${idPrefix}-amber)`} />
              <text x="126" y="61" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">✓</text>
            </g>
          )
        ) : variant === "hr" ? (
          /* ==========================================================
             PEOPLE & HR OPERATIONS SCOPE (14 CARDS)
             ========================================================== */
          index === 0 ? (
            /* 0. Onboarding administration: Induction calendar & welcome badge */
            <g transform="translate(15, 0)">
              <rect x="54" y="20" width="56" height="58" rx="7" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="54" y="20" width="56" height="14" rx="7" fill="#0D306C" />
              <text x="82" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">DAY ONE</text>
              
              {/* Calendar grid dots */}
              <circle cx="68" cy="44" r="3" fill="#008EC4" />
              <circle cx="82" cy="44" r="3" fill="#E2E8F0" />
              <circle cx="96" cy="44" r="3" fill="#E2E8F0" />
              <circle cx="68" cy="56" r="3" fill="#E2E8F0" />
              <circle cx="82" cy="56" r="3" fill="#38BDF8" />
              <circle cx="96" cy="56" r="3" fill={`url(#${idPrefix}-amber)`} />

              {/* Floating ID badge */}
              <rect x="94" y="42" width="34" height="34" rx="6" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.4" filter={`url(#${idPrefix}-glow)`} />
              <circle cx="111" cy="53" r="5" fill="#0D306C" />
              <rect x="102" y="63" width="18" height="3" rx="1.5" fill="#008EC4" />
            </g>
          ) : index === 1 ? (
            /* 1. Employee documentation: Signed contract & security ribbon */
            <g transform="translate(15, 0)">
              <rect x="60" y="18" width="54" height="66" rx="6" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="68" y="26" width="22" height="3.5" rx="1.7" fill="#0D306C" />
              <rect x="68" y="34" width="38" height="2.5" rx="1.2" fill="#CBD5E1" />
              <rect x="68" y="40" width="34" height="2.5" rx="1.2" fill="#CBD5E1" />
              <rect x="68" y="46" width="36" height="2.5" rx="1.2" fill="#CBD5E1" />

              {/* Digital signature line */}
              <path d="M68 58 Q74 54, 80 58 T92 56 T100 58" stroke="#008EC4" strokeWidth="1.6" fill="none" />

              {/* Official legal seal */}
              <circle cx="106" cy="62" r="10" fill={`url(#${idPrefix}-navy)`} />
              <circle cx="106" cy="62" r="7" fill={`url(#${idPrefix}-amber)`} />
              <path d="M103 62 L105 64 L109 60" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : index === 2 ? (
            /* 2. Payroll coordination: Ledger, calculator bars & currency pill */
            <g transform="translate(15, 0)">
              {/* Payroll ledger sheet */}
              <rect x="52" y="22" width="66" height="60" rx="8" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              
              {/* Ledger lines */}
              <g transform="translate(60, 32)">
                <rect x="0" y="0" width="24" height="4" rx="2" fill="#0D306C" />
                <rect x="36" y="0" width="14" height="4" rx="2" fill="#008EC4" />
              </g>
              <g transform="translate(60, 42)">
                <rect x="0" y="0" width="28" height="3.5" rx="1.7" fill="#64748B" />
                <rect x="38" y="0" width="12" height="3.5" rx="1.7" fill="#38BDF8" />
              </g>
              <g transform="translate(60, 52)">
                <rect x="0" y="0" width="20" height="3.5" rx="1.7" fill="#64748B" />
                <rect x="36" y="0" width="14" height="3.5" rx="1.7" fill="#CBD5E1" />
              </g>

              {/* Floating rupee / currency reconciliation pill */}
              <rect x="88" y="58" width="40" height="18" rx="9" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
              <text x="108" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="extrabold">₹ PAY</text>
            </g>
          ) : index === 3 ? (
            /* 3. Benefits administration: Health cross shield & medical card */
            <g transform="translate(15, 0)">
              {/* Insurance card */}
              <rect x="50" y="32" width="58" height="42" rx="6" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="58" y="42" width="24" height="3" rx="1.5" fill="#0D306C" />
              <rect x="58" y="48" width="18" height="2.5" rx="1.2" fill="#94A3B8" />

              {/* Health shield with cross */}
              <path
                d="M108 24 C108 24 118 28 126 24 C126 42 118 52 108 60 C98 52 90 42 90 24 C98 28 108 24 108 24 Z"
                fill={`url(#${idPrefix}-cyan)`}
                stroke="#FFFFFF"
                strokeWidth="1.5"
                filter={`url(#${idPrefix}-glow)`}
              />
              {/* White cross */}
              <rect x="105" y="34" width="6" height="16" rx="1" fill="#FFFFFF" />
              <rect x="100" y="39" width="16" height="6" rx="1" fill="#FFFFFF" />

              {/* Wellness heart */}
              <circle cx="128" cy="54" r="7" fill={`url(#${idPrefix}-amber)`} />
              <path d="M125 54 C125 52 128 50 128 53 C128 50 131 52 131 54 C131 56 128 57.5 128 58 C128 57.5 125 56 125 54 Z" fill="#FFFFFF" />
            </g>
          ) : index === 4 ? (
            /* 4. Leave administration: Calendar with approved leave flags */
            <g transform="translate(15, 0)">
              <rect x="54" y="20" width="64" height="62" rx="8" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="54" y="20" width="64" height="15" rx="8" fill="#008EC4" />
              <circle cx="70" cy="27" r="2" fill="#FFFFFF" />
              <circle cx="102" cy="27" r="2" fill="#FFFFFF" />

              {/* Calendar blocks */}
              <rect x="62" y="42" width="10" height="10" rx="3" fill="#E2E8F0" />
              <rect x="76" y="42" width="10" height="10" rx="3" fill="#38BDF8" />
              <rect x="90" y="42" width="10" height="10" rx="3" fill="#0D306C" />
              <rect x="104" y="42" width="10" height="10" rx="3" fill={`url(#${idPrefix}-amber)`} />
              
              <rect x="62" y="56" width="10" height="10" rx="3" fill={`url(#${idPrefix}-amber)`} />
              <rect x="76" y="56" width="10" height="10" rx="3" fill="#E2E8F0" />
              <rect x="90" y="56" width="10" height="10" rx="3" fill="#008EC4" />
              <rect x="104" y="56" width="10" height="10" rx="3" fill="#E2E8F0" />

              {/* Approved status pill */}
              <rect x="42" y="62" width="38" height="14" rx="7" fill="#0D306C" />
              <text x="61" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">APPROVED</text>
            </g>
          ) : index === 5 ? (
            /* 5. HR helpdesk: Omni-channel support headset & chat bubble */
            <g transform="translate(10, 0)">
              {/* Headset arc */}
              <path d="M70 54 A24 24 0 0 1 118 54" stroke="#0D306C" strokeWidth="3" fill="none" strokeLinecap="round" />
              <rect x="66" y="50" width="8" height="14" rx="3" fill="#008EC4" />
              <rect x="114" y="50" width="8" height="14" rx="3" fill="#008EC4" />
              <path d="M118 60 L124 64 L118 66" stroke="#0D306C" strokeWidth="2" fill="none" />
              <circle cx="124" cy="65" r="3" fill={`url(#${idPrefix}-amber)`} />

              {/* Helpdesk resolution ticket */}
              <rect x="78" y="20" width="62" height="28" rx="8" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.4" filter={`url(#${idPrefix}-glow)`} />
              <rect x="86" y="27" width="22" height="3" rx="1.5" fill="#0D306C" />
              <rect x="86" y="33" width="36" height="2.5" rx="1.2" fill="#64748B" />
              <rect x="86" y="39" width="16" height="5" rx="2.5" fill="#008EC4" />
              <text x="94" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="4" fontWeight="bold">RESOLVED</text>
            </g>
          ) : index === 6 ? (
            /* 6. Policy administration: Employee handbook & compliance bookmark */
            <g transform="translate(15, 0)">
              <rect x="62" y="20" width="56" height="66" rx="6" fill={`url(#${idPrefix}-navy)`} />
              <rect x="66" y="20" width="6" height="66" fill="#081E44" />
              
              {/* Gold / Amber bookmark ribbon */}
              <path d="M84 16 L92 16 L92 40 L88 36 L84 40 Z" fill={`url(#${idPrefix}-amber)`} />
              
              {/* Policy emblem */}
              <circle cx="94" cy="50" r="12" fill="#FFFFFF" fillOpacity="0.15" stroke="#38BDF8" strokeWidth="1" />
              <text x="94" y="53" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">HR OPS</text>
              <rect x="80" y="66" width="28" height="3" rx="1.5" fill="#38BDF8" />
            </g>
          ) : index === 7 ? (
            /* 7. Employee engagement: Pulse survey gauge & sentiment emoji */
            <g transform="translate(15, 0)">
              {/* Speedometer / Gauge arc */}
              <path d="M55 64 A34 34 0 0 1 123 64" fill="none" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
              <path d="M55 64 A34 34 0 0 1 112 40" fill="none" stroke={`url(#${idPrefix}-cyan)`} strokeWidth="8" strokeLinecap="round" />

              {/* Gauge needle */}
              <line x1="89" y1="64" x2="108" y2="44" stroke="#0D306C" strokeWidth="3" strokeLinecap="round" />
              <circle cx="89" cy="64" r="5" fill="#0D306C" />

              {/* Smiling sentiment emoji */}
              <circle cx="120" cy="30" r="10" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
              <circle cx="117" cy="28" r="1.2" fill="#FFFFFF" />
              <circle cx="123" cy="28" r="1.2" fill="#FFFFFF" />
              <path d="M117 33 Q120 36, 123 33" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          ) : index === 8 ? (
            /* 8. Performance-cycle coordination: 360 review target & stars */
            <g transform="translate(15, 0)">
              {/* Target concentric rings */}
              <circle cx="88" cy="48" r="32" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <circle cx="88" cy="48" r="22" stroke="#008EC4" strokeWidth="1.2" fill="none" opacity="0.4" />
              <circle cx="88" cy="48" r="12" fill="#EDF6FD" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="88" cy="48" r="4" fill="#0D306C" />

              {/* Performance achievement badge */}
              <rect x="108" y="24" width="38" height="20" rx="6" fill={`url(#${idPrefix}-navy)`} />
              <text x="127" y="36" textAnchor="middle" fill={`url(#${idPrefix}-amber)`} fontSize="9" fontWeight="extrabold">★ EXCEED</text>
              <rect x="114" y="39" width="26" height="2" rx="1" fill="#38BDF8" />
            </g>
          ) : index === 9 ? (
            /* 9. Learning administration: Graduation cap & progression steps */
            <g transform="translate(15, 0)">
              {/* Step progression podium */}
              <rect x="52" y="64" width="16" height="18" rx="2" fill="#CBD5E1" />
              <rect x="72" y="52" width="16" height="30" rx="2" fill="#38BDF8" />
              <rect x="92" y="40" width="16" height="42" rx="2" fill="#008EC4" />
              <rect x="112" y="28" width="16" height="54" rx="2" fill={`url(#${idPrefix}-navy)`} />

              {/* Graduation Cap floating at peak */}
              <polygon points="120,16 135,22 120,28 105,22" fill="#0D306C" />
              <polygon points="112,25 120,29 128,25 128,30 112,30" fill="#081E44" />
              <path d="M135 22 L138 27 L138 34" stroke={`url(#${idPrefix}-amber)`} strokeWidth="1.5" fill="none" />
              <circle cx="138" cy="35" r="2" fill="#DE8017" />
            </g>
          ) : index === 10 ? (
            /* 10. Retention programs: Talent retention shield & stay conversations */
            <g transform="translate(15, 0)">
              {/* Retention shield */}
              <path
                d="M88 22 C88 22 98 26 108 22 C108 42 100 54 88 64 C76 54 68 42 68 22 C78 26 88 22 88 22 Z"
                fill={`url(#${idPrefix}-navy)`}
                stroke="#008EC4"
                strokeWidth="1.6"
              />
              <path d="M80 40 L86 46 L96 34" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

              {/* Stay conversation dialog */}
              <rect x="98" y="44" width="46" height="24" rx="6" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" filter={`url(#${idPrefix}-glow)`} />
              <text x="121" y="54" textAnchor="middle" fill="#0D306C" fontSize="6" fontWeight="bold">STAY DIALOG</text>
              <rect x="106" y="58" width="30" height="2" rx="1" fill={`url(#${idPrefix}-amber)`} />
            </g>
          ) : index === 11 ? (
            /* 11. Employee lifecycle processes: Circular lifecycle flow (Join->Grow->Perform->Retain) */
            <g transform="translate(15, 0)">
              {/* Circular track */}
              <circle cx="88" cy="50" r="26" stroke="#CDE0F3" strokeWidth="3" fill="none" strokeDasharray="6 3" />
              
              {/* 4 Connecting nodes */}
              <circle cx="88" cy="24" r="7" fill="#008EC4" />
              <text x="88" y="26.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">01</text>

              <circle cx="114" cy="50" r="7" fill={`url(#${idPrefix}-amber)`} />
              <text x="114" y="52.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">02</text>

              <circle cx="88" cy="76" r="7" fill="#0D306C" />
              <text x="88" y="78.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">03</text>

              <circle cx="62" cy="50" r="7" fill="#38BDF8" />
              <text x="62" y="52.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">04</text>
            </g>
          ) : index === 12 ? (
            /* 12. Offboarding: Exit clearance checklist & handover stamp */
            <g transform="translate(15, 0)">
              <rect x="56" y="20" width="56" height="66" rx="7" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="70" y="16" width="28" height="7" rx="3.5" fill="#0D306C" />

              {/* Clearance checkboxes */}
              <g transform="translate(64, 32)">
                <rect x="0" y="0" width="6" height="6" rx="1.5" fill="#008EC4" />
                <path d="M1.5 3 L2.5 4.5 L4.5 1.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                <rect x="10" y="1.5" width="28" height="3" rx="1.5" fill="#0D306C" />
              </g>
              <g transform="translate(64, 43)">
                <rect x="0" y="0" width="6" height="6" rx="1.5" fill="#008EC4" />
                <path d="M1.5 3 L2.5 4.5 L4.5 1.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                <rect x="10" y="1.5" width="24" height="3" rx="1.5" fill="#64748B" />
              </g>
              <g transform="translate(64, 54)">
                <rect x="0" y="0" width="6" height="6" rx="1.5" fill="#38BDF8" />
                <path d="M1.5 3 L2.5 4.5 L4.5 1.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                <rect x="10" y="1.5" width="26" height="3" rx="1.5" fill="#64748B" />
              </g>

              {/* Handover clearance seal */}
              <rect x="86" y="62" width="38" height="15" rx="4" fill={`url(#${idPrefix}-amber)`} />
              <text x="105" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">CLEARED ✓</text>
            </g>
          ) : (
            /* 13. Background verification coordination: ID badge & verified security stamp */
            <g transform="translate(15, 0)">
              {/* ID Card */}
              <rect x="52" y="24" width="60" height="42" rx="7" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
              <circle cx="68" cy="40" r="7" fill="#CBD5E1" />
              <rect x="80" y="34" width="24" height="3" rx="1.5" fill="#0D306C" />
              <rect x="80" y="40" width="18" height="2.5" rx="1.2" fill="#64748B" />
              <rect x="80" y="46" width="14" height="2.5" rx="1.2" fill="#94A3B8" />

              {/* Official verified badge stamp */}
              <circle cx="112" cy="54" r="14" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <circle cx="112" cy="54" r="11" fill="#008EC4" />
              <path d="M107 54 L110 57 L117 50" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              
              <text x="112" y="76" textAnchor="middle" fill="#008EC4" fontSize="6.5" fontWeight="extrabold">VERIFIED</text>
            </g>
          )
        ) : variant === "workforce" ? (
          /* ==========================================================
             WORKFORCE STRATEGY SCOPE (14 CARDS)
             ========================================================== */
          index === 0 ? (
            /* 0. Leadership architecture: Org hierarchy pyramid with Crown apex */
            <g transform="translate(15, 0)">
              {/* Org tree connections */}
              <path d="M85 36 L85 52 M55 64 L55 52 L115 52 L115 64" stroke="#008EC4" strokeWidth="1.5" fill="none" />
              {/* Top apex node with Crown */}
              <rect x="70" y="16" width="30" height="20" rx="5" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <polygon points="76,29 78,21 82,24 85,19 88,24 92,21 94,29" fill={`url(#${idPrefix}-amber)`} />
              {/* Subordinate leadership nodes */}
              <rect x="40" y="64" width="30" height="16" rx="4" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
              <circle cx="50" cy="72" r="3" fill="#008EC4" />
              <rect x="56" y="70" width="10" height="3" rx="1.5" fill="#0D306C" />
              <rect x="100" y="64" width="30" height="16" rx="4" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.2" />
              <circle cx="110" cy="72" r="3" fill="#38BDF8" />
              <rect x="116" y="70" width="10" height="3" rx="1.5" fill="#0D306C" />
            </g>
          ) : index === 1 ? (
            /* 1. Workforce planning: Phased headcount calendar and quarterly milestone bars */
            <g transform="translate(15, 0)">
              <rect x="52" y="20" width="66" height="62" rx="7" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="52" y="20" width="66" height="14" rx="7" fill="#0D306C" />
              <text x="85" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">QUARTERLY PLAN</text>
              <rect x="60" y="42" width="18" height="4" rx="2" fill="#CBD5E1" />
              <rect x="80" y="42" width="28" height="4" rx="2" fill="#38BDF8" />
              <rect x="60" y="52" width="24" height="4" rx="2" fill="#CBD5E1" />
              <rect x="86" y="52" width="24" height="4" rx="2" fill="#008EC4" />
              <rect x="60" y="62" width="16" height="4" rx="2" fill="#CBD5E1" />
              <rect x="78" y="62" width="34" height="4" rx="2" fill={`url(#${idPrefix}-amber)`} />
              <circle cx="118" cy="64" r="5" fill="#DE8017" />
              <text x="118" y="67" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">✓</text>
            </g>
          ) : index === 2 ? (
            /* 2. Role taxonomy: Standardized role leveling ladders (L1-L4) */
            <g transform="translate(15, 0)">
              <rect x="54" y="64" width="62" height="14" rx="4" fill="#E2E8F0" />
              <text x="64" y="74" fill="#64748B" fontSize="6" fontWeight="bold">L1 · Professional</text>
              
              <rect x="58" y="48" width="58" height="14" rx="4" fill="#BAE6FD" />
              <text x="68" y="58" fill="#0369A1" fontSize="6" fontWeight="bold">L2 · Senior</text>
              
              <rect x="62" y="32" width="54" height="14" rx="4" fill="#38BDF8" />
              <text x="72" y="42" fill="#0C4A6E" fontSize="6" fontWeight="bold">L3 · Principal</text>

              <rect x="66" y="16" width="50" height="14" rx="4" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <text x="76" y="26" fill="#FFFFFF" fontSize="6" fontWeight="bold">L4 · Director</text>
              <circle cx="108" cy="23" r="3" fill={`url(#${idPrefix}-amber)`} />
            </g>
          ) : index === 3 ? (
            /* 3. Skill architecture: Microprocessor skill matrix & competency traces */
            <g transform="translate(15, 0)">
              <rect x="66" y="28" width="38" height="38" rx="8" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.5" filter={`url(#${idPrefix}-glow)`} />
              <rect x="74" y="36" width="22" height="22" rx="4" fill="#0A244E" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="85" cy="47" r="4" fill={`url(#${idPrefix}-amber)`} />
              <line x1="50" y1="38" x2="66" y2="38" stroke="#008EC4" strokeWidth="1.5" />
              <line x1="50" y1="47" x2="66" y2="47" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="50" y1="56" x2="66" y2="56" stroke="#008EC4" strokeWidth="1.5" />
              <circle cx="48" cy="38" r="2.5" fill="#008EC4" />
              <circle cx="48" cy="47" r="2.5" fill="#38BDF8" />
              <circle cx="48" cy="56" r="2.5" fill="#008EC4" />
              
              <line x1="104" y1="38" x2="120" y2="38" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="104" y1="47" x2="120" y2="47" stroke="#008EC4" strokeWidth="1.5" />
              <line x1="104" y1="56" x2="120" y2="56" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="122" cy="38" r="2.5" fill="#38BDF8" />
              <circle cx="122" cy="47" r="2.5" fill={`url(#${idPrefix}-amber)`} />
              <circle cx="122" cy="56" r="2.5" fill="#38BDF8" />
            </g>
          ) : index === 4 ? (
            /* 4. Capacity modelling: Delivery dial with threshold constraint marker */
            <g transform="translate(15, 0)">
              <path d="M52 64 A34 34 0 0 1 118 64" fill="none" stroke="#E2E8F0" strokeWidth="7" strokeLinecap="round" />
              <path d="M52 64 A34 34 0 0 1 106 38" fill="none" stroke={`url(#${idPrefix}-cyan)`} strokeWidth="7" strokeLinecap="round" />
              <line x1="85" y1="64" x2="102" y2="42" stroke="#0D306C" strokeWidth="2.8" strokeLinecap="round" />
              <circle cx="85" cy="64" r="5" fill="#0D306C" />
              <rect x="98" y="20" width="36" height="15" rx="4" fill="#0D306C" />
              <text x="116" y="30" textAnchor="middle" fill={`url(#${idPrefix}-amber)`} fontSize="6.5" fontWeight="bold">92% CAP</text>
              <line x1="50" y1="78" x2="120" y2="78" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 2" />
            </g>
          ) : index === 5 ? (
            /* 5. Location talent strategy: City radar beacon & talent density radial wave */
            <g transform="translate(15, 0)">
              <circle cx="85" cy="52" r="34" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="85" cy="52" r="24" stroke="#008EC4" strokeWidth="1" opacity="0.4" />
              <circle cx="85" cy="52" r="14" stroke="#008EC4" strokeWidth="1.2" opacity="0.7" />
              <path d="M85 30 C78 30 72 36 72 43 C72 52 85 68 85 68 C85 68 98 52 98 43 C98 36 92 30 85 30 Z" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <circle cx="85" cy="42" r="4.5" fill={`url(#${idPrefix}-amber)`} />
              <rect x="100" y="32" width="36" height="14" rx="4" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1" />
              <text x="118" y="42" textAnchor="middle" fill="#008EC4" fontSize="6.5" fontWeight="bold">BLR HUB</text>
            </g>
          ) : index === 6 ? (
            /* 6. Compensation benchmarking: Balanced percentiles (P50 vs P75) scale */
            <g transform="translate(15, 0)">
              <line x1="85" y1="26" x2="85" y2="68" stroke="#0D306C" strokeWidth="2.5" />
              <polygon points="85,22 89,28 81,28" fill={`url(#${idPrefix}-amber)`} />
              <line x1="55" y1="36" x2="115" y2="36" stroke="#008EC4" strokeWidth="2" strokeLinecap="round" />
              <line x1="55" y1="36" x2="55" y2="52" stroke="#64748B" strokeWidth="1" />
              <rect x="42" y="52" width="26" height="12" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              <text x="55" y="60" textAnchor="middle" fill="#64748B" fontSize="5.5" fontWeight="bold">P50</text>
              <line x1="115" y1="36" x2="115" y2="48" stroke="#008EC4" strokeWidth="1" />
              <rect x="102" y="48" width="26" height="14" rx="4" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <text x="115" y="58" textAnchor="middle" fill={`url(#${idPrefix}-amber)`} fontSize="6" fontWeight="bold">P75+</text>
            </g>
          ) : index === 7 ? (
            /* 7. Employer value proposition: Talent medal with golden star and laurel */
            <g transform="translate(15, 0)">
              <circle cx="85" cy="46" r="22" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <circle cx="85" cy="46" r="16" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <path d="M85 36 L87.5 42 L94 42.5 L89 46.5 L91 53 L85 49 L79 53 L81 46.5 L76 42.5 L82.5 42 Z" fill={`url(#${idPrefix}-amber)`} />
              <polygon points="76,64 82,78 85,74 88,78 94,64 85,68" fill="#008EC4" />
              <rect x="102" y="24" width="34" height="14" rx="4" fill="#FFFFFF" stroke="#DE8017" strokeWidth="1" />
              <text x="119" y="34" textAnchor="middle" fill="#DE8017" fontSize="6.5" fontWeight="bold">TOP GCC</text>
            </g>
          ) : index === 8 ? (
            /* 8. Succession planning: Dual leadership profile with verified bench baton */
            <g transform="translate(15, 0)">
              <circle cx="64" cy="44" r="14" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.5" />
              <circle cx="64" cy="40" r="5" fill="#0D306C" />
              <path d="M56 52 C56 48 59 46 64 46 C69 46 72 48 72 52" fill="#0D306C" />
              <circle cx="106" cy="44" r="14" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.5" filter={`url(#${idPrefix}-glow)`} />
              <circle cx="106" cy="40" r="5" fill="#008EC4" />
              <path d="M98 52 C98 48 101 46 106 46 C111 46 114 48 114 52" fill="#008EC4" />
              <rect x="74" y="42" width="22" height="4" rx="2" fill={`url(#${idPrefix}-amber)`} />
              <circle cx="85" cy="44" r="4" fill="#DE8017" />
              <text x="85" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">✓</text>
              <rect x="88" y="64" width="36" height="12" rx="4" fill="#0D306C" />
              <text x="106" y="72.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">BENCH R1</text>
            </g>
          ) : index === 9 ? (
            /* 9. Critical-role planning: Target lock onto crown critical position */
            <g transform="translate(15, 0)">
              <circle cx="85" cy="48" r="28" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
              <circle cx="85" cy="48" r="18" stroke="#008EC4" strokeWidth="1.2" fill="none" opacity="0.5" />
              <line x1="85" y1="16" x2="85" y2="80" stroke="#008EC4" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="53" y1="48" x2="117" y2="48" stroke="#008EC4" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="85" cy="48" r="12" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <polygon points="79,53 80,47 83,49 85,45 87,49 90,47 91,53" fill={`url(#${idPrefix}-amber)`} />
              <rect x="104" y="24" width="34" height="13" rx="4" fill="#DE8017" />
              <text x="121" y="33" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">KEY 5%</text>
            </g>
          ) : index === 10 ? (
            /* 10. Capability development: Skill progression academy stairs with graduation cap */
            <g transform="translate(15, 0)">
              <rect x="48" y="64" width="16" height="18" rx="2" fill="#CBD5E1" />
              <rect x="68" y="52" width="16" height="30" rx="2" fill="#38BDF8" />
              <rect x="88" y="40" width="16" height="42" rx="2" fill="#008EC4" />
              <rect x="108" y="28" width="16" height="54" rx="2" fill={`url(#${idPrefix}-navy)`} />
              <polygon points="116,16 130,22 116,28 102,22" fill="#0D306C" />
              <polygon points="108,25 116,29 124,25 124,30 108,30" fill="#081E44" />
              <circle cx="132" cy="32" r="2.5" fill={`url(#${idPrefix}-amber)`} />
            </g>
          ) : index === 11 ? (
            /* 11. Internal mobility: Cross-functional transition pathways */
            <g transform="translate(15, 0)">
              <rect x="44" y="38" width="32" height="26" rx="6" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.4" />
              <text x="60" y="53" textAnchor="middle" fill="#0D306C" fontSize="6.5" fontWeight="bold">ENG</text>
              <rect x="94" y="38" width="32" height="26" rx="6" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <text x="110" y="53" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">AI LAB</text>
              <path d="M76 44 C85 36 85 36 94 44" fill="none" stroke={`url(#${idPrefix}-amber)`} strokeWidth="2" strokeLinecap="round" />
              <polygon points="94,44 89,40 91,46" fill="#DE8017" />
              <path d="M94 58 C85 66 85 66 76 58" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <polygon points="76,58 81,62 79,56" fill="#38BDF8" />
            </g>
          ) : index === 12 ? (
            /* 12. Retention strategy: Protective retention shield with loyalty star & 95% target */
            <g transform="translate(15, 0)">
              <path d="M85 24 C85 24 96 28 105 24 C105 44 97 56 85 66 C73 56 65 44 65 24 C74 28 85 24 85 24 Z" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.6" filter={`url(#${idPrefix}-glow)`} />
              <polygon points="85,34 87,40 93,40 88,44 90,50 85,46 80,50 82,44 77,40 83,40" fill={`url(#${idPrefix}-amber)`} />
              <rect x="96" y="52" width="38" height="15" rx="4" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
              <text x="115" y="62" textAnchor="middle" fill="#0D306C" fontSize="6" fontWeight="bold">RETAIN 95%</text>
            </g>
          ) : (
            /* 13. Workforce analytics: Predictive forecast cone with AI modelled milestone */
            <g transform="translate(15, 0)">
              <line x1="45" y1="74" x2="135" y2="74" stroke="#CBD5E1" strokeWidth="1.2" />
              <polygon points="80,52 130,28 130,56" fill="#38BDF8" fillOpacity="0.2" />
              <path d="M48 66 L65 58 L80 52 L102 38 L126 26" fill="none" stroke="#0D306C" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M80 52 L126 26" fill="none" stroke={`url(#${idPrefix}-amber)`} strokeWidth="2.5" strokeDasharray="3 2" strokeLinecap="round" />
              <circle cx="80" cy="52" r="3.5" fill="#008EC4" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="126" cy="26" r="4.5" fill="#DE8017" stroke="#FFFFFF" strokeWidth="1.5" filter={`url(#${idPrefix}-glow)`} />
              <rect x="92" y="14" width="38" height="12" rx="4" fill="#0D306C" />
              <text x="111" y="22.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">AI MODELLED</text>
            </g>
          )
        ) : variant === "governance" ? (
          /* ==========================================================
             GOVERNANCE & COMPLIANCE SCOPE (16 CARDS)
             ========================================================== */
          index === 0 ? (
            /* 0. Decision rights: Authority balance scale, HQ vs GCC rights */
            <g transform="translate(15, 0)">
              <line x1="88" y1="28" x2="88" y2="76" stroke="#0D306C" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="80,78 96,78 88,72" fill="#0D306C" />
              <line x1="56" y1="36" x2="120" y2="36" stroke="#008EC4" strokeWidth="2" strokeLinecap="round" />
              <circle cx="88" cy="36" r="3.5" fill="#DE8017" />
              <line x1="56" y1="36" x2="50" y2="52" stroke="#64748B" strokeWidth="1" />
              <line x1="56" y1="36" x2="62" y2="52" stroke="#64748B" strokeWidth="1" />
              <rect x="42" y="52" width="28" height="12" rx="3" fill={`url(#${idPrefix}-navy)`} />
              <text x="56" y="60.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">HQ</text>
              <line x1="120" y1="36" x2="114" y2="52" stroke="#64748B" strokeWidth="1" />
              <line x1="120" y1="36" x2="126" y2="52" stroke="#64748B" strokeWidth="1" />
              <rect x="106" y="52" width="28" height="12" rx="3" fill="#008EC4" />
              <text x="120" y="60.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">GCC</text>
            </g>
          ) : index === 1 ? (
            /* 1. RACI: RACI accountability matrix grid */
            <g transform="translate(15, 0)">
              <rect x="48" y="24" width="76" height="56" rx="6" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="48" y="24" width="76" height="14" rx="6" fill="#0D306C" />
              <text x="86" y="33.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">RACI MATRIX</text>
              <circle cx="59" cy="52" r="7" fill="#0D306C" />
              <text x="59" y="54.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">R</text>
              <circle cx="77" cy="52" r="7" fill={`url(#${idPrefix}-amber)`} />
              <text x="77" y="54.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">A</text>
              <circle cx="95" cy="52" r="7" fill="#008EC4" />
              <text x="95" y="54.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">C</text>
              <circle cx="113" cy="52" r="7" fill="#38BDF8" />
              <text x="113" y="54.5" textAnchor="middle" fill="#0D306C" fontSize="6.5" fontWeight="bold">I</text>
              <line x1="52" y1="66" x2="120" y2="66" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="58" y="70" width="56" height="3" rx="1.5" fill="#CBD5E1" />
            </g>
          ) : index === 2 ? (
            /* 2. Committee structure: Executive review table & cadence ring */
            <g transform="translate(15, 0)">
              <ellipse cx="88" cy="52" rx="36" ry="18" fill={`url(#${idPrefix}-glass)`} stroke="#008EC4" strokeWidth="1.5" />
              <text x="88" y="54.5" textAnchor="middle" fill="#0D306C" fontSize="6" fontWeight="bold">COMMITTEE</text>
              <circle cx="88" cy="28" r="5" fill="#0D306C" />
              <circle cx="126" cy="52" r="5" fill={`url(#${idPrefix}-amber)`} />
              <circle cx="88" cy="76" r="5" fill="#008EC4" />
              <circle cx="50" cy="52" r="5" fill="#38BDF8" />
              <rect x="100" y="16" width="34" height="12" rx="4" fill="#0D306C" />
              <text x="117" y="24.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">CADENCE</text>
            </g>
          ) : index === 3 ? (
            /* 3. Escalation model: Tiered pyramid with SLA path */
            <g transform="translate(15, 0)">
              <polygon points="88,20 114,40 62,40" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <text x="88" y="35" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">L3</text>
              <polygon points="62,43 114,43 124,58 52,58" fill="#008EC4" />
              <text x="88" y="53" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">L2</text>
              <polygon points="52,61 124,61 134,76 42,76" fill="#BAE6FD" />
              <text x="88" y="71" textAnchor="middle" fill="#0D306C" fontSize="6" fontWeight="bold">L1 · Local Ops</text>
              <path d="M128 72 L128 30 L118 30" fill="none" stroke={`url(#${idPrefix}-amber)`} strokeWidth="1.8" strokeLinecap="round" />
              <polygon points="116,30 120,27 120,33" fill="#DE8017" />
            </g>
          ) : index === 4 ? (
            /* 4. Risk register: Risk matrix heatmap with alert marker */
            <g transform="translate(15, 0)">
              <rect x="52" y="22" width="66" height="58" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              <rect x="58" y="28" width="16" height="14" rx="2" fill="#FCA5A5" />
              <rect x="77" y="28" width="16" height="14" rx="2" fill="#F87171" />
              <rect x="96" y="28" width="16" height="14" rx="2" fill="#EF4444" />
              <rect x="58" y="45" width="16" height="14" rx="2" fill="#FDE047" />
              <rect x="77" y="45" width="16" height="14" rx="2" fill="#FBBF24" />
              <rect x="96" y="45" width="16" height="14" rx="2" fill="#F87171" />
              <rect x="58" y="62" width="16" height="14" rx="2" fill="#86EFAC" />
              <rect x="77" y="62" width="16" height="14" rx="2" fill="#4ADE80" />
              <rect x="96" y="62" width="16" height="14" rx="2" fill="#FDE047" />
              <circle cx="104" cy="35" r="4.5" fill="#0D306C" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="104" cy="35" r="2" fill="#DE8017" />
            </g>
          ) : index === 5 ? (
            /* 5. Control framework: Master compliance shield with policy check matrix */
            <g transform="translate(15, 0)">
              <path
                d="M88 20 C88 20 102 24 114 20 C114 44 104 58 88 70 C72 58 62 44 62 20 C74 24 88 20 88 20 Z"
                fill={`url(#${idPrefix}-navy)`}
                stroke="#008EC4"
                strokeWidth="1.5"
                filter={`url(#${idPrefix}-glow)`}
              />
              <line x1="74" y1="36" x2="102" y2="36" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="74" y1="44" x2="102" y2="44" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="74" y1="52" x2="94" y2="52" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="112" cy="58" r="9" fill={`url(#${idPrefix}-amber)`} stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="112" y="61.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">✓</text>
            </g>
          ) : index === 6 ? (
            /* 6. Policy coordination: Dual synchronized document scrolls (Global <-> Local) */
            <g transform="translate(15, 0)">
              <rect x="46" y="24" width="34" height="48" rx="5" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.2" />
              <rect x="52" y="32" width="22" height="3" rx="1.5" fill="#0D306C" />
              <rect x="52" y="38" width="16" height="2" rx="1" fill="#64748B" />
              <rect x="52" y="43" width="20" height="2" rx="1" fill="#64748B" />
              <text x="63" y="64" textAnchor="middle" fill="#0D306C" fontSize="5" fontWeight="bold">GLOBAL</text>
              <rect x="94" y="24" width="34" height="48" rx="5" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
              <rect x="100" y="32" width="22" height="3" rx="1.5" fill="#008EC4" />
              <rect x="100" y="38" width="16" height="2" rx="1" fill="#64748B" />
              <rect x="100" y="43" width="20" height="2" rx="1" fill="#64748B" />
              <text x="111" y="64" textAnchor="middle" fill="#008EC4" fontSize="5" fontWeight="bold">LOCAL</text>
              <path d="M83 44 L91 44 M83 50 L91 50" stroke={`url(#${idPrefix}-amber)`} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ) : index === 7 ? (
            /* 7. Regulatory tracking: Radar scanner with compass dial */
            <g transform="translate(15, 0)">
              <circle cx="88" cy="48" r="30" stroke="#CDE0F3" strokeWidth="1.2" fill="none" />
              <circle cx="88" cy="48" r="18" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
              <circle cx="88" cy="48" r="6" fill="#0D306C" />
              <line x1="88" y1="18" x2="88" y2="78" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="58" y1="48" x2="118" y2="48" stroke="#E2E8F0" strokeWidth="1" />
              <path d="M88 48 L110 30" stroke="#008EC4" strokeWidth="2" strokeLinecap="round" />
              <circle cx="104" cy="35" r="3.5" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
              <rect x="94" y="64" width="36" height="12" rx="4" fill="#0D306C" />
              <text x="112" y="72.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">COMPLIANT</text>
            </g>
          ) : index === 8 ? (
            /* 8. Vendor risk: Supplier tower & scorecard rating */
            <g transform="translate(15, 0)">
              <rect x="52" y="26" width="36" height="52" rx="4" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.4" />
              <rect x="58" y="32" width="6" height="6" rx="1" fill="#38BDF8" />
              <rect x="68" y="32" width="6" height="6" rx="1" fill="#38BDF8" />
              <rect x="76" y="32" width="6" height="6" rx="1" fill="#38BDF8" />
              <rect x="58" y="42" width="6" height="6" rx="1" fill="#008EC4" />
              <rect x="68" y="42" width="6" height="6" rx="1" fill="#008EC4" />
              <rect x="76" y="42" width="6" height="6" rx="1" fill="#008EC4" />
              <rect x="64" y="66" width="12" height="12" fill="#0D306C" />
              <rect x="94" y="36" width="38" height="26" rx="6" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <text x="113" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">TIER 1</text>
              <rect x="100" y="52" width="26" height="3" rx="1.5" fill={`url(#${idPrefix}-amber)`} />
            </g>
          ) : index === 9 ? (
            /* 9. Third-party risk: Security node with connection endpoints */
            <g transform="translate(15, 0)">
              <circle cx="88" cy="48" r="16" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <rect x="83" y="45" width="10" height="8" rx="2" fill={`url(#${idPrefix}-amber)`} />
              <path d="M85 45 L85 41 C85 39 91 39 91 41 L91 45" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
              <line x1="88" y1="32" x2="88" y2="18" stroke="#008EC4" strokeWidth="1.5" />
              <circle cx="88" cy="18" r="4.5" fill="#38BDF8" />
              <line x1="104" y1="48" x2="124" y2="48" stroke="#008EC4" strokeWidth="1.5" />
              <circle cx="124" cy="48" r="4.5" fill="#008EC4" />
              <line x1="88" y1="64" x2="88" y2="78" stroke="#008EC4" strokeWidth="1.5" />
              <circle cx="88" cy="78" r="4.5" fill="#38BDF8" />
              <line x1="72" y1="48" x2="52" y2="48" stroke="#008EC4" strokeWidth="1.5" />
              <circle cx="52" cy="48" r="4.5" fill="#008EC4" />
            </g>
          ) : index === 10 ? (
            /* 10. Audit readiness: Continuous audit binder & green verification checkmarks */
            <g transform="translate(15, 0)">
              <rect x="52" y="20" width="60" height="62" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              <rect x="52" y="20" width="14" height="62" rx="4" fill="#0D306C" />
              <line x1="59" y1="28" x2="59" y2="74" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
              <g transform="translate(72, 32)">
                <circle cx="4" cy="4" r="3" fill="#10B981" />
                <path d="M2.5 4 L3.5 5.5 L5.5 3" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                <rect x="12" y="2" width="22" height="3" rx="1.5" fill="#64748B" />
              </g>
              <g transform="translate(72, 46)">
                <circle cx="4" cy="4" r="3" fill="#10B981" />
                <path d="M2.5 4 L3.5 5.5 L5.5 3" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                <rect x="12" y="2" width="22" height="3" rx="1.5" fill="#64748B" />
              </g>
              <rect x="74" y="60" width="34" height="14" rx="4" fill={`url(#${idPrefix}-amber)`} />
              <text x="91" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">AUDIT READY</text>
            </g>
          ) : index === 11 ? (
            /* 11. Evidence management: Secure vault repository & document folders */
            <g transform="translate(15, 0)">
              <rect x="50" y="32" width="46" height="42" rx="5" fill="#CBD5E1" />
              <rect x="56" y="24" width="46" height="42" rx="5" fill="#94A3B8" />
              <rect x="62" y="18" width="56" height="52" rx="6" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.4" />
              <rect x="70" y="28" width="26" height="3" rx="1.5" fill="#0D306C" />
              <rect x="70" y="35" width="38" height="2" rx="1" fill="#64748B" />
              <rect x="70" y="40" width="32" height="2" rx="1" fill="#64748B" />
              <rect x="70" y="45" width="28" height="2" rx="1" fill="#64748B" />
              <circle cx="106" cy="56" r="11" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <circle cx="106" cy="56" r="8" fill="#DE8017" />
              <path d="M103 56 L105 58 L109 54" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ) : index === 12 ? (
            /* 12. Board reporting: Executive dial gauge & board summary chart */
            <g transform="translate(15, 0)">
              <rect x="50" y="22" width="76" height="56" rx="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              <rect x="50" y="22" width="76" height="12" rx="7" fill="#0D306C" />
              <text x="88" y="30.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">BOARD PACK</text>
              <path d="M68 62 A 16 16 0 0 1 100 62" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
              <path d="M68 62 A 16 16 0 0 1 96 52" fill="none" stroke="#008EC4" strokeWidth="4" strokeLinecap="round" />
              <circle cx="84" cy="62" r="3" fill="#0D306C" />
              <line x1="84" y1="62" x2="94" y2="52" stroke="#DE8017" strokeWidth="2" strokeLinecap="round" />
              <rect x="104" y="44" width="18" height="20" rx="3" fill={`url(#${idPrefix}-navy)`} />
              <text x="113" y="56" textAnchor="middle" fill={`url(#${idPrefix}-amber)`} fontSize="6" fontWeight="bold">KPI</text>
            </g>
          ) : index === 13 ? (
            /* 13. Data governance coordination: Secure database cylinder & cryptographic lock */
            <g transform="translate(15, 0)">
              <ellipse cx="88" cy="28" rx="28" ry="9" fill="#38BDF8" stroke="#0D306C" strokeWidth="1.2" />
              <path d="M60 28 L60 42 C60 47 72 51 88 51 C104 51 116 47 116 42 L116 28" fill="#BAE6FD" stroke="#0D306C" strokeWidth="1.2" />
              <path d="M60 42 L60 56 C60 61 72 65 88 65 C104 65 116 61 116 56 L116 42" fill="#E0F2FE" stroke="#0D306C" strokeWidth="1.2" />
              <circle cx="88" cy="60" r="12" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <rect x="83" y="58" width="10" height="8" rx="2" fill={`url(#${idPrefix}-amber)`} />
              <path d="M85 58 L85 55 C85 53 91 53 91 55 L91 58" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
            </g>
          ) : index === 14 ? (
            /* 14. Business continuity governance: Dual server failover loop & 99.99% uptime badge */
            <g transform="translate(15, 0)">
              <rect x="46" y="32" width="30" height="42" rx="4" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.2" />
              <line x1="52" y1="40" x2="70" y2="40" stroke="#008EC4" strokeWidth="2" />
              <line x1="52" y1="48" x2="70" y2="48" stroke="#008EC4" strokeWidth="2" />
              <circle cx="68" cy="62" r="2.5" fill="#10B981" />
              <rect x="100" y="32" width="30" height="42" rx="4" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
              <line x1="106" y1="40" x2="124" y2="40" stroke="#38BDF8" strokeWidth="2" />
              <line x1="106" y1="48" x2="124" y2="48" stroke="#38BDF8" strokeWidth="2" />
              <circle cx="122" cy="62" r="2.5" fill="#10B981" />
              <path d="M78 44 C84 38 92 38 98 44" stroke={`url(#${idPrefix}-amber)`} strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M98 56 C92 62 84 62 78 56" stroke={`url(#${idPrefix}-amber)`} strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <text x="88" y="24" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">99.99% DR</text>
            </g>
          ) : (
            /* 15. Issue remediation: Remediation ticket with closed checkmark stamp */
            <g transform="translate(15, 0)">
              <rect x="52" y="20" width="64" height="62" rx="7" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <rect x="52" y="20" width="64" height="12" rx="7" fill="#0D306C" />
              <text x="84" y="28.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">REMEDIATION</text>
              <rect x="60" y="38" width="32" height="3" rx="1.5" fill="#64748B" />
              <rect x="60" y="44" width="24" height="3" rx="1.5" fill="#94A3B8" />
              <rect x="60" y="50" width="28" height="3" rx="1.5" fill="#94A3B8" />
              <rect x="80" y="54" width="34" height="16" rx="4" fill="#10B981" filter={`url(#${idPrefix}-glow)`} />
              <text x="97" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">RESOLVED ✓</text>
            </g>
          )
        ) : variant === "scale" ? (
          /* ==========================================================
             SCALE & EXPANSION SCOPE (17 CARDS)
             ========================================================== */
          index === 0 ? (
            /* 0. Mandate expansion: Telescope / horizon compass pointing toward next milestone */
            <g transform="translate(15, 0)">
              <circle cx="88" cy="48" r="26" stroke="#008EC4" strokeWidth="1.4" fill="none" />
              <circle cx="88" cy="48" r="16" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" fill="none" />
              <polygon points="88,26 94,44 88,42 82,44" fill={`url(#${idPrefix}-amber)`} />
              <polygon points="88,70 94,52 88,54 82,52" fill="#0D306C" />
              <circle cx="88" cy="48" r="3.5" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.5" />
              <text x="88" y="20" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">EXPAND</text>
            </g>
          ) : index === 1 ? (
            /* 1. Workforce planning: Multi-tier recruitment funnel and capacity bars */
            <g transform="translate(15, 0)">
              <polygon points="56,24 120,24 104,44 72,44" fill="#0D306C" />
              <polygon points="70,47 106,47 98,62 78,62" fill="#008EC4" />
              <polygon points="76,65 100,65 94,76 82,76" fill={`url(#${idPrefix}-amber)`} />
              <circle cx="88" cy="76" r="3" fill="#DE8017" />
              <circle cx="120" cy="50" r="8" fill="#38BDF8" />
              <text x="120" y="53" textAnchor="middle" fill="#0D306C" fontSize="8" fontWeight="bold">+</text>
            </g>
          ) : index === 2 ? (
            /* 2. Leadership evolution: Generalist to functional leadership team tree */
            <g transform="translate(15, 0)">
              <circle cx="88" cy="22" r="7" fill={`url(#${idPrefix}-amber)`} />
              <path d="M88 30 L88 42 M56 54 L56 42 L120 42 L120 54" stroke="#008EC4" strokeWidth="1.5" fill="none" />
              <rect x="42" y="54" width="28" height="16" rx="4" fill="#0D306C" />
              <text x="56" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">TECH</text>
              <rect x="74" y="54" width="28" height="16" rx="4" fill="#008EC4" />
              <text x="88" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">PRODUCT</text>
              <rect x="106" y="54" width="28" height="16" rx="4" fill={`url(#${idPrefix}-navy)`} />
              <text x="120" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">DATA</text>
            </g>
          ) : index === 3 ? (
            /* 3. Operating-model redesign: Interlocking enterprise workflow gears */
            <g transform="translate(15, 0)">
              <circle cx="76" cy="46" r="16" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.5" filter={`url(#${idPrefix}-glow)`} />
              <circle cx="76" cy="46" r="6" fill="#FFFFFF" />
              <circle cx="102" cy="56" r="12" fill={`url(#${idPrefix}-amber)`} stroke="#DE8017" strokeWidth="1.2" />
              <circle cx="102" cy="56" r="4" fill="#FFFFFF" />
              <path d="M50 68 L64 68 M114 36 L128 36" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : index === 4 ? (
            /* 4. New functions: Modular function building blocks docking into central core */
            <g transform="translate(15, 0)">
              <rect x="70" y="32" width="36" height="36" rx="6" fill={`url(#${idPrefix}-navy)`} />
              <text x="88" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">CORE</text>
              <rect x="44" y="40" width="20" height="20" rx="4" fill="#008EC4" stroke="#FFFFFF" strokeWidth="1" />
              <text x="54" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">OPS</text>
              <rect x="112" y="40" width="20" height="20" rx="4" fill={`url(#${idPrefix}-amber)`} stroke="#FFFFFF" strokeWidth="1" />
              <text x="122" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">AI</text>
              <rect x="78" y="10" width="20" height="18" rx="4" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />
              <text x="88" y="21" textAnchor="middle" fill="#0D306C" fontSize="5" fontWeight="bold">DATA</text>
            </g>
          ) : index === 5 ? (
            /* 5. New teams: Concentric agile squad nodes expanding outward */
            <g transform="translate(15, 0)">
              <circle cx="88" cy="48" r="28" stroke="#CDE0F3" strokeWidth="1.2" strokeDasharray="4 2" fill="none" />
              <circle cx="88" cy="48" r="10" fill="#0D306C" />
              <text x="88" y="50.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">POD 1</text>
              <circle cx="88" cy="20" r="8" fill="#008EC4" />
              <text x="88" y="22.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">POD 2</text>
              <circle cx="114" cy="62" r="8" fill={`url(#${idPrefix}-amber)`} />
              <text x="114" y="64.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">POD 3</text>
              <circle cx="62" cy="62" r="8" fill="#38BDF8" />
              <text x="62" y="64.5" textAnchor="middle" fill="#0D306C" fontSize="5" fontWeight="bold">POD 4</text>
            </g>
          ) : index === 6 ? (
            /* 6. New city assessment: Dual-city pins and comparison scale */
            <g transform="translate(15, 0)">
              <circle cx="62" cy="38" r="8" fill="#0D306C" />
              <circle cx="62" cy="38" r="3" fill="#FFFFFF" />
              <text x="62" y="54" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">CITY A</text>
              <circle cx="114" cy="38" r="8" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
              <circle cx="114" cy="38" r="3" fill="#FFFFFF" />
              <text x="114" y="54" textAnchor="middle" fill="#DE8017" fontSize="5.5" fontWeight="bold">CITY B</text>
              <path d="M70 38 Q 88 24, 106 38" stroke="#008EC4" strokeWidth="2" strokeDasharray="3 2" fill="none" />
              <rect x="74" y="64" width="28" height="10" rx="3" fill="#008EC4" />
              <text x="88" y="71" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">FEASIBLE</text>
            </g>
          ) : index === 7 ? (
            /* 7. Distributed and remote operating model: Cloud operations hub with laptops */
            <g transform="translate(15, 0)">
              <path d="M74 34 C74 30 78 26 84 26 C88 24 94 25 96 28 C100 28 104 31 104 35 C106 37 106 41 103 44 C100 46 76 46 74 44 Z" fill="#0D306C" />
              <text x="89" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">CLOUD</text>
              <rect x="50" y="56" width="22" height="14" rx="2" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
              <line x1="46" y1="70" x2="76" y2="70" stroke="#008EC4" strokeWidth="1.5" />
              <line x1="61" y1="56" x2="78" y2="44" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
              <rect x="104" y="56" width="22" height="14" rx="2" fill="#FFFFFF" stroke="#DE8017" strokeWidth="1.2" />
              <line x1="100" y1="70" x2="130" y2="70" stroke="#DE8017" strokeWidth="1.5" />
              <line x1="115" y1="56" x2="98" y2="44" stroke="#DE8017" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          ) : index === 8 ? (
            /* 8. Capability maturity: 4-step capability maturity stairway */
            <g transform="translate(15, 0)">
              <rect x="46" y="62" width="18" height="16" rx="2" fill="#CBD5E1" />
              <rect x="66" y="50" width="18" height="28" rx="2" fill="#38BDF8" />
              <rect x="86" y="36" width="18" height="42" rx="2" fill="#008EC4" />
              <rect x="106" y="22" width="18" height="56" rx="2" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <polygon points="115,10 119,16 123,12 127,16 131,10 131,18 115,18" fill={`url(#${idPrefix}-amber)`} />
              <text x="115" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">OWN</text>
            </g>
          ) : index === 9 ? (
            /* 9. Automation: Automated workflow pipeline with robotic gear */
            <g transform="translate(15, 0)">
              <rect x="48" y="38" width="80" height="20" rx="10" fill="#EDF6FD" stroke="#008EC4" strokeWidth="1.2" />
              <line x1="58" y1="48" x2="118" y2="48" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 3" />
              <circle cx="88" cy="48" r="14" fill={`url(#${idPrefix}-navy)`} filter={`url(#${idPrefix}-glow)`} />
              <polygon points="88,38 83,49 89,49 87,58 94,47 88,47" fill={`url(#${idPrefix}-amber)`} />
              <text x="88" y="74" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">AUTO SCALE</text>
            </g>
          ) : index === 10 ? (
            /* 10. AI enablement: Neural network brain cluster & developer terminal */
            <g transform="translate(15, 0)">
              <rect x="52" y="24" width="72" height="46" rx="6" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.2" />
              <rect x="52" y="24" width="72" height="10" rx="6" fill="#081E44" />
              <circle cx="58" cy="29" r="2" fill="#EF4444" />
              <circle cx="64" cy="29" r="2" fill="#FBBF24" />
              <circle cx="70" cy="29" r="2" fill="#10B981" />
              <circle cx="72" cy="48" r="4" fill="#38BDF8" />
              <circle cx="88" cy="42" r="5" fill={`url(#${idPrefix}-amber)`} />
              <circle cx="104" cy="48" r="4" fill="#008EC4" />
              <line x1="72" y1="48" x2="88" y2="42" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="88" y1="42" x2="104" y2="48" stroke="#008EC4" strokeWidth="1.5" />
              <text x="88" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">AI ACCELERATED</text>
            </g>
          ) : index === 11 ? (
            /* 11. Governance redesign: Multi-layered governance shields aggregating metrics */
            <g transform="translate(15, 0)">
              <path d="M72 32 C72 32 80 35 88 32 C88 48 82 56 72 64 C62 56 56 48 56 32 C64 35 72 32 72 32 Z" fill="#008EC4" />
              <path d="M104 32 C104 32 112 35 120 32 C120 48 114 56 104 64 C94 56 88 48 88 32 C96 35 104 32 104 32 Z" fill={`url(#${idPrefix}-amber)`} />
              <path d="M88 20 C88 20 98 23 108 20 C108 40 98 52 88 62 C78 52 68 40 68 20 C78 23 88 20 88 20 Z" fill={`url(#${idPrefix}-navy)`} stroke="#FFFFFF" strokeWidth="1.5" />
              <path d="M82 36 L86 40 L94 32" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : index === 12 ? (
            /* 12. Service-management maturity: Service level speedometer at 99.9% */
            <g transform="translate(15, 0)">
              <circle cx="88" cy="50" r="28" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
              <path d="M68 56 A 22 22 0 1 1 108 56" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
              <path d="M68 56 A 22 22 0 1 1 104 42" fill="none" stroke="#008EC4" strokeWidth="4" strokeLinecap="round" />
              <circle cx="88" cy="50" r="3.5" fill="#0D306C" />
              <line x1="88" y1="50" x2="104" y2="40" stroke="#DE8017" strokeWidth="2" strokeLinecap="round" />
              <rect x="74" y="64" width="28" height="11" rx="3" fill="#0D306C" />
              <text x="88" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">99.9% SLA</text>
            </g>
          ) : index === 13 ? (
            /* 13. Vendor rationalization: Funnel consolidating suppliers into strategic tier */
            <g transform="translate(15, 0)">
              <polygon points="54,24 122,24 98,54 78,54" fill="#0D306C" />
              <line x1="62" y1="30" x2="114" y2="30" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="78" y="56" width="20" height="20" rx="3" fill={`url(#${idPrefix}-amber)`} />
              <text x="88" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">3x</text>
              <text x="88" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="4" fontWeight="bold">TIER 1</text>
            </g>
          ) : index === 14 ? (
            /* 14. Operating-cost visibility: 3-tier cost visibility pyramid */
            <g transform="translate(15, 0)">
              <polygon points="88,18 106,36 70,36" fill={`url(#${idPrefix}-navy)`} />
              <text x="88" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">PEOPLE</text>
              <polygon points="70,39 106,39 116,56 60,56" fill="#008EC4" />
              <text x="88" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">SERVICES</text>
              <polygon points="60,59 116,59 126,76 50,76" fill="#38BDF8" />
              <text x="88" y="70" textAnchor="middle" fill="#0D306C" fontSize="5" fontWeight="bold">INFRASTRUCTURE</text>
            </g>
          ) : index === 15 ? (
            /* 15. Succession: Leadership bench handover baton pass */
            <g transform="translate(15, 0)">
              <circle cx="66" cy="36" r="8" fill="#0D306C" />
              <circle cx="66" cy="36" r="3" fill="#FFFFFF" />
              <circle cx="110" cy="36" r="8" fill="#008EC4" />
              <circle cx="110" cy="36" r="3" fill="#FFFFFF" />
              <line x1="74" y1="36" x2="102" y2="36" stroke={`url(#${idPrefix}-amber)`} strokeWidth="3" strokeLinecap="round" />
              <rect x="70" y="56" width="36" height="14" rx="4" fill="#0D306C" />
              <text x="88" y="65.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">READY NOW</text>
            </g>
          ) : (
            /* 16. Transition planning: Strategic bridge from partner to captive entity */
            <g transform="translate(15, 0)">
              <path d="M48 64 C60 40 76 40 88 64 C100 40 116 40 128 64" fill="none" stroke="#008EC4" strokeWidth="2.5" />
              <line x1="44" y1="64" x2="132" y2="64" stroke="#0D306C" strokeWidth="2" />
              <rect x="46" y="44" width="8" height="20" fill="#64748B" />
              <rect x="122" y="36" width="10" height="28" fill={`url(#${idPrefix}-navy)`} />
              <polygon points="127,24 137,28 127,32" fill={`url(#${idPrefix}-amber)`} />
              <line x1="127" y1="24" x2="127" y2="36" stroke="#0D306C" strokeWidth="1.5" />
              <text x="88" y="32" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">CAPTIVE TRANSITION</text>
            </g>
          )
        ) : variant === "performance" ? (
          /* ==========================================================
             PERFORMANCE & SERVICE MANAGEMENT SCOPE (17 CARDS)
             ========================================================== */
          index === 0 ? (
              /* 0. Service catalogue: Multi-layered catalog index with tab markers and owner tags */
              <g transform="translate(15, 0)">
                <rect x="50" y="22" width="76" height="52" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                <rect x="44" y="28" width="76" height="48" rx="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.2" />
                <rect x="38" y="34" width="76" height="44" rx="6" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.5" />
                <rect x="44" y="22" width="16" height="6" rx="2" fill="#0D306C" />
                <rect x="64" y="22" width="16" height="6" rx="2" fill="#008EC4" />
                <rect x="84" y="22" width="16" height="6" rx="2" fill={`url(#${idPrefix}-amber)`} />
                <line x1="46" y1="44" x2="88" y2="44" stroke="#0D306C" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="46" y1="52" x2="102" y2="52" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="46" y1="60" x2="76" y2="60" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="88" y="58" width="38" height="14" rx="4" fill={`url(#${idPrefix}-navy)`} />
                <text x="107" y="67.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">CATALOGUE</text>
              </g>
            ) : index === 1 ? (
              /* 1. Service ownership: Executive accountability badge with rosette ribbon & star */
              <g transform="translate(15, 0)">
                <circle cx="88" cy="40" r="18" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.8" />
                <circle cx="88" cy="40" r="14" fill={`url(#${idPrefix}-navy)`} />
                <polygon points="88,30 91.5,37 99,38 93.5,43 95,50 88,46.5 81,50 82.5,43 77,38 84.5,37" fill={`url(#${idPrefix}-amber)`} />
                <path d="M78 52 L72 74 L82 70 L86 56" fill="#008EC4" />
                <path d="M98 52 L104 74 L94 70 L90 56" fill="#38BDF8" />
                <rect x="68" y="60" width="40" height="13" rx="3.5" fill="#FFFFFF" stroke="#DE8017" strokeWidth="1.2" />
                <text x="88" y="69" textAnchor="middle" fill="#DE8017" fontSize="5.5" fontWeight="bold">ACCOUNTABLE</text>
              </g>
            ) : index === 2 ? (
              /* 2. SLAs: SLA guarantee contract badge with agreed commitment badge */
              <g transform="translate(15, 0)">
                <rect x="52" y="18" width="72" height="58" rx="6" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.5" />
                <rect x="52" y="18" width="72" height="12" rx="5" fill="#0D306C" />
                <text x="88" y="27" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">SLA COMMITMENT</text>
                <circle cx="88" cy="48" r="15" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                <circle cx="88" cy="48" r="12" fill="#FFFFFF" />
                <text x="88" y="47.5" textAnchor="middle" fill="#0D306C" fontSize="7" fontWeight="extrabold">99.9%</text>
                <text x="88" y="54" textAnchor="middle" fill="#DE8017" fontSize="4.5" fontWeight="bold">UPTIME SLA</text>
                <path d="M60 66 L72 66 M104 66 L116 66" stroke="#008EC4" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            ) : index === 3 ? (
              /* 3. OLAs: Interlocking cross-functional team chain links & synchronized sync */
              <g transform="translate(15, 0)">
                <rect x="42" y="32" width="36" height="26" rx="6" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.8" />
                <text x="60" y="48" textAnchor="middle" fill="#0D306C" fontSize="7" fontWeight="bold">TEAM A</text>
                <rect x="98" y="32" width="36" height="26" rx="6" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.8" />
                <text x="116" y="48" textAnchor="middle" fill="#008EC4" fontSize="7" fontWeight="bold">TEAM B</text>
                <path d="M72 45 L104 45" stroke={`url(#${idPrefix}-amber)`} strokeWidth="4" strokeLinecap="round" />
                <circle cx="88" cy="45" r="7" fill={`url(#${idPrefix}-navy)`} />
                <text x="88" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">OLA</text>
                <rect x="66" y="64" width="44" height="12" rx="3.5" fill="#EDF4FB" stroke="#008EC4" strokeWidth="1" />
                <text x="88" y="72.5" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">SHARED HANDOFF</text>
              </g>
            ) : index === 4 ? (
              /* 4. RACI: 4-quadrant accountability matrix */
              <g transform="translate(15, 0)">
                <rect x="52" y="20" width="72" height="54" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                <line x1="88" y1="20" x2="88" y2="74" stroke="#E2E8F0" strokeWidth="1.5" />
                <line x1="52" y1="47" x2="124" y2="47" stroke="#E2E8F0" strokeWidth="1.5" />
                <circle cx="70" cy="33.5" r="9" fill="#0D306C" />
                <text x="70" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">R</text>
                <circle cx="106" cy="33.5" r="9" fill={`url(#${idPrefix}-amber)`} />
                <text x="106" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">A</text>
                <circle cx="70" cy="60.5" r="9" fill="#008EC4" />
                <text x="70" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">C</text>
                <circle cx="106" cy="60.5" r="9" fill="#38BDF8" />
                <text x="106" y="64" textAnchor="middle" fill="#0D306C" fontSize="8" fontWeight="bold">I</text>
              </g>
            ) : index === 5 ? (
              /* 5. Intake model: Prioritization funnel with intake filter gate */
              <g transform="translate(15, 0)">
                <polygon points="56,22 120,22 102,46 74,46" fill="#0D306C" />
                <text x="88" y="36" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">INCOMING WORK</text>
                <polygon points="72,48 104,48 96,62 80,62" fill="#008EC4" />
                <rect x="76" y="64" width="24" height="12" rx="3" fill={`url(#${idPrefix}-amber)`} />
                <text x="88" y="72.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">PRIORITIZED</text>
                <circle cx="120" cy="36" r="6" fill="#EF4444" />
                <text x="120" y="38.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">NO</text>
              </g>
            ) : index === 6 ? (
              /* 6. Delivery workflows: 3-step chevron workflow pipeline with explicit handoffs */
              <g transform="translate(15, 0)">
                <polygon points="44,32 68,32 76,46 68,60 44,60 52,46" fill="#0D306C" />
                <text x="58" y="48.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">INTAKE</text>
                <polygon points="74,32 98,32 106,46 98,60 74,60 82,46" fill="#008EC4" />
                <text x="88" y="48.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">BUILD</text>
                <polygon points="104,32 128,32 136,46 128,60 104,60 112,46" fill={`url(#${idPrefix}-amber)`} />
                <text x="118" y="48.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">DELIVER</text>
                <circle cx="75" cy="46" r="2.5" fill="#FFFFFF" />
                <circle cx="105" cy="46" r="2.5" fill="#FFFFFF" />
                <rect x="66" y="65" width="44" height="11" rx="3" fill="#EDF4FB" />
                <text x="88" y="73" textAnchor="middle" fill="#0D306C" fontSize="5" fontWeight="bold">EXPLICIT HANDOFFS</text>
              </g>
            ) : index === 7 ? (
              /* 7. KPI framework: 5-pillar balanced scorecard pentagon target */
              <g transform="translate(15, 0)">
                <polygon points="88,20 116,40 105,70 71,70 60,40" stroke="#CDE0F3" strokeWidth="1.5" fill="#F8FAFC" />
                <polygon points="88,28 107,42 100,62 76,62 69,42" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" />
                <polygon points="88,32 102,44 96,58 80,58 74,44" fill={`url(#${idPrefix}-cyan)`} opacity="0.4" />
                <circle cx="88" cy="20" r="3.5" fill="#0D306C" />
                <circle cx="116" cy="40" r="3.5" fill="#008EC4" />
                <circle cx="105" cy="70" r="3.5" fill={`url(#${idPrefix}-amber)`} />
                <circle cx="71" cy="70" r="3.5" fill="#38BDF8" />
                <circle cx="60" cy="40" r="3.5" fill="#10B981" />
                <rect x="70" y="42" width="36" height="12" rx="3" fill="#0D306C" />
                <text x="88" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">5 KPI PILLARS</text>
              </g>
            ) : index === 8 ? (
              /* 8. Operating rhythm: Weekly / Monthly / Quarterly cadence clock dial */
              <g transform="translate(15, 0)">
                <circle cx="88" cy="44" r="26" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.5" />
                <circle cx="88" cy="44" r="20" fill="#F8FAFC" stroke="#008EC4" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="88" y1="44" x2="88" y2="26" stroke="#0D306C" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="88" y1="44" x2="104" y2="44" stroke={`url(#${idPrefix}-amber)`} strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="88" cy="44" r="4" fill="#0D306C" />
                <rect x="44" y="64" width="26" height="11" rx="3" fill="#0D306C" />
                <text x="57" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">WEEKLY</text>
                <rect x="75" y="64" width="26" height="11" rx="3" fill="#008EC4" />
                <text x="88" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">MONTHLY</text>
                <rect x="106" y="64" width="26" height="11" rx="3" fill={`url(#${idPrefix}-amber)`} />
                <text x="119" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">QUARTERLY</text>
              </g>
            ) : index === 9 ? (
              /* 9. Escalation model: Stepped 3-tier escalation ladder with emergency alert beacon */
              <g transform="translate(15, 0)">
                <rect x="46" y="52" width="24" height="20" rx="3" fill="#64748B" />
                <text x="58" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">L1</text>
                <rect x="76" y="38" width="24" height="34" rx="3" fill="#008EC4" />
                <text x="88" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">L2</text>
                <rect x="106" y="24" width="24" height="48" rx="3" fill={`url(#${idPrefix}-navy)`} />
                <text x="118" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">HQ</text>
                <path d="M58 48 Q 88 20 114 18" stroke={`url(#${idPrefix}-amber)`} strokeWidth="2" strokeDasharray="3 2" fill="none" />
                <circle cx="118" cy="18" r="5" fill="#EF4444" filter={`url(#${idPrefix}-glow)`} />
                <text x="118" y="20.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">!</text>
              </g>
            ) : index === 10 ? (
              /* 10. Executive dashboards: Multi-metric cockpit with gauge, bars & telemetry */
              <g transform="translate(15, 0)">
                <rect x="46" y="20" width="84" height="56" rx="6" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.5" />
                <rect x="46" y="20" width="84" height="12" rx="5" fill="#0D306C" />
                <circle cx="54" cy="26" r="2" fill="#EF4444" />
                <circle cx="60" cy="26" r="2" fill="#FBBF24" />
                <circle cx="66" cy="26" r="2" fill="#10B981" />
                <text x="96" y="28.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">EXECUTIVE KPI COCKPIT</text>
                <path d="M58 56 A 14 14 0 0 1 82 56" stroke="#E2E8F0" strokeWidth="4" fill="none" />
                <path d="M58 56 A 14 14 0 0 1 76 44" stroke={`url(#${idPrefix}-amber)`} strokeWidth="4" fill="none" />
                <text x="70" y="60" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">HEALTH</text>
                <rect x="92" y="52" width="6" height="14" rx="1.5" fill="#38BDF8" />
                <rect x="101" y="44" width="6" height="22" rx="1.5" fill="#008EC4" />
                <rect x="110" y="38" width="6" height="28" rx="1.5" fill={`url(#${idPrefix}-navy)`} />
                <rect x="119" y="32" width="6" height="34" rx="1.5" fill={`url(#${idPrefix}-amber)`} />
              </g>
            ) : index === 11 ? (
              /* 11. Stakeholder reporting: Multi-tiered report dossiers branched to roles */
              <g transform="translate(15, 0)">
                <rect x="42" y="26" width="34" height="44" rx="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.2" />
                <rect x="42" y="26" width="34" height="10" rx="3" fill="#64748B" />
                <text x="59" y="33.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">CFO PACK</text>
                <line x1="48" y1="42" x2="68" y2="42" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="48" y1="48" x2="64" y2="48" stroke="#CBD5E1" strokeWidth="1.5" />
                <rect x="71" y="20" width="34" height="50" rx="4" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.4" />
                <rect x="71" y="20" width="34" height="11" rx="3" fill="#008EC4" />
                <text x="88" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">SPONSOR</text>
                <circle cx="88" cy="44" r="8" fill={`url(#${idPrefix}-amber)`} />
                <text x="88" y="46.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">ROI</text>
                <rect x="100" y="28" width="34" height="42" rx="4" fill="#FFFFFF" stroke="#0D306C" strokeWidth="1.2" />
                <rect x="100" y="28" width="34" height="10" rx="3" fill="#0D306C" />
                <text x="117" y="35.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">OPS LEAD</text>
              </g>
            ) : index === 12 ? (
              /* 12. Automation backlog: Scored AI queue with prioritization pipeline */
              <g transform="translate(15, 0)">
                <rect x="46" y="20" width="84" height="56" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                <rect x="52" y="26" width="72" height="12" rx="3" fill="#EDF6FD" stroke="#008EC4" strokeWidth="1" />
                <rect x="55" y="28.5" width="14" height="7" rx="2" fill={`url(#${idPrefix}-amber)`} />
                <text x="62" y="33.5" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">P1</text>
                <text x="82" y="34.5" fill="#0D306C" fontSize="5" fontWeight="bold">AGENT WORKFLOW</text>
                <rect x="52" y="42" width="72" height="12" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <rect x="55" y="44.5" width="14" height="7" rx="2" fill="#008EC4" />
                <text x="62" y="49.5" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">P2</text>
                <text x="82" y="50.5" fill="#64748B" fontSize="5" fontWeight="bold">DATA PIPELINE</text>
                <rect x="52" y="58" width="72" height="12" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <rect x="55" y="60.5" width="14" height="7" rx="2" fill="#64748B" />
                <text x="62" y="65.5" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">P3</text>
                <text x="82" y="66.5" fill="#94A3B8" fontSize="5" fontWeight="bold">RPA MIGRATION</text>
              </g>
            ) : index === 13 ? (
              /* 13. Continuous improvement: PDCA / Kaizen retrospective feedback loop */
              <g transform="translate(15, 0)">
                <circle cx="88" cy="45" r="25" fill="#FFFFFF" stroke="#CDE0F3" strokeWidth="1.2" />
                <path d="M88 23 A 22 22 0 0 1 110 45" stroke="#0D306C" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M110 45 A 22 22 0 0 1 88 67" stroke="#008EC4" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M88 67 A 22 22 0 0 1 66 45" stroke={`url(#${idPrefix}-amber)`} strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M66 45 A 22 22 0 0 1 88 23" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="88" cy="45" r="9" fill={`url(#${idPrefix}-navy)`} />
                <text x="88" y="47.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">KAIZEN</text>
                <rect x="68" y="65" width="40" height="11" rx="3" fill="#FFFFFF" stroke="#DE8017" strokeWidth="1" />
                <text x="88" y="73" textAnchor="middle" fill="#DE8017" fontSize="5" fontWeight="bold">ACTION CLOSURE</text>
              </g>
            ) : index === 14 ? (
              /* 14. Maturity roadmap: 3-phase ascension staircase (Execute to Own to Innovate) */
              <g transform="translate(15, 0)">
                <rect x="46" y="54" width="26" height="18" rx="3" fill="#64748B" />
                <text x="59" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">EXECUTE</text>
                <rect x="75" y="40" width="26" height="32" rx="3" fill="#008EC4" />
                <text x="88" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">OWN</text>
                <rect x="104" y="24" width="26" height="48" rx="3" fill={`url(#${idPrefix}-navy)`} />
                <text x="117" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">INNOVATE</text>
                <line x1="117" y1="12" x2="117" y2="24" stroke="#0D306C" strokeWidth="1.5" />
                <polygon points="117,12 129,16 117,20" fill={`url(#${idPrefix}-amber)`} />
                <circle cx="59" cy="54" r="2.5" fill="#38BDF8" />
                <circle cx="88" cy="40" r="2.5" fill="#38BDF8" />
                <circle cx="117" cy="24" r="2.5" fill={`url(#${idPrefix}-amber)`} />
              </g>
            ) : index === 15 ? (
              /* 15. Benchmarking: Global GCC quartile peer distribution chart */
              <g transform="translate(15, 0)">
                <line x1="48" y1="68" x2="128" y2="68" stroke="#64748B" strokeWidth="1.5" />
                <line x1="48" y1="20" x2="48" y2="68" stroke="#64748B" strokeWidth="1.5" />
                <rect x="56" y="48" width="12" height="20" rx="2" fill="#CBD5E1" />
                <rect x="72" y="38" width="12" height="30" rx="2" fill="#94A3B8" />
                <rect x="88" y="30" width="12" height="38" rx="2" fill="#008EC4" />
                <rect x="104" y="20" width="14" height="48" rx="2" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                <text x="111" y="16" textAnchor="middle" fill="#DE8017" fontSize="5.5" fontWeight="bold">TOP 10%</text>
                <text x="62" y="75" textAnchor="middle" fill="#64748B" fontSize="4.5">Q1</text>
                <text x="78" y="75" textAnchor="middle" fill="#64748B" fontSize="4.5">Q2</text>
                <text x="94" y="75" textAnchor="middle" fill="#64748B" fontSize="4.5">Q3</text>
                <text x="111" y="75" textAnchor="middle" fill="#DE8017" fontSize="5" fontWeight="bold">YOU</text>
              </g>
            ) : (
              /* 16. Value realization tracking: Direct value bridge connecting GCC delivery to HQ ROI */
              <g transform="translate(15, 0)">
                <path d="M46 58 C62 34 84 34 98 58" fill="none" stroke="#008EC4" strokeWidth="2.5" />
                <path d="M78 58 C94 34 116 34 130 58" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
                <rect x="42" y="46" width="14" height="22" rx="3" fill="#0D306C" />
                <text x="49" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">GCC</text>
                <rect x="120" y="40" width="16" height="28" rx="3" fill={`url(#${idPrefix}-navy)`} />
                <text x="128" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">HQ</text>
                <circle cx="88" cy="38" r="11" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                <text x="88" y="41.5" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="extrabold">$ ROI</text>
                <rect x="70" y="64" width="36" height="11" rx="3" fill="#0D306C" />
                <text x="88" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">VALUE LINKED</text>
              </g>
            )
          ) : variant === "workstreams" ? (
            /* ==========================================================
               PARALLEL WORKSTREAMS (10 CARDS)
               ========================================================== */
            index === 0 ? (
              /* 0. Mandate & operating model: Charter parchment, decision tree & official gold stamp */
              <g transform="translate(15, 0)">
                {/* Charter document */}
                <rect x="52" y="20" width="54" height="66" rx="5" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" filter={`url(#${idPrefix}-glow)`} />
                <rect x="60" y="28" width="24" height="3.5" rx="1.7" fill="#0D306C" />
                <rect x="60" y="36" width="38" height="2.5" rx="1.2" fill="#38BDF8" />
                <rect x="60" y="42" width="34" height="2.5" rx="1.2" fill="#94A3B8" />
                <rect x="60" y="48" width="30" height="2.5" rx="1.2" fill="#94A3B8" />
                {/* Hierarchy tree connector */}
                <path d="M96 54 L114 54 L114 36 L124 36 M114 54 L124 54 M114 54 L114 70 L124 70" stroke="#008EC4" strokeWidth="1.4" fill="none" strokeDasharray="2 1.5" />
                <circle cx="126" cy="36" r="3.5" fill="#38BDF8" />
                <circle cx="126" cy="54" r="4.5" fill={`url(#${idPrefix}-amber)`} />
                <circle cx="126" cy="70" r="3.5" fill="#008EC4" />
                {/* Seal */}
                <circle cx="68" cy="66" r="8" fill={`url(#${idPrefix}-amber)`} />
                <path d="M65 66 L67 68 L71 64" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : index === 1 ? (
              /* 1. Entity and location coordination: Multi-city triangulation & entity incorporation badge */
              <g transform="translate(15, 0)">
                {/* Coordinate grid lines */}
                <line x1="45" y1="52" x2="135" y2="52" stroke="#169DC8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
                <line x1="90" y1="20" x2="90" y2="84" stroke="#169DC8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
                {/* Triangulation network */}
                <polygon points="62,64 116,40 92,76" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 2" />
                {/* City Pin 1: BLR */}
                <g transform="translate(62, 64)">
                  <circle cx="0" cy="0" r="7" fill={`url(#${idPrefix}-cyan)`} filter={`url(#${idPrefix}-glow)`} />
                  <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
                  <text x="-1" y="-9" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">BLR</text>
                </g>
                {/* City Pin 2: HYD */}
                <g transform="translate(116, 40)">
                  <circle cx="0" cy="0" r="6" fill={`url(#${idPrefix}-navy)`} stroke="#38BDF8" strokeWidth="1" />
                  <circle cx="0" cy="0" r="2" fill="#38BDF8" />
                  <text x="0" y="-8" textAnchor="middle" fill="#7DD3FC" fontSize="5" fontWeight="bold">HYD</text>
                </g>
                {/* City Pin 3: PNQ */}
                <g transform="translate(92, 76)">
                  <circle cx="0" cy="0" r="5" fill="#0D306C" stroke="#008EC4" strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
                </g>
                {/* Entity certificate badge */}
                <rect x="94" y="22" width="36" height="15" rx="3" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1" />
                <text x="112" y="32" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">ENTITY ✓</text>
              </g>
            ) : index === 2 ? (
              /* 2. Hiring OS + Recruitment Hub: NeoHireX AI radar sweep & candidate score */
              <g transform="translate(10, 0)">
                {/* Radar sweep rings */}
                <circle cx="95" cy="52" r="36" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
                <circle cx="95" cy="52" r="24" stroke="#008EC4" strokeWidth="1" opacity="0.5" />
                {/* Scanner sweep beam */}
                <path d="M95 52 L125 30 A36 36 0 0 1 130 52 Z" fill={`url(#${idPrefix}-cyan)`} opacity="0.35" />
                {/* Candidate card */}
                <rect x="52" y="30" width="46" height="52" rx="6" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" filter={`url(#${idPrefix}-glow)`} />
                <circle cx="68" cy="44" r="6" fill={`url(#${idPrefix}-cyan)`} />
                <rect x="60" y="54" width="28" height="3" rx="1.5" fill="#0D306C" />
                <rect x="60" y="60" width="20" height="2.5" rx="1.2" fill="#008EC4" />
                {/* Match score badge */}
                <rect x="104" y="34" width="40" height="16" rx="8" fill={`url(#${idPrefix}-amber)`} />
                <text x="124" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="extrabold">98% FIT</text>
                {/* AI verified tag */}
                <rect x="100" y="58" width="44" height="14" rx="4" fill="#0D306C" />
                <text x="122" y="67.5" textAnchor="middle" fill="#38BDF8" fontSize="6" fontWeight="bold">NeoHireX</text>
              </g>
            ) : index === 3 ? (
              /* 3. HR, payroll and people ops: Payroll balance ledger, benefits shield & timeline */
              <g transform="translate(15, 0)">
                {/* Payroll ledger sheet */}
                <rect x="50" y="24" width="56" height="60" rx="6" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
                <rect x="58" y="32" width="24" height="3.5" rx="1.7" fill="#0D306C" />
                {/* Row 1 */}
                <circle cx="62" cy="44" r="2.5" fill="#008EC4" />
                <rect x="68" y="42.5" width="22" height="3" rx="1.5" fill="#94A3B8" />
                <text x="98" y="45.5" textAnchor="end" fill="#0D306C" fontSize="5.5" fontWeight="bold">₹/€</text>
                {/* Row 2 */}
                <circle cx="62" cy="54" r="2.5" fill="#38BDF8" />
                <rect x="68" y="52.5" width="20" height="3" rx="1.5" fill="#94A3B8" />
                <text x="98" y="55.5" textAnchor="end" fill="#0D306C" fontSize="5.5" fontWeight="bold">100%</text>
                {/* Benefits shield */}
                <g transform="translate(112, 44)">
                  <path d="M0 -14 L12 -8 L12 6 C12 12 0 18 0 18 C0 18 -12 12 -12 6 L-12 -8 Z" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                  <path d="M-3.5 2 L-1 4.5 L4.5 -1.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
                {/* Day 90 milestone tag */}
                <rect x="60" y="68" width="56" height="11" rx="3" fill="#0D306C" />
                <text x="88" y="76" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">DAY 1 → 90 RETENTION</text>
              </g>
            ) : index === 4 ? (
              /* 4. Workspace: Modern tech office skyline, smart RFID keycard & access lock */
              <g transform="translate(15, 0)">
                {/* Office buildings skyline */}
                <rect x="48" y="38" width="22" height="46" rx="2" fill="#CBD5E1" />
                <rect x="52" y="44" width="4" height="4" fill="#FFFFFF" opacity="0.8" />
                <rect x="60" y="44" width="4" height="4" fill="#FFFFFF" opacity="0.8" />
                <rect x="52" y="52" width="4" height="4" fill="#FFFFFF" opacity="0.8" />
                <rect x="60" y="52" width="4" height="4" fill="#FFFFFF" opacity="0.8" />

                <rect x="74" y="24" width="28" height="60" rx="3" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1" />
                <rect x="80" y="32" width="5" height="5" fill="#38BDF8" opacity="0.9" />
                <rect x="90" y="32" width="5" height="5" fill="#38BDF8" opacity="0.9" />
                <rect x="80" y="42" width="5" height="5" fill="#FFFFFF" opacity="0.8" />
                <rect x="90" y="42" width="5" height="5" fill="#38BDF8" opacity="0.9" />
                <rect x="80" y="52" width="5" height="5" fill="#FFFFFF" opacity="0.8" />
                <rect x="90" y="52" width="5" height="5" fill="#FFFFFF" opacity="0.8" />

                {/* RFID Smart Keycard badge */}
                <g transform="translate(108, 46)">
                  <rect x="0" y="0" width="34" height="24" rx="4" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" filter={`url(#${idPrefix}-glow)`} />
                  <circle cx="9" cy="12" r="4" fill={`url(#${idPrefix}-cyan)`} />
                  <rect x="16" y="8" width="12" height="2.5" rx="1" fill="#0D306C" />
                  <rect x="16" y="13" width="8" height="2" rx="1" fill="#94A3B8" />
                  <path d="M28 8 A6 6 0 0 1 28 16" stroke="#DE8017" strokeWidth="1.2" fill="none" />
                </g>
              </g>
            ) : index === 5 ? (
              /* 5. IT & security: Zero-trust perimeter shield, encrypted tunnel & HQ lock */
              <g transform="translate(15, 0)">
                {/* Encrypted network pipeline */}
                <path d="M46 54 L128 54" stroke="#008EC4" strokeWidth="2.5" />
                <path d="M46 54 L128 54" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 3" />
                {/* Zero-trust Shield */}
                <g transform="translate(74, 52)">
                  <path d="M0 -22 L18 -14 L18 6 C18 16 0 24 0 24 C0 24 -18 16 -18 6 L-18 -14 Z" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.5" filter={`url(#${idPrefix}-glow)`} />
                  <circle cx="0" cy="-2" r="6" fill={`url(#${idPrefix}-navy)`} />
                  <path d="M-3 -2 L0 -5 L3 -2 M0 -5 L0 4" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                </g>
                {/* HQ Endpoint Node */}
                <rect x="114" y="42" width="24" height="24" rx="5" fill={`url(#${idPrefix}-navy)`} stroke="#38BDF8" strokeWidth="1" />
                <text x="126" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">HQ</text>
                {/* Security Tag */}
                <rect x="60" y="20" width="38" height="12" rx="3" fill={`url(#${idPrefix}-amber)`} />
                <text x="79" y="28.5" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">ZERO TRUST</text>
              </g>
            ) : index === 6 ? (
              /* 6. Cloud & GPU: Server rack blades, H100 GPU tensor cores & FinOps meter */
              <g transform="translate(15, 0)">
                {/* Server chassis */}
                <rect x="46" y="24" width="60" height="58" rx="5" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
                {/* Rack Blade 1 */}
                <rect x="52" y="30" width="48" height="12" rx="2.5" fill={`url(#${idPrefix}-navy)`} />
                <circle cx="58" cy="36" r="2" fill="#38BDF8" />
                <circle cx="64" cy="36" r="2" fill="#34D399" />
                <rect x="72" y="34.5" width="22" height="3" rx="1" fill="#7DD3FC" />
                {/* Rack Blade 2 */}
                <rect x="52" y="46" width="48" height="12" rx="2.5" fill={`url(#${idPrefix}-navy)`} />
                <circle cx="58" cy="52" r="2" fill="#38BDF8" />
                <circle cx="64" cy="52" r="2" fill="#34D399" />
                <rect x="72" y="50.5" width="22" height="3" rx="1" fill="#7DD3FC" />
                {/* Dedicated GPU Tensor Chip Badge */}
                <g transform="translate(118, 48)">
                  <rect x="-14" y="-14" width="28" height="28" rx="4" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                  <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="extrabold">GPU</text>
                  <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">H100/A100</text>
                </g>
                {/* FinOps Tag */}
                <rect x="56" y="66" width="40" height="10" rx="2.5" fill="#0D306C" />
                <text x="76" y="73.5" textAnchor="middle" fill="#38BDF8" fontSize="5" fontWeight="bold">AI FINOPS</text>
              </g>
            ) : index === 7 ? (
              /* 7. AI platform: Vector database cylinders, RAG flow & AgentOps mesh */
              <g transform="translate(15, 0)">
                {/* Vector DB Stack */}
                <g transform="translate(56, 32)">
                  <ellipse cx="16" cy="6" rx="16" ry="5" fill="#008EC4" />
                  <path d="M0 6 L0 18 A16 5 0 0 0 32 18 L32 6 Z" fill={`url(#${idPrefix}-navy)`} />
                  <ellipse cx="16" cy="18" rx="16" ry="5" fill="#008EC4" opacity="0.6" />
                  <path d="M0 18 L0 30 A16 5 0 0 0 32 30 L32 18 Z" fill="#081E44" />
                  <ellipse cx="16" cy="30" rx="16" ry="5" fill={`url(#${idPrefix}-cyan)`} />
                </g>
                {/* Neural vector connectors */}
                <path d="M92 48 L114 36 M92 48 L114 62 M92 48 L124 48" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />
                {/* Agent Node 1 */}
                <circle cx="116" cy="36" r="6" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                <text x="116" y="38.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">RAG</text>
                {/* Agent Node 2 */}
                <circle cx="126" cy="48" r="7" fill="#0D306C" stroke="#38BDF8" strokeWidth="1.2" />
                <text x="126" y="50.5" textAnchor="middle" fill="#7DD3FC" fontSize="5" fontWeight="bold">OPS</text>
                {/* Agent Node 3 */}
                <circle cx="116" cy="62" r="6" fill={`url(#${idPrefix}-cyan)`} />
                <text x="116" y="64.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">LLM</text>
              </g>
            ) : index === 8 ? (
              /* 8. Governance: AI Risk dial, guardrail checklist & compliance seal */
              <g transform="translate(15, 0)">
                {/* Risk Gauge Dial */}
                <path d="M50 62 A26 26 0 0 1 102 62" stroke="#CBD5E1" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M50 62 A26 26 0 0 1 84 40" stroke="#34D399" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M84 40 A26 26 0 0 1 102 62" stroke={`url(#${idPrefix}-amber)`} strokeWidth="5" fill="none" strokeLinecap="round" />
                <line x1="76" y1="62" x2="68" y2="44" stroke="#0D306C" strokeWidth="2" strokeLinecap="round" />
                <circle cx="76" cy="62" r="4" fill="#0D306C" />
                {/* Checklist Document */}
                <rect x="100" y="24" width="34" height="46" rx="4" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" filter={`url(#${idPrefix}-glow)`} />
                <path d="M106 34 L108 36 L112 32 M106 44 L108 46 L112 42 M106 54 L108 56 L112 52" stroke="#34D399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <rect x="116" y="33" width="12" height="2.5" rx="1" fill="#0D306C" />
                <rect x="116" y="43" width="12" height="2.5" rx="1" fill="#0D306C" />
                <rect x="116" y="53" width="12" height="2.5" rx="1" fill="#0D306C" />
                {/* Audit verified tag */}
                <rect x="58" y="70" width="36" height="10" rx="2.5" fill="#0D306C" />
                <text x="76" y="77.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">AUDIT READY</text>
              </g>
            ) : (
              /* 9. BOT and captive transition: Handover bridge, Managed to Captive, handover key */
              <g transform="translate(15, 0)">
                {/* Arch bridge connection */}
                <path d="M46 62 C64 36 90 36 108 62" fill="none" stroke="#008EC4" strokeWidth="2.5" />
                <path d="M46 62 C64 36 90 36 108 62" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 2" />
                {/* Managed Entity Pillar */}
                <rect x="40" y="48" width="18" height="26" rx="3" fill="#0D306C" />
                <text x="49" y="60" textAnchor="middle" fill="#7DD3FC" fontSize="4.5" fontWeight="bold">MANAGED</text>
                <text x="49" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="4" fontWeight="bold">GCC</text>
                {/* Captive Entity Pillar */}
                <rect x="96" y="44" width="20" height="30" rx="3" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1" />
                <text x="106" y="58" textAnchor="middle" fill="#38BDF8" fontSize="4.5" fontWeight="bold">CAPTIVE</text>
                <text x="106" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">ENTITY</text>
                {/* Handover Gold Key Badge */}
                <circle cx="77" cy="38" r="11" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                <g transform="translate(77, 38)">
                  <circle cx="-3" cy="0" r="3.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
                  <line x1="0.5" y1="0" x2="6" y2="0" stroke="#FFFFFF" strokeWidth="1.3" />
                  <line x1="4" y1="0" x2="4" y2="2.5" stroke="#FFFFFF" strokeWidth="1.2" />
                  <line x1="6" y1="0" x2="6" y2="2" stroke="#FFFFFF" strokeWidth="1.2" />
                </g>
                <rect x="60" y="74" width="34" height="9" rx="2.5" fill="#0D306C" />
                <text x="77" y="80.5" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">100% ASSETS</text>
              </g>
            )
          ) : variant === "hub" ? (
            /* ==========================================================
               RECRUITMENT HUB + NEOHIREX (11 CARDS)
               ========================================================== */
            index === 0 ? (
              /* 0. Dedicated recruitment POD: Recruiter team network, POD lead avatar & SLA sync */
              <g transform="translate(15, 0)">
                {/* Pod Network Lines */}
                <line x1="56" y1="52" x2="88" y2="34" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="88" y1="34" x2="120" y2="52" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="56" y1="52" x2="120" y2="52" stroke="#008EC4" strokeWidth="0.8" opacity="0.4" />
                {/* Recruiter 1 */}
                <g transform="translate(56, 52)">
                  <circle cx="0" cy="0" r="10" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.2" />
                  <circle cx="0" cy="-2" r="3.5" fill="#38BDF8" />
                  <path d="M-6 7 C-6 3 6 3 6 7" stroke="#38BDF8" strokeWidth="1.2" fill="none" />
                </g>
                {/* Central POD Lead Badge */}
                <g transform="translate(88, 34)">
                  <circle cx="0" cy="0" r="13" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                  <circle cx="0" cy="-2" r="4.5" fill="#FFFFFF" />
                  <path d="M-7 8 C-7 3 7 3 7 8" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                  <polygon points="0,-11 2,-8 5,-8 3,-6 4,-3 0,-5 -4,-3 -3,-6 -5,-8 -2,-8" fill="#FFFFFF" />
                </g>
                {/* Recruiter 2 */}
                <g transform="translate(120, 52)">
                  <circle cx="0" cy="0" r="10" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.2" />
                  <circle cx="0" cy="-2" r="3.5" fill="#38BDF8" />
                  <path d="M-6 7 C-6 3 6 3 6 7" stroke="#38BDF8" strokeWidth="1.2" fill="none" />
                </g>
                {/* SLA / Dedicated Tag */}
                <rect x="62" y="70" width="52" height="11" rx="3" fill="#0D306C" />
                <text x="88" y="77.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">DEDICATED POD</text>
              </g>
            ) : index === 1 ? (
              /* 1. Talent sourcing: Radar sweep across AI/ML talent pools & market mapping pinpoints */
              <g transform="translate(15, 0)">
                {/* Radar Grid Circles */}
                <circle cx="88" cy="50" r="34" stroke="#169DC8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
                <circle cx="88" cy="50" r="22" stroke="#008EC4" strokeWidth="1" opacity="0.5" />
                {/* Radar Sweep Arc */}
                <path d="M88 50 L118 30 A34 34 0 0 1 122 50 Z" fill={`url(#${idPrefix}-cyan)`} opacity="0.35" />
                {/* Candidate Talent Pool Nodes */}
                <g transform="translate(64, 40)">
                  <circle cx="0" cy="0" r="6" fill={`url(#${idPrefix}-cyan)`} filter={`url(#${idPrefix}-glow)`} />
                  <text x="0" y="2" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">AI</text>
                </g>
                <g transform="translate(112, 42)">
                  <circle cx="0" cy="0" r="6" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                  <text x="0" y="2" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">ML</text>
                </g>
                <g transform="translate(88, 68)">
                  <circle cx="0" cy="0" r="5.5" fill="#0D306C" stroke="#38BDF8" strokeWidth="1" />
                  <text x="0" y="2" textAnchor="middle" fill="#38BDF8" fontSize="4" fontWeight="bold">DATA</text>
                </g>
                {/* Sourcing Tag */}
                <rect x="64" y="20" width="48" height="12" rx="3" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1" />
                <text x="88" y="28.5" textAnchor="middle" fill="#0D306C" fontSize="5.5" fontWeight="bold">NAMED MAPPING ✓</text>
              </g>
            ) : index === 2 ? (
              /* 2. NeoHireX Hiring OS: Neural core processor, candidate profile & 98% match */
              <g transform="translate(10, 0)">
                {/* Neural Network Connectors */}
                <path d="M60 52 L95 36 M60 52 L95 68 M95 36 L130 52 M95 68 L130 52" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" />
                {/* Central AI Processor Chip */}
                <g transform="translate(95, 52)">
                  <rect x="-18" y="-18" width="36" height="36" rx="6" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.4" filter={`url(#${idPrefix}-glow)`} />
                  <rect x="-10" y="-10" width="20" height="20" rx="3" fill={`url(#${idPrefix}-cyan)`} />
                  <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="extrabold">NHX</text>
                </g>
                {/* Match Score Badge */}
                <g transform="translate(126, 36)">
                  <rect x="-16" y="-8" width="32" height="16" rx="8" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                  <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="extrabold">98% FIT</text>
                </g>
                {/* System of Record Tag */}
                <rect x="70" y="74" width="50" height="11" rx="3" fill="#0D306C" />
                <text x="95" y="81.5" textAnchor="middle" fill="#38BDF8" fontSize="5" fontWeight="bold">HIRING OS CORE</text>
              </g>
            ) : index === 3 ? (
              /* 3. Candidate screening: Calibration funnel & multi-criteria verification */
              <g transform="translate(15, 0)">
                {/* Funnel Outline */}
                <polygon points="54,24 122,24 98,54 98,66 78,66 78,54" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" opacity="0.9" />
                {/* Verified Candidate Cards inside funnel */}
                <rect x="66" y="28" width="18" height="6" rx="2" fill={`url(#${idPrefix}-cyan)`} />
                <rect x="92" y="28" width="18" height="6" rx="2" fill={`url(#${idPrefix}-navy)`} />
                <rect x="79" y="38" width="18" height="6" rx="2" fill={`url(#${idPrefix}-amber)`} />
                {/* Validated Output Pill */}
                <g transform="translate(88, 58)">
                  <circle cx="0" cy="0" r="5" fill="#34D399" />
                  <path d="M-2 -0.5 L-0.5 1 L2 -1.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
                </g>
                {/* Calibration Seal */}
                <rect x="60" y="70" width="56" height="11" rx="3" fill="#0D306C" />
                <text x="88" y="77.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">ROLE CALIBRATED ✓</text>
              </g>
            ) : index === 4 ? (
              /* 4. AI interview: Soundwave / video analysis, conversational avatar & transcript pill */
              <g transform="translate(15, 0)">
                {/* AI Audio/Video Waveform */}
                <g transform="translate(50, 48)">
                  <rect x="0" y="-8" width="3" height="16" rx="1.5" fill="#38BDF8" />
                  <rect x="6" y="-14" width="3" height="28" rx="1.5" fill={`url(#${idPrefix}-cyan)`} />
                  <rect x="12" y="-20" width="3" height="40" rx="1.5" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                  <rect x="18" y="-12" width="3" height="24" rx="1.5" fill={`url(#${idPrefix}-cyan)`} />
                  <rect x="24" y="-18" width="3" height="36" rx="1.5" fill="#008EC4" />
                  <rect x="30" y="-6" width="3" height="12" rx="1.5" fill="#38BDF8" />
                </g>
                {/* AI Interviewer Avatar Card */}
                <rect x="94" y="26" width="36" height="42" rx="5" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" filter={`url(#${idPrefix}-glow)`} />
                <circle cx="112" cy="40" r="7" fill={`url(#${idPrefix}-navy)`} />
                <circle cx="112" cy="38" r="3" fill="#38BDF8" />
                {/* Mic / Voice wave */}
                <path d="M106 54 Q112 58 118 54" stroke="#008EC4" strokeWidth="1.2" fill="none" />
                {/* Transcript attached badge */}
                <rect x="64" y="72" width="48" height="10" rx="2.5" fill="#0D306C" />
                <text x="88" y="79" textAnchor="middle" fill="#38BDF8" fontSize="4.8" fontWeight="bold">TRANSCRIPT ATTACHED</text>
              </g>
            ) : index === 5 ? (
              /* 5. Technical assessment: Code terminal IDE window, PASS unit tests & code seal */
              <g transform="translate(15, 0)">
                {/* Terminal Console */}
                <rect x="48" y="22" width="80" height="48" rx="4" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.2" />
                {/* Window header dots */}
                <circle cx="56" cy="28" r="2" fill="#EF4444" />
                <circle cx="62" cy="28" r="2" fill="#F59E0B" />
                <circle cx="68" cy="28" r="2" fill="#10B981" />
                {/* Code Prompt Lines */}
                <text x="56" y="38" fill="#38BDF8" fontSize="5" fontFamily="monospace">&gt; val.verify_pipeline()</text>
                <text x="56" y="47" fill="#34D399" fontSize="5" fontFamily="monospace">✓ 12/12 Tests Passed</text>
                <text x="56" y="56" fill="#F1F5F9" fontSize="4.5" fontFamily="monospace">Status: Production Owner</text>
                {/* Practitioner Verified Badge */}
                <rect x="94" y="46" width="30" height="20" rx="3" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                <text x="109" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">PRACTITIONER</text>
                <text x="109" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="extrabold">VERIFIED ✓</text>
              </g>
            ) : index === 6 ? (
              /* 6. Interview scheduling: Calendar grid, automated panel time-slot sync & clock */
              <g transform="translate(15, 0)">
                {/* Calendar Card */}
                <rect x="52" y="22" width="56" height="54" rx="5" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" />
                {/* Calendar Top Banner */}
                <path d="M52 26 C52 23.8 53.8 22 56 22 L104 22 C106.2 22 108 23.8 108 26 L108 32 L52 32 Z" fill={`url(#${idPrefix}-navy)`} />
                <circle cx="64" cy="27" r="1.5" fill="#38BDF8" />
                <circle cx="74" cy="27" r="1.5" fill="#38BDF8" />
                <circle cx="84" cy="27" r="1.5" fill="#38BDF8" />
                <circle cx="94" cy="27" r="1.5" fill="#38BDF8" />
                {/* Time Slots Grid */}
                <rect x="58" y="38" width="10" height="8" rx="1.5" fill="#E2E8F0" />
                <rect x="72" y="38" width="10" height="8" rx="1.5" fill={`url(#${idPrefix}-cyan)`} />
                <rect x="86" y="38" width="10" height="8" rx="1.5" fill="#E2E8F0" />
                <rect x="58" y="50" width="10" height="8" rx="1.5" fill={`url(#${idPrefix}-amber)`} />
                <rect x="72" y="50" width="10" height="8" rx="1.5" fill="#E2E8F0" />
                <rect x="86" y="50" width="10" height="8" rx="1.5" fill={`url(#${idPrefix}-cyan)`} />
                {/* Clock Sync Badge */}
                <g transform="translate(118, 48)">
                  <circle cx="0" cy="0" r="13" fill={`url(#${idPrefix}-cyan)`} filter={`url(#${idPrefix}-glow)`} />
                  <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
                  <line x1="0" y1="0" x2="0" y2="-5" stroke="#0D306C" strokeWidth="1.3" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="4" y2="0" stroke="#0D306C" strokeWidth="1.3" strokeLinecap="round" />
                </g>
                {/* Sync Tag */}
                <rect x="62" y="68" width="52" height="10" rx="2.5" fill="#0D306C" />
                <text x="88" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="4.8" fontWeight="bold">PANEL AUTO-SYNC</text>
              </g>
            ) : index === 7 ? (
              /* 7. Offer management: Formal offer envelope, wax seal & counter-offer buffer */
              <g transform="translate(15, 0)">
                {/* Offer Document Sheet */}
                <rect x="56" y="22" width="52" height="58" rx="5" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" filter={`url(#${idPrefix}-glow)`} />
                <rect x="64" y="30" width="22" height="3" rx="1.5" fill="#0D306C" />
                <rect x="64" y="38" width="36" height="2.5" rx="1.2" fill="#94A3B8" />
                <rect x="64" y="44" width="30" height="2.5" rx="1.2" fill="#94A3B8" />
                <rect x="64" y="50" width="24" height="2.5" rx="1.2" fill="#38BDF8" />
                {/* Offer Envelope Fold */}
                <path d="M56 26 L82 46 L108 26" stroke="#008EC4" strokeWidth="1.2" fill="none" opacity="0.6" />
                {/* Gold Seal / Acceptance Badge */}
                <g transform="translate(114, 46)">
                  <circle cx="0" cy="0" r="12" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                  <path d="M-4 0 L-1 3 L5 -3" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
                {/* Joining Assurance Tag */}
                <rect x="60" y="68" width="56" height="11" rx="3" fill="#0D306C" />
                <text x="88" y="75.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">JOINING ASSURANCE</text>
              </g>
            ) : index === 8 ? (
              /* 8. Recruiting analytics: Velocity chart, conversion funnel bars & SLA dial */
              <g transform="translate(15, 0)">
                {/* Axis lines */}
                <line x1="48" y1="68" x2="128" y2="68" stroke="#64748B" strokeWidth="1.2" />
                <line x1="48" y1="24" x2="48" y2="68" stroke="#64748B" strokeWidth="1.2" />
                {/* Funnel Stage Bars */}
                <rect x="56" y="48" width="12" height="20" rx="2" fill="#94A3B8" />
                <rect x="72" y="38" width="12" height="30" rx="2" fill="#008EC4" />
                <rect x="88" y="28" width="12" height="40" rx="2" fill={`url(#${idPrefix}-cyan)`} />
                <rect x="104" y="18" width="14" height="50" rx="2" fill={`url(#${idPrefix}-amber)`} filter={`url(#${idPrefix}-glow)`} />
                {/* Trend line overlay */}
                <path d="M62 46 L78 36 L94 26 L111 16" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
                <circle cx="111" cy="16" r="3" fill="#FFFFFF" />
                {/* Conversion SLA Tag */}
                <rect x="62" y="74" width="52" height="10" rx="2.5" fill="#0D306C" />
                <text x="88" y="81" textAnchor="middle" fill="#38BDF8" fontSize="4.8" fontWeight="bold">TIME TO SHORTLIST SLA</text>
              </g>
            ) : index === 9 ? (
              /* 9. Hiring-manager dashboards: Multi-column Kanban pipeline & live metrics */
              <g transform="translate(15, 0)">
                {/* Dashboard Screen */}
                <rect x="46" y="22" width="84" height="54" rx="5" fill="#FFFFFF" stroke="#008EC4" strokeWidth="1.2" filter={`url(#${idPrefix}-glow)`} />
                {/* Column 1: Sourced */}
                <rect x="52" y="28" width="22" height="42" rx="3" fill="#F1F5F9" />
                <rect x="55" y="32" width="16" height="8" rx="2" fill="#CBD5E1" />
                <rect x="55" y="43" width="16" height="8" rx="2" fill="#CBD5E1" />
                {/* Column 2: Validated */}
                <rect x="77" y="28" width="22" height="42" rx="3" fill="#E0F2FE" />
                <rect x="80" y="32" width="16" height="10" rx="2" fill={`url(#${idPrefix}-cyan)`} />
                <rect x="80" y="45" width="16" height="8" rx="2" fill="#7DD3FC" />
                {/* Column 3: Shortlist */}
                <rect x="102" y="28" width="22" height="42" rx="3" fill="#FEF3C7" />
                <rect x="105" y="32" width="16" height="12" rx="2" fill={`url(#${idPrefix}-amber)`} />
                {/* Live Indicator Dot */}
                <circle cx="122" cy="18" r="4" fill="#34D399" filter={`url(#${idPrefix}-glow)`} />
                {/* Dashboard Tag */}
                <rect x="60" y="70" width="56" height="11" rx="3" fill="#0D306C" />
                <text x="88" y="77.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">LIVE PIPELINE VIEW</text>
              </g>
            ) : (
              /* 10. ATS integration: Bi-directional sync pipeline, NeoHireX to Enterprise ATS */
              <g transform="translate(15, 0)">
                {/* NeoHireX Node */}
                <rect x="44" y="34" width="28" height="32" rx="4" fill={`url(#${idPrefix}-navy)`} stroke="#008EC4" strokeWidth="1.2" />
                <text x="58" y="48" textAnchor="middle" fill="#38BDF8" fontSize="5" fontWeight="bold">NeoHireX</text>
                <text x="58" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="4" fontWeight="bold">RECORD</text>
                {/* Bi-directional arrows */}
                <path d="M76 44 L96 44 M92 41 L96 44 L92 47" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M96 54 L76 54 M80 51 L76 54 L80 57" stroke={`url(#${idPrefix}-amber)`} strokeWidth="1.5" strokeLinecap="round" />
                {/* Enterprise ATS Cylinder */}
                <g transform="translate(102, 34)">
                  <ellipse cx="14" cy="5" rx="14" ry="4" fill="#008EC4" />
                  <path d="M0 5 L0 26 A14 4 0 0 0 28 26 L28 5 Z" fill={`url(#${idPrefix}-navy)`} />
                  <ellipse cx="14" cy="26" rx="14" ry="4" fill={`url(#${idPrefix}-cyan)`} />
                  <text x="14" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold">ATS</text>
                </g>
                {/* Integration Tag */}
                <rect x="60" y="72" width="56" height="10" rx="2.5" fill="#0D306C" />
                <text x="88" y="79" textAnchor="middle" fill="#FFFFFF" fontSize="4.8" fontWeight="bold">2-WAY API SYNC</text>
              </g>
            )
          ) : null
        }
      </svg>
    </div>
  );
}

/**
 * Single Capability Card
 */
function CapabilityCard({
  item,
  index,
  variant,
}: {
  item: CapabilityItem;
  index: number;
  variant: CapabilityVariant;
}) {
  const Icon = item.icon;
  const description = item.desc || item.body || "";

  return (
    <div className="rounded-2xl border border-[#DCE8F4] bg-white p-3.5 sm:p-4 pb-1 sm:pb-1.5 flex flex-col justify-between text-left hover:border-[#008EC4]/50 hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
      <div>
        {/* Header: Upgraded Premium Logo Badge and Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl relative flex items-center justify-center shrink-0 bg-gradient-to-br from-[#0B2554] via-[#081E44] to-[#04122C] border border-[#38BDF8]/40 group-hover:border-[#00E5FF] group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#0D306C] group-hover:to-[#008EC4] transition-all duration-300">
            {/* Ambient glass top sheen */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
            <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#38BDF8] stroke-[2] drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10" />
          </div>

          <h3 className="text-[#0D244D] font-extrabold text-[12.5px] sm:text-[13.5px] leading-snug tracking-tight line-clamp-2 flex-1 min-w-0">
            {item.title}
          </h3>
        </div>

        {/* Text */}
        <p className="text-[#505D74] text-[11px] sm:text-[11.5px] leading-relaxed font-normal line-clamp-3">
          {description}
        </p>
      </div>

      {/* Bespoke contextual vector illustration at card bottom */}
      <CardIllustration index={index} variant={variant} />
    </div>
  );
}

/**
 * CapabilityGrid Component
 * Supports customizable row patterns (e.g. [5,4,5], [4,3,3], [4,4,4,4]) with responsive behavior.
 */
export default function CapabilityGrid({
  items,
  variant = "ai",
  rowPattern,
  bottomPanels,
  footer,
}: CapabilityGridProps) {
  // If variant is workstreams and items has 11, use hub illustrations seamlessly
  const effectiveVariant = (variant === "workstreams" && items.length === 11) ? "hub" : variant;

  // Determine row pattern
  const pattern = rowPattern ?? (
    (effectiveVariant === "hub" || items.length === 11)
      ? [4, 4, 3]
      : effectiveVariant === "workstreams" && items.length === 10
      ? [4, 3, 3]
      : effectiveVariant === "governance" && items.length === 16
      ? [4, 4, 4, 4]
      : (effectiveVariant === "scale" || effectiveVariant === "performance") && items.length === 17
      ? [4, 4, 4, 5]
      : [5, 4, 5]
  );

  // Split items into rows based on pattern
  const rows: { items: CapabilityItem[]; startIndex: number; count: number }[] = [];
  let currentStart = 0;
  for (const count of pattern) {
    if (currentStart >= items.length) break;
    const rowItems = items.slice(currentStart, currentStart + count);
    rows.push({ items: rowItems, startIndex: currentStart, count: rowItems.length });
    currentStart += count;
  }
  // Any leftover items
  if (currentStart < items.length) {
    const leftover = items.slice(currentStart);
    rows.push({ items: leftover, startIndex: currentStart, count: leftover.length });
  }

  const getGridColsClass = (count: number) => {
    switch (count) {
      case 5:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4";
      case 4:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full";
      case 2:
        return "grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-2xl mx-auto";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full";
    }
  };

  return (
    <div className="w-full">
      {rows.map((row, rIdx) => (
        <motion.div
          key={rIdx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: rIdx * 0.1 }}
          className={`${getGridColsClass(row.count)} ${rIdx > 0 ? "mt-3.5 sm:mt-4" : ""}`}
        >
          {row.items.map((item, idx) => (
            <CapabilityCard
              key={item.title}
              item={item}
              index={row.startIndex + idx}
              variant={effectiveVariant}
            />
          ))}
        </motion.div>
      ))}

      {/* Optional Bottom Feature Panels (Used on AI Acceleration) */}
      {bottomPanels && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 sm:mt-5"
        >
          {bottomPanels}
        </motion.div>
      )}

      {/* Optional Footer (e.g. Legal/Source Note for HR Scope) */}
      {footer && <div className="mt-6 sm:mt-8">{footer}</div>}
    </div>
  );
}
