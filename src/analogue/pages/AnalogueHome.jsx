import { Link } from "react-router-dom";
import EssayGrid from "../../components/EssayGrid.jsx";
import { collectionTiles } from "../data/home.js";

// Analogue Collection landing — a grid of collections. A small secondary row
// links to the section's About / Artist Statement pages (which aren't in the
// global top nav).
export default function AnalogueHome() {
  return (
    <>
      <EssayGrid items={collectionTiles} basePath="/analogue" columns={3} animate />
      <div className="d-wrap" style={{ paddingTop: 0 }}>
        <p className="d-subnav">
          <Link to="/analogue/about-collections">About the Collections</Link>
          <span aria-hidden="true"> · </span>
          <Link to="/analogue/artist-statement">Artist Statement</Link>
        </p>
      </div>
    </>
  );
}
