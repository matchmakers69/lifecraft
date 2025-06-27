import { CURRENCY_API_URL } from "@/constants";
import { ApiClient } from "../apiClient/ApiClient";
import { queryOptions, useQuery } from "@tanstack/react-query";

const fetchCurrencies = async () => {
	return await ApiClient(CURRENCY_API_URL).getCurrencies();
};

const currencyQuery = () =>
	queryOptions({
		queryKey: ["currencies"],
		queryFn: () => fetchCurrencies(),
		select: (response) => response?.data ?? null,
		staleTime: 1000 * 60 * 10,
		refetchOnWindowFocus: true,
	});

export const useFetchCurrencies = () => {
	return useQuery(currencyQuery());
};
