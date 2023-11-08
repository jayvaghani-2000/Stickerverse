import CartIcon from "./cart.svg";
import HeartIcon from "./heart.svg";

const images = {
  cart: CartIcon,
  heart: HeartIcon,
};

export type imagesList = keyof typeof images;

export default images;
