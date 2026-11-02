import Link from "next/link";

/** The site footer: an act list, a contact line, and the drawing frame. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="site-footer__acts" aria-label="Site acts">
          <Link href="/">01 · Threshold</Link>
          <Link href="/manifesto">02 · Manifesto</Link>
          <Link href="/works">03 · Works</Link>
          <Link href="/capabilities">04 · Capabilities</Link>
          <Link href="/process">05 · Process</Link>
          <Link href="/studio">06 · Studio</Link>
          <Link href="/invitation">07 · Invitation</Link>
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