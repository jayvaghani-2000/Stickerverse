import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { getTokenData } from "../../../helpers/utils/getTokenData";
import { handleErrorMsg } from "../../../helpers/utils/handleErrorMsg";
import jwtMiddleware from "../../../helpers/utils/validateToken";
import { handleConvertVisitorToUserCart } from "../../../helpers/visitor-cart";

async function handler(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { id } = getTokenData(user);
  try {
    switch (req.method) {
      case "POST":
        const data = await handleConvertVisitorToUserCart(
          id,
          req.query.visitorId as string
        );
        return res.status(201).json({ data });
      default:
        res.setHeader("Allow", "POST");
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

export default jwtMiddleware(handler);
