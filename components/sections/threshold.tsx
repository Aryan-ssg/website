import Link from "next/link";
import type { CSSProperties } from "react";
import { Parallax } from "@/components/obsidian/parallax";
import { StaggeredText } from "@/components/obsidian/staggered-text";

const draw = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

/**
 * Act 01 — Threshold.
 * The monolith exists twice: as rendered mass (CSS) and as a drawn
 * orthographic section (SVG). The stage cross-fades between them.
 */
export function Threshold() {
  return (
    <section className="threshold" aria-labelledby="threshold-title">
      <header className="threshold__nav">
        <Link className="brand" href="/" aria-label="OBSIDIAN — home">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__word">Obsidian</span>
        </Link>

        <div className="meta">
          <span className="meta__row">
            <span>Index 01 / 07</span>
            <span className="meta__rule" aria-hidden="true" />
            <span>Esc 000</span>
          </span>
          <span className="meta__row">
            <span className="meta__state--rendered">Rendered</span>
            <span className="meta__state--drawn">Drawn · 1:50</span>
          </span>
        </div>
      </header>

      <div className="composition">
        <h1 id="threshold-title" className="sr-only">
          Architecture of the Unseen
        </h1>

        <span
          className="reveal reveal--a"
          aria-hidden="true"
          style={{ "--reveal-delay": "0.08s" } as CSSProperties}
        >
          <span className="title__line title__a">
            <StaggeredText stagger={80}>Architecture</StaggeredText>
          </span>
        </span>

        <figure className="object" aria-hidden="true">
          <Parallax className="object-parallax">
            <div className="mass">
              <div className="mass__halo" />
              <div className="mass__body">
                <div className="mass__slit" />
                <div className="mass__fog" />
              </div>
              <div className="mass__reflection" />
            </div>

            <DrawnSection />
          </Parallax>
        </figure>

        <span
          className="reveal reveal--b"
          aria-hidden="true"
          style={{ "--reveal-delay": "0.26s" } as CSSProperties}
        >
          <span className="title__line title__b">
            <span className="reveal__inner">of the Unseen</span>
          </span>
        </span>
      </div>

      <footer className="threshold__foot">
        <div className="scroll-cue">
          <span className="scroll-cue__track" aria-hidden="true" />
          <span>Scroll to descend</span>
        </div>
        <div className="foot-meta">
          <div>Est. 2019</div>
          <div>9°N / 79°W</div>
        </div>
      </footer>
    </section>
  );
}

