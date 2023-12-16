import React from "react";
import Radio from "../../Shared/Radio";
import { SORT_BY, SORT_BY_LABEL } from "@/app/utils/enum";

const Sort = () => {
  const sortByCategory = Object.values(SORT_BY).map(i => ({
    value: i,
    label: SORT_BY_LABEL[i],
  }));

  return (
    <div className="px-2 sm:px-3 py-1 sm:py-2">
      <Radio name="sortBy" group={sortByCategory} />
    </div>
  );
};

export default Sort;
