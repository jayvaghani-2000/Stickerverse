"use client";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import TextEditor from "../components/TextEditor/index";
import * as Yup from "yup";
import Forms from "@/app/components/Shared/Forms/index";
import { FormPropType } from "@/app/components/Shared/Types/formPropsTypes";
import Text from "@/app/components/Shared/Input/Text/index";
import { Typography } from "@mui/material";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Please enter sticker name"),
  offer: Yup.string().required("Please enter offer percentage"),
  price: Yup.string().required("Please enter sticker price"),
});

type productType = {
  name: string;
  price: string;
  description: string;
  offer: string;
  image: File;
};

const AddProductForm = (props: FormPropType) => {
  const { handleChange, values, isSubmitting, errors } = props;

  return (
    <div className="m-auto grid sm:grid-cols-2 p-4 sm:p-12 md:p-24 gap-4 md:max-w-[50dvw]">
      <Typography variant="h3" className="col-span-2 text-center">
        Add Product
      </Typography>
      <Text
        type="text"
        name="productName"
        placeholder="Title"
        onChange={handleChange}
        value={values.productName}
      />

      <Text
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        value={values.price}
      />
      {/* <TextEditor
        onChange={(value: string) => {
          setProduct(prev => ({ ...prev, description: value }));
        }}
        value={product.description}
      /> */}
      <Text
        type="number"
        name="offer"
        placeholder="Offer"
        onChange={handleChange}
        value={values.offer}
      />
    </div>
  );
};

const AddProduct = () => {
  const [product, setProduct] = useState<productType>({} as productType);

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(product).forEach(e => {
      const key = e as keyof typeof product;
      formData.append(e, product[key]);
    });
    await axios.post("/api/sticker", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Forms
      initialValue={{ productName: "", offer: "", price: "" }}
      validate={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <AddProductForm {...({} as FormPropType)} />
    </Forms>
  );
};

export default AddProduct;

{
  /* <input
  type="file"
  onChange={e => {
    setProduct(prev => ({ ...prev, image: e.target.files![0] }));
  }}
/> */
}
