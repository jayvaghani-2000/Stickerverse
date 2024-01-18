import Icon from "@/app/components/Icon";
import { useAddressStore } from "@/app/store/address";
import { useCartStore } from "@/app/store/cart";
import { Typography } from "@mui/material";
import { activeStep } from "..";
import Address from "./address";
import Item from "./item";

const ConfirmOrder = ({
  shippingAddress,
  handleUpdateCurrentStep,
}: {
  shippingAddress: string;
  handleUpdateCurrentStep: (step: activeStep) => void;
}) => {
  const { address } = useAddressStore();
  const { cart } = useCartStore();

  const selectedAddress = address.find(i => i.id === shippingAddress)!;

  return (
    <div className="col-span-9 md:col-span-5 lg:col-span-6">
      <Typography variant="subtitle2" fontWeight={"500"} className="text-black">
        Order Summary
      </Typography>
      <div className="mt-3 sm:mt-4 md:mt-5  bg-coffee ">
        <div className="pl-4 sm:pl-5 md:pl-7 pr-1 sm:pr-2 py-1 sm:py-2 flex justify-between items-center">
          <Typography
            variant="subtitle2"
            fontWeight={"500"}
            className="text-black"
          >
            Shipping Address
          </Typography>
          <button
            className="flex justify-center items-center h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 p-[3px] rounded-full bg-darkGray"
            onClick={e => {
              handleUpdateCurrentStep(activeStep.ADDRESS);
            }}
          >
            <Icon name={"edit"} className={"h-full w-full"} />
          </button>
        </div>
        <Address address={selectedAddress} />
      </div>
      <div className="my-5 pb-3 sm:pb-4 md:pb-5 bg-coffee">
        <div className="pl-4 sm:pl-5 md:pl-7  pr-1 sm:pr-2  py-1 sm:py-2 flex justify-between items-center">
          <Typography
            variant="subtitle2"
            fontWeight={"500"}
            className="text-black"
          >
            Items
          </Typography>
          <button
            className="flex justify-center items-center h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 p-[3px] rounded-full bg-darkGray"
            onClick={e => {
              handleUpdateCurrentStep(activeStep.CART);
            }}
          >
            <Icon name={"edit"} className={"h-full w-full"} />
          </button>
        </div>
        {cart.map(i => (
          <Item key={i.id} item={i} />
        ))}
      </div>
    </div>
  );
};

export default ConfirmOrder;
