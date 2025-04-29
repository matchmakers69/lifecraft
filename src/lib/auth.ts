import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "../db";
import { paths } from "@/constants";
import { getUserById } from "@/domains/eventsCalendar/services";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";
import {
	getAccountByUserId,
	getTwoFactorConfirmationByUserId,
} from "@/domains/authentication/account/services";

export type ExtendedUser = DefaultSession["user"] & {
	id: string;
	role: UserRole;
	isTwoFactorEnabled: boolean;
	is0Auth: boolean;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: paths.login(),
		error: paths.authError(),
	},
	events: {
		// IMPORTANT! Added to make sure if user logs in with Github or Google email will be verified
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// Allow OAuth without email verification
			if (account?.provider !== "credentials") return true;

			if (user.id) {
				const existingUser = await getUserById(user.id);

				// Prevent signin without email verification
				if (!existingUser?.emailVerified) return false;

				// 2FA check - here below we prevent user to login without having 2FA enabled
				if (existingUser.isTwoFactorEnabled) {
					const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

					if (!twoFactorConfirmation) return false; // User is not allowed to login without 2FA

					// Delete two factor confirmation for next sign in
					await db.twoFactorConfirmation.delete({
						where: {
							id: twoFactorConfirmation.id,
						},
					});
				}
				return true; // By default you allow users to sign in
			}
			return false; // Handle the case where user is undefined
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
			}

			if (session.user) {
				session.user.name = token.name ?? "";
				session.user.email = token.email ?? "";
				session.user.role = token?.role as UserRole;
				session.user.is0Auth = token.is0Auth as boolean;
				session.user.id = token.id as string;
			}

			return session;
		},
		async jwt({ token, trigger, session }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			const existingAccount = await getAccountByUserId(existingUser.id);
			token.is0Auth = !!existingAccount;
			// We need to update session when we update name, email, etc
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
			token.id = existingUser.id;

			if (trigger === "update" && session) {
				token = { ...token, user: session };
				return token;
			}

			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authConfig,
});
