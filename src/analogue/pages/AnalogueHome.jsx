import EssayGrid from "../../components/EssayGrid.jsx";
import { collectionTiles } from "../data/home.js";

// Analogue Collection landing — a grid of collections.
export default function AnalogueHome() {
  return <EssayGrid items={collectionTiles} basePath="/analogue" columns={3} animate />;
}
