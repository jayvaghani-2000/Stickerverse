import classNames from "classnames";
import Images, { imagesList } from "./svg/import";
import { HTMLProps } from "react";

type propType = {
  name: imagesList;
  className?: HTMLProps<HTMLElement>["className"];
};

const Icon = (props: propType) => {
  const { name, className = "" } = props;

  const Image = Images[name];

  return (
    <div className={classNames("h-fit w-fit", { [className]: !!className })}>
      <Image />
    </div>
  );
};

export default Icon;
