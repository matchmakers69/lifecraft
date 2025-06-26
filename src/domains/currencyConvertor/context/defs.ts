import { BaseProps, Loading } from "@/shared/types";
import { Dispatch } from "react";
import { CurrencyData } from "../types";

export type CurrencyContextType = BaseProps;

export type CurrenciesState = {
	baseCurrency: string;
	targetCurrency: string;
	loadingCurrencies: Loading;
	currency: CurrencyData | null;
	errorFetching: string | null;
};

export type ActionCurrencies =
	| { type: "START_FETCHING_CURRENCIES" }
	| { type: "SUCCESS_FETCHING_CURRENCIES"; payload: CurrencyData }
	| { type: "FAILED_FETCHING_CURRENCIES"; payload: string }
	| { type: "SET_BASE_CURRENCY"; payload: string }
	| { type: "SET_TARGET_CURRENCY"; payload: string };

export type CurrenciesContextInit = CurrenciesState & {
	dispatch: Dispatch<ActionCurrencies>;
};
