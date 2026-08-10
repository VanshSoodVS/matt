import TopNav from "./TopNav.jsx";
import BackToTop from "./BackToTop.jsx";
import Footer from "./Footer.jsx";

// Standard page shell: shared top nav + page content + footer.
export default function Layout({ children }) {
  return (
    <div className="site">
      <TopNav />
      <main id="main">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
