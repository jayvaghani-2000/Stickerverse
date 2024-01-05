import classNames from "classnames";
import Icon from "../../Icon";
import styles from "./checkbox.module.scss";

const CheckboxIcon = (props: { selected?: boolean }) => {
  const { selected = false } = props;
  return (
    <div className="h-3 w-3 sm:w-4 md:w-5 sm:h-4 md:h-5 ">
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
