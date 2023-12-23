import { createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../index";
import { authApi } from "./api";

export type AuthType = {
  loading: boolean;
  authenticated: boolean;
  token: string;
  profile: User;
  redirectTo: string;
  authCheck: boolean;
};

export const initialState = {
  loading: false,
  authenticated: false,
  token: "",
  profile: {} as User,
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
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.getUserById.matchPending, state => {
      if (!state.loading) {
        state.loading = true;
      }
    });
    builder.addMatcher(authApi.endpoints.getUserById.matchFulfilled, state => {
      if (state.loading) {
        state.loading = false;
      }
    });
    builder.addMatcher(authApi.endpoints.getUserById.matchRejected, state => {
      if (state.loading) {
        state.loading = false;
      }
    });
  },
});

const selectAuthentication = (state: RootState) => state.authentication;
export const useAuthStore = () => {
  const authentication = useSelector(selectAuthentication);
  return useMemo(() => authentication, [authentication]);
};
export const { setAuthData } = authenticationSlice.actions;
export default authenticationSlice.reducer;
