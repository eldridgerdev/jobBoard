"use client";
import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#8e4640",
        },
        secondary: {
          main: "#daa768",
        },
        error: {
          main: "#4a343d",
        },
        warning: {
          main: "#e6c34b",
        },
        success: {
          main: "#c6cf83",
        },
        info: {
          main: "#3b3b58",
        },
        background: {
          default: "#272323",
        },
      },
    },
  },
});
