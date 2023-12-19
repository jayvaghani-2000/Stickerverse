import React, { useState } from "react";
import Icon from "../../Icon";
import { Typography } from "@mui/material";

const ItemCount = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex justify-center items-center  mt-1 sm:mt-2 md:mt-3">
      <button
        onClick={() => {
          setQuantity(prev => (prev === 1 ? 1 : prev - 1));
        }}
        className="border-[1px] border-black bg-white px-[6px] h-[24px] md:h-[30px]"
      >
        <Icon name="minus" className="h-[10px]" />
      </button>
      <Typography
        variant="subtitle2"
        className="w-[22px] sm:w-[28px] md:w-[34px] bg-white py-[3.5px] sm:py-[2px] md:py-[2.75px] font-normal text-center border-t-[1px] border-b-[1px] border-black"
      >
        {quantity}
      </Typography>
      <button
        onClick={() => {
          setQuantity(prev => (prev === 99 ? 99 : prev + 1));
        }}
        className="border-[1px] border-black bg-white px-[6px] h-[24px] md:h-[30px]"
      >
        <Icon name="plus" className="h-[10px]" />
      </button>
    </div>
  );
};

export default ItemCount;
