import { z } from "zod";

export type AddImage = z.infer<typeof AddImageSchema>;
export const AddImageSchema = z.object({
  url: z.string(),
  blurUrl: z.string(),
  height: z.number(),
  width: z.number(),
  stickerId: z.number(),
  userId: z.string().uuid(),
});

export type ProductImage = z.input<typeof ProductImageSchema>;
export const ProductImageSchema = AddImageSchema.omit({ userId: true });
