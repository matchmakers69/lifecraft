import { ActionCurrencies, CurrenciesState } from "./defs";

export const currencyReducer = (state: CurrenciesState, action: ActionCurrencies) => {
	switch (action.type) {
		case "SET_BASE_CURRENCY":
			return {
				...state,
				baseCurrency: action.payload,
			};

		case "SET_TARGET_CURRENCY":
			return {
				...state,
				targetCurrency: action.payload,
			};
		default:
			return state;
	}
};
