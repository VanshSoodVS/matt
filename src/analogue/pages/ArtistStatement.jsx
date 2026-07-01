import { artistStatement } from "../data/content.js";

export default function ArtistStatement() {
  return (
    <div className="d-wrap">
      <h1 className="d-page-title">Artist Statement</h1>
      <div className="d-about">
        {artistStatement.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p style={{ marginTop: "1.5em", letterSpacing: "2px" }}>MW</p>
      </div>
    </div>
  );
}
