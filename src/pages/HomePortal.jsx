import { Link } from "react-router-dom";
import { portalLinks } from "../data/nav.js";
import TopNav from "../components/TopNav.jsx";

const BOOK = "/wp-content/uploads/2026/06/Tuisland_book_for_website-1.jpg";
const DIGITAL = "/wp-content/uploads/2025/04/A7.jpg";
const ANALOGUE = "/wp-content/uploads/2025/04/Willman-Opener-e1747206044516.jpg";

// The Home Portal landing page (page 2525). The original hides the site
// header here, so this page renders its own minimal top nav instead.
export default function HomePortal() {
  return (
    <div className="portal">
      <TopNav />

      {/* New book release feature */}
      <section className="portal-feature">
        <div className="container">
          <div className="portal-feature__row">
            <p className="portal-feature__label">
              New
              <br />
              Book
              <br />
              Release
            </p>
            <Link className="portal-feature__image" to={portalLinks.book}>
              <img src={BOOK} alt="Tuisland — new book release" />
            </Link>
            <p className="portal-feature__label">
              <Link to={portalLinks.book}>
                Order &amp;
                <br />
                View
                <br />
                Here
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Two collection tiles */}
      <section className="portal-tiles">
        <div className="container">
          <div className="portal-tiles__row">
            <div className="portal-tile">
              <Link className="portal-tile__image" to={portalLinks.digital}>
                <img src={DIGITAL} alt="MW Collection Digital" />
              </Link>
              <Link className="portal-tile__button" to={portalLinks.digital}>
                MW Collection Digital
              </Link>
            </div>

            <div className="portal-tile">
              <Link className="portal-tile__image" to={portalLinks.analogue}>
                <img src={ANALOGUE} alt="MW Collection Analogue" />
              </Link>
              <Link className="portal-tile__button" to={portalLinks.analogue}>
                MW Collection Analogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
