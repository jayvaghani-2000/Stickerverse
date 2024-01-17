import prisma from "../../../../prisma";
import { AddAddressSchema } from "./schema";

export async function addAddress(id: string, data: unknown) {
  const payload = AddAddressSchema.parse(data);

  if (payload.default) {
    await prisma.userAddress.updateMany({
      where: {
        userId: id,
        default: true,
      },
      data: {
        default: false,
      },
    });
  }

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
      shallowDeleted: false,
    },
  });
}

export async function deleteUserAddress(id: string) {
  return await prisma.userAddress.update({
    where: {
      id: id,
    },
    data: {
      shallowDeleted: true,
    },
  });
}
