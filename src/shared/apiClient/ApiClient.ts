import { BASE_URL } from "@/constants/urls";
import { CurrencyData } from "@/domains/currencyConvertor/types";


export const ApiClient = (baseUrl = BASE_URL) => ({
	getCurrencies: async (): Promise<CurrencyData> => {
		const response = await fetch(baseUrl);
		if (!response.ok) {
			throw new Error("Somethint went wrong with fetching currency");
		}
		return await response.json();
	},
});
