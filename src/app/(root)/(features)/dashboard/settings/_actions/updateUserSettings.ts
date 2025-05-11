"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { updateUserSettingsSchema } from "@/domains/user/validationSchemas";
import {   getUserById } from "@/domains/user/services";
import { db } from "@/db";
import { paths } from "@/constants";
import { currentUser } from "@/lib/getCurrentUser";

type UpdateUserSettingsFormState = {
  errors?: {
    password?: string[];
    newPassword?: string[];
    _form?: string[];
  };
  success?: string;
};

export async function updateUserSettings(
  prevState: UpdateUserSettingsFormState,
  formData: FormData,
): Promise<UpdateUserSettingsFormState> {
  const result = updateUserSettingsSchema.safeParse({
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),

  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors };
  }

  const user = await currentUser();
  if (!user || !user.id) {
    return {
      errors: {
        _form: ["You must be authorized to do this."],
      },
    };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return {
      errors: {
        _form: ["You must be authorized to do this."],
      },
    };
  }

  if (user.is0Auth) {
    result.data.password = undefined;
    result.data.newPassword = undefined;
  }


  if (result.data.password && result.data.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      result.data.password,
      dbUser.password,
    );
    if (!passwordsMatch) {
      return { errors: { password: ["Incorrect password!"] } };
    }

    const hashedPassword = await bcrypt.hash(result.data.newPassword, 10);
    result.data.password = hashedPassword;
    result.data.newPassword = undefined;
  }

  const updateData: Prisma.UserUpdateInput = {};

  if (result.data.password !== undefined && result.data.password !== null) {
    updateData.password = result.data.password;
  }

  if (result.data.image !== undefined && result.data.image !== null) {
    updateData.image = result.data.image;
  }

  // Check if any data to update
  if (Object.keys(updateData).length === 0) {
    return {
      errors: {
        _form: ["No changes to update. Please modify at least one field."],
      },
    };
  }

  try {
     await db.user.update({
      where: { id: dbUser.id },
      data: updateData,
    });
    revalidatePath(paths.settings());
    return {
      success: "Settings updated!",
      errors: {},

    };
  } catch (err) {


    if (
      err instanceof PrismaClientKnownRequestError &&
      (err.code === "P1001" || err.code === "P1002")
    ) {
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
