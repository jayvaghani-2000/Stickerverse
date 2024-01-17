import Icon from "@/app/components/Icon";
import Checkbox from "@/app/components/Shared/Checkbox";
import InlineSpinner from "@/app/components/Shared/InlineSpinner";
import {
  useDeleteUserAddressMutation,
  useLazyGetUserAddressQuery,
} from "@/app/store/address/api";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import { getAddressType } from "../../../../../../pages/api/types";

const UserAddress = ({
  address,
  handleUpdateShipmentAddress,
  shippingAddress,
}: {
  address: getAddressType[0];
  handleUpdateShipmentAddress: (id: string) => void;
  shippingAddress: string;
}) => {
  const [getAddress, { isFetching }] = useLazyGetUserAddressQuery();
  const [deleteAddress] = useDeleteUserAddressMutation();
  const [loading, setLoading] = useState(false);
  const i = address;

  const handleDeleteAddress = async () => {
    setLoading(true);
    const data = await deleteAddress(i.id);
    if (data) {
      getAddress({});
      setLoading(false);
    }
  };

  const loadingDelete = loading && isFetching;

  return (
    <button
      onChange={() => {
        handleUpdateShipmentAddress(i.id);
      }}
      className="text-start flex items-start gap-2 sm:gap-3 md:gap-4 bg-coffee  px-4 sm:px-5 md:px-7 py-3 sm:py-4 md:py-5"
    >
      <Checkbox
        value={i.id === shippingAddress}
        onChange={() => {
          handleUpdateShipmentAddress(i.id);
        }}
        name={i.id}
      />
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
      <div>
        <button
          className="flex justify-center items-center h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 p-[5px] sm:p-[6px] rounded-full bg-darkGray"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteAddress();
          }}
          disabled={loadingDelete}
        >
          {loadingDelete ? (
            <InlineSpinner />
          ) : (
            <Icon name={"cross"} className={classNames("h-full w-full")} />
          )}
        </button>
      </div>
    </button>
  );
};

export default UserAddress;
