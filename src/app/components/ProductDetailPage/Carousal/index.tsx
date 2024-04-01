import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { getStickerDetailType } from "actions/utils/types.type";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MotionImage } from "../../MotionImage";
import "./carousal.scss";

type propType = {
  product: getStickerDetailType["data"];
};

const Carousal = (props: propType) => {
  const { product } = props;
  const { image } = product!;
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();
  const wrapper = useRef<HTMLDivElement>(null!);

  const getImageSize = () => {
    if (isMobile) {
      return "300px";
    } else if (isTab) {
      return "400px";
    }
    return "570px";
  };

  return (
    <div className="relative flex justify-center">
      <div
        ref={wrapper}
        className="w-full md:w-[400px] lg:w-[570px] overflow-hidden"
      >
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          onSlideChange={slide => {}}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          {image.map(i => (
            <SwiperSlide key={i.id}>
              <div
                className="w-full md:w-[400px] lg:w-[570px]"
                style={{ aspectRatio: 1 }}
              >
                <MotionImage
                  src={i.url}
                  alt=""
                  fill
                  placeholder="blur"
                  blurDataURL={i.blurUrl}
                  style={{ objectFit: "cover" }}
                  sizes={getImageSize()}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousal;
