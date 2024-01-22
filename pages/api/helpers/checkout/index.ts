import { handleInitiateOrder } from "../../models/checkout";
import { cartTotalSchema } from "../../models/checkout/schema";
import { razorPayInstance } from "../../utils/razorPayInstance";

export const handleInitiateCheckout = async (id: string, data: unknown) => {
  try {
    const payload = cartTotalSchema.parse(data);

    const order = await razorPayInstance.orders.create({
      amount: payload.total * 100, // amount in smallest unit of currency
      currency: "INR",
    });
    await handleInitiateOrder(id, order.id, payload.total, payload.addressId);
    return order;
  } catch (err) {
    throw err;
  }
};
