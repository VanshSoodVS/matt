import TopNav from "./TopNav.jsx";
import BackToTop from "./BackToTop.jsx";

// Standard page shell: shared top nav + page content.
export default function Layout({ children }) {
  return (
    <div className="site">
      <TopNav />
      <main id="main">{children}</main>
      <BackToTop />
    </div>
  );
}
