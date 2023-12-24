"use client";
import { useAppDispatch } from "@/app/store";
import { setGlobalData, useGlobalStore } from "@/app/store/global";
import { Alert, Typography } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

export default function Toast() {
  const { toast } = useGlobalStore();
  const { message, show, type } = toast;

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      setGlobalData({
        toast: { ...toast, show: false },
      })
    );
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={TransitionUp}
      message={message}
      classes={{
        root: "mt-[60px] sm:mt-[85px]",
      }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        <Typography variant="subtitle2" className="normal-case text-center">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}
