import { AddProductSchema } from "./schema";
import prisma from "../../../prisma";

export async function post(data: unknown) {
  const payload = AddProductSchema.parse(data);

  return await prisma.sticker.create({
    data: payload,
    select: {
      id: true,
    },
  });
}
