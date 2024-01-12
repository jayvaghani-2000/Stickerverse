import { useAppDispatch } from "@/app/store";
import { useAuthStore } from "@/app/store/authentication";
import { setGlobalData } from "@/app/store/global";
import classNames from "classnames";
import Icon from "../../Icon";
import styles from "./wishlistItem.module.scss";

type propType = {
  favorite?: boolean;
  onClick?: () => void;
};

const WishlistItem = (props: propType) => {
  const { favorite = true, onClick = () => {} } = props;
  const dispatch = useAppDispatch();
  const { authenticated } = useAuthStore();

  return (
    <button
      className="flex justify-center items-center h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 p-[5px] sm:p-[6px] rounded-full bg-darkGray"
      onClick={() => {
        if (!authenticated) {
          dispatch(setGlobalData({ showLogin: true }));
        } else {
          onClick();
        }
      }}
    >
      <Icon
        name="heart"
        className={classNames("h-full w-full", {
          [styles.isWishlist]: favorite,
        })}
      />
    </button>
  );
};

export default WishlistItem;
