import { IncomingMessage } from "http";
import fs from "fs";
import { parse } from "../formData";
import { post } from "../../models/sticker";
import { createMedia } from "../upload/uploadImage";
import {
  prepareNumberPayload,
  prepareBooleanPayload,
} from "../utils/converter";
import { postStickerImage } from "../../models/image";

export const handlePostProduct = async (req: IncomingMessage) => {
  try {
    const form = await parse(req);
    const image = form.images.flat() ?? [];
    delete form.images;

    prepareNumberPayload(form, ["price", "offer", "categoryId"]);
    prepareBooleanPayload(form, ["trending"]);

    const sticker = await post({ ...form });

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
    console.log(err);
    throw new Error("something went wrong");
  }
};
