// Crop each product card into photo + spec text, using labels.json (detected at 3x) scaled to 4x.
const sharp = (await import('node:module')).createRequire('D:/Customers/G tech/website/package.json')('sharp');
import fs from 'node:fs';
fs.mkdirSync('cards', { recursive: true });
const labels = JSON.parse(fs.readFileSync('labels.json', 'utf8'));
const k = 4 / 3; const index = [];
for (const [pg, { labels: ls }] of Object.entries(labels)) {
  const src = `pdf4/p${String(pg).padStart(2, '0')}.png`;
  const meta = await sharp(src).metadata();
  const cards = ls.filter(l => l.y1 - l.y0 > 50).sort((a, b) => (a.y0 - b.y0) || (a.x0 - b.x0));
  for (const [i, l] of cards.entries()) {
    const x0 = Math.round(l.x0 * k), x1 = Math.round(l.x1 * k), y0 = Math.round(l.y0 * k), y1 = Math.round(l.y1 * k);
    const id = `p${pg}-${i + 1}`;
    const clamp = (r) => ({ left: Math.max(0, r.left), top: Math.max(0, r.top), width: Math.min(r.width, meta.width - Math.max(0, r.left)), height: Math.min(r.height, meta.height - Math.max(0, r.top)) });
    await sharp(src).extract(clamp({ left: x0 - 20, top: y0 - 560, width: x1 - x0 + 40, height: 552 })).toFile(`cards/${id}-img.png`);
    await sharp(src).extract(clamp({ left: x0 - 10, top: y0, width: x1 - x0 + 20, height: 400 })).toFile(`cards/${id}-txt.png`);
    index.push(id);
  }
}
fs.writeFileSync('cards/index.json', JSON.stringify(index));
console.log(index.length, 'cards');
