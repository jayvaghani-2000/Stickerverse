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

  return await prisma.cart.upsert({
    where: {
      userId: id,
    },
    update: {
      userId: id,
      items: {
        upsert: [
          {
            where: {
              cartId_stickerId: {
                cartId: id,
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
}

export async function updateCartItems(id: string, data: unknown) {
  const payload = AddToCartSchema.parse(data);

  await prisma.cart.update({
    where: {
      userId: id,
    },
    data: {
      items: {
        update: {
          where: {
            cartId_stickerId: {
              cartId: id,
              stickerId: payload.stickerId,
            },
          },
          data: {
            quantity: payload.quantity,
          },
        },
      },
    },
  });
}
