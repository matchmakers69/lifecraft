import createCache from "@emotion/cache";

const emotionCache = () => {
	return createCache({ key: "css", prepend: true });
};

export { emotionCache };
