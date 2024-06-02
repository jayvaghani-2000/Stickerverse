import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import prisma from "../../../prisma";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const product = await prisma.sticker.findFirst({
        include: {
          image: {
            orderBy: {
              url: "asc",
            },
          },
        },
        where: {
          slug: req.query.slug as string,
        },
      });

      return res.status(200).json({ data: product });
    }

    res.setHeader("Allow", "GET");
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
