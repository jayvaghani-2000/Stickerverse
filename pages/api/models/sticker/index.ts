import { AddProductSchema, GetProductSchema } from "./schema";
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
}

export async function getStickers(data: unknown) {
  const payload = GetProductSchema.parse(data);

  const { page, pageSize } = payload;

  const skip = (page - 1) * pageSize;

  const posts = await prisma.sticker.findMany({
    skip: skip,
    take: pageSize,
    include: {
      image: true,
    },
  });

  return posts;
}
