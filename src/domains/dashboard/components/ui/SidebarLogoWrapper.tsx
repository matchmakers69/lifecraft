"use client";

import Link from "next/link";
import { Logo } from "@/shared/components/ui";
import { X } from "lucide-react";
import { useDashboardContext } from "../../context/DashboardContext";

const SidebarLogoWrapper = () => {
	const { dispatch, isSidebarInView } = useDashboardContext();

	const handleCloseSidebar = () => {
		dispatch({
			type: "TOGGLE_SIDEBAR",
			payload: !isSidebarInView,
		});
	};
	return (
		<>
			<div className="flex md:flex-col justify-between md:justify-center">
				<Link className="logo-link inline-block" href="/">
					<Logo width={115} />
				</Link>
				<button
					className="sidebar-close-menu flex h-[3rem] w-[3rem] cursor-pointer flex-col items-center justify-center border border-[rgb(175,175,175)] focus-global md:hidden lg:p-[10px]"
					onClick={handleCloseSidebar}
					type="button"
					aria-label="close navigation sidebar"
				>
					<X size={20} strokeWidth={1.5} />
				</button>
			</div>
		</>
	);
};

export { SidebarLogoWrapper };
