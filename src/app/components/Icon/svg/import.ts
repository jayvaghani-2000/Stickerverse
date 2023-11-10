import CartIcon from "./cart.svg";
import HeartIcon from "./heart.svg";
import LogoIcon from "./logo.svg";
import HeartBlackIcon from "./heartBlack.svg";
import SearchIcon from "./search.svg";
import CartColorIcon from "./cartColor.svg";
import UserIcon from "./user.svg";

const images = {
  cart: CartIcon,
  heart: HeartIcon,
  logo: LogoIcon,
  heartBlack: HeartBlackIcon,
  search: SearchIcon,
  cartColor: CartColorIcon,
  user: UserIcon,
};

export type imagesList = keyof typeof images;

export default images;
