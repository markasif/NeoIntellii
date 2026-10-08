import dynamic from "next/dynamic";
const GccStoryCanvas = dynamic(() => import("@/components/animations/GccStoryCanvas"), { ssr: false });

export default function HeroBackground() {
  return (
    <>
      <GccStoryCanvas className="-z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background: "radial-gradient(circle at center, #11abdb 0%, #0a93bd 55%, #07799c 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            backgroundPosition: "center center",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </>
  );
}
