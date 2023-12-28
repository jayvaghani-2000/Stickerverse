import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { handleCleanupVisitorCart } from "../../helpers/cart";
import { handleErrorMsg } from "../../helpers/utils/handleErrorMsg";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        const cart = await handleCleanupVisitorCart();
        return res.status(200).json({ cart });
      default:
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errorObj = handleErrorMsg(error);
      return res.status(400).json({ error: errorObj });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export default handler;
