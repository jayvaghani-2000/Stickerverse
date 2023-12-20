import React, { HTMLProps } from "react";
import { Nova_Round } from "next/font/google";
import classNames from "classnames";
const nova = Nova_Round({
  weight: ["400"],
  subsets: ["latin"],
});

type propType = {
  className?: HTMLProps<HTMLElement>["className"];
  children: React.ReactNode;
};

const Nova = (props: propType) => {
  const { className = "", children } = props;
  return (
    <p
      className={classNames(
        "text-[14px] sm:text-[20px] md:text-[24px]",
        nova.className,
        {
          [className]: !!className,
        }
      )}
    >
      {children}
    </p>
  );
};

export default Nova;
