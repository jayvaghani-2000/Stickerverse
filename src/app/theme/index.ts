import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export enum ThemeColor {
  CREAM = "#fcf8f3",
  BLACK = "#000000",
  WHITE = "#fff",
  LIGHT_GRAY = "#A6A6A6",
  GRAY = "#e2dfda",
  PRIME_GREEN = "#D8F055",
  PURPLE = "#8870FF",
  LIGHT_RED = "#F25B5C",
  LIGHT_ORANGE = "#FFB278",
  DARK_PINK = "#FC9985",
  LIGHT_GREEN = "#BDDEBC",
  GREEN = "#20BF55",
  MAROON = "#CF0000",
  DARK_YELLOW = "#FF9400",
  LIGHT_BLUE = "#A2CDFF",
  PLACEHOLDER = "#6c6c6c",
  YELLOW = "#FFE248",
  GRAY_STAR = "#e4e4e4",
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
          h1: "h1",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h1",
          subtitle2: "h2",
          body1: "p",
          body2: "span",
          button: "span",
          caption: "p",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontWeight: "700",
      fontSize: "50px",
      lineHeight: "1.7",
      "@media (max-width:900px)": {
        fontSize: "28px",
      },
      "@media (max-width:600px)": {
        fontSize: "15px",
      },
    },
    h2: {
      fontWeight: "bold",
      fontSize: "40px",
      "@media (max-width:900px)": {
        fontSize: "24px",
      },
      "@media (max-width:600px)": {
        fontSize: "24px",
      },
    },
    h3: {
      fontWeight: "bold",
      fontSize: "30px",
      "@media (max-width:900px)": {
        fontSize: "18px",
      },
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
    h6: {
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "1.5",
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
    caption: {
      fontWeight: "normal",
      fontSize: "22px",
      lineHeight: "1.5",
      "@media (max-width:900px)": {
        fontSize: "13px",
      },
      "@media (max-width:600px)": {
        fontSize: "9px",
      },
    },
    body1: {
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "1.5",
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
      "@media (max-width:600px)": {
        fontSize: "10px",
      },
    },
    subtitle2: {
      fontWeight: "bold",
      lineHeight: "1.5",
      fontSize: "15px",
      "@media (max-width:900px)": {
        fontSize: "12px",
      },
      "@media (max-width:600px)": {
        fontSize: "10px",
      },
    },

    subtitle1: {
      fontWeight: 600,
      lineHeight: "1.5",
      fontSize: "14px",
      "@media (max-width:900px)": {
        fontSize: "12px",
      },
      "@media (max-width:600px)": {
        fontSize: "13px",
      },
    },
    button: {
      fontWeight: "600",
      lineHeight: "1.5",
      fontSize: "15px",
      "@media (max-width:900px)": {
        fontSize: "13px",
      },
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
    body2: {
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "1.5",
      "@media (max-width:900px)": {
        fontSize: "12px",
      },
      "@media (max-width:600px)": {
        fontSize: "10px",
      },
    },
  },
});

export default theme;
