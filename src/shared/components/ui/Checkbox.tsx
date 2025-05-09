import { cn } from "@/utils";
import { type InputHTMLAttributes } from "react";

type CheckboxType = InputHTMLAttributes<HTMLInputElement>;

export interface CheckboxProps extends CheckboxType {
	id: string;
	label: string;
	className?: string;
	strokeColor?: string;
}

export const Checkbox = ({
	label,
	onChange,
	id,
	className,
	strokeColor,
	checked,
	...props
}: CheckboxProps) => {
	return (
		<div className="flex w-full items-center gap-4">
			<input
				className={cn(
					"disabled:border-steel-400 disabled:bg-steel-400 peer relative mt-0 flex h-10 w-10 shrink-0 appearance-none flex-col items-center justify-center rounded-sm border-2 border-border-input-light bg-[hsla(0,0%,100%,0)] checked:border-0 checked:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-0",
					className,
				)}
				type="checkbox"
				checked={checked}
				id={id}
				onChange={onChange}
				{...props}
			/>
			<svg
				className="pointer-events-none absolute hidden h-10 w-10 peer-checked:block"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke={strokeColor}
				strokeWidth="2"
			>
				<polyline points="20 6 9 17 6 12"></polyline>
			</svg>
			<label htmlFor={id}>{label}</label>
		</div>
	);
};
