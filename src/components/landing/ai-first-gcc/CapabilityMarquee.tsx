const TOKENS = [
  "AI Strategy",
  "Data Engineering",
  "MLOps / LLMOps",
  "Responsible AI",
  "Captive",
  "BOT",
  "EOR & Managed Services",
  "Micro GCC",
  "Governance",
  "Platform Architecture",
  "AI Delivery Teams",
  "Operating Model",
];

export default function CapabilityMarquee() {
  const track = [...TOKENS, ...TOKENS];
  return (
    <div className="border-y border-black/[0.06] bg-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-ai-marquee py-5">
        {track.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-2xs tracking-[0.16em] uppercase text-[#273C46]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a93bd]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}