import { BaseProps } from "@/shared/types";
import { cn } from "@/utils";

type FileUploadLabelProps = {
	label: string;
	id?: string;
	className?: string;
	"aria-label"?: string;
	disabled?: boolean;
} & BaseProps;

const FileUploadLabel = ({
	children,
	className = "",
	"aria-label": ariaLabel,
	id = "file-upload",
	disabled = false,
	label,
}: FileUploadLabelProps) => {
	return (
		<label
			htmlFor={id}
			className={cn(
				"inline-flex items-center w-full cursor-pointer font-medium px-2 py-2 focus:outline-none focus-visible:ring-1 ring-berry-blue focus-visible:ring-berry-blue focus-visible:ring-offset-1",
				className,
			)}
			aria-label={ariaLabel || label}
			tabIndex={disabled ? -1 : 0}
			aria-disabled={disabled}
		>
			<span className="text-sm inline-block order-2">{label}</span>
			{children}
		</label>
	);
};

export { FileUploadLabel };
