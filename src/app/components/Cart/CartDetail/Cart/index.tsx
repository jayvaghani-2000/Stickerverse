import Button from "@/app/components/Shared/Button";
import Checkbox from "@/app/components/Shared/Checkbox";
import InlineSpinner from "@/app/components/Shared/InlineSpinner";
import { useAuthStore } from "@/app/store/authentication";
import {
  abortGetCartApi,
  abortRemoveCartApi,
  abortUpdateCartApi,
  useLazyGetUserCartQuery,
  useRemoveFromToCartMutation,
} from "@/app/store/cart/api";
import { useVisitorCartStore } from "@/app/store/visitorCart";
import {
  abortGetVisitorCartApi,
  abortVisitorRemoveCartApi,
  abortVisitorUpdateCartApi,
  useLazyGetVisitorCartQuery,
  useRemoveFromToVisitorCartMutation,
} from "@/app/store/visitorCart/api";
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
  const { authenticated } = useAuthStore();
  const [removeFromCart, { isLoading }] = useRemoveFromToCartMutation();
  const [removeFromVisitorCart, { isLoading: removingFromVisitorCart }] =
    useRemoveFromToVisitorCartMutation();
  const [fetchCart, { isLoading: loadingGettingCart }] =
    useLazyGetUserCartQuery();
  const [fetchVisitorCart, { isLoading: loadingGettingVisitorCart }] =
    useLazyGetVisitorCartQuery();
  const { visitorCartId } = useVisitorCartStore();

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

  const resetSelectedItem = () => {
    setSelectedItem([]);
  };

  const handleRemoveItem = async () => {
    try {
      if (authenticated) {
        abortGetCartApi();
        abortUpdateCartApi();
        abortRemoveCartApi();
        const res = await removeFromCart({ stickerIds: selectedItem });
        if ("data" in res && res.data.success) {
          await fetchCart({});
          resetSelectedItem();
        }
      } else {
        abortGetVisitorCartApi();
        abortVisitorUpdateCartApi();
        abortVisitorRemoveCartApi();
        const res = await removeFromVisitorCart({
          cartId: visitorCartId as string,
          body: { stickerIds: selectedItem },
        });
        if ("data" in res && res.data.success) {
          await fetchVisitorCart({ id: visitorCartId as string });
          resetSelectedItem();
        }
      }
    } catch (err) {}
  };

  const loading =
    loadingGettingCart ||
    isLoading ||
    removingFromVisitorCart ||
    loadingGettingVisitorCart;

  const cartItemId = userCart.map(i => i.stickerId);

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
          value={
            userCart.length ===
            selectedItem.filter(i => cartItemId.includes(i)).length
          }
        />
        <Button
          typography="subtitle2"
          variant="border-bottom"
          className="text-lightRed disabled:text-lightRed bg-transparent hover:bg-transparent"
          disabled={loading || selectedItem.length === 0}
          onClick={handleRemoveItem}
        >
          Remove All
          {loading ? <InlineSpinner color={ThemeColor.LIGHT_RED} /> : null}
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
