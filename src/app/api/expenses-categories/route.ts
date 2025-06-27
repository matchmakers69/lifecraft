import { paths } from "@/constants";
import { db } from "@/db";
import { currentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
	const user = await currentUser();
	if (!user || !user.id) {
		redirect(paths.login());
	}
	try {
		const expenseCategories = await db.expenseCategory.findMany();
		const mappedExpenseCategories = expenseCategories.map((category) => ({
			id: category.id,
			label: category.label || "Uncategorized",
		}));

		return NextResponse.json(mappedExpenseCategories, { status: 200 });
	} catch (error) {
		console.error("Error fetching expenses categories:", error);
		return NextResponse.json(
			{
				message: "Could not fetch expenses categories",
			},
			{ status: 500 },
		);
	}
}
