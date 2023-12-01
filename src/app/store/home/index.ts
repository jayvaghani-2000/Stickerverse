import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { trendingStickerType } from "../../../../pages/api/types";
import { homeApi } from "./api";

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

const selectHome = (state: RootState) => state.home;
export const useHomeStore = () => {
  const home = useSelector(selectHome);
  return useMemo(() => home, [home]);
};

export const { setTrendingSticker } = homeSlice.actions;
export default homeSlice.reducer;
