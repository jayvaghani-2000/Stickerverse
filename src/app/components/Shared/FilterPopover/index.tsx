import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import Icon from "../../Icon";

type propType = {
  label: string;
  popover: React.ReactNode;
};

export default function FilterPopover(props: propType) {
  const { label, popover } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        className="border-2 border-black rounded-none hover:border-2 pl-[10px] sm:pl-[12px] md:pl-[15px] pr-[5px] sm:pr-[5px] md:pr-[8px] bg-white flex gap-1 hover:bg-white"
      >
        <Typography variant="subtitle2" className="capitalize">
          {label}
        </Typography>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-[15px] sm:h-[18px] md:h-[22px] w-[15px] sm:w-[18px] md:w-[22px]"
        >
          <Icon name="dropChevron" className="h-full w-full" />
        </motion.div>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{
          paper: "rounded-none border-2 border-black mt-1",
        }}
      >
        <div>{popover}</div>
      </Popover>
    </>
  );
}
