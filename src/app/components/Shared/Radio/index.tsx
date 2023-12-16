import * as React from "react";
import MuiRadio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioIcon from "./radio";
import { Typography } from "@mui/material";

function BpRadio(props: RadioProps) {
  return (
    <MuiRadio
      color="default"
      checkedIcon={<RadioIcon selected />}
      icon={<RadioIcon />}
      classes={{
        root: "p-0",
      }}
      {...props}
    />
  );
}

type propType<T> = {
  group: { label: string; value: T }[];
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  value?: T;
};

export default function Radio<T extends number | string>(props: propType<T>) {
  const { group, name, onChange, value } = props;

  return (
    <RadioGroup
      aria-labelledby="demo-customized-radios"
      value={value || ""}
      name={name}
      classes={{
        root: "gap-1 sm:gap-2",
      }}
      onChange={onChange}
    >
      {group.map(i => (
        <FormControlLabel
          classes={{
            root: "mr-0 ml-0 gap-1",
          }}
          key={i.value}
          value={i.value}
          control={<BpRadio />}
          label={
            <Typography variant="subtitle2" className="whitespace-nowrap">
              {i.label}
            </Typography>
          }
        />
      ))}
    </RadioGroup>
  );
}
