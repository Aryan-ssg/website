"use client";

import { useEffect, useRef } from "react";

/**
 * Premium interactive mouse-parallax background.
 *
 * - Four depth layers (blurred gradients) moving at different speeds
 * - Five floating 3D geometric shapes with continuous rotation
 * - Shapes repulse from cursor and never get touched
 * - Smooth interpolation via requestAnimationFrame + lerp
 * - Disabled on touch devices and when prefers-reduced-motion is set
 * - pointer-events: none — never interferes with clicks or scroll
 */
export function DepthField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, px: 0, py: 0 });
  const currentRef = useRef({ x: 0.5, y: 0.5 });
  const shapesRef = useRef<Array<HTMLDivElement | null>>([]);
  const posRef = useRef(
    Array(5).fill(0).map(() => ({ x: 0, y: 0, vx: 0, vy: 0 })),
  );

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      return;
    }

    if (!fieldRef.current) return;

    const el = fieldRef.current;
    const shapes = shapesRef.current.filter(Boolean) as HTMLDivElement[];

    // Initialize positions
    shapes.forEach((shape, i) => {
      const rect = shape.getBoundingClientRect();
      posRef.current[i] = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        vx: 0,
        vy: 0,
      };
    });

    let frame = 0;

    function tick() {
      if (!el) return;

      const lerp = 0.06;
      currentRef.current.x +=
        (mouseRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y +=
        (mouseRef.current.y - currentRef.current.y) * lerp;

      el.style.setProperty("--dx", currentRef.current.x.toFixed(4));
      el.style.setProperty("--dy", currentRef.current.y.toFixed(4));

      const mx = mouseRef.current.px;
      const my = mouseRef.current.py;
      const repelRadius = 260;
      const repelStrength = 2.0;
      const returnStrength = 0.03;
      const damping = 0.9;

      shapes.forEach((shape, i) => {
        const pos = posRef.current[i];
        const rect = shape.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < repelRadius) {
          const force = Math.pow((repelRadius - dist) / repelRadius, 1.8);
          pos.vx += (dx / dist) * force * repelStrength * 100;
          pos.vy += (dy / dist) * force * repelStrength * 100;
        }

        // Gently return to original position
        pos.vx += (pos.x - cx) * returnStrength;
        pos.vy += (pos.y - cy) * returnStrength;

        pos.vx *= damping;
        pos.vy *= damping;

        shape.style.setProperty("--rx", pos.vx.toFixed(3));
        shape.style.setProperty("--ry", pos.vy.toFixed(3));
      });

      frame = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
      mouseRef.current.px = e.clientX;
      mouseRef.current.py = e.clientY;
    }

    function onResize() {
      shapes.forEach((shape, i) => {
        const rect = shape.getBoundingClientRect();
        posRef.current[i] = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          vx: posRef.current[i].vx,
          vy: posRef.current[i].vy,
        };
      });
    }

    frame = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="depth-field" ref={fieldRef} aria-hidden="true">
      {/* Depth gradient layers */}
      <div className="depth-layer depth-layer--1" />
      <div className="depth-layer depth-layer--2" />
      <div className="depth-layer depth-layer--3" />
      <div className="depth-layer depth-layer--4" />

      {/* Floating 3D shapes — outer div drifts, inner div spins */}
      <div
        className="float-shape float-shape--sphere"
        ref={(el) => {
          shapesRef.current[0] = el;
        }}
      >
        <div className="float-shape__inner" />
      </div>
      <div
        className="float-shape float-shape--cube"
        ref={(el) => {
          shapesRef.current[1] = el;
        }}
      >
        <div className="float-shape__inner" />
      </div>
      <div
        className="float-shape float-shape--cylinder"
        ref={(el) => {
          shapesRef.current[2] = el;
        }}
      >
        <div className="float-shape__inner" />
      </div>
      <div
        className="float-shape float-shape--cone"
        ref={(el) => {
          shapesRef.current[3] = el;
        }}
      >
        <div className="float-shape__inner" />
      </div>
      <div
        className="float-shape float-shape--torus"
        ref={(el) => {
          shapesRef.current[4] = el;
        }}
      >
        <div className="float-shape__inner" />
      </div>
    </div>
  );
}