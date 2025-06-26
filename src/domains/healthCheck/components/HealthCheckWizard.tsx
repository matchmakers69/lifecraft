"use client";

export const HealthCheckSteps = {
	HealthGoals: "HealthGoals",
	SupplementationTaken: "SupplementationTaken",
	RiskSummary: "RiskSummary",
} as const;

type HealthCheckStepsValues = (typeof HealthCheckSteps)[keyof typeof HealthCheckSteps];

function HealthCheckWizard() {
	return <div>dupa</div>;
}

export default HealthCheckWizard;
