import { parentCategory } from "@prisma/client";
import { z } from "zod";

export type AddStickerCategory = z.infer<typeof AddCategorySchema>;
export const AddCategorySchema = z.object({
  categoryName: z.string(),
  parent: z.enum([parentCategory.sticker, parentCategory.tshirt]),
});
