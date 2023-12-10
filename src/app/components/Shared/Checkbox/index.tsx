import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import React from "react";
import Icon from "../../Icon";

type propsType = {
  label: React.ReactNode;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

const Checkbox = (props: propsType) => {
  const { label = "Choose", value, onChange, name } = props;
  return (
    <FormControlLabel
      classes={{
        root: "m-0 gap-[5px]",
      }}
      control={
        <MuiCheckbox
          color="default"
          icon={<Icon name="unchecked" className="h-3 sm:h-4 md:h-5" />}
          checkedIcon={<Icon name="checked" className="h-3 sm:h-4 md:h-5" />}
          size="small"
          classes={{
            root: " p-0 inline-block w-fit h-fit",
          }}
          checked={value}
          name={name}
          onChange={(e, checked) => {
            onChange(e);
          }}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
