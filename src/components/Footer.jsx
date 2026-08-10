import { Link } from "react-router-dom";

// Site-wide footer. Carries the legal/policy links that PayFast and South
// African consumer/POPIA compliance expect to be reachable from every page.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="site-footer__links" aria-label="Legal and policies">
          <Link to="/terms">Terms &amp; Conditions</Link>
          <Link to="/terms#refunds">Refunds &amp; Returns</Link>
          <Link to="/shipping">Shipping &amp; Delivery</Link>
        </nav>

        <p className="site-footer__contact">
          Matthew Willman Photography &nbsp;·&nbsp;{" "}
          <a href="mailto:matthew@matthewwillman.co.za">matthew@matthewwillman.co.za</a>
          &nbsp;·&nbsp; +27 82 836 5787
        </p>
      </div>
    </footer>
  );
}
