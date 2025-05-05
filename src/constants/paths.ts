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
	verification() {
		return "/auth/verification";
	},
	authError: () => {
		return "/auth/error";
	},
	settings: () => {
		return "/dashboard/settings";
	},
	adminDashboard() {
		return `/administrator/dashboard`;
	},
} satisfies Record<string, () => string>;

export { paths };
