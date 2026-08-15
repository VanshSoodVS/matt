import { aboutBlocks } from "../data/about.js";

export default function About() {
  return (
    <div className="d-wrap">
      <h1 className="d-page-title">About</h1>
      <div className="d-about">
        <h2>Biography</h2>
        {aboutBlocks.map((b, i) =>
          b.type === "quote" ? (
            <blockquote key={i}>
              “{b.text}”
              {b.cite && <cite>- {b.cite}</cite>}
            </blockquote>
          ) : (
            <p key={i}>{b.text}</p>
          )
        )}
      </div>
    </div>
  );
}
