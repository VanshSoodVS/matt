// Portal navigation.
// The Digital Collection is now an internal section (/digital), so the menu
// items that used to point at digital.matthewwillman.co.za link internally.
// The Legacy / analogue subdomain remains external for now.

export const LOGO = "/wp-content/uploads/2025/04/Screenshot-2025-04-27-123434.png";

export const portalNav = [
  { label: "Artist", to: "/artist", external: false },
  { label: "Legacy", to: "/analogue", external: false },
  { label: "Contemporary", to: "/digital", external: false },
  { label: "Homme", to: "/homme", external: false },
  { label: "Exhibition", to: "/exhibition", external: false },
  { label: "Books", to: "/digital/books", external: false },
  { label: "Contact", to: "/digital/contact", external: false },
];

export const portalLinks = {
  book: "/analogue/tuisland", // internal Tuisland collection
  digital: "/digital", // internal Digital Collection
  analogue: "/analogue", // internal Analogue Collection
};
