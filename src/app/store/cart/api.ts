import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCartData } from ".";
import store from "..";
import {
  AddToCart,
  DeleteCartItem,
} from "../../../../pages/api/models/cart/schema";
import { getCartType } from "../../../../pages/api/types";
import { prepareHeaders } from "./../../utils/tokenManager";

let controller: any;
controller = new AbortController();

let updateController: any;
updateController = new AbortController();

let removeController: any;
removeController = new AbortController();

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
      query: () => ({
        url: "/api/cart",
        method: "GET",
        signal: controller.signal,
      }),
      transformResponse: (response: { cart: getCartType }) => {
        if (response?.cart) {
          store.dispatch(setCartData({ cart: response.cart }));
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
        signal: updateController.signal,
      }),
      transformResponse: (response: { cart: getCartType }) => {
        if (response?.cart) {
          return response.cart;
        }
        return {} as getCartType;
      },
    }),
    removeFromToCart: builder.mutation({
      query: (body: DeleteCartItem) => ({
        url: `/api/cart`,
        method: "DELETE",
        body: body,
        signal: removeController.signal,
      }),
      transformResponse: (response: { success: boolean }) => {
        if (response?.success) {
          return response;
        }
        return { success: false };
      },
    }),
  }),
});

export const {
  useLazyGetUserCartQuery,
  useGetUserCartQuery,
  useAddToCartMutation,
  useRemoveFromToCartMutation,
} = cartApi;

export const abortGetCartApi = () => {
  controller.abort();
  controller = new AbortController();
};

export const abortUpdateCartApi = () => {
  updateController.abort();
  updateController = new AbortController();
};
export const abortRemoveCartApi = () => {
  removeController.abort();
  removeController = new AbortController();
};
