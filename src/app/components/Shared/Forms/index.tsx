"use client";
import { FormikValues, useFormik } from "formik";
import React, { Children, cloneElement } from "react";

type propType = {
  initialValue: FormikValues;
  validate: any;
  onSubmit: (value: FormikValues) => void;
  children: React.ReactElement;
};

const Forms = (props: propType) => {
  const { initialValue, validate, onSubmit, children } = props;

  const { values, handleChange, handleSubmit, isSubmitting, errors } =
    useFormik({
      initialValues: initialValue,
      validationSchema: validate,
      onSubmit: async values => {
        await onSubmit(values);
      },
      validateOnChange: false,
      validateOnBlur: true,
    });

  return (
    <form noValidate onSubmit={handleSubmit}>
      {Children.map(children, child =>
        cloneElement(child, { handleChange, values, isSubmitting, errors })
      )}
    </form>
  );
};

export default Forms;
