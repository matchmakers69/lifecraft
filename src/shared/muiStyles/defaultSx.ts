import { SxProps, Theme } from "@mui/material";

 const dropDownOptionsSx = {
  fontSize: "1.5rem",
  color: "var(--text-light)",
  fontFamily: "var(--font-ibm)",
};

 const dropDownPaperOptionsSx = {
  borderRadius: "10px",
  backgroundColor: "hsl(var(--background))",
  border: "1px solid hsla(0,0%,100%,0.15)",
  fontSize: "1.5rem",
  fontFamily: "var(--font-ibm)",
  color: "var(--text-light)",
  "& .MuiMenuItem-root": {
    fontSize: "1.4rem",
    padding: "10px 16px",
    "&:hover": {
      backgroundColor: "hsla(0,0%,100%,0.15)",
    },
    "&.Mui-selected": {
      backgroundColor: "hsla(0,0%,100%,0.15)",
    },
  },
};

 const getDefaultSx = (sx: SxProps<Theme> = {}) =>
  ({
    ...sx,
    "& .MuiInputLabel-outlined": {
      color: "var(--text-light)",
      fontSize: "1.4rem",
    },
    "& .MuiInputLabel-outlined.Mui-disabled": {
      color: "var(--text-light)",
      fontSize: "1.4rem",
      opacity: 0.4,
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "var(--text-light)",
      fontSize: "1.4rem",
    },
    "& .MuiInputBase-input": {
      fontSize: "1.5rem",
      color: "var(--text-light)",
      "&::placeholder": {
        opacity: 0.3,
      },
    },
    "& .MuiOutlinedInput-root": {
      fontSize: "1.5rem",
      color: "var(--text-light)",
      borderRadius: "10px",
      transition: "border-color 120ms ease-in",

      "& fieldset": {
        border: "1px solid",
        borderColor: "hsla(0,0%,100%,0.15)",
      },
      "&:hover fieldset": {
        borderColor: "hsla(0,0%,100%,.05)",
        border: "1px solid",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--text-light)",
        background: "none",
        outline: 0,
      },
    },
  }) as SxProps<Theme>;


  export {dropDownOptionsSx, dropDownPaperOptionsSx,getDefaultSx}