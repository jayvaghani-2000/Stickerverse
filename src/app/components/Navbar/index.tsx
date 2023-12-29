import { useAppDispatch } from "@/app/store";
import {
  resetAuthData,
  setAuthData,
  useAuthStore,
} from "@/app/store/authentication";
import { useCartStore } from "@/app/store/cart";
import { setGlobalData } from "@/app/store/global";
import { useVisitorCartStore } from "@/app/store/visitorCart";
import { activeRoute } from "@/app/utils/activeRoute";
import { useLocalCart } from "@/app/utils/context/localCartProvider";
import { handleRemoveToken } from "@/app/utils/handleSetToken";
import { paddingSpacing } from "@/app/utils/styles";
import { useMobileScreen } from "@/app/utils/useScreenSize";
import { Badge, Typography } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase/init";
import Icon from "../Icon";
import Profile from "./Profile";
import Drawer from "./drawer";
import styles from "./navbar.module.scss";

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
  const { localCart } = useLocalCart();
  const { authenticated } = useAuthStore();
  const { cart } = useCartStore();
  const { cart: visitorCart } = useVisitorCartStore();
  const path = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      dispatch(
        setGlobalData({
          toast: {
            show: true,
            message: "Logged out successfully",
            type: "success",
          },
        })
      );
      dispatch(resetAuthData());
      dispatch(
        setAuthData({
          authCheck: true,
        })
      );
      await handleRemoveToken();
      router.replace("/");
    } else {
      dispatch(
        setGlobalData({
          toast: {
            show: true,
            message: "Unable Logged out!",
            type: "error",
          },
        })
      );
    }
  };

  const open = Boolean(profileEl);

  const cartItems = authenticated ? cart.length ?? 0 : visitorCart.length ?? 0;

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
      <Drawer
        open={openNav}
        toggleNav={toggleDrawer}
        handleLogout={handleLogout}
      />

      <div className="flex items-center gap-[8px]">
        <Link href="/" className="h-[42px] w-[42px] ">
          <Icon name="logo" className="h-full w-full" />
        </Link>
        <Typography variant="subtitle1" className="uppercase">
          Sticker verse
        </Typography>
      </div>

      <div className="flex items-center justify-between gap-[15px] md:gap-[20px]">
        <div className="h-[20px] sm:h-[25px] w-[20px] sm:w-[25px]">
          <Icon name="search" className="h-full w-full" />
        </div>
        <Link
          href="/cart"
          className="h-[20px] sm:h-[25px] w-[20px] sm:w-[25px]"
        >
          <Badge
            badgeContent={cartItems}
            max={10}
            classes={{
              badge: `bg-lightRed text-white border-[3px] border-cream text-[8px] h-[20px] w-[20px] rounded-full`,
            }}
          >
            <Icon
              name="cart"
              className={classNames("h-full w-full", styles.activeIconOnNav)}
            />
          </Badge>
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
        <div className="h-[22px] md:h-[25px] w-[22px] md:w-[25px]">
          <Icon name="search" className="h-full w-ful" />
        </div>
        <button
          aria-describedby={"mouse-over-popover"}
          onClick={handlePopoverOpen}
          className="h-[22px] md:h-[25px] w-[22px] md:w-[25px]"
        >
          <Icon
            name="user"
            className={classNames("h-full w-full", {
              [styles.activeIconOnNav]: open,
            })}
          />
        </button>
        <Link
          href="/wishlist"
          className="h-[22px] md:h-[25px] w-[22px] md:w-[25px]"
        >
          <Icon name="heartBlack" className="h-full w-full" />
        </Link>
        <Link
          href="/cart"
          className="h-[22px] md:h-[25px] w-[22px] md:w-[25px]"
        >
          <Badge
            badgeContent={cartItems}
            max={10}
            classes={{
              badge: `bg-lightRed text-white border-[3px] border-cream text-[10px] h-[22px] w-[22px] rounded-full`,
            }}
          >
            <Icon
              name="cart"
              className={classNames("h-full w-full", styles.activeIconOnNav)}
            />
          </Badge>
        </Link>
      </div>
      <Profile
        handlePopoverClose={handlePopoverClose}
        open={open}
        profileEl={profileEl}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
