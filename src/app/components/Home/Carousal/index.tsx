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
import { useMobileScreen } from "@/app/utils/useScreenSize";

const CarousalImages = [
  {
    path: "/assets/png/carousal1.png",
    alt: "main",
    position: { x: "20%", y: "65%", mx: "10%" },
  },
  {
    path: "/assets/png/carousal2.png",
    alt: "school",
    position: { x: "65%", y: "60%", mx: "55%" },
  },
  {
    path: "/assets/png/carousal3.png",
    alt: "summer",
    position: { x: "60%", y: "65%", mx: "45%" },
  },
];

const Carousal = () => {
  const [position, setPosition] = useState(CarousalImages[0].position);
  const isMobile = useMobileScreen();

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute h-full w-full z-[2]"
        animate={{ x: isMobile ? position.mx : position.x, y: position.y }}
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
