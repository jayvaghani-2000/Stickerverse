import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setVisitorCartData } from ".";
import store from "..";
import {
  AddToVisitorCart,
  DeleteVisitorCartItem,
} from "../../../../pages/api/models/visitor-cart/schema";
import {
  createVisitorType,
  getVisitorCartType,
} from "../../../../pages/api/types";
import { prepareHeaders } from "../../utils/tokenManager";

export const visitorCartApi = createApi({
  reducerPath: "visitorCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["visitorCart"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getVisitorCart: builder.query({
      query: ({ id }: { id: string }) => `/api/visitor-cart/${id}`,
      transformResponse: (response: { cart: getVisitorCartType }) => {
        if (response?.cart) {
          store.dispatch(setVisitorCartData({ cart: response.cart }));
          return response.cart;
        }
        return [] as getVisitorCartType;
      },
    }),
    createVisitorCart: builder.mutation({
      query: () => ({
        url: `/api/visitor-cart`,
        method: "POST",
      }),
      transformResponse: (response: { data: createVisitorType }) => {
        if (response?.data) {
          store.dispatch(
            setVisitorCartData({ visitorCartId: response.data.id })
          );
          return response.data;
        }
        return {} as createVisitorType;
      },
    }),
    addToVisitorCart: builder.mutation({
      query: ({ id, body }: { id: string; body: AddToVisitorCart }) => ({
        url: `/api/visitor-cart/${id}`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: { cart: getVisitorCartType }) => {
        if (response?.cart) {
          return response.cart;
        }
        return {} as getVisitorCartType;
      },
    }),
    removeFromToVisitorCart: builder.mutation({
      query: ({
        cartId,
        body,
      }: {
        cartId: string;
        body: DeleteVisitorCartItem;
      }) => ({
        url: `/api/visitor-cart/${cartId}`,
        method: "DELETE",
        body: body,
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
  useAddToVisitorCartMutation,
  useCreateVisitorCartMutation,
  useLazyGetVisitorCartQuery,
  useRemoveFromToVisitorCartMutation,
} = visitorCartApi;
