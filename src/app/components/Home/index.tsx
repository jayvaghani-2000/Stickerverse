import React from "react";
import Carousal from "./Carousal";
import StickerTrend from "./StickerTrend";
import Description from "./Description";
import Quote from "./Quote";
import Example from "./Examples";
import Footer from "../Footer";

const Home = () => {
  return (
    <div>
      <Carousal />
      <StickerTrend />
      <Description />
      <Quote />
      <Example />
      <Footer />
    </div>
  );
};

export default Home;
