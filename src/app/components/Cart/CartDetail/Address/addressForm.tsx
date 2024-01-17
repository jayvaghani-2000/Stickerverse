import Button from "@/app/components/Shared/Button";
import Checkbox from "@/app/components/Shared/Checkbox";
import Forms from "@/app/components/Shared/Forms";
import InlineSpinner from "@/app/components/Shared/InlineSpinner";
import Text from "@/app/components/Shared/Input/Text";
import { FormPropType } from "@/app/components/Shared/Types/formPropsTypes";
import { useAppDispatch } from "@/app/store";
import { useAddUserAddressMutation } from "@/app/store/address/api";
import { useAuthStore } from "@/app/store/authentication";
import { setGlobalData } from "@/app/store/global";
import {
  handleGetLocation,
  handleGetPostalCodeData,
} from "@/app/utils/getLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Typography } from "@mui/material";
import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { AddAddress } from "../../../../../../pages/api/models/address/schema";

const AddressFormFields = (
  props: FormPropType & {
    isGeolocationSupported: boolean;
  }
) => {
  const dispatch = useAppDispatch();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [loadingZipCodeData, setLoadingZipCodeData] = useState(false);
  const {
    handleChange,
    setFieldValue,
    values,
    handleBlur,
    touched,
    isSubmitting,
    errors,
    isGeolocationSupported,
  } = props;

  const getLocation = async () => {
    setLoadingZipCodeData(true);
    try {
      const location = await handleGetPostalCodeData(values.postalCode);

      Object.keys(location).forEach(i => {
        const key = i as keyof typeof location;
        if (location[key]) {
          setFieldValue(key, location[key]);
        }
      });
    } catch (err) {
    } finally {
      setLoadingZipCodeData(false);
    }
  };

  useEffect(() => {
    if (String(values.postalCode).length === 6) {
      getLocation();
    }
  }, [values.postalCode]);

  const getLocationData = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async position => {
          const location = await handleGetLocation(
            position.coords.latitude,
            position.coords.longitude,
            token
          );

          Object.keys(location).forEach(i => {
            const key = i as keyof typeof location;
            if (location[key]) {
              setFieldValue(key, location[key]);
            }
          });
          setLoading(false);
        },
        error => {
          dispatch(
            setGlobalData({
              toast: {
                show: true,
                message: "Please enable location access." ?? "",
                type: "error",
              },
            })
          );
          setLoading(false);
        }
      );
    }
  };

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
        <div className="flex justify-between">
          <Typography variant="h6">Address</Typography>
          {isGeolocationSupported ? (
            <button
              type="button"
              onClick={() => {
                getLocationData();
              }}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <LocationOnIcon className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5" />
              <Typography variant="body2">Use Location</Typography>
              {loading ? <InlineSpinner /> : null}
            </button>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2 px-1 sm:px-2">
          <Text
            type="number"
            name="postalCode"
            placeholder="Pin Code"
            onBlur={handleBlur}
            disabled={loadingZipCodeData}
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
            disabled={loadingZipCodeData}
            onBlur={handleBlur}
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={values.city}
            error={touched.city ? (errors.city as string) : undefined}
          />
          <Text
            type="text"
            disabled={loadingZipCodeData}
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
      <div className="mt-4 text-center">
        <Button
          variant="rounded"
          type="submit"
          className="bg-black hover:bg-black text-white"
          disabled={isSubmitting}
        >
          Add New Address {isSubmitting && <InlineSpinner />}
        </Button>
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

const AddressForm = ({
  isGeolocationSupported,
}: {
  isGeolocationSupported: boolean;
}) => {
  const [addAddress] = useAddUserAddressMutation();
  const { profile } = useAuthStore();
  const handleAddAddress = async (value: FormikValues) => {
    try {
      await addAddress(value as AddAddress);
    } catch (err) {}
  };

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
        <AddressFormFields
          isGeolocationSupported={isGeolocationSupported}
          {...({} as FormPropType)}
        />
      </Forms>
    </div>
  );
};

export default AddressForm;
