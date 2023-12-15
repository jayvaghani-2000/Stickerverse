"use client";
import {
  setCurrentPage,
  setSticker,
  useStickerStore,
} from "@/app/store/stickers";
import { motion } from "framer-motion";
import { useLazyGetStickerQuery } from "@/app/store/stickers/api";
import React, { useEffect } from "react";
import { stickersType } from "../../../../pages/api/types";
import { useAppDispatch } from "@/app/store";
import { Pagination, Typography } from "@mui/material";
import {
  delayAnimation,
  productAnimation,
  productHoverEffect,
} from "@/app/utils/animation";
import { MotionImage } from "../MotionImage";
import Rating from "../Shared/Rating";
import Icon from "../Icon";
import ItemCount from "../Shared/ItemCount";
import { Skeleton } from "../Skeleton";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";

const Stickers = () => {
  const { page, pageSize, sticker } = useStickerStore();
  const [getStickers] = useLazyGetStickerQuery();
  const dispatch = useAppDispatch();
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();

  const handleGetSticker = async (currentPage: number) => {
    const res = await getStickers({ page: currentPage, pageSize });
    if (!res.error) {
      const data: stickersType = res.data!;
      dispatch(setSticker(data));
    }
  };

  useEffect(() => {
    handleGetSticker(page);
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
    <div className="mt-32">
      <div className="flex gap-10">
        {sticker.length !== 0
          ? sticker.map((i, index) => {
              const aspectRatio = i.image[0].width / i.image[0].height;
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
                        <Icon
                          name="rupee"
                          className="h-[8px] sm:h-[14px] md:h-[16px]"
                        />
                        <Typography
                          variant="body1"
                          className="text-start leading-none	"
                        >
                          {i.price}
                        </Typography>
                      </div>
                      <ItemCount />
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

                    <div className="px-[4px] sm:px-[12px] md:px-[32px] flex-1 border-t-2 border-black rounded-b-[14px] py-[10px] md:py-[20px] bg-lightBlue">
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
      </div>
      <Pagination
        onChange={(_, page) => {
          dispatch(setCurrentPage(page));
          handleGetSticker(page);
        }}
        count={10}
        color="primary"
      />
    </div>
  );
};

export default Stickers;
