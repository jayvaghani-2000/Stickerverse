import { post as postSticker, trendingSticker } from "../models/sticker";

export type addStickerType = NonNullable<
  Awaited<ReturnType<typeof postSticker>>
>;
export type trendingStickerType = NonNullable<
  Awaited<ReturnType<typeof trendingSticker>>
>;
