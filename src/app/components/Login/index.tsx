import { Typography } from "@mui/material";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { LegacyRef, forwardRef } from "react";
import * as Yup from "yup";
import { supabase } from "../../../../supabase/init";
import Nova from "../Font/nova";
import Icon from "../Icon";
import Button from "../Shared/Button";
import Forms from "../Shared/Forms";
import Text from "../Shared/Input/Text/index";
import { FormPropType } from "../Shared/Types/formPropsTypes";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Please enter your password"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
});

const LoginForm = (props: FormPropType) => {
  const { handleChange, values, isSubmitting, errors } = props;

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/login`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      <Text
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={values.email}
      />
      <Text
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={values.password}
      />

      <Button
        className="w-fit pt-1 pb-1 pl-1 sm:pl-1 md:pl-1 pr-1 sm:pr-1 md:pr-1 bg-lightPink hover:bg-lightPink"
        childClassName="px-2 normal-case"
        onClick={handleLogin}
      >
        Continue
      </Button>

      <Typography variant="button" className="normal-case">
        Or you can Login with
      </Typography>
      <Button
        prefixIcon="google"
        className="w-fit pt-1 pb-1 pl-1 sm:pl-1 md:pl-1 pr-1 sm:pr-1 md:pr-1 bg-lemonGreen hover:bg-lemonGreen"
        prefixWrapperClassName="h-[24px] w-[24px] md:h-[36px] md:w-[36px]  bg-white rounded-full"
        childClassName="px-2 normal-case"
        onClick={handleLogin}
      >
        Google Account
      </Button>
    </div>
  );
};

const Login = (
  props: { onModal?: boolean },
  ref: LegacyRef<HTMLDivElement>
) => {
  const { onModal = false } = props;
  const router = useRouter();

  return (
    <div
      className={classNames({
        ["flex flex-col py-20 justify-center items-center"]: !onModal,
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
            <Nova>Secure Login,</Nova>
            <Nova>Boundless Opportunities.</Nova>
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
            LOGIN
          </Typography>
        </div>
        <div className="w-full">
          <Forms
            initialValue={{ email: "", password: "" }}
            validate={validationSchema}
            onSubmit={() => {
              router.replace("/");
            }}
          >
            <LoginForm {...({} as FormPropType)} />
          </Forms>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Login);
