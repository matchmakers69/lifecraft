export const isError = (err: unknown): err is Error => {
	return typeof err === "object" && err !== null && "message" in err;
};
