import {
  Button as MUIButton,
  Typography,
  TypographyProps,
} from "@mui/material";
import classNames from "classnames";
import React from "react";

type className = React.HTMLProps<HTMLElement>["className"];
const roundedShadow: className =
  "border-solid	px-4 sm:px-5 md:px-6 py-2 border-2 border-black rounded-full shadow-primaryShadow ";
const roundedShadowFlat: className =
  "border-solid	px-3 sm:px-4 md:px-5 py-1 border-2 border-black rounded-full shadow-primaryShadow ";

const variants = {
  "rounded-shadow": roundedShadow,
  "rounded-shadow-flat": roundedShadowFlat,
};

type propType = {
  children: React.ReactNode;
  childClassName?: React.HTMLProps<HTMLElement>["className"];
  className?: React.HTMLProps<HTMLElement>["className"];
  variant?: keyof typeof variants;
  typography?: TypographyProps["variant"];
};

const Button = (props: propType) => {
  const {
    children,
    childClassName = "",
    className = "",
    variant = "rounded-shadow",
    typography = "button",
  } = props;

  return (
    <MUIButton className={classNames(variants[variant], className)}>
      <Typography variant={typography} className={childClassName}>
        {children}
      </Typography>
    </MUIButton>
  );
};

export default Button;
