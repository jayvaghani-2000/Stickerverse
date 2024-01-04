import { ThemeColor } from "@/app/theme";
import {
  ButtonProps,
  Button as MUIButton,
  Typography,
  TypographyProps,
} from "@mui/material";
import classNames from "classnames";
import React from "react";
import Icon from "../../Icon";

type className = React.HTMLProps<HTMLElement>["className"];
const roundedShadow: className =
  "gap-1 items-center border-solid	normal-case px-4 sm:px-5 md:px-6 py-2 border-2 border-black rounded-full shadow-primaryShadow disabled:opacity-100 disabled:cursor-not-allowed";
const roundedShadowFlat: className =
  "gap-1 items-center border-solid	normal-case px-3 sm:px-4 md:px-5 py-1 border-2 border-black rounded-full shadow-primaryShadow disabled:opacity-100 disabled:cursor-not-allowed ";
const borderBottom: className =
  "gap-1 items-center border-solid	normal-case px-0 py-0 border-b-2 disabled:opacity-100 disabled:cursor-not-allowed rounded-none";

const variants = {
  "rounded-shadow": roundedShadow,
  "rounded-shadow-flat": roundedShadowFlat,
  "border-bottom": borderBottom,
};

type propType = {
  children: React.ReactNode;
  childClassName?: React.HTMLProps<HTMLElement>["className"];
  prefixWrapperClassName?: React.HTMLProps<HTMLElement>["className"];
  className?: React.HTMLProps<HTMLElement>["className"];
  variant?: keyof typeof variants;
  typography?: TypographyProps["variant"];
  icon?: string;
  prefixIcon?: string;
} & Omit<ButtonProps, "className" | "children" | "variant">;

const Button = (props: propType) => {
  const {
    children,
    childClassName = "",
    className = "",
    variant = "rounded-shadow",
    typography = "button",
    type = "button",
    icon = "",
    prefixIcon = "",
    prefixWrapperClassName = "",
    ...rest
  } = props;

  return (
    <MUIButton
      className={classNames(variants[variant], className)}
      type={type}
      sx={{
        "&.Mui-disabled": {
          pointerEvents: "unset",
          color: ThemeColor.HALF_BLACK,
        },
      }}
      {...rest}
    >
      {prefixIcon && (
        <div
          className={classNames({
            [prefixWrapperClassName]: prefixWrapperClassName,
          })}
        >
          <Icon name={prefixIcon} className="h-full w-full" />
        </div>
      )}
      <Typography variant={typography} className={childClassName}>
        {children}
      </Typography>
      {icon && (
        <div className="h-[15px] sm:h-[18px] md:h-[21px] w-[15px] sm:w-[18px] md:w-[21px]">
          <Icon name={icon} className="h-full w-full" />
        </div>
      )}
    </MUIButton>
  );
};

export default Button;
