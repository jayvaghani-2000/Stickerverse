import { parentCategory } from "@prisma/client";
import { z } from "zod";

export enum LOCAL_STORE_KEY {
  CART = "cart",
}

export type LocalCart = z.infer<typeof LocalCartSchema>;
export const LocalCartSchema = z.array(
  z.object({
    type: z.enum([parentCategory.sticker, parentCategory.tshirt]),
    items: z.array(
      z.object({
        id: z.number(),
        quantity: z.number(),
        name: z.string(),
        price: z.number(),
        image: z.array(
          z.object({
            id: z.number(),
            url: z.string().startsWith(process.env.NEXT_PUBLIC_SUPABASE_URL!),
            blurUrl: z.string(),
            height: z.number(),
            width: z.number(),
            stickerId: z.number(),
          })
        ),
      })
    ),
  })
);
