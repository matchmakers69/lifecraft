import { ReactNode } from "react";
import { DashboardContent, Sidebar } from "@/domains/dashboard/components/ui";
import { DashboardContextProvider } from "@/domains/dashboard/context/DashboardContext";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<div className="relative isolate flex min-h-[100svh] w-full dashboard-layout">
			<DashboardContextProvider>
				<Sidebar />
				<DashboardContent>{children}</DashboardContent>
			</DashboardContextProvider>
		</div>
	);
}
