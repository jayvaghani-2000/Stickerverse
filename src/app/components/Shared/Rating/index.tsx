import React from "react";
import MuiRating from "@mui/material/Rating";
import { ThemeColor } from "@/app/theme";
import StarIcon from "@mui/icons-material/Star";

const Rating = () => {
  return (
    <MuiRating
      name="size-small"
      sx={{
        ".MuiRating-icon": {
          width: "16px",
        },
        ".MuiSvgIcon-root": {
          height: "16px",
          width: "16px",
        },
        ".MuiRating-iconFilled": {
          ".MuiSvgIcon-root": {
            fill: ThemeColor.YELLOW,
          },
        },
        "@media screen and (max-width: 900px)": {
          ".MuiRating-icon": {
            width: "14px", // Adjust the width for larger screens
          },
          ".MuiSvgIcon-root": {
            height: "14px", // Adjust the height for larger screens
            width: "14px",
          },
        },
        "@media screen and (max-width: 600px)": {
          ".MuiRating-icon": {
            width: "12px", // Adjust the width for larger screens
          },
          ".MuiSvgIcon-root": {
            height: "12px", // Adjust the height for larger screens
            width: "12px",
          },
        },
      }}
      emptyIcon={
        <StarIcon style={{ color: ThemeColor.GRAY_STAR }} fontSize="inherit" />
      }
      precision={0.1}
      defaultValue={2.5}
      readOnly
      size="small"
    />
  );
};

export default Rating;
