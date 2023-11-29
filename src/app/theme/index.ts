import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export enum ThemeColor {
  CREAM = "#fcf8f3",
  BLACK = "#000000",
  WHITE = "#fff",
  LIGHT_GRAY = "#A6A6A6",
  PRIME_GREEN = "#D8F055",
  PURPLE = "#8870FF",
  LIGHT_RED = "#F25B5C",
  LIGHT_ORANGE = "#FFB278",
  DARK_PINK = "#FC9985",
  LIGHT_GREEN = "#BDDEBC",
  GREEN = "#20BF55",
  MAROON = "#CF0000",
  DARK_YELLOW = "#FF9400",
}

const theme = createTheme({
  palette: {
    primary: {
      main: ThemeColor.BLACK,
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
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h1",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
          button: "span",
        },
      },
    },
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
    subtitle1: {
      fontWeight: "bold",
      lineHeight: "1.5",
      fontSize: "14px",
      "@media (max-width:900px)": {
        fontSize: "13px",
      },
    },
    button: {
      fontWeight: "600",
      fontSize: "14px",
      "@media (max-width:900px)": {
        fontSize: "10px",
      },
    },
  },
});

export default theme;
