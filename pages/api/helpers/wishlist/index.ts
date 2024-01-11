import { getWishlist } from "../../models/wishlist";

export const handleGetUserCart = async (id: string) => {
  try {
    const cart = await getWishlist(id);
    return cart;
  } catch (err) {
    throw err;
  }
};
