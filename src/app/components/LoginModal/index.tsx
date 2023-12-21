import { useAppDispatch } from "@/app/store";
import { setGlobalData, useGlobalStore } from "@/app/store/global";
import { Box, Modal } from "@mui/material";
import Login from "../Login";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  width: "fit-content",
  boxShadow: 24,
};

const LoginModal = () => {
  const { showLogin } = useGlobalStore();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      setGlobalData({
        showLogin: false,
      })
    );
  };

  return (
    <Modal
      open={showLogin}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <Login onModal />
      </Box>
    </Modal>
  );
};

export default LoginModal;
