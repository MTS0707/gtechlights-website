# Brochure → product catalogue

The product catalogue on `/products` is generated from `Information/G_TECH_LIGHTS_Brochure.pdf`.
The brochure pages are flat images (no text layer), so specs were **transcribed by reading each page** into
`transcriptions/*.txt` (one line per product: `card-id|code|Label: value|…`).

Generated output (committed):
- `src/data/brochure-products.json` — code, category, specs, image info for all 198 products
- `public/images/products/<slug>.webp` — 800×800 cut-out photos

## Editing a product
Edit `src/data/brochure-products.json` directly (fix a spec, change a category). No rebuild needed.

## Regenerating from a new brochure
Requires Google Chrome plus temporary tools: `npm i --no-save puppeteer-core pdfjs-dist@4`.
Copy `node_modules/pdfjs-dist/build/pdf.min.mjs` and `pdf.worker.min.mjs` and the PDF (as `brochure.pdf`) next to these scripts, then run in this folder:

1. `node chromerender.mjs 3` → `pdfpages/` (and a 4× copy into `pdf4/` with the 4× variant)
2. `node detect.mjs` → `labels.json` (finds the orange product-code strips)
3. `node crops.mjs` → per-card photo + spec crops (for reading the specs)
4. Update `transcriptions/*.txt`
5. `node prodimg.mjs` → trimmed, centred photos
6. `node builddata.mjs` → writes the JSON and WebP files (category mapping is at the top of this file)

Paths inside the scripts point at the original working folders; adjust them before re-running.
