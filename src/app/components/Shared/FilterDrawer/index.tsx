import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import Icon from "../../Icon";
import { Drawer } from "@mui/material";

type propType = {
  label: string;
  popover: React.ReactNode;
};

export default function FilterDrawer(props: propType) {
  const { label, popover } = props;

  const [openNav, setOpenNav] = React.useState(false);

  const toggleNav = (open: boolean) => {
    setOpenNav(open);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      toggleNav(open);
    };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => toggleNav(true)}
        className="border-2 border-black rounded-none hover:border-2 pl-[10px] sm:pl-[12px] md:pl-[15px] pr-[5px] sm:pr-[5px] md:pr-[8px] bg-white flex gap-1 hover:bg-white"
      >
        <Typography variant="subtitle2" className="capitalize">
          {label}
        </Typography>
        <motion.div
          animate={{ rotate: openNav ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-[15px] sm:h-[18px] md:h-[22px] w-[15px] sm:w-[18px] md:w-[22px]"
        >
          <Icon name="slideChevron" className="h-full w-full" />
        </motion.div>
      </Button>
      <Drawer anchor={"left"} open={openNav} onClose={toggleDrawer(false)}>
        {popover}
      </Drawer>
    </>
  );
}
