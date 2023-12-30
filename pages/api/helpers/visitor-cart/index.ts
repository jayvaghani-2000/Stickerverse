import {
  addToVisitorCart,
  cleanupVisitorCart,
  convertVisitorCart,
  createVisitor,
  getVisitorCart,
  getVisitorItemCart,
} from "../../models/visitor-cart";

export const handleVisitorUserCart = async (id: string) => {
  try {
    const [cart, visitorCart] = await Promise.all([
      getVisitorItemCart(id),
      getVisitorCart(id),
    ]);
    if (visitorCart) {
      return cart;
    } else {
      throw new Error("Cart not found!");
    }
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

export const handleConvertVisitorToUserCart = async (
  id: string,
  visitorId: string
) => {
  try {
    const cart = await convertVisitorCart(id, visitorId);

    return cart;
  } catch (err) {
    throw err;
  }
};
