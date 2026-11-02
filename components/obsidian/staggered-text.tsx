"use client";

import type { CSSProperties } from "react";

interface StaggeredTextProps {
  children: string;
  className?: string;
  /** Ms between each word */
  stagger?: number;
  /** Tag to render */
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Splits text into individual words and staggers their entrance.
 * Each word rises from below with an escalating delay.
 */
export function StaggeredText({
  children,
  className,
  stagger = 70,
  as: Tag = "span",
}: StaggeredTextProps) {
  const parts = children.split(/(\s+)/);
  let wordIndex = 0;

  return (
    <Tag className={className}>
      {parts.map((part, i) => {
        if (part.trim() === "") {
          return <span key={i}>{part}</span>;
        }
        const idx = wordIndex++;
        return (
          <span
            key={i}
            className="staggered-word"
            style={{ "--i": idx, "--stagger": stagger } as CSSProperties}
          >
            {part}
          </span>
        );
      })}
    </Tag>
  );
}