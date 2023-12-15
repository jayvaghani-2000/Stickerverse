import { AddProductSchema } from "./schema";
import prisma from "../../../../prisma";

export async function post(data: unknown) {
  const payload = AddProductSchema.parse(data);

  return await prisma.sticker.create({
    data: payload,
    select: {
      id: true,
    },
  });
}

export async function getStickersSlug(slug: string) {
  return await prisma.sticker.findMany({
    where: {
      slug: {
        startsWith: slug,
      },
    },
    select: {
      slug: true,
    },
  });
}

export async function trendingSticker() {
  const stickers = await prisma.sticker.findMany({
    where: {
      trending: true,
    },
    include: {
      image: true,
    },
  });
  return stickers;
  // const stickerId = stickers.map(i => i.id);
  // const rating = await prisma.rating.findMany({
  //   where: {
  //     stickerId: {
  //       in: stickerId,
  //     },
  //   },
  // });
}
