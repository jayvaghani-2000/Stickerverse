import { useAppDispatch } from "@/app/store";
import {
  StickerData,
  setStickerData,
  useStickerStore,
} from "@/app/store/stickers";
import { currency } from "@/app/utils/constant";
import { SORT_BY_LABEL } from "@/app/utils/enum";
import { Typography } from "@mui/material";
import Icon from "../../Icon";

type propType = {
  categories: { value: number; label: string }[];
};

const AppliedFilter = (props: propType) => {
  const { categories } = props;

  const dispatch = useAppDispatch();
  const { filter } = useStickerStore();
  const { category, price, sortBy } = filter;

  const isFiltered = category.length > 0 || price?.length || sortBy;

  const handleRemovePartialFilter = (
    updatedFilter: Partial<StickerData>["filter"]
  ) => {
    dispatch(
      setStickerData({
        filter: updatedFilter,
      })
    );
  };
  return isFiltered ? (
    <div className="flex flex-wrap gap-x-1 sm:gap-x-2 gap-y-1 mt-2">
      <Label
        label="Clear All"
        onClick={() => {
          handleRemovePartialFilter({
            category: [],
            price: undefined,
            sortBy: undefined,
          });
        }}
      />
      {category.map(i => (
        <Label
          key={i}
          label={categories.find(j => j.value === i)?.label ?? ""}
          onClick={() => {
            handleRemovePartialFilter({
              ...filter,
              category: category.filter(k => k !== i),
            });
          }}
        />
      ))}
      {price ? (
        <Label
          label={`${currency}${price[0]} - ${currency}${price[1]}`}
          onClick={() => {
            handleRemovePartialFilter({
              ...filter,
              price: undefined,
            });
          }}
        />
      ) : null}
      {sortBy ? (
        <Label
          label={SORT_BY_LABEL[sortBy]}
          onClick={() => {
            handleRemovePartialFilter({
              ...filter,
              sortBy: undefined,
            });
          }}
        />
      ) : null}
    </div>
  ) : null;
};

const Label = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <button
      className="bg-darkCream flex items-center gap-1 px-1 sm:px-2 py-1 rounded-md"
      onClick={onClick}
    >
      <Typography variant="body2">{label}</Typography>
      <div className=" h-[10px] w-[10px]" onClick={() => {}}>
        <Icon name="cross" />
      </div>
    </button>
  );
};

export default AppliedFilter;
