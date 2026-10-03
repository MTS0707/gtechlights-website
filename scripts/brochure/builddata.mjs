// Builds src/data/brochure-products.json + public/images/products/*.webp from the transcriptions and cut-out photos.
const sharp = (await import('node:module')).createRequire('D:/Customers/G tech/website/package.json')('sharp');
import fs from 'node:fs';
const OUT_IMG = 'D:/Customers/G tech/website/public/images/products';
const OUT_JSON = 'D:/Customers/G tech/website/src/data/brochure-products.json';
fs.mkdirSync(OUT_IMG, { recursive: true });

const range = (pg, a, b) => Array.from({ length: b - a + 1 }, (_, i) => `p${pg}-${a + i}`);
const cat = {};
const put = (c, ids) => ids.forEach((id) => (cat[id] = c));
put('linear', [...range(3, 1, 9), 'p5-9']);
put('architectural', [...range(4, 1, 9), ...range(5, 1, 8)]);
put('cylinder', [...range(6, 1, 9), ...range(7, 1, 3)]);
put('contemporary', [...range(7, 4, 9), 'p10-5', 'p10-6', 'p11-9', ...range(13, 3, 9), ...range(14, 1, 9), ...range(15, 1, 9), ...range(16, 4, 9), ...range(17, 5, 9), ...range(18, 1, 9), ...range(24, 2, 3)]);
put('wood-accent', [...range(8, 1, 9), ...range(9, 1, 9), ...range(10, 1, 4), ...range(10, 7, 9), ...range(11, 1, 8)]);
put('industrial', [...range(12, 1, 9), 'p13-1', 'p13-2', ...range(16, 1, 3), ...range(17, 1, 4), ...range(20, 1, 3)]);
put('textured', range(19, 1, 9));
put('cage', [...range(20, 4, 9), ...range(21, 1, 9), ...range(22, 1, 9), ...range(23, 1, 3)]);
put('glass', range(23, 4, 9));
put('multi-acoustic', range(24, 4, 9));
put('contemporary', ['p24-1']);

const NO_PHOTO = new Set(['p24-1']); // card is blank in the brochure
const rows = fs.readdirSync('tx').sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)))
  .flatMap((f) => fs.readFileSync('tx/' + f, 'utf8').trim().split('\n')).map((l) => l.trim().split('|'));
const seen = {}; const products = [];
for (const [id, code, ...specs] of rows) {
  if (!cat[id]) throw new Error('no category for ' + id);
  let slug = code.toLowerCase().replace(/\s+/g, '-');
  seen[slug] = (seen[slug] || 0) + 1; if (seen[slug] > 1) slug += `-${seen[slug]}`;
  let image = null;
  if (!NO_PHOTO.has(id)) {
    const file = `${OUT_IMG}/${slug}.webp`;
    const info = await sharp(`prodimg/${id}.png`).resize(800, 800).webp({ quality: 80 }).toFile(file);
    const blur = await sharp(`prodimg/${id}.png`).resize(10, 10).webp({ quality: 40 }).toBuffer();
    image = { src: `/images/products/${slug}.webp`, width: info.width, height: info.height, blurDataURL: `data:image/webp;base64,${blur.toString('base64')}` };
  }
  products.push({
    slug, code, category: cat[id], brochurePage: Number(id.slice(1).split('-')[0]),
    specs: specs.map((s) => { const i = s.indexOf(':'); const label = s.slice(0, i).trim(); return { label: label === 'Cct' ? 'CCT' : label, value: s.slice(i + 1).trim() }; }),
    image,
  });
}
fs.writeFileSync(OUT_JSON, JSON.stringify(products, null, 1));
const counts = products.reduce((m, p) => ((m[p.category] = (m[p.category] || 0) + 1), m), {});
console.log(products.length, 'products', counts, 'duplicates renamed:', products.filter((p) => /-\d$/.test(p.slug) && seen[p.slug.replace(/-\d$/, '')] > 1).map((p) => p.slug).join(', '));
