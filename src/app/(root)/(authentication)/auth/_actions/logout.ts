"use server";

import { paths } from "@/constants";
import * as auth from "@/lib/auth";

const logout = async () => {
	return auth.signOut({
		redirectTo: paths.login(),
	});
};

export { logout };
