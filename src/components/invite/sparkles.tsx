import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  hue: number;
  tw: number;
};

function spawn(w: number, h: number, burst: boolean): Particle {
  const cx = w * 0.5;
  const cy = h * (burst ? 0.52 : 0.45);
  const angle = Math.random() * Math.PI * 2;
  const speed = burst ? 1.2 + Math.random() * 3.4 : 0.15 + Math.random() * 0.4;
  return {
    x: cx + (Math.random() - 0.5) * (burst ? 40 : w * 0.7),
    y: cy + (Math.random() - 0.5) * (burst ? 30 : h * 0.5),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - (burst ? 0.6 : 0.12),
    life: 0,
    max: burst ? 50 + Math.random() * 50 : 80 + Math.random() * 90,
    size: burst ? 1.2 + Math.random() * 2.4 : 0.7 + Math.random() * 1.6,
    hue: Math.random() < 0.7 ? 0 : 280 + Math.random() * 40,
    tw: Math.random() * Math.PI * 2,
  };
}

export function SparkleField({
  burst,
  className,
}: {
  burst: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let alive = true;
    const particles: Particle[] = [];
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const count = burst ? 90 : 28;
    const { width, height } = canvas.getBoundingClientRect();
    for (let i = 0; i < count; i++) particles.push(spawn(width, height, burst));

    const tick = () => {
      if (!alive) return;
      const { width: w, height: h } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, w, h);
      const target = burst ? 70 : 24;
      while (particles.length < target) particles.push(spawn(w, h, burst));

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.008;
        if (p.life > p.max) {
          particles.splice(i, 1);
          continue;
        }
        const t = p.life / p.max;
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        const twinkle = 0.55 + 0.45 * Math.sin(p.life * 0.25 + p.tw);
        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha * twinkle);
        ctx.fillStyle = p.hue === 0 ? "#fff8ee" : `hsl(${p.hue} 70% 86%)`;
        ctx.shadowColor = p.hue === 0 ? "#fff" : "hsl(280 80% 80%)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