/** Orthographic section of the monolith, with dimensions and callouts. */
function DrawnSection() {
  return (
    <svg
      className="drawn-mass"
      viewBox="0 0 420 560"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern
          id="obsidian-hatch"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="7"
            stroke="rgb(134 217 232 / 34%)"
            strokeWidth="0.7"
          />
        </pattern>
      </defs>

      {/* outer mass */}
      <rect
        className="ln ln--main"
        x="95"
        y="50"
        width="200"
        height="460"
        pathLength={1}
        data-draw
        style={draw(0.05)}
      />

      {/* inner offset (wall thickness) */}
      <rect
        className="ln"
        x="112"
        y="68"
        width="166"
        height="424"
        pathLength={1}
        data-draw
        style={draw(0.12)}
      />

      {/* hatch fill */}
      <rect x="112" y="68" width="166" height="424" fill="url(#obsidian-hatch)" className="hatch" />

      {/* centreline */}
      <line className="ln ln--dash" x1="195" y1="34" x2="195" y2="528" />
      <text className="txt txt--dim fade" x="200" y="42">
        CL
      </text>

      {/* ground line */}
      <line
        className="ln ln--main"
        x1="70"
        y1="510"
        x2="330"
        y2="510"
        pathLength={1}
        data-draw
        style={draw(0.2)}
      />
      {Array.from({ length: 24 }, (_, i) => (
        <line
          key={i}
          className="ln ln--soft"
          x1={80 + i * 10}
          y1="510"
          x2={74 + i * 10}
          y2="520"
          pathLength={1}
          data-draw
          style={draw(0.26)}
        />
      ))}

      {/* left dimension — height */}
      <line
        className="ln ln--soft"
        x1="58"
        y1="50"
        x2="95"
        y2="50"
        pathLength={1}
        data-draw
        style={draw(0.28)}
      />
      <line
        className="ln ln--soft"
        x1="58"
        y1="510"
        x2="95"
        y2="510"
        pathLength={1}
        data-draw
        style={draw(0.28)}
      />
      <line
        className="ln"
        x1="58"
        y1="50"
        x2="58"
        y2="510"
        pathLength={1}
        data-draw
        style={draw(0.32)}
      />
      <line className="ln" x1="52" y1="56" x2="64" y2="44" />
      <line className="ln" x1="52" y1="516" x2="64" y2="504" />
      <text
        className="txt fade"
        x="40"
        y="280"
        textAnchor="middle"
        transform="rotate(-90 40 280)"
      >
        H 12 400
      </text>

      {/* top dimension — width */}
      <line
        className="ln ln--soft"
        x1="95"
        y1="26"
        x2="95"
        y2="50"
        pathLength={1}
        data-draw
        style={draw(0.3)}
      />
      <line
        className="ln ln--soft"
        x1="295"
        y1="26"
        x2="295"
        y2="50"
        pathLength={1}
        data-draw
        style={draw(0.3)}
      />
      <line
        className="ln"
        x1="95"
        y1="26"
        x2="295"
        y2="26"
        pathLength={1}
        data-draw
        style={draw(0.34)}
      />
      <line className="ln" x1="89" y1="32" x2="101" y2="20" />
      <line className="ln" x1="289" y1="32" x2="301" y2="20" />
      <text className="txt fade" x="195" y="16" textAnchor="middle">
        W 5 200
      </text>

      {/* right callouts */}
      <g className="ln">
        <line
          x1="295"
          y1="160"
          x2="322"
          y2="140"
          pathLength={1}
          data-draw
          style={draw(0.4)}
        />
        <line
          x1="322"
          y1="140"
          x2="405"
          y2="140"
          pathLength={1}
          data-draw
          style={draw(0.4)}
        />
        <line
          x1="295"
          y1="320"
          x2="322"
          y2="300"
          pathLength={1}
          data-draw
          style={draw(0.44)}
        />
        <line
          x1="322"
          y1="300"
          x2="405"
          y2="300"
          pathLength={1}
          data-draw
          style={draw(0.44)}
        />
        <line
          x1="295"
          y1="460"
          x2="322"
          y2="440"
          pathLength={1}
          data-draw
          style={draw(0.48)}
        />
        <line
          x1="322"
          y1="440"
          x2="405"
          y2="440"
          pathLength={1}
          data-draw
          style={draw(0.48)}
        />
      </g>
      <g className="fade">
        <text className="txt" x="405" y="136" textAnchor="end">
          Titanium clad
        </text>
        <text className="txt" x="405" y="296" textAnchor="end">
          Aperture Ø 0.012
        </text>
        <text className="txt" x="405" y="436" textAnchor="end">
          Basalt plinth
        </text>
      </g>

      {/* registration marks */}
      <line className="ln ln--soft" x1="95" y1="50" x2="86" y2="41" />
      <line className="ln ln--soft" x1="295" y1="50" x2="304" y2="41" />
      <line className="ln ln--soft" x1="95" y1="510" x2="86" y2="519" />
      <line className="ln ln--soft" x1="295" y1="510" x2="304" y2="519" />

      {/* scale bar */}
      <g className="fade">
        <rect className="ln" x="95" y="538" width="40" height="6" />
        <rect
          className="ln"
          x="135"
          y="538"
          width="40"
          height="6"
          fill="rgb(134 217 232 / 18%)"
        />
        <line className="ln ln--soft" x1="95" y1="532" x2="95" y2="544" />
        <line className="ln ln--soft" x1="135" y1="532" x2="135" y2="544" />
        <line className="ln ln--soft" x1="175" y1="532" x2="175" y2="544" />
        <text className="txt txt--dim" x="95" y="556">
          Scale 1:50
        </text>
        <text className="txt txt--dim" x="405" y="556" textAnchor="end">
          OB — 01
        </text>
      </g>
    </svg>
  );
}
