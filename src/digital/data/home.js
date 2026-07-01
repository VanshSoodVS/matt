// Photo Essays home grid for the Digital Collection.
// `slug` resolves to /digital/<slug>. Order follows the live site, with the
// two complete-but-previously-unlinked galleries appended at the end.
const U = "/wp-content/uploads";

export const photoEssays = [
  { slug: "an-afternoon-in-havana", title: "An afternoon in Havana", img: `${U}/2023/11/An-afternoon-in-Havana.jpg` },
  { slug: "art-of-mw", title: "Shape of Light", img: `${U}/2023/11/Art-of-MW.jpg` },
  { slug: "black", title: "BLACK", img: `${U}/2023/11/BLACK.jpg` },
  { slug: "private-space", title: "Private Space", img: `${U}/2023/11/Private-Space.jpg` },
  { slug: "our-mandela", title: "MANDELA: A portrait of an African icon", img: `${U}/2023/11/Our-Mandela.jpg` },
  { slug: "famous-faces", title: "Famous faces", img: `${U}/2023/11/Leaders.jpg` },
  { slug: "studio", title: "STUDIO (WIP)", img: `${U}/2023/11/Studio.jpg` },
  { slug: "deep-level-mining-south-africa", title: "Deep level mining: South Africa", img: `${U}/2023/11/Mining.jpg` },
  { slug: "moments-of-the-human-condition", title: "Moments of the human condition", img: `${U}/2023/11/Moments-of-the-human-condition.jpg` },
  { slug: "out-the-ordinary", title: "Out the ordinary", img: `${U}/2023/11/Out-the-ordinary.jpg` },
  { slug: "boys-of-the-royal-ballet", title: "Boys of The Royal Ballet", img: `${U}/2023/11/Boys-of-the-Royal-Ballet.jpg` },
  { slug: "an-african-portrait", title: "An African Portrait", img: `${U}/2023/11/An-African-Portrait.jpg` },
  { slug: "african-documentary", title: "African Documentary", img: `${U}/2023/11/African-Documentary.jpg` },
  { slug: "african-pangolin", title: "African Pangolin", img: `${U}/2024/02/African-Pangolin.jpg` },
  // "Inanda Heritage" and "The Robben Island Story" are intentionally not shown
  // on the grid (their pages/media are kept and remain reachable by URL).
];
