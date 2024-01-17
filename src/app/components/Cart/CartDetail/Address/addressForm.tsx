import Checkbox from "@/app/components/Shared/Checkbox";
import Forms from "@/app/components/Shared/Forms";
import Text from "@/app/components/Shared/Input/Text";
import { FormPropType } from "@/app/components/Shared/Types/formPropsTypes";
import { useAuthStore } from "@/app/store/authentication";
import { Typography } from "@mui/material";
import { FormikValues } from "formik";
import * as Yup from "yup";

const AddressFormFields = (props: FormPropType) => {
  const {
    handleChange,
    setFieldValue,
    values,
    handleBlur,
    touched,
    isSubmitting,
    errors,
  } = props;

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
            onBlur={handleBlur}
            value={values.name}
            error={touched.name ? (errors.name as string) : undefined}
          />
          <Text
            type="text"
            name="contact"
            placeholder="Mobile No."
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.contact}
            error={touched.contact ? (errors.contact as string) : undefined}
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
            onBlur={handleBlur}
            onChange={e => {
              const value = e.target.value;
              if (value.length <= 6) {
                if (Number(value) < 0) return;
                handleChange(e);
              }
            }}
            onKeyDown={evt =>
              ["e", "E", "+", "-", "."].includes(evt.key) &&
              evt.preventDefault()
            }
            error={
              touched.postalCode ? (errors.postalCode as string) : undefined
            }
            value={values.postalCode}
          />
          <Text
            type="text"
            name="address1"
            onBlur={handleBlur}
            placeholder="Street Address"
            onChange={handleChange}
            value={values.address1}
            error={touched.address1 ? (errors.address1 as string) : undefined}
          />
          <Text
            type="text"
            name="address2"
            onBlur={handleBlur}
            placeholder="Landmark"
            onChange={handleChange}
            value={values.address2}
            error={touched.address2 ? (errors.address2 as string) : undefined}
          />
          <Text
            type="text"
            onBlur={handleBlur}
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={values.city}
            error={touched.city ? (errors.city as string) : undefined}
          />
          <Text
            type="text"
            onBlur={handleBlur}
            name="state"
            placeholder="State"
            onChange={handleChange}
            value={values.state}
            error={touched.state ? (errors.state as string) : undefined}
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  contact: Yup.string()
    .required("Please enter your contact number")
    .min(10, "Please enter valid contact number")
    .max(10, "Please enter valid contact number"),
  postalCode: Yup.string()
    .required("Please enter your postal code")
    .min(6, "Please enter valid postal code")
    .max(6, "Please enter valid postal code"),
  address1: Yup.string().required("Please enter street address"),
  address2: Yup.string().required("Please enter nearby landmark"),
  city: Yup.string().required("Please enter city"),
  state: Yup.string().required("Please enter state"),
  default: Yup.boolean(),
});

const AddressForm = () => {
  const { profile } = useAuthStore();
  const handleAddAddress = async (value: FormikValues) => {};

  return (
    <div className="mt-1 sm:mt-2 px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5 max-w-[600px]  bg-coffee">
      <Forms
        initialValue={{
          default: true,
          name: profile.user_metadata.name,
          contact: profile.phone,
          postalCode: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
        }}
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
