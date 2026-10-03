import puppeteer from 'puppeteer-core';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const types = { '.html': 'text/html', '.mjs': 'text/javascript', '.pdf': 'application/pdf' };
const srv = http.createServer((q, r) => { const f = path.join(process.cwd(), decodeURIComponent(q.url.split('?')[0])); if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }).listen(5199);
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage();
p.on('pageerror', e => console.log('err', e.message));
await p.goto('http://localhost:5199/render.html'); await p.waitForFunction('window.ready');
const scale = Number(process.argv[2] || 3);
for (let i = 1; i <= 26; i++) {
  const url = await p.evaluate((n, s) => window.renderPage(n, s), i, scale);
  fs.writeFileSync(`pdfpages/p${String(i).padStart(2, '0')}.png`, Buffer.from(url.split(',')[1], 'base64'));
  process.stdout.write(i + ' ');
}
await b.close(); srv.close(); console.log('done');
