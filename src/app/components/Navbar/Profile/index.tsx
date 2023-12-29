import { useAuthStore } from "@/app/store/authentication";
import { useLocalCart } from "@/app/utils/context/localCartProvider";
import { Popover, Typography } from "@mui/material";
import Link from "next/link";

type propType = {
  profileEl: HTMLElement | null;
  open: boolean;
  handlePopoverClose: () => void;
  handleLogout: () => void;
};

const Profile = ({
  profileEl,
  open,
  handlePopoverClose,
  handleLogout,
}: propType) => {
  const { profile, authenticated } = useAuthStore();
  const { setLocalCart } = useLocalCart();

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
        paper: "max-w-[160px] rounded-none border-2 border-black mt-1",
      }}
    >
      <div className="pl-4 py-1">
        <Typography variant="body2">Welcome!!</Typography>
      </div>
      {authenticated ? (
        <div className=" pl-4 mb-4">
          <Typography variant="h5" className="text-darkPink truncate">
            {profile.user_metadata.name}
          </Typography>
        </div>
      ) : null}
      <div className="border-dashed border-t-[2px] border-placeholder" />

      {!authenticated ? (
        <div className="py-[10px]">
          <Link
            className="pl-4 py-1 w-full inline-block"
            href="mailto:jayvaghani2000@gmail.com"
            onClick={e => {
              e.preventDefault();
              handlePopoverClose();
            }}
          >
            <Typography variant="body2">Contact us</Typography>
          </Link>
          <Link
            className="pl-4 py-1 w-full inline-block"
            href="/auth/login"
            onClick={handlePopoverClose}
          >
            <Typography variant="body2">Sign In</Typography>
          </Link>
        </div>
      ) : (
        <>
          <div className="py-1">
            <Link
              className="pl-4 py-1 w-full inline-block"
              href="/orders"
              onClick={handlePopoverClose}
            >
              <Typography variant="body2">Order History</Typography>
            </Link>
            <Link
              className="pl-4 py-1 w-full inline-block"
              href="mailto:jayvaghani2000@gmail.com"
              onClick={e => {
                e.preventDefault();
                handlePopoverClose();
              }}
            >
              <Typography variant="body2">Contact us</Typography>
            </Link>
          </div>
          <div className=" my-1 border-t-[2px] border-black" />
          <div className="py-1">
            <Link
              className="pl-4 py-1 w-full inline-block"
              href="/profile"
              onClick={handlePopoverClose}
            >
              <Typography variant="body2">Account</Typography>
            </Link>
            <Link
              className="pl-4 py-1 w-full inline-block"
              href="/auth/login"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleLogout();
                handlePopoverClose();
                setLocalCart("");
              }}
            >
              <Typography variant="body2">Logout</Typography>
            </Link>
          </div>
        </>
      )}
    </Popover>
  );
};

export default Profile;
