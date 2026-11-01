"use client";

import { useEffect, useRef } from "react";

/**
 * Reveals every `[data-reveal]` block once it enters the viewport, then stops
 * observing it. One observer for the whole page; no animation loop.
 */
export function ScrollReveal() {
  useEffect(() => {
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (blocks.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const block of blocks) block.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const block of blocks) observer.observe(block);
    return () => observer.disconnect();
  }, []);

  return null;
}

/** A hairline down the left margin that fills as the page is read. */
export function ScrollProgress() {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const node: HTMLSpanElement = fill;

    let frame = 0;

    function update() {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      node.style.transform = `scaleY(${Math.min(1, Math.max(0, ratio))})`;
    }

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

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress__fill" ref={fillRef} />
    </div>
  );
}
