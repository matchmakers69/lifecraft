"use server";

import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { updateUserDetailsSchema } from "@/domains/user/validationSchemas";
import { getUserByEmail, getUserById } from "@/domains/user/services";
import { generateVerificationToken, sendVerificationEmail } from "@/domains/authentication/services";
import { db } from "@/db";
import { paths } from "@/constants";
import { currentUser } from "@/lib/getCurrentUser";
import { t } from "@/shared/locales";
import { UpdateUserSettingsFormState } from "@/domains/user/types";

export async function updateUserDetails(
	prevState: UpdateUserSettingsFormState,
	formData: FormData,
): Promise<UpdateUserSettingsFormState> {
	const result = updateUserDetailsSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),

	});

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors;
		return { errors };
	}

	const user = await currentUser();
	if (!user || !user.id) {
		return {
			errors: {
				_form: [t.auth.errors.mustBeAuthorized],
			},
		};
	}

	const dbUser = await getUserById(user.id);
	if (!dbUser) {
		return {
			errors: {
				_form: [t.auth.errors.mustBeAuthorized],
			},
		};
	}

	if (user.is0Auth) {
		result.data.email = undefined;
	}

	if (result.data.email && result.data.email !== user.email) {
		const existingUser = await getUserByEmail(result.data.email);
		if (existingUser && existingUser.id !== user.id) {
			return {
				errors: {
					email: [t.auth.errors.emailUsed],
				},
			};
		}

		const verificationToken = await generateVerificationToken(result.data.email);
		await sendVerificationEmail(verificationToken.email, verificationToken.token);

		return {
			success: `${t.auth.success.alertEmail}`,
		};
	}

	const updateData: Prisma.UserUpdateInput = {};

	if (result.data.name !== undefined && result.data.name !== null) {
		updateData.name = result.data.name;
	}

	if (result.data.email !== undefined && result.data.email !== null) {
		updateData.email = result.data.email;
	}


	// Check if any data to update
	if (Object.keys(updateData).length === 0) {
		return {
			errors: {
				_form: [t.account.errors.noUpdate],
			},
		};
	}

	try {
		const updatedUser = await db.user.update({
			where: { id: dbUser.id },
			data: updateData,
		});
		revalidatePath(paths.settings());
		return {
			success: t.account.successAlert,
			errors: {},
			updatedUser: {
				name: updatedUser.name,
				email: updatedUser.email,
			},
		};
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
			return { errors: { email: [t.auth.errors.emailUsed] } };
		}

		if (err instanceof PrismaClientKnownRequestError && (err.code === "P1001" || err.code === "P1002")) {
			return {
				errors: {
					_form: [t.account.errors.unableToConnectWithDatabase],
				},
			};
		}

		if (err instanceof Error) {
			return {
				errors: {
					_form: [err.message],
				},
			};
		}

		return {
			errors: {
				_form: [t.account.errors.updateWentWrong],
			},
		};
	}
}
