import { Button } from "@/shared/components/ui";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="container mx-auto flex flex-col flex-nowrap items-start justify-center gap-[50px] py-[50px]">
			<div className="flex w-full flex-nowrap items-center justify-between border-t border-[hsla(0,0%,100%,0.05)] pt-[50px]">
				<div className="copyright flex flex-wrap items-center gap-[5px] text-[1.6rem] text-text-grey">
					<p>All rights reserved &copy; {new Date().getFullYear()}</p>
					<p>Lifecraft</p>
				</div>
				<nav className="flex flex-nowrap items-center gap-[2.5rem]">
					<Button
						className="flex-start min-w-[auto] px-0 text-dark-grey transition-colors duration-300 hover:text-text-light"
						asChild
						variant="link"
						size="sm"
					>
						<Link href="#">Terms and conditions</Link>
					</Button>

					<Button
						className="flex-start min-w-[auto] px-0 text-dark-grey transition-colors duration-300 hover:text-text-light"
						asChild
						variant="link"
						size="sm"
					>
						<Link href="#">Privacy policy</Link>
					</Button>

					<Button
						className="flex-start min-w-[auto] px-0 text-dark-grey transition-colors duration-300 hover:text-text-light"
						asChild
						variant="link"
						size="sm"
					>
						<Link href="#">Copyright</Link>
					</Button>
				</nav>
			</div>
		</footer>
	);
};

export { Footer };
