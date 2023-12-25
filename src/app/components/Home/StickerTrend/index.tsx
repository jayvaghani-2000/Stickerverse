"use client";
import { useAppDispatch } from "@/app/store";
import { setTrendingSticker, useHomeStore } from "@/app/store/home";
import { useLazyGetTrendingStickerQuery } from "@/app/store/home/api";
import { placeholder } from "@/app/utils/constant";
import { randomColor } from "@/app/utils/skeleton";
import { paddingSpacing } from "@/app/utils/styles";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { trendingStickerType } from "../../../../../pages/api/types";
import { MotionImage } from "../../MotionImage";
import Button from "../../Shared/Button";
import { Skeleton } from "../../Skeleton";
import Sticker from "./sticker";

type className = React.HTMLProps<HTMLElement>["className"];
const dummySticker: className = "w-[150px] sm:w-[180px] md:w-[240px]";

const StickerTrend = () => {
  const { trendingSticker } = useHomeStore();
  const [getStickers, { isError }] = useLazyGetTrendingStickerQuery({});
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();
  const dispatch = useAppDispatch();

  const handleGetTrendingStickers = async () => {
    const stickers = await getStickers({});
    dispatch(setTrendingSticker(stickers.data as trendingStickerType));
  };

  useEffect(() => {
    if (trendingSticker.length !== 0) return;
    handleGetTrendingStickers();
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
      <div className="relative flex flex-wrap justify-around sm:justify-between gap-[8px] sm:gap-[12px] md:gap-[20px] gap-y-5 sm:gap-y-8 md:gap-y-10 scrollbar-hide ">
        {!isError && trendingSticker.length !== 0
          ? trendingSticker.slice(0, 6).map(i => {
              const aspectRatio = i.image[0].width / i.image[0].height;
              return <Sticker key={i.id} sticker={i} />;
            })
          : null}

        <AnimatePresence>
          <div
            className={classNames(
              "w-full flex flex-wrap justify-around  sm:justify-between gap-[8px] sm:gap-[12px] md:gap-[20px] gap-y-5 sm:gap-y-8 md:gap-y-10",
              {
                ["absolute -z-10 opacity-0"]:
                  !isError && trendingSticker.length !== 0,
              }
            )}
          >
            {[0, 1, 2, 3, 4, 5].map(i => {
              const color = randomColor();
              return (
                <div
                  key={i}
                  className={classNames(
                    "w-[150px] sm:w-[180px] md:w-[240px]  border-2 border-black rounded-2xl bg-white flex flex-col"
                  )}
                >
                  <motion.figure>
                    <div
                      className={`relative w-full h-[150px] sm:h-[170px] md:h-[240px] m-auto flex items-center rounded-t-2xl overflow-hidden`}
                    >
                      <div
                        className={`absolute w-full  z-10 h-[130px] sm:h-[140px] md:h-[200px] m-auto overflow-hidden flex justify-center items-center`}
                        style={{
                          aspectRatio: placeholder.width / placeholder.height,
                        }}
                      >
                        <MotionImage
                          src={placeholder.url}
                          alt=""
                          fill
                          placeholder="blur"
                          blurDataURL={placeholder.baseUrl}
                          style={{ objectFit: "cover" }}
                          sizes={getImageSize()}
                        />
                      </div>
                      <Skeleton color={color} />
                    </div>

                    <div className="px-[4px] sm:px-[12px] md:px-[32px] flex-1 border-t-2 border-black rounded-b-[14px] py-[10px] md:py-[20px] bg-lightBlue">
                      <div className="text-center h-[18px] md:h-[24px]">
                        <Skeleton color={color} />
                      </div>
                      <div className="text-center mt-1 md:mt-2 h-[21px] md:h-[27px]">
                        <Skeleton color={color} />
                      </div>
                      <div className="text-center mt-1 md:mt-2 h-[21px] md:h-[27px]">
                        <Skeleton color={color} />
                      </div>
                    </div>
                  </motion.figure>
                </div>
              );
            })}
            <div className={dummySticker} />
            <div className={dummySticker} />
            <div className={classNames(dummySticker, "hidden sm:block")} />
            <div className={classNames(dummySticker, "hidden sm:block")} />
            <div className={classNames(dummySticker, "hidden sm:block")} />
          </div>
        </AnimatePresence>

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
