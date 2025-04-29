import { z } from "zod";

const loginSchema = z.object({
	email: z.string().min(1, { message: "Email is a required field" }).email("Invalid email address"),
	password: z.string().min(1, { message: "Password is a required field" }),
	code: z.optional(
		z
			.string()
			.refine((value) => value === "" || value.length === 6, {
				message: "Code must be exactly 6 digits if provided",
			})
			.refine((value) => value === "" || /^\d+$/.test(value), {
				message: "Code must include only digits",
			}),
	),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginFormValues };
