import { useHomeStore } from "@/app/store/home";
import { useLazyGetTrendingStickerQuery } from "@/app/store/home/api";
import React, { useEffect } from "react";
import { MotionImage } from "../../MotionImage";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import Button from "../../Shared/Button";
import classNames from "classnames";
import { paddingSpacing } from "@/app/utils/styles";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Skeleton } from "../../Skeleton";
import {
  delayAnimation,
  productAnimation,
  productHoverEffect,
} from "@/app/utils/animation";

type className = React.HTMLProps<HTMLElement>["className"];
const dummySticker: className = "w-[150px] sm:w-[180px] md:w-[240px]";

const StickerTrend = () => {
  const { trendingSticker } = useHomeStore();
  const [getStickers] = useLazyGetTrendingStickerQuery({});
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();

  useEffect(() => {
    if (trendingSticker.length !== 0) return;
    getStickers({});
  }, []);

  const getImageSize = () => {
    if (isMobile) {
      return "100px";
    } else if (isTab) {
      return "150px";
    }
    return "200px";
  };

  return (
    <div className={classNames("py-[32px] md:py-[64px]", paddingSpacing)}>
      <div className="flex justify-between items-center pb-[16px] md:pb-[28px]">
        <Typography variant="h6">TRENDING STICKERS</Typography>
        <Button
          className="bg-purple hover:bg-purple text-white"
          variant="rounded-shadow-flat"
          typography="subtitle2"
        >
          See All
        </Button>
      </div>
      <div className=" flex flex-wrap justify-around sm:justify-between gap-[8px] sm:gap-[12px] md:gap-[20px] gap-y-5 scrollbar-hide ">
        {trendingSticker.length !== 0
          ? trendingSticker.map((i, index) => {
              const aspectRatio =
                trendingSticker[index].image[0].width /
                trendingSticker[index].image[0].height;
              return (
                <motion.figure
                  key={i.id}
                  {...productAnimation(i.id.toString())}
                >
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
                          src={trendingSticker[index].image[0].url}
                          alt=""
                          fill
                          placeholder="blur"
                          blurDataURL={trendingSticker[index].image[0].blurUrl}
                          style={{ objectFit: "cover" }}
                          sizes={getImageSize()}
                        />
                      </div>
                    </div>
                    <div className="flex-1 border-t-2 border-black rounded-b-2xl py-[10px] md:py-[20px] bg-lightBlue">
                      <Typography variant="subtitle2" className="text-center">
                        {i.productName}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-center md:mt-2"
                      >
                        ₹{i.price}
                      </Typography>
                    </div>
                  </motion.div>
                </motion.figure>
              );
            })
          : [0, 1, 2].map(i => {
              return (
                <motion.figure key={i} {...delayAnimation(i)}>
                  <div className="w-[150px] sm:w-[180px] md:w-[240px]  border-2 border-black rounded-2xl bg-white flex flex-col">
                    <div
                      className={`w-full h-[150px] sm:h-[170px] md:h-[240px] m-auto rounded-t-2xl overflow-hidden`}
                    >
                      <Skeleton />
                    </div>

                    <div className="px-[4px] sm:px-[12px] md:px-[32px] flex-1 border-t-2 border-black rounded-b-2xl py-[10px] md:py-[20px] bg-lightBlue">
                      <div className="text-center h-[18px] md:h-[24px]">
                        <Skeleton />
                      </div>
                      <div className="text-center mt-1 md:mt-2 h-[21px] md:h-[27px]">
                        <Skeleton />
                      </div>
                    </div>
                  </div>
                </motion.figure>
              );
            })}

        <div className={dummySticker} />
        <div className={dummySticker} />
        <div className={classNames(dummySticker, "hidden sm:block")} />
        <div className={classNames(dummySticker, "hidden sm:block")} />
        <div className={classNames(dummySticker, "hidden sm:block")} />
      </div>
    </div>
  );
};

export default StickerTrend;
