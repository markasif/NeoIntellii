import { useState } from "react";

/**
 * Layered ambient backdrop for the dark hero: aurora gradient orbs, a faint
 * perspective grid, a noise wash - and an optional generated video layer.
 *
 * The video layer looks for /videos/hire-ai-ml-hero.mp4 (a Seedance 2.0 /
 * Higgsfield-generated ambient loop). If the file is not deployed the <video>
 * errors out and unmounts, leaving the CSS aurora as the motion layer - so the
 * clip can be dropped into public/videos/ later with no code change.
 */

const HERO_VIDEO_SRC = "/videos/hire-ai-ml-hero.mp4";

function HeroVideo() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
      src={HERO_VIDEO_SRC}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      onError={() => setFailed(true)}
    />
  );
}

export default function AuroraBackdrop({ withVideo = false }: { withVideo?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Generated ambient loop, when the asset exists */}
      {withVideo && <HeroVideo />}

      {/* Aurora orbs */}
      <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#8b5cf6]/25 blur-[140px] animate-drift-slow" />
      <div
        className="absolute top-10 right-[-160px] w-[640px] h-[640px] rounded-full bg-[#2dd4f5]/[0.17] blur-[150px] animate-drift-slow"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-240px] left-1/3 w-[720px] h-[520px] rounded-full bg-[#4d7cfe]/20 blur-[160px] animate-drift-slow"
        style={{ animationDelay: "-6s" }}
      />

      {/* Faint line grid, faded toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(157,177,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(157,177,255,0.16) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black 25%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black 25%, transparent 78%)",
        }}
      />

      {/* Noise wash so the gradients don't band */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Settle everything back into the ink canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060e]" />
    </div>
  );
}
