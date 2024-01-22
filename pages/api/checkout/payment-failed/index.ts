import { orderPaymentStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        const { order_id, payment_id } = req.body;

        try {
          await prisma.payment.update({
            where: {
              orderUniqId: order_id,
            },
            data: {
              status: orderPaymentStatus.failed,
              paymentId: payment_id,
            },
            select: { userId: true },
          });

          return res
            .writeHead(302, {
              location: `/payment-failed?order_id=${order_id}&payment_id=${payment_id}`,
            })
            .end();
        } catch (err) {
          return res.status(400).json({
            success: false,
          });
        }

      default:
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export default handler;
