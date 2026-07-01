import { useParams } from "react-router-dom";
import collections from "../data/collections.json";
import CollectionGallery from "../../components/CollectionGallery.jsx";

// A single Analogue collection (horizontal-scroll gallery).
export default function AnalogueCollection({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp || params.slug;
  return (
    <CollectionGallery
      essay={collections[slug]}
      backTo="/analogue"
      backLabel="← Back to Collections"
    />
  );
}
