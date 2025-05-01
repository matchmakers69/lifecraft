import { forwardRef } from "react";
import { SxProps } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { TextField } from "@mui/material";
import { getDefaultSx } from "@/shared/muiStyles";
import { MUIFormLabel } from "./MUIFormLabel";

export type MUIFileInputProps = {
	id?: string;
	label?: string;
	name?: string;
	maxWidth?: number;
	minWidth?: number;
	sx?: SxProps;
	["data-testid"]?: string;
	["aria-label"]?: string;
	accept: string;
	onFileChange?: (_file: File | null) => void;
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

		return (
			<>
				{label && <MUIFormLabel htmlFor={id} label={label} optionalText={""} />}
				<TextField
					ref={ref}
					data-testid={dataTestid}
					aria-label={ariaLabel}
					id={id}
					label={label}
					name={name}
					variant={variant}
					sx={mergedSx}
					type="file"
					slotProps={{
						htmlInput: {
							accept,
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target.files?.[0] ?? null;
								if (onFileChange) onFileChange(file);
								if (onChange) onChange(e);
							},
						},
					}}
					{...props}
				/>
			</>
		);
	},
);

MUIFileInput.displayName = "MUIFileInput";

export { MUIFileInput };
