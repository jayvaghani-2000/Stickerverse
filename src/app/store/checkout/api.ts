import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Orders } from "razorpay/dist/types/orders";
import { prepareHeaders } from "./../../utils/tokenManager";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["checkout"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    initiateOrder: builder.mutation({
      query: (body: { total: number }) => ({
        url: `/api/checkout`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: { order: Orders.RazorpayOrder }) => {
        if (response?.order) {
          return response.order;
        }
        return {} as Orders.RazorpayOrder;
      },
    }),
  }),
});

export const { useInitiateOrderMutation } = checkoutApi;
