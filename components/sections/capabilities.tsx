"use client";

import { useState } from "react";

const disciplines = [
  {
    label: "Architecture",
    short: "ARCH",
    angle: -90,
    radius: 150,
    line: "Buildings that behave like instruments, not objects.",
  },
  {
    label: "Interiors",
    short: "INT",
    angle: -18,
    radius: 190,
    line: "Rooms tuned to the body, the hour, and the weather.",
  },
  {
    label: "Objects",
    short: "OBJ",
    angle: 54,
    radius: 164,
    line: "Furniture, hardware, and light made at 1:1.",
  },
  {
    label: "Environments",
    short: "ENV",
    angle: 126,
    radius: 190,
    line: "Scent, sound, and temperature as building material.",
  },
  {
    label: "Strategy",
    short: "STR",
    angle: 198,
    radius: 150,
    line: "Briefing, naming, and the spatial identity of a practice.",
  },
];

const CENTRE = 230;

const nodes = disciplines.map((discipline, index) => {
  const radians = (discipline.angle * Math.PI) / 180;
  return {
    ...discipline,
    index,
    x: CENTRE + Math.cos(radians) * discipline.radius,
    y: CENTRE + Math.sin(radians) * discipline.radius,
    dx: Math.cos(radians),
    dy: Math.sin(radians),
  };
});

/**
 * Act 04 — Capabilities. Five nodes on two orbits; choosing one moves the
 * whole diagram into focus around it.
 */
export function Capabilities() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : nodes[active];

  return (
    <section
      className="act act--capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <p className="act__index" data-reveal>
        04 / 07 — Capabilities
      </p>

      <div className="act__head">
        <h2 id="capabilities-title" className="act__title" data-reveal>
          One instrument,
          <br />
          five ways <em>to play it.</em>
        </h2>
        <p className="act__aside" data-reveal>
          We are one studio with five appetites. Choose a discipline to see
          what it holds.
        </p>
      </div>

      <div
        className="capabilities__grid"
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setActive(null);
        }}
      >
        <ul className="caps">
          {nodes.map((node) => (
            <li
              key={node.label}
              className={active === node.index ? "cap is-active" : "cap"}
            >
              <button
                type="button"
                className="cap__button"
                onPointerEnter={() => setActive(node.index)}
                onFocus={() => setActive(node.index)}
                onClick={() => setActive(node.index)}
                aria-pressed={active === node.index}
              >
                <span className="cap__num" aria-hidden="true">
                  0{node.index}
                </span>
                <span className="cap__name">{node.label}</span>
                <span className="cap__short" aria-hidden="true">
                  {node.short}
                </span>
              </button>
              <p className="cap__line">{node.line}</p>
            </li>
          ))}
        </ul>

        <div className="orbit-wrap" data-reveal>
          <svg
            className="orbit"
            viewBox="0 0 460 460"
            fill="none"
            aria-hidden="true"
          >
            <circle cx={CENTRE} cy={CENTRE} r="54" className="orbit__core-ring" />
            <circle cx={CENTRE} cy={CENTRE} r="104" className="orbit__ring orbit__ring--soft" />
            <circle cx={CENTRE} cy={CENTRE} r="150" className="orbit__ring orbit__ring--dash" />
            <circle cx={CENTRE} cy={CENTRE} r="190" className="orbit__ring" />

            {Array.from({ length: 36 }, (_, tick) => {
              const angle = (tick * 10 * Math.PI) / 180;
              const long = tick % 3 === 0;
              const r1 = 190;
              const r2 = long ? 196 : 193;
              return (
                <line
                  key={tick}
                  x1={CENTRE + Math.cos(angle) * r1}
                  y1={CENTRE + Math.sin(angle) * r1}
                  x2={CENTRE + Math.cos(angle) * r2}
                  y2={CENTRE + Math.sin(angle) * r2}
                  className="orbit__tick"
                />
              );
            })}

            {nodes.map((node) => (
              <g key={node.short}>
                <line
                  x1={CENTRE}
                  y1={CENTRE}
                  x2={node.x}
                  y2={node.y}
                  className={
                    active === node.index
                      ? "orbit__spoke is-active"
                      : "orbit__spoke"
                  }
                />
                <g
                  className={
                    active === node.index
                      ? "orbit__node is-active"
                      : "orbit__node"
                  }
                >
                  <circle cx={node.x} cy={node.y} r="16" className="orbit__halo" />
                  <circle cx={node.x} cy={node.y} r="4" className="orbit__dot" />
                  <text
                    x={node.x + node.dx * 26}
                    y={node.y + node.dy * 26 + 3}
                    textAnchor="middle"
                    className="orbit__label"
                  >
                    {node.short}
                  </text>
                </g>
              </g>
            ))}
          </svg>

          <div className="orbit__core">
            <span className="orbit__core-key" aria-hidden="true">
              {current ? `0${current.index} / 05` : "05 / 05"}
            </span>
            <span className="orbit__core-name">
              {current ? current.label : "Obsidian"}
            </span>
            <span className="orbit__core-copy">
              {current
                ? current.line
                : "Five disciplines. One instrument."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
