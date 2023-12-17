import React, { useCallback, useRef, useState } from "react";
import Checkbox from "../../Shared/Checkbox";
import { Typography } from "@mui/material";
import UnderlineButton from "../../Shared/Button/UnderlineButton";
import { useAppDispatch } from "@/app/store";
import { setStickerData, useStickerStore } from "@/app/store/stickers";
import { cloneDeep, debounce } from "lodash";
import { useGetStickerCountQuery } from "@/app/store/stickers/api";
import InlineSpinner from "../../Shared/InlineSpinner";

type propType = {
  categories: { value: number; label: string }[];
};

const Category = (props: propType) => {
  const { categories } = props;
  const dispatch = useAppDispatch();
  const { filter, pageSize } = useStickerStore();
  const { category, price } = filter;
  const [selectedCategory, setSelectedCategory] = useState(category);
  const ref = useRef(category);

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
      dispatch(
        setStickerData({
          filter: { ...filter, category: ref.current },
        })
      );
      dispatch(
        setStickerData({
          result: data?.count ?? 0,
        })
      );
    }, 600),
    []
  );

  const handleChange = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedCategory(prev => [...prev, id]);
      ref.current = [...ref.current, id];
    } else {
      setSelectedCategory(prev => prev.filter(i => i !== id));
      ref.current = ref.current.filter(i => i !== id);
    }
    handleDelayedChange();
  };

  return (
    <div className="max-w-[80dvw] w-[300px] ">
      <div className=" bg-white z-10 sticky top-0">
        <Typography variant="h6" className="px-[15px] pt-[10px]">
          Theme
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
      <div className="px-[15px] py-[20px] flex flex-col gap-2 md:gap-3">
        {categories.map(i => (
          <Checkbox
            key={i.value}
            label={<Typography variant="subtitle2">{i.label}</Typography>}
            name={i.label}
            onChange={e => handleChange(i.value, e.target.checked)}
            value={selectedCategory.includes(i.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
