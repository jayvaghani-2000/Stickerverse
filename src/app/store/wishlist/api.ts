import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setWishlistData } from ".";
import store from "..";
import {
  AddToWishlist,
  DeleteWishlistItem,
} from "../../../../pages/api/models/wishlist/schema";
import {
  addToWishlistType,
  getWishlistType,
} from "../../../../pages/api/types";
import { prepareHeaders } from "./../../utils/tokenManager";

let controller: any;
controller = new AbortController();

let updateController: any;
updateController = new AbortController();

let removeController: any;
removeController = new AbortController();

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Wishlist"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getUserWishlist: builder.query({
      query: () => ({
        url: "/api/wishlist",
        method: "GET",
        signal: controller.signal,
      }),
      transformResponse: (response: { wishlist: getWishlistType }) => {
        if (response?.wishlist) {
          store.dispatch(setWishlistData({ wishlist: response.wishlist }));
          return response.wishlist;
        }
        return {} as getWishlistType;
      },
    }),
    addToWishlist: builder.mutation({
      query: (body: AddToWishlist) => ({
        url: `/api/wishlist`,
        method: "POST",
        body: body,
        signal: updateController.signal,
      }),
      transformResponse: (response: { wishlist: addToWishlistType }) => {
        if (response?.wishlist) {
          return response.wishlist;
        }
        return {} as addToWishlistType;
      },
    }),
    removeFromWishlist: builder.mutation({
      query: (body: DeleteWishlistItem) => ({
        url: `/api/wishlist`,
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
  useLazyGetUserWishlistQuery,
  useGetUserWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;

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
