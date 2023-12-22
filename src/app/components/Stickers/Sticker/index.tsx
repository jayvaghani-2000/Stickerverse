import { productAnimation, productClickEffect } from "@/app/utils/animation";
import { getPlatform } from "@/app/utils/getPlatform";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Typography } from "@mui/material";
import { animate, motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { stickersType } from "../../../../../pages/api/types";
import { MotionImage } from "../../MotionImage";
import Button from "../../Shared/Button";
import ItemCount from "../../Shared/ItemCount";
import styles from "../stickers.module.scss";

const Sticker = ({ sticker }: { sticker: stickersType["sticker"][0] }) => {
  const title = useRef<HTMLHeadingElement>(null!);
  const titleBackup = useRef<HTMLHeadingElement>(null!);
  const isTab = useTabScreen();
  const isMobileSize = useMobileScreen();
  const { isMobile } = getPlatform();
  const aspectRatio = sticker.image[0].width / sticker.image[0].height;
  const imageClass = `image-${sticker.id}`;

  const i = sticker;

  const getImageSize = () => {
    if (isMobileSize) {
      return "100px";
    } else if (isTab) {
      return "150px";
    }
    return "200px";
  };

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

  return (
    <motion.figure
      {...productAnimation(i.id.toString())}
      onHoverStart={() => {
        if (isMobile) return;
        animate([
          [
            `.${imageClass}`,
            {
              boxShadow: "3px 3px 0px 0px #000",
              transitionDuration: 300,
            },
          ],
        ]);
      }}
      onHoverEnd={() => {
        if (isMobile) return;
        animate([
          [
            `.${imageClass}`,
            {
              boxShadow: "none",
              transitionDuration: 300,
            },
          ],
        ]);
      }}
    >
      <motion.div
        className="w-[150px] sm:w-[180px] md:w-[240px]  flex flex-col"
        {...productClickEffect()}
      >
        <motion.div
          className={`${imageClass} py-[10px] sm:py-[15px] md:py-[20px] bg-white border-2 border-black `}
        >
          <div
            className={`h-[130px] sm:h-[140px] md:h-[200px] m-auto overflow-hidden  bg-white flex justify-center items-center`}
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
        </motion.div>
        <div className="flex-1 flex flex-col items-center pt-[5px] md:pt-[10px]  pb-[30px] sm:pb-[40px] md:pb-[80px] overflow-hidden">
          <div className="relative max-w-full overflow-hidden">
            <div className={styles.marquee}>
              <Typography variant="subtitle2" ref={titleBackup}>
                {i.productName}
              </Typography>
            </div>
            <div className={styles.marquee2}>
              <Typography variant="subtitle2" ref={title}>
                {i.productName}
              </Typography>
            </div>
          </div>

          <div className="flex justify-center items-start mt-1 sm:mt-2 gap-[2px] sm:gap-1 ">
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
              ₹{i.price - 0.01}
            </Typography>
          </div>
          <ItemCount />

          <Button
            childClassName="normal-case"
            typography="subtitle2"
            className="bg-primeGreen hover:bg-primeGreen w-fit mt-2 sm:mt-3 md:mt-4 pl-2 sm:pl-3 md:pl-4  pr-2 sm:pr-3 md:pr-3  pt-1 pb-1 sm:pt-[6px] sm:pb-[6px] md:pt-2 sm:pb-2"
            icon="cart"
          >
            Add to Cart
          </Button>
        </div>
      </motion.div>
    </motion.figure>
  );
};

export default Sticker;
