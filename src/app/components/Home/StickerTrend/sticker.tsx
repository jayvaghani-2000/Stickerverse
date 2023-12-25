import { useAddToCartMutation } from "@/app/store/cart/api";
import { productAnimation, productHoverEffect } from "@/app/utils/animation";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { trendingStickerType } from "../../../../../pages/api/types";
import Icon from "../../Icon";
import { MotionImage } from "../../MotionImage";
import ItemCount from "../../Shared/ItemCount";
import Rating from "../../Shared/Rating";

const Sticker = ({ sticker }: { sticker: trendingStickerType[0] }) => {
  const i = sticker;
  const [quantity, setQuantity] = useState(1);
  const aspectRatio = i.image[0].width / i.image[0].height;
  const [handleAddToCart] = useAddToCartMutation();
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();
  const getImageSize = () => {
    if (isMobile) {
      return "100px";
    } else if (isTab) {
      return "150px";
    }
    return "200px";
  };

  return (
    <motion.figure {...productAnimation(i.id.toString())}>
      <motion.div
        key={i.id}
        className="w-[150px] sm:w-[180px] md:w-[240px]  border-2 border-black rounded-2xl bg-white flex flex-col "
        {...productHoverEffect()}
      >
        <div className="py-[10px] sm:py-[15px] md:py-[20px]">
          <div
            className={`h-[130px] sm:h-[140px] md:h-[200px] m-auto overflow-hidden rounded-[30px] bg-white flex justify-center items-center`}
            style={{ aspectRatio: aspectRatio }}
          >
            <MotionImage
              src={i.image[0].url}
              alt=""
              fill
              placeholder="blur"
              blurDataURL={i.image[0].blurUrl}
              style={{ objectFit: "cover" }}
              sizes={getImageSize()}
            />
          </div>
        </div>
        <div className="flex-1 border-t-2 border-black rounded-b-[14px] py-[10px] md:py-[20px] bg-lightBlue">
          <Typography variant="subtitle2" className="text-center">
            {i.productName}
          </Typography>
          <div className="flex justify-center">
            <Rating />
          </div>
          <div className="flex justify-center items-start mt-1 gap-[2px] sm:gap-1 ">
            <Typography variant="body1" className="text-start leading-none	">
              {i.price - 0.01} ₹
            </Typography>
          </div>
          <div className="m-auto w-fit relative flex gap-2 justify-center mt-1 sm:mt-2 md:mt-3">
            <ItemCount quantity={quantity} setQuantity={setQuantity} />
            <button
              className="absolute top-[2px] md:top-[3px] -right-8 h-[20px] md:h-[24px]"
              onClick={() => {
                handleAddToCart({ quantity: quantity, stickerId: sticker.id });
              }}
            >
              <Icon name="cart" className="h-full w-full" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.figure>
  );
};

export default Sticker;
