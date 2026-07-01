import { useState } from "react";
import Lightbox from "./Lightbox.jsx";

// Image-grid gallery with click-to-zoom lightbox.
// `images` is an array of { src, title }.
export default function Gallery({ images, columns = 3 }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className={`gallery${columns === 2 ? " gallery--two" : ""}`}>
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="gallery__item"
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActive(i);
            }}
          >
            <div className="gallery__thumb">
              <img src={img.src} alt={img.title || ""} loading="lazy" />
            </div>
          </figure>
        ))}
      </div>

      <Lightbox
        images={images}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </>
  );
}
