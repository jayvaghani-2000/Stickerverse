import Button from "@/app/components/Shared/Button";
import Checkbox from "@/app/components/Shared/Checkbox";
import InlineSpinner from "@/app/components/Shared/InlineSpinner";
import {
  useLazyGetUserCartQuery,
  useRemoveFromToCartMutation,
} from "@/app/store/cart/api";
import { ThemeColor } from "@/app/theme";
import { Typography } from "@mui/material";
import { useState } from "react";
import {
  getCartType,
  getVisitorCartType,
} from "../../../../../../pages/api/types";
import Sticker from "./sticker";

type propType = {
  userCart: getCartType | getVisitorCartType;
};

const Cart = (props: propType) => {
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [removeFromCart, { isLoading }] = useRemoveFromToCartMutation();
  const [fetchCart, { isLoading: loadingGettingCart }] =
    useLazyGetUserCartQuery();
  const { userCart } = props;

  const handleToggleSelectAll = () => {
    if (userCart.length === selectedItem.length) {
      setSelectedItem([]);
    } else {
      setSelectedItem(userCart.map(i => i.stickerId));
    }
  };

  const handleSelectItems = (itemId: number) => {
    if (selectedItem.includes(itemId)) {
      setSelectedItem(prev => prev.filter(i => i !== itemId));
    } else {
      setSelectedItem(prev => [...prev, itemId]);
    }
  };

  const handleRemoveItem = async () => {
    try {
      const res = await removeFromCart({ stickerIds: selectedItem });
      if ("data" in res && res.data.success) {
        await fetchCart({});
      }
    } catch (err) {}
  };

  return (
    <div className="col-span-9 sm:col-span-5 lg:col-span-6 bg-coffee">
      <div className="flex justify-between items-center  px-4 sm:px-5 md:px-7 py-3 sm:py-4 md:py-5 border-b-2 border-dashed border-lightGray">
        <Checkbox
          label={
            <Typography
              variant="subtitle2"
              className="ml-[3px] sm:ml-[7px] md:ml-[15px]"
            >
              Select All
            </Typography>
          }
          name="selectAll"
          onChange={handleToggleSelectAll}
          value={userCart.length === selectedItem.length}
        />
        <Button
          typography="subtitle2"
          variant="border-bottom"
          className="text-lightRed disabled:text-lightRed bg-transparent hover:bg-transparent"
          disabled={loadingGettingCart || isLoading}
          onClick={handleRemoveItem}
        >
          Remove All
          {loadingGettingCart || isLoading ? (
            <InlineSpinner color={ThemeColor.LIGHT_RED} />
          ) : null}
        </Button>
      </div>
      <div className="py-5">
        {userCart.map(i => (
          <Sticker
            key={i.id}
            item={i}
            handleSelectItems={handleSelectItems}
            selectedItem={selectedItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
