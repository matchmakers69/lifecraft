import { cn } from "@/utils";
import { forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />,
);
Card.displayName = "Card";

export { Card };
