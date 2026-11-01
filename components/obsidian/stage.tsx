"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Mode = "rendered" | "drawn";

const STORAGE_KEY = "obsidian:mode";

/**
 * The stage owns the site's two states: Rendered and Drawn.
 * Every section reads the state through `[data-mode]` in CSS, so
 * sections can stay server components.
 */
export function Stage({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("rendered");
  const [bloom, setBloom] = useState(false);
  const mounted = useRef(false);

  // Restore the state for this session, and allow sharing a state via URL.
  useEffect(() => {
    mounted.current = true;
    const requested = new URLSearchParams(window.location.search).get("mode");
    const remembered = window.sessionStorage.getItem(STORAGE_KEY);

    if (requested === "drawn" || (!requested && remembered === "drawn")) {
      // One-time read of session state on mount; this is the sync point with
      // the browser, not derived React state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode("drawn");
    }
  }, []);

  const toggle = useCallback(() => {
    setMode((current) => {
      const next: Mode = current === "rendered" ? "drawn" : "rendered";
      window.sessionStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  // Returning to Rendered blooms from the centre instead of rewinding.
  useEffect(() => {
    if (!mounted.current || mode !== "rendered") return;

    setBloom(true);
    const timer = window.setTimeout(() => setBloom(false), 700);
    return () => window.clearTimeout(timer);
  }, [mode]);

  // "D" flips the drawing, unless the visitor is typing.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (!isTyping && event.key.toLowerCase() === "d") {
        event.preventDefault();
        toggle();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  return (
    <div className="stage" data-mode={mode}>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <div className="frame" aria-hidden="true">
        <span className="frame__label">
          OBSIDIAN — DWG 01 · SECTION A–A · SCALE 1:50 · REV A
        </span>
        <span className="frame__north">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="9" strokeWidth="1" />
            <path d="M12 5.5 15 15l-3-2.2L9 15z" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          N
        </span>
      </div>

      <div className={`bloom ${bloom ? "is-on" : ""}`} aria-hidden="true" />

      {children}

      <button
        type="button"
        className="mode-switch"
        onClick={toggle}
        aria-pressed={mode === "drawn"}
        aria-label={
          mode === "rendered"
            ? "Show the drawn state"
            : "Show the rendered state"
        }
      >
        <span className="mode-switch__dot" aria-hidden="true" />
        <span>{mode === "rendered" ? "Rendered" : "Drawn"}</span>
        <span className="mode-switch__key" aria-hidden="true">
          D
        </span>
      </button>
    </div>
  );
}
