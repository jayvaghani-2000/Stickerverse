import { HTMLProps } from "react";

type className = HTMLProps<HTMLElement>["className"];

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);
