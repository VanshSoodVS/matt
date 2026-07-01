import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Lightbox from "./Lightbox.jsx";

// A photo collection rendered as the "thecs" horizontal-scroll strip: a title
// block at the left (title + description) followed by the images in one tall
// row. Vertical wheel is translated into smooth, eased horizontal scrolling;
// the strip can also be dragged. Shared by the Digital and Analogue sections.
export default function CollectionGallery({
  essay,
  backTo = "/",
  backLabel = "← Back",
  framed = false,
}) {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const stripRef = useRef(null);
  const target = useRef(0); // desired scrollLeft, eased toward each frame
  const raf = useRef(0);
  const drag = useRef({ down: false, moved: false, startX: 0, startScroll: 0 });

  // Smooth, eased horizontal scrolling for the wheel / trackpad.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    target.current = el.scrollLeft;

    const tick = () => {
      const cur = el.scrollLeft;
      const diff = target.current - cur;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target.current;
        raf.current = 0;
        return;
      }
      el.scrollLeft = cur + diff * 0.14; // easing factor — lower = smoother glide
      raf.current = requestAnimationFrame(tick);
    };

    const onWheel = (e) => {
      // On phones the strip is a normal vertical list — leave scrolling native.
      if (window.innerWidth <= 720) return;
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const max = el.scrollWidth - el.clientWidth;
      // At the ends, let the page scroll (so the footer / back link are reachable).
      if ((target.current >= max - 1 && delta > 0) || (target.current <= 0 && delta < 0)) return;
      e.preventDefault();
      target.current = Math.max(0, Math.min(max, target.current + delta));
      if (!raf.current) raf.current = requestAnimationFrame(tick);
      setScrolled(true);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [essay]);

  const onMouseDown = (e) => {
    const el = stripRef.current;
    if (!el) return;
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    drag.current = { down: true, moved: false, startX: e.pageX, startScroll: el.scrollLeft };
    el.classList.add("is-dragging");
  };

  const onMouseMove = (e) => {
    const el = stripRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
    target.current = el.scrollLeft;
    if (drag.current.moved) setScrolled(true);
  };

  const endDrag = () => {
    const el = stripRef.current;
    drag.current.down = false;
    if (el) el.classList.remove("is-dragging");
  };

  if (!essay) {
    return (
      <div className="d-wrap">
        <h1 className="d-page-title">Not found</h1>
        <p className="d-intro">This collection doesn’t exist.</p>
        <Link to={backTo} className="d-essay__back">
          {backLabel}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div
        className="d-essay"
        ref={stripRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        <div className="d-essay__title">
          <h1>{essay.title}</h1>
          {essay.intro && <div className="d-essay__intro">{essay.intro}</div>}
        </div>

        {essay.images.map((img, i) => (
          <figure
            key={img.src + i}
            className={`d-essay__item${framed ? " is-framed" : ""}`}
            onClick={() => {
              if (!drag.current.moved) setActive(i);
            }}
          >
            <img src={img.src} alt="" draggable="false" loading="lazy" />
          </figure>
        ))}
      </div>

      {!scrolled && <p className="d-scroll-hint">Drag or scroll →</p>}

      <Link to={backTo} className="d-essay__back">
        {backLabel}
      </Link>

      <Lightbox
        images={essay.images}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </>
  );
}
