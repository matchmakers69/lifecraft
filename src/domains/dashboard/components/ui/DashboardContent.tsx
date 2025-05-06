"use client";

import { useDashboardContext } from "@/domains/dashboard/context/DashboardContext";
import { BaseProps } from "@/shared/types";
import { DashboardHeader } from "./DashboardHeader";

const DashboardContent = ({ children }: BaseProps) => {
	const { dispatch, isSidebarInView } = useDashboardContext();
	const handleToggleOpenSidebar = () => {
		dispatch({
			type: "TOGGLE_SIDEBAR",
			payload: !isSidebarInView,
		});
	};
	return (
		<main className="dashboard-content-main flex flex-1 flex-col lg:min-w-0 lg:pl-[32rem]">
			<DashboardHeader onOpen={handleToggleOpenSidebar} />
			<div className="dashboard-content grow">
				<div className="dashboard-content-inner px-14 py-20 md:px-16">
					<div className="dashboard-content-centered mx-auto">{children}</div>
				</div>
			</div>
		</main>
	);
};

export { DashboardContent };
