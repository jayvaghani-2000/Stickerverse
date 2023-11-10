import React from "react";
import Link from "next/link";
import { Typography } from "@mui/material";
import Icon from "../Icon";

const Navbar = () => {
  return (
    <nav className="h-[85px] border-b-2 border-black px-[70px] flex justify-between">
      <Link href="/">
        <Icon name="logo" />
      </Link>

      <div className="flex items-center justify-between gap-[40px]">
        <Link href="/stickers">
          <Typography variant="subtitle1">STICKERS</Typography>
        </Link>
        <Link href="/categories">
          <Typography variant="subtitle1">CATEGORY</Typography>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-[20px]">
        <Icon name="search" />
        <Link href="/profile">
          <Icon name="user" />
        </Link>
        <Link href="/waitlist">
          <Icon name="heartBlack" />
        </Link>
        <Link href="/cart">
          <Icon name="cartColor" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
