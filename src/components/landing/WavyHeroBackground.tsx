import { useEffect, useRef } from "react";

/**
 * Canvas-based silky wavy background. Diagonal flowing streaks of light
 * inspired by aurora / silk. Brand palette: deep navy base, cyan/teal
 * dominant, warm amber highlights as accent.
 */
export default function WavyHeroBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Streak definitions. Each streak is a horizontal flowing wave that we
    // rotate by ~20deg (diagonal). Mostly cool blues with a few warm amber
    // highlights to mimic the reference image.
    type Streak = {
      yBase: number; // 0..1 vertical anchor
      amp: number;   // wave amplitude in px
      freq: number;  // wave frequency
      phase: number; // phase offset
      speed: number; // animation speed
      thickness: number;
      color: [number, number, number];
      alpha: number;
    };

    const cyan: [number, number, number] = [120, 200, 240];
    const blue: [number, number, number] = [70, 140, 220];
    const deepBlue: [number, number, number] = [40, 90, 170];
    const amber: [number, number, number] = [240, 160, 70];
    const warm: [number, number, number] = [255, 200, 130];

    const streaks: Streak[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const palette: Array<[number, number, number, number]> = [
      [...cyan, 0.55],
      [...blue, 0.45],
      [...deepBlue, 0.4],
      [...cyan, 0.35],
      [...blue, 0.5],
      [...deepBlue, 0.35],
      [...amber, 0.5],
      [...warm, 0.45],
      [...amber, 0.35],
      [...cyan, 0.5],
      [...blue, 0.4],
      [...deepBlue, 0.45],
    ];

    for (let i = 0; i < 28; i++) {
      const p = palette[i % palette.length];
      streaks.push({
        yBase: rand(-0.1, 1.1),
        amp: rand(20, 90),
        freq: rand(0.0015, 0.004),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.00018, 0.00045) * (Math.random() < 0.5 ? -1 : 1),
        thickness: rand(1, 3.5),
        color: [p[0], p[1], p[2]],
        alpha: p[3] * rand(0.6, 1),
      });
    }

    const rotateDeg = -18; // diagonal sweep
    const rotateRad = (rotateDeg * Math.PI) / 180;

    const draw = (t: number) => {
      // Base gradient: deep navy with a hint of warm core
      const bg = ctx.createRadialGradient(
        w * 0.6,
        h * 0.45,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.9
      );
      bg.addColorStop(0, "#0a2540");
      bg.addColorStop(0.55, "#061a30");
      bg.addColorStop(1, "#020812");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Warm core glow (amber, soft)
      const warmGlow = ctx.createRadialGradient(
        w * 0.62,
        h * 0.45,
        0,
        w * 0.62,
        h * 0.45,
        Math.min(w, h) * 0.55
      );
      warmGlow.addColorStop(0, "rgba(240,150,60,0.35)");
      warmGlow.addColorStop(0.5, "rgba(200,100,40,0.10)");
      warmGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = warmGlow;
      ctx.fillRect(0, 0, w, h);

      // Streaks (rotated diagonal flow)
      ctx.save();
      const cx = w / 2;
      const cy = h / 2;
      ctx.translate(cx, cy);
      ctx.rotate(rotateRad);
      ctx.translate(-cx, -cy);

      const span = Math.hypot(w, h) * 1.2;
      const left = cx - span / 2;
      const right = cx + span / 2;
      const step = 6;

      ctx.globalCompositeOperation = "lighter";

      for (const s of streaks) {
        const yBase = s.yBase * h;
        ctx.beginPath();
        let started = false;
        for (let x = left; x <= right; x += step) {
          const y =
            yBase +
            Math.sin(x * s.freq + s.phase + t * s.speed) * s.amp +
            Math.sin(x * s.freq * 0.4 + t * s.speed * 0.7) * s.amp * 0.35;
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        // Soft glow pass
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${s.alpha * 0.25})`;
        ctx.lineWidth = s.thickness * 6;
        ctx.stroke();
        // Mid glow
        ctx.strokeStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${s.alpha * 0.45})`;
        ctx.lineWidth = s.thickness * 2.2;
        ctx.stroke();
        // Bright core
        ctx.strokeStyle = `rgba(${Math.min(255, s.color[0] + 40)},${Math.min(255, s.color[1] + 40)},${Math.min(255, s.color[2] + 40)},${Math.min(1, s.alpha + 0.15)})`;
        ctx.lineWidth = s.thickness * 0.6;
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.restore();

      // Vignette
      const vg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        Math.min(w, h) * 0.4,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.8
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}