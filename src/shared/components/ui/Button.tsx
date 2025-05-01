import { forwardRef, type ForwardedRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";
import { Slot } from "./Slot";
import { cn } from "@/utils";

export const buttonVariants = cva(
	"inline-flex items-center font-ibm font-medium py-2 px-4 font-medium justify-center whitespace-nowrap text-sm transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-20",
	{
		variants: {
			variant: {
				default:
					"bg-dark-blue text-black hover:bg-text-light hover:text-black rounded-lg items-center justify-center",
				outline: "border border-solid rounded-lg bg-transparent hover:opacity-60",
				destructive: "bg-destructive rounded-lg text-text-light shadow-sm hover:bg-destructive/90",
				primary:
					"bg-text-light text-black rounded-lg items-center justify-center flex flex-col hover:bg-dark-blue hover:text-black",
				secondary: "bg-dark-blue text-black rounded-lg items-center justify-center flex flex-col",
				link: "text-text-light hover:text-dark-blue",
				social:
					"flex text-text-light items-center rounded-lg shadow-md px-6 py-2 text-sm focus:ring-2 focus:outline-none font-medium",
			},
			size: {
				default: "h-[44px] text-sm min-w-[17rem]",
				full: "h-[44px] px-6 py-2 text-sm w-full",
				sm: "px-7 text-sm min-w-[10rem] h-[44px]",
				lg: "h-[44px] px-8 text-md min-w-[18rem]",
				xl: "h-[44px] px-8 text-md",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type ButtonProps = Readonly<{
	asChild?: boolean;
}> &
	VariantProps<typeof buttonVariants> &
	ComponentProps<"button">;

const Button = forwardRef(
	(
		{ className, variant, size, asChild = false, ...props }: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		const Comp = asChild ? Slot : "button";
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
	},
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
