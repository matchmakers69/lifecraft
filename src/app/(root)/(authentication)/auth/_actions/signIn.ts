"use server";

import bcrypt from "bcryptjs";

import { signIn as signInUser } from "@/lib/auth";

import { LoginFormValues, loginSchema } from "@/domains/authentication/validationSchemas";
import { db } from "@/db";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
	generateTwoFactorToken,
	generateVerificationToken,
	getTwoFactorTokenByEmail,
	sendTwoFactorTokenEmail,
	sendVerificationEmail,
} from "@/domains/authentication/services";
import { getTwoFactorConfirmationByUserId, getUserByEmail } from "@/domains/user/services";

export const signIn = async (values: LoginFormValues, callbackUrl?: string | null) => {
	// server site validation
	const validatedFields = loginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "The email or password you entered is incorrect." };
	}

	const { email, password, code } = validatedFields.data;
	const existingUser = await getUserByEmail(email);

	if (!existingUser?.email || !existingUser.password) {
		return { error: "Credentials do not exist! Please sign up!" };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email);

		await sendVerificationEmail(verificationToken.email, verificationToken.token);

		return { success: "Confirmation email sent!" };
	}

	// 2FA
	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		const isPasswordValid = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordValid) {
			return { error: "Invalid credentials!" };
		}
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
			if (!twoFactorToken) {
				return { error: "Your code is not correct! Try again!" };
			}
			if (twoFactorToken.token !== code) {
				return { error: "Your code is not correct! Try again!" };
			}

			const codeHasExpired = new Date(twoFactorToken.expires) < new Date();

			if (codeHasExpired) {
				return { error: "Your code has expired" };
			}

			// We can remove 2FA token and add confirmation - user can finally login
			await db.twoFactorToken.delete({
				where: { id: twoFactorToken.id },
			});

			// Check if we have existing confirmation
			const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}

			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
			return {
				twoFactor: true,
			};
		}
	}

	// User logins here
	try {
		await signInUser("credentials", {
			email,
			password,
			// redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
			redirect: false, // Disable automatic redirect
		});
		return {
			success: true,
			callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		};
	} catch (error) {
		if ((error as Error).name === "CredentialsSignin") {
			return { error: "The email or password you entered is incorrect." };
		}

		return { error: "Something went wrong with login!" };
	}
};
