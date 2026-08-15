// Single source of truth for the two HOMME book editions.
//
// These are the DISPLAY values. The AUTHORITATIVE charge amounts used by
// PayFast live server-side in public/pay/editions.php - if you change a price
// here, change it there too (the `slug` and amounts must match).
//
// PayFast processes in ZAR only, so international buyers are charged a fixed
// ZAR amount (`priceIntlZAR`) - their bank converts it to roughly the USD shown.
//   priceZAR      = charged to South African buyers
//   priceIntlZAR  = charged to international buyers (the ZAR value of the intl price)
//   priceUSD      = the indicative US$ figure shown to international buyers
//
// >>> priceIntlZAR is the exact ZAR you want to receive from an international
//     sale (currently R5 200 ≈ US$320, R4 600 ≈ US$280). Rates move; you keep
//     the ZAR. Mirror any change in public/pay/editions.php (amount_intl).

const BOX = "/wp-content/uploads/landing-images";

export const EDITIONS = [
  {
    slug: "collectors-slipcase",
    name: "Collector’s Slipcase Edition",
    tagline: "launch special",
    note: "Including original giclee signed print & certificate",
    limit: "Limited to 150 only",
    priceZAR: 3450,
    priceIntlZAR: 5200,
    priceUSD: 320,
    image: `${BOX}/homme-box-1.jpg`,
  },
  {
    slug: "signed-first",
    name: "Signed First Edition",
    tagline: "",
    note: "",
    limit: "Limited to 600 only",
    priceZAR: 2850,
    priceIntlZAR: 4600,
    priceUSD: 280,
    image: `${BOX}/homme-box-2.jpg`,
  },
];

export const editionBySlug = (slug) => EDITIONS.find((e) => e.slug === slug);

// The ZAR amount actually charged, given the delivery region ("sa" | "intl").
export const priceForRegion = (edition, region) =>
  region === "intl" ? edition.priceIntlZAR : edition.priceZAR;

// "3450" -> "R3 450" (space thousands separator, matching the site's copy).
export const formatZAR = (n) =>
  "R" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// "320" -> "US$ 320"
export const formatUSD = (n) => "US$ " + n;
