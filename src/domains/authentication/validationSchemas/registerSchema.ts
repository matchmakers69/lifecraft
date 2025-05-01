import { t } from "@/shared/locales";
import { z } from "zod";

const registerSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, { message: t.auth.register.registerSchema.nameRequired })
		.max(50, { message: t.auth.register.registerSchema.nameMaxLength })
		.refine(
			(value) => {
				// Check if the name contains only one space between words
				return /^\s*\S+(\s+\S+)*\s*$/.test(value);
			},
			{ message: t.auth.register.registerSchema.spacesNotAllowed },
		),
	email: z
		.string()
		.trim()
		.min(1, { message: t.auth.register.registerSchema.emailRequired })
		.email(t.auth.register.registerSchema.invalidEmailAddress),
	password: z
		.string()
		.min(6, { message: t.auth.register.registerSchema.passwordMinLength })
		.max(30, { message: t.auth.register.registerSchema.passwordMaxLength })
		.regex(new RegExp(".*[A-Z].*"), {
			message: t.auth.register.registerSchema.passwordUpperLetterRequired,
		})
		.regex(new RegExp(".*\\d.*"), {
			message: t.auth.register.registerSchema.passwordNumberRequired,
		})
		.regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
			message: t.auth.register.registerSchema.passwordSpecialCharacterRequired,
		}),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
export type { RegisterFormValues };
export { registerSchema };
