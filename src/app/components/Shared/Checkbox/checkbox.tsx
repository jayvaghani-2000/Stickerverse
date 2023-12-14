import React from "react";
import Icon from "../../Icon";
import styles from "./checkbox.module.scss";
import classNames from "classnames";

const CheckboxIcon = (props: { selected?: boolean }) => {
  const { selected = false } = props;
  return (
    <div className="h-3 sm:h-4 md:h-5">
      <Icon
        name="checked"
        className={classNames("h-3 sm:h-4 md:h-5", {
          [styles.wrapper]: !selected,
        })}
      />
    </div>
  );
};

export default CheckboxIcon;
