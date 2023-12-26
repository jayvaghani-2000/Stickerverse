import { z } from "zod";

export type AddToCart = z.infer<typeof AddToCartSchema>;
export const AddToCartSchema = z.object({
  quantity: z.number(),
  stickerId: z.number(),
});