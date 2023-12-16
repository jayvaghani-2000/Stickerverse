import { Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";

type propType = {
  children: React.ReactNode;
  childClassName?: React.HTMLProps<HTMLElement>["className"];
  className?: React.HTMLProps<HTMLElement>["className"];
  onClick?: () => void;
};
const UnderlineButton = (props: propType) => {
  const { children, onClick, className = "" } = props;

  return (
    <button
      onClick={onClick}
      className={classNames("border-b-[1px] border-black py-0 flex", {
        [className]: !!className,
      })}
    >
      <Typography variant="body2" className="leading-none">
        {children}
      </Typography>
    </button>
  );
};

export default UnderlineButton;
