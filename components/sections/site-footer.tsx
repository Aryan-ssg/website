import Link from "next/link";

/** The site footer: an act list, a contact line, and the drawing frame. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="site-footer__acts" aria-label="Site acts">
          <span>01 · Threshold</span>
          <span>02 · Manifesto</span>
          <span>03 · Works</span>
          <span>04 · Capabilities</span>
          <span>05 · Process</span>
          <span>06 · Studio</span>
          <span>07 · Invitation</span>
        </nav>

        <div className="site-footer__meta">
          <p>
            Obsidian is a fictional spatial design studio. All buildings, places,
            and drawings on this site are invented for this study.
          </p>
          <p>
            Est. 2019 · Nine people · Three cities · No house style.
          </p>
        </div>

        <div className="site-footer__line" aria-hidden="true">
          <span>OBSIDIAN</span>
          <span>DWG · 00 · REV A</span>
          <span>Architecture of the Unseen</span>
        </div>

        <Link className="site-footer__home" href="/">
          <span className="site-footer__home-mark" aria-hidden="true" />
          <span>Obsidian</span>
        </Link>
      </div>
    </footer>
  );
}