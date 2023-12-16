import React, { useState } from "react";
import { Slider, Typography, styled } from "@mui/material";
import UnderlineButton from "../../Shared/Button/UnderlineButton";
import Icon from "../../Icon";

const PrettoSlider = styled(Slider)({
  color: "#000",
  height: 4,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
});

const Range = () => {
  const [value, setValue] = useState<number[]>([39, 100]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className="sm:min-w-[300px] ">
      <Typography variant="h6" className="px-[15px] pt-[10px]">
        Price
      </Typography>
      <div className="px-[15px] py-[10px] border-b-2 border-black">
        <div className="flex justify-between items-center">
          <Typography variant="body2">250 results</Typography>
          <div className="flex gap-2">
            <UnderlineButton>Clear</UnderlineButton>
          </div>
        </div>
      </div>
      <div className="px-[15px] py-[20px] flex flex-col gap-3 sm:gap-4 md:gap-5">
        <div className="flex gap-3">
          <div className="flex justify-center items-start gap-[2px] sm:gap-1 flex-1 border-2 border-black px-[15px] py-2">
            <Icon name="rupee" className="h-[8px] sm:h-[14px] md:h-[16px]" />
            <Typography variant="body1" className="text-start leading-none	">
              {value[0]}
            </Typography>
          </div>
          <div className="flex justify-center items-start gap-[2px] sm:gap-1 flex-1 border-2 border-black px-[15px] py-2">
            <Icon name="rupee" className="h-[8px] sm:h-[14px] md:h-[16px]" />
            <Typography variant="body1" className="text-start leading-none	">
              {value[1]}
            </Typography>
          </div>
        </div>
        <PrettoSlider
          max={599}
          min={39}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Range;
