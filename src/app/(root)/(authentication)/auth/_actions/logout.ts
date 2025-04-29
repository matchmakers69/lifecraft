"use server";

import { paths } from "@/constants";
import * as auth from "@/lib/auth";
import { t} from "@/shared/locales"

export const logout = async () => {
	try {
		await auth.signOut({
			redirectTo: paths.login(),
		});
	} catch (error) {
		if ((error as Error).name === "SignOutError") {
			return { error: t.auth.logout.error };
		}
		return { error: t.auth.logout.error };
	}
};
