"use client";

import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Nova from "../Font/nova";
import Icon from "../Icon";
import Button from "../Shared/Button";

const OrderFail = () => {
  const params = useSearchParams();

  const orderId = params?.get("id");
  return (
    <div className="my-[40px] sm:my-[60px]">
      <div className="m-auto w-[200px] h-[200px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px]">
        <Icon name="paymentFail" className="w-full h-full" />
      </div>

      <Nova className="text-center">
        Payment received with gratitude and enthusiasm.
      </Nova>

      {params?.has("id") ? (
        <Typography
          variant="body2"
          className="text-center block text-placeholder  my-4"
        >
          Order ID: {orderId}
        </Typography>
      ) : null}

      <Button className="m-auto block bg-lightBlue hover:bg-lightBlue w-fit my-4">
        Browse More Stickers
      </Button>
    </div>
  );
};

export default OrderFail;
