import { createTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { green, amber, red, blue } from "@mui/material/colors";
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#2fc4b2",
      dark: "#289c8e",
      light: "#b2f0e8",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h1: { fontSize: "3rem", fontWeight: 500, color: "#2fc4b2" },
    h2: { fontSize: "2.5rem", fontWeight: 500, color: "#2fc4b2" },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#2fc4b2",
      padding: "0.5rem",
    },
    h4: { fontSize: "1.75rem", fontWeight: 500, color: "#2fc4b2" },
    h5: { fontSize: "1.5rem", fontWeight: 500, color: "#2fc4b2" },
    button: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.96,
      color: "#2fc4b2",
    },
    caption: { fontSize: "0.75rem", fontWeight: 300, color: "#2fc4b2" },
    body1: { fontSize: "1rem", fontWeight: 400 },
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 500,
    htmlFontSize: 17,
  },

  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: "1rem",
        },
        contained: {
          backgroundColor: "#2fc4b2", // secondary.main
          color: "#ffffff", // primary.main
          "&:hover": {
            backgroundColor: "#289c8e", // secondary.dark
          },
        },
        outlined: {
          borderColor: "#2fc4b2", // secondary.main
          color: "#2fc4b2", // secondary.main
          backgroundColor: "#ffffff", // primary.main
          "&:hover": {
            borderColor: "#289c8e", // secondary.dark
            color: "#289c8e", // secondary.dark
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-row": {
            height: "40px",
          },
          "& .MuiDataGrid-columnHeader": {
            height: "45px",
            backgroundColor: "#D1EAF0", // very light shade of blue
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#2fc4b2", // secondary.main
          "&.Mui-checked": {
            color: "#289c8e", // secondary.dark
          },
          transform: "scale(1.3)",
          margin: "1.5rem 0rem 1rem 1.1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        colorSecondary: {
          "& .MuiSvgIcon-root": {
            borderRadius: "50%",
            // Add this to adjust the border thickness
            strokeWidth: "3", // Adjust this value to your liking
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 300,
          color: "black",
        },
        select: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#2fc4b2", // secondary.main
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: "0.3rem 0",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
        },
        colorInherit: {
          backgroundColor: "#2fc4b2",
          color: "#fff",
        },
      },
      defaultProps: {
        color: "secondary",
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "0.875rem",
          fontWeight: 300, // Adjust this to change the thickness of the text
          color: "black",
          "&::placeholder": {
            opacity: 0,
          },
          "&:focus::placeholder": {
            opacity: 1,
          },
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#2fc4b2", // secondary.main
          "&.Mui-checked": {
            color: "#289c8e", // secondary.dark
          },
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: "top", horizontal: "center" },
      },
    },
    MuiAlert: {
      styleOverrides: {
        success: {
          backgroundColor: green[600],
        },
        error: {
          backgroundColor: red[600],
        },
        warning: {
          backgroundColor: amber[600],
        },
        info: {
          backgroundColor: blue[600],
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          margin: "0.3rem 0",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "grey",
            },
            "&:hover fieldset": {
              borderColor: "#2fc4b2", // secondary.main
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2fc4b2", // secondary.main
            },
            "&.Mui-focused .MuiInputBase-input": {
              color: "#2fc4b2", // secondary.main
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
            fontWeight: 300,
            color: "black",
          },
          "& .MuiFormLabel-root": {
            fontWeight: 400, // Make the label text thin
            "&.Mui-focused": {
              fontWeight: 300, // Keep the label text thin when focused
              color: "#2fc4b2", // secondary.main
            },
          },
          select: {
            "&:focus": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey", // Change this to your desired color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2fc4b2", // secondary.main
          },
        },
        notchedOutline: {
          borderWidth: "1px", // Adjust this to change the thickness of the outline
        },
      },
    },

    MuiDatePicker: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            "&.Mui-focused": {
              color: "#2fc4b2", // secondary.main
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
            fontWeight: 300,
            color: "black",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#2fc4b2",
          borderColor: "#b2f0e8",
          "&:hover, &:focus": {
            backgroundColor: "#2fc4b2",
            color: "#ffffff",
          },
          "&$clickable": {
            "&:hover, &:focus": {
              backgroundColor: "#2fc4b2",
              color: "#ffffff",
            },
          },
        },
        outlined: {
          borderColor: "#b2f0e8",
        },
        clickable: {
          "&:hover, &:focus": {
            backgroundColor: "#2fc4b2",
            color: "#fff",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
  spacing: 5,
});

export default theme;
