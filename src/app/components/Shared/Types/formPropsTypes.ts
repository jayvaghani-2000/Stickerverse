import { FormikErrors, FormikValues } from "formik";

export type FormPropType = {
  values: FormikValues;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormikErrors<FormikValues>;
};
