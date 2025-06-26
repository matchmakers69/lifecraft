import { Footer, Navbar } from "@/components/ui";
import { ReactNode } from "react";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<Navbar />
			<div className="flex min-h-screen flex-col">
				<main className="flex-grow pt-[70px]">
					<div className="container mx-auto flex flex-col">
						<section className="pt-[4.8rem]">{children}</section>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
}
