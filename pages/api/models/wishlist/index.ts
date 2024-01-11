import prisma from "../../../../prisma";
import { AddToWishlistSchema, DeleteWishlistItemSchema } from "./schema";

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

export async function addWishlistCart(id: string, data: unknown) {
  const payload = AddToWishlistSchema.parse(data);

  return await prisma.wishlist.upsert({
    where: {
      userId: id,
    },
    update: {
      userId: id,
      items: {
        createMany: {
          data: payload.stickerId.map(i => ({
            wishlistId: id,
            stickerId: i,
          })),
        },
      },
    },
    create: {
      userId: id,
      items: {
        createMany: {
          data: payload.stickerId.map(i => ({
            wishlistId: id,
            stickerId: i,
          })),
        },
      },
    },
  });
}
export async function deleteWishlistItems(id: string, data: unknown) {
  const payload = DeleteWishlistItemSchema.parse(data);

  await prisma.wishlistItem.deleteMany({
    where: {
      wishlistId: id,
      stickerId: { in: payload.stickerIds },
    },
  });
}
