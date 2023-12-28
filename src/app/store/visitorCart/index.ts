import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getVisitorCartType } from "../../../../pages/api/types";
import { RootState } from "../index";
import { visitorCartApi } from "./api";

export type VisitorCartType = {
  loading: boolean;
  visitorCartId?: string;
  cart: getVisitorCartType;
};

export const initialState = {
  loading: false,
  cart: {} as getVisitorCartType,
  visitorCartId: undefined,
} as VisitorCartType;

export const visitorCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setVisitorCartData: (
      state,
      action: { payload: Partial<VisitorCartType> }
    ) => {
      Object.assign(state, action.payload);
    },
    resetVisitorCartData: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      visitorCartApi.endpoints.createVisitorCart.matchPending,
      state => {
        if (!state.loading) {
          state.loading = true;
        }
      }
    );
    builder.addMatcher(
      visitorCartApi.endpoints.createVisitorCart.matchFulfilled,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      visitorCartApi.endpoints.createVisitorCart.matchRejected,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
  },
});

const selectVisitorCart = (state: RootState) => state.visitorCart;
export const useVisitorCartStore = () => {
  const cart = useSelector(selectVisitorCart);
  return useMemo(() => cart, [cart]);
};
export const { setVisitorCartData, resetVisitorCartData } =
  visitorCartSlice.actions;
export default visitorCartSlice.reducer;
