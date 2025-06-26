import { paths } from "@/constants";
import { currentUser } from "@/lib/getCurrentUser";
import { parseError } from "@/shared/types/errorParser";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const healthGoals = [
	{ id: "1", label: "Lose Weight" },
	{ id: "2", label: "Improve Sleep Quality" },
	{ id: "3", label: "Build Muscle" },
	{ id: "4", label: "Lower Blood Pressure" },
	{ id: "5", label: "Reduce Stress" },
	{ id: "6", label: "Train for Triathlon" },
];

export async function GET() {
    const user = await currentUser();
    if (!user || !user.id) {
      redirect(paths.login());
    }
	try {
		// await new Promise((res) =>
		// 	setTimeout(() => {
		// 		res(healthGoals);
		// 	}, 500),
		// );
		// or
		return NextResponse.json(healthGoals, { status: 200 });
	} catch (error) {
		if (parseError(error)) {
			console.error("Caught error:", error.message);
		} else {
			return NextResponse.json({ message: "Could not fetch health goals" }, { status: 500 });
		}
	}
}
