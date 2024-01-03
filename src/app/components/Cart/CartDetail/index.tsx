import { useCartStore } from "@/app/store/cart";
import { useVisitorCartStore } from "@/app/store/visitorCart";
import Stepper from "./Stepper";

const CartDetail = () => {
  const { cart } = useCartStore();
  const { cart: visitorCart } = useVisitorCartStore();

  return (
    <div className="my-[30px] sm:my-[60px]">
      <Stepper />

      {JSON.stringify(visitorCart)}
    </div>
  );
};

export default CartDetail;
