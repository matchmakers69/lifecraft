"use client";

import { createContext, useMemo, useReducer } from "react";
import { CurrenciesContextInit, CurrenciesState, CurrencyContextType } from "./defs";
import { currencyReducer } from "./currenciesReducer";
import { BASE_CURRENCY, DEFAULT_TARGET_CURRENCY } from "@/constants";

export const CurrencyConvertorContext = createContext<CurrenciesContextInit | null>(null);

const initialState: CurrenciesState = {
	baseCurrency: BASE_CURRENCY,
	targetCurrency: DEFAULT_TARGET_CURRENCY,

	currency: null,
};

const CurrencyConvertorContextProvider = ({ children }: CurrencyContextType) => {
	const [state, dispatch] = useReducer(currencyReducer, initialState);

	const value = useMemo(
		() => ({
			...state,
			dispatch,
		}),
		[state],
	);
	return <CurrencyConvertorContext.Provider value={value}>{children}</CurrencyConvertorContext.Provider>;
};

export default CurrencyConvertorContextProvider;
