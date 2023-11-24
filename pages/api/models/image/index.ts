import { ProductImageSchema } from "./schema";
import prisma from "../../../../prisma";

export async function postStickerImage(data: unknown) {
  const payload = ProductImageSchema.parse(data);

  return await prisma.image.create({
    data: payload,
    select: {
      id: true,
    },
  });
}
