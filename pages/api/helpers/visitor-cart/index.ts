import {
  addToVisitorCart,
  cleanupVisitorCart,
  createVisitor,
  getVisitorCart,
} from "../../models/visitor-cart";

export const handleVisitorUserCart = async (id: string) => {
  try {
    const cart = await getVisitorCart(id);
    return cart;
  } catch (err) {
    throw err;
  }
};

export const handleCreateVisitorCart = async () => {
  try {
    const cart = await createVisitor();
    return cart;
  } catch (err) {
    throw err;
  }
};

export const handleAddToVisitorCart = async (id: string, data: unknown) => {
  try {
    const cart = await addToVisitorCart(id, data);
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
