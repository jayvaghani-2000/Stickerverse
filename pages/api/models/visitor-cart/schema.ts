import { z } from "zod";

export type AddToVisitorCart = z.infer<typeof AddToVisitorCartSchema>;
export const AddToVisitorCartSchema = z.object({
  quantity: z.number(),
  stickerId: z.number(),
});
