"use client";
import React, { useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import theme from "./index";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Disable pinch-to-zoom on touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add touch move event listener to the document
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
