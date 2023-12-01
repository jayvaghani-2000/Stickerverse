import { trendingSticker } from "../models/sticker";
import { NextApiRequest, NextApiResponse } from "next";

const handleGetTrendingStickers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const stickers = await trendingSticker();
      return res.status(200).json({ stickers });
    }
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default handleGetTrendingStickers;
