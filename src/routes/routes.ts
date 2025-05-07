import { paths } from "@/constants";

/**
 * An array of routes that are accesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
const publicRoutes: string[] = [paths.home(), paths.verification()];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged users to settings
 * @type {string[]}
 */
const authRoutes = [
	paths.login(),
	paths.register(),
	paths.authError(),
	paths.passwordReset(),
	paths.newPassword(),
];

/**
 * The prefix for API authentication routes
 * @type {string}
 */
const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
const DEFAULT_LOGIN_REDIRECT: string = paths.settings();

export { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT };
