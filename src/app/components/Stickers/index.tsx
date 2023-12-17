"use client";
import { setStickerData, useStickerStore } from "@/app/store/stickers";
import {
  useGetStickerCountQuery,
  useLazyGetStickerQuery,
} from "@/app/store/stickers/api";
import { useEffect, useRef } from "react";
import { stickersType } from "../../../../pages/api/types";
import { useAppDispatch } from "@/app/store";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { useGetStickerCategoryQuery } from "@/app/store/category/api";
import FilterPopover from "../Shared/FilterPopover";
import { paddingSpacing } from "@/app/utils/styles";
import Category from "./Category";
import FilterDrawer from "../Shared/FilterDrawer";
import Range from "./Range";
import Sort from "./Sort";
import { AnimatePresence, motion } from "framer-motion";
import {
  delayAnimation,
  productAnimation,
  productHoverEffect,
} from "@/app/utils/animation";
import { MotionImage } from "../MotionImage";
import { Pagination, Typography } from "@mui/material";
import Icon from "../Icon";
import { Skeleton } from "../Skeleton";
import ItemCount from "../Shared/ItemCount";
import classNames from "classnames";
import Button from "../Shared/Button";

type className = React.HTMLProps<HTMLElement>["className"];
const dummySticker: className = "w-[150px] sm:w-[180px] md:w-[240px]";

const Stickers = () => {
  const {
    page,
    pageSize,
    sticker,
    totalPage,
    filter,
    result: resultCount,
  } = useStickerStore();
  const rendered = useRef(false);
  const { category, price, sortBy } = filter;
  const { data } = useGetStickerCategoryQuery({});
  const [getStickers, { isFetching }] = useLazyGetStickerQuery();
  const dispatch = useAppDispatch();
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();

  const stickerOnPage =
    resultCount / page > pageSize ? pageSize : resultCount % pageSize;

  const categories =
    data?.map(i => ({
      value: i.id,
      label: i.categoryName,
    })) || [];

  const handleGetSticker = async (currentPage: number) => {
    const res = await getStickers({
      page: currentPage,
      pageSize,
      totalPage,
      category: JSON.stringify(category),
      price: price ? JSON.stringify(price) : JSON.stringify([]),
      sortBy: sortBy ?? "",
    });
    if (!res.error) {
      const data = res.data! as stickersType;
      dispatch(setStickerData({ page }));
      dispatch(setStickerData({ pageSize: data.pageSize }));
      dispatch(setStickerData({ sticker: data.sticker }));
      dispatch(setStickerData({ totalPage: data.totalPage }));
      dispatch(setStickerData({ result: data.result }));
    }
  };

  useEffect(() => {
    handleGetSticker(page);
  }, [page]);

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      return;
    }
    handleGetSticker(1);
  }, [filter]);

  const getImageSize = () => {
    if (isMobile) {
      return "100px";
    } else if (isTab) {
      return "150px";
    }
    return "200px";
  };

  return (
    <div className={paddingSpacing}>
      <div className="mt-10 flex justify-between">
        <div className="flex gap-1 sm:gap-2">
          <FilterDrawer label="Price" popover={<Range />} />
          <FilterDrawer
            label="Theme"
            popover={<Category categories={categories} />}
          />
        </div>
        <FilterPopover label="Sort" popover={<Sort />} />
      </div>

      <div className="mt-[20px] sm:mt-[32px] md:mt-[40px]">
        <div className="flex flex-wrap justify-around sm:justify-between gap-[8px] sm:gap-[12px] md:gap-[20px] gap-y-5 scrollbar-hide">
          {sticker.length !== 0 && !isFetching
            ? sticker.map((i, index) => {
                const aspectRatio = i.image[0].width / i.image[0].height;
                return (
                  <AnimatePresence key={i.id}>
                    <motion.figure {...productAnimation(i.id.toString())}>
                      <motion.div
                        key={i.id}
                        className="w-[150px] sm:w-[180px] md:w-[240px]  flex flex-col "
                      >
                        <motion.div
                          className="py-[10px] sm:py-[15px] md:py-[20px] bg-white border-2 border-black "
                          {...productHoverEffect()}
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
                        <div className="flex-1 flex flex-col items-center pt-[5px] md:pt-[10px] ">
                          <Typography
                            variant="subtitle2"
                            className="text-center"
                          >
                            {i.productName}
                          </Typography>

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

                          <Button
                            childClassName="normal-case"
                            typography="subtitle2"
                            className="bg-primeGreen hover:bg-primeGreen w-fit mt-1 sm:mt-2 md:mt-3 px-1 sm:px-2 md:px-2  pt-1 pb-1"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </motion.div>
                    </motion.figure>
                  </AnimatePresence>
                );
              })
            : Array.from(Array(stickerOnPage || pageSize).keys()).map(i => {
                return (
                  <motion.figure key={i} {...delayAnimation(i)}>
                    <div className="w-[150px] sm:w-[180px] md:w-[240px]  flex flex-col">
                      <div
                        className={`w-full h-[150px] sm:h-[170px] md:h-[240px] m-auto bg-white border-2 border-black overflow-hidden`}
                      >
                        <Skeleton />
                      </div>

                      <div className="px-[4px] sm:px-[12px] md:px-[32px] flex-1  py-[10px] md:py-[20px]">
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
        <Pagination
          onChange={(_, page) => {
            dispatch(setStickerData({ page }));
          }}
          count={totalPage}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Stickers;
