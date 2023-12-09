import classNames from "classnames";
import { HTMLProps } from "react";
import SVG from "react-inlinesvg";

type propType = {
  name: string;
  className?: HTMLProps<HTMLElement>["className"];
};

const Icon = (props: propType) => {
  const { name, className = "" } = props;

  return (
    <SVG
      src={`/assets/svg/${name}.svg`}
      className={classNames({ [className]: !!className })}
    />
  );
};

export default Icon;
