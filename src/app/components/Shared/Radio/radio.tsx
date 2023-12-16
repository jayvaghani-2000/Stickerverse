import React from "react";
import Icon from "../../Icon";
import styles from "./radio.module.scss";
import classNames from "classnames";

const RadioIcon = (props: { selected?: boolean }) => {
  const { selected = false } = props;
  return (
    <div className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5">
      <Icon
        name="radio"
        className={classNames("h-3 sm:h-4 md:h-5", {
          [styles.wrapper]: !selected,
        })}
      />
    </div>
  );
};

export default RadioIcon;
