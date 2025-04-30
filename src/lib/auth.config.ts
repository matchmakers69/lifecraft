import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

import { loginSchema } from "@/domains/authentication/validationSchemas";
import { getUserByEmail } from "@/domains/user/services";

const AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID;
const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET;

if (!AUTH_GOOGLE_ID || !AUTH_GOOGLE_SECRET) {
	throw new Error("Missing Google OAuth credentials");
}

export default {
	providers: [
		Google({
			clientId: AUTH_GOOGLE_ID,
			clientSecret: AUTH_GOOGLE_SECRET,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = loginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					// We want to check if email is connected with any email in database
					const user = await getUserByEmail(email);
					if (!user?.password) {
						return null;
					}
					const passwordsMatch = await bcrypt.compare(password, user.password); // compare password hash
					if (passwordsMatch) return user;
				}
				return null;
			},
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@example.com",
				},
				password: { label: "Password", type: "password" },
			},
		}),
	],
} satisfies NextAuthConfig;
