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
import Icon from "@/app/components/Icon";
import Checkbox from "@/app/components/Shared/Checkbox";
import { FormikValues } from "formik";
import Button from "@/app/components/Shared/Button";
import { useGetStickerCategoryQuery } from "@/app/store/category/api";
import CreateSelect from "@/app/components/Shared/CreateSelect";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Please enter sticker name"),
  offer: Yup.string().required("Please enter offer percentage"),
  price: Yup.string().required("Please enter sticker price"),
  categoryId: Yup.number().required("Please select category"),
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

const AddProductForm = (props: FormPropType) => {
  const { handleChange, values, isSubmitting, errors, setFieldValue } = props;
  const ref = useRef<HTMLInputElement>(null!);
  const [imagesStr, setImagesStr] = useState<
    { name: string; base64: string }[]
  >([]);
  const newImages = useRef<number>(0);
  const { refetch, data } = useGetStickerCategoryQuery({});

  console.log(errors);

  const categories =
    data?.map(i => ({
      value: i.id,
      label: i.categoryName,
    })) || [];

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

  const handleCreateCategory = async (option: string) => {
    const formData = new FormData();
    formData.append("categoryName", option);

    const response = await axios.post("/api/category/sticker", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setFieldValue("categoryId", response.data.category);

    refetch();
  };

  return (
    <div className="m-auto grid grid-cols-2 p-4 sm:p-12 md:p-24 gap-4 md:max-w-[50dvw]">
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
          className="opacity-0 absolute top-screen left-screen cursor-pointer h-24 w-24 inline-block z-10"
        />
        <button className="bg-white h-24 w-24 border-2 border-black">
          Add Image
        </button>
        {imagesStr.map((i, index) => (
          <div
            key={`${i.base64.split(",")[0]}${index}`}
            className="flex flex-col relative"
          >
            <button className="absolute right-[-5px] top-[-5px] h-5 w-5 bg-white rounded-full border-2 border-black px-[3px]">
              <Icon name="cross" />
            </button>
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

      <div>
        <Checkbox
          label={<Typography variant="subtitle2">Trending</Typography>}
          name="trending"
          onChange={handleChange}
          value={values.trending}
        />
      </div>
      <div className="col-span-2">
        <CreateSelect
          options={categories}
          createOption={handleCreateCategory}
          value={categories.find(i => i.value === values.categoryId)}
          id="category"
          onChange={value => {
            console.log(value);
            setFieldValue("categoryId", value);
          }}
          placeholder="Category"
        />
      </div>
      <div className="col-span-2 text-center">
        <Button
          variant="rounded-shadow"
          className="bg-primeGreen hover:bg-primeGreen"
          type="submit"
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

const AddProduct = () => {
  const handleCreateProduct = async (values: FormikValues) => {
    const formData = new FormData();
    Object.keys(values).forEach(e => {
      const key = e as keyof typeof values;
      if (key === "images") {
        values[key].forEach((i: File) => {
          formData.append(key, i);
        });
      } else {
        formData.append(e, values[key]);
      }
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
        trending: true,
        categoryId: undefined,
      }}
      validate={validationSchema}
      onSubmit={values => {
        handleCreateProduct(values);
      }}
    >
      <AddProductForm {...({} as FormPropType)} />
    </Forms>
  );
};

export default AddProduct;
