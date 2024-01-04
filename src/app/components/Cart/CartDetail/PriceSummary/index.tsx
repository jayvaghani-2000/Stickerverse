import {
  getCartType,
  getVisitorCartType,
} from "../../../../../../pages/api/types";

type propType = {
  userCart: getCartType | getVisitorCartType;
};

const PriceSummary = (props: propType) => {
  return <div className="col-span-2">PriceSummary</div>;
};

export default PriceSummary;
