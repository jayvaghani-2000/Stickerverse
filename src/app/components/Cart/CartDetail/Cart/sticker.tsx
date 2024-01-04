import Icon from "@/app/components/Icon";
import { MotionImage } from "@/app/components/MotionImage";
import Checkbox from "@/app/components/Shared/Checkbox";
import ItemCount from "@/app/components/Shared/ItemCount";
import {
  useLazyGetUserCartQuery,
  useRemoveFromToCartMutation,
} from "@/app/store/cart/api";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import {
  getCartType,
  getVisitorCartType,
} from "../../../../../../pages/api/types";
import styles from "./../../../Stickers/stickers.module.scss";

type propType = {
  item: getCartType[0] | getVisitorCartType[0];
  handleSelectItems: (id: number) => void;
  selectedItem: number[];
};

const Sticker = (props: propType) => {
  const titleBackup = useRef<HTMLHeadingElement>(null!);
  const title = useRef<HTMLHeadingElement>(null!);
  const { item: i, handleSelectItems, selectedItem } = props;
  const [quantity, setQuantity] = useState(i.quantity);
  const [removeFromCart] = useRemoveFromToCartMutation();
  const [fetchCart] = useLazyGetUserCartQuery();

  useLayoutEffect(() => {
    const h2Element = title.current;
    const h2ElementBackup = titleBackup.current;
    const isOverflowing = h2Element.scrollWidth > h2Element.clientWidth;
    if (isOverflowing) {
      h2ElementBackup.style.opacity = "1";
      h2Element.style.opacity = "0";
    } else {
      h2ElementBackup.style.opacity = "0";
    }
  }, []);

  const handleRemoveItem = async () => {
    try {
      const res = await removeFromCart({ stickerId: i.stickerId });
      if ("data" in res && res.data.success) {
        await fetchCart({});
      }
    } catch (err) {}
  };

  return (
    <div className="pb-4 sm:pb-5 md:pb-8  px-4 sm:px-5 md:px-7  relative flex gap-2 sm:gap-3 md:gap-4 justify-start items-start  after:content-[''] after:absolute after:w-full after:border-[1px] after:border-dashed after:border-lightGray after:bottom-2 sm:after:bottom-[10px] md:after:bottom-4 after:left-0 last:after:hidden last:pb-0">
      <Checkbox
        name={i.sticker.productName}
        onChange={() => {
          handleSelectItems(i.id);
        }}
        value={selectedItem.includes(i.id)}
      />

      <motion.div className={`w-fit bg-white border-2 border-black `}>
        <div
          className={`h-[65px] sm:h-[80px] md:h-[120px] m-auto overflow-hidden  bg-white flex justify-center items-center`}
          style={{
            aspectRatio: i.sticker.image[0].width / i.sticker.image[0].height,
          }}
        >
          <MotionImage
            src={i.sticker.image[0].url}
            alt=""
            fill
            placeholder="blur"
            blurDataURL={i.sticker.image[0].blurUrl}
            style={{ objectFit: "cover" }}
            sizes={"100px"}
          />
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col justify-between overflow-hidden self-center">
        <div className="relative max-w-full overflow-hidden">
          <div className={styles.marquee}>
            <Typography variant="subtitle2" ref={titleBackup}>
              {i.sticker.productName}
            </Typography>
          </div>
          <div className={styles.marquee2}>
            <Typography variant="subtitle2" ref={title}>
              {i.sticker.productName}
            </Typography>
          </div>
        </div>

        <div className="flex items-start mt-1 sm:mt-2 gap-[2px] sm:gap-1 ">
          <Typography
            variant="body1"
            className="text-start leading-none	font-semibold"
          >
            MRP.
          </Typography>
          <Typography
            variant="body1"
            className="text-start leading-none	font-semibold text-lightRed"
          >
            ₹{i.sticker.price - 0.01}
          </Typography>
        </div>
        <div className="mt-1 sm:mt-2 md:mt-3 w-fit flex items-center gap-1">
          <Typography variant="body2">Quantity</Typography>
          <ItemCount quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>

      <button
        className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 p-1 rounded-full bg-opacity-20 bg-black"
        onClick={handleRemoveItem}
      >
        <Icon name="cross" className="h-full w-full" />
      </button>
    </div>
  );
};

export default Sticker;
