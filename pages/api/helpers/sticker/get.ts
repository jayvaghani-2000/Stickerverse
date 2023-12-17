import {
  getStickerCount,
  getStickerPageCount,
  getStickers,
} from "../../models/sticker";
import {
  prepareNumberPayload,
  prepareQueryNumberArrayPayload,
} from "../utils/converter";
import { NextApiRequest } from "next";

export const handleGetProduct = async (query: NextApiRequest["query"]) => {
  try {
    prepareNumberPayload(query, ["page", "pageSize", "totalPage"]);
    prepareQueryNumberArrayPayload(query, ["category", "price"]);

    if (Number(query.page) === 1) {
      const [[totalPage, result], sticker] = await Promise.all([
        await getStickerPageCount({ ...query }),
        await getStickers({ ...query }),
      ]);
      return {
        sticker,
        page: query.page,
        totalPage,
        result,
        pageSize: query.pageSize,
      };
    } else {
      const sticker = await getStickers({ ...query });
      return {
        sticker,
        page: query.page,
        totalPage: query.totalPage,
        pageSize: query.pageSize,
      };
    }
  } catch (err) {
    throw err;
  }
};

export const handleGetProductCount = async (query: NextApiRequest["query"]) => {
  try {
    prepareNumberPayload(query, ["page", "pageSize", "totalPage"]);
    prepareQueryNumberArrayPayload(query, ["category", "price"]);

    const sticker = await getStickerCount({ ...query });
    return sticker;
  } catch (err) {
    throw err;
  }
};
