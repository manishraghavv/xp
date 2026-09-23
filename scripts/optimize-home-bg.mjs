import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/images/backgrounds/sap.jpeg');
const heroWebpPath = path.join(__dirname, '../public/images/backgrounds/sap-hero.webp');
const mobileWebpPath = path.join(__dirname, '../public/images/backgrounds/sap-hero-mobile.webp');
const placeholderJsonPath = path.join(__dirname, '../public/images/backgrounds/sap-hero-placeholder.json');

async function optimize() {
  console.log('Reading:', inputPath);
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

  // 1. Desktop version: max width 2400 (keep original 1792 or resize if >2400), quality 78
  const desktopWidth = Math.min(metadata.width || 1792, 2400);
  await sharp(inputPath)
    .resize({ width: desktopWidth, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(heroWebpPath);
  
  const heroStat = fs.statSync(heroWebpPath);
  console.log(`Created sap-hero.webp: ${heroStat.size} bytes (${(heroStat.size / 1024).toFixed(1)} KB)`);

  // 2. Mobile version: max width 900px, tuned crop around the central glowing focal point (around center 40%)
  // Original is 1792x1024. For mobile portrait / landscape, a centered focal crop around the glowing orb:
  // e.g. extract a 9:14 or 4:5 aspect ratio around the center (x: center, y: center-top) or 900px wide
  // A mobile viewport (375x812, 390x844) benefits from a crop centered on the central ring
  // Center is at x = 1792/2 = 896, y ≈ 1024 * 0.40 ≈ 410
  // Let's crop a window of width ~800, height ~1024 (aspect ~ 4:5 / 9:12) centered at x=896, then resize to width 900 or 750
  const cropWidth = 1000;
  const cropHeight = 1024;
  const cropLeft = Math.round((metadata.width - cropWidth) / 2);
  const cropTop = 0;

  await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(mobileWebpPath);

  const mobileStat = fs.statSync(mobileWebpPath);
  console.log(`Created sap-hero-mobile.webp: ${mobileStat.size} bytes (${(mobileStat.size / 1024).toFixed(1)} KB)`);

  // 3. Tiny blurDataURL
  const tinyBuffer = await sharp(inputPath)
    .resize(20, 11, { fit: 'fill' })
    .webp({ quality: 20 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${tinyBuffer.toString('base64')}`;
  
  fs.writeFileSync(placeholderJsonPath, JSON.stringify({ blurDataURL }, null, 2));
  console.log('Generated blurDataURL:', blurDataURL);
  console.log('Saved placeholder to:', placeholderJsonPath);
}

optimize().catch(err => {
  console.error('Error optimizing image:', err);
  process.exit(1);
});
