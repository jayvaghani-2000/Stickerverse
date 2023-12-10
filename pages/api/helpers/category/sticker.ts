import { IncomingMessage } from "http";
import { parse } from "../formData";
import { post } from "../../models/category/sticker";

export const handlePostStickerCategory = async (req: IncomingMessage) => {
  try {
    const form = await parse(req);
    const category = await post({ ...form });
    return category.id;
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong");
  }
};
