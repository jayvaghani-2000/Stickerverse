import * as React from "react";
import Image from "next/image";
import Icon from "../Icon";
import Link from "next/link";
import classNames from "classnames";
import styles from "./navbar.module.scss";
import { SwipeableDrawer, Typography } from "@mui/material";

type propType = {
  open: boolean;
  toggleNav: (value: boolean) => void;
};

const UN_AUTH_TABS = [
  { title: "Stickers", path: "/stickers" },
  { title: "Category", path: "/categories" },
  { title: "Contact Us", path: "/contact-us" },
];

export default function Drawer(props: propType) {
  const { open, toggleNav } = props;
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

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
    <SwipeableDrawer
      swipeAreaWidth={16}
      anchor={"left"}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <div className="w-[300px] flex flex-col relative min-h-full overflow-auto max-w-[80dvw] bg-cream">
        <Image
          src="/assets/png/navSticker.png"
          width={300}
          height={160}
          alt="nav"
        />
        <div className="absolute top-[90px] left-4">
          <Icon name="logo" className="h-[105px] origin-top-left" />
        </div>

        <div className="px-4 pt-[58px] pb-[38px] flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-[22px]">
            {UN_AUTH_TABS.map(i => (
              <Link
                href={i.path}
                key={i.title}
                className={classNames(
                  "flex justify-between items-center px-[10px] border-b-2 border-lightGray pb-1",
                  styles.navItems
                )}
              >
                <Typography variant="subtitle1" className="pl-5 uppercase">
                  {i.title}
                </Typography>
                <Icon name="chevronRight" className="h-[14px]" />
              </Link>
            ))}
          </div>

          <button className="px-[10px] flex gap-2 items-center">
            <Typography variant="subtitle1" className="uppercase">
              Sign In
            </Typography>
            <Icon name="signIn" className="h-[18px]" />
          </button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
