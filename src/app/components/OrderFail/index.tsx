"use client";

import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Nova from "../Font/nova";
import Icon from "../Icon";
import Button from "../Shared/Button";

const OrderFail = () => {
  const params = useSearchParams();

  const orderId = params?.get("order_id");
  const paymentId = params?.get("payment_id");
  return (
    <div className="my-[40px] sm:my-[60px]">
      <div className="m-auto w-[200px] h-[200px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px]">
        <Icon name="paymentFail" className="w-full h-full" />
      </div>

      <Typography variant="body2" className="text-center block   my-4">
        Payment was unsuccessful due to a temporary issue. If amount got
        deducted, it will be refunded within 5-7 working days.
      </Typography>

      {params?.has("order_id") ? (
        <Typography
          variant="body2"
          className="text-center block text-placeholder  mt-4"
        >
          Order ID: {orderId}
        </Typography>
      ) : null}
      {params?.has("payment_id") ? (
        <Typography
          variant="body2"
          className="text-center block text-placeholder  mt-2 mb-4"
        >
          Payment ID: {paymentId}
        </Typography>
      ) : null}

      <Nova className="text-center">
        {`Shop like there's no tomorrow, and pay when you're ready.`}
      </Nova>

      <Button className="m-auto block bg-lightBlue hover:bg-lightBlue w-fit my-4">
        Browse More Stickers
      </Button>
    </div>
  );
};

export default OrderFail;
