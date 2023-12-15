import type { NextApiRequest, NextApiResponse } from "next";
import { handlePostStickerCategory } from "../helpers/category/sticker";
import { getStickerCategory } from "../models/category/sticker";
import { ZodError } from "zod";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const category = await handlePostStickerCategory(req);
      return res.status(201).json({ success: true, category });
    }
    if (req.method === "GET") {
      const category = await getStickerCategory();
      return res.status(200).json({ category });
    }
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorObj = handleErrorMsg(error);
      return res.status(400).json({ error: errorObj });
    }
    return res.status(500).json({ error });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
