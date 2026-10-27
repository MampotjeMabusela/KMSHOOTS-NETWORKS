import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAW = path.join(process.cwd(), "public", "images", "raw");
const HD = path.join(process.cwd(), "public", "images", "hd");
const TARGET_LONG_EDGE = 2400;

await fs.mkdir(HD, { recursive: true });

const files = (await fs.readdir(RAW)).filter(
  (f) => /\.(jpe?g|png|webp)$/i.test(f) && !/^logo/i.test(f),
);

for (const file of files) {
  const input = path.join(RAW, file);
  const base = file.replace(/\.[^.]+$/, "");
  const output = path.join(HD, `${base}.jpg`);

  const image = sharp(input, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 1200;
  const height = meta.height ?? 1200;
  const longEdge = Math.max(width, height);
  const scale = longEdge < TARGET_LONG_EDGE ? TARGET_LONG_EDGE / longEdge : 1;
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  await sharp(input, { failOn: "none" })
    .rotate()
    .resize({
      width: targetW,
      height: targetH,
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 1.05, m1: 0.9, m2: 0.45 })
    .modulate({ brightness: 1.03, saturation: 1.08 })
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(output);

  const outMeta = await sharp(output).metadata();
  const outStat = await fs.stat(output);
  console.log(
    `${base}.jpg → ${outMeta.width}x${outMeta.height} (${Math.round(outStat.size / 1024)}KB)`,
  );
}

console.log(`Enhanced ${files.length} images → public/images/hd`);
