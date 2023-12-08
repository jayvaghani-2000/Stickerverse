import styles from "./login.module.scss";
import Forms from "../Shared/Forms";
import * as Yup from "yup";
import { FormPropType } from "../Shared/Types/formPropsTypes";
import classNames from "classnames";
import { Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import Text from "../Shared/Input/Text/index";

const josefin = Josefin_Sans({ subsets: ["latin"] });

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Please enter your password"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
});

const LoginForm = (props: FormPropType) => {
  const { handleChange, values, isSubmitting, errors } = props;
  console.log(errors);
  return (
    <div className="flex flex-col gap-4">
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

      <button
        type="submit"
        className="outline-none p-3 bg-purple"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </div>
  );
};

const Login = () => {
  const router = useRouter();

  return (
    <main
      className={classNames(
        styles.wrapper,
        "flex gap-4 py-20 justify-center items-center"
      )}
    >
      <div className="w-[400px] max-w-[100%]  px-4">
        <div className="flex gap-2 justify-center mb-4">
          <h1 className={classNames(josefin.className, "font-light text-4xl")}>
            StickerVerse
          </h1>
          <h1
            className={classNames(
              josefin.className,
              "font-bold text-4xl text-purple"
            )}
          >
            S.V
          </h1>
        </div>
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
    </main>
  );
};

export default Login;
