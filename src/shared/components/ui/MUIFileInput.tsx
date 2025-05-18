import { forwardRef } from "react";
import { SxProps } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { TextField } from "@mui/material";
import { getDefaultSx } from "@/shared/muiStyles";

export type MUIFileInputProps = {
	id?: string;
	label?: string;
	name?: string;
	maxWidth?: number;
	minWidth?: number;
	sx?: SxProps;
	["data-testid"]?: string;
	["aria-label"]?: string;
	accept?: string;
	onFileChange?: (file: File | null) => void;
	value?: File | string | null;
} & TextFieldProps;

const MUIFileInput = forwardRef<HTMLInputElement, MUIFileInputProps>(
	(
		{
			variant,
			label,
			name,
			id = "text-id",
			sx = {},
			"data-testid": dataTestid,
			"aria-label": ariaLabel,
			accept = "image/*",
			onFileChange,
			onChange,
			...props
		},
		ref,
	) => {
		const mergedSx = { ...getDefaultSx(), ...sx };

		// Wrapper handler to trigger both events
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0] ?? null;
			if (onFileChange) onFileChange(file); // simplified event
			if (onChange) onChange(e); // original event
		};

		return (
			<>
				<TextField
					ref={ref}
					data-testid={dataTestid}
					aria-label={ariaLabel}
					id={id}
					label={label}
					name={name}
					variant={variant}
					sx={{
						...mergedSx,
						"& .MuiInputBase-root": {
							cursor: "pointer",
							backgroundColor: "transparent",
							display: "none",
						},
						"& .MuiOutlinedInput-root": {
							borderRadius: "0",
							backgroundColor: "transparent",
							padding: 0,
							display: "none",
							"& fieldset": {
								border: "none",
							},
							"&:hover fieldset": {
								border: "none",
							},
							"&.Mui-focused fieldset": {
								background: "none",
								outline: 0,
							},
						},
						'& input[type="file"]': {
							cursor: "pointer",
						},
					}}
					type="file"
					slotProps={{
						htmlInput: {
							accept,
						},
					}}
					onChange={handleInputChange}
					{...props}
				/>
			</>
		);
	},
);

MUIFileInput.displayName = "MUIFileInput";

export { MUIFileInput };
