import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import address from "./address";
import { addressApi } from "./address/api";
import authentication from "./authentication";
import { authApi } from "./authentication/api";
import cart from "./cart";
import { cartApi } from "./cart/api";
import category from "./category";
import { categoryApi } from "./category/api";
import { checkoutApi } from "./checkout/api";
import global from "./global";
import home from "./home";
import { homeApi } from "./home/api";
import stickers from "./stickers";
import { stickerApi } from "./stickers/api";
import visitorCart from "./visitorCart";
import { visitorCartApi } from "./visitorCart/api";
import wishlist from "./wishlist";
import { wishlistApi } from "./wishlist/api";

const reducers = combineReducers({
  home,
  category,
  stickers,
  global,
  authentication,
  cart,
  visitorCart,
  wishlist,
  address,
  [cartApi.reducerPath]: cartApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [stickerApi.reducerPath]: stickerApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [visitorCartApi.reducerPath]: visitorCartApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [checkoutApi.reducerPath]: checkoutApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
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
      stickerApi.middleware,
      authApi.middleware,
      cartApi.middleware,
      visitorCartApi.middleware,
      wishlistApi.middleware,
      checkoutApi.middleware,
      addressApi.middleware
    ),
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
