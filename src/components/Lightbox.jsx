import { useEffect, useCallback } from "react";

// Full-screen image viewer with keyboard + arrow navigation.
// `images` is an array of { src, title }. `index` is the active image,
// or null when the lightbox is closed.
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const isOpen = index !== null && index >= 0;

  const go = useCallback(
    (delta) => {
      if (!isOpen) return;
      const next = (index + delta + images.length) % images.length;
      onNavigate(next);
    },
    [isOpen, index, images.length, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, go]);

  if (!isOpen) return null;

  const current = images[index];
  const multiple = images.length > 1;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button
        type="button"
        className="lightbox__btn lightbox__btn--close"
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>

      {multiple && (
        <button
          type="button"
          className="lightbox__btn lightbox__btn--prev"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
        >
          ‹
        </button>
      )}

      <img
        className="lightbox__img"
        src={current.src}
        alt={current.title || ""}
        onClick={(e) => e.stopPropagation()}
      />

      {multiple && (
        <button
          type="button"
          className="lightbox__btn lightbox__btn--next"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
        >
          ›
        </button>
      )}

      {current.title && <div className="lightbox__caption">{current.title}</div>}
    </div>
  );
}
