import Cart from "../components/Cart";
import WithHeader from "../components/HOC/withHeader";

const CartPage = () => {
  return (
    <WithHeader>
      <Cart />
    </WithHeader>
  );
};

export default CartPage;
