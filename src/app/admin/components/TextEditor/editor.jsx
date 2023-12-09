"use client";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";
import "./editor.scss";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ReactQuillWrapper = props => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="quillWrapper">
      <ReactQuill
        placeholder="Description"
        value={props.value}
        modules={modules}
        formats={formats}
        onChange={value => props.onChange(value)}
      />
    </div>
  );
};

export default ReactQuillWrapper;
