import { ThemeColor } from "@/app/theme";
import { Skeleton as MuiSkeleton } from "@mui/material";
import React from "react";

export const Skeleton = () => {
  return (
    <MuiSkeleton
      variant="rectangular"
      sx={{ bgcolor: ThemeColor.GRAY }}
      className="w-full h-full  inline-block"
    />
  );
};
