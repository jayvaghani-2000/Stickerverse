import React, { useState } from "react";
import Icon from "../Icon";
import { Typography } from "@mui/material";

const ItemCount = () => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="flex justify-center items-center mt-1">
      <button
        onClick={() => {
          setQuantity(prev => (prev === 0 ? 0 : prev - 1));
        }}
      >
        <Icon name="minus" className="h-[17px] sm:h-[24px] md:h-[30px]" />
      </button>
      <Typography
        variant="subtitle2"
        className="w-[22px] sm:w-[28px] md:w-[34px] bg-white sm:py-[2px] md:py-[2.75px] font-normal text-center border-t-[1px] border-b-[1px] border-black"
      >
        {quantity}
      </Typography>
      <button
        onClick={() => {
          setQuantity(prev => (prev === 99 ? 99 : prev + 1));
        }}
      >
        <Icon name="plus" className="h-[17px] sm:h-6 md:h-[30px]" />
      </button>
    </div>
  );
};

export default ItemCount;
