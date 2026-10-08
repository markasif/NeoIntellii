import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Props {
  src: string;
  poster?: string;
  className?: string;
}

export default function HlsVideoBackground({ src, poster, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
    }

    const play = () => video.play().catch(() => {});
    video.addEventListener("loadedmetadata", play);

    return () => {
      video.removeEventListener("loadedmetadata", play);
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      aria-hidden="true"
    />
  );
}