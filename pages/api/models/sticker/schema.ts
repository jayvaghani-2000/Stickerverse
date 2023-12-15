import { z } from "zod";

export type AddProduct = z.infer<typeof AddProductSchema>;
export const AddProductSchema = z.object({
  productName: z.string(),
  price: z.number(),
  description: z.string(),
  offer: z.number(),
  categoryId: z.number(),
  trending: z.boolean(),
  slug: z.string(),
});

export type GetProduct = z.infer<typeof GetProductSchema>;
export const GetProductSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
});
