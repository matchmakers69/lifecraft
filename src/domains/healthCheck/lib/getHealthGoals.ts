import { cookies } from "next/headers";
import { BASE_URL } from "@/constants";
import { HealthGoal } from "../types";

export default async function getHealthGoals(): Promise<HealthGoal[]> {
	const cookieStore = await cookies();
	const res = await fetch(`${BASE_URL}/api/health`, {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});
	if (!res.ok) {
		throw new Error("Error fetching health goals");
	}

	const data = await res.json();
	return data;
}
