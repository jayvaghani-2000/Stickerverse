"use client";
import { useAppSelector } from "@/app/store";
import CartDetail from "./CartDetail";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { visitorCart, cart, authenticated } = useAppSelector(store => ({
    cart: store.cart.cart,
    visitorCart: store.visitorCart.cart,
    authenticated: store.authentication.authenticated,
  }));
  const activeCart = authenticated ? cart : visitorCart;

  return activeCart.length > 0 ? <CartDetail /> : <EmptyCart />;
};

export default Cart;
