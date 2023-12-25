import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getCartType } from "../../../../pages/api/types";
import { RootState } from "../index";
import { cartApi } from "./api";

export type CartType = {
  loading: boolean;
  cart: getCartType;
};

export const initialState = {
  loading: false,
  cart: {} as getCartType,
} as CartType;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action: { payload: Partial<CartType> }) => {
      Object.assign(state, action.payload);
    },
    resetCartData: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(cartApi.endpoints.getUserCart.matchPending, state => {
      if (!state.loading) {
        state.loading = true;
      }
    });
    builder.addMatcher(cartApi.endpoints.getUserCart.matchFulfilled, state => {
      if (state.loading) {
        state.loading = false;
      }
    });
    builder.addMatcher(cartApi.endpoints.getUserCart.matchRejected, state => {
      if (state.loading) {
        state.loading = false;
      }
    });
  },
});

const selectCart = (state: RootState) => state.cart;
export const useCartStore = () => {
  const cart = useSelector(selectCart);
  return useMemo(() => cart, [cart]);
};
export const { setCartData, resetCartData } = cartSlice.actions;
export default cartSlice.reducer;
