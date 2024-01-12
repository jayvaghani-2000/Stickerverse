"use client";

import { Typography } from "@mui/material";
import Nova from "../../Font/nova";
import Icon from "../../Icon";
import Button from "../../Shared/Button";

const EmptyWishlist = () => {
  return (
    <div className="my-[40px] sm:my-[60px]">
      <div className="m-auto w-[260px] h-[180px] sm:w-[360px] sm:h-[240px] md:w-[460px] md:h-[310px]">
        <Icon name="emptyWishlist" className="w-full h-full" />
      </div>

      <Nova className="text-center">One click closer to happiness. </Nova>

      <Typography variant="body2" className="text-center block  my-4">
        Add to your wishlist now
      </Typography>

      <Button className="m-auto block bg-darkPink hover:bg-darkPink w-fit my-4">
        Shop Now
      </Button>
    </div>
  );
};

export default EmptyWishlist;
