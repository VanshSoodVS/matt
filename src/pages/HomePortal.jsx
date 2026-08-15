import { Link } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import CopyEmail from "../components/CopyEmail.jsx";
import Footer from "../components/Footer.jsx";
import { EDITIONS, formatZAR, formatUSD } from "../data/editions.js";

const BASE = "/wp-content/uploads/landing-images";
const HERO = `${BASE}/WEBSITE%20landing%20page%20image_v2.jpg`;
const BOX1 = `${BASE}/homme-box-1.jpg`;
const BOX2 = `${BASE}/homme-box-2.jpg`;

const EMAIL = "matthew@matthewwillman.co.za";
const [ED_SLIPCASE, ED_FIRST] = EDITIONS;

// Home / landing page: the HOMME book launch.
export default function HomePortal() {
  return (
    <div className="landing">
      <TopNav />

      <section className="landing-hero">
        <img src={HERO} alt="HOMME by Matthew Willman - launching October 2026" />
      </section>

      <div className="landing-body">
        <p className="landing-register">
          Secure your copy - pre-order now before the public release
        </p>

        <div className="landing-editions">
          <div className="edition">
            <div className="edition__img">
              <img src={BOX1} alt="HOMME - Collector’s Slipcase Edition" />
            </div>
            <p className="edition__title">
              <strong>COLLECTOR’S SLIPCASE EDITION</strong> launch special
            </p>
            <p className="edition__sub">Including original giclee signed print and certificate</p>
            <div className="edition__prices">
              <p className="edition__price">South Africa&nbsp;&nbsp;{formatZAR(ED_SLIPCASE.priceZAR)}</p>
              <p className="edition__price">International {formatUSD(ED_SLIPCASE.priceUSD)}</p>
              <p className="edition__price">FedEx Priority Included</p>
            </div>
            <Link className="edition__submit" to={`/checkout?edition=${ED_SLIPCASE.slug}`}>
              PRE-ORDER NOW
            </Link>
          </div>

          <div className="edition">
            <div className="edition__img">
              <img src={BOX2} alt="HOMME - Signed First Edition" />
            </div>
            <p className="edition__title">
              <strong>SIGNED FIRST EDITION</strong>
            </p>
            <p className="edition__sub">&nbsp;</p>
            <div className="edition__prices">
              <p className="edition__price">South Africa&nbsp;&nbsp;{formatZAR(ED_FIRST.priceZAR)}</p>
              <p className="edition__price">International {formatUSD(ED_FIRST.priceUSD)}</p>
              <p className="edition__price">FedEx Priority Included</p>
            </div>
            <Link className="edition__submit" to={`/checkout?edition=${ED_FIRST.slug}`}>
              PRE-ORDER NOW
            </Link>
          </div>
        </div>

        <CopyEmail email={EMAIL} />

        <Link className="landing-viewbook" to="/homme">
          Click here to view book
        </Link>
      </div>

      <section className="landing-video">
        <div className="landing-video__frame">
          <video
            className="landing-video__player"
            controls
            preload="metadata"
            playsInline
            poster={HERO}
          >
            <source src={`${BASE}/homme-intro.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <Footer />
    </div>
  );
}
