import React, { forwardRef } from "react";
import { BaseProps } from "@/shared/types";
import { Card } from "./Card";
import { cn } from "@/utils";

export type CardDarkWrapperProps = BaseProps & { className?: string };

const CardDarkWrapper = forwardRef<HTMLDivElement, CardDarkWrapperProps>(
	({ children, className, ...rest }, ref) => {
		return (
			<Card ref={ref} className={cn("card-dark-bg dark-border", className)} {...rest}>
				<div className="flex h-full w-full flex-col sm:flex-wrap lg:flex-nowrap">
					<div className="flex flex-col">{children}</div>
				</div>
			</Card>
		);
	},
);

CardDarkWrapper.displayName = "CardDarkWrapper";

export { CardDarkWrapper };
