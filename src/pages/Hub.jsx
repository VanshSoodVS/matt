import { Link } from "react-router-dom";
import { hubs } from "../data/collections.js";

// Legacy / Contemporary hub: a stack of large images linking to each
// collection. `name` selects which hub definition to render.
export default function Hub({ name }) {
  const hub = hubs[name];
  if (!hub) return null;

  return (
    <div className="page hub">
      <div className="container">
        <h1 className="page__title">{hub.title}</h1>

        {hub.items.map((item) => (
          <Link key={item.to} to={item.to} className="hub__item">
            <div className="hub__image">
              <img src={item.image} alt={item.caption} loading="lazy" />
            </div>
            <span className="hub__caption">{item.caption}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
