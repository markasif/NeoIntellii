// Decorative hero backdrop: scattered hexagon outlines over a soft blue wash,
// matching the texture behind the infographic headlines. Presentational only.

const HEXES: [number, number, number, number][] = [
  // [centre x, centre y, radius, stroke opacity]
  [640, 70, 52, 0.20], [742, 132, 34, 0.14], [566, 178, 30, 0.12],
  [700, 250, 64, 0.16], [598, 322, 40, 0.11], [744, 392, 46, 0.13],
  [636, 452, 28, 0.10], [726, 528, 56, 0.12], [590, 578, 34, 0.09],
  [700, 646, 40, 0.08],
];

// Pointy-top hexagon path for a given centre and circumradius.
const hexPath = (cx: number, cy: number, r: number) =>
  [0, 1, 2, 3, 4, 5]
    .map((i) => {
      const angle = (Math.PI / 180) * (60 * i - 90);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");

export default function HeroBackdrop() {
  // Masked so the texture fades out before it reaches the headline column and
  // can never compete with the copy at any viewport width.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to left, #000 8%, transparent 62%)",
        WebkitMaskImage: "linear-gradient(to left, #000 8%, transparent 62%)",
      }}
    >
      <svg className="absolute -top-24 -right-28 h-[760px] w-[820px] max-w-none" viewBox="0 0 820 700" fill="none">
        <defs>
          <radialGradient id="lp-hero-wash" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0b57bd" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#0b57bd" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lp-hero-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0084b4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0084b4" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="520" cy="230" r="330" fill="url(#lp-hero-wash)" />
        <circle cx="720" cy="470" r="260" fill="url(#lp-hero-cyan)" />

        {HEXES.map(([cx, cy, r, opacity]) => (
          <polygon
            key={`${cx}-${cy}`}
            points={hexPath(cx, cy, r)}
            fill="none"
            stroke="#0b57bd"
            strokeOpacity={opacity}
            strokeWidth="1.5"
          />
        ))}
        {HEXES.filter((_, index) => index % 3 === 0).map(([cx, cy, r]) => (
          <polygon key={`fill-${cx}`} points={hexPath(cx, cy, r * 0.42)} fill="#0084b4" fillOpacity="0.07" />
        ))}
      </svg>
    </div>
  );
}
