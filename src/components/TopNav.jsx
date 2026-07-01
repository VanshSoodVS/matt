import { Link, useLocation } from "react-router-dom";
import { portalNav } from "../data/nav.js";

// The single, site-wide top navigation bar. Used on every page so the whole
// site (portal pages + the merged Digital/Analogue sections) feels cohesive.
export default function TopNav() {
  const { pathname } = useLocation();

  // The active tab is the internal item whose path is the longest prefix of the
  // current URL. So /digital/books → "Books" (not "Contemporary"), while
  // /digital/our-mandela → "Contemporary" and /analogue/tuisland → "Legacy".
  const activeTo = portalNav
    .filter((i) => !i.external && (pathname === i.to || pathname.startsWith(i.to + "/")))
    .sort((a, b) => b.to.length - a.to.length)[0]?.to;

  return (
    <nav className="portal-nav site-nav">
      <div className="container container--wide portal-nav__inner">
        <p className="portal-nav__brand">
          <Link to="/">MATTHEW WILLMAN</Link>
        </p>
        <div className="portal-nav__links">
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
