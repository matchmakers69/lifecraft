"use client";

import { ReactNode } from "react";
import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const LocalizationProvider = ({ children }: { children: ReactNode }) => {
	return <MUILocalizationProvider dateAdapter={AdapterDateFns}>{children}</MUILocalizationProvider>;
};

export { LocalizationProvider };
