import { getStickerDetails } from "actions/(public)/stickers/getStickerDetail";

export type getStickerDetailType = NonNullable<
  Awaited<ReturnType<typeof getStickerDetails>>
>;
