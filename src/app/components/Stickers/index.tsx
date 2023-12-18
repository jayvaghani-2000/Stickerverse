"use client";
import { setStickerData, useStickerStore } from "@/app/store/stickers";
import { useLazyGetStickerQuery } from "@/app/store/stickers/api";
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
import { motion, animate } from "framer-motion";
import { productAnimation, productClickEffect } from "@/app/utils/animation";
import { MotionImage } from "../MotionImage";
import { Pagination, Typography } from "@mui/material";
import { Skeleton } from "../Skeleton";
import ItemCount from "../Shared/ItemCount";
import classNames from "classnames";
import Button from "../Shared/Button";
import { useRouter, useSearchParams } from "next/navigation";

type className = React.HTMLProps<HTMLElement>["className"];
const dummySticker: className = "w-[150px] sm:w-[180px] md:w-[240px]";

const Stickers = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    page,
    pageSize,
    sticker,
    totalPage,
    filter,
    result: resultCount,
  } = useStickerStore();

  const currentPage = searchParams!.has("p")
    ? Number(searchParams!.get("p"))
    : 1;

  const rendered = useRef(false);
  const { category, price, sortBy } = filter;
  const { data } = useGetStickerCategoryQuery({});
  const [getStickers, { isFetching }] = useLazyGetStickerQuery();
  const dispatch = useAppDispatch();
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();

  const stickerOnPage =
    resultCount / currentPage > pageSize ? pageSize : resultCount % pageSize;

  const categories =
    data?.map(i => ({
      value: i.id,
      label: i.categoryName,
    })) ?? [];

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
      dispatch(setStickerData({ page: currentPage }));
      dispatch(setStickerData({ pageSize: data.pageSize }));
      dispatch(setStickerData({ sticker: data.sticker }));
      dispatch(setStickerData({ totalPage: data.totalPage }));
      dispatch(setStickerData({ result: data.result }));
    }
  };

  useEffect(() => {
    handleGetSticker(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      return;
    }
    handleGetSticker(1);
    router.replace(`/stickers?p=1`);
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
        <div className="flex flex-wrap justify-around gap-[8px] sm:gap-[12px] md:gap-[20px] gap-y-5 scrollbar-hide">
          {sticker.length !== 0 && !isFetching
            ? sticker.map((i, index) => {
                const aspectRatio = i.image[0].width / i.image[0].height;

                const imageClass = `image-${i.id}`;

                return (
                  <motion.figure
                    key={i.id}
                    {...productAnimation(i.id.toString())}
                    onHoverStart={() => {
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
                      animate([
                        [
                          `.${imageClass}`,
                          {
                            boxShadow: "-1px -1px 0px 0px #fff",
                            transitionDuration: 300,
                          },
                        ],
                      ]);
                    }}
                  >
                    <motion.div
                      className="w-[150px] sm:w-[180px] md:w-[240px]  flex flex-col "
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
                      <div className="flex-1 flex flex-col items-center pt-[5px] md:pt-[10px]  pb-[30px] sm:pb-[40px] md:pb-[80px]">
                        <Typography variant="subtitle2" className="text-center">
                          {i.productName}
                        </Typography>

                        <div className="flex justify-center items-start mt-1 gap-[2px] sm:gap-1 ">
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
                          className="bg-primeGreen hover:bg-primeGreen w-fit mt-1 sm:mt-2 md:mt-3 pl-1 sm:pl-2 md:pl-2  pr-1 sm:pr-2 md:pr-2 pt-1 pb-1"
                          icon="cart"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  </motion.figure>
                );
              })
            : Array.from(Array(stickerOnPage || pageSize).keys()).map(i => {
                return (
                  <motion.figure key={i}>
                    <div className="w-[150px] sm:w-[180px] md:w-[240px]  flex flex-col">
                      <div
                        className={`w-full h-[150px] sm:h-[170px] md:h-[240px] m-auto bg-white border-2 border-black overflow-hidden`}
                      >
                        <Skeleton />
                      </div>

                      <div className="px-[4px] sm:px-[12px] md:px-[32px] flex-1 flex flex-col items-center  pt-[5px] md:pt-[10px]  pb-[30px] sm:pb-[40px] md:pb-[80px]">
                        <div className="text-center h-[15px] sm:h-[18px] md:h-[22.5px] w-full">
                          <Skeleton />
                        </div>
                        <div className="text-center mt-1 h-[10px] sm:h-[14px] md:h-[18px] w-full">
                          <Skeleton />
                        </div>
                        <div className="text-center mt-1 h-[17px] sm:h-[24px] md:h-[30px] w-full">
                          <Skeleton />
                        </div>
                        <div className="text-center mt-1 sm:mt-2 md:mt-3 h-[27px] sm:h-[30px] md:h-[34.5px] w-full">
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
          className="my-2"
          onChange={(_, page) => {
            router.push(`/stickers?p=${page}`);
          }}
          page={currentPage}
          classes={{
            ul: "justify-center",
          }}
          count={totalPage}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Stickers;
