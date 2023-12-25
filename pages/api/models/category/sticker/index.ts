import prisma from "../../../../../prisma";
import { AddCategorySchema } from "./schema";

export async function post(data: unknown) {
  const payload = AddCategorySchema.parse(data);

  return await prisma.category.create({
    data: {
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
