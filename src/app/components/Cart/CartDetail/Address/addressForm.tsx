import Checkbox from "@/app/components/Shared/Checkbox";
import Forms from "@/app/components/Shared/Forms";
import Text from "@/app/components/Shared/Input/Text";
import { FormPropType } from "@/app/components/Shared/Types/formPropsTypes";
import { Typography } from "@mui/material";
import { FormikValues } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  contact: Yup.string()
    .required("Please enter your contact number")
    .min(10, "Please enter valid contact number")
    .max(10, "Please enter valid contact number"),
  postalCode: Yup.number()
    .required("Please enter your postal code")
    .min(6, "Please enter valid postal code")
    .max(6, "Please enter valid postal code"),
  address1: Yup.string().required("Please enter street address"),
  address2: Yup.string().required("Please enter nearby landmark"),
  city: Yup.string().required("Please enter city"),
  state: Yup.string().required("Please enter state"),
  default: Yup.boolean(),
});

const AddressFormFields = (props: FormPropType) => {
  const { handleChange, setFieldValue, values, isSubmitting, errors } = props;

  return (
    <div className="flex flex-col gap-2 sm:gap-3 max-w-[600px]">
      <div className="flex flex-col gap-2 sm:gap-3">
        <Typography variant="h6">Contact Details</Typography>
        <div className="flex flex-col gap-1.5 sm:gap-2 px-1 sm:px-2">
          <Text
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={values.name}
          />
          <Text
            type="text"
            name="contact"
            placeholder="Mobile No."
            onChange={handleChange}
            value={values.contact}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:gap-3 ">
        <Typography variant="h6">Address</Typography>
        <div className="flex flex-col gap-1.5 sm:gap-2 px-1 sm:px-2">
          <Text
            type="number"
            name="postalCode"
            placeholder="Pin Code"
            onChange={e => {
              const value = e.target.value;

              console.log(value);

              if (/^-?\d*\.?\d+$/.test(value) && !(value.length > 6)) {
                setFieldValue("postalCode", Number(value));
              }
            }}
            value={values.postalCode}
          />
          <Text
            type="text"
            name="address1"
            placeholder="Street Address"
            onChange={handleChange}
            value={values.address1}
          />
          <Text
            type="text"
            name="address2"
            placeholder="Landmark"
            onChange={handleChange}
            value={values.address2}
          />
          <Text
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={values.city}
          />
          <Text
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            value={values.state}
          />
        </div>
      </div>

      <div className="mt-5">
        <Checkbox
          name={"default"}
          onChange={e => {
            setFieldValue("default", e.target.checked);
          }}
          value={values.default}
          label={
            <Typography variant="subtitle2">
              Make this Address default
            </Typography>
          }
        />
      </div>
    </div>
  );
};

const AddressForm = () => {
  const handleAddAddress = async (value: FormikValues) => {};

  return (
    <div className="mt-1 sm:mt-2 px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5 max-w-[600px]  bg-coffee">
      <Forms
        initialValue={{ email: "", password: "" }}
        validate={validationSchema}
        onSubmit={async value => {
          await handleAddAddress(value);
        }}
      >
        <AddressFormFields {...({} as FormPropType)} />
      </Forms>
    </div>
  );
};

export default AddressForm;

//https://maps.googleapis.com/maps/api/geocode/json?latlng=21.1702,72.8311&key=AIzaSyCarq4P4YA0QcJxIs5g7eGSX40CvQQNX-4
