import { PageTitle } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin Dashboard",
	description: "Admin dashboard",
};

function AdminDashboardPage() {
	return (
		<>
			<PageTitle className="mb-16" title="Dashboard" />
			{/* Typescript grid here */}
		</>
	);
}

export default AdminDashboardPage;
