import { BaseProps } from "@/shared/types";
import { Dispatch } from "react";
import { CurrencyData } from "../types";

export type CurrencyContextType = BaseProps;

export type CurrenciesState = {
	baseCurrency: string;
	targetCurrency: string;
	currency: CurrencyData | null;

};

export type ActionCurrencies =
	| { type: "SET_BASE_CURRENCY"; payload: string }
	| { type: "SET_TARGET_CURRENCY"; payload: string };

export type CurrenciesContextInit = CurrenciesState & {
	dispatch: Dispatch<ActionCurrencies>;
};
