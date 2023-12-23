import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  updateUserPasswordType,
  userByIdType,
} from "../../../../pages/api/types";
import { prepareHeaders } from "./../../utils/tokenManager";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders,
  }),
  tagTypes: ["User"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getUserById: builder.query({
      query: ({ id }: { id: string }) => `/api/user/${id}`,
      transformResponse: (response: { data: userByIdType }) => {
        if (response?.data) {
          return response.data;
        }
        return {} as userByIdType;
      },
    }),
    updateUserPassword: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/api/user/${id}`,
        method: "PUT",
      }),
      transformResponse: (response: { data: updateUserPasswordType }) => {
        if (response?.data) {
          return response.data;
        }
        return {} as updateUserPasswordType;
      },
    }),
  }),
});

export const { useLazyGetUserByIdQuery, useUpdateUserPasswordMutation } =
  authApi;
