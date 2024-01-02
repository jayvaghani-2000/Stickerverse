import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { handleErrorMsg } from "../../helpers/utils/handleErrorMsg";
import {
  handleAddToVisitorCart,
  handleUpdateVisitorCart,
  handleVisitorUserCart,
} from "../../helpers/visitor-cart";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        const cart = await handleVisitorUserCart(req.query.visitorId as string);
        return res.status(200).json({ cart });
      case "POST":
        const updatedCart = await handleAddToVisitorCart(
          req.query.visitorId as string,
          req.body
        );
        return res.status(201).json({ cart: updatedCart });
      case "PUT":
        const newCart = await handleUpdateVisitorCart(
          req.query.visitorId as string,
          req.body
        );
        return res.status(200).json({ cart: newCart });
      default:
        res.setHeader("Allow", "POST, GET");
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
