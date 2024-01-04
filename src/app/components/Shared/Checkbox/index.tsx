import {
  CheckboxProps,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import React from "react";
import CheckboxIcon from "./checkbox";

type propsType = Omit<
  CheckboxProps,
  "onChange" | "label" | "value" | "name"
> & {
  label?: React.ReactNode;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

const Checkbox = (props: propsType) => {
  const { label = "", value, onChange, name, ...rest } = props;
  return (
    <FormControlLabel
      classes={{
        root: "m-0 gap-[5px]",
      }}
      control={
        <MuiCheckbox
          color="default"
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxIcon selected />}
          size="small"
          classes={{
            root: " p-0 inline-block w-fit h-fit",
          }}
          checked={value}
          name={name}
          onChange={(e, checked) => {
            onChange(e);
          }}
          {...rest}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
