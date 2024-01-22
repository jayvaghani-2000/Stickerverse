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
import { productAnimation, productHoverEffect } from "@/app/utils/animation";
import { currency } from "@/app/utils/constant";
import { useLocalCart } from "@/app/utils/context/localCartProvider";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { trendingStickerType } from "../../../../../pages/api/types";
import Icon from "../../Icon";
import { MotionImage } from "../../MotionImage";
import InlineSpinner from "../../Shared/InlineSpinner";
import ItemCount from "../../Shared/ItemCount";
import Rating from "../../Shared/Rating";
import WishlistItem from "../../Shared/WishlistItem";

const Sticker = ({ sticker }: { sticker: trendingStickerType[0] }) => {
  const i = sticker;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const [addToWishlist, { isLoading: loadingAddToWishlist }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: loadingRemoveFromWishlist }] =
    useRemoveFromWishlistMutation();
  const [fetchWishlist, { isLoading: loadingGetWishlist }] =
    useLazyGetUserWishlistQuery();
  const { wishlist } = useWishlistStore();

  const aspectRatio = i.image[0].width / i.image[0].height;
  const [handleAddToCart] = useAddToCartMutation();
  const { refetchCart, createCart, refetchVisitCart } = useLocalCart();
  const { visitorCartId } = useVisitorCartStore();
  const [handleAddToVisitorCart] = useAddToVisitorCartMutation();
  const { authenticated } = useAuthStore();
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

  const isInWishlist = wishlist.findIndex(j => j.stickerId === i.id) > -1;

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

  return (
    <motion.figure {...productAnimation(i.id.toString())}>
      <motion.div
        key={i.id}
        className="w-[150px] sm:w-[180px] md:w-[240px]  border-2 border-black rounded-2xl bg-white flex flex-col "
        {...productHoverEffect()}
      >
        <div className="relative py-[10px] sm:py-[15px] md:py-[20px]">
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
              {i.price - 0.01} {currency}
            </Typography>
          </div>
          <div className="ml-[20px] md:ml-[24px] relative flex justify-center items-center mt-1 sm:mt-2 md:mt-3">
            <ItemCount quantity={quantity} setQuantity={setQuantity} />
            <button
              className="ml-1 sm:ml-2 w-[20px] md:w-[24px] h-[20px] md:h-[24px]"
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
              {loading ? (
                <InlineSpinner />
              ) : (
                <Icon name="cart" className="h-full w-full" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.figure>
  );
};

export default Sticker;
