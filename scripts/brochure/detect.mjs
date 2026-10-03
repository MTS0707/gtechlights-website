// Find orange label bars (product code strips) on each product page.
const sharp = (await import('node:module')).createRequire('D:/Customers/G tech/website/package.json')('sharp');
import fs from 'node:fs';
const result = {};
for (let pg = 3; pg <= 24; pg++) {
  const f = `pdfpages/p${String(pg).padStart(2, '0')}.png`;
  const { data, info } = await sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const isOrange = (i) => { const r = data[i], g = data[i + 1], b = data[i + 2]; return r > 195 && r < 245 && g > 140 && g < 185 && b < 80; };
  // row scan: rows where many orange pixels
  const rowCount = new Array(H).fill(0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x += 2) if (isOrange((y * W + x) * 3)) rowCount[y]++;
  const bands = []; let start = -1;
  for (let y = 0; y < H; y++) { const on = rowCount[y] > 60; if (on && start < 0) start = y; if (!on && start >= 0) { if (y - start > 15) bands.push([start, y]); start = -1; } }
  // for each band, find horizontal runs
  const labels = [];
  for (const [y0, y1] of bands) {
    const col = new Array(W).fill(0);
    for (let y = y0; y < y1; y += 2) for (let x = 0; x < W; x++) if (isOrange((y * W + x) * 3)) col[x]++;
    let xs = -1, last = -1;
    for (let x = 0; x <= W; x++) {
      const on = x < W && col[x] > 2;
      if (on) { if (xs < 0) xs = x; last = x; }
      else if (xs >= 0 && x - last > 50) { if (last - xs > 200) labels.push({ x0: xs, x1: last, y0, y1 }); xs = -1; }
    }
  }
  result[pg] = { W, H, labels };
  console.log(pg, labels.length, labels.map(l => `${l.x0}-${l.x1}@${l.y0}-${l.y1}`).join(' '));
}
fs.writeFileSync('labels.json', JSON.stringify(result, null, 1));
