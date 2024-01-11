import prisma from "../../../../prisma";
import { AddToCartSchema, DeleteCartItemSchema } from "./schema";

export async function getWishlist(id: string) {
  return await prisma.wishlistItem.findMany({
    where: {
      wishlistId: id,
    },
    include: {
      sticker: {
        include: {
          image: {
            orderBy: {
              url: "asc",
            },
          },
        },
      },
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

export async function deleteCartItems(id: string, data: unknown) {
  const payload = DeleteCartItemSchema.parse(data);

  await prisma.cartItem.deleteMany({
    where: {
      cartId: id,
      stickerId: { in: payload.stickerIds },
    },
  });
}
