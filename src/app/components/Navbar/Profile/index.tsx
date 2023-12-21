import { useAppDispatch } from "@/app/store";
import { setGlobalData } from "@/app/store/global";
import { Popover, Typography } from "@mui/material";
import React from "react";

type propType = {
  profileEl: HTMLElement | null;
  open: boolean;
  handlePopoverClose: () => void;
};

const Profile = ({ profileEl, open, handlePopoverClose }: propType) => {
  const dispatch = useAppDispatch();

  const handleOpenSignUp = () => {
    dispatch(
      setGlobalData({
        showLogin: true,
      })
    );
  };
  return (
    <Popover
      id={"mouse-over-popover"}
      open={open}
      anchorEl={profileEl}
      onClose={handlePopoverClose}
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
      <div className=" px-4">
        <Typography variant="body2">Welcome!!</Typography>
      </div>
      <div className="border-dashed border-t-[2px] border-placeholder" />
      <button className="px-4" onClick={handleOpenSignUp}>
        <Typography variant="body2">Sign In</Typography>
      </button>
    </Popover>
  );
};

export default Profile;
