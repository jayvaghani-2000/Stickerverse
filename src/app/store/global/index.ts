import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../index";

export type GlobalData = {
  showLogin: boolean;
  toast: { show: boolean; message: string; type: AlertColor };
};

export const initialState = {
  showLogin: false,
  toast: { show: false, message: "", type: "success" },
} as GlobalData;

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalData: (state, action: { payload: Partial<GlobalData> }) => {
      Object.assign(state, action.payload);
    },
  },
});

const selectGlobal = (state: RootState) => state.global;
export const useGlobalStore = () => {
  const global = useSelector(selectGlobal);
  return useMemo(() => global, [global]);
};
export const { setGlobalData } = globalSlice.actions;
export default globalSlice.reducer;
