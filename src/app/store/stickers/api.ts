import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./../../utils/tokenManager";
import { stickersCountType, stickersType } from "../../../../pages/api/types";

type query = {
  page: number;
  pageSize: number;
  totalPage: number;
  category: string;
  price: string;
  sortBy: string;
};

export const stickerApi = createApi({
  reducerPath: "stickerPageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders,
  }),
  tagTypes: ["Sticker"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getSticker: builder.query({
      query: ({ page, pageSize, totalPage, category, price, sortBy }: query) =>
        `/api/sticker?page=${page}&pageSize=${pageSize}&totalPage=${totalPage}&category=${category}&price=${price}&sortBy=${sortBy}`,
      transformResponse: (response: { data: stickersType }) => {
        if (response?.data) {
          return response.data;
        }
        return [];
      },
    }),
    getStickerCount: builder.query({
      query: ({ page, pageSize, totalPage, category, price, sortBy }: query) =>
        `/api/sticker/count?page=${page}&pageSize=${pageSize}&totalPage=${totalPage}&category=${category}&price=${price}&sortBy=${sortBy}`,
      transformResponse: (response: { data: stickersCountType }) => {
        if (response?.data) {
          return response.data;
        }
        return { count: 0 } as stickersCountType;
      },
    }),
  }),
});

export const {
  useGetStickerQuery,
  useLazyGetStickerQuery,
  useGetStickerCountQuery,
  useLazyGetStickerCountQuery,
} = stickerApi;
