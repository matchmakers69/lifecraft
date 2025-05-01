import { db } from "@/db";

// File created when users use google or github to login
export const getAccountByUserId = async (userId: string) => {
	try {
		const account = await db.account.findFirst({
			where: {
				userId,
			},
		});
		return account;
	} catch {
		return null;
	}
};
