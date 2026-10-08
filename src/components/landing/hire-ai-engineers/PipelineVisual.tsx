import { FileCheck2, Code2, ShieldCheck, Users2, Sparkles } from "lucide-react";
import { HexBadge } from "./Hex";

// The centrepiece graphic: the four validation gates set inside a hexagon over
// a receding data corridor, mirroring the hero artwork of the infographics.
// Drawn entirely in SVG + CSS so it stays crisp at any width and costs nothing
// to load.

const GATES = [
  { icon: FileCheck2, label: "AI Shortlisting" },
  { icon: Code2, label: "Senior Tech Rounds" },
  { icon: ShieldCheck, label: "Expert Validation" },
  { icon: Users2, label: "Ready to Decide" },
];

const HEX_BAND = "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)";

// Skyline blocks: [x, width, height], standing on the horizon at y = 300.
const SKYLINE: [number, number, number][] = [
  [352, 34, 74], [390, 26, 112], [420, 40, 58], [464, 30, 140], [498, 24, 96],
  [526, 36, 122], [566, 28, 72], [598, 38, 150], [640, 24, 88], [668, 34, 60],
];

export default function PipelineVisual() {
  return (
    <div className="relative overflow-hidden" style={{ clipPath: HEX_BAND, background: "linear-gradient(160deg, #0d2a63 0%, #0a1f52 45%, #061640 100%)" }}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lp-tower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6fb6ef" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#0b57bd" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="lp-vanish" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#7dd3f5" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7dd3f5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lp-ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3f5" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#7dd3f5" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Skyline standing on the horizon */}
        <g>
          {SKYLINE.map(([x, w, h]) => (
            <rect key={x} x={x} y={300 - h} width={w} height={h} fill="url(#lp-tower)" rx="1.5" />
          ))}
        </g>

        {/* Glow at the vanishing point */}
        <ellipse cx="500" cy="302" rx="300" ry="88" fill="url(#lp-vanish)" />

        {/* Receding corridor below the horizon */}
        <g stroke="url(#lp-ray)" strokeWidth="1.5">
          {[-620, -450, -310, -195, -100, -32, 32, 100, 195, 310, 450, 620].map((offset) => (
            <line key={offset} x1={500 + offset} y1="560" x2="500" y2="302" />
          ))}
        </g>
        <g stroke="#7dd3f5" fill="none" strokeWidth="1.5">
          {([
            [314, 0.12, 46], [330, 0.16, 104], [352, 0.20, 176], [382, 0.24, 262],
            [422, 0.28, 360], [474, 0.32, 472], [538, 0.36, 600],
          ] as [number, number, number][]).map(([y, opacity, half]) => (
            <line key={y} x1={500 - half} y1={y} x2={500 + half} y2={y} strokeOpacity={opacity} />
          ))}
        </g>
      </svg>

      {/* Scrim so the white gates and caption always clear the artwork */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(6,22,64,0.62) 0%, rgba(6,22,64,0.30) 45%, rgba(6,22,64,0.55) 100%)" }}
      />

      <div className="relative px-5 py-10 sm:px-10 md:px-14 md:py-14">
        <ol className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-2">
          {GATES.map((gate, index) => (
            <li key={gate.label} className="relative flex flex-col items-center text-center">
              {/* Connector between gates, drawn behind the badges */}
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden sm:block absolute top-8 right-1/2 w-full border-t-2 border-dotted border-[#7dd3f5]/55"
                />
              )}
              <span className="relative">
                <HexBadge icon={gate.icon} tone="white" size="lg" />
              </span>
              <span className="relative mt-3 text-2xs md:text-xs tracking-[0.16em] uppercase text-white font-semibold leading-snug">
                {gate.label}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex justify-center">
          <div className="inline-flex items-start gap-3.5 rounded-2xl border border-[#7dd3f5]/30 bg-[#061640]/70 px-5 py-4 backdrop-blur-sm">
            <HexBadge icon={Sparkles} tone="cyan" size="sm" />
            <p className="text-white text-xs md:text-sm leading-snug text-left">
              You receive just 1-2 profiles.
              <br className="hidden sm:block" />{" "}
              <span className="text-[#90c0f0]">Already interviewed. Ready to decide.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
