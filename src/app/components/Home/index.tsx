import React from "react";
import Carousal from "./Carousal";
import StickerTrend from "./StickerTrend";
import Description from "./Description";
import Quote from "./Quote";

const Home = () => {
  return (
    <div>
      <Carousal />
      <StickerTrend />
      <Description />
      <Quote />
    </div>
  );
};

export default Home;
