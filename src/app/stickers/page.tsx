import React from "react";
import Stickers from "../components/Stickers";
import HeaderBanner from "../components/HeaderBanner";
import { paddingSpacing } from "../utils/styles";

const StickerPage = () => {
  return (
    <div className={paddingSpacing}>
      <HeaderBanner />
      <Stickers />
    </div>
  );
};

export default StickerPage;
