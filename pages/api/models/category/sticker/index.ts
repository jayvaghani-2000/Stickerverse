import { AddStickerCategorySchema } from "./schema";
import prisma from "../../../../../prisma";

export async function post(data: unknown) {
  const payload = AddStickerCategorySchema.parse(data);

  return await prisma.category.create({
    data: {
      parent: "sticker",
      ...payload,
    },
    select: {
      id: true,
    },
  });
}

export async function getStickerCategory() {
  const category = await prisma.category.findMany({
    where: {
      parent: "sticker",
    },
    select: {
      categoryName: true,
      id: true,
    },
  });
  return category;
}
