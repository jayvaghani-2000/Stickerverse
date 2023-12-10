import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./../../utils/tokenManager";
import { stickerCategoryType } from "../../../../pages/api/types";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders,
  }),
  tagTypes: ["Category"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getStickerCategory: builder.query({
      query: () => `/api/category/sticker`,
      transformResponse: (response: { category: stickerCategoryType }) => {
        if (response?.category) {
          return response.category;
        }
        return [];
      },
    }),
  }),
});

export const { useGetStickerCategoryQuery, useLazyGetStickerCategoryQuery } =
  categoryApi;
