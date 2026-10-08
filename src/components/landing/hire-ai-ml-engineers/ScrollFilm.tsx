import { useEffect, useRef, useState } from "react";

/**
 * Scroll-scrubbed film: a pinned full-viewport video whose playhead follows
 * scroll progress through the section, lerped each frame so the motion feels
 * smooth rather than stepped.
 *
 * The clip at /videos/hire-ai-ml-scroll.mp4 is a locally rendered flight down
 * the validation corridor (all-intra H.264, so every frame is a keyframe and
 * currentTime seeks land instantly). A Seedance 2.0 / Higgsfield-generated
 * film is a drop-in replacement - re-encode it with `-g 1 -keyint_min 1` and
 * overwrite the file; no code change needed.
 *
 * Fallbacks: the section unmounts if the video fails to load, and under
 * prefers-reduced-motion the film parks on a mid-frame instead of scrubbing.
 */

// mp4 first (smaller; universal in real browsers), VP9 webm as the fallback
// for H.264-less Chromium builds. The browser downloads only the one it picks.
const SCROLL_FILM_MP4 = "/videos/hire-ai-ml-scroll.mp4";
const SCROLL_FILM_WEBM = "/videos/hire-ai-ml-scroll.webm";

const clamp = (value: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, value));

export default function ScrollFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = 0;
    let duration = 0;

    const onMeta = () => {
      duration = video.duration || 0;
      if (reduce && duration) video.currentTime = duration * 0.4;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    if (!reduce) {
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!duration || video.seeking) return;
        const rect = section.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        if (travel <= 0) return;
        // Off-screen: snap the playhead so re-entry starts in sync.
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          current = clamp(-rect.top / travel, 0, 1);
          return;
        }
        const target = clamp(-rect.top / travel, 0, 1);
        current += (target - current) * 0.16;
        if (Math.abs(target - current) < 0.0004) current = target;
        const time = current * Math.max(0, duration - 0.04);
        if (Math.abs(video.currentTime - time) > 0.004) video.currentTime = time;
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [failed]);

  if (failed) return null;

  return (
    <section ref={sectionRef} aria-hidden="true" className="relative h-[300vh] bg-[#05060e]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={SCROLL_FILM_MP4} type="video/mp4" />
          {/* error on the last source = nothing was playable; drop the section */}
          <source src={SCROLL_FILM_WEBM} type="video/webm" onError={() => setFailed(true)} />
        </video>
        {/* Blend the film into the ink canvas above and below */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05060e] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05060e] to-transparent" />
      </div>
    </section>
  );
}
