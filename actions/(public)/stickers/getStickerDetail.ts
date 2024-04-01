"use server";

export const getStickerDetails = async (slug: string) => {
  try {
    const product = await prisma.sticker.findFirst({
      include: {
        image: {
          orderBy: {
            url: "asc",
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    return { success: true, data: product };
  } catch (err) {
    // redirect()
    return { success: false, error: "Product not found" };
  }
};
