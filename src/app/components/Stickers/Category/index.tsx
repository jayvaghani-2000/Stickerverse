import React, { useState } from "react";
import Checkbox from "../../Shared/Checkbox";
import { Typography } from "@mui/material";
import UnderlineButton from "../../Shared/Button/UnderlineButton";

type propType = {
  categories: { value: number; label: string }[];
};

const Category = (props: propType) => {
  const { categories } = props;
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

  const handleChange = (id: number, checked: boolean) => {
    setSelectedCategory(prev => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter(i => i !== id);
      }
    });
  };

  return (
    <div className="sm:min-w-[300px] ">
      <Typography variant="h6" className="px-[15px] pt-[10px]">
        Theme
      </Typography>
      <div className="px-[15px] py-[10px] border-b-2 border-black">
        <div className="flex justify-between items-center">
          <Typography variant="body2">250 results</Typography>
          <div className="flex gap-2">
            <UnderlineButton>Clear</UnderlineButton>
          </div>
        </div>
      </div>
      <div className="px-[15px] py-[20px] flex flex-col gap-1 sm:gap-2 md:gap-3">
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
