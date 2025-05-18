"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { currentUser } from "@/lib/getCurrentUser";
import { db } from "@/db";
import { paths } from "@/constants";
import { revalidatePath } from "next/cache";
import { UpdateUserAvatarState } from "@/domains/user/types";
import { t } from "@/shared/locales";
import { updateAvatarSchema } from "@/domains/user/validationSchemas";
import { getUserById } from "@/domains/user/services";
import { Prisma } from "@prisma/client";

export async function updateUserAvatar(
	prevState: UpdateUserAvatarState,
	formData: FormData,
): Promise<UpdateUserAvatarState> {
	const result = updateAvatarSchema.safeParse({
		image: formData.get("image"),
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
	const updateData: Prisma.UserUpdateInput = {};

if (!user.is0Auth && typeof result.data.image === "string") {
	updateData.image = result.data.image;
}

	try {
		const updatedUser = await db.user.update({
			where: { id: user.id },
			data: updateData,
		});

		revalidatePath(paths.settings());

		return {
			success: "Avatar updated successfully.",
			errors: {},
			updatedUser: {
				image: updatedUser.image,
			},
		};
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError && (err.code === "P1001" || err.code === "P1002")) {
			return {
				errors: {
					_form: ["Unable to connect to the database. Please try again later."],
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
				_form: ["Something went wrong..."],
			},
		};
	}
}
