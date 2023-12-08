import styles from "./login.module.scss";
import Forms from "../Shared/Forms";
import * as Yup from "yup";
import { FormPropType } from "../Shared/Types/formPropsTypes";
import classNames from "classnames";
import { Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

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
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="outline-none rounded-md p-3"
        onChange={handleChange}
        value={values.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="outline-none rounded-md p-3"
        onChange={handleChange}
        value={values.password}
      />
      <button
        type="submit"
        className="outline-none rounded-md p-3 bg-purple"
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
        "flex gap-4 justify-center items-center"
      )}
    >
      <div className="w-[400px] max-w-[100%]  px-4">
        <div className="flex gap-2 justify-center mb-4">
          <h1 className={classNames(josefin.className, "font-light text-4xl")}>
            DextaLabs
          </h1>
          <h1
            className={classNames(
              josefin.className,
              "font-bold text-4xl text-purple"
            )}
          >
            A.I
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
