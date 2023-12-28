import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";
import { handleCreateVisitorCart } from "../helpers/visitor-cart";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        const data = await handleCreateVisitorCart();
        return res.status(201).json({ data });
      default:
        res.setHeader("Allow", "POST, GET");
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const errorObj = handleErrorMsg(error);
      return res.status(400).json({ error: errorObj });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export default handler;
