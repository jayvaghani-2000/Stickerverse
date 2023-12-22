import { Popover, Typography } from "@mui/material";
import Link from "next/link";

type propType = {
  profileEl: HTMLElement | null;
  open: boolean;
  handlePopoverClose: () => void;
};

const Profile = ({ profileEl, open, handlePopoverClose }: propType) => {
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
      <Link className="px-4" href="/auth/login" onClick={handlePopoverClose}>
        <Typography variant="body2">Sign In</Typography>
      </Link>
    </Popover>
  );
};

export default Profile;
