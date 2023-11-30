import { IncomingMessage } from "http";
import fs from "fs";
import { parse } from "../formData";
import { post } from "../../models/sticker";
import { createMedia } from "../upload/uploadImage";
import { preparePayload } from "../utils/converter";
import { postStickerImage } from "../../models/image";

export const handlePostProduct = async (req: IncomingMessage) => {
  try {
    const form = await parse(req);
    const image = form.image ?? [];

    delete form.image;

    preparePayload(form, ["price", "offer", "categoryId"]);

    const sticker = await post({ ...form, categoryId: 2 });

    const images = await Promise.all(
      image.map(async (i: any) => {
        const imageFile = fs.readFileSync(i.filepath);
        return await createMedia(Buffer.from(imageFile));
      })
    );

    await Promise.all(
      images.map(async (i: any) => {
        return await postStickerImage({ ...i, stickerId: sticker.id });
      })
    );
  } catch (err) {
    throw new Error("something went wrong");
  }
};
