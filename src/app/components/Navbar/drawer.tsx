import { useAuthStore } from "@/app/store/authentication";
import { SwipeableDrawer, Typography } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Icon from "../Icon";
import styles from "./navbar.module.scss";

type propType = {
  open: boolean;
  toggleNav: (value: boolean) => void;
  handleLogout: () => void;
};

const UN_AUTH_TABS = [
  { title: "Stickers", path: "/stickers" },
  { title: "Category", path: "/categories" },
  { title: "Contact Us", path: "mailto:jayvaghani2000@gmail.com" },
];

const AUTH_TABS = [
  { title: "Stickers", path: "/stickers" },
  { title: "Category", path: "/categories" },
  { title: "Wishlist", path: "/wishlist" },
  { title: "Cart", path: "/cart" },
  { title: "Orders history", path: "/orders" },
  { title: "Account", path: "/profile" },
  { title: "Contact Us", path: "mailto:jayvaghani2000@gmail.com" },
];

export default function Drawer(props: propType) {
  const { open, toggleNav, handleLogout } = props;
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { authenticated } = useAuthStore();

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

  const tabs = authenticated ? AUTH_TABS : UN_AUTH_TABS;

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

        <div className="px-4 pt-[58px] pb-[38px] flex-1 flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-[22px]">
            {tabs.map(i => (
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

          {authenticated ? (
            <button
              className="px-[10px] flex gap-2 items-center"
              onClick={() => {
                toggleNav(false);
                handleLogout();
              }}
            >
              <Typography variant="subtitle1" className="uppercase">
                Sign Out
              </Typography>
              <Icon name="signOut" className="h-[18px]" />
            </button>
          ) : (
            <Link
              className="px-[10px] flex gap-2 items-center"
              href="/auth/login"
            >
              <Typography variant="subtitle1" className="uppercase">
                Sign In
              </Typography>
              <Icon name="signIn" className="h-[18px]" />
            </Link>
          )}
        </div>
      </div>
    </SwipeableDrawer>
  );
}
