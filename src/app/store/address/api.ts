import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAddressData } from ".";
import store from "..";
import { AddAddress } from "../../../../pages/api/models/address/schema";
import { getAddressType } from "../../../../pages/api/types";
import { prepareHeaders } from "./../../utils/tokenManager";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Address"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getUserAddress: builder.query({
      query: () => ({
        url: "/api/address",
        method: "GET",
      }),
      transformResponse: (response: { addresses: getAddressType }) => {
        if (response?.addresses) {
          store.dispatch(setAddressData({ address: response.addresses }));

          return response.addresses;
        }
        return {} as getAddressType;
      },
    }),
    addUserAddress: builder.mutation({
      query: (body: AddAddress) => ({
        url: `/api/address`,
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

export const { useAddUserAddressMutation, useGetUserAddressQuery } = addressApi;
