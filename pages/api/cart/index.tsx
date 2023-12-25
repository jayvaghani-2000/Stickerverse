import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { getTokenData } from "../helpers/utils/getTokenData";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";
import jwtMiddleware from "../helpers/utils/valiateToken";

async function handler(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { id } = getTokenData(user);
  try {
    res.setHeader("Allow", "POST");
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

export default jwtMiddleware(handler);