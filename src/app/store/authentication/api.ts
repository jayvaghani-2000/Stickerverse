import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userByIdType } from "../../../../pages/api/types";
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
        return {};
      },
    }),
  }),
});

export const { useLazyGetUserByIdQuery } = authApi;
