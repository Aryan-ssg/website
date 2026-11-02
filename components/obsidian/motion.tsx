"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals every `[data-reveal]` block once it enters the viewport, then stops
 * observing it. One observer for the whole page; no animation loop.
 * Re-runs on route change so newly-mounted sections get picked up.
 * Also applies a subtle scroll-triggered 3D tilt based on distance from viewport centre.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (blocks.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
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
  }, [pathname]);

  return null;
}

/** The italic word in the manifesto illuminates once it is in view. */
export function WordIllumination() {
  useEffect(() => {
    const word = document.querySelector<HTMLElement>(".manifesto__text em");
    if (!word) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      word.classList.add("is-lit");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-lit");
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(word);
    return () => observer.disconnect();
  }, []);

  return null;
}

/**
 * Scroll driver. `--sr` is the share of the page already read (0..1);
 * `--sy` is how far past the first viewport we have scrolled (0..1).
 * Threshold uses `--sy` to recede and darken as the visitor descends.
 */
export function ScrollDriver() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const node: HTMLDivElement = stage;

    const total = () =>
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    function update() {
      const y = window.scrollY;
      const t = total();
      node.style.setProperty("--sr", Math.min(1, y / t).toFixed(4));
      node.style.setProperty("--sy", Math.min(1, y / window.innerHeight).toFixed(4));
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

  return (
    <div
      className="scroll-driver"
      ref={stageRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0 }}
    />
  );
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