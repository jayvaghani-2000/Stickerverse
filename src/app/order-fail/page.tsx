"use client";
import WithHeader from "../components/HOC/withHeader";
import OrderFail from "../components/OrderFail";

const OrderFailPage = () => {
  return (
    <WithHeader>
      <OrderFail />
    </WithHeader>
  );
};

export default OrderFailPage;
