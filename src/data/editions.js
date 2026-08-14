// Single source of truth for the two HOMME book editions.
//
// These are the DISPLAY values. The AUTHORITATIVE charge amounts used by
// PayFast live server-side in public/pay/editions.php — if you change a price
// here, change it there too (the `slug` and ZAR amount must match).
//
// PayFast processes in ZAR only. `priceUSD` is shown purely as an approximate
// guide for international buyers, who are still charged the ZAR amount.

const BOX = "/wp-content/uploads/landing-images";

export const EDITIONS = [
  {
    slug: "collectors-slipcase",
    name: "Collector’s Slipcase Edition",
    tagline: "launch special",
    note: "Including original giclee signed print & certificate",
    limit: "Limited to 150 only",
    priceZAR: 3450,
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
    priceUSD: 280,
    image: `${BOX}/homme-box-2.jpg`,
  },
];

export const editionBySlug = (slug) => EDITIONS.find((e) => e.slug === slug);

// "3450" -> "R3 450" (space thousands separator, matching the site's copy).
export const formatZAR = (n) =>
  "R" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// "320" -> "US$ 320"
export const formatUSD = (n) => "US$ " + n;
