import { addToCart, cleanupVisitorCart, getCart } from "../../models/cart";

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

export const handleCleanupVisitorCart = async () => {
  try {
    const cart = await cleanupVisitorCart();
    return cart;
  } catch (err) {
    throw err;
  }
};
