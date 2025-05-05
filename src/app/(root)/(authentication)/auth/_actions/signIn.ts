"use server";

import bcrypt from "bcryptjs";

import { signIn as login } from "@/lib/auth";
import { loginSchema } from "@/domains/authentication/validationSchemas";
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
import { t } from "@/shared/locales";

type SignInUserState = {
	errors?: {
		email?: string[];
		password?: string[];
		code?: string[];
		_form?: string[];
	};
	success?: string;
	twoFactor?: boolean;
	callbackUrl?: string; // Added callbackUrl property
};

export const signInUser = async (
	prevState: SignInUserState,
	formData: FormData,
	callbackUrl?: string | null,
): Promise<SignInUserState> => {
	const result = loginSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		code: formData.get("code") ?? undefined,
	});

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors;
		return { errors };
	}

	const { data } = result;

	const existingUser = await getUserByEmail(data.email);

	if (!existingUser?.email || !existingUser.password) {
		return {
			errors: {
				_form: [t.auth.login.accountNotFound],
			},
		};
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email);
		await sendVerificationEmail(verificationToken.email, verificationToken.token);

		return { success: `${t.auth.login.accountNotFound}` };
	}

	// 2FA
	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		const isPasswordValid = await bcrypt.compare(data.password, existingUser.password);

		if (!isPasswordValid) {
			return {
				errors: {
					_form: [t.auth.login.invalidCredentials],
				},
			};
		}
		if (data.code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
			if (!twoFactorToken) {
				return {
					errors: {
						_form: [t.auth.login.incorrectCode],
					},
				};
			}
			if (twoFactorToken.token !== data.code) {
				return {
					errors: {
						_form: [t.auth.login.incorrectCode],
					},
				};
			}

			const codeHasExpired = new Date(twoFactorToken.expires) < new Date();

			if (codeHasExpired) {
				return {
					errors: {
						_form: [t.auth.login.codeExpired],
					},
				};
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
		await login("credentials", {
			email: data.email,
			password: data.password,
			// redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
			redirect: false, // Disable automatic redirect
		});

		return {
			callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
			success: t.auth.login.loginSuccess,
		};
	} catch (error) {
		if ((error as Error).name === "CredentialsSignin") {
			return {
				errors: {
					_form: [t.auth.login.incorrectEmailOrPassword],
				},
			};
		}

		return {
			errors: {
				_form: [t.auth.login.loginError],
			},
		};
	}
};
