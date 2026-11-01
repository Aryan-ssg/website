"use client";

import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  vx: number;
  vy: number;
  sway: number;
  phase: number;
  depth: number;
};

/**
 * A canvas dust field. Motes drift upward, sway on a sine wave, and shift
 * against the cursor. It is deliberately small (≈140 motes) so it can run
 * at 60fps on a laptop without touching the main thread with layout work.
 */
export function DustField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const surface: HTMLCanvasElement = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let motes: Mote[] = [];
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let easedX = 0;
    let easedY = 0;

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      surface.width = Math.floor(width * dpr);
      surface.height = Math.floor(height * dpr);
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(150, Math.max(40, Math.round(width / 11)));

      motes = Array.from({ length: count }, () => {
        const depth = 0.35 + Math.random() * 0.65;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.4 + Math.random() * 1.3 * depth,
          alpha: 0.1 + Math.random() * 0.34 * depth,
          vx: (Math.random() - 0.5) * 0.08,
          vy: -(0.05 + Math.random() * 0.16) * depth,
          sway: 0.2 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          depth,
        };
      });
    }

    function draw(time: number) {
      context.clearRect(0, 0, width, height);
      easedX += (pointerX - easedX) * 0.05;
      easedY += (pointerY - easedY) * 0.05;

      for (const mote of motes) {
        if (!reduced) {
          mote.x += mote.vx;
          mote.y += mote.vy;

          if (mote.y < -10) {
            mote.y = height + 10;
            mote.x = Math.random() * width;
          }
          if (mote.x < -10) mote.x = width + 10;
          if (mote.x > width + 10) mote.x = -10;
        }

        const x =
          mote.x +
          Math.sin(time * 0.0004 + mote.phase) * mote.sway +
          easedX * 16 * mote.depth;
        const y = mote.y + easedY * 11 * mote.depth;
        const twinkle = 0.72 + 0.28 * Math.sin(time * 0.0009 + mote.phase);

        context.beginPath();
        context.fillStyle = `rgba(237, 232, 220, ${(mote.alpha * twinkle).toFixed(3)})`;
        context.arc(x, y, mote.r, 0, Math.PI * 2);
        context.fill();
      }
    }

    function loop(time: number) {
      draw(time);
      frame = requestAnimationFrame(loop);
    }

    function onPointerMove(event: PointerEvent) {
      pointerX = (event.clientX / width - 0.5) * 2;
      pointerY = (event.clientY / height - 0.5) * 2;
    }

    function onResize() {
      build();
      if (reduced) draw(0);
    }

    build();
    if (reduced) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="dust" aria-hidden="true" />;
}
