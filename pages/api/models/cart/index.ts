import prisma from "../../../../prisma";
import { AddToCartSchema } from "./schema";

export async function getCart(id: string) {
  return await prisma.cartItem.findMany({
    where: {
      cart: {
        userId: id,
      },
    },
    include: {
      sticker: true,
    },
  });
}

export async function addToCart(id: string, data: unknown) {
  const payload = AddToCartSchema.parse(data);

  const cart = await prisma.cart.findFirst({
    where: {
      userId: id,
    },
    select: {
      id: true,
    },
  });

  if (cart) {
    return await prisma.cart.upsert({
      where: {
        id: cart.id,
      },
      update: {
        id: cart.id,
        items: {
          upsert: [
            {
              where: {
                cartId_stickerId: {
                  cartId: cart.id,
                  stickerId: payload.stickerId,
                },
              },
              update: {
                quantity: payload.quantity,
              },
              create: {
                ...payload,
              },
            },
          ],
        },
      },
      create: {
        userId: id,
        items: {
          create: {
            ...payload,
          },
        },
      },
    });
  } else {
    return await prisma.cart.create({
      data: {
        userId: id,
        items: {
          create: {
            ...payload,
          },
        },
      },
    });
  }
}
