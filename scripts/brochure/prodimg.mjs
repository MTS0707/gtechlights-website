const sharp = (await import('node:module')).createRequire('D:/Customers/G tech/website/package.json')('sharp');
import fs from 'node:fs';
const labels = JSON.parse(fs.readFileSync('labels.json', 'utf8'));
const k = 4 / 3; const report = [];
for (const [pg, { labels: ls }] of Object.entries(labels)) {
  const src = `pdf4/p${String(pg).padStart(2, '0')}.png`;
  const cards = ls.filter(l => l.y1 - l.y0 > 50).sort((a, b) => (a.y0 - b.y0) || (a.x0 - b.x0));
  for (const [i, l] of cards.entries()) {
    const id = `p${pg}-${i + 1}`;
    const x0 = Math.round(l.x0 * k), x1 = Math.round(l.x1 * k), y0 = Math.round(l.y0 * k);
    // photo area: inside the card, above the orange label
    const region = { left: x0 + 6, top: y0 - 420, width: x1 - x0 - 12, height: 410 };
    let img = sharp(src).extract(region).flatten({ background: '#ffffff' });
    const buf = await img.png().toBuffer();
    // bounding box of real content: ignore a margin (card edges/shadow) and near-white pixels
    const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const M = 14; let minX = 1e9, minY = 1e9, maxX = -1, maxY = -1;
    for (let y = M; y < info.height - M; y++) for (let x = M; x < info.width - M; x++) {
      const i = (y * info.width + x) * 3; if (Math.min(data[i], data[i + 1], data[i + 2]) < 232) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    }
    if (maxX < 0) { minX = 0; minY = 0; maxX = info.width - 1; maxY = info.height - 1; }
    const pad = 4; const bx = Math.max(0, minX - pad), by = Math.max(0, minY - pad);
    const bw = Math.min(info.width - bx, maxX - minX + 1 + 2 * pad), bh = Math.min(info.height - by, maxY - minY + 1 + 2 * pad);
    const trimmed = { data: await sharp(buf).extract({ left: bx, top: by, width: bw, height: bh }).png().toBuffer(), info: { width: bw, height: bh } };
    const { width: w, height: h } = trimmed.info;
    // square canvas with breathing room so every card aligns
    const side = Math.round(Math.max(w, h) * 1.12);
    // composite first, resize in a second pipeline (sharp resizes before compositing otherwise)
    const squared = await sharp({ create: { width: side, height: side, channels: 3, background: '#ffffff' } })
      .composite([{ input: trimmed.data, left: Math.round((side - w) / 2), top: Math.round((side - h) / 2) }])
      .png().toBuffer();
    await sharp(squared).resize(800, 800).png().toFile(`prodimg/${id}.png`);
    report.push(`${id}:${w}x${h}`);
  }
}
console.log(report.length, 'images; smallest:', report.sort((a, b) => parseInt(a.split(':')[1]) - parseInt(b.split(':')[1])).slice(0, 5).join(' '));
