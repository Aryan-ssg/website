import type { ReactNode } from "react";

export type WorkKind =
  | "cenote"
  | "meridian"
  | "halde"
  | "vessel"
  | "threshold";

/**
 * Each project plate carries two drawings of the same subject:
 * a rendered scene and an orthographic line drawing. The stage
 * cross-fades between them with the rest of the site.
 */
export function WorkArt({ kind }: { kind: WorkKind }) {
  const scenes: Record<WorkKind, ReactNode> = {
    cenote: <Cenote />,
    meridian: <Meridian />,
    halde: <Halde />,
    vessel: <Vessel />,
    threshold: <Monolith />,
  };

  return (
    <svg
      className="work__art"
      viewBox="0 0 320 420"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {scenes[kind]}
    </svg>
  );
}

function Cenote() {
  return (
    <>
      <defs>
        <linearGradient id="cen-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#05080d" />
          <stop offset="0.7" stopColor="#080c12" />
          <stop offset="1" stopColor="#020407" />
        </linearGradient>
        <radialGradient id="cen-light" cx="50%" cy="30%" r="55%">
          <stop offset="0" stopColor="#eafcff" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#86d9e8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#86d9e8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cen-shaft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdeff5" stopOpacity="0.35" />
          <stop offset="1" stopColor="#86d9e8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cen-water" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#d7f7fc" stopOpacity="0.8" />
          <stop offset="0.55" stopColor="#86d9e8" stopOpacity="0.26" />
          <stop offset="1" stopColor="#0a2830" stopOpacity="0" />
        </radialGradient>
        <mask id="cen-rock">
          <rect width="320" height="420" fill="#fff" />
          <circle cx="160" cy="132" r="54" fill="#000" />
        </mask>
      </defs>

      <rect width="320" height="420" fill="url(#cen-sky)" />
      <circle cx="160" cy="132" r="128" fill="url(#cen-light)" />
      <rect width="320" height="420" fill="#04070b" mask="url(#cen-rock)" />
      <g mask="url(#cen-rock)" opacity="0.55">
        <path d="M0 96h320M0 188h320M0 262h320" stroke="#101820" />
        <path d="M44 0v420M268 0v420" stroke="#0c141b" />
      </g>
      <circle cx="160" cy="132" r="54" stroke="#0a1118" strokeWidth="3" />
      <path d="M118 132 100 306l26 12 12-156Z" fill="url(#cen-shaft)" opacity="0.55" />
      <path d="M202 132 220 306l-26 12-12-156Z" fill="url(#cen-shaft)" opacity="0.35" />
      <ellipse cx="160" cy="326" rx="94" ry="20" fill="url(#cen-water)" />
      <ellipse cx="160" cy="326" rx="54" ry="7" stroke="#86d9e8" strokeOpacity="0.28" />
      <path
        d="M128 142c-9 44-5 88-13 130M194 140c11 48 5 92 15 134"
        stroke="#070d13"
        strokeWidth="2.4"
        strokeOpacity="0.8"
      />
      <g fill="#d8f4f9" opacity="0.55">
        <circle cx="139" cy="196" r="0.9" />
        <circle cx="176" cy="232" r="0.7" />
        <circle cx="152" cy="268" r="0.8" />
        <circle cx="190" cy="178" r="0.6" />
      </g>

      <g className="art__draw">
        <circle cx="160" cy="132" r="54" className="dln dln--main" />
        <circle cx="160" cy="132" r="45" className="dln" opacity="0.45" />
        <ellipse cx="160" cy="330" rx="94" ry="18" className="dln" />
        <path d="M106 132 66 330M214 132 254 330" className="dln dln--soft" />
        <line x1="160" y1="64" x2="160" y2="352" className="dln dln--dash" />
        <line x1="52" y1="132" x2="106" y2="132" className="dln dln--soft" data-draw />
        <line x1="52" y1="126" x2="52" y2="138" className="dln" />
        <line x1="66" y1="330" x2="254" y2="330" className="dln dln--main" data-draw />
        <line x1="94" y1="330" x2="88" y2="340" className="dln dln--soft" />
        <line x1="226" y1="330" x2="232" y2="340" className="dln dln--soft" />
        <circle cx="160" cy="132" r="70" className="dln dln--soft" opacity="0.35" />
      </g>
    </>
  );
}

