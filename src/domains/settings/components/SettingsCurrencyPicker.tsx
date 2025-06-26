"use client";

import CurrencySelector from "@/domains/currencyConvertor/components/CurrencySelector";
import { Loader2 } from "lucide-react";
import { useCurrencyConvertor } from "@/domains/currencyConvertor/context/useCurrencyConvertor";
import { CardDarkWrapper, CardTitle } from "@/shared/components/cards";

function SettingsCurrencyPicker() {
	const { baseCurrency, currency, loadingCurrencies, dispatch } = useCurrencyConvertor();

	const defaultCurrency = baseCurrency ?? "GBP";
	const currencies = currency?.data;

	const handleSelectBaseCurrency = (currency: string | number) => {
		dispatch({
			type: "SET_BASE_CURRENCY",
			payload: `${currency}`,
		});
	};

	if (loadingCurrencies === "pending" || !currencies) {
		return <Loader2 size={30} className="mx-auto my-10 animate-spin" />;
	}
	return (
		<CardDarkWrapper>
			<CardTitle
				text={`No currency selected — defaulting to ${defaultCurrency}. You can change it using the selector below.`}
				className="text-[2.2rem]"
			>
				Select the currncy you want to use
			</CardTitle>
			<CurrencySelector
				selectedCurrency={baseCurrency}
				currencies={currencies}
				onSelectCurrency={handleSelectBaseCurrency}
			/>
		</CardDarkWrapper>
	);
}

export default SettingsCurrencyPicker;
