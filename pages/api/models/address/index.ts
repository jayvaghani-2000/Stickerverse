import prisma from "../../../../prisma";
import { AddAddressSchema } from "./schema";

export async function addAddress(id: string, data: unknown) {
  const payload = AddAddressSchema.parse(data);

  return await prisma.userAddress.create({
    data: {
      userId: id,
      ...payload,
    },
  });
}

export async function getUserAddress(id: string) {
  return await prisma.userAddress.findMany({
    where: {
      userId: id,
    },
  });
}
