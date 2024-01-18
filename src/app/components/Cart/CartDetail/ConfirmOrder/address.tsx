import { Typography } from "@mui/material";
import { getAddressType } from "../../../../../../pages/api/types";

const Address = ({ address }: { address: getAddressType[0] }) => {
  const i = address;
  return (
    <div className="text-start flex items-start gap-2 sm:gap-3 md:gap-4 px-4 sm:px-5 md:px-7 pb-1 sm:pb-2 ">
      <div className="flex-1">
        <Typography variant="subtitle2">{i.name}</Typography>
        <Typography
          variant="body2"
          className="block text-placeholder mt-[6px] sm:mt-[10px]"
        >
          {i.address1},
        </Typography>
        <Typography variant="body2" className="block text-placeholder">
          {i.address2}.
        </Typography>
        <Typography variant="body2" className="block text-placeholder">
          {i.city} -{i.postalCode}
        </Typography>
        <Typography variant="subtitle2" className="mt-[4px] sm:mt-[6px] block">
          Mobile{" "}
          <Typography variant="body2" className="text-placeholder">
            - {i.contact}
          </Typography>
        </Typography>
      </div>
    </div>
  );
};

export default Address;
