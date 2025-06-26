"use client";

import { createContext, useEffect, useMemo, useReducer } from "react";
import { CurrenciesContextInit, CurrenciesState, CurrencyContextType } from "./defs";
import { LoadingState } from "@/shared/types";
import { currencyReducer } from "./currenciesReducer";
import { BASE_CURRENCY, DEFAULT_TARGET_CURRENCY } from "@/constants";
import { useFetchCurrencies } from "../hooks/useFetchCurrencies";

export const CurrencyConvertorContext = createContext<CurrenciesContextInit | null>(null);

const initialState: CurrenciesState = {
	baseCurrency: BASE_CURRENCY,
	targetCurrency: DEFAULT_TARGET_CURRENCY,
	loadingCurrencies: LoadingState.idle,
	currency: null,
	errorFetching: null,
};

const CurrencyConvertorContextProvider = ({ children }: CurrencyContextType) => {
	const [state, dispatch] = useReducer(currencyReducer, initialState);
	const { fetchCurrencies } = useFetchCurrencies(dispatch);

	useEffect(() => {
		fetchCurrencies();
	}, []);

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
