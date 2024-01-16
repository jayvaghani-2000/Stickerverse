import { handleAddToCart } from "../helpers/cart";
import { getUserAddress } from "../models/address";
import { getCart } from "../models/cart";
import { getStickerCategory } from "../models/category/sticker";
import {
  getStickerCount,
  getStickers,
  post as postSticker,
  trendingSticker,
} from "../models/sticker";
import { getUserById, setUserPasswordById } from "../models/user";
import {
  addToVisitorCart,
  createVisitor,
  getVisitorItemCart,
} from "../models/visitor-cart";
import { addWishlistCart, getWishlist } from "../models/wishlist";

export type addStickerType = NonNullable<
  Awaited<ReturnType<typeof postSticker>>
>;
export type trendingStickerType = NonNullable<
  Awaited<ReturnType<typeof trendingSticker>>
>;
export type stickerCategoryType = NonNullable<
  Awaited<ReturnType<typeof getStickerCategory>>
>;
export type stickersType = {
  sticker: NonNullable<Awaited<ReturnType<typeof getStickers>>>;
  page: number;
  totalPage: number;
  pageSize: number;
  result: number;
};
export type stickersCountType = NonNullable<
  Awaited<ReturnType<typeof getStickerCount>>
>;

export type userByIdType = NonNullable<Awaited<ReturnType<typeof getUserById>>>;

export type updateUserPasswordType = NonNullable<
  Awaited<ReturnType<typeof setUserPasswordById>>
>;

export type getCartType = NonNullable<Awaited<ReturnType<typeof getCart>>>;
export type addToCartType = NonNullable<
  Awaited<ReturnType<typeof handleAddToCart>>
>;

export type getVisitorCartType = NonNullable<
  Awaited<ReturnType<typeof getVisitorItemCart>>
>;

export type createVisitorType = NonNullable<
  Awaited<ReturnType<typeof createVisitor>>
>;
export type addToVisitorCartType = NonNullable<
  Awaited<ReturnType<typeof addToVisitorCart>>
>;

export type getWishlistType = NonNullable<
  Awaited<ReturnType<typeof getWishlist>>
>;

export type addToWishlistType = NonNullable<
  Awaited<ReturnType<typeof addWishlistCart>>
>;

export type getAddressType = NonNullable<
  Awaited<ReturnType<typeof getUserAddress>>
>;
