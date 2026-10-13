// Writes a static HTML file for every page so search engines and link previews
// get real content and per-page metadata without running JavaScript.
// Runs after `vite build` (client) and `vite build --ssr` (server); see `npm run build`.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const SERVER = 'dist-server';

const { render, paths, company } = await import(
  pathToFileURL(path.resolve(SERVER, 'entry-server.js')).href
);
const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

// React emits a page's <title>, <meta> and <link> tags ahead of its markup.
const HEAD_TAG = /^(?:<title\b[^>]*>[^<]*<\/title>|<(?:meta|link)\b[^>]*\/?>)/;

function splitHead(html) {
  const head = [];
  let rest = html;
  for (let m = rest.match(HEAD_TAG); m; m = rest.match(HEAD_TAG)) {
    // Marked so main.tsx can remove them before React renders its own copies.
    head.push(m[0].replace(/^<(\w+)/, '<$1 data-prerender'));
    rest = rest.slice(m[0].length);
  }
  return { head: head.join('\n    '), body: rest };
}

// Inner pages are code-split. Link each page's own CSS (and preload its JS) so the
// prerendered HTML is fully styled before any script runs.
const manifest = JSON.parse(await readFile(path.join(DIST, '.vite/manifest.json'), 'utf8'));
const pageModule = (localizedUrl) => {
  // Arabic pages (/ar, /ar/services…) use the same modules as English.
  const url = localizedUrl.replace(/^\/ar(?=\/|$)/, '') || '/';
  if (url === '/') return null; // bundled with the main entry
  if (url === '/404') return 'src/pages/NotFoundPage.tsx';
  if (url.startsWith('/services/')) return 'src/pages/ServiceDetailPage.tsx';
  const name = {
    '/services': 'Services',
    '/sectors': 'Sectors',
    '/about': 'About',
    '/careers': 'Careers',
    '/contact': 'Contact',
  }[url];
  if (!name) throw new Error(`No page module mapped for ${url}`);
  return `src/pages/${name}Page.tsx`;
};

function pageAssets(url) {
  const css = new Set();
  const js = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || js.has(chunk.file)) return;
    js.add(chunk.file);
    chunk.css?.forEach((file) => css.add(file));
    chunk.imports?.forEach(visit);
  };
  const key = pageModule(url);
  if (key) visit(key);
  return [
    ...[...css].map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`),
    ...[...js].map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`),
  ].filter((tag) => !template.includes(tag.match(/href="([^"]+)"/)[1]));
}

function page(html, url) {
  const { head, body } = splitHead(html);
  const assets = pageAssets(url)
    .map((tag) => `    ${tag}\n`)
    .join('');
  return (
    template
      .replace('  </head>', () => `${assets}  </head>`)
      .replace(/\s*<title data-prerender>[\s\S]*?<\/title>/, '')
      .replace(/\s*<meta\s+data-prerender[\s\S]*?\/>/, '')
      // Function replacements, so a `$` in page text is never read as a pattern.
      .replace('</head>', () => `    ${head}\n  </head>`)
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
  );
}

// `/services/hvac` -> dist/services/hvac.html (served at the clean URL; see public/.htaccess).
const fileFor = (url) => path.join(DIST, url === '/' ? 'index.html' : `${url.slice(1)}.html`);

for (const url of paths) {
  const file = fileFor(url);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page(await render(url), url));
  console.log('✓', url, '→', file);
}

// Served with a real 404 status for unknown URLs.
await writeFile(path.join(DIST, '404.html'), page(await render('/404'), '/404'));
console.log('✓ 404 →', path.join(DIST, '404.html'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (url) => `  <url>
    <loc>${company.siteUrl}${url}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
console.log('✓ sitemap.xml with', paths.length, 'URLs');

// Build-only files that shouldn't be deployed.
await rm(SERVER, { recursive: true, force: true });
await rm(path.join(DIST, '.vite'), { recursive: true, force: true });
