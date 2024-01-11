import { z } from "zod";

export type AddToWishlist = z.infer<typeof AddToWishlistSchema>;
export const AddToWishlistSchema = z.object({
  stickerIds: z.array(z.number()),
});

export type DeleteWishlistItem = z.infer<typeof DeleteWishlistItemSchema>;
export const DeleteWishlistItemSchema = z.object({
  stickerIds: z.array(z.number()),
});
