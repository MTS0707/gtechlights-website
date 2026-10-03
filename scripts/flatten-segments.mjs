// Post-build step for GitHub Pages.
//
// Next.js static export writes route-segment prefetch files in nested folders,
// e.g.  out/about/__next.about/__PAGE__.txt
// but the browser requests the flattened name
//       out/about/__next.about.__PAGE__.txt
// Servers like Vercel map one to the other; GitHub Pages can't, so we write a
// flattened copy of each file. Without this, pages still work, but link
// prefetches 404 and navigation is slightly slower.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) flatten(full, dir, entry.name);
    else walk(full);
  }
}

// Copy every file under `segDir` to `parent/<segName>.<rest with / → .>`
function flatten(segDir, parent, segName) {
  const stack = [[segDir, segName]];
  while (stack.length) {
    const [dir, prefix] = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const name = `${prefix}.${entry.name}`;
      if (entry.isDirectory()) stack.push([full, name]);
      else {
        fs.copyFileSync(full, path.join(parent, name));
        copied++;
      }
    }
  }
}

if (!fs.existsSync(OUT)) {
  console.error("flatten-segments: out/ not found — run `next build` first.");
  process.exit(1);
}
walk(OUT);
console.log(`flatten-segments: wrote ${copied} flattened prefetch files`);
