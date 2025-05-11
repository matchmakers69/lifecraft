import { t } from "@/shared/locales";
import { auth } from "./auth";


export const currentUser = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error(t.auth.errors.userNotFoundInSession);
  }

  return session?.user;
};
