"use client";

import CurrencySelector from "@/domains/currencyConvertor/components/CurrencySelector";
import { useCurrencyConvertor } from "@/domains/currencyConvertor/context/useCurrencyConvertor";
import { CardDarkWrapper, CardTitle } from "@/shared/components/cards";
import { useFetchCurrencies } from "@/shared/hooks/useFetchCurrenciesQuery";
import { Loader2 } from "lucide-react";

function SettingsCurrencyPicker() {
	const { baseCurrency, dispatch } = useCurrencyConvertor();
	const { data: currencyData, isError, isLoading } = useFetchCurrencies();

	const defaultCurrency = baseCurrency ?? "GBP";

	const handleSelectBaseCurrency = (currency: string | number) => {
		dispatch({
			type: "SET_BASE_CURRENCY",
			payload: `${currency}`,
		});
	};

	if (isLoading) {
		return <Loader2 size={30} className="mx-auto my-10 animate-spin" />;
	}

	if (isError) {
		return <h4>{"Error occured, service is not available"}</h4>;
	}
	return (
		<CardDarkWrapper>
			<CardTitle
				text={`No currency selected — defaulting to ${defaultCurrency}. You can change it using the selector below.`}
				className="text-[2.2rem]"
			>
				Select the currncy you want to use
			</CardTitle>
			{currencyData && (
				<CurrencySelector
					selectedCurrency={baseCurrency}
					currencies={currencyData}
					onSelectCurrency={handleSelectBaseCurrency}
				/>
			)}
		</CardDarkWrapper>
	);
}

export default SettingsCurrencyPicker;
