import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { portalNav } from "../data/nav.js";

// The single, site-wide top navigation bar. Used on every page so the whole
// site (portal pages + the merged Digital/Analogue sections) feels cohesive.
// On narrow screens the links collapse behind a hamburger toggle.
export default function TopNav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes (a link was followed).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // The active tab is the internal item whose path is the longest prefix of the
  // current URL. So /digital/books → "Books" (not "Contemporary"), while
  // /digital/our-mandela → "Contemporary" and /analogue/tuisland → "Legacy".
  const activeTo = portalNav
    .filter((i) => !i.external && (pathname === i.to || pathname.startsWith(i.to + "/")))
    .sort((a, b) => b.to.length - a.to.length)[0]?.to;

  return (
    <nav className="portal-nav site-nav">
      <div className="portal-nav__inner">
        <p className="portal-nav__brand">
          <Link to="/">MATTHEW WILLMAN</Link>
        </p>

        <button
          type="button"
          className="portal-nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="portal-nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="portal-nav__toggle-bar" />
          <span className="portal-nav__toggle-bar" />
          <span className="portal-nav__toggle-bar" />
        </button>

        <div
          id="portal-nav-links"
          className={open ? "portal-nav__links is-open" : "portal-nav__links"}
        >
          {portalNav.map((item) =>
            item.external ? (
              <a key={item.label} href={item.to} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className={item.to === activeTo ? "is-active" : undefined}
                aria-current={item.to === activeTo ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
