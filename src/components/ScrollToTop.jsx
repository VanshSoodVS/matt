import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset scroll position when the route changes. If the URL carries a hash
// (e.g. /terms#refunds), scroll to that section instead of the top.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // The destination page may not have mounted yet on route change, so
      // retry briefly until the anchor element appears, then scroll to it.
      let tries = 0;
      let timer;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries++ < 10) {
          timer = setTimeout(tryScroll, 50);
        }
      };
      timer = setTimeout(tryScroll, 0);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
