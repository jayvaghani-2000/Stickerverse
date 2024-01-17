import { Typography } from "@mui/material";
import Icon from "../../Icon";

const Alert = ({ message }: { message: string }) => {
  return (
    <div className="flex gap-1 items-center">
      <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ">
        <Icon name="alert" className="h-full w-full" />
      </div>
      <Typography className="text-maroon" variant="body2">
        {message}
      </Typography>
    </div>
  );
};

export default Alert;
