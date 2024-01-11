import {
  addWishlistCart,
  deleteWishlistItems,
  getWishlist,
} from "../../models/wishlist";

export const handleGetUserWishlist = async (id: string) => {
  try {
    const wishlist = await getWishlist(id);
    return wishlist;
  } catch (err) {
    throw err;
  }
};

export const handleAddToWishlist = async (id: string, data: unknown) => {
  try {
    const wishlist = await addWishlistCart(id, data);
    return wishlist;
  } catch (err) {
    throw err;
  }
};

export const handleDeleteWishlistItem = async (id: string, data: unknown) => {
  try {
    const wishlist = await deleteWishlistItems(id, data);
    return wishlist;
  } catch (err) {
    throw err;
  }
};
