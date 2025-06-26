import { useContext } from "react";
import { CurrencyConvertorContext } from "./CurrencyConvertorProvider";

export const useCurrencyConvertor = () => {
	const ctx = useContext(CurrencyConvertorContext);
	if (!ctx) {
		throw new Error("Please make sure your components are wrapped by a Provider");
	}

	return ctx;
};
