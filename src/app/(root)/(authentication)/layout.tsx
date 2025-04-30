import { ReactNode } from "react";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<main className="relative w-full">
			<div className="flex h-full w-full items-center justify-center p-8 lg:justify-between lg:p-0">
				{children}
			</div>
		</main>
	);
}
