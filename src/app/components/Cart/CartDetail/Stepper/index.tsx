import { Typography } from "@mui/material";
import classNames from "classnames";

const Bullet = ({ active }: { active: boolean }) => {
  return (
    <div
      className={classNames(
        "inline-block h-[10px] w-[10px] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px] p-[1px] md:p-[2px] border-2 rounded-full",
        { ["border-grayishPink"]: active, ["border-lightGray"]: !active }
      )}
    >
      <div
        className={classNames("h-full w-full  rounded-full", {
          ["bg-grayishPink"]: active,
          ["bg-lightGray"]: !active,
        })}
      />
    </div>
  );
};

const Stepper = () => {
  return (
    <div className="m-auto flex w-full items-center sm:w-[500px] md:w-[700px] ">
      <div className="flex gap-1 items-center px-2">
        <Bullet active={true} />
        <Typography
          variant="subtitle2"
          fontWeight={"500"}
          className="text-grayishPink"
        >
          Bag
        </Typography>
      </div>
      <div className="flex-1 border-[1px] border-dashed" />
      <div className="flex gap-1 items-center px-2">
        <Bullet active={false} />
        <Typography variant="subtitle2" fontWeight={"500"}>
          Address
        </Typography>
      </div>
      <div className="flex-1  border-[1px] border-dashed" />
      <div className="flex gap-1 items-center px-2">
        <Bullet active={false} />
        <Typography variant="subtitle2" fontWeight={"500"}>
          Payment
        </Typography>
      </div>
    </div>
  );
};

export default Stepper;
