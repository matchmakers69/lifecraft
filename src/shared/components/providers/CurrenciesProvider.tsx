import CurrencyConvertorContextProvider from "@/domains/currencyConvertor/context/CurrencyConvertorProvider";
import { ReactNode } from "react";

function CurrenciesProvider({ children }: { children: ReactNode }) {
	return <CurrencyConvertorContextProvider>{children}</CurrencyConvertorContextProvider>;
}

export default CurrenciesProvider;
