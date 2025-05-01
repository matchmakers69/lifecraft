import { Children, cloneElement, HTMLAttributes, isValidElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type AsChildProps<DefaultElementProps> =
	| ({ asChild?: false } & DefaultElementProps)
	| { asChild: true; children: ReactNode };

const Slot = ({
	children,
	...props
}: HTMLAttributes<HTMLElement> & {
	children?: ReactNode;
}) => {
	if (isValidElement<HTMLAttributes<HTMLElement>>(children)) {
		const childProps = children.props as HTMLAttributes<HTMLElement>;

		return cloneElement(children, {
			...props,
			...childProps,
			style: {
				...((props.style ?? {}) as React.CSSProperties),
				...((childProps.style ?? {}) as React.CSSProperties),
			},
			className: twMerge(props.className, childProps.className),
		});
	}

	if (Children.count(children) > 1) {
		throw new Error("Slot expects a single child element.");
	}

	return null;
};

export { Slot };
export type { AsChildProps };
