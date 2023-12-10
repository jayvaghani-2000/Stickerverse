import { z } from "zod";

export type AddStickerCategory = z.infer<typeof AddStickerCategorySchema>;
export const AddStickerCategorySchema = z.object({
  categoryName: z.string(),
});
