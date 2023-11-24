"use client";
import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import theme from "./index";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
