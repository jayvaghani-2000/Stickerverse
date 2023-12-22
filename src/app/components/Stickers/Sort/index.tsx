import { useAppDispatch } from "@/app/store";
import { setStickerData, useStickerStore } from "@/app/store/stickers";
import { SORT_BY, SORT_BY_LABEL } from "@/app/utils/enum";
import React from "react";
import Radio from "../../Shared/Radio";

const Sort = () => {
  const dispatch = useAppDispatch();
  const { filter } = useStickerStore();

  const { sortBy } = filter;

  const sortByCategory = Object.values(SORT_BY).map(i => ({
    value: i,
    label: SORT_BY_LABEL[i],
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const selectedValue = value as SORT_BY;
    dispatch(setStickerData({ filter: { ...filter, sortBy: selectedValue } }));
  };

  return (
    <div className="px-2 sm:px-3 py-1 sm:py-2">
      <Radio
        value={sortBy}
        name="sortBy"
        group={sortByCategory}
        onChange={handleChange}
      />
    </div>
  );
};

export default Sort;
