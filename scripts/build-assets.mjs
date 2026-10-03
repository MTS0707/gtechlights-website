// Asset pipeline: converts the client-supplied photos in ../Information into
// optimised WebP files under public/images and writes src/data/image-manifest.json.
// Re-run with `npm run assets` after adding or replacing photos.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('../Information');
const OUT = path.resolve('public/images');
const MAX_W = 1800;

// keep: fraction of image height to keep from the top (used to crop out
// third-party signage, TV screens, watermarks or faces at the bottom edge).
const photos = [
  // Project / installation photos
  ['projects', 'backlit-dot-ceiling-auditorium', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.16 PM.jpeg'],
  ['projects', 'triple-ring-pendant-lounge', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.17 PM.jpeg', { keep: 0.8 }],
  ['projects', 'infinity-loop-profile-pendant', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.20 PM.jpeg', { keep: 0.86 }],
  ['projects', 'salon-rounded-profile-pendants', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.26 PM (1).jpeg'],
  ['projects', 'workspace-drum-pendants', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.26 PM.jpeg'],
  ['projects', 'salon-interlocking-profiles', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.27 PM.jpeg', { keep: 0.62 }],
  ['projects', 'reception-linear-profile-grid', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.28 PM.jpeg'],
  ['projects', 'collaboration-cove-lighting', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.29 PM.jpeg', { keep: 0.86 }],
  ['projects', 'backlit-stretch-ceiling-reception', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.30 PM.jpeg', { keep: 0.48 }],
  ['projects', 'cafeteria-cone-pendants', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.32 PM.jpeg', { keep: 0.9 }],
  ['projects', 'cafeteria-linear-and-round-panels', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.35 PM.jpeg'],
  ['projects', 'halo-ring-backlit-oval', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.36 PM.jpeg'],
  ['projects', 'pantry-globes-and-vertical-linear', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.42 PM.jpeg'],
  ['projects', 'library-wave-profile', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.56 PM.jpeg'],
  ['projects', 'oblong-profile-pendant', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.04.57 PM.jpeg'],
  ['projects', 'hexagon-linear-ceiling', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.05.00 PM.jpeg', { keep: 0.85 }],
  ['projects', 'layered-loop-profiles', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.05.01 PM.jpeg'],
  ['projects', 'square-profile-pendant', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.05.10 PM (1).jpeg'],
  ['projects', 'fitness-studio-linear-and-rings', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.05.10 PM.jpeg'],
  ['projects', 'restaurant-lantern-pendants', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.09.24 PM.jpeg'],
  ['projects', 'hexagon-frame-pendants', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.09.29 PM.jpeg'],
  ['projects', 'rounded-triangle-profile', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.09.30 PM (1).jpeg'],
  ['projects', 'gym-hexagon-grid-ceiling', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.09.30 PM.jpeg'],
  ['projects', 'large-ring-pendants', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.09.32 PM.jpeg'],
  ['projects', 'globe-pendant-gold-shade', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.11.42 PM.jpeg', { keep: 0.76 }],
  ['projects', 'pleated-fabric-pendant', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.14.00 PM (1).jpeg'],
  ['projects', 'cylinder-pendants', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.14.00 PM (2).jpeg'],
  ['projects', 'origami-pendant', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.14.00 PM (3).jpeg'],
  ['projects', 'stitched-fabric-pendant', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.14.01 PM (1).jpeg'],
  ['projects', 'drum-pendant-timber-frame', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.14.01 PM.jpeg'],
  // Leadership portraits
  ['team', 'gangadhara-h-c', 'Photo of Director_Gangadhar H C.png'],
  ['team', 'chethan', 'Photo of Director_Chethan.png'],
  // Facility / production photos
  ['facility', 'fabricated-ring-and-linear-frames', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.09.32 PM (1).jpeg'],
  ['facility', 'hexagon-luminaires-production', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.13.59 PM.jpeg'],
  ['facility', 'hexagon-luminaires-assembly', 'Product and customer site photos/WhatsApp Image 2026-08-27 at 7.14.00 PM.jpeg'],
  ['facility', 'facility-exterior', 'Shop Floor and facility photos/IMG20260827181930.jpg'],
  ['facility', 'workshop-floor', 'Shop Floor and facility photos/IMG20260827182152.jpg'],
  ['facility', 'facility-office', 'Shop Floor and facility photos/IMG20260831185117.jpg'],
  ['facility', 'assembling-area', 'Shop Floor and facility photos/IMG20260831185140.jpg'],
  ['facility', 'testing-area', 'Shop Floor and facility photos/IMG20260831185150.jpg'],
  // Shop floor, 2 Oct 2026
  ['facility', 'linear-profiles-production', 'Shop Floor and facility photos/WhatsApp Image 2026-10-02 at 08.24.05 (1).jpeg'],
  ['facility', 'linear-luminaires-assembled', 'Shop Floor and facility photos/WhatsApp Image 2026-10-02 at 08.24.05.jpeg'],
  ['facility', 'linear-assembly-bench', 'Shop Floor and facility photos/WhatsApp Image 2026-10-02 at 08.24.06.jpeg'],
  ['facility', 'ring-luminaires-batch', 'Shop Floor and facility photos/WhatsApp Image 2026-10-02 at 08.24.07.jpeg'],
  ['facility', 'workshop-sample-racks', 'Shop Floor and facility photos/WhatsApp Image 2026-10-02 at 08.24.08.jpeg'],
  // Channel partner logo (supplied by G Tech Lights)
  ['partners', 'orbilit-technology', 'GTech is channel partner for above company/orbilit-logo-horizontal-for-dark-bg.png', { png: true }],
];

// ---------- Logo (vector recreation of the supplied logo) ----------
function letter(ch, x, y, w, h, s) {
  const i = s / 2, L = x + i, R = x + w - i, T = y + i, B = y + h - i, mid = y + h / 2;
  const r = (B - T) / 2, r2 = (B - T) / 4;
  switch (ch) {
    case 'G': return `M${R},${T}H${L + r}A${r},${r} 0 0 0 ${L + r},${B}H${R}V${mid}H${x + w * 0.55}`;
    case 'C': return `M${x + w},${T}H${L + r}A${r},${r} 0 0 0 ${L + r},${B}H${x + w}`;
    case 'T': return `M${x},${T}H${x + w}M${x + w / 2},${T}V${y + h}`;
    case 'E': return `M${x},${T}H${x + w}M${x},${mid}H${x + w}M${x},${B}H${x + w}`;
    case 'H': return `M${L},${y}V${y + h}M${R},${y}V${y + h}M${L},${mid}H${R}`;
    case 'L': return `M${L},${y}V${B}H${x + w}`;
    case 'I': return `M${x + w / 2},${y}V${y + h}`;
    case 'S': return `M${x + w},${T}H${L + r2}A${r2},${r2} 0 0 0 ${L + r2},${mid}H${R - r2}A${r2},${r2} 0 0 1 ${R - r2},${B}H${x}`;
  }
}

function logoSvg({ blue, dark, line, mark }) {
  const top = ['G', 'T', 'E', 'C', 'H'].map((c, k) => ({ c, x: 365 + k * 145 }));
  const bottom = ['L', 'I', 'G', 'H', 'T', 'S'].map((c, k) => ({ c, x: 365 + k * 125 }));
  const topPaths = top
    .map(({ c, x }) => `<path d="${letter(c, x, 95, 72, 70, 12)}" stroke="${c === 'E' ? dark : blue}"/>`)
    .join('');
  const bottomPaths = bottom.map(({ c, x }) => `<path d="${letter(c, x, 197, 30, 40, 8)}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 320" role="img" aria-label="G Tech Lights">
<title>G Tech Lights</title>
${markPaths(mark ?? blue, dark)}
<path d="M305 30V300" stroke="${line ?? blue}" stroke-width="5"/>
<g fill="none" stroke-width="12">${topPaths}</g>
<g fill="none" stroke="${dark}" stroke-width="8">${bottomPaths}</g>
</svg>`;
}

function markPaths(blue, dark) {
  // "G" monogram: blue arc from upper right, round the left, to the bottom;
  // charcoal lower-right quadrant under a blue crossbar.
  const cx = 136, cy = 160, r = 106, sw = 40;
  const pt = (deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)].map((v) => v.toFixed(1));
  const [ax, ay] = pt(-48), [bx, by] = pt(80), [dx, dy] = pt(12);
  return `<g fill="none" stroke-width="${sw}">
<path d="M${ax},${ay}A${r},${r} 0 1 0 ${bx},${by}" stroke="${blue}"/>
<path d="M${bx},${by}A${r},${r} 0 0 0 ${dx},${dy}" stroke="${dark}"/>
</g>
<rect x="142" y="146" width="120" height="30" fill="${blue}"/>`;
}

function markSvg(blue, dark, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">${bg ? `<rect width="320" height="320" rx="64" fill="${bg}"/>` : ''}<g transform="translate(28 0)">${markPaths(blue, dark)}</g></svg>`;
}

async function main() {
  await fs.mkdir(path.join(OUT, 'logo'), { recursive: true });
  const BLUE = '#1D4ABB', DARK = '#232323';
  await fs.writeFile(path.join(OUT, 'logo/g-tech-lights-logo.svg'), logoSvg({ blue: BLUE, dark: DARK }));
  await fs.writeFile(path.join(OUT, 'logo/g-tech-lights-logo-inverse.svg'), logoSvg({ blue: '#FFFFFF', dark: '#C9D3EA', line: '#5B86F0', mark: '#5B86F0' }));
  await fs.writeFile(path.join(OUT, 'logo/g-tech-lights-mark.svg'), markSvg(BLUE, DARK));
  await fs.copyFile(path.join(SRC, 'Company Logo.PNG'), path.join(OUT, 'logo/original-logo.png'));
  // App icons (favicon / apple icon) generated from the mark
  await sharp(Buffer.from(markSvg(BLUE, '#FFFFFF', '#0B1020'))).resize(512, 512).png().toFile('src/app/icon.png');
  await sharp(Buffer.from(markSvg(BLUE, '#FFFFFF', '#0B1020'))).resize(180, 180).png().toFile('src/app/apple-icon.png');

  const manifest = {};
  for (const [folder, slug, file, opts = {}] of photos) {
    const dir = path.join(OUT, folder);
    await fs.mkdir(dir, { recursive: true });
    let img = sharp(path.join(SRC, file)).rotate();
    const meta = await sharp(path.join(SRC, file)).rotate().toBuffer({ resolveWithObject: true }).then((r) => r.info);
    // logos: trim the transparent margin (alpha is kept in the WebP)
    if (opts.png) img = sharp(await img.trim().toBuffer());
    if (opts.keep) img = sharp(await img.extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * opts.keep) }).toBuffer());
    const out = path.join(dir, `${slug}.webp`);
    const info = await img.resize({ width: MAX_W, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    const blur = await sharp(out).resize(12).webp({ quality: 40 }).toBuffer();
    manifest[`${folder}/${slug}`] = {
      src: `/images/${folder}/${slug}.webp`,
      width: info.width,
      height: info.height,
      blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
    };
    console.log(folder, slug, info.width, 'x', info.height, Math.round(info.size / 1024) + 'KB');
  }
  // Open Graph image: hero photo with brand overlay
  const og = await sharp(path.join(OUT, 'projects/hexagon-frame-pendants.webp')).resize(1200, 630, { fit: 'cover' }).modulate({ brightness: 0.55 }).toBuffer();
  const ogLogo = await sharp(Buffer.from(logoSvg({ blue: '#FFFFFF', dark: '#C9D3EA', line: '#5B86F0', mark: '#5B86F0' }))).resize(560).png().toBuffer();
  await sharp(og).composite([{ input: ogLogo, left: 60, top: 60 }, {
    input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><text x="64" y="520" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#fff">Customized Architectural &amp; Designer Lighting</text><text x="64" y="570" font-family="Arial, sans-serif" font-size="26" fill="#C9D3EA">Bengaluru · gtechlights.com</text></svg>`), left: 0, top: 0,
  }]).jpeg({ quality: 82 }).toFile('public/og-image.jpg');

  await fs.mkdir('src/data', { recursive: true });
  await fs.writeFile('src/data/image-manifest.json', JSON.stringify(manifest, null, 2));
  console.log('manifest entries', Object.keys(manifest).length);
}

main().catch((e) => { console.error(e); process.exit(1); });
