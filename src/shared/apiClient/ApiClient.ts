import { requests } from "@/config/axios";
import { CurrencyData } from "@/domains/currencyConvertor/types";

//getExpensesCategories
export const ApiClient = (url: string) => ({
	getCurrencies: (): Promise<CurrencyData> => requests.get(url),
})
