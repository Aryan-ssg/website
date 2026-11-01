import type { CSSProperties } from "react";

const phases = [
  {
    num: "00",
    title: "Listen",
    time: "2—6 weeks",
    body: "We arrive without a proposal. A week of walking, measuring, and recording the hours when the light behaves. The site speaks first.",
  },
  {
    num: "01",
    title: "Excavate",
    time: "4—10 weeks",
    body: "Drawings are dug, not composed. We remove until one gesture is left standing, then test it against wind, sound, and the client's daily route.",
  },
  {
    num: "02",
    title: "Cast",
    time: "6—14 weeks",
    body: "Material at 1:1. Mock-ups in the actual light. We build the difficult corner first, because that is where a project decides what it is.",
  },
  {
    num: "03",
    title: "Inhabit",
    time: "Ongoing",
    body: "We stay for the first month of occupation — adjusting thresholds, acoustics, temperature. A room is not finished until it is used.",
  },
];

const delay = (index: number) =>
  ({ "--d": `${(index * 0.07 + 0.05).toFixed(2)}s` }) as CSSProperties;

/** Act 05 — Process. A sticky argument beside four dated movements. */
export function Process() {
  return (
    <section
      className="act act--process"
      id="process"
      aria-labelledby="process-title"
    >
      <p className="act__index" data-reveal>
        05 / 07 — Process
      </p>

      <div className="process__grid">
        <div className="process__intro" data-reveal>
          <h2 id="process-title" className="act__title">
            The method
            <br />
            is <em>subtraction.</em>
          </h2>
          <p className="process__lede">
            Most of the work is removing what a site can live without. What
            remains is measured, cast, and lived in.
          </p>
          <span className="process__note">
            Typical engagement · 9—18 months
          </span>
        </div>

        <ol className="phases">
          {phases.map((phase, index) => (
            <li
              className="phase"
              key={phase.num}
              data-reveal
              style={delay(index)}
            >
              <span className="phase__num" aria-hidden="true">
                {phase.num}
              </span>
              <div className="phase__body">
                <div className="phase__top">
                  <h3 className="phase__title">{phase.title}</h3>
                  <span className="phase__time">{phase.time}</span>
                </div>
                <p className="phase__copy">{phase.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
