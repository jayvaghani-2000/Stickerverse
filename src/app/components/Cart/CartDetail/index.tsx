"use client";
import { useAuthStore } from "@/app/store/authentication";
import { useCartStore } from "@/app/store/cart";
import { useVisitorCartStore } from "@/app/store/visitorCart";
import { useState } from "react";
import Cart from "./Cart";
import PriceSummary from "./PriceSummary";
import Stepper from "./Stepper";

export enum activeStep {
  CART = "cart",
  ADDRESS = "address",
  PLACE_ORDER = "placeOrder",
}

const CartDetail = () => {
  const [currentStep, setCurrentStep] = useState(activeStep.CART);

  const { authenticated } = useAuthStore();
  const { cart } = useCartStore();
  const { cart: visitorCart } = useVisitorCartStore();

  const userCart = authenticated ? cart : visitorCart;

  return (
    <div className="my-[30px] sm:my-[60px]">
      <Stepper currentStep={currentStep} />

      <div className="grid grid-cols-6 gap-6 pt-[40px] md:pt-[60px] sm:px-5 md:px-[60px]">
        <Cart userCart={userCart} />
        <PriceSummary userCart={userCart} />
      </div>
    </div>
  );
};

export default CartDetail;
