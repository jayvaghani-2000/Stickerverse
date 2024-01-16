import { orderPaymentStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          req.body;

        const isValid = validatePaymentVerification(
          { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
          razorpay_signature,
          process.env.RAZORPAY_API_SECRET_KEY!
        );

        if (isValid) {
          await prisma.payment.update({
            where: {
              orderUniqId: razorpay_order_id,
            },
            data: {
              status: orderPaymentStatus.confirmed,
            },
          });
          return res
            .writeHead(302, {
              location: `/order-placed?id=${razorpay_order_id}`,
            })
            .end();
        } else {
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
