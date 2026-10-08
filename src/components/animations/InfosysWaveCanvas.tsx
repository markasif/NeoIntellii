import { useEffect, useRef } from "react";

interface Wave {
  y: number;
  length: number;
  amplitude: number;
  speed: number;
  color: string;
  opacity: number;
}

export default function InfosysWaveCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      width = canvas.width = canvas.offsetWidth * dpr;
      height = canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    // Define 4 waves with different frequencies, amplitudes, speeds, and colors
    const waves: Wave[] = [
      {
        y: height / (2 * dpr),
        length: 0.005,
        amplitude: 35,
        speed: 0.008,
        color: "#0a93bd", // Teal Accent
        opacity: 0.35,
      },
      {
        y: height / (2 * dpr) + 15,
        length: 0.004,
        amplitude: 25,
        speed: -0.006,
        color: "#7c3aed", // Purple
        opacity: 0.25,
      },
      {
        y: height / (2 * dpr) - 15,
        length: 0.006,
        amplitude: 20,
        speed: 0.012,
        color: "#36326a", // Navy
        opacity: 0.2,
      },
      {
        y: height / (2 * dpr) + 5,
        length: 0.003,
        amplitude: 45,
        speed: -0.004,
        color: "#06b6d4", // Cyan
        opacity: 0.15,
      },
    ];

    // Node objects that orbit/slide along the waves
    const particles = Array.from({ length: 48 }).map((_, i) => ({
      waveIndex: i % waves.length,
      progress: Math.random() * Math.PI * 2,
      size: Math.random() * 2 + 1.5,
      speed: Math.random() * 0.004 + 0.002,
    }));

    let time = 0;

    const render = () => {
      // Clear canvas with a very soft white radial fade to simulate glowing light
      ctx.clearRect(0, 0, width / dpr, height / dpr);

      // Interpolate mouse coordinates for smooth lag effect
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      time += 0.5;

      // Draw all waves
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = wave.opacity;

        for (let x = 0; x < width / dpr; x += 2) {
          // Base wave height
          let y = wave.y + Math.sin(x * wave.length + time * wave.speed) * wave.amplitude;

          // Mouse warp/magnetic effect
          const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
          if (distToMouse < 180) {
            const pullForce = (180 - distToMouse) / 180;
            const angle = Math.atan2(y - mouse.y, x - mouse.x);
            // Warp the wave line slightly toward or away from the cursor
            y += Math.sin(angle) * pullForce * 30 * Math.sin(time * 0.05);
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Draw particles floating along the waves
      ctx.globalAlpha = 0.85;
      particles.forEach((p) => {
        const wave = waves[p.waveIndex];
        p.progress += p.speed;
        
        // Calculate dynamic position on screen
        const x = (p.progress * 100) % (width / dpr);
        let y = wave.y + Math.sin(x * wave.length + time * wave.speed) * wave.amplitude;

        // Interaction on particles
        const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
        if (distToMouse < 150) {
          const force = (150 - distToMouse) / 150;
          y += (y - mouse.y > 0 ? 1 : -1) * force * 15;
        }

        ctx.beginPath();
        ctx.fillStyle = wave.color;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw soft connections (hairline network lines) for near nodes
        particles.forEach((other) => {
          if (p === other) return;
          const ox = (other.progress * 100) % (width / dpr);
          const oy = wave.y + Math.sin(ox * wave.length + time * wave.speed) * wave.amplitude;
          const dist = Math.hypot(x - ox, y - oy);

          if (dist < 60) {
            ctx.beginPath();
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = 0.4;
            ctx.globalAlpha = (60 - dist) / 60 * 0.15;
            ctx.moveTo(x, y);
            ctx.lineTo(ox, oy);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 select-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
    </div>
  );
}
