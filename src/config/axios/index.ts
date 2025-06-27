import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

const instance = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

instance.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (axios.isCancel(error)) {
			window.console.log("Request", error.message);
		}

		return Promise.reject(error);
	},
);

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
	get: async (url: string, abort?: { signal: AbortSignal }) => {
		const response = await instance.get(url, abort);
		return responseBody(response);
	},
	post: async <TRequest, TResponse>(url: string, body: TRequest, abort?: { signal: AbortSignal }) => {
		const response = await instance.post<TResponse>(url, body, abort);
		return responseBody(response);
	},
	put: async <TRequest, TResponse>(url: string, body: TRequest) => {
		const response = await instance.put<TResponse>(url, body);
		return responseBody(response);
	},
	patch: async <TRequest, TResponse>(url: string, body: TRequest) => {
		const response = await instance.patch<TResponse>(url, body);
		return responseBody(response);
	},
	delete: async <TResponse>(url: string) => {
		const response = await instance.delete<TResponse>(url);
		return responseBody(response);
	},
};
