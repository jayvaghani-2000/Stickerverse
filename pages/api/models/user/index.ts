export async function getUserById(id: string) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  return user;
}
