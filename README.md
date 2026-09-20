# SugarEcchi

Adult (18+) anime character art pack storefront. Browsing, search and catalog are
in-app; payments are always completed on Patreon.

- Patreon: https://www.patreon.com/c/SugarEcchi
- X: https://x.com/SugarEcchi

## Features

- Bilingual EN / 日本語 across every page (single record per product, both languages).
- Age gate, home page rails, shop with filters, sort and pagination.
- Anime, character, collection and tag listing + detail pages.
- Product page with gallery, specs, related packs and a mobile sticky buy bar.
- Typo-tolerant fuzzy search over packs, characters and anime.
- Wishlist stored on the device.
- Admin area at `/admin` (demo password: `sugar`) with pack CRUD, duplicate,
  inline character/tag creation, Zod validation and a publish checklist.

## Data

Catalog data is seeded from `src/data/seed.ts` and stored in the browser
(localStorage). Use "Reset demo data" in the admin area to restore the seed.

## Development

```bash
bun install
bun run dev
```
