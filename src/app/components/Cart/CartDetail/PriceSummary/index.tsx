import {
  getCartType,
  getVisitorCartType,
} from "../../../../../../pages/api/types";

type propType = {
  userCart: getCartType | getVisitorCartType;
};

const PriceSummary = (props: propType) => {
  return (
    <div className="sm:sticky top-5 col-span-9 sm:col-span-4 lg:col-span-3 py-4 sm:py-5 md:py-8  px-4 sm:px-5 md:px-7 bg-white rounded-2xl h-fit">
      PriceSummary
    </div>
  );
};

export default PriceSummary;
