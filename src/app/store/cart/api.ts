import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddToCart } from "../../../../pages/api/models/cart/schema";
import { getCartType } from "../../../../pages/api/types";
import { prepareHeaders } from "./../../utils/tokenManager";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Cart"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getUserCart: builder.query({
      query: () => `/api/cart`,
      transformResponse: (response: { cart: getCartType }) => {
        if (response?.cart) {
          return response.cart;
        }
        return {} as getCartType;
      },
    }),
    addToCart: builder.mutation({
      query: (body: AddToCart) => ({
        url: `/api/cart`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: { cart: getCartType }) => {
        if (response?.cart) {
          return response.cart;
        }
        return {} as getCartType;
      },
    }),
  }),
});

export const { useLazyGetUserCartQuery, useAddToCartMutation } = cartApi;
