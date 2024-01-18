"use client";
import { useAuthStore } from "@/app/store/authentication";
import { useCartStore } from "@/app/store/cart";
import { useLazyGetUserCartQuery } from "@/app/store/cart/api";
import { useVisitorCartStore } from "@/app/store/visitorCart";
import { useEffect, useState } from "react";
import Address from "./Address";
import Cart from "./Cart";
import ConfirmOrder from "./ConfirmOrder";
import PriceSummary from "./PriceSummary";
import Stepper from "./Stepper";

export enum activeStep {
  CART = "cart",
  ADDRESS = "address",
  PLACE_ORDER = "placeOrder",
}

const CartDetail = () => {
  const [currentStep, setCurrentStep] = useState(activeStep.CART);
  const [shippingAddress, setShippingAddress] = useState("");
  const { authenticated } = useAuthStore();
  const { cart } = useCartStore();
  const [getCart, { isSuccess }] = useLazyGetUserCartQuery();
  const { cart: visitorCart } = useVisitorCartStore();

  const handleUpdateCurrentStep = (step: activeStep) => {
    setCurrentStep(step);
  };

  const userCart = authenticated ? cart : visitorCart;

  useEffect(() => {
    if (currentStep === activeStep.PLACE_ORDER) {
      getCart({});
    }
  }, [currentStep]);

  return (
    <div className="my-[30px] sm:my-[60px]">
      <Stepper currentStep={currentStep} />

      <div className="grid grid-cols-9 gap-6 pt-[40px] md:pt-[60px] sm:px-5 lg:px-[60px]">
        {currentStep === activeStep.CART ? <Cart userCart={userCart} /> : null}
        {currentStep === activeStep.ADDRESS ? (
          <Address
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
          />
        ) : null}
        {currentStep === activeStep.PLACE_ORDER ? (
          <ConfirmOrder
            shippingAddress={shippingAddress}
            handleUpdateCurrentStep={handleUpdateCurrentStep}
          />
        ) : null}
        <PriceSummary
          userCart={userCart}
          handleUpdateCurrentStep={handleUpdateCurrentStep}
          currentStep={currentStep}
          shippingAddress={shippingAddress}
          isSuccess={isSuccess}
        />
      </div>
    </div>
  );
};

export default CartDetail;
