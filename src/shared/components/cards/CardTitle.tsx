import { cn } from "@/utils";
import { forwardRef, HTMLAttributes } from "react";

export interface CardTitleProps extends HTMLAttributes<HTMLHeadElement> {
	text?: string;
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, text, ...props }, ref) => (
	<header className={cn("card-title-header mb-24", className)}>
		<h2 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props}>
			{props.children}
		</h2>
		{text && <p className="text-sm text-text-grey">{text}</p>}
	</header>
));
CardTitle.displayName = "CardTitle";

export { CardTitle };
