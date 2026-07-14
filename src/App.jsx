import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import HomePortal from "./pages/HomePortal.jsx";
import Artist from "./pages/Artist.jsx";
import Exhibition from "./pages/Exhibition.jsx";
import Homme from "./pages/Homme.jsx";
import Hub from "./pages/Hub.jsx";
import Collection from "./pages/Collection.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

// Digital Collection (formerly digital.matthewwillman.co.za), now internal.
import DigitalLayout from "./digital/DigitalLayout.jsx";
import DigitalHome from "./digital/pages/DigitalHome.jsx";
import PhotoEssay from "./digital/pages/PhotoEssay.jsx";
import About from "./digital/pages/About.jsx";
import Books from "./digital/pages/Books.jsx";
import DigitalContact from "./digital/pages/DigitalContact.jsx";

// Analogue Collection (formerly analogue.matthewwillman.co.za), now internal.
import AnalogueLayout from "./analogue/AnalogueLayout.jsx";
import AnalogueHome from "./analogue/pages/AnalogueHome.jsx";
import AnalogueCollection from "./analogue/pages/AnalogueCollection.jsx";
import AboutCollections from "./analogue/pages/AboutCollections.jsx";
import ArtistStatement from "./analogue/pages/ArtistStatement.jsx";

// Collection slugs that resolve to the data-driven Collection page.
const COLLECTION_SLUGS = [
  "mandela",
  "robben-island",
  "tuisland",
  "african-child",
  "i-am-san",
  "private-space",
  "shape-of-light",
  "black",
];

// Wrap a page in the standard header/footer layout.
const withLayout = (node) => <Layout>{node}</Layout>;
const withDigital = (node) => <DigitalLayout>{node}</DigitalLayout>;
const withAnalogue = (node) => <AnalogueLayout>{node}</AnalogueLayout>;

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Home Portal renders its own header, so no Layout wrapper. */}
        <Route path="/" element={<HomePortal />} />

        <Route path="/artist" element={withLayout(<Artist />)} />
        <Route path="/exhibition" element={withLayout(<Exhibition />)} />
        <Route path="/homme" element={withLayout(<Homme />)} />
        <Route path="/legacy" element={withLayout(<Hub name="legacy" />)} />
        <Route path="/contemporary" element={withLayout(<Hub name="contemporary" />)} />
        <Route path="/contact" element={withLayout(<Contact />)} />

        {COLLECTION_SLUGS.map((slug) => (
          <Route key={slug} path={`/${slug}`} element={withLayout(<Collection slug={slug} />)} />
        ))}

        {/* Digital Collection — internal section under /digital */}
        <Route path="/digital" element={withDigital(<DigitalHome />)} />
        <Route path="/digital/about" element={withDigital(<About />)} />
        <Route path="/digital/books" element={withDigital(<Books />)} />
        <Route path="/digital/contact" element={withDigital(<DigitalContact />)} />
        <Route path="/digital/:slug" element={withDigital(<PhotoEssay />)} />

        {/* Analogue Collection — internal section under /analogue */}
        <Route path="/analogue" element={withAnalogue(<AnalogueHome />)} />
        <Route
          path="/analogue/about-collections"
          element={withAnalogue(<AboutCollections />)}
        />
        <Route
          path="/analogue/artist-statement"
          element={withAnalogue(<ArtistStatement />)}
        />
        <Route path="/analogue/:slug" element={withAnalogue(<AnalogueCollection />)} />

        <Route path="*" element={withLayout(<NotFound />)} />
      </Routes>
    </>
  );
}
