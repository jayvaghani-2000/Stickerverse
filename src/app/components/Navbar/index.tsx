"use client";
import React from "react";
import Link from "next/link";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Icon from "../Icon";
import classNames from "classnames";
import { activeRoute } from "@/app/utils/activeRoute";
import styles from "./navbar.module.scss";

const TABS = [
  { title: "Stickers", path: "/stickers" },
  { title: "Category", path: "/categories" },
];

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="h-[85px] border-b-2 border-black px-[30px] md:px-[70px] flex justify-between">
      <Link href="/" className="h-fit w-fit scale-75 md:scale-100">
        <Icon name="logo" />
      </Link>

      <div className="flex items-center justify-between gap-[40px]">
        {TABS.map(i => (
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
        <Icon name="search" className="scale-90 md:scale-100" />
        <Link href="/profile" className="scale-90 md:scale-100">
          <Icon name="user" />
        </Link>
        <Link href="/waitlist" className="scale-90 md:scale-100">
          <Icon name="heartBlack" />
        </Link>
        <Link href="/cart" className="scale-90 md:scale-100">
          <Icon name="cart" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
