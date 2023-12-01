import { ThemeColor } from "@/app/theme";
import { Skeleton } from "@mui/material";
import React from "react";

export const TrendingSticker = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={210}
      height={60}
      sx={{ bgcolor: ThemeColor.GRAY }}
    />
  );
};
