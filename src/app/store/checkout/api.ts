import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Orders } from "razorpay/dist/types/orders";
import { prepareHeaders } from "./../../utils/tokenManager";
import { cartTotal } from "../../../../pages/api/models/checkout/schema";

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
      query: (body: cartTotal) => ({
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
    paymentFailed: builder.mutation({
      query: (body: { order_id: string; payment_id: string }) => ({
        url: `/api/checkout/payment-failed`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: { success: boolean }) => {
        if (response?.success) {
          return response.success;
        }
        return false;
      },
    }),
  }),
});

export const { useInitiateOrderMutation, usePaymentFailedMutation } =
  checkoutApi;
