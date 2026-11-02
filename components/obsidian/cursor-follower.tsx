"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor follower with a small dot and trailing ring.
 * Scales up when hovering over interactive elements.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      return;
    }

    let frame = 0;

    function tick() {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      dotPosRef.current.x += (mouseRef.current.x - dotPosRef.current.x) * 0.25;
      dotPosRef.current.y += (mouseRef.current.y - dotPosRef.current.y) * 0.25;
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;

      dot.style.transform = `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        ringRef.current?.classList.add("is-hover");
      }
    }

    function onOut(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        ringRef.current?.classList.remove("is-hover");
      }
    }

    frame = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div className="cursor-follower" aria-hidden="true">
      <div ref={dotRef} className="cursor-follower__dot" />
      <div ref={ringRef} className="cursor-follower__ring" />
    </div>
  );
}
