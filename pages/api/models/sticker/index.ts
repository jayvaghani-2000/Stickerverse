import { AddProductSchema, GetProductSchema } from "./schema";
import prisma from "../../../../prisma";
import { Prisma } from "@prisma/client";
import { SORT_BY } from "@/app/utils/enum";

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

  const { page, pageSize, category, price, sortBy } = payload;

  const [filter, orderBy] = getStickerFilter(category, price, sortBy);

  const skip = (page - 1) * pageSize;
  const posts = await prisma.sticker.findMany({
    skip: skip,
    take: pageSize,
    include: {
      image: true,
    },
    orderBy: orderBy,
    where: filter,
  });

  return posts;
}

export async function getStickerPageCount(data: unknown) {
  const payload = GetProductSchema.parse(data);
  const { page, pageSize, category, price, sortBy } = payload;

  const [filter, orderBy] = getStickerFilter(category, price, sortBy);

  const totalStickers = await prisma.sticker.count({
    where: filter,
  });

  const totalPages = Math.ceil(totalStickers / pageSize);

  return [totalPages, totalStickers];
}

export async function getStickerCount(data: unknown) {
  const payload = GetProductSchema.parse(data);
  const { category, price, sortBy } = payload;

  const [filter] = getStickerFilter(category, price, sortBy);

  const totalStickers = await prisma.sticker.count({
    where: filter,
  });

  return { count: totalStickers };
}

const getStickerFilter = (
  category: number[],
  price: number[],
  sortBy: string
): [Prisma.stickerWhereInput, Prisma.stickerOrderByWithAggregationInput] => {
  let filter: Prisma.stickerWhereInput = {};
  let orderBy: Prisma.stickerOrderByWithAggregationInput;

  if (sortBy === SORT_BY.BEST_SELLING) {
    orderBy = {
      totalSell: "desc",
    };
  } else if (sortBy === SORT_BY.TRENDING) {
    orderBy = {
      trending: "desc",
    };
  } else if (sortBy === SORT_BY.TITLE_ASC) {
    orderBy = {
      productName: "asc",
    };
  } else if (sortBy === SORT_BY.TITLE_DESC) {
    orderBy = {
      productName: "desc",
    };
  } else if (sortBy === SORT_BY.PRICE_ASC) {
    orderBy = {
      price: "asc",
    };
  } else if (sortBy === SORT_BY.PRICE_DESC) {
    orderBy = {
      price: "desc",
    };
  } else {
    orderBy = {
      createdAt: "desc",
    };
  }

  if (price.length > 0 && category.length > 0) {
    filter = {
      categoryId: {
        in: category,
      },
      price: {
        gte: price[0],
        lte: price[1],
      },
    };
  } else if (price.length > 0) {
    filter = {
      price: {
        gte: price[0],
        lte: price[1],
      },
    };
  } else if (category.length > 0) {
    filter = {
      categoryId: {
        in: category,
      },
    };
  }

  return [filter, orderBy];
};
