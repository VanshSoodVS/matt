import { aboutCollections, aboutQuotes, aboutClosing } from "../data/content.js";

export default function AboutCollections() {
  return (
    <div className="d-wrap">
      <h1 className="d-page-title">About Collections</h1>
      <div className="d-about">
        {aboutCollections.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {aboutQuotes.map((q, i) => (
          <blockquote key={i}>“{q}”</blockquote>
        ))}

        {aboutClosing.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
