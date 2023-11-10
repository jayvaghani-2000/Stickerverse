import type { NextApiRequest, NextApiResponse } from "next";
import { handlePostProduct } from "../../helpers/product/add";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      await handlePostProduct(req);
      return res.status(200).json({ success: true });
    }
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
