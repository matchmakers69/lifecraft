import { navigation } from "@/constants";
import { NavLink } from ".";

const Navigation = () => {
	return (
		<nav className="mr-20">
			<ul className="m-0 flex w-full items-center gap-6">
				{navigation.map((navItem) => (
					<li key={navItem.id}>
						<NavLink
							className="relative flex h-[42px] max-w-full cursor-pointer select-none items-center justify-start gap-[10px] rounded-[10px] border border-solid border-[hsla(0,0%,100%,0.1)] bg-transparent px-[15px] py-[10px] text-sm text-light-grey transition-all duration-200 ease-out md:hover:bg-[#ffffff13] md:hover:text-text-light"
							classNameActive="text-primary bg-[#ffffff0d]"
							href={navItem.url}
						>
							<span className="text-inherit">{navItem.linkLabel}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export { Navigation };
