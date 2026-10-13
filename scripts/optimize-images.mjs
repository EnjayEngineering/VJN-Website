// Converts the original 1024px PNG photography into responsive WebP files.
// Run once with `npm run images` whenever the source photos change.
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = '_legacy/rnstechservice.com/images/new';
const OUT = 'src/assets/images';
const WIDTHS = [640, 1024];

// Legacy file name -> descriptive name used by the app
const NAMES = {
  'main.png': 'hero-site',
  's1.png': 'sector-residential',
  's2.png': 'sector-commercial',
  's3.png': 'sector-industrial',
  'a.png': 'service-hvac',
  'b.png': 'service-electromechanical',
  'c.png': 'service-plumbing',
  'k.png': 'service-electrical',
  'e.png': 'service-tiling',
  'f.png': 'service-carpentry',
  'g.png': 'service-ornamentation',
  'h.png': 'service-wallpaper',
  'i.png': 'service-false-ceiling',
  'l.png': 'service-plastering',
};

// The source photos carry a small watermark about 30–80px in from the
// bottom-right corner. Crop a square that stops short of it (a ~14% zoom).
const CROP_OFFSET = 0.03; // trimmed from the top and left edges
const CROP_SIZE = 0.879; // kept, as a fraction of the original width/height

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  const name = NAMES[file];
  if (!name) continue;
  const source = path.join(SRC, file);
  const { width: w, height: h } = await sharp(source).metadata();
  const crop = {
    left: Math.round(w * CROP_OFFSET),
    top: Math.round(h * CROP_OFFSET),
    width: Math.round(w * CROP_SIZE),
    height: Math.round(h * CROP_SIZE),
  };
  for (const width of WIDTHS) {
    const out = path.join(OUT, `${name}-${width}.webp`);
    await sharp(source).extract(crop).resize(width).webp({ quality: 76 }).toFile(out);
    console.log('✓', out);
  }
}
