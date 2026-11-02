const cities = [
  { city: "Lisbon", role: "Studio & workshop", coord: "38°43′N 9°08′W" },
  { city: "Kyoto", role: "Interiors & objects", coord: "35°00′N 135°46′E" },
  {
    city: "Mexico City",
    role: "Architecture & landscape",
    coord: "19°25′N 99°07′W",
  },
];

const facts = [
  { term: "Founded", detail: "2019" },
  { term: "Studios", detail: "Lisbon · Kyoto · Mexico City" },
  { term: "People", detail: "Nine" },
  { term: "Practice", detail: "Architecture · Interiors · Objects" },
  { term: "On the boards", detail: "4 built · 3 unbuilt · 1 monument" },
];

const materials = [
  { name: "Basalt", code: "M—01", tone: "basalt" },
  { name: "Ash", code: "M—02", tone: "ash" },
  { name: "Bone", code: "M—03", tone: "bone" },
  { name: "Ember", code: "M—04", tone: "ember" },
];

/** Act 06 — Studio. A lit arch, the facts, and the material library. */
export function Studio() {
  return (
    <section className="act act--studio" id="studio" aria-labelledby="studio-title" data-tilt>
      <p className="act__index" data-reveal>
        06 / 07 — Studio
      </p>

      <div className="act__head">
        <h2 id="studio-title" className="act__title" data-reveal>
          Nine people.
          <br />
          Three cities.
          <br />
          <em>One long conversation.</em>
        </h2>
        <p className="act__aside" data-reveal>
          We keep three studios and one workshop. Every project passes through
          at least two of them before it is built.
        </p>
      </div>

      <div className="studio__grid">
        <figure className="studio__portrait" data-reveal>
          <StudioPlate />
          <figcaption>
            <span>Workshop, Lisbon</span>
            <span>Fig. 06 — North light</span>
          </figcaption>
        </figure>

        <div className="studio__data" data-reveal>
          <dl className="facts">
            {facts.map((fact) => (
              <div className="fact" key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <ul className="cities">
            {cities.map((entry) => (
              <li className="city" key={entry.city}>
                <span className="city__name">{entry.city}</span>
                <span className="city__role">{entry.role}</span>
                <span className="city__coord">{entry.coord}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="materials" data-reveal>
        <span className="materials__label">Material library · Rev A</span>
        <ul className="materials__list">
          {materials.map((material) => (
            <li className="material" key={material.name}>
              <span
                className="material__swatch"
                data-tone={material.tone}
                aria-hidden="true"
              />
              <span className="material__name">{material.name}</span>
              <span className="material__code">{material.code}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The workshop arch: north light, one bench, a filament. */
function StudioPlate() {
  return (
    <svg
      className="studio__art"
      viewBox="0 0 420 520"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stu-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0c11" />
          <stop offset="0.7" stopColor="#06080c" />
          <stop offset="1" stopColor="#030406" />
        </linearGradient>
        <linearGradient id="stu-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe7d7" stopOpacity="0.92" />
          <stop offset="0.55" stopColor="#b9ae9b" stopOpacity="0.72" />
          <stop offset="1" stopColor="#6e6860" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="stu-spill" cx="50%" cy="60%" r="55%">
          <stop offset="0" stopColor="#efe7d7" stopOpacity="0.22" />
          <stop offset="1" stopColor="#efe7d7" stopOpacity="0" />
        </radialGradient>
        <filter id="stu-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <pattern id="stu-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#86d9e8" strokeOpacity="0.4" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect width="420" height="520" fill="url(#stu-wall)" />
      <g className="studio__render">
        <path
          d="M112 470V246a98 98 0 0 1 196 0v224Z"
          fill="url(#stu-light)"
        />
        <path
          d="M112 470V246a98 98 0 0 1 196 0v224Z"
          fill="url(#stu-spill)"
          filter="url(#stu-soft)"
        />
        <rect x="112" y="470" width="196" height="14" fill="#efe7d7" opacity="0.16" />
        <rect x="152" y="418" width="116" height="7" fill="#12100d" />
        <rect x="158" y="425" width="4" height="26" fill="#12100d" />
        <rect x="258" y="425" width="4" height="26" fill="#12100d" />
        <rect x="206" y="396" width="7" height="22" fill="#0c0a09" />
        <path d="M0 470h420" stroke="#ede8dc" strokeOpacity="0.14" />
        <g stroke="#ede8dc" strokeOpacity="0.05">
          <path d="M0 120h420M0 210h420M0 300h420M0 390h420" />
          <path d="M70 0v520M350 0v520" />
        </g>
        <line x1="258" y1="0" x2="258" y2="316" stroke="#06070a" strokeWidth="1" />
        <circle cx="258" cy="322" r="3" fill="#ff4d1c" />
        <circle cx="258" cy="322" r="12" fill="#ff4d1c" opacity="0.25" filter="url(#stu-soft)" />
      </g>

      <g className="studio__draw">
        <path
          d="M112 470V246a98 98 0 0 1 196 0v224"
          className="dln dln--main"
          data-draw
        />
        <path
          d="M126 470V250a84 84 0 0 1 168 0v220"
          className="dln dln--soft"
          data-draw
        />
        <path d="M112 470V246a98 98 0 0 1 196 0v224Z" fill="url(#stu-hatch)" opacity="0.35" />
        <line x1="0" y1="470" x2="420" y2="470" className="dln dln--main" data-draw />
        <line x1="210" y1="112" x2="210" y2="496" className="dln dln--dash" />
        <line x1="112" y1="150" x2="210" y2="150" className="dln dln--soft" />
        <line x1="92" y1="150" x2="112" y2="150" className="dln dln--soft" />
        <line x1="92" y1="470" x2="112" y2="470" className="dln dln--soft" />
        <line x1="92" y1="144" x2="92" y2="476" className="dln" data-draw />
        <line x1="112" y1="136" x2="112" y2="164" className="dln" />
        <path d="M174 470V250a36 36 0 0 1 72 0v220" className="dln dln--soft" />
        <line x1="308" y1="246" x2="336" y2="222" className="dln dln--soft" />
        <line x1="336" y1="222" x2="402" y2="222" className="dln dln--soft" />
        <text x="400" y="218" textAnchor="end" className="dtx">
          North light · Ø 4 200
        </text>
        <line x1="258" y1="0" x2="258" y2="316" className="dln dln--dash" />
        <text x="90" y="300" className="dtx" textAnchor="middle" transform="rotate(-90 90 300)">
          H 7 800
        </text>
      </g>
    </svg>
  );
}
