import { forwardRef } from "react";
import { TextField } from "@mui/material";
import { SxProps } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { getDefaultSx } from "@/shared/muiStyles";

export type MUITextFieldProps = {
	id?: string;
	label?: string;
	name?: string;
	maxWidth?: number;
	minWidth?: number;
	sx?: SxProps;
	["data-testid"]?: string;
	["aria-label"]?: string;
} & TextFieldProps;

const MUITextField = forwardRef<HTMLInputElement, MUITextFieldProps>(
	(
		{
			variant,
			label,
			name,
			id = "text-id",
			sx = {},
			"data-testid": dataTestid,
			"aria-label": ariaLabel,
			...props // Allows using TextFieldProps like label, variant, etc.
		},
		ref,
	) => {
		const mergedSx = { ...getDefaultSx(), ...sx };

		return (
			<TextField
				ref={ref}
				data-testid={dataTestid}
				aria-label={ariaLabel}
				id={id}
				label={label}
				name={name}
				variant={variant}
				sx={mergedSx}
				{...props}
			/>
		);
	},
);

MUITextField.displayName = "MUITextField";

export { MUITextField };
