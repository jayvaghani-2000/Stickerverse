"use client";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import TextEditor from "./components/TextEditor";

type productType = {
  name: string;
  price: string;
  description: string;
  offer: string;
  image: File;
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
    await axios.post("/api/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="mt-24 flex flex-col" onSubmit={handleCreateProduct}>
      <div>Product Name: </div>
      <input
        className="border-2"
        type="text"
        name="productName"
        onChange={updateData}
      />
      <div>Price: </div>
      <input
        className="border-2"
        type="number"
        name="price"
        onChange={updateData}
      />
      <div>description: </div>
      <TextEditor
        onChange={(value: string) => {
          setProduct(prev => ({ ...prev, description: value }));
        }}
        value={product.description}
      />
      <input
        className="border-2"
        type="text"
        name="description"
        onChange={updateData}
      />
      <div>Offer:</div>{" "}
      <input
        className="border-2"
        type="number"
        name="offer"
        onChange={updateData}
      />
      <div>Add Image:</div>
      <input
        type="file"
        onChange={e => {
          setProduct(prev => ({ ...prev, image: e.target.files![0] }));
        }}
      />
      <div className="flex gap-2 mt-3">
        <button type="submit" className="bg-offer">
          Submit
        </button>
        <button type="reset" className="bg-offer">
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
