import React from "react";
import { MotionImage } from "../../MotionImage";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Typography } from "@mui/material";

const Description = () => {
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();

  const getImageSize = () => {
    if (isMobile) {
      return "120px";
    } else if (isTab) {
      return "30vw";
    }
    return "50vw";
  };

  return (
    <section className="h-[200px] sm:h-[300px] md:h-[500px] flex border-2 border-black ">
      <div className="w-[120px] sm:w-[30vw] md:w-[40vw] lg:w-[50vw] h-full">
        <MotionImage
          src={"/assets/png/stickers.png"}
          alt=""
          fill
          staticImg
          style={{ objectFit: "cover" }}
          sizes={getImageSize()}
        />
      </div>
      <div className="h-full flex-1 flex flex-col gap-[10px] border-l-2 border-black bg-primeGreen justify-center px-[24px] sm:px-[36px] md:px-[48px] lg:px-[90px]">
        <div>
          <Typography variant="h3" className="uppercase">
            {" "}
            Welcome to the StickerVerse,
          </Typography>
          <Typography variant="h3" className="uppercase">
            {" "}
            A wonderland of Hilarity
          </Typography>
        </div>
        <Typography variant="caption">
          Explore StickerVerse, where every amusing, eccentric, and
          side-splitting sticker comes to life! We&apos;ve got a vast collection
          of funny stickers for you to discover and enjoy.
        </Typography>
      </div>
    </section>
  );
};

export default Description;
