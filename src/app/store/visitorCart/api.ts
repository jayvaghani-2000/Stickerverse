import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setVisitorCartData } from ".";
import store from "..";
import { AddToVisitorCart } from "../../../../pages/api/models/visitor-cart/schema";
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
    getVisitorCart: builder.mutation({
      query: ({ id }: { id: string }) => `/api/visitor-cart/${id}`,
      transformResponse: (response: { cart: getVisitorCartType }) => {
        if (response?.cart) {
          return response.cart;
        }
        return [] as getVisitorCartType;
      },
    }),
    createVisitorCart: builder.mutation({
      query: () => `/api/visitor-cart`,
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
        url: `/api/cart/${id}`,
        method: "PUT",
        body: body,
      }),
      transformResponse: (response: { cart: getVisitorCartType }) => {
        if (response?.cart) {
          return response.cart;
        }
        return {} as getVisitorCartType;
      },
    }),
  }),
});

export const { useAddToVisitorCartMutation, useCreateVisitorCartMutation } =
  visitorCartApi;
