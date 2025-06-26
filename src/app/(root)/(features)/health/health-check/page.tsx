import { PageTitle } from "@/components/ui";
import { HealthCheckWizard } from "@/domains/healthCheck/components";
import { getHealthGoals } from "@/domains/healthCheck/lib";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Healthcheck | Lifecraft",
	description: "Your healthcheck",
};

export default async function HealthCheckPage() {
	const goals = await getHealthGoals();
	console.log(goals);
	return (
		<>
			<PageTitle className="mb-16" title="Your health" />
			<HealthCheckWizard />
		</>
	);
}
