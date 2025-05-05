"use server";

import { db } from "@/db";
import { getVerificationTokenByToken } from "@/domains/authentication/services";
import { getUserByEmail } from "@/domains/user/services";
import { t } from "@/shared/locales";

const verifyEmail = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: t.auth.verification.userDoesNotExist };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return {
			error: `${t.auth.verification.verificationTokenDoeasNotExist}`,
		};
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return { error: `${t.auth.verification.userDoesNotExist}` };
	}

	await db.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	});

	await db.verificationToken.delete({
		where: { id: existingToken.id },
	});

	return { success: `${t.auth.verification.emailVerified}` };
};

export { verifyEmail };
