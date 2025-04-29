"use server";

import { paths } from "@/constants";
import * as auth from "@/lib/auth";

import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
	await auth.signIn(provider, { redirectTo: paths.home() });
	revalidatePath(paths.home());
};
