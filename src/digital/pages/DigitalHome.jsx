import EssayGrid from "../../components/EssayGrid.jsx";
import { photoEssays } from "../data/home.js";

// Digital Collection landing - a grid of photo-essay projects.
export default function DigitalHome() {
  return <EssayGrid items={photoEssays} basePath="/digital" />;
}
