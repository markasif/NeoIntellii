import { useEffect, useRef } from "react";

export default function GccStoryCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const dpr = window.devicePixelRatio || 1;

    // 3D Grid dimensions
    const cols = 60;
    const rows = 40;
    const spacing = 22.0;

    // Rotation angles for premium angled isometric perspective
    // Pitch (X-axis rotation) and Yaw (Y-axis rotation)
    const rotX = 0.95; // ~54 degrees
    const rotY = -0.32; // ~-18 degrees
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    const cameraZ = 680;
    const fov = 480;

    // Color Lookup Table: Pre-calculate colors for each column
    // Interpolating from Teal [14, 146, 184] to Purple [124, 58, 237] to Cyan [6, 182, 212]
    const columnColors: string[] = [];
    const colorTeal = [14, 146, 184];
    const colorPurple = [124, 58, 237];
    const colorCyan = [6, 182, 212];

    for (let ix = 0; ix < cols; ix++) {
      const pct = ix / (cols - 1);
      let r, g, b;

      if (pct < 0.5) {
        // Interpolate Teal to Purple
        const t = pct * 2;
        r = Math.round(colorTeal[0] + (colorPurple[0] - colorTeal[0]) * t);
        g = Math.round(colorTeal[1] + (colorPurple[1] - colorTeal[1]) * t);
        b = Math.round(colorTeal[2] + (colorPurple[2] - colorTeal[2]) * t);
      } else {
        // Interpolate Purple to Cyan
        const t = (pct - 0.5) * 2;
        r = Math.round(colorPurple[0] + (colorCyan[0] - colorPurple[0]) * t);
        g = Math.round(colorPurple[1] + (colorCyan[1] - colorPurple[1]) * t);
        b = Math.round(colorPurple[2] + (colorCyan[2] - colorPurple[2]) * t);
      }

      columnColors.push(`rgb(${r}, ${g}, ${b})`);
    }

    const resize = () => {
      width = canvas.width = canvas.offsetWidth * dpr;
      height = canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width / dpr, height / dpr);
      time += 0.45;

      const bx = (width / dpr) / 2;
      const by = (height / dpr) * 0.52; // centered vertically for hero

      const mouse = mouseRef.current;

      // Loop through columns first to batch color calls
      for (let ix = 0; ix < cols; ix++) {
        ctx.fillStyle = columnColors[ix];

        for (let iz = 0; iz < rows; iz++) {
          // 3D coordinates (centered grid)
          const x3d = (ix - cols / 2) * spacing;
          const z3d = (iz - rows / 2) * spacing;

          // Nested sine waves for complex organic rolling waves
          let y3d = Math.sin(ix * 0.15 + time * 0.04) * Math.cos(iz * 0.15 + time * 0.035) * 22;
          y3d += Math.sin((ix + iz) * 0.08 + time * 0.05) * 10;
          y3d += Math.cos(ix * 0.06 - time * 0.02) * 6;

          // Apply 3D Rotations
          // Rotate Y (Yaw)
          const x1 = x3d * cosY - z3d * sinY;
          const z1 = x3d * sinY + z3d * cosY;

          // Rotate X (Pitch)
          const y1 = y3d * cosX - z1 * sinX;
          const z2 = y3d * sinX + z1 * cosX;

          // perspective scale factor
          const depth = cameraZ - z2;
          const scale = fov / depth;

          // Project to 2D screen coordinates
          let sx = bx + x1 * scale;
          let sy = by + y1 * scale;

          // screen boundaries check
          if (sx < -20 || sx > (width / dpr) + 20 || sy < -20 || sy > (height / dpr) + 20) {
            continue;
          }

          // 2D Mouse push warp interaction
          const dx = sx - mouse.x;
          const dy = sy - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            const force = (130 - dist) / 130;
            const angle = Math.atan2(dy, dx);
            // Push points radially outward
            sx += Math.cos(angle) * force * 15;
            sy += Math.sin(angle) * force * 12;
          }

          // Visual density calculations
          const cx = cols / 2;
          const cz = rows / 2;
          const distFromCenter = Math.hypot(ix - cx, iz - cz);
          const maxDist = Math.hypot(cx, cz);
          
          // Edge fade: grid gets transparent towards the margins (seamless blending)
          const edgeFade = Math.max(0, 1 - (distFromCenter / maxDist) * 0.75);

          // Depth fade: simulate depth of field (far particles fade out)
          const depthFade = Math.max(0.1, Math.min(1.0, (z2 + 250) / 500));

          const opacity = 0.95 * edgeFade * depthFade;

          if (opacity < 0.01) continue;

          // Particle radius scales with distance
          const radius = Math.max(0.2, 2.4 * scale);

          ctx.beginPath();
          ctx.globalAlpha = opacity;
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0; // Reset
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
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
    <div className={`absolute inset-0 select-none overflow-hidden ${className}`}>
      {/* 
        Sleek, transparent radial mask to keep the centered hero text 100% readable 
        without visual noise directly behind it. Fades smoothly to reveal the 
        global networks on the sides.
      */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full block opacity-90" />
    </div>
  );
}
