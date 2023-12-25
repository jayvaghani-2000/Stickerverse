import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_KEYS } from "../helpers/utils/cookies";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(COOKIE_KEYS.TOKEN, "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      return res.json({ success: true });
    }
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default handler;
