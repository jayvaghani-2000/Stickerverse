import { createSlice } from "@reduxjs/toolkit";
import { OAuthResponse } from "@supabase/supabase-js";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../index";

export type AuthType = {
  loading: boolean;
  authenticated: boolean;
  token: string;
  profile: OAuthResponse["data"];
  redirectTo: string;
  authCheck: boolean;
};

export const initialState = {
  loading: false,
  authenticated: false,
  token: "",
  profile: {} as OAuthResponse["data"],
  authCheck: false,
  redirectTo: "/",
} as AuthType;

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthData: (state, action: { payload: Partial<AuthType> }) => {
      Object.assign(state, action.payload);
    },
  },
});

const selectAuthentication = (state: RootState) => state.authentication;
export const useAuthStore = () => {
  const authentication = useSelector(selectAuthentication);
  return useMemo(() => authentication, [authentication]);
};
export const { setAuthData } = authenticationSlice.actions;
export default authenticationSlice.reducer;
