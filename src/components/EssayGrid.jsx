import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// A grid of collection / photo-essay tiles (image + title) linking to
// `${basePath}/${item.slug}`. Shared by the Digital and Analogue sections.
//
// When `animate` is set, tiles reveal with a subtle slide + fade as they
// scroll into view. Direction alternates every two rows (first two rows ease
// in from the left, the next two from the right, and so on) — a sleek take on
// the original analogue site's fadeInLeft / fadeInRight row animation.
export default function EssayGrid({ title, items, basePath, animate = false, columns = 4 }) {
  // Indices that have scrolled into view (null = animation disabled).
  const [visible, setVisible] = useState(() => (animate ? new Set() : null));
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!animate) return;

    // Respect reduced-motion: reveal everything immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(new Set(items.map((_, i) => i)));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const added = [];
        for (const entry of entries) {
          if (entry.isIntersecting) {
            added.push(Number(entry.target.dataset.idx));
            io.unobserve(entry.target);
          }
        }
        if (added.length) setVisible((prev) => new Set([...prev, ...added]));
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [animate, items]);

  // Two rows share a direction; pairs alternate left / right.
  const dirClass = (i) => {
    const pair = Math.floor(Math.floor(i / columns) / 2);
    return pair % 2 === 0 ? "from-left" : "from-right";
  };

  const gridClass = [
    "d-essays-grid",
    columns === 3 ? "cols-3" : "",
    animate ? "is-animated" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="d-wrap">
      {title && <h1 className="d-page-title">{title}</h1>}
      <div className={gridClass}>
        {items.map((item, i) => (
          <Link
            key={item.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            data-idx={i}
            to={`${basePath}/${item.slug}`}
            className={`d-essay-card ${animate ? dirClass(i) : ""}${
              visible && visible.has(i) ? " is-visible" : ""
            }`}
          >
            <div className="d-essay-card__img">
              <img src={item.img} alt={item.title} loading="lazy" />
            </div>
            <p className="d-essay-card__title">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
