import Icon from "../../Icon";

const WishlistItem = () => {
  return (
    <button className="flex justify-center items-center h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 p-[5px] sm:p-[6px] rounded-full bg-darkGray">
      <Icon name="heart" className="h-full w-full" />
    </button>
  );
};

export default WishlistItem;
