import { Button as MUIButton, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";

const roundedShadow: React.HTMLProps<HTMLElement>["className"] =
  "border-solid	px-4 md:px-6 border-2 border-black rounded-full shadow-primaryShadow ";
const roundedShadowFlat: React.HTMLProps<HTMLElement>["className"] =
  "border-solid	px-2 md:px-3 py-0 border-2 border-black rounded-full shadow-primaryShadow ";

const variants = {
  "rounded-shadow": roundedShadow,
  "rounded-shadow-flat": roundedShadowFlat,
};

type propType = {
  children: React.ReactNode;
  childClassName?: React.HTMLProps<HTMLElement>["className"];
  className?: React.HTMLProps<HTMLElement>["className"];
  variant?: keyof typeof variants;
};

const Button = (props: propType) => {
  const {
    children,
    childClassName = "",
    className = "",
    variant = "rounded-shadow",
  } = props;

  return (
    <MUIButton className={classNames(variants[variant], className)}>
      <Typography variant="button" className={childClassName}>
        {children}
      </Typography>
    </MUIButton>
  );
};

export default Button;