function Meridian() {
  return (
    <>
      <defs>
        <linearGradient id="mer-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1410" />
          <stop offset="0.55" stopColor="#0b0a0a" />
          <stop offset="1" stopColor="#050506" />
        </linearGradient>
        <radialGradient id="mer-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffe9c9" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#ffab6d" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff8a5c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mer-slab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#191a1d" />
          <stop offset="0.55" stopColor="#0a0b0d" />
          <stop offset="1" stopColor="#050506" />
        </linearGradient>
        <linearGradient id="mer-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb47c" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ff8a5c" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="320" height="420" fill="url(#mer-sky)" />
      <circle cx="160" cy="306" r="132" fill="url(#mer-sun)" />
      <rect x="38" y="76" width="244" height="286" fill="url(#mer-slab)" />
      <rect x="38" y="76" width="244" height="286" stroke="#ede8dc" strokeOpacity="0.14" />
      <rect x="38" y="290" width="244" height="5" fill="#ffe9c9" />
      <rect x="38" y="290" width="244" height="16" fill="#ffb47c" opacity="0.18" />
      <g stroke="#ede8dc" strokeOpacity="0.07">
        <line x1="98" y1="76" x2="98" y2="362" />
        <line x1="160" y1="76" x2="160" y2="362" />
        <line x1="222" y1="76" x2="222" y2="362" />
        <line x1="38" y1="150" x2="282" y2="150" />
        <line x1="38" y1="222" x2="282" y2="222" />
      </g>
      <rect x="0" y="362" width="320" height="58" fill="url(#mer-floor)" />
      <line x1="0" y1="362" x2="320" y2="362" stroke="#ede8dc" strokeOpacity="0.18" />

      <g className="art__draw">
        <rect x="38" y="76" width="244" height="286" className="dln dln--main" data-draw />
        <rect x="50" y="88" width="220" height="262" className="dln dln--soft" data-draw />
        <line x1="38" y1="290" x2="282" y2="290" className="dln dln--main" data-draw />
        <path d="M38 306a122 122 0 0 1 244 0" className="dln" opacity="0.5" />
        <path d="M38 306a122 122 0 0 0 244 0" className="dln dln--dash" opacity="0.5" />
        <line x1="0" y1="362" x2="320" y2="362" className="dln dln--main" data-draw />
        <line x1="18" y1="76" x2="38" y2="76" className="dln dln--soft" />
        <line x1="18" y1="362" x2="38" y2="362" className="dln dln--soft" />
        <line x1="18" y1="70" x2="18" y2="368" className="dln" data-draw />
        <line x1="160" y1="52" x2="160" y2="76" className="dln dln--dash" />
        <line x1="282" y1="290" x2="304" y2="274" className="dln dln--soft" />
        <line x1="304" y1="274" x2="316" y2="274" className="dln dln--soft" />
        <text x="16" y="220" className="dtx" textAnchor="middle" transform="rotate(-90 16 220)">
          H 9 600
        </text>
      </g>
    </>
  );
}

function Halde() {
  return (
    <>
      <defs>
        <linearGradient id="hal-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c0b07" />
          <stop offset="0.4" stopColor="#0b0707" />
          <stop offset="1" stopColor="#040405" />
        </linearGradient>
        <radialGradient id="hal-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ff8a5c" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff4d1c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hal-mass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#070607" />
          <stop offset="0.55" stopColor="#12100f" />
          <stop offset="1" stopColor="#050405" />
        </linearGradient>
      </defs>

      <rect width="320" height="420" fill="url(#hal-sky)" />
      <ellipse cx="160" cy="352" rx="150" ry="62" fill="url(#hal-glow)" />
      <g fill="#ede8dc" opacity="0.35">
        <circle cx="52" cy="48" r="0.8" />
        <circle cx="118" cy="30" r="0.6" />
        <circle cx="236" cy="66" r="0.7" />
        <circle cx="284" cy="34" r="0.9" />
        <circle cx="278" cy="112" r="0.6" />
      </g>
      <path
        d="M54 356V300H78V252H104V208H130V172H146V150h28v22h16v36h26v44h24v48h24v56Z"
        fill="url(#hal-mass)"
        stroke="#ff8a5c"
        strokeOpacity="0.12"
      />
      <path d="M54 300h24v56H54ZM78 252h26v48H78ZM104 208h26v44h-26ZM130 172h16v36h-16Z" fill="#0a0808" opacity="0.55" />
      <path d="M54 300h24M78 252h26M104 208h26M130 172h16" stroke="#ff4d1c" strokeOpacity="0.45" />
      <ellipse cx="160" cy="160" rx="74" ry="26" fill="#ede8dc" opacity="0.05" />
      <rect x="0" y="356" width="320" height="64" fill="#ff4d1c" opacity="0.06" />

      <g className="art__draw">
        <path
          d="M54 356V300H78V252H104V208H130V172H146V150h28v22h16v36h26v44h24v48h24v56"
          className="dln dln--main"
          data-draw
        />
        <line x1="54" y1="356" x2="266" y2="356" className="dln dln--main" data-draw />
        <line x1="160" y1="130" x2="160" y2="376" className="dln dln--dash" />
        <path d="M78 356v-56h26v56M130 356v-92h26v92M182 356v-104h26v104M234 356v-56h28v56" className="dln dln--soft" />
        <line x1="40" y1="150" x2="146" y2="150" className="dln dln--soft" />
        <line x1="40" y1="356" x2="54" y2="356" className="dln dln--soft" />
        <line x1="40" y1="144" x2="40" y2="362" className="dln" data-draw />
        <line x1="266" y1="300" x2="292" y2="282" className="dln dln--soft" />
        <line x1="292" y1="282" x2="312" y2="282" className="dln dln--soft" />
        <text x="38" y="253" className="dtx" textAnchor="middle" transform="rotate(-90 38 253)">
          H 22 400
        </text>
      </g>
    </>
  );
}

function Vessel() {
  return (
    <>
      <defs>
        <linearGradient id="ves-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b0b0d" />
          <stop offset="0.6" stopColor="#070708" />
          <stop offset="1" stopColor="#030304" />
        </linearGradient>
        <linearGradient id="ves-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#efe9dd" />
          <stop offset="0.42" stopColor="#b7ae9d" />
          <stop offset="0.78" stopColor="#5d574d" />
          <stop offset="1" stopColor="#24221f" />
        </linearGradient>
        <radialGradient id="ves-hole" cx="42%" cy="38%" r="70%">
          <stop offset="0" stopColor="#0a0a0b" />
          <stop offset="0.7" stopColor="#121212" />
          <stop offset="1" stopColor="#2a2723" />
        </radialGradient>
        <radialGradient id="ves-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity="0.9" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="420" fill="url(#ves-sky)" />
      <ellipse cx="160" cy="352" rx="130" ry="26" fill="url(#ves-shadow)" />
      <g transform="rotate(-16 160 208)">
        <ellipse cx="160" cy="208" rx="88" ry="132" fill="url(#ves-body)" />
        <ellipse cx="160" cy="208" rx="54" ry="92" fill="url(#ves-hole)" />
        <ellipse cx="160" cy="208" rx="54" ry="92" stroke="#ede8dc" strokeOpacity="0.22" />
        <path d="M120 142c-18 42-16 92 2 130" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d="M198 168c10 30 10 62 0 90" stroke="#191713" strokeOpacity="0.6" />
      </g>
      <line x1="54" y1="350" x2="266" y2="350" stroke="#ede8dc" strokeOpacity="0.14" />

      <g className="art__draw">
        <g transform="rotate(-16 160 208)">
          <ellipse cx="160" cy="208" rx="88" ry="132" className="dln dln--main" data-draw />
          <ellipse cx="160" cy="208" rx="54" ry="92" className="dln" data-draw />
          <line x1="160" y1="60" x2="160" y2="356" className="dln dln--dash" />
          <line x1="72" y1="208" x2="26" y2="208" className="dln dln--soft" />
          <line x1="248" y1="208" x2="294" y2="208" className="dln dln--soft" />
          <line x1="26" y1="202" x2="26" y2="214" className="dln" />
          <line x1="294" y1="202" x2="294" y2="214" className="dln" />
          <text x="16" y="208" className="dtx" textAnchor="middle" transform="rotate(-90 16 208)">
            Ø 2 800
          </text>
        </g>
        <line x1="54" y1="350" x2="274" y2="350" className="dln dln--main" data-draw />
        <line x1="100" y1="350" x2="94" y2="358" className="dln dln--soft" />
        <line x1="220" y1="350" x2="226" y2="358" className="dln dln--soft" />
      </g>
    </>
  );
}

function Monolith() {
  return (
    <>
      <defs>
        <linearGradient id="mon-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#06080d" />
          <stop offset="0.65" stopColor="#04060a" />
          <stop offset="1" stopColor="#020305" />
        </linearGradient>
        <linearGradient id="mon-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#05070c" />
          <stop offset="0.3" stopColor="#1b2230" />
          <stop offset="0.62" stopColor="#0f131b" />
          <stop offset="1" stopColor="#04060a" />
        </linearGradient>
        <radialGradient id="mon-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ff4d1c" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ff4d1c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mon-reflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff8a5c" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ff4d1c" stopOpacity="0" />
        </linearGradient>
        <filter id="mon-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="320" height="420" fill="url(#mon-sky)" />
      <g fill="#ede8dc" opacity="0.4">
        <circle cx="42" cy="64" r="0.7" />
        <circle cx="86" cy="38" r="0.5" />
        <circle cx="248" cy="58" r="0.8" />
        <circle cx="280" cy="98" r="0.5" />
        <circle cx="272" cy="26" r="0.6" />
      </g>
      <ellipse cx="160" cy="230" rx="140" ry="180" fill="url(#mon-halo)" filter="url(#mon-soft)" />
      <rect x="132" y="58" width="56" height="284" fill="url(#mon-body)" stroke="#ede8dc" strokeOpacity="0.12" />
      <rect x="132" y="58" width="56" height="284" fill="none" stroke="#000" strokeOpacity="0.6" />
      <line x1="160" y1="92" x2="160" y2="308" stroke="#ff4d1c" strokeWidth="1.4" />
      <line x1="160" y1="92" x2="160" y2="308" stroke="#ff8a5c" opacity="0.5" filter="url(#mon-soft)" />
      <ellipse cx="160" cy="356" rx="96" ry="14" fill="url(#mon-reflect)" />
      <line x1="0" y1="342" x2="320" y2="342" stroke="#ede8dc" strokeOpacity="0.12" />
      <ellipse cx="160" cy="300" rx="120" ry="34" fill="#86d9e8" opacity="0.04" filter="url(#mon-soft)" />

      <g className="art__draw">
        <rect x="132" y="58" width="56" height="284" className="dln dln--main" data-draw />
        <rect x="140" y="68" width="40" height="264" className="dln dln--soft" data-draw />
        <line x1="160" y1="40" x2="160" y2="368" className="dln dln--dash" />
        <line x1="160" y1="92" x2="160" y2="308" className="dln" />
        <line x1="0" y1="342" x2="320" y2="342" className="dln dln--main" data-draw />
        <line x1="110" y1="58" x2="110" y2="342" className="dln dln--soft" />
        <line x1="210" y1="58" x2="210" y2="342" className="dln dln--soft" />
        <line x1="104" y1="58" x2="116" y2="58" className="dln" />
        <line x1="104" y1="342" x2="116" y2="342" className="dln" />
        <line x1="226" y1="58" x2="248" y2="40" className="dln dln--soft" />
        <line x1="248" y1="40" x2="306" y2="40" className="dln dln--soft" />
        <text x="16" y="200" className="dtx" textAnchor="middle" transform="rotate(-90 16 200)">
          H 12 400
        </text>
      </g>
    </>
  );
}
