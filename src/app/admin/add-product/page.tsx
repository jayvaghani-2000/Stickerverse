"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import TextEditor from "../components/TextEditor/index";
import * as Yup from "yup";
import Forms from "@/app/components/Shared/Forms/index";
import { FormPropType } from "@/app/components/Shared/Types/formPropsTypes";
import Text from "@/app/components/Shared/Input/Text/index";
import { Typography } from "@mui/material";
import Image from "next/image";
import { cloneDeep } from "lodash";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Please enter sticker name"),
  offer: Yup.string().required("Please enter offer percentage"),
  price: Yup.string().required("Please enter sticker price"),
  description: Yup.string()
    .required("Please enter sticker description")
    .test("emptyDescription", "Please enter sticker description", value => {
      if (value === "<p><br></p>") {
        return false;
      }
      return true;
    }),
  images: Yup.mixed().test("fileSize", "The file is too large", value => {
    const files = value as File[];
    if (!files.length) return false; // attachment is optional
    return files[0].size <= 2000000;
  }),
});

type productType = {
  name: string;
  price: string;
  description: string;
  offer: string;
  image: File;
};

const AddProductForm = (props: FormPropType) => {
  const { handleChange, values, isSubmitting, errors, setFieldValue } = props;
  const ref = useRef<HTMLInputElement>(null!);
  const [imagesStr, setImagesStr] = useState<
    { name: string; base64: string }[]
  >([]);
  const newImages = useRef<number>(0);

  const files = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files as FileList;
      newImages.current = files.length;
      setFieldValue("images", [...values.images, ...Array.from(files)]);
    }
  };

  useEffect(() => {
    if (values.images.length > 0 && newImages.current > 0) {
      const newImagesObject = cloneDeep(values.images).splice(
        -newImages.current
      );
      for (let i = 0; i < newImagesObject.length; i++) {
        const file = newImagesObject[i];
        const { name } = file;
        const reader = new FileReader();

        reader.onloadend = function () {
          const result = reader.result as string;
          const base64String = result;
          setImagesStr(prev => [...prev, { base64: base64String, name }]);
        };
        reader.readAsDataURL(file);
      }
      newImages.current = 0;
    }
  }, [values.images]);

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
      <Text
        type="number"
        name="offer"
        placeholder="Offer"
        onChange={handleChange}
        value={values.offer}
      />
      <div className="col-span-2">
        <TextEditor
          onChange={(value: string) => {
            setFieldValue("description", value);
          }}
          value={values.description}
        />
      </div>

      <div className="col-span-2 flex gap-2 flex-wrap">
        <input
          type="file"
          ref={ref}
          accept="image/*"
          onChange={files}
          multiple
          name="image"
          className="opacity-0 absolute top-screen left-screen -z-50"
        />
        <button
          className="bg-white h-24 w-24 border-2 border-black"
          onClick={() => {
            ref.current.click();
          }}
        >
          Add Image
        </button>
        {imagesStr.map((i, index) => (
          <div
            key={`${i.base64.split(",")[0]}${index}`}
            className="flex flex-col"
          >
            <Image
              alt={i.base64.split(",")[0]}
              src={i.base64}
              className="bg-white border-2 border-black"
              height={96}
              width={96}
            />
            <p className="text-sm">{i.name}</p>
          </div>
        ))}
      </div>
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

  return (
    <Forms
      initialValue={{
        productName: "",
        offer: "",
        price: "",
        description: "",
        images: [],
      }}
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
