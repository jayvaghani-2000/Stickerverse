import { post as postSticker } from "../models/product";

export type addStickerType = NonNullable<
  Awaited<ReturnType<typeof postSticker>>
>;
