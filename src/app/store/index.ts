import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { homeApi } from "./home/api";
import home from "./home";
import category from "./category";
import { categoryApi } from "./category/api";
import stickers from "./stickers";
import { stickerApi } from "./stickers/api";
import global from "./global";

const reducers = combineReducers({
  home,
  category,
  stickers,
  global,
  [homeApi.reducerPath]: homeApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [stickerApi.reducerPath]: stickerApi.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      homeApi.middleware,
      categoryApi.middleware,
      stickerApi.middleware
    ),
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
