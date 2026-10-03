<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# G Tech Lights website — project rules

See `README.md` for the full plan, sitemap and deployment steps. Source material (brief, photos, logo) is in `../Information`.

## Content integrity (from the client brief — do not break)
- Say "Established in 2026" and, separately, "Built on 20+ years of lighting industry experience". Never imply the company itself is 20+ years old.
- Product codes and specs come only from the client brochure (`src/data/brochure-products.json`). Do not invent product names, specs, wattages, certifications, awards, partnerships, project names/locations, capacities or financials. Use the placeholders `"To be updated"` (projects) / `"To be added"` (products).
- Customer references are text only — no logos without written authorisation.
- Avoid unverified superlatives ("best", "No.1", "leading", "guaranteed", "world-class").
- Only real G Tech Lights photographs are used. Do not add stock images presented as company projects.

## Where things live
- Company details, phones, emails, WhatsApp number, nav → `src/config/site.ts`.
- All page content → `src/data/*.ts`. Pages and components render data; don't hard-code content in them.
- Photos → add to `scripts/build-assets.mjs`, run `npm run assets`, reference with `photo("<folder>/<slug>", alt)`. Never edit `src/data/image-manifest.json` by hand.

## Layout conventions
- Fit-to-screen (≥1280px): use `fitSection` / `fitSectionSubnav`, `fitBody`, `fitFill`, `fitCenter`, `fitGap`, `fitImage` from `src/lib/fit.ts`. The `short:` variant (≥1280px wide, ≤820px tall) tightens spacing on laptops.
- Brand tokens (`brand-*`, `ink-*`, `mist`) are defined in `src/app/globals.css`. Don't introduce new colours.
- Square edges, thin rules, restrained motion; respect `prefers-reduced-motion`.

## Before finishing a change
- `npx tsc --noEmit`, `npx eslint src`, `npm run build` must pass.
- Check layout at 390px (phone), 1024px (tablet), 1280×720 and 1920×1080 — no horizontal scroll, fit sections complete on screen.
