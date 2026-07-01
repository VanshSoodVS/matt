import { useParams } from "react-router-dom";
import essays from "../data/essays.json";
import CollectionGallery from "../../components/CollectionGallery.jsx";

// A single Digital photo essay (horizontal-scroll gallery).
export default function PhotoEssay({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp || params.slug;
  return (
    <CollectionGallery
      essay={essays[slug]}
      backTo="/digital"
      backLabel="← Back to Photo Essays"
    />
  );
}
