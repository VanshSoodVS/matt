import "./digital.css";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import BackToTop from "../components/BackToTop.jsx";

// The Digital Collection is now merged into the main site: it shares the
// site-wide top nav and footer. Only the content keeps the digital section's
// own (Josefin Sans) styling, via the .digital wrapper.
export default function DigitalLayout({ children }) {
  return (
    <div className="site">
      <TopNav />
      <div className="digital">
        <main className="d-main" id="main">
          {children}
        </main>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}
