import {
  addToCart,
  deleteCartItems,
  getCart,
  updateCartItems,
} from "../../models/cart";

export const handleGetUserCart = async (id: string) => {
  try {
    const cart = await getCart(id);
    return cart;
  } catch (err) {
    throw err;
  }
};

export const handleAddToCart = async (id: string, data: unknown) => {
  try {
    const cart = await addToCart(id, data);
    return cart;
  } catch (err) {
    throw err;
  }
};
export const handleUpdateCart = async (id: string, data: unknown) => {
  try {
    const cart = await updateCartItems(id, data);
    return cart;
  } catch (err) {
    throw err;
  }
};
export const handleDeleteCartItem = async (id: string, data: unknown) => {
  try {
    const cart = await deleteCartItems(id, data);
    return cart;
  } catch (err) {
    throw err;
  }
};
