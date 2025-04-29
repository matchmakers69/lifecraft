const paths = {
	home: () => {
		return "/";
	},
	login: () => {
		return "/auth/login";
	},
	register: () => {
		return "/auth/register";
	},
	passwordReset() {
		return "/auth/reset-password";
	},
	newPassword() {
		return "/auth/new-password";
	},
	newVerification() {
		return "/auth/new-verification";
	},
	authError: () => {
		return "/auth/error";
	},
} satisfies Record<string, () => string>;

export { paths };
