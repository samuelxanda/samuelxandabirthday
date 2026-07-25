"use client";

import { useEffect, useRef } from "react";

type SoftAuroraProps = {
  colorStops?: string[];
  speed?: number;
  className?: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

/** Lightweight canvas aurora — mobile-safe alternative to heavy Three.js Silk. */
export default function SoftAurora({
  colorStops = ["#FF5D7D", "#FFC857", "#B8A1FF"],
  speed = 0.35,
  className = "",
}: SoftAuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let t = 0;
    const colors = colorStops.map(hexToRgb);
    const dprCap = window.innerWidth < 768 ? 1.25 : 1.75;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!running) return;
      t += 0.008 * speed;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, "#FFF8EE");
      base.addColorStop(1, "#FFE8F0");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      colors.forEach((rgb, i) => {
        const cx = w * (0.2 + 0.3 * i) + Math.sin(t + i) * w * 0.12;
        const cy = h * (0.25 + 0.2 * (i % 2)) + Math.cos(t * 0.8 + i) * h * 0.1;
        const radius = Math.max(w, h) * (0.35 + 0.08 * i);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.42)`);
        grad.addColorStop(0.55, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.12)`);
        grad.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(draw);
    } else {
      // Static soft wash
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, "#FFF8EE");
      base.addColorStop(0.5, "#FFE4EC");
      base.addColorStop(1, "#F3E8FF");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [colorStops, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
