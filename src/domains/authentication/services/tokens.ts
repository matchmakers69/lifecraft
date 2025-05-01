import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { getTwoFactorTokenByEmail } from "./twoFactorToken";
import { db } from "@/db";
import { getVerificationTokenByEmail } from "./verificationToken";
import { getPasswordResetTokenByEmail } from "./passwordResetToken";

const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100000, 1000000).toString(); // we need to generate a unique code
	const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
	const existingToken = await getTwoFactorTokenByEmail(email);
	if (existingToken) {
		await db.twoFactorToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const twoFactorToken = await db.twoFactorToken.create({
		data: {
			email,
			token, // 6 digits code
			expires,
		},
	});
	return twoFactorToken;
};

const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000); // token will expire in one hour
	//const expires = new Date(new Date().getTime() + 5 * 60 * 1000);  // token will expire in 5 minutes

	const existingToken = await getVerificationTokenByEmail(email);
	if (existingToken) {
		// if there is already token in database we will remove it
		await db.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const verificationtoken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return verificationtoken;
};

const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getPasswordResetTokenByEmail(email);

	if (existingToken) {
		await db.passwordResetToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const passwordResetToken = await db.passwordResetToken.create({
		data: {
			token,
			email,
			expires,
		},
	});

	return passwordResetToken;
};

export { generateTwoFactorToken, generateVerificationToken, generatePasswordResetToken };
