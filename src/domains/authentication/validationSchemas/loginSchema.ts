import { t } from "@/shared/locales";
import { z } from "zod";

const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: t.auth.login.loginSchema.emailRequired })
		.email(t.auth.login.loginSchema.invalidEmailAddress),
	password: z.string().min(1, { message: t.auth.login.loginSchema.passwordRequired }),
	code: z.optional(
		z
			.string()
			.refine((value) => value === "" || value.length === 6, {
				message: t.auth.login.loginSchema.codePattern,
			})
			.refine((value) => value === "" || /^\d+$/.test(value), {
				message: t.auth.login.loginSchema.codeDigitsOnly,
			}),
	),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginFormValues };
