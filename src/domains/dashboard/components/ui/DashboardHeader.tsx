"use client";

import { useCurrentUser } from "@/domains/authentication/hooks";

type DashboardHeaderProps = {
	onOpen: () => void;
};

const DashboardHeader = ({ onOpen }: DashboardHeaderProps) => {
	const user = useCurrentUser();
	const username = user?.name ?? "Username";
	return (
		<header className="dashboard-header">
			<div className="header-dashboard-inner border-b dark-border flex w-full items-center justify-between px-8 py-4 lg:items-start lg:justify-start lg:py-6">
				<h2 className={`text-[1.2rem] font-medium leading-[1.2] text-text-light sm:text-[1.4rem]`}>
					Welcome back, {username}
				</h2>
				<button
					className="sidebar-menu-toggle-button flex h-full cursor-pointer items-center p-[1rem] focus-global md:p-[20px] lg:hidden"
					onClick={onOpen}
					type="button"
					aria-label="toggle navigation sidebar"
				>
					<span className="sidebar-menu-toggle-button-icon flex h-[2rem] w-[2rem] flex-col items-start justify-center sm:mr-[0.8rem]" />
					<span className="hidden text-sm font-thin uppercase sm:inline-block">Menu</span>
				</button>
			</div>
		</header>
	);
};

export { DashboardHeader };
