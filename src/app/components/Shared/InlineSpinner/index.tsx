import { ThemeColor } from "@/app/theme";
import { CircularProgress } from "@mui/material";
import React from "react";

const InlineSpinner = () => {
  return (
    <CircularProgress
      sx={{
        color: ThemeColor.BLACK,
        "&.MuiCircularProgress-root": {
          height: "10px !important",
          width: "10px !important",
        },
        "@media screen and (max-width: 900px)": {
          height: "8px !important",
          width: "8px !important",
        },
        "@media screen and (max-width: 600px)": {
          height: "6px !important",
          width: "6px !important",
        },
      }}
    />
  );
};

export default InlineSpinner;
