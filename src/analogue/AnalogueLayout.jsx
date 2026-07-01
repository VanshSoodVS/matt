import "../digital/digital.css"; // shared collection-content styles (.d-*, theme)
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import BackToTop from "../components/BackToTop.jsx";

// The Analogue Collection (formerly analogue.matthewwillman.co.za) merged into
// the main site: shares the site-wide top nav + footer. Only the content keeps
// the collection theme (Josefin Sans), via the .analogue wrapper.
export default function AnalogueLayout({ children }) {
  return (
    <div className="site">
      <TopNav />
      <div className="analogue">
        <main className="d-main" id="main">
          {children}
        </main>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}
