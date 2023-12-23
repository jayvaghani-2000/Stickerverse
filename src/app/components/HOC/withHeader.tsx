import { paddingSpacing } from "@/app/utils/styles";
import React from "react";
import HeaderBanner from "../HeaderBanner";

const WithHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={paddingSpacing}>
      <HeaderBanner />
      {children}
    </div>
  );
};

export default WithHeader;
