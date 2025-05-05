"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LinkProps } from "next/link";
import { cn } from "@/utils";

export type NavLinkProps = LinkProps & {
	children: ReactNode;
	className?: string;
};
const NavLink = ({
	href,
	children,
	className,
	classNameActive,
	...props
}: NavLinkProps & { classNameActive?: string }) => {
	const currentPath = usePathname();
	const isActive = currentPath === href;

	return (
		<Link
			href={href}
			className={cn(
				"focus:outline-none focus:ring-1 focus-visible:ring-ring",
				className,
				isActive && classNameActive, // Add active styles if isActive
			)}
			{...props}
		>
			{children}
		</Link>
	);
};
export { NavLink };
