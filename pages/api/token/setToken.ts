import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_KEYS } from "../helpers/utils/cookies";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      let token = req.body.token as string;
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(COOKIE_KEYS.TOKEN, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 1 * 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 201;
      res.json({ token: token });
    }
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default handler;
