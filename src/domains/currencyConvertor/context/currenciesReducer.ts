import { LoadingState } from "@/shared/types";
import { ActionCurrencies, CurrenciesState } from "./defs";

export const currencyReducer = (state: CurrenciesState, action: ActionCurrencies) => {
	switch (action.type) {
		case "START_FETCHING_CURRENCIES":
			return {
				...state,
				loadingCurrencies: LoadingState.pending,
				currency: null,
			};

		case "SUCCESS_FETCHING_CURRENCIES":
			return {
				...state,
				currency: action.payload,
				loadingCurrencies: LoadingState.success,
			};

		case "FAILED_FETCHING_CURRENCIES":
			return {
				...state,
				errorFetching: action.payload,
				loadingCurrencies: LoadingState.failed,
			};

			case "SET_BASE_CURRENCY":
				return {
					...state,
					baseCurrency: action.payload
				}

				case "SET_TARGET_CURRENCY":
				return {
					...state,
					targetCurrency: action.payload
				}
		default:
			return state;
	}
};
