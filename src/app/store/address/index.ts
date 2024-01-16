import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getAddressType } from "../../../../pages/api/types";
import { RootState } from "../index";
import { addressApi } from "./api";

export type AddressType = {
  loading: boolean;
  address: getAddressType;
};

export const initialState = {
  loading: true,
  address: [] as getAddressType,
} as AddressType;

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressData: (state, action: { payload: Partial<AddressType> }) => {
      Object.assign(state, action.payload);
    },
    resetAddressData: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      addressApi.endpoints.addUserAddress.matchPending,
      state => {
        if (!state.loading) {
          state.loading = true;
        }
      }
    );
    builder.addMatcher(
      addressApi.endpoints.addUserAddress.matchFulfilled,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      addressApi.endpoints.addUserAddress.matchRejected,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      addressApi.endpoints.getUserAddress.matchPending,
      state => {
        if (!state.loading) {
          state.loading = true;
        }
      }
    );
    builder.addMatcher(
      addressApi.endpoints.getUserAddress.matchFulfilled,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(
      addressApi.endpoints.getUserAddress.matchRejected,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
  },
});

const selectAddress = (state: RootState) => state.address;
export const useAddressStore = () => {
  const address = useSelector(selectAddress);
  return useMemo(() => address, [address]);
};
export const { resetAddressData, setAddressData } = addressSlice.actions;
export default addressSlice.reducer;
