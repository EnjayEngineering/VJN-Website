// Builds the social preview card and PNG app icons in `public/`.
// Run with `npm run icons` whenever the logo or hero photo changes.
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const HERO = 'src/assets/images/hero-site-1024.webp';
const MARK = 'public/brand/vjn-logo.png';
const OUT = 'public';

const mark = await readFile(MARK);

// 1200×630 Open Graph / Twitter card: darkened site photo, logo mark and tagline.
const W = 1200;
const H = 630;
const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0" stop-color="#0e1b30" stop-opacity="0.96"/>
      <stop offset="0.6" stop-color="#0e1b30" stop-opacity="0.78"/>
      <stop offset="1" stop-color="#0e1b30" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <g font-family="Segoe UI, Helvetica, Arial, sans-serif" fill="#ffffff">
    <text x="80" y="300" font-size="64" font-weight="700">VJN Technical Services</text>
    <text x="80" y="370" font-size="34" fill="#f26419">MEP, Maintenance &amp; Fit-out in Dubai</text>
    <text x="80" y="520" font-size="26" fill="#d6e2e2">Air-conditioning · Electromechanical · Plumbing · Electrical · Interiors</text>
    <text x="80" y="562" font-size="26" fill="#d6e2e2">+971 52 645 6827 · Al Quoz, Dubai, U.A.E.</text>
  </g>
</svg>`);

await sharp(HERO)
  .resize(W, H, { fit: 'cover' })
  .composite([
    { input: overlay },
    { input: await sharp(mark).resize(140).png().toBuffer(), left: 80, top: 80 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/og-image.jpg`);
console.log('✓', `${OUT}/og-image.jpg`);

// Home-screen / search-result icons: the mark on white with breathing room.
for (const [file, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  const inner = Math.round(size * 0.78);
  await sharp({
    create: { width: size, height: size, channels: 4, background: '#ffffff' },
  })
    .composite([{ input: await sharp(mark).resize(inner).png().toBuffer(), gravity: 'center' }])
    .png()
    .toFile(`${OUT}/${file}`);
  console.log('✓', `${OUT}/${file}`);
}
