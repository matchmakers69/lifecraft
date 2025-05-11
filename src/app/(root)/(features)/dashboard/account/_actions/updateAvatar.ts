"use server";


import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import {   getUserById } from "@/domains/user/services";
import { db } from "@/db";
import { paths } from "@/constants";
import { currentUser } from "@/lib/getCurrentUser";
import { updateAvatarSchema } from "@/domains/user/validationSchemas";

type UpdateUserAvatarFormState = {
  errors?: {
    image?: string[]
    _form?: string[];
  };
  success?: string;
  updateUserAvatar?: {
    image: string | null;
  };
};

export async function updateAvatar(
  prevState: UpdateUserAvatarFormState,
  formData: FormData,
): Promise<UpdateUserAvatarFormState> {
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
    result.data.image = undefined;
  }



  const updateData: Prisma.UserUpdateInput = {};


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
    const updateUserAvatar = await db.user.update({
      where: { id: dbUser.id },
      data: updateData,
    });
    revalidatePath(paths.settings());
    return {
      success: "Settings updated!",
      errors: {},
      updateUserAvatar: {
        image: updateUserAvatar.image,
      },
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
