"use client";
import { useUpdateUserPasswordMutation } from "@/app/store/authentication/api";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import { LegacyRef, forwardRef } from "react";
import * as Yup from "yup";
import { supabase } from "../../../../supabase/init";
import Nova from "../Font/nova";
import Icon from "../Icon";
import Button from "../Shared/Button";
import Forms from "../Shared/Forms";
import Text from "../Shared/Input/Text";
import { FormPropType } from "../Shared/Types/formPropsTypes";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const PasswordForm = (props: FormPropType) => {
  const { handleChange, values, isSubmitting, errors } = props;

  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      <Text
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={values.password}
      />
      <Text
        type="password"
        name="confirmPassword"
        placeholder="Confirm It"
        onChange={handleChange}
        value={values.confirmPassword}
      />

      <Button
        className="w-fit pt-1 pb-1 pl-1 sm:pl-1 md:pl-1 pr-1 sm:pr-1 md:pr-1 bg-lightPink hover:bg-lightPink"
        childClassName="px-2 normal-case"
        type="submit"
      >
        Continue
      </Button>

      <Typography variant="button" className="normal-case text-center">
        Or Skip to continue use Google sign-in later.
      </Typography>
      <Button
        icon="chevronRight"
        className="w-fit pt-1 pb-1 pl-1 sm:pl-1 md:pl-1 pr-1 sm:pr-1 md:pr-1 bg-lemonGreen hover:bg-lemonGreen"
        childClassName="px-2 normal-case"
        onClick={() => {}}
      >
        Skip
      </Button>
    </div>
  );
};

const Password = (
  props: { onModal?: boolean },
  ref: LegacyRef<HTMLDivElement>
) => {
  const { onModal = false } = props;
  const [updateUser] = useUpdateUserPasswordMutation();
  const router = useRouter();

  const handleSetPassword = async (values: FormikValues) => {
    const { data, error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (data && data.user) {
      const res = await updateUser({ id: data.user.id });
      if ("data" in res) {
        return router.replace("/");
      }
    } else {
    }
  };

  return (
    <div
      className={classNames({
        ["flex flex-col  py-5 sm:py-20 justify-center items-center"]: !onModal,
        paddingSpacing: !onModal,
      })}
      ref={ref}
    >
      {onModal ? null : (
        <div
          className={classNames(
            "w-[80dvw] sm:w-[420px] md:w-[550px]  flex items-end"
          )}
        >
          <div className="flex-1 pb-4">
            <Nova>Login Successful.</Nova>
            <Nova>Password will be secure.</Nova>
          </div>
          <Icon
            name="login"
            className="h-[100px] w-[100px] sm:h-[156px] sm:w-[156px] md:h-[196px] md:w-[196px]"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 md:gap-4 py-20 justify-center items-center bg-coffee w-[80dvw] sm:w-[420px] md:w-[550px] p-[30px] sm:p-[44px] md:p-[55px]">
        <div className="flex gap-2 justify-center ">
          <Typography
            variant="h3"
            className="tracking-[6px] sm:tracking-[8px] md:tracking-[10px]	"
          >
            SET PASSWORD
          </Typography>
        </div>
        <div className="w-full">
          <Forms
            initialValue={{ confirmPassword: "", password: "" }}
            validate={validationSchema}
            onSubmit={values => {
              handleSetPassword(values);
            }}
          >
            <PasswordForm {...({} as FormPropType)} />
          </Forms>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Password);
