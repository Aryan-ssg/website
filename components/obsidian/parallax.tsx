"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Multiplier for how far the element tilts (0–2) */
  sensitivity?: number;
}

/**
 * Wraps children in a mouse-reactive 3D tilt.
 * Sets --mx / --my CSS vars (−0.5…0.5) on the wrapper for use in transforms.
 */
export function Parallax({ children, className, sensitivity = 1 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", (x * sensitivity).toFixed(4));
      el.style.setProperty("--my", (y * sensitivity).toFixed(4));
    };

    const handleMouseLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [sensitivity]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}