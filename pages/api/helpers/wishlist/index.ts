import {
  addWishlistCart,
  deleteWishlistItems,
  getWishlist,
} from "../../models/wishlist";

export const handleGetUserWishlist = async (id: string) => {
  try {
    const cart = await getWishlist(id);
    return cart;
  } catch (err) {
    throw err;
  }
};

export const handleAddToWishlist = async (id: string, data: unknown) => {
  try {
    const cart = await addWishlistCart(id, data);
    return cart;
  } catch (err) {
    throw err;
  }
};

export const handleDeleteWishlistItem = async (id: string, data: unknown) => {
  try {
    const cart = await deleteWishlistItems(id, data);
    return cart;
  } catch (err) {
    throw err;
  }
};
