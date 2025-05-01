import { FormHelperText as MUIFormHelper } from "@mui/material";
import { BaseProps } from "@/shared/types";

const MUIFormHelperText = ({ children }: BaseProps) => {
	return (
		<MUIFormHelper
			sx={{
				fontSize: "1.2rem",
				color: "#d32f2f",
				marginTop: "0.25rem",
				minHeight: "1.5rem",
				display: "block",
			}}
		>
			{children}
		</MUIFormHelper>
	);
};

export { MUIFormHelperText };
