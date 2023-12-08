import React from "react";
import Carousal from "./Carousal";
import StickerTrend from "./StickerTrend";
import Description from "./Description";
import Quote from "./Quote";
import Example from "./Examples";

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
