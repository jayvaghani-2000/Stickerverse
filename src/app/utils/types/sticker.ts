import { stickersType } from "../../../../pages/api/types";
import { SORT_BY } from "../enum";

export type stickers = {
  sticker: stickersType;
  page: number;
  pageSize: number;
  seenAll: boolean;
  filter: {
    category?: string[];
    price?: [number, number];
    sortBy?: SORT_BY;
  };
};
