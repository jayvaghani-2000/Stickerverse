"use client";
import { useAuthStore } from "@/app/store/authentication";
import { abortGetCartApi, useAddToCartMutation } from "@/app/store/cart/api";
import { useVisitorCartStore } from "@/app/store/visitorCart";
import {
  abortGetVisitorCartApi,
  useAddToVisitorCartMutation,
} from "@/app/store/visitorCart/api";
import { currency } from "@/app/utils/constant";
import { useLocalCart } from "@/app/utils/context/localCartProvider";
import { Typography } from "@mui/material";
import { getStickerDetailType } from "actions/utils/types.type";
import { useState } from "react";
import Nova from "../Font/nova";
import Button from "../Shared/Button";
import InlineSpinner from "../Shared/InlineSpinner";
import ItemCount from "../Shared/ItemCount";
import Carousal from "./Carousal";
import Preview from "./preview";

type propType = {
  product: getStickerDetailType["data"];
};

const ProductDetail = (props: propType) => {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { refetchCart, createCart, refetchVisitCart } = useLocalCart();
  const { visitorCartId } = useVisitorCartStore();
  const [handleAddToVisitorCart] = useAddToVisitorCartMutation();
  const [handleAddToCart] = useAddToCartMutation();
  const { authenticated } = useAuthStore();

  return (
    <div className="mt-6 sm:mt-10">
      <Carousal product={product} />
      <Preview product={product} />
      <Nova className="text-center mt-6 sm:mt-10">{product?.productName}</Nova>
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
          {product?.price! - 0.01}
        </Typography>
      </div>
      <div className="mt-1 sm:mt-2 md:mt-3 flex justify-center gap-3">
        <Typography variant="subtitle2">Quanitity</Typography>{" "}
        <ItemCount quantity={quantity} setQuantity={setQuantity} />
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          childClassName="normal-case"
          typography="subtitle2"
          className="bg-primeGreen hover:bg-primeGreen w-fit mt-2 sm:mt-3 md:mt-4 pl-2 sm:pl-3 md:pl-4  pr-2 sm:pr-3 md:pr-3  pt-1 pb-1 sm:pt-[6px] sm:pb-[6px] md:pt-2"
          icon={loading ? "" : "cart"}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            try {
              if (authenticated) {
                await handleAddToCart({
                  quantity: quantity,
                  stickerId: product?.id!,
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
                      stickerId: product?.id!,
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
                        stickerId: product?.id!,
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
        >
          Add to Cart{" "}
          {loading ? (
            <div className="inline-block ml-1 h-[15px] sm:h-[18px] md:h-[21px] w-[15px] sm:w-[18px] md:w-[21px]">
              <InlineSpinner />
            </div>
          ) : null}
        </Button>
        <Button
          childClassName="normal-case"
          typography="subtitle2"
          className="bg-lightOrange hover:bg-lightOrange w-fit mt-2 sm:mt-3 md:mt-4 pl-2 sm:pl-3 md:pl-4  pr-2 sm:pr-3 md:pr-3  pt-1 pb-1 sm:pt-[6px] sm:pb-[6px] md:pt-2"
          icon={loading ? "" : "heartBlack"}
          disabled={loading}
        >
          Wish List{" "}
          {loading ? (
            <div className="inline-block ml-1 h-[15px] sm:h-[18px] md:h-[21px] w-[15px] sm:w-[18px] md:w-[21px]">
              <InlineSpinner />
            </div>
          ) : null}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
