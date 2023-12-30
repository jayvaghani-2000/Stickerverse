import prisma from "../../../../prisma";
import { AddToVisitorCartSchema } from "./schema";

export async function getVisitorItemCart(id: string) {
  return await prisma.cartItem.findMany({
    where: {
      visitorId: id,
    },
    include: {
      sticker: true,
    },
  });
}

export async function getVisitorCart(id: string) {
  return await prisma.visitorCart.findFirst({
    where: {
      id: id,
    },
    select: {
      _count: true,
    },
  });
}

export async function createVisitor() {
  return await prisma.visitorCart.create({
    data: {},
  });
}

export async function cleanupVisitorCart() {
  const currentDate = new Date();
  const thresholdDate = new Date(currentDate);
  thresholdDate.setDate(currentDate.getDate() - 2);

  return await prisma.visitorCart.deleteMany({
    where: {
      createdAt: {
        lt: thresholdDate.toISOString(),
      },
    },
  });
}

export async function addToVisitorCart(id: string, data: unknown) {
  const payload = AddToVisitorCartSchema.parse(data);

  return await prisma.visitorCart.update({
    where: {
      id: id,
    },
    data: {
      items: {
        upsert: [
          {
            where: {
              visitorId_stickerId: {
                visitorId: id,
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
  });
}

export async function convertVisitorCart(id: string, visitorId: string) {
  const [cart, visitorCart] = await Promise.all([
    prisma.cart.findFirst({
      where: {
        userId: id,
      },
      select: {
        id: true,
      },
    }),
    prisma.visitorCart.findFirst({
      where: {
        id: visitorId,
      },
      include: {
        items: true,
      },
    }),
  ]);

  await prisma.visitorCart.delete({
    where: {
      id: visitorId,
    },
  });

  if (visitorCart && visitorCart.items.length > 0) {
    const stickers = visitorCart.items.map(i => ({
      stickerId: i.stickerId,
      quantity: i.quantity,
    }));

    if (cart) {
      return await prisma.cart.upsert({
        where: {
          id: cart.id,
        },
        update: {
          userId: id,
          items: {
            upsert: stickers.map(sticker => ({
              where: {
                cartId_stickerId: {
                  cartId: cart.id,
                  stickerId: sticker.stickerId,
                },
              },
              update: {
                quantity: sticker.quantity,
              },
              create: {
                quantity: sticker.quantity,
                stickerId: sticker.stickerId,
              },
            })),
          },
        },
        create: {
          userId: id,
          items: {
            createMany: {
              data: stickers.map(sticker => ({
                stickerId: sticker.stickerId,
                quantity: sticker.quantity,
              })),
            },
          },
        },
      });
    } else {
      return await prisma.cart.create({
        data: {
          userId: id,
          items: {
            createMany: {
              data: stickers.map(sticker => ({
                stickerId: sticker.stickerId,
                quantity: sticker.quantity,
              })),
            },
          },
        },
      });
    }
  }
}
