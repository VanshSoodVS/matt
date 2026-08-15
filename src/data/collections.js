// ---------------------------------------------------------------------------
// Collection content for The Willman Collection Portal.
// Text and image references mirror the original WordPress site.
// ---------------------------------------------------------------------------

const IMG = "/wp-content/uploads";

// Shared "visual process" closing block used on several collection pages.
export const visualProcess = {
  short: [
    "Working primarily in the darkroom Willman produces one-of-a-kind silver gelatin prints. Each work is hand-crafted and unrepeatable, resisting the conventions of editioned analogue photography and positioning the photograph as a singular object.",
    "His work is exhibited internationally and is held in private and institutional collections.",
    "Willman lives and works in South Africa.",
  ],
  extended: [
    "Working primarily in the darkroom Willman produces one-of-a-kind silver gelatin prints. Each work is hand-crafted and unrepeatable, resisting the conventions of editioned analogue photography and positioning the photograph as a singular object.",
    "Alongside his analogue practice, Willman’s digital works extend similar concerns with perception, scale, and temporality, while remaining grounded in a disciplined visual language.",
    "His work is exhibited internationally and is held in private and institutional collections.",
    "Willman lives and works in South Africa.",
  ],
};

// Convert "Die-donderweer-rol-1-scaled.jpg" -> "Die donderweer rol"
function titleFromFile(path) {
  const file = path.split("/").pop().replace(/\.[a-z]+$/i, "");
  return file
    .replace(/-scaled.*$/i, "")
    .replace(/-\d+$/g, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

// Build a plain image-grid gallery from a list of file paths.
function grid(paths) {
  return paths.map((src) => ({ src: `${IMG}/${src}`, title: titleFromFile(src) }));
}

export const collections = {
  // ----------------------------- LEGACY --------------------------------
  mandela: {
    slug: "mandela",
    category: "legacy",
    title: "Mandela",
    subtitle: "Portrait of an African Icon",
    intro: [],
    layout: "priced",
    visualProcess: "extended",
    artworks: [
      {
        src: `${IMG}/2026/04/Tatom-Khulu.jpg`,
        title: "Tatom Khulu",
        year: "2004",
        details: [
          "Silver Gelatin analogue hand print 1/1 - Available, price on request",
          "Silver Gelatin analogue hand print, Artist Proof - Sold",
          "Giclée fine art 23 × 35 inches (edition 5) - $6,000",
          "Giclée fine art 23 × 16 inches (edition 15) - $2,800",
        ],
      },
      {
        src: `${IMG}/2026/04/46664-Hand-1.jpg`,
        title: "466/64 Hand",
        year: "2004",
        details: [
          "Silver Gelatin analogue hand print 1/1 - Sold",
          "Silver Gelatin analogue hand print, Artist Proof - Available, price on request",
          "Giclée fine art 23 × 35 inches (edition 5) - $6,000",
          "Giclée fine art 23 × 16 inches (edition 15) - $2,800",
        ],
      },
      {
        src: `${IMG}/2026/04/Amandla.jpg`,
        title: "Amandla",
        year: "2004",
        details: [
          "Silver Gelatin analogue hand print 1/1 - Available, price on request",
          "Silver Gelatin analogue hand print, Artist Proof - Available, price on request",
          "Giclée fine art 23 × 35 inches (edition 5) - $8,000",
          "Giclée fine art 23 × 16 inches (edition 15) - $3,800",
        ],
      },
      {
        src: `${IMG}/2026/04/uTata-Madiba.jpg`,
        title: "uTata Madiba",
        year: "2004",
        details: [
          "Chromogenic print 1/1 - Sold",
          "Giclée fine art 23 × 35 inches (edition 5) - $6,000",
          "Giclée fine art 23 × 16 inches (edition 15) - $2,800",
        ],
      },
      {
        src: `${IMG}/2026/04/Madiba-Smile.jpg`,
        title: "Madiba Smile",
        year: "2004",
        details: [
          "Silver Gelatin analogue hand print 1/1 - Sold",
          "Silver Gelatin analogue hand print, Artist Proof - Price on request",
          "Giclée fine art 23 × 35 inches (edition 5) - Sold",
          "Giclée fine art 23 × 16 inches (edition 15) - $3,800",
        ],
      },
    ],
  },

  "robben-island": {
    slug: "robben-island",
    category: "legacy",
    title: "Robben Island: Echoes from the Island",
    intro: [
      "There are places in the world where silence is not the absence of sound, but the presence of memory. Robben Island is one such place.",
      "Set adrift in the cold waters of Table Bay, the island exists as both geography and testimony - a site where the physical landscape has absorbed the weight of human endurance.",
      "In Matthew Willman’s hands, this island is not simply documented - it is felt.",
      "Created during an extended period living on the island, this body of work resists spectacle. Instead, it leans into stillness. The images do not shout history; they hold it. They invite the viewer into a slower, more intimate encounter - one where light, texture, and absence become the language through which the past speaks.",
      "Through analogue process and darkroom craft, each photograph carries a tactile weight, as if the silver itself remembers. Willman’s approach is deeply human. Rather than attempting to reconstruct suffering, he creates space for reflection. His work engages with a central paradox of Robben Island: how a place designed to break the human spirit became, for many, a crucible of resilience, dignity, and ultimately, forgiveness.",
      "In the end, Robben Island: Echoes from the Island is not about the past alone. It is about the enduring capacity of the human spirit to transcend it.",
    ],
    layout: "priced",
    artworks: [
      ["B-Section-guard-tower-scaled.jpg", "B Section guard tower"],
      ["Cell-bathroom-tap-scaled.jpg", "Cell bathroom tap"],
      ["Island-Lighthouse-scaled.jpg", "Island Lighthouse"],
      ["Island-ship-wreck-scaled.jpg", "Island shipwreck"],
      ["Mandela-courtyeard-scaled.jpg", "Mandela courtyard"],
      ["Mandela-prison-cell-2-scaled.jpg", "Mandela prison cell"],
      ["Penguins-of-the-island-1-scaled.jpg", "Penguins of the island"],
      ["Prison-tower-scaled.jpg", "Prison tower"],
      ["Prisoner-46664-cell-key-scaled.jpg", "Prisoner 46664 cell key"],
      ["Robben-Island-1-scaled.jpg", "Robben Island"],
      ["Stones-of-remembrance-scaled.jpg", "Stones of remembrance"],
      ["Wild-island-tower-scaled.jpg", "Wild island & tower"],
      ["whispering-grasses-scaled.jpg", "whispering grasses"],
    ].map(([file, title]) => ({
      src: `${IMG}/2026/04/${file}`,
      title,
      year: "2001",
      details: [
        "Silver Gelatin analogue handprint 1/1 - $1,800",
        "Silver Gelatin analogue handprint, Artist Proof - $1,600",
      ],
    })),
  },

  tuisland: {
    slug: "tuisland",
    category: "legacy",
    title: "Tuisland ’n Stillewe",
    intro: [
      "This body of work emerges from landscapes historically rich within the narrative of Southern Africa – territories, farmlands, wastelands, arid deserts, tiny dorp towns, mining towns, villages and homesteads, the highlands to the lowlands. Rather than approaching these locations through direct documentation, the works engage with their lingering atmospheres and the traces of lived experience embedded within them.",
      "The images themselves move between presence and absence. Episodic fragments of diverse landscapes appear and recede; evidence of man carved within the lands very form and shape refusing fixed narratives. What remains then is a sense of quiet dislocation – an often-unstable relationship between memory, place, and identity.",
      "Produced as one-of-one silver gelatin prints, each image is shaped through a slow, manual darkroom process. This method resists the reproducibility typically associated with modern photography, allowing the work to exist as a singular object. In this context, materiality becomes integral: the surface of the print carries not only the images, but also the marks of its making.",
      "In this way, the work extends beyond its specific context, engaging broader questions of belonging and the fragile construction of memory.",
    ],
    layout: "grid",
    visualProcess: "short",
    artworks: grid([
      "2026/04/stories-vertel.jpg",
      "2026/04/Paternoster-oggend.jpg",
      "2026/04/Drie-susters-scaled.jpg",
      "2026/04/Heining-lyn.jpg",
      "2026/04/Iewers-anders-scaled.jpg",
      "2026/04/Die-donderweer-rol-1-scaled.jpg",
      "2026/04/Die-land-daarbuite-scaled.jpg",
      "2026/04/Die-oes-scaled.jpg",
      "2026/04/Enige-plek-is-scaled.jpg",
      "2026/04/Geheue-teen-vergeet-scaled.jpg",
      "2026/04/Huis-op-die-grond-scaled.jpg",
      "2026/04/Lang-afstand-scaled.jpg",
      "2026/04/Maluti-Platteland-scaled.jpg",
      "2026/04/MW0001a-scaled.jpg",
      "2026/04/MWMedFormat0023-scaled.jpg",
      "2026/04/n-ander-wereld-scaled.jpg",
      "2026/04/Onder-die-brug-scaled.jpg",
      "2026/04/Ons-dorp.jpg",
      "2026/04/Pompstasie-scaled.jpg",
      "2026/04/Stillewe-scaled.jpg",
      "2026/04/TUISLAND-n-stillewe-2-scaled.jpg",
      "2026/04/Verby-aardse-rykdom-scaled.jpg",
      "2026/04/Vir-ewig-in-tyd-scaled.jpg",
    ]),
  },

  "african-child": {
    slug: "african-child",
    category: "legacy",
    title: "African Child",
    intro: [
      "Willman’s art explores the human condition through quiet, everyday moments - a glance, a posture, a moment of stillness. Working within analogue photography, his portraits carry a deep sense of dignity, presence, and humanity.",
      "His images of youth across Southern Africa become both document and reflection, capturing resilience, imagination, and continuity. More than portraits, they invite us to reconsider childhood and recognise a shared African humanity still unfolding.",
      "Blending documentary tradition with fine art, each hand-printed work is carefully crafted in the darkroom, transforming light, shadow, and negative into distinctive collectible pieces.",
    ],
    layout: "grid",
    visualProcess: "short",
    artworks: grid([
      "2026/04/herdboy-horse.jpg",
      "2026/04/daughters.jpg",
      "2026/04/dambuza-kids.jpg",
      "2026/04/boys-on-water.jpg",
      "2026/04/boy-and-dog.jpg",
      "2026/04/Arepacho-boy.jpg",
      "2026/04/afternoon-soccer.jpg",
      "2026/04/zulu-dance.jpg",
      "2026/04/vukukhanye.jpg",
      "2026/04/ingane-yomama.jpg",
      "2026/04/Maluti-boy.jpg",
      "2026/04/pondo-boy.jpg",
      "2026/04/umfaan.jpg",
      "2026/04/township-street-kids.jpg",
      "2026/04/thandanani.jpg",
      "2026/04/street-soccer.jpg",
      "2026/04/street-games.jpg",
      "2026/04/indodakazi.jpg",
      "2026/04/Masibambisane.jpg",
    ]),
  },

  // -------------------------- CONTEMPORARY -----------------------------
  "i-am-san": {
    slug: "i-am-san",
    category: "contemporary",
    title: "I am San",
    intro: [
      "There is a stillness in these images that feel older than the act of photography itself - as if the lens has stepped into a conversation already in progress, one that began long before the shutter, and will continue long after us.",
      "Willman’s creations do not present a subject so much as a presence. A human figure, but also something elemental - like wind given shape. The posture is unguarded, yet sovereign. You are not invited to observe; you are required to acknowledge. It recalls the enduring visual language of San rock art - elongated, rhythmic, deeply intentional - where the body is not merely depicted but translated into spirit.",
      "These works shift silence. Here, the gaze - whether direct or withheld - becomes the axis of the work. There is a tension between intimacy and distance, as though the photograph understands that seeing is not the same as knowing. Light does not illuminate so much as reveal in fragments: skin, texture, the trace of movement. You begin to feel that what is being documented is not a person alone, but a continuity - a lineage that resists simplification.",
      "Each frame holds more than a figure; it holds time. Not historical time but lived time - the kind that gathers in the body, in gesture, in stillness. There is a quiet defiance here, not loud or performative, but deeply rooted. It asks: who gets to define what is “ancient,” and who decides what is “modern”?",
      "Together, these works do not function as portraits in the conventional sense. They are encounters. They dissolve the comfortable distance between viewer and subject, replacing it with something far more demanding: recognition.",
    ],
    layout: "grid",
    artworks: grid([
      "2026/04/Xkamiep-2.jpg",
      "2026/04/Xkamiep.jpg",
      "2026/04/Patat-Koo-Pan.jpg",
    ]),
  },

  "private-space": {
    slug: "private-space",
    category: "contemporary",
    title: "Private Space",
    intro: [
      "There is a moment, just before movement becomes memory, where everything exists in perfect tension - body, breath, light, and intent. It is in this fragile, fleeting threshold that PRIVATE SPACE finds its voice.",
      "Created over five years, across continents, cultures, and disciplines, this collection by Matthew Willman is not simply a study of dance, but a meditation on presence. Working with 88 dancers from 42 countries, Willman dissolves the boundary between photographer and performer, revealing a shared language spoken not in words, but in instinct, discipline, and trust.",
      "These images do not belong to the stage. They exist outside it - in landscapes, in silence, in spaces where performance is stripped of audience and expectation. Here, the dancer is no longer performing for applause, and the photographer is no longer documenting. Together, they enter something more intimate: a private exchange where vulnerability becomes form, and form becomes feeling.",
      "PRIVATE SPACE is an ode to ballet, but it is equally an ode to connection - to the quiet, often invisible relationship between two artists who meet, briefly, to create something that neither could alone. Each image is a love affair, not romantic, but reverent: a recognition of shared devotion to craft, to expression, to the pursuit of something just beyond reach.",
    ],
    layout: "grid",
    artworks: grid([
      "2026/05/etude-scaled.jpg",
      "2026/05/pacifique-scaled.jpg",
      "2026/05/releve-scaled.jpg",
      "2026/05/reverence-scaled.jpg",
      "2026/05/saute-scaled.jpg",
      "2026/05/staccato-scaled.jpg",
      "2026/05/tendu-scaled.jpg",
      "2026/05/Tenuto.jpg",
      "2026/05/arabesque-scaled.jpg",
      "2026/05/aspiration-scaled.jpg",
      "2026/05/Assemble-scaled.jpg",
      "2026/05/danse-de-rue-scaled.jpg",
      "2026/05/Echappe-scaled.jpg",
      "2026/05/En-Croix-scaled.jpg",
      "2026/05/En-lair-scaled.jpg",
      "2026/05/espace-prive-scaled.jpg",
      "2026/05/Grand-Allegro-scaled.jpg",
      "2026/05/Grand-Jete-scaled.jpg",
      "2026/05/jete-scaled.jpg",
      "2026/05/le-temps-secoule-scaled.jpg",
      "2026/05/legato-scaled.jpg",
    ]),
  },

  "shape-of-light": {
    slug: "shape-of-light",
    category: "contemporary",
    title: "Shape of Light",
    intro: [
      "Matthew Willman’s ‘Shape of Light’ exists in a space where observation becomes connection, and connection becomes meaning.",
      "This body of work resists confinement to a single genre. It moves fluidly between documentary, portraiture, landscape, and fine art. Each image is driven by a relentless curiosity about people and place. His photographs do not seek perfection; they seek expression.",
      "What emerges is a deeply human narrative.",
      "Willman’s practice is informed by proximity - not distance. He does not photograph subjects; he engages with people. This distinction is critical. It is why his images carry a sense of dignity, even in vulnerability, and why they feel less like documentation and more like shared experience.",
      "There is also an underlying duality present throughout the portfolio: movement and stillness, intimacy and vastness, fragility and strength. These tensions mirror the world itself - complex, unresolved, and deeply interconnected. His images are not loud, yet they resonate - precisely because they leave space for the viewer to enter.",
      "This series is a testament to a life spent in pursuit of creative connection, of understanding, and of the quiet, enduring power of visual storytelling.",
    ],
    layout: "grid",
    artworks: grid([
      "2026/04/Dylan-in-red.jpg",
      "2026/05/A-walk-in-the-sugar-cane.jpg",
      "2026/05/Night-swimming.jpg",
      "2026/05/On-air.jpg",
      "2026/05/Puppet-on-a-string.jpg",
      "2026/05/Return-to-DUrban.jpg",
      "2026/05/Stepping-out.jpg",
      "2026/05/The-old-chair.jpg",
      "2026/05/Waiting-for-Godot.jpg",
    ]),
  },

  black: {
    slug: "black",
    category: "contemporary",
    title: "Black",
    intro: [
      "Before form, before narrative, before even light - there is black.",
      "In Matthew Willman’s BLACK series, darkness is not treated as absence, but as origin. It is a space of possibility, of tension, of quiet insistence. This body of work strips photography back to its most elemental language. What emerges is something both intimate and profound.",
      "These images do not rely on spectacle or abundance. ‘Black’ becomes more than a shape or form; it becomes defining in its very being. It absorbs, reveals. It holds memory, reflects strength, beauty and history. It carries weight.",
      "A contour. A gesture. The faint suggestion of form emerging. These moments feel almost fragile, as though they might dissolve if held too tightly. Yet it is precisely this delicacy that gives the work its emotional force. There is vulnerability yet also a strength in what is revealed.",
      "Willman’s long-standing engagement with the human condition is present here too, though often in quieter, more abstract ways. There is a contemplative stillness that runs through the collection - a sense of pause in an otherwise restless visual world. This is where the work resonates most deeply.",
      "The images act as mirrors as much as they do windows. They do not dictate meaning; they invite it.",
    ],
    layout: "grid",
    artworks: grid([
      "2026/04/Atonement.jpg",
      "2026/04/Aurelia-1-scaled.jpg",
      "2026/04/Aurelia-2.jpg",
      "2026/04/Bantry-Bay.jpg",
      "2026/04/Black-Saint.jpg",
      "2026/04/Congo-gold.jpg",
      "2026/04/Matuba.jpg",
      "2026/04/Miss-Dollie.jpg",
      "2026/04/Petite.jpg",
      "2026/04/Phakamisa.jpg",
      "2026/04/Revolution.jpg",
      "2026/04/Ritts.jpg",
    ]),
  },
};

// Hub definitions (Legacy / Contemporary landing pages).
export const hubs = {
  legacy: {
    title: "Legacy",
    items: [
      {
        to: "/mandela",
        image: `${IMG}/2026/04/MANDELA-a-portrait-of-an-african-icon-scaled.jpg`,
        caption: "Mandela: Portrait of an African Icon",
      },
      {
        to: "/robben-island",
        image: `${IMG}/2026/04/ROBBEN-ISLAND-echoes-from-the-island-1-scaled.jpg`,
        caption: "Robben Island: ‘echoes from the Island’",
      },
      {
        to: "/tuisland",
        image: `${IMG}/2026/04/TUISLAND-n-stillewe-scaled.jpg`,
        caption: "Tuisland ’n Stillewe",
      },
      {
        to: "/african-child",
        image: `${IMG}/2026/04/dambuza-kids.jpg`,
        caption: "African Child",
      },
    ],
  },
  contemporary: {
    title: "Contemporary",
    items: [
      {
        to: "/i-am-san",
        image: `${IMG}/2026/04/HOMEPAGE-2a-e1776306732658-1024x701.jpg`,
        caption: "I am San",
      },
      {
        to: "/private-space",
        image: `${IMG}/2026/04/PRIVATE-SPACE-1024x683.jpg`,
        caption: "Private Space",
      },
      {
        to: "/shape-of-light",
        image: `${IMG}/2026/05/A-choir-of-one-1024x683.jpg`,
        caption: "Shape of Light",
      },
      {
        to: "/black",
        image: `${IMG}/2026/04/Black-Saint-1024x669.jpg`,
        caption: "Black",
      },
    ],
  },
};

export function getCollection(slug) {
  return collections[slug] || null;
}
