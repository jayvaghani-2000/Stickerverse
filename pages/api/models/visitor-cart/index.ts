import prisma from "../../../../prisma";
import { AddToVisitorCartSchema } from "./schema";

export async function getVisitorCart(id: string) {
  return await prisma.cartItem.findMany({
    where: {
      visitorId: id,
    },
    include: {
      sticker: true,
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

  return await prisma.visitorCart.upsert({
    where: {
      id: id,
    },
    update: {
      id: id,
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
    create: {
      ...payload,
    },
  });
}
