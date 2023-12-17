import { Slider, Typography, styled } from "@mui/material";
import UnderlineButton from "../../Shared/Button/UnderlineButton";
import Icon from "../../Icon";
import { useAppDispatch } from "@/app/store";
import { setStickerData, useStickerStore } from "@/app/store/stickers";
import { useGetStickerCountQuery } from "@/app/store/stickers/api";
import InlineSpinner from "../../Shared/InlineSpinner";
import { debounce } from "lodash";
import { useCallback, useRef, useState } from "react";

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

const DefaultRange: [number, number] = [0, 100];

const Range = () => {
  const dispatch = useAppDispatch();
  const { filter, pageSize } = useStickerStore();
  const { price, category } = filter;
  const initialRange = price ? price : DefaultRange;
  const [range, setRange] = useState<[number, number]>(initialRange);
  const ref = useRef<[number, number]>(initialRange);

  const { data, isFetching } = useGetStickerCountQuery({
    page: 1,
    pageSize,
    category: JSON.stringify(category),
    price: price ? JSON.stringify(price) : JSON.stringify([]),
    sortBy: "",
    totalPage: 0,
  });

  const handleDelayedChange = useCallback(
    debounce(() => {
      const value = ref.current;
      const min = value[0];
      const max = value[1];

      if (min === DefaultRange[0] && max === DefaultRange[1]) {
        dispatch(
          setStickerData({
            filter: { ...filter, price: undefined },
          })
        );
      } else {
        dispatch(
          setStickerData({
            filter: { ...filter, price: [min, max] },
          })
        );
      }
      dispatch(
        setStickerData({
          result: data?.count ?? 0,
        })
      );
    }, 300),
    []
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number[];
    const min = value[0];
    const max = value[1];

    setRange([min, max]);
    ref.current = [min, max];
    handleDelayedChange();
  };

  const value = price ? price : DefaultRange;

  return (
    <div className="max-w-[80dvw] w-[300px] ">
      <div className="bg-white z-10 sticky top-0">
        <Typography variant="h6" className="px-[15px] pt-[10px]">
          Price
        </Typography>
        <div className="px-[15px] py-[10px] border-b-2 border-black">
          <div className="flex justify-between items-center">
            <Typography variant="body2">
              {isFetching ? <InlineSpinner /> : data?.count ?? 0} results
            </Typography>
            <div className="flex gap-2">
              <UnderlineButton>Clear</UnderlineButton>
              <UnderlineButton className="sm:hidden">Apply</UnderlineButton>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[50px] sm:px-[15px] py-[20px] flex flex-col gap-1 sm:gap-3 md:gap-5">
        <div className="flex gap-3">
          <div className="flex justify-center items-start gap-[2px] sm:gap-1 flex-1 border-2 border-black px-[15px] py-2">
            <Icon name="rupee" className="h-[8px] sm:h-[14px] md:h-[16px]" />
            <Typography variant="body1" className="text-start leading-none	">
              {range[0]}
            </Typography>
          </div>
          <div className="flex justify-center items-start gap-[2px] sm:gap-1 flex-1 border-2 border-black px-[15px] py-2">
            <Icon name="rupee" className="h-[8px] sm:h-[14px] md:h-[16px]" />
            <Typography variant="body1" className="text-start leading-none	">
              {range[1]}
            </Typography>
          </div>
        </div>
        <PrettoSlider
          max={DefaultRange[1]}
          min={DefaultRange[0]}
          value={range}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Range;
