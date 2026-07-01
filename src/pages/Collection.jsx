import { useParams } from "react-router-dom";
import { useState } from "react";
import { getCollection } from "../data/collections.js";
import Gallery from "../components/Gallery.jsx";
import Lightbox from "../components/Lightbox.jsx";
import VisualProcess from "../components/VisualProcess.jsx";
import NotFound from "./NotFound.jsx";

// Renders a single collection. `slug` may be passed directly (for fixed
// routes) or read from the URL params.
export default function Collection({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp || params.slug;
  const data = getCollection(slug);

  // Lightbox state for the "priced" layout (declared before the early
  // return so hook order stays stable).
  const [active, setActive] = useState(null);

  if (!data) return <NotFound />;

  const isPriced = data.layout === "priced";

  return (
    <div className="page">
      <div className="container">
        <header className="collection__intro">
          <h1 className="page__title">{data.title}</h1>
          {data.subtitle && (
            <p className="text-center" style={{ marginTop: "-0.4em", color: "#555" }}>
              {data.subtitle}
            </p>
          )}
          {data.intro?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </header>

        {isPriced ? (
          <>
            <div className="artworks">
              {data.artworks.map((art, i) => (
                <article className="artwork" key={art.src}>
                  <div className="artwork__media" onClick={() => setActive(i)}>
                    <img src={art.src} alt={art.title} loading="lazy" />
                  </div>
                  <div className="artwork__info">
                    <h2 className="artwork__title">
                      <em>{art.title}</em>
                      {art.year ? `, ${art.year}` : ""}
                    </h2>
                    <ul className="artwork__details">
                      {art.details.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <Lightbox
              images={data.artworks}
              index={active}
              onClose={() => setActive(null)}
              onNavigate={setActive}
            />
          </>
        ) : (
          <Gallery images={data.artworks} columns={data.artworks.length <= 3 ? 3 : 3} />
        )}

        {data.visualProcess && <VisualProcess variant={data.visualProcess} />}
      </div>
    </div>
  );
}
