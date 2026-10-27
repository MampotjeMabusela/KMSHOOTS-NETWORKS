import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const input = path.join(process.cwd(), "public", "images", "raw", "logo-kmshoots.png");
const outDir = path.join(process.cwd(), "public", "images", "brand");
await fs.mkdir(outDir, { recursive: true });

const TARGET = 1600;

/**
 * Remove white canvas only — logo colours stay untouched.
 * Soft alpha falloff on near-white edges kills the “white box” fringe
 * so the mark blends into dark header/footer.
 */
const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = Buffer.from(data);
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const chroma = max - min;

  // Near-white / light-grey canvas (low colour, high brightness)
  if (min >= 232 && chroma <= 18) {
    pixels[i + 3] = 0;
    continue;
  }
  // Soft fringe: fade remaining near-white so no hard white halo
  if (min >= 210 && chroma <= 22) {
    const t = (min - 210) / 22;
    pixels[i + 3] = Math.round(255 * (1 - t));
  }
}

const transparent = await sharp(pixels, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .png()
  .toBuffer();

await sharp(transparent)
  .trim({ threshold: 4 })
  .resize({
    width: TARGET,
    height: TARGET,
    fit: "inside",
    kernel: sharp.kernel.lanczos3,
  })
  .sharpen({ sigma: 0.65, m1: 0.65, m2: 0.3 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(outDir, "logo.png"));

const meta = await sharp(path.join(outDir, "logo.png")).metadata();
console.log(`logo.png → ${meta.width}x${meta.height} transparent HD`);
