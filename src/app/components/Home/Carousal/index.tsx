import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousal.scss";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const CarousalImages = [
  {
    path: "/assets/png/carousal1.png",
  },
  {
    path: "/assets/png/carousal2.png",
  },
  {
    path: "/assets/png/carousal3.png",
  },
];

const Carousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Image src="/assets/png/carousal1.png" alt="main" fill />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/assets/png/carousal2.png" alt="school" fill />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/assets/png/carousal3.png" alt="summer" fill />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousal;
