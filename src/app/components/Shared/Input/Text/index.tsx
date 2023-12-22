import React from "react";

type propsType = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Text = (props: propsType) => {
  const { ...rest } = props;
  return (
    <input
      className="w-full bg-white border-2 border-black placeholder-placeholder outline-none pl-3 sm:pl-4 md:pl-5 font-medium text-[16px] h-[32px] sm:h-[38px] md:h-[50px] rounded-none"
      {...rest}
    />
  );
};

export default Text;
