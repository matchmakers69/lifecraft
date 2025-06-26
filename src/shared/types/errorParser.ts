export const parseError = (error: unknown): error is Error => {
	return typeof error === "object" && error !== null && "message" in error;
};
