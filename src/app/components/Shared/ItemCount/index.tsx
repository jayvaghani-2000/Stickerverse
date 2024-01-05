import { Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Icon from "../../Icon";

const ItemCount = ({
  quantity,
  setQuantity,
  disable = false,
}: {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  disable?: boolean;
}) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => {
          setQuantity(prev => (prev === 1 ? 1 : prev - 1));
        }}
        disabled={disable}
        className="border-[1px] border-black bg-white px-[6px] h-[24px] md:h-[30px] disabled:cursor-not-allowed"
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
        disabled={disable}
        className="border-[1px] border-black bg-white px-[6px] h-[24px] md:h-[30px] disabled:cursor-not-allowed"
      >
        <Icon name="plus" className="h-[10px]" />
      </button>
    </div>
  );
};

export default ItemCount;
