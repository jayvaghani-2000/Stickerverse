"use client";
import { useAppDispatch } from "@/app/store";
import { useGetStickerCategoryQuery } from "@/app/store/category/api";
import { setStickerData, useStickerStore } from "@/app/store/stickers";
import { useLazyGetStickerQuery } from "@/app/store/stickers/api";
import { placeholder } from "@/app/utils/constant";
import { randomColor } from "@/app/utils/skeleton";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Pagination } from "@mui/material";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { stickersType } from "../../../../pages/api/types";
import { MotionImage } from "../MotionImage";
import FilterDrawer from "../Shared/FilterDrawer";
import FilterPopover from "../Shared/FilterPopover";
import { Skeleton } from "../Skeleton";
import AppliedFilter from "./AppliedFilter";
import Category from "./Category";
import Range from "./Range";
import Sort from "./Sort";
import Sticker from "./Sticker";

type className = React.HTMLProps<HTMLElement>["className"];
const dummySticker: className = "w-[150px] sm:w-[180px] md:w-[240px]";

const Stickers = () => {
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
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

      dispatch(
        setStickerData({
          page: currentPage,
          pageSize: data.pageSize,
          sticker: data.sticker,
          totalPage: data.totalPage,
          result: data.result,
        })
      );
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
    <div>
      <div className="mt-4 sm:mt-6 md:mt-8 flex justify-between">
        <div className="flex gap-1 sm:gap-2">
          <FilterDrawer label="Price" popover={<Range />} />
          <FilterDrawer
            label="Theme"
            popover={<Category categories={categories} />}
          />
        </div>
        <FilterPopover label="Sort" popover={<Sort />} />
      </div>
      <AppliedFilter categories={categories} />

      <div className="mt-[20px] sm:mt-[32px] md:mt-[40px]">
        <div className="relative h-full flex flex-wrap justify-around gap-[8px] sm:gap-[12px] md:gap-[20px] gap-y-5 scrollbar-hide">
          {sticker.length !== 0 && !isFetching
            ? sticker.map(i => {
                return <Sticker key={i.id} sticker={i} />;
              })
            : null}
          <AnimatePresence>
            <div
              className={classNames(
                "w-full flex flex-wrap justify-around gap-[8px] sm:gap-[12px] md:gap-[20px] gap-y-5 ",
                {
                  ["absolute -z-10 opacity-0"]:
                    sticker.length !== 0 && !isFetching,
                }
              )}
            >
              {Array.from(Array(stickerOnPage || pageSize).keys()).map(
                (_, index) => {
                  const color = randomColor();
                  return (
                    <motion.figure key={index}>
                      <div className="w-[150px] sm:w-[180px] md:w-[240px]  flex flex-col">
                        <div
                          className={`w-full h-[150px] sm:h-[170px] md:h-[240px] m-auto bg-white border-2 border-black overflow-hidden relative flex items-center`}
                        >
                          <div
                            className={`absolute w-full  z-10 h-[130px] sm:h-[140px] md:h-[200px] m-auto overflow-hidden flex justify-center items-center`}
                            style={{
                              aspectRatio:
                                placeholder.width / placeholder.height,
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

                        <div className="px-[4px] sm:px-[12px] md:px-[32px] flex-1 flex flex-col items-center  pt-[5px] md:pt-[10px]  pb-[30px] sm:pb-[40px] md:pb-[80px]">
                          <div className="text-center h-[15px] sm:h-[18px] md:h-[22.5px] w-full">
                            <Skeleton color={color} />
                          </div>
                          <div className="text-center mt-1 sm:mt-2 h-[10px] sm:h-[14px] md:h-[18px] w-full">
                            <Skeleton color={color} />
                          </div>
                          <div className="text-center  mt-1 sm:mt-2 md:mt-3 h-[24px] md:h-[30px] w-full">
                            <Skeleton color={color} />
                          </div>
                          <div className="text-center mt-2 sm:mt-3 md:mt-4 h-[27px] sm:h-[30px] md:h-[34.5px] w-full">
                            <Skeleton color={color} />
                          </div>
                        </div>
                      </div>
                    </motion.figure>
                  );
                }
              )}
            </div>
          </AnimatePresence>
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
