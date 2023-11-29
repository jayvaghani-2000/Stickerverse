import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousal.scss";
import { motion } from "framer-motion";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Button from "../../Shared/Button";

const CarousalImages = [
  {
    path: "/assets/png/carousal1.png",
    alt: "main",
    position: { x: "20%", y: "65%" },
  },
  {
    path: "/assets/png/carousal2.png",
    alt: "school",
    position: { x: "60%", y: "60%" },
  },
  {
    path: "/assets/png/carousal3.png",
    alt: "summer",
    position: { x: "60%", y: "65%" },
  },
];

const Carousal = () => {
  const [position, setPosition] = useState(CarousalImages[0].position);

  return (
    <div className="relative">
      <motion.div
        className="absolute h-full w-full z-10"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring" }}
      >
        <Button className="bg-primeGreen hover:bg-primeGreen">Shop Now</Button>
      </motion.div>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={slide => {
          setPosition(CarousalImages[slide.activeIndex].position);
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {CarousalImages.map(i => (
          <SwiperSlide key={i.alt}>
            <Image src={i.path} alt={i.alt} fill />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousal;
