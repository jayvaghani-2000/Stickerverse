import { getStickers } from "../../models/sticker";
import { prepareNumberPayload } from "../utils/converter";
import { NextApiRequest } from "next";

export const handleGetProduct = async (query: NextApiRequest["query"]) => {
  try {
    prepareNumberPayload(query, ["page", "pageSize"]);

    const sticker = await getStickers({ ...query });
    return sticker;
  } catch (err) {
    throw err;
  }
};
