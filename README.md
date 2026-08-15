# The Willman Collection Portal - React

A React conversion of the Matthew Willman / **The Willman Collection** website
(originally a WordPress + Flatsome site exported to static HTML with the Simply
Static plugin). The design, content and imagery follow the original as closely
as possible.

It also incorporates the **Digital Collection** (formerly the separate
`digital.matthewwillman.co.za` subdomain) as an internal section under
`/digital`, so the subdomain can be retired - the portal's *Contemporary*,
*Books* and *Contact* links, and the *MW Collection Digital* tile, now point to
internal routes.

Built with **Vite + React + React Router** and plain CSS (no UI framework).

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Project structure

```
public/
  wp-content/uploads/...   all site imagery (preserves the original WP paths)
  favicon.png
  .htaccess                Apache SPA routing + asset caching (xneelo)
  pay/                     PHP PayFast payment backend (see Deploying)
src/
  main.jsx                 app entry; sets up BrowserRouter
  App.jsx                  route table
  index.css                global styles / design system
  data/
    collections.js         all collection text, artwork lists & pricing
    nav.js                 portal navigation + external links
  components/
    TopNav.jsx             the single, site-wide top navigation bar
    Footer.jsx             "Developed by BVWD" footer
    Layout.jsx             nav + content + footer shell
    Gallery.jsx            image-grid gallery with lightbox
    CollectionGallery.jsx  horizontal-scroll gallery strip (Digital + Analogue)
    EssayGrid.jsx          grid of collection tiles (Digital + Analogue)
    Lightbox.jsx           full-screen image viewer (keyboard + arrows)
    VisualProcess.jsx      shared "visual process" note
    ScrollToTop.jsx        scroll reset on route change
    BackToTop.jsx          floating back-to-top button
  pages/
    HomePortal.jsx         "/" landing portal
    Artist.jsx             "/artist"
    Exhibition.jsx         "/exhibition"
    Hub.jsx                "/legacy" and "/contemporary" (collection hubs)
    Collection.jsx         the 8 collection detail pages (data-driven)
    Contact.jsx            "/contact"
    NotFound.jsx           404
  digital/                 Digital Collection section (under /digital)
    DigitalLayout.jsx      shares the site-wide TopNav + Footer; wraps the
                           content in .digital for its own (Josefin Sans) theme
    digital.css            styles scoped to the digital section
    data/
      essays.json          all 16 photo-essay galleries (title, intro, images)
      home.js              the Photo Essays home grid
      books.js             Books page content
      about.js             About / Biography content
    pages/ (DigitalHome, PhotoEssay, About, Books, DigitalContact)
      DigitalHome.jsx      "/digital" - Photo Essays grid
      PhotoEssay.jsx       "/digital/:slug" - gallery + lightbox
      About.jsx            "/digital/about"
      Books.jsx            "/digital/books"
      DigitalContact.jsx   "/digital/contact"
  analogue/                Analogue Collection section (under /analogue)
    AnalogueLayout.jsx     shares the site-wide TopNav + Footer; wraps content
                           in .analogue (same theme as the digital section)
    data/
      collections.json     all 14 collection galleries (title, intro, images)
      home.js              the collections home grid
      content.js           About Collections / Artist Statement text
    pages/ (AnalogueHome, AnalogueCollection, AboutCollections, ArtistStatement)
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home Portal |
| `/artist` | Artist biography |
| `/exhibition` | Exhibitions list |
| `/legacy` | Legacy hub → Mandela, Robben Island, Tuisland, African Child |
| `/contemporary` | Contemporary hub → I am San, Private Space, Shape of Light, Black |
| `/mandela`, `/robben-island`, `/tuisland`, `/african-child` | Legacy collections |
| `/i-am-san`, `/private-space`, `/shape-of-light`, `/black` | Contemporary collections |
| `/contact` | Contact |
| `/digital` | Digital Collection - Photo Essays grid |
| `/digital/:slug` | A photo essay (16 galleries, e.g. `/digital/our-mandela`, `/digital/black`) |
| `/digital/about` · `/digital/books` · `/digital/contact` | Digital Collection pages |
| `/analogue` | Analogue Collection - collections grid (the portal's **Legacy** link) |
| `/analogue/:slug` | A collection gallery (14, e.g. `/analogue/tuisland`, `/analogue/great-zimbabwe-ruins`) |
| `/analogue/about-collections` · `/analogue/artist-statement` | Analogue Collection pages |

## Notes on the conversion

- **One cohesive site, one navigation bar.** Every page shares a single
  site-wide top nav (`TopNav`). Both former subdomains are now merged in as
  internal sections, so *every* portal menu item is internal: *Legacy* →
  `/analogue`, *Contemporary* → `/digital`, *Books* → `/digital/books`,
  *Contact* → `/digital/contact`, *Artist* → `/artist`, *Exhibition* →
  `/exhibition`. The two home tiles and the book promo also link internally
  (`/analogue`, `/digital`, `/analogue/tuisland`). The only external link left
  is the "Developed by BVWD" footer credit.
- **Internal collection pages** (Legacy/Contemporary hubs and the eight
  detail pages) are fully built and reachable by direct URL and via the hub
  pages, mirroring the original WordPress content.
- **Imagery.** The static export referenced many gallery images from the
  staging server rather than bundling them. All 119 referenced images have been
  collected into `public/wp-content/uploads/` so the site is fully
  self-contained. (You can later optimise/resize these for performance.)
- **Contact page.** The original was an unfinished template with placeholder
  details; this version keeps the real address `matthew@matthewwillman.co.za`
  and a working mail-to contact form.

### Digital Collection (`/digital`)

- The former `digital.matthewwillman.co.za` site is now fully merged into the
  main site: every page (portal pages and digital pages) shares one site-wide
  top navigation bar (`TopNav`) and footer, so it reads as a single cohesive
  site rather than two. The portal's *Contemporary*, *Books* and *Contact* menu
  items simply open the corresponding `/digital` pages with the same nav still
  in place.
- Only the digital **content** keeps the original lighter Josefin Sans theme
  (scoped under `.digital`); the shared nav/footer match the rest of the site.
- It is namespaced under `/digital/*` to avoid slug collisions with the portal
  (both have `black`, `private-space`, `contact`, etc.).
- The digital **About** page is retained (`/digital/about`) but intentionally
  left out of the navigation for now.
- All 16 photo-essay galleries are included. The two galleries that were not on
  the live home grid (*Inanda Heritage*, *The Robben Island Story*) are complete
  and have been appended to the grid so they're reachable.
- Unlinked draft/test pages in the export (`courses`, `books-new`,
  `silver-gelatin-photography`, `photo-essay-test`, `project_list`) were skipped.
- Its ~670 images were copied into `public/wp-content/uploads/`. The *Books*
  page's "Tuisland" link now points to the internal `/analogue/tuisland`
  collection.

### Analogue Collection (`/analogue`)

- The former `analogue.matthewwillman.co.za` site is merged in the same way as
  the digital one - it shares the site-wide nav/footer, and the portal's
  **Legacy** menu item (and the *MW Collection Analogue* tile) now open
  `/analogue` with the nav still in place.
- It reuses the shared `CollectionGallery` / `EssayGrid` components and the same
  Josefin Sans content theme (`.analogue`). All 14 collection galleries are
  included; *The Savé Collection* (in the menu but not on the live home grid)
  is appended so it's reachable. Each grid tile uses its collection's real page
  title.
- The 150+ individual artwork pages from the export were **not** converted -
  they are blog-style detail pages (date / author / prev-next) with no unique
  content; each artwork already appears in its collection's gallery + lightbox.
  Archive/pagination pages (`/page/N`, `/author`, `/category`) were skipped too.
- *About Collections* and *Artist Statement* are reachable via a secondary link
  row on the `/analogue` landing page (they have no slot in the global nav).
- Its ~410 images live under `public/analogue-img/` (a separate base) so their
  generic filenames (`1.jpg`, `6.jpg`, …) don't collide with the other sites'
  assets.

> **Both subdomains can now be retired** - nothing in the app links out to
> `digital.` or `analogue.matthewwillman.co.za` anymore.

## Deploying

⚠️ **This site includes a PHP payment backend** (PayFast) under `public/pay/`, so the live
site **must be hosted on a PHP/Apache host** - the target is **xneelo**. Static hosts such as
**Vercel and Netlify cannot execute the PHP**: they would serve `pay/*.php` as raw source,
which breaks checkout and would expose `config.php`. They are therefore **not supported** for
the live site (this is why the old `vercel.json` / `_redirects` static-host configs were
removed).

**Deploy steps (Apache / xneelo):**

1. `npm run build` - produces `dist/`, which already contains the SPA **and** the payment
   backend: `dist/pay/*.php`, the SPA-routing `dist/.htaccess`, and `dist/pay/orders/.htaccess`
   (which denies HTTP access to stored order records). Vite copies the whole `public/` tree
   verbatim, dotfiles included - verified.
2. Upload the **contents of `dist/`** to the web root (e.g. `public_html/`).
3. Create `pay/config.php` on the server from `pay/config.sample.php` and fill in the real
   PayFast credentials (`merchant_id`, `merchant_key`, `passphrase`), the canonical `site_url`,
   and `merchant_email`. `config.php` is git-ignored and must **never** be committed. Start with
   `sandbox => true`, test, then flip to `false` for live.

The bundled `.htaccess` serves real files/directories as-is (so `/pay/*.php` execute) and falls
back to `index.html` for client-side routes. Setup details and the four ITN security checks are
documented in the header comments of the files under `public/pay/`.

### Maintenance - purging abandoned pre-orders

Submitting the checkout form writes a `pending` order record; if the buyer never pays, that
record (with their contact + delivery details) lingers. `public/pay/purge.php` deletes
`pending` records older than `purge_pending_days` (default **30**) - **paid orders are never
touched**. Schedule it daily via cron on xneelo:

```bash
# CLI (preferred)
php /home/<account>/public_html/pay/purge.php

# or URL-based cron - requires 'purge_token' in config.php
wget -qO- "https://<your-site>/pay/purge.php?token=YOUR_TOKEN"
```

Preview first with `php purge.php --dry-run` (or `&dry=1` on the URL). As a fallback, checkout
itself runs the same purge at most once a day, so the folder stays tidy even without cron.
