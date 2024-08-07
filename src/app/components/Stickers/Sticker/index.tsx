import { useAuthStore } from "@/app/store/authentication";
import { abortGetCartApi, useAddToCartMutation } from "@/app/store/cart/api";
import { useVisitorCartStore } from "@/app/store/visitorCart";
import {
  abortGetVisitorCartApi,
  useAddToVisitorCartMutation,
} from "@/app/store/visitorCart/api";
import { useWishlistStore } from "@/app/store/wishlist";
import {
  abortGeWishlistApi,
  useAddToWishlistMutation,
  useLazyGetUserWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/app/store/wishlist/api";
import { productAnimation, productClickEffect } from "@/app/utils/animation";
import { currency } from "@/app/utils/constant";
import { useLocalCart } from "@/app/utils/context/localCartProvider";
import { getPlatform } from "@/app/utils/getPlatform";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Typography } from "@mui/material";
import { animate, motion } from "framer-motion";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { stickersType } from "../../../../../pages/api/types";
import { MotionImage } from "../../MotionImage";
import Button from "../../Shared/Button";
import InlineSpinner from "../../Shared/InlineSpinner";
import ItemCount from "../../Shared/ItemCount";
import WishlistItem from "../../Shared/WishlistItem";
import styles from "../stickers.module.scss";

const Sticker = ({ sticker }: { sticker: stickersType["sticker"][0] }) => {
  const title = useRef<HTMLHeadingElement>(null!);
  const titleBackup = useRef<HTMLHeadingElement>(null!);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addToWishlist, { isLoading: loadingAddToWishlist }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: loadingRemoveFromWishlist }] =
    useRemoveFromWishlistMutation();
  const [fetchWishlist, { isLoading: loadingGetWishlist }] =
    useLazyGetUserWishlistQuery();
  const { wishlist } = useWishlistStore();

  const isTab = useTabScreen();
  const isMobileSize = useMobileScreen();
  const { refetchCart, createCart, refetchVisitCart } = useLocalCart();
  const { visitorCartId } = useVisitorCartStore();
  const [handleAddToVisitorCart] = useAddToVisitorCartMutation();
  const [handleAddToCart] = useAddToCartMutation();
  const { authenticated } = useAuthStore();
  const { isMobile } = getPlatform();
  const aspectRatio = sticker.image[0].width / sticker.image[0].height;
  const imageClass = `image-${sticker.id}`;

  const i = sticker;
  const isInWishlist = wishlist.findIndex(j => j.stickerId === i.id) > -1;

  const getImageSize = () => {
    if (isMobileSize) {
      return "100px";
    } else if (isTab) {
      return "150px";
    }
    return "200px";
  };

  const handleWishlistItem = async () => {
    try {
      if (isInWishlist) {
        await removeFromWishlist({ stickerIds: [i.id] });
      } else {
        await addToWishlist({ stickerIds: [i.id] });
      }
    } catch (err) {
    } finally {
      abortGeWishlistApi();
      await fetchWishlist({});
    }
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
      <Link href={`/stickers/${i.slug}`}>
        <motion.div
          className="w-[150px] sm:w-[180px] md:w-[240px]  flex flex-col"
          {...productClickEffect()}
        >
          <motion.div
            className={`${imageClass} relative py-[10px] sm:py-[15px] md:py-[20px] bg-white border-2 border-black `}
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
            <div className="absolute z-10 bottom-1 right-1 sm:bottom-2 sm:right-2">
              <WishlistItem
                favorite={isInWishlist}
                onClick={handleWishlistItem}
                loading={
                  loadingAddToWishlist ||
                  loadingGetWishlist ||
                  loadingRemoveFromWishlist
                }
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
                {currency}
                {i.price - 0.01}
              </Typography>
            </div>
            <div className="mt-1 sm:mt-2 md:mt-3">
              <ItemCount quantity={quantity} setQuantity={setQuantity} />
            </div>

            <Button
              childClassName="normal-case"
              typography="subtitle2"
              className="bg-primeGreen hover:bg-primeGreen w-fit mt-2 sm:mt-3 md:mt-4 pl-2 sm:pl-3 md:pl-4  pr-2 sm:pr-3 md:pr-3  pt-1 pb-1 sm:pt-[6px] sm:pb-[6px] md:pt-2"
              icon={loading ? "" : "cart"}
              onClick={async () => {
                setLoading(true);
                try {
                  if (authenticated) {
                    await handleAddToCart({
                      quantity: quantity,
                      stickerId: sticker.id,
                    });
                    abortGetCartApi();
                    await refetchCart();
                    setLoading(false);
                  } else {
                    if (visitorCartId) {
                      await handleAddToVisitorCart({
                        id: visitorCartId,
                        body: {
                          quantity: quantity,
                          stickerId: sticker.id,
                        },
                      });
                      abortGetVisitorCartApi();
                      await refetchVisitCart(visitorCartId);
                      setLoading(false);
                    } else {
                      const id = await createCart();
                      if (id) {
                        await handleAddToVisitorCart({
                          id: id,
                          body: {
                            quantity: quantity,
                            stickerId: sticker.id,
                          },
                        });
                        abortGetVisitorCartApi();
                        await refetchVisitCart(id);
                        setLoading(false);
                      }
                    }
                  }
                  setQuantity(1);
                } catch (err) {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              Add to Cart{" "}
              {loading ? (
                <div className="inline-block ml-1 h-[15px] sm:h-[18px] md:h-[21px] w-[15px] sm:w-[18px] md:w-[21px]">
                  <InlineSpinner />
                </div>
              ) : null}
            </Button>
          </div>
        </motion.div>
      </Link>
    </motion.figure>
  );
};

export default Sticker;
