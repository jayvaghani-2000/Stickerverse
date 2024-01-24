import React from "react";
import Alert from "../../Alert";

type propsType = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const Text = (props: propsType) => {
  const { error, ...rest } = props;
  return (
    <div className="relative w-full">
      <input
        className="w-full bg-white border-2 border-black placeholder-placeholder outline-none pl-3 sm:pl-4 md:pl-5 font-medium text-[16px] h-[32px] sm:h-[38px] md:h-[50px] rounded-none"
        {...rest}
      />
      {!!error ? <Alert message={error} /> : null}
    </div>
  );
};

export default Text;
