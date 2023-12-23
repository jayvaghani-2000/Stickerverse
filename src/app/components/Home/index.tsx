"use client";
import Carousal from "./Carousal";
import Description from "./Description";
import Example from "./Examples";
import Quote from "./Quote";
import StickerTrend from "./StickerTrend";

const Home = () => {
  return (
    <div>
      <Carousal />
      <StickerTrend />
      <Description />
      <Quote />
      <Example />
    </div>
  );
};

export default Home;
