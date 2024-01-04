import Button from "@/app/components/Shared/Button";
import Checkbox from "@/app/components/Shared/Checkbox";
import { Typography } from "@mui/material";
import { useState } from "react";
import {
  getCartType,
  getVisitorCartType,
} from "../../../../../../pages/api/types";

type propType = {
  userCart: getCartType | getVisitorCartType;
};

const Cart = (props: propType) => {
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const { userCart } = props;

  const handleToggleSelectAll = () => {
    if (userCart.length === selectedItem.length) {
      setSelectedItem([]);
    } else {
      setSelectedItem(userCart.map(i => i.id));
    }
  };

  const handleSelectItems = (itemId: number) => {
    if (selectedItem.includes(itemId)) {
      setSelectedItem(prev => prev.filter(i => i !== itemId));
    } else {
      setSelectedItem(prev => [...prev, itemId]);
    }
  };

  return (
    <div className="col-span-4 bg-coffee">
      <div className="flex justify-between items-center  px-5 py-3 border-b-2 border-dashed border-lightGray">
        <Checkbox
          label={<Typography variant="subtitle2">Select All</Typography>}
          name="selectAll"
          onChange={handleToggleSelectAll}
          value={userCart.length === selectedItem.length}
        />
        <Button
          typography="subtitle2"
          variant="border-bottom"
          className="text-lightRed bg-transparent hover:bg-transparent"
        >
          Remove All
        </Button>
      </div>
      <div className="py-3 px-5">
        {userCart.map(i => (
          <div key={i.id}>
            <Checkbox
              name={i.sticker.productName}
              onChange={() => {
                handleSelectItems(i.id);
              }}
              value={userCart.length === selectedItem.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
