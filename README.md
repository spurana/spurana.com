# spurana.com

Static site (Astro) on Cloudflare Workers with private R2 media (`spurana-com-assets`).

## Development

```bash
pnpm install
pnpm dev          # http://localhost:4321 — /api/images/* from downloads/ when present
pnpm build
pnpm preview
```

## Deploy

```bash
pnpm build
pnpm deploy:production
```

Attach `spurana.com` to the `spurana-com-prod` worker in Cloudflare.

## Assets

Site media lives in R2 under:

- `assets/site/` — homepage & shared (e.g. `logo.png`, `spurana-portrait.jpg`)
- `assets/articles/<slug>/` — per-article images

Public URLs: `/api/images/assets/site/…` and `/api/images/assets/articles/<slug>/…`

To add or replace a file in R2:

```bash
pnpm wrangler r2 object put spurana-com-assets/assets/site/example.png \
  --file=./path/to/example.png --remote
```

For local dev, mirror the same path under `downloads/` (gitignored).

Legacy WordPress `/wp-content/uploads/…` URLs still resolve via `src/lib/asset-keys.ts`.

## Redirects

Old `/YYYY/MM/DD/post-slug/` → `/articles/post-slug/`. Old booking URLs → `/`.
