import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      return res.status(200).json({ success: true });
    }
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default handler;
