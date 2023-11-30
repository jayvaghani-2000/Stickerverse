import { post as postSticker } from "../models/sticker";

export type addStickerType = NonNullable<
  Awaited<ReturnType<typeof postSticker>>
>;
