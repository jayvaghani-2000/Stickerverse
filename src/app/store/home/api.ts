import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./../../utils/tokenManager";
import { trendingStickerType } from "../../../../pages/api/types";
import store from "..";
import { setTrendingSticker } from ".";

export const homeApi = createApi({
  reducerPath: "homePageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders,
  }),
  tagTypes: ["Home"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getTrendingSticker: builder.query({
      query: () => `/api/sticker/trending-sticker`,
      transformResponse: (response: { stickers: trendingStickerType }) => {
        if (response?.stickers) {
          store.dispatch(setTrendingSticker(response.stickers));
          return response;
        }
        return [];
      },
    }),
  }),
});

export const { useGetTrendingStickerQuery, useLazyGetTrendingStickerQuery } =
  homeApi;
