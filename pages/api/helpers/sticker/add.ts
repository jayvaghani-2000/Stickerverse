import fs from "fs";
import { IncomingMessage } from "http";
import { postStickerImage } from "../../models/image";
import { getStickersSlug, post } from "../../models/sticker";
import { IMAGE_FOLDER } from "../../utils/constant";
import { convertToSlug, createSlug } from "../../utils/generateSlug";
import { parse } from "../formData";
import { createMedia } from "../upload/uploadImage";
import {
  prepareBooleanPayload,
  prepareNumberPayload,
} from "../utils/converter";

export const handlePostProduct = async (req: IncomingMessage) => {
  try {
    const form = await parse(req);
    const image = form.images.flat() ?? [];
    delete form.images;

    prepareNumberPayload(form, ["price", "offer", "categoryId"]);
    prepareBooleanPayload(form, ["trending"]);

    const slug = convertToSlug(form.productName);
    const stickerSlug = await getStickersSlug(slug);
    const finalSlug = createSlug(slug, stickerSlug);

    const sticker = await post({ ...form, slug: finalSlug });

    const images = await Promise.all(
      image.map(async (i: any) => {
        const imageFile = fs.readFileSync(i.filepath);
        return await createMedia(
          Buffer.from(imageFile),
          `${IMAGE_FOLDER.STICKER}/${finalSlug}/${i.originalFilename}`
        );
      })
    );

    await Promise.all(
      images.map(async (i: any) => {
        return await postStickerImage({ ...i, stickerId: sticker.id });
      })
    );
  } catch (err) {
    throw err;
  }
};
