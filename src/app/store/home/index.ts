import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./../../utils/tokenManager";
import { trendingStickerType } from "../../../../pages/api/types";
import store from "..";

export type HomePageData = {
  loading: boolean;
  trendingSticker: trendingStickerType;
};

export const initialState = {
  loading: false,
  trendingSticker: [] as trendingStickerType,
} as HomePageData;

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setTrendingSticker: (state, action: { payload: trendingStickerType }) => {
      state["trendingSticker"] = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      homeApi.endpoints.getTrendingSticker.matchPending,
      (state, { payload }) => {
        if (!state.loading) {
          state.loading = true;
        }
      }
    );
    builder.addMatcher(
      homeApi.endpoints.getTrendingSticker.matchFulfilled,
      (state, { payload }) => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      homeApi.endpoints.getTrendingSticker.matchRejected,
      (state, { payload }) => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
  },
});

export const homeApi = createApi({
  reducerPath: "homePageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders,
  }),
  tagTypes: ["Home"],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getTrendingSticker: builder.query({
      query: () => `/api/sticker/trending-sticker`,
      transformResponse: (response: { stickers: trendingStickerType }) => {
        if (response?.stickers) {
          store.dispatch(
            homeSlice.actions.setTrendingSticker(response.stickers)
          );
          return response;
        }
        return [];
      },
    }),
  }),
});

const selectHome = (state: RootState) => state.home;
export const useHomeStore = () => {
  const home = useSelector(selectHome);
  return useMemo(() => home, [home]);
};
export const { useGetTrendingStickerQuery, useLazyGetTrendingStickerQuery } =
  homeApi;

export const { setTrendingSticker } = homeSlice.actions;
export default homeSlice.reducer;
