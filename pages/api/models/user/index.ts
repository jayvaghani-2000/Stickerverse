import prisma from "../../../../prisma";
export async function getUserById(id: string) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  return user;
}

export async function setUserPasswordById(id: string) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      password: true,
    },
    select: {
      id: true,
    },
  });

  return user;
}
