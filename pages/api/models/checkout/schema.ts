import { z } from "zod";

export type cartTotal = z.infer<typeof cartTotalSchema>;
export const cartTotalSchema = z.object({
  total: z.number(),
  addressId: z.string(),
});
