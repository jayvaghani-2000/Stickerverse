import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { handleGetUserById } from "../helpers/user/getUserById";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const user = await handleGetUserById(req.query.id! as string);
      return res.status(200).json({ data: user });
    }

    res.setHeader("Allow", "GET, POST");
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
