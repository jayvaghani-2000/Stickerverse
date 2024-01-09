import Nova from "@/app/components/Font/nova";
import Icon from "@/app/components/Icon";
import { Typography } from "@mui/material";
import {
  getCartType,
  getVisitorCartType,
} from "../../../../../../pages/api/types";

type propType = {
  userCart: getCartType | getVisitorCartType;
};

const PriceSummary = (props: propType) => {
  const { userCart } = props;

  const total = userCart.reduce((prev, curr) => {
    prev += curr.quantity * curr.sticker.price;
    return prev;
  }, 0);

  return (
    <div className="sm:sticky top-5 col-span-9 sm:col-span-4 lg:col-span-3 h-fit ">
      <div className="flex gap-1 items-center justify-center">
        <div className=" h-[18px] w-[18px] md:h-[30px] md:w-[30px]">
          <Icon name="secure" className="h-full w-full" />{" "}
        </div>
        <Nova className="text-green">100% Secure</Nova>
      </div>

      <div className=" bg-white rounded-2xl  py-4 sm:py-5 md:py-8  px-4 sm:px-5 md:px-7 mt-6">
        <div className="flex justify-between items-center">
          <Typography variant="body2" fontWeight={400}>
            Bag Total
          </Typography>
          <Typography variant="h5" fontWeight={500}>
            ₹{total}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
