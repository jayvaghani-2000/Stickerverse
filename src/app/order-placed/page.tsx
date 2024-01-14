"use client";
import WithHeader from "../components/HOC/withHeader";
import OrderSuccess from "../components/OrderSuccess";

const OrderPlacedPage = () => {
  return (
    <WithHeader>
      <OrderSuccess />
    </WithHeader>
  );
};

export default OrderPlacedPage;
