import { Dispatch, useCallback } from "react";
import { ApiClient } from "@/shared/apiClient/ApiClient";
import { BASE_CURRENCY, CURRENCY_API_URL } from "@/constants";
import { parseError } from "@/shared/types/errorParser";
import { ActionCurrencies } from "../context/defs";

export const useFetchCurrencies = (dispatch: Dispatch<ActionCurrencies>) => {
	const fetchCurrencies = useCallback(async () => {
		dispatch({
			type: "START_FETCHING_CURRENCIES",
		});
		try {
			const response = await ApiClient(`${CURRENCY_API_URL}&base_currency=${BASE_CURRENCY}`).getCurrencies();
			dispatch({
				type: "SUCCESS_FETCHING_CURRENCIES",
				payload: response,
			});
		} catch (error) {
			const message = parseError(error) ? error.message : "Some error occured when fetching currency!";
			dispatch({
				type: "FAILED_FETCHING_CURRENCIES",
				payload: message,
			});
		}
	}, [dispatch]);

	return {
		fetchCurrencies,
	};
};
