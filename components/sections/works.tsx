import type { CSSProperties } from "react";

import { Parallax } from "@/components/obsidian/parallax";
import { WorkArt, type WorkKind } from "./work-art";

type Project = {
  kind: WorkKind;
  name: string;
  place: string;
  year: string;
  program: string;
  status: string;
  note: string;
};

const projects: Project[] = [
  {
    kind: "cenote",
    name: "Cenote",
    place: "Yucatán, MX",
    year: "2024",
    program: "Private house",
    status: "Built",
    note: "A house organised around a collapsed cave.",
  },
  {
    kind: "meridian",
    name: "Meridian",
    place: "Atacama, CL",
    year: "2023",
    program: "Observatory",
    status: "Built",
    note: "One room, one slit, one hour of light.",
  },
  {
    kind: "halde",
    name: "Halde",
    place: "Ruhr, DE",
    year: "2022",
    program: "Cultural hall",
    status: "Built",
    note: "A slag heap given a stair and a stage.",
  },
  {
    kind: "vessel",
    name: "Vessel",
    place: "Kyushu, JP",
    year: "2025",
    program: "Pavilion",
    status: "In progress",
    note: "A shell cast in one pour, opened once.",
  },
  {
    kind: "threshold",
    name: "Threshold",
    place: "Reykjavík, IS",
    year: "2026",
    program: "Monument",
    status: "Unbuilt",
    note: "Twelve metres of basalt with a line of fire.",
  },
];

const delay = (index: number) =>
  ({ "--d": `${(index * 0.06 + 0.05).toFixed(2)}s` }) as CSSProperties;

/** Act 03 — Selected works, arranged as a horizontal plate rail. */
export function Works() {
  return (
    <section className="act act--works" id="works" aria-labelledby="works-title" data-tilt>
      <p className="act__index" data-reveal>
        03 / 07 — Selected Works
      </p>

      <div className="works__head">
        <h2 id="works-title" className="works__title" data-reveal>
          Five rooms
          <br />
          <em>the world forgot.</em>
        </h2>
        <div className="works__aside" data-reveal style={{ "--d": "0.12s" } as CSSProperties}>
          <p>
            Five climates, five bodies. Each project begins underground and ends
            in light. Scroll the rail sideways.
          </p>
          <span className="works__count">05 projects · 2019—2026</span>
        </div>
      </div>

      <ol
        className="works__rail"
        tabIndex={0}
        aria-label="Selected projects — scroll horizontally"
      >
        {projects.map((project, index) => (
          <li className="work" key={project.name} data-reveal style={delay(index)}>
            <Parallax className="work__frame-parallax" sensitivity={0.8}>
              <div className="work__frame">
                <WorkArt kind={project.kind} />
                <span className="work__tag" aria-hidden="true">
                  P—{String(index + 1).padStart(2, "0")}
                </span>
                <span className="work__status">{project.status}</span>
                <div className="work__overlay">
                  <span className="work__place">
                    {project.place} · {project.year}
                  </span>
                  <h3 className="work__name">{project.name}</h3>
                </div>
              </div>
            </Parallax>
            <div className="work__foot">
              <span>{project.program}</span>
              <span>{project.note}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
