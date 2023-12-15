import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./../../utils/tokenManager";
import { stickersType, trendingStickerType } from "../../../../pages/api/types";

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
      query: ({ page, pageSize }: { page: number; pageSize: number }) =>
        `/api/sticker?page=${page}&pageSize=${pageSize}`,
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
