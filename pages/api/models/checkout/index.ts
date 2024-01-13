import { orderPaymentStatus } from "@prisma/client";
import prisma from "../../../../prisma";

export const handleInitiateOrder = async (
  id: string,
  orderId: string,
  amount: number
) => {
  const userCart = await prisma.cart.findFirstOrThrow({
    where: {
      userId: id,
    },
    include: {
      items: true,
    },
  });

  return await prisma.order.create({
    data: {
      address: "",
      totalPrice: amount,
      userId: id,
      items: {
        createMany: {
          data: userCart.items.map(i => ({
            quantity: i.quantity,
            stickerId: i.stickerId,
          })),
        },
      },
      payment: {
        create: {
          orderUniqId: orderId,
          userId: id,
          amount: amount,
          status: orderPaymentStatus.pending,
        },
      },
    },
    select: {
      id: true,
    },
  });
};