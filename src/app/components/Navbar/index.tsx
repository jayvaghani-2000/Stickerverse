"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Icon from "../Icon";
import classNames from "classnames";
import { activeRoute } from "@/app/utils/activeRoute";
import styles from "./navbar.module.scss";
import { useMobileScreen } from "@/app/utils/useScreenSize";
import Drawer from "./drawer";
import { paddingSpacing } from "@/app/utils/styles";
import Profile from "./Profile";

const TABS = [
  { title: "Stickers", path: "/stickers" },
  { title: "Category", path: "/categories" },
];

const ADMIN_TABS = [
  {
    title: "Product",
    path: "/admin/add-product",
  },
];

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const path = usePathname();
  const isMobile = useMobileScreen();
  const [profileEl, setProfileEl] = React.useState<HTMLElement | null>(null);
  const isAdmin = path!.startsWith("/admin");
  const toggleDrawer = (open: boolean) => {
    setOpenNav(open);
  };

  useEffect(() => {
    if (openNav) {
      toggleDrawer(false);
    }
  }, [path]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setProfileEl(null);
  };

  const open = Boolean(profileEl);

  return isMobile ? (
    <nav
      className={classNames(
        "relative z-10 h-[60px] border-b-2 flex sm:hidden items-center border-black justify-between",
        paddingSpacing
      )}
    >
      <button
        onClick={() => {
          toggleDrawer(true);
        }}
        className="inline-block h-6 w-6"
      >
        <Icon name="menu" />
      </button>
      <Drawer open={openNav} toggleNav={toggleDrawer} />

      <div className="flex items-center gap-[8px]">
        <Link href="/" className="h-[42px] w-[42px] ">
          <Icon name="logo" className="h-[42px]" />
        </Link>
        <Typography variant="subtitle1" className="uppercase">
          Sticker verse
        </Typography>
      </div>

      <div className="flex items-center justify-between gap-[15px] md:gap-[20px]">
        <Icon name="search" className="h-[20px]" />
        <Link href="/cart" className="scale-90 md:scale-100">
          <Icon name="cart" className="h-[20px]" />
        </Link>
      </div>
    </nav>
  ) : (
    <nav
      className={classNames(
        "relative z-10  h-[85px] border-b-2 hidden sm:flex sm:border-black justify-between",
        paddingSpacing
      )}
    >
      <Link href="/" className="h-fit w-fit">
        <Icon name="logo" className="h-[115px] md:h-[140px]" />
      </Link>

      <div className="flex items-center justify-between gap-[40px]">
        {isAdmin
          ? ADMIN_TABS.map(i => (
              <Link
                href={i.path}
                key={i.title}
                className={classNames({
                  [styles.active]: activeRoute(i.path, path!, true),
                })}
              >
                <Typography variant="subtitle1" className="uppercase">
                  {i.title}
                </Typography>
              </Link>
            ))
          : TABS.map(i => (
              <Link
                href={i.path}
                key={i.title}
                className={classNames({
                  [styles.active]: activeRoute(i.path, path!, true),
                })}
              >
                <Typography variant="subtitle1" className="uppercase">
                  {i.title}
                </Typography>
              </Link>
            ))}
      </div>

      <div className="flex items-center justify-between gap-[15px] md:gap-[20px]">
        <Icon name="search" className="w-[22px] md:w-[25px]" />
        <button
          aria-describedby={"mouse-over-popover"}
          onClick={handlePopoverOpen}
        >
          <Icon name="user" className="w-[22px] md:w-[25px]" />
        </button>
        <Link href="/wishlist">
          <Icon name="heartBlack" className="w-[22px] md:w-[25px]" />
        </Link>
        <Link href="/cart">
          <Icon name="cart" className="w-[22px] md:w-[25px]" />
        </Link>
      </div>
      <Profile
        handlePopoverClose={handlePopoverClose}
        open={open}
        profileEl={profileEl}
      />
    </nav>
  );
};

export default Navbar;
