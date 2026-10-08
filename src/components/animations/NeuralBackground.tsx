import { useEffect, useRef } from "react";

interface Props {
 className?: string;
 density?: number;
 /** rgb tuples for the node/link gradient */
 colorA?: [number, number, number];
 colorB?: [number, number, number];
 /** css opacity multiplier */
 intensity?: number;
 /**"dark"(default, glowing nodes on dark bg) or"paper"(ink dots on light bg) */
 variant?:"dark"|"paper";
}

/**
 * Lightweight canvas neural-network background.
 * Floating particles connected by faded lines, gently drifting and reacting
 * to the cursor. Designed to feel like ambient AI activity, not a screensaver.
 */
export default function NeuralBackground({
 className ="",
 density = 70,
 colorA = [10, 147, 189],
 colorB = [124, 58, 237],
 intensity = 1,
 variant ="dark",
}: Props) {
 const canvasRef = useRef<HTMLCanvasElement>(null);

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext("2d");
 if (!ctx) return;

 const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const dpr = Math.min(window.devicePixelRatio || 1, 2);
 let w = 0;
 let h = 0;
 let raf = 0;
 const mouse = { x: -9999, y: -9999 };

 interface P { x: number; y: number; vx: number; vy: number; r: number; }
 let particles: P[] = [];

 const init = () => {
 const rect = canvas.getBoundingClientRect();
 w = rect.width;
 h = rect.height;
 canvas.width = Math.floor(w * dpr);
 canvas.height = Math.floor(h * dpr);
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 const area = w * h;
 const count = Math.max(24, Math.min(density, Math.round(area / 14000)));
 particles = Array.from({ length: count }, () => ({
 x: Math.random() * w,
 y: Math.random() * h,
 vx: (Math.random() - 0.5) * 0.25,
 vy: (Math.random() - 0.5) * 0.25,
 r: 0.8 + Math.random() * 1.4,
 }));
 };

 const onMove = (e: MouseEvent) => {
 const rect = canvas.getBoundingClientRect();
 mouse.x = e.clientX - rect.left;
 mouse.y = e.clientY - rect.top;
 };
 const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

 const draw = () => {
 ctx.clearRect(0, 0, w, h);

 for (const p of particles) {
 p.x += p.vx;
 p.y += p.vy;
 if (p.x < 0 || p.x > w) p.vx *= -1;
 if (p.y < 0 || p.y > h) p.vy *= -1;

 // mouse attraction
 const dx = mouse.x - p.x;
 const dy = mouse.y - p.y;
 const d2 = dx * dx + dy * dy;
 if (d2 < 22500) {
 const f = (1 - d2 / 22500) * 0.04;
 p.vx += dx * f * 0.01;
 p.vy += dy * f * 0.01;
 }
 // damp
 p.vx *= 0.985;
 p.vy *= 0.985;
 }

 // links
 const maxDist = 130;
 const linkAlpha = variant ==="paper"? 0.18 : 0.35;
 const nodeAlpha = variant ==="paper"? 0.32 : 0.65;
 for (let i = 0; i < particles.length; i++) {
 for (let j = i + 1; j < particles.length; j++) {
 const a = particles[i];
 const b = particles[j];
 const dx = a.x - b.x;
 const dy = a.y - b.y;
 const d = Math.sqrt(dx * dx + dy * dy);
 if (d < maxDist) {
 const t = 1 - d / maxDist;
 const r = Math.round(colorA[0] + (colorB[0] - colorA[0]) * t);
 const g = Math.round(colorA[1] + (colorB[1] - colorA[1]) * t);
 const bl = Math.round(colorA[2] + (colorB[2] - colorA[2]) * t);
 ctx.strokeStyle = `rgba(${r},${g},${bl},${t * linkAlpha * intensity})`;
 ctx.lineWidth = 0.6;
 ctx.beginPath();
 ctx.moveTo(a.x, a.y);
 ctx.lineTo(b.x, b.y);
 ctx.stroke();
 }
 }
 }

 // nodes
 for (const p of particles) {
 ctx.fillStyle = `rgba(${colorA[0]},${colorA[1]},${colorA[2]},${nodeAlpha * intensity})`;
 ctx.beginPath();
 ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
 ctx.fill();
 }

 if (!reduce) raf = requestAnimationFrame(draw);
 };

 init();
 draw();
 const onResize = () => { init(); };
 window.addEventListener("resize", onResize);
 window.addEventListener("mousemove", onMove);
 window.addEventListener("mouseleave", onLeave);
 return () => {
 cancelAnimationFrame(raf);
 window.removeEventListener("resize", onResize);
 window.removeEventListener("mousemove", onMove);
 window.removeEventListener("mouseleave", onLeave);
 };
 }, [density, colorA, colorB, intensity, variant]);

 return (
 <canvas
 ref={canvasRef}
 aria-hidden="true"
 className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
 />
 );
}