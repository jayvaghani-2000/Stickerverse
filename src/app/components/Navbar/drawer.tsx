import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Icon from "../Icon";

type propType = {
  open: boolean;
  toggleNav: (value: boolean) => void;
};

export default function Drawer(props: propType) {
  const { open, toggleNav } = props;

  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
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
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={toggleDrawer("left", false)}
      onOpen={toggleDrawer("left", true)}
    >
      <div className="w-[300px] relative min-h-full overflow-auto max-w-[100vw] bg-cream">
        <Image
          src="/assets/png/navSticker.png"
          width={300}
          height={160}
          alt="nav"
        />
        <div className="h-[105px] w-[105px] absolute top-[90px] left-4">
          <Icon name="logo" className="scale-[0.75] origin-top-left" />
        </div>
      </div>
    </SwipeableDrawer>
  );
}
