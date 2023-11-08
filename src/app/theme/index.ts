import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export enum ThemeColor {
  CREAM = "#fcf8f3",
  BLACK = "#000000",
  WHITE = "#fff",
}

const theme = createTheme({
  palette: {
    primary: {
      main: ThemeColor.CREAM,
    },
    common: {
      black: ThemeColor.BLACK,
      white: ThemeColor.WHITE,
    },
    text: {
      primary: ThemeColor.BLACK,
    },
    divider: "rgba(0,0,0,0.1)",

    background: {
      default: ThemeColor.WHITE,
    },
    error: {
      main: red.A700,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },

  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontWeight: "bold",
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: "bold",
      fontSize: "2rem",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    h4: {
      fontWeight: "normal",
      fontSize: "1rem",
    },
    body1: {
      fontWeight: "normal",
      fontSize: "0.9rem",
    },
  },
});

export default theme;