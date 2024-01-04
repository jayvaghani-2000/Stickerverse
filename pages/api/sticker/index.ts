import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { handlePostProduct } from "../helpers/sticker/add";
import { handleGetProduct } from "../helpers/sticker/get";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      await handlePostProduct(req);
      return res.status(201).json({ success: true });
    }
    if (req.method === "GET") {
      const data = await handleGetProduct(req.query);
      return res.status(200).json({ data });
    }
    res.setHeader("Allow", "POST, GET");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorObj = handleErrorMsg(error);
      return res.status(400).json({ error: errorObj });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
