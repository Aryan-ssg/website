import type { CSSProperties } from "react";

const materials = [
  "Basalt",
  "20°12′N 87°27′W",
  "Titanium",
  "59°54′N 10°45′E",
  "Volcanic glass",
  "35°40′N 139°45′E",
  "Concrete",
  "Rev A",
  "Silence",
];

const delay = (index: number) =>
  ({ "--d": `${(index * 0.12 + 0.08).toFixed(2)}s` }) as CSSProperties;

/** Act 02 — Manifesto. Static for now; scroll-linked illumination comes later. */
export function Manifesto() {
  return (
    <section className="act act--manifesto" aria-labelledby="manifesto-title">
      <p className="act__index" data-reveal>
        02 / 07 — Manifesto
      </p>

      <h2 id="manifesto-title" className="manifesto__text" data-reveal style={delay(0)}>
        We do not decorate space. We <em>listen</em> to it. Then we give it a
        body.
      </h2>

      <p className="manifesto__body" data-reveal style={delay(1)}>
        Obsidian is a spatial design studio. We work on buildings, interiors,
        and the moments between them — the threshold, the pause, the place where
        a room decides what it wants to be.
      </p>

      <p className="manifesto__body" data-reveal style={delay(2)}>
        Nine people across three cities. No house style. Every project begins by
        removing our assumptions, and ends when the space is forgotten and only
        the feeling remains.
      </p>

      <div className="manifesto__marquee" aria-hidden="true" data-reveal style={delay(3)}>
        {materials.map((material) => (
          <span key={material}>{material}</span>
        ))}
      </div>
    </section>
  );
}