"use client";

import { useEffect, useRef } from "react";

/**
 * Applies a subtle scroll-triggered 3D tilt to `[data-tilt]` elements.
 * Elements further from the viewport centre tilt more, creating a
 * multi-plane depth effect as the user scrolls.
 */
export function Scroll3D() {
  const refs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]"),
    );
    refs.current = elements;

    const viewportH = window.innerHeight;
    const viewportCentre = viewportH / 2;

    function update() {
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const elCentre = rect.top + rect.height / 2;
        const distance = (elCentre - viewportCentre) / viewportH;
        // Tilt up to 4° — subtle, never distracts
        const tilt = Math.max(-4, Math.min(4, distance * 8));
        el.style.setProperty("--tilt", tilt.toFixed(3));
      }
    }

    let frame = 0;
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}