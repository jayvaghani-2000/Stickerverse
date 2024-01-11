import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getWishlistType } from "../../../../pages/api/types";
import { RootState } from "../index";
import { wishlistApi } from "./api";

export type WishlistType = {
  loading: boolean;
  wishlist: getWishlistType;
};

export const initialState = {
  loading: false,
  wishlist: {} as getWishlistType,
} as WishlistType;

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistData: (state, action: { payload: Partial<WishlistType> }) => {
      Object.assign(state, action.payload);
    },
    resetWishlistData: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      wishlistApi.endpoints.addToWishlist.matchPending,
      state => {
        if (!state.loading) {
          state.loading = true;
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.addToWishlist.matchFulfilled,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.addToWishlist.matchRejected,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.getUserWishlist.matchPending,
      state => {
        if (!state.loading) {
          state.loading = true;
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.getUserWishlist.matchFulfilled,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.getUserWishlist.matchRejected,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.removeFromWishlist.matchPending,
      state => {
        if (!state.loading) {
          state.loading = true;
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.removeFromWishlist.matchFulfilled,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.removeFromWishlist.matchRejected,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
  },
});

const selectWishlist = (state: RootState) => state.wishlist;
export const useCartStore = () => {
  const wishlist = useSelector(selectWishlist);
  return useMemo(() => wishlist, [wishlist]);
};
export const { setWishlistData, resetWishlistData } = wishlistSlice.actions;
export default wishlistSlice.reducer;
