import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { handleAddAddress, handleGetAddress } from "../helpers/address";
import { getTokenData } from "../helpers/utils/getTokenData";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";
import jwtMiddleware from "../helpers/utils/validateToken";

async function handler(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { id } = getTokenData(user);
  try {
    switch (req.method) {
      case "GET":
        const addresses = await handleGetAddress(id);
        return res.status(200).json({ addresses });
      case "POST":
        await handleAddAddress(id, req.body);
        return res.status(201).json({ success: true });

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

export default jwtMiddleware(handler);
