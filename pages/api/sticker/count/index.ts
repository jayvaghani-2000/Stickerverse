import type { NextApiRequest, NextApiResponse } from "next";
import { handleGetProductCount } from "../../helpers/sticker/get";
import { ZodError } from "zod";
import { handleErrorMsg } from "../../helpers/utils/handleErrorMsg";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const data = await handleGetProductCount(req.query);
      return res.status(200).json({ data });
    }
    res.setHeader("Allow", "GET");
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
