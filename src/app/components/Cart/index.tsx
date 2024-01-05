"use client";
import { useAuthStore } from "@/app/store/authentication";
import { useCartStore } from "@/app/store/cart";
import { useVisitorCartStore } from "@/app/store/visitorCart";
import CartDetail from "./CartDetail";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { authenticated } = useAuthStore();
  const { cart } = useCartStore();
  const { cart: visitorCart } = useVisitorCartStore();

  const activeCart = authenticated ? cart : visitorCart;

  return activeCart.length > 0 ? <CartDetail /> : <EmptyCart />;
};

export default Cart;
