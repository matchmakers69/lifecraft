"use server";

import bcrypt from "bcryptjs";
import { generateVerificationToken, sendVerificationEmail } from "@/domains/authentication/services";
import { db } from "@/db";
import { getUserByEmail } from "@/domains/user/services";
import { registerSchema } from "@/domains/authentication/validationSchemas";
import { t } from "@/shared/locales";
import { isError } from "@/utils";

type SignUpUserFormState = {
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		_form?: string[];
	};
	success?: string;
};

const signUpUser = async (
	prevState: SignUpUserFormState,
	formData: FormData,
): Promise<SignUpUserFormState> => {
	const result = registerSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors;
		return { errors };
	}

	const { data } = result;
	const hashedPassword = await bcrypt.hash(data.password, 10);
	const existingUser = await getUserByEmail(data.email);

	if (existingUser) {
		return {
			errors: {
				_form: [t.auth.register.userExists],
			},
		};
	}

	try {
		await db.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
			},
		});

		const verificationToken = await generateVerificationToken(data.email);

		await sendVerificationEmail(verificationToken.email, verificationToken.token);

		return {
			success: t.auth.register.registrationSuccess,
		};
	} catch (error) {
		console.error(t.auth.register.errorInRegistration, error);
		if (isError(error)) {
			return {
				errors: {
					_form: [error.message],
				},
			};
		}
		return {
			errors: {
				_form: [t.errors.errorMsg],
			},
		};
	}
};

export { signUpUser };
