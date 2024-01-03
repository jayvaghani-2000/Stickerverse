import sharp from "sharp";
import { getPublicUrl, upload } from "./upload";

export async function createPreview(buffer: Buffer, width: number) {
  const img = sharp(buffer);
  const meta = await img.metadata();

  const preview = await img
    .resize({
      width,
      height: Math.floor((width * meta.height!) / meta.width!),
    })
    .toBuffer();

  return `data:image/${meta.format};base64,${preview.toString("base64")}`;
}

export async function createMedia(buffer: Buffer, prefix: string) {
  const meta = await sharp(buffer).metadata();
  const img = sharp(buffer);

  const preview = await img.resize({ width: 40, height: 40 }).toBuffer();
  const dataUrl = `data:image/${meta.format};base64,${preview.toString(
    "base64"
  )}`;

  const { path } = await upload(`${prefix}`, buffer, "image/webp");
  return {
    url: getPublicUrl(path),
    blurUrl: dataUrl,
    height: meta.height,
    width: meta.width,
  };
}
