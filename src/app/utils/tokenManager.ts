import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

export const prepareHeaders = (
  headers: Headers,
  api: Pick<BaseQueryApi, "getState" | "extra" | "endpoint" | "type" | "forced">
) => {
  const getStore = api.getState() as RootState;
  const token = getStore.authentication.token;
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-type", "application/json");
  return headers;
};
