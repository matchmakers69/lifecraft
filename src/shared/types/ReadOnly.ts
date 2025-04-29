export type ReadOnly<T> = {
	readonly [P in keyof T]: T[P];
};
