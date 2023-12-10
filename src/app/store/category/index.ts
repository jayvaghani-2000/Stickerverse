import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { stickerCategoryType } from "../../../../pages/api/types";
import { categoryApi } from "./api";

export type CategoryData = {
  loading: boolean;
  stickerCategory: stickerCategoryType;
};

export const initialState = {
  loading: false,
  stickerCategory: [] as stickerCategoryType,
} as CategoryData;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategorySticker: (state, action: { payload: stickerCategoryType }) => {
      state["stickerCategory"] = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      categoryApi.endpoints.getStickerCategory.matchPending,
      state => {
        if (!state.loading) {
          state.loading = true;
        }
      }
    );
    builder.addMatcher(
      categoryApi.endpoints.getStickerCategory.matchFulfilled,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      categoryApi.endpoints.getStickerCategory.matchRejected,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
  },
});

const selectCategory = (state: RootState) => state.category;
export const useCategoryStore = () => {
  const category = useSelector(selectCategory);
  return useMemo(() => category, [category]);
};
export const { setCategorySticker } = categorySlice.actions;
export default categorySlice.reducer;
