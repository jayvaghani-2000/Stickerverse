import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./../../utils/tokenManager";
import { stickersType } from "../../../../pages/api/types";

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
      query: ({
        page,
        pageSize,
        totalPage,
        category,
        price,
        sortBy,
      }: {
        page: number;
        pageSize: number;
        totalPage: number;
        category: string;
        price: string;
        sortBy: string;
      }) =>
        `/api/sticker?page=${page}&pageSize=${pageSize}&totalPage=${totalPage}&category=${category}&price=${price}&sortBy=${sortBy}`,
      transformResponse: (response: { data: stickersType }) => {
        if (response?.data) {
          return response.data;
        }
        return [];
      },
    }),
  }),
});

export const { useGetStickerQuery, useLazyGetStickerQuery } = stickerApi;
