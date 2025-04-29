const paths = {
	home: () => {
		return "/";
	},
	login: () => {
		return "/login";
	},
	register: () => {
		return "/register";
	},
	passwordReset() {
		return "/reset-password";
	},
	newPassword() {
		return "/new-password";
	},
	newVerification() {
		return "/new-verification";
	},
	authError: () => {
		return "/error";
	},
} satisfies Record<string, () => string>;

export { paths };
